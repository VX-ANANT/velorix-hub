import { useEffect, useRef } from "react";

const modules = import.meta.glob("@/assets/frames/*.asset.json", { eager: true }) as Record<
  string,
  { default: { url: string } }
>;
const frames = Object.keys(modules)
  .sort()
  .map((k) => modules[k].default.url);

const rowA = frames.slice(0, 6);
const rowB = frames.slice(6);

/** Two rows of frames that slide in opposite directions as you scroll. Transform-only, rAF-throttled. */
const FrameParallax = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = (vh - r.top) / (vh + r.height); // 0..1
      const shift = (p - 0.5) * 40; // percent of row width/3
      if (aRef.current) aRef.current.style.transform = `translate3d(${-15 + shift * 0.6}%,0,0)`;
      if (bRef.current) bRef.current.style.transform = `translate3d(${-15 - shift * 0.6}%,0,0)`;
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

  const Row = ({ items, innerRef }: { items: string[]; innerRef: React.RefObject<HTMLDivElement | null> }) => (
    <div
      ref={innerRef}
      className="flex gap-3 md:gap-5 w-max will-change-transform"
      style={{ transform: "translate3d(-15%,0,0)" }}
    >
      {[...items, ...items].map((src, i) => (
        <div
          key={i}
          className="relative w-[58vw] sm:w-[40vw] md:w-[26vw] aspect-[3/2] shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted"
        >
          <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} aria-labelledby="frames-heading" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 md:mb-14">
        <h2 id="frames-heading" className="font-display text-3xl md:text-5xl text-foreground">
          Built to look this sharp.
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Every screen, every motion, made to feel fast on any phone.
        </p>
      </div>
      <div className="flex flex-col gap-3 md:gap-5" aria-hidden="true">
        <Row items={rowA} innerRef={aRef} />
        <Row items={rowB} innerRef={bRef} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
};

export default FrameParallax;
