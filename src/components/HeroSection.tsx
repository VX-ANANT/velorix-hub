import { Download, ArrowRight, ShieldCheck, Trophy, Zap } from "@/lib/icons";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "@/lib/router-compat";
import { playDownloadSound } from "@/hooks/useSoundEffect";
import Aurora from "@/components/reactbits/Aurora";
import IPhoneMockup from "@/components/IPhoneMockup";
import { appScreens } from "@/data/appScreens";

const stats = [
  { value: "4,24,000+", label: "Players" },
  { value: "4.6", label: "Rating" },
  { value: "100+", label: "Daily rooms" },
  { value: "15–30 min", label: "UPI payouts" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Spotlight stage hero (21st.dev "Illuminated Hero" + "Hero with Mockup") with layered scroll parallax. */
const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [14, 0]);
  const sideY = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const chipA = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const chipB = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const chipC = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const beamY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const handleDownload = () => {
    playDownloadSound();
    navigate("/download");
  };

  const p = (v: unknown) => (reduce ? undefined : (v as never));

  return (
    <section ref={ref} id="home" className="relative z-10 overflow-hidden pt-24 pb-12 sm:pt-32">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true">
        <Aurora colorStops={["#ff1288", "#de4a63", "#e92042"]} blend={1} amplitude={1} speed={1.5} />
      </div>
      <div className="vx-grid-bg absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />

      {/* Spotlight beam */}
      <motion.div style={{ y: p(beamY) }} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[720px]">
        <div className="absolute left-1/2 top-[-120px] h-[520px] w-[720px] max-w-[140vw] -translate-x-1/2 rounded-[50%] bg-primary/25 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-[460px] w-px -translate-x-1/2 bg-gradient-to-b from-primary/70 via-primary/20 to-transparent" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div style={{ y: p(textY), opacity: p(textFade) }}>
          <motion.a
            href="#how-it-works"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="group mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-primary/60"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 font-semibold uppercase tracking-wider text-primary-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              </span>
              Live
            </span>
            Rooms open daily across India
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="mx-auto mt-5 max-w-5xl font-display text-[2.9rem] leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            Drop in. Clutch up.
            <br />
            <span className="text-gradient text-glow">Get paid.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-lg sm:leading-7"
          >
            VeloRix is a free BGMI and Free Fire tournament app for India: daily custom rooms,
            skill-based cash prizes, and UPI payouts on Android 7.0+. ~25 MB, built for budget phones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <AnimatedButton variant="hero" size="xl" className="pulse-glow rounded-full px-8" onClick={handleDownload}>
              <Download className="h-5 w-5" /> Download for Android
            </AnimatedButton>
            <a
              href="#how-it-works"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/40 px-7 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/60"
            >
              How it works
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>

        {/* Device stage */}
        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16" style={{ perspective: "1200px" }}>
          <div className="relative flex items-end justify-center gap-4 sm:gap-8">
            <motion.div className="hidden w-48 md:block lg:w-56" style={{ y: p(sideY) }}>
              <IPhoneMockup src={appScreens[1].src} alt={appScreens[1].alt} className="opacity-60 -rotate-6" />
            </motion.div>
            <motion.div
              className="w-56 sm:w-72"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.4 }}
              style={reduce ? undefined : { rotateX, y: phoneY, transformStyle: "preserve-3d" }}
            >
              <IPhoneMockup src={appScreens[0].src} alt={appScreens[0].alt} priority />
            </motion.div>
            <motion.div className="hidden w-48 md:block lg:w-56" style={{ y: p(sideY) }}>
              <IPhoneMockup src={appScreens[5].src} alt={appScreens[5].alt} className="opacity-60 rotate-6" />
            </motion.div>
          </div>

          {/* Podium line */}
          <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="pointer-events-none absolute left-1/2 bottom-0 h-16 w-2/3 -translate-x-1/2 bg-primary/20 blur-3xl" />

          {/* Parallax HUD cards */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div style={{ y: p(chipA) }} className="absolute left-0 top-[14%] sm:left-[4%]">
              <HudCard icon={<Zap className="h-4 w-4 text-primary" />} title="₹500 sent via UPI" meta="Paid out · 42s ago" />
            </motion.div>
            <motion.div style={{ y: p(chipB) }} className="absolute right-0 top-[38%] sm:right-[4%]">
              <HudCard icon={<ShieldCheck className="h-4 w-4 text-primary" />} title="Result verified" meta="Screenshot + room ID" />
            </motion.div>
            <motion.div style={{ y: p(chipC) }} className="absolute left-[2%] bottom-[18%] hidden sm:block sm:left-[10%]">
              <HudCard icon={<Trophy className="h-4 w-4 text-primary" />} title="Squad lobby 92/100" meta="Starts in 08:14" />
            </motion.div>
          </div>
        </div>

        {/* Stats dock — static values so crawlers read real numbers */}
        <dl className="relative mx-auto mt-8 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur-md sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-4 py-4 sm:py-5 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} sm:border-l first:sm:border-l-0 border-border`}>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl text-foreground sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

const HudCard = ({ icon, title, meta }: { icon: React.ReactNode; title: string; meta: string }) => (
  <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background/75 px-3 py-2 text-left shadow-lg backdrop-blur-md">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">{icon}</span>
    <span>
      <span className="block text-xs font-semibold text-foreground">{title}</span>
      <span className="block text-[0.65rem] text-muted-foreground">{meta}</span>
    </span>
  </div>
);

export default HeroSection;
