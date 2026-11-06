import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ProfileCard from "@/components/reactbits/ProfileCard";
import { lookupFfPlayer, type FfPlayerResult, type Gender } from "@/lib/ffPlayer.functions";
import hayato from "@/assets/ff/hayato.png.asset.json";
import hayatoAw from "@/assets/ff/hayato-awakened.webp.asset.json";
import kelly from "@/assets/ff/kelly.png.asset.json";
import kellyAw from "@/assets/ff/kelly-awakened.webp.asset.json";
import moco from "@/assets/ff/moco.png.asset.json";
import mocoAw from "@/assets/ff/moco-awakened.webp.asset.json";

// Female rotates Kelly / Moco (normal + awakened); male rotates Hayato / Awakened Hayato.
export const CHARACTER_ROTATION: Record<Gender, { src: string; label: string }[]> = {
  female: [
    { src: kelly.url, label: "Kelly" },
    { src: mocoAw.url, label: "Awakened Moco" },
    { src: kellyAw.url, label: "Awakened Kelly" },
    { src: moco.url, label: "Moco" },
  ],
  male: [
    { src: hayato.url, label: "Hayato" },
    { src: hayatoAw.url, label: "Awakened Hayato" },
  ],
};

export default function PlayerCardSection() {
  const lookup = useServerFn(lookupFfPlayer);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [askName, setAskName] = useState(false);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FfPlayerResult | null>(null);

  const found = result?.ok ? result : null;
  const gender: Gender = found?.gender ?? (idx % 2 ? "female" : "male");
  const chars = CHARACTER_ROTATION[gender];
  const char = chars[(found ? idx : Math.floor(idx / 2)) % chars.length];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => i + 1), 4000);
    return () => clearInterval(t);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{8,12}$/.test(uid)) {
      setResult({ ok: false, error: "UID must be 8 to 12 digits." });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const r = await lookup({ data: { uid, name: askName ? name : undefined } });
      setResult(r);
      if (!r.ok && r.needsName) setAskName(true);
      if (r.ok) setIdx(0);
    } catch {
      setResult({ ok: false, error: "Lookup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="player-card" className="relative pt-12 pb-20 md:py-28">
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Player card</p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">Drop your UID. Get your card.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Enter your Free Fire UID. We grab your in-game name and pick your squad character from your tag. Flex it with the squad.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label htmlFor="ff-uid" className="text-sm font-medium text-foreground">Free Fire UID</label>
            <div className="flex gap-2">
              <input
                id="ff-uid"
                inputMode="numeric"
                maxLength={12}
                value={uid}
                onChange={(e) => setUid(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 1234567890"
                className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-card px-4 text-foreground outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || (askName && !name.trim())}
                className="h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition active:scale-95 disabled:opacity-60"
              >
                {loading ? "Scanning…" : askName ? "Build" : "Find"}
              </button>
            </div>

            {askName && (
              <div className="space-y-2">
                <label htmlFor="ff-name" className="text-sm font-medium text-foreground">In-game name</label>
                <input
                  id="ff-name"
                  maxLength={40}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your IGN"
                  className="h-12 w-full rounded-xl border border-border bg-card px-4 text-foreground outline-none focus:border-primary"
                />
              </div>
            )}

            {result && !result.ok && <p role="alert" className="text-sm text-muted-foreground">{result.error}</p>}
            {found && (
              <p className="text-sm text-muted-foreground">
                Squad pick: <span className="text-foreground">{gender === "female" ? "Kelly & Moco" : "Hayato"}</span>, read from your tag.
              </p>
            )}
          </form>
        </div>

        <div className="flex justify-center">
          <ProfileCard
            avatarUrl={char.src}
            name={found?.nickname ?? "Your IGN"}
            title={found ? `${found.level ? `Level ${found.level} · ` : ""}${found.region ?? "IND"}` : `${char.label} · VeloRix`}
            handle={found ? `UID ${found.uid}` : "UID ••••••••"}
            status={found ? char.label : "Waiting for UID"}
            statusColor={found ? "#22c55e" : "#e11d48"}
            contactText={found ? "Join a room" : undefined}
            onContactClick={() => { window.location.href = "/download"; }}
          />
        </div>
      </div>
    </section>
  );
}
