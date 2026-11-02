import { createServerFn } from "@tanstack/react-start";

export type FfPlayerResult =
  | { ok: true; uid: string; nickname: string; level: number | null; region: string | null; likes: number | null }
  | { ok: false; error: string };

// Simple in-memory per-instance throttle (best effort on edge workers).
const hits = new Map<string, number[]>();

export const lookupFfPlayer = createServerFn({ method: "POST" })
  .inputValidator((input: { uid: string }) => {
    const uid = String(input?.uid ?? "").trim();
    if (!/^\d{8,12}$/.test(uid)) throw new Error("UID must be 8 to 12 digits.");
    return { uid };
  })
  .handler(async ({ data }): Promise<FfPlayerResult> => {
    const now = Date.now();
    const recent = (hits.get("global") ?? []).filter((t) => now - t < 60_000);
    if (recent.length > 60) return { ok: false, error: "Too many lookups. Try again in a minute." };
    recent.push(now);
    hits.set("global", recent);

    const base = process.env["FF_INFO_API_URL"] || "https://free-ff-api-src-5plp.onrender.com/api/v1/account";
    try {
      const res = await fetch(`${base}?region=IND&uid=${data.uid}`, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) return { ok: false, error: "Player not found on IND servers." };
      const json: any = await res.json();
      const b = json?.basicInfo ?? json?.AccountInfo ?? json;
      const nickname = b?.nickname ?? b?.AccountName ?? b?.name;
      if (!nickname) return { ok: false, error: "Player not found on IND servers." };
      return {
        ok: true,
        uid: data.uid,
        nickname: String(nickname).slice(0, 40),
        level: Number(b?.level ?? b?.AccountLevel) || null,
        region: b?.region ?? b?.AccountRegion ?? "IND",
        likes: Number(b?.liked ?? b?.AccountLikes) || null,
      };
    } catch (e) {
      console.error("FF lookup failed", e);
      return { ok: false, error: "Lookup service is busy. Try again shortly." };
    }
  });
