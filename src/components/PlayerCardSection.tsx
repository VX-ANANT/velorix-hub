import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ProfileCard from "@/components/reactbits/ProfileCard";
import { lookupFfPlayer, type FfPlayerResult } from "@/lib/ffPlayer.functions";
import sprinter from "@/assets/fighters/sprinter.jpg";
import hacker from "@/assets/fighters/hacker.jpg";
import samurai from "@/assets/fighters/samurai.jpg";
import samuraiAwakened from "@/assets/fighters/samurai-awakened.jpg";

type Gender = "male" | "female";

// Female rotates sprinter -> hacker; male rotates samurai -> awakened samurai.
export const CHARACTER_ROTATION: Record<Gender, { src: string; label: string }[]> = {
  female: [
    { src: sprinter, label: "Sprinter" },
    { src: hacker, label: "Hacker" },
  ],
  male: [
    { src: samurai, label: "Blade" },
    { src: samuraiAwakened, label: "Blade Awakened" },
  ],
};

export default function PlayerCardSection() {
  const lookup = useServerFn(lookupFfPlayer);
  const [uid, setUid] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FfPlayerResult | null>(null);

  const chars = CHARACTER_ROTATION[gender];
  const char = chars[idx % chars.length];

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
      setResult(await lookup({ data: { uid } }));
    } catch {
      setResult({ ok: false, error: "Lookup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const found = result?.ok ? result : null;

  return (
    <section id="player-card" className="relative py-20 md:py-28">
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Player card</p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">Drop your UID. Get your card.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Enter your Free Fire UID and we pull your in-game name from the IND servers. Flex the card with your squad.
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
                className="h-12 flex-1 rounded-xl border border-border bg-card px-4 text-foreground outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition active:scale-95 disabled:opacity-60"
              >
                {loading ? "Scanning…" : "Find"}
              </button>
            </div>

            <div role="radiogroup" aria-label="Card character" className="flex gap-2">
              {(["male", "female"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  role="radio"
                  aria-checked={gender === g}
                  onClick={() => { setGender(g); setIdx(0); }}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    gender === g ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground"
                  }`}
                >
                  {g === "male" ? "Male character" : "Female character"}
                </button>
              ))}
            </div>

            {result && !result.ok && <p role="alert" className="text-sm text-destructive">{result.error}</p>}
          </form>
        </div>

        <div className="flex justify-center">
          <ProfileCard
            avatarUrl={char.src}
            name={found?.nickname ?? "Your IGN"}
            title={found ? `Level ${found.level ?? "—"} · ${found.region ?? "IND"}` : `${char.label} · VeloRix`}
            handle={found ? `UID ${found.uid}` : "UID ••••••••"}
            status={found ? "Eligible for cash scrims" : "Waiting for UID"}
            statusColor={found ? "#22c55e" : "#e11d48"}
            contactText={found ? "Join a room" : undefined}
            onContactClick={() => { window.location.href = "/download"; }}
          />
        </div>
      </div>
    </section>
  );
}
