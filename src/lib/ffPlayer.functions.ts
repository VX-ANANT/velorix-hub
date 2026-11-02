import { createServerFn } from "@tanstack/react-start";

export type Gender = "male" | "female";

export type FfPlayerResult =
  | { ok: true; uid: string; nickname: string; level: number | null; region: string | null; gender: Gender }
  | { ok: false; error: string; needsName?: boolean };

const hits = new Map<string, number[]>();

function throttle(): boolean {
  const now = Date.now();
  const recent = (hits.get("g") ?? []).filter((t) => now - t < 60_000);
  if (recent.length > 60) return false;
  recent.push(now);
  hits.set("g", recent);
  return true;
}

// Quick keyword fallback when the AI is unavailable.
export function guessGenderFromName(name: string): Gender {
  const n = name.toLowerCase();
  const female = /(queen|girl|angel|princess|miss|lady|doll|babe|baby|kitty|cutie|riya|priya|diya|pooja|neha|anjali|sneha|kajal|simran|khushi|kelly|moco|her\b|she\b|✿|♡|❀|🌸|💗)/;
  return female.test(n) ? "female" : "male";
}

async function aiGender(name: string): Promise<Gender> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) return guessGenderFromName(name);
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              "You read a Free Fire gamer tag (may use fancy unicode letters) and guess whether the player is more likely female or male. Reply with exactly one word: female or male.",
          },
          { role: "user", content: name },
        ],
      }),
    });
    if (!res.ok) return guessGenderFromName(name);
    const j: any = await res.json();
    const out = String(j?.choices?.[0]?.message?.content ?? "").toLowerCase();
    return out.includes("female") ? "female" : out.includes("male") ? "male" : guessGenderFromName(name);
  } catch {
    return guessGenderFromName(name);
  }
}

async function fetchNickname(uid: string): Promise<{ nickname: string; level: number | null; region: string | null } | null> {
  const attempts: { url: string; headers: Record<string, string> }[] = [];
  const custom = process.env.FF_INFO_API_URL;
  if (custom) attempts.push({ url: `${custom}${custom.includes("?") ? "&" : "?"}region=IND&uid=${uid}`, headers: {} });
  const communityKey = process.env.FFCOMMUNITY_API_KEY;
  if (communityKey)
    attempts.push({
      url: `https://developers.freefirecommunity.com/api/v1/info?region=ind&uid=${uid}`,
      headers: { "x-api-key": communityKey, "User-Agent": "VeloRixTournaments" },
    });

  for (const a of attempts) {
    try {
      const res = await fetch(a.url, { headers: a.headers, signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const json: any = await res.json();
      const b = json?.basicInfo ?? json?.AccountInfo ?? json?.data ?? json;
      const nickname = b?.nickname ?? b?.AccountName ?? b?.name;
      if (nickname)
        return {
          nickname: String(nickname).slice(0, 40),
          level: Number(b?.level ?? b?.AccountLevel) || null,
          region: b?.region ?? b?.AccountRegion ?? "IND",
        };
    } catch {
      /* try next */
    }
  }
  return null;
}

export const lookupFfPlayer = createServerFn({ method: "POST" })
  .inputValidator((input: { uid: string; name?: string }) => {
    const uid = String(input?.uid ?? "").trim();
    if (!/^\d{8,12}$/.test(uid)) throw new Error("UID must be 8 to 12 digits.");
    const name = String(input?.name ?? "").trim().slice(0, 40);
    return { uid, name };
  })
  .handler(async ({ data }): Promise<FfPlayerResult> => {
    if (!throttle()) return { ok: false, error: "Too many lookups. Try again in a minute." };

    const found = await fetchNickname(data.uid);
    const nickname = found?.nickname ?? data.name;
    if (!nickname) {
      return {
        ok: false,
        needsName: true,
        error: "Garena's servers didn't answer right now. Type your in-game name below and we'll build your card anyway.",
      };
    }
    const gender = await aiGender(nickname);
    return {
      ok: true,
      uid: data.uid,
      nickname,
      level: found?.level ?? null,
      region: found?.region ?? "IND",
      gender,
    };
  });
