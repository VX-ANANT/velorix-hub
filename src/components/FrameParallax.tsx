import { useEffect, useRef, useState } from "react";

const modules = import.meta.glob("@/assets/frames/*.asset.json", { eager: true }) as Record<
  string,
  { default: { url: string } }
>;
const frames = Object.keys(modules)
  .sort()
  .map((k) => modules[k].default.url);

const beats = [
  { at: 0, title: "Lobby fills up.", body: "Room ID drops, squads lock in." },
  { at: 0.34, title: "Zone closes in.", body: "Every fight counts toward the prize pool." },
  { at: 0.67, title: "Last squad standing.", body: "Result verified, cash on its way to UPI." },
];

/** Pinned full-screen section that swaps frames as you scroll, so it plays like a video. */
const FrameParallax = () => {
  const trackRef = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      setProgress(p);
      setIdx(Math.min(frames.length - 1, Math.floor(p * frames.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const beat = [...beats].reverse().find((b) => progress >= b.at) ?? beats[0];

  return (
    <section ref={trackRef} aria-labelledby="frames-heading" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/70" />

        <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-12 pt-24 md:px-12">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            <span>Match replay</span>
            <span className="font-mono">
              {String(idx + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
            </span>
          </div>
          <div className="max-w-2xl">
            <h2 id="frames-heading" key={beat.title} className="animate-fade-in font-display text-4xl leading-none text-foreground md:text-7xl">
              {beat.title}
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">{beat.body}</p>
            <div className="mt-6 h-0.5 w-full max-w-sm overflow-hidden rounded-full bg-border">
              <div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameParallax;
