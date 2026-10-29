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

/** Hero inspired by 21st.dev "Phone Scroll Hero": tilted phone flattens and climbs as you scroll. */
const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [18, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const sideY = useTransform(scrollYProgress, [0, 0.5], [40, -10]);

  const handleDownload = () => {
    playDownloadSound();
    navigate("/download");
  };

  return (
    <section ref={ref} id="home" className="relative z-10 overflow-hidden pt-32 pb-16 sm:pt-40">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true">
        <Aurora colorStops={["#ff1288", "#de4a63", "#e92042"]} blend={1} amplitude={1} speed={1.5} />
      </div>
      <div className="vx-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="vx-eyebrow"
        >
          <span className="vx-dot" /> Rooms open daily · India
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mx-auto mt-6 max-w-5xl font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
        >
          Drop in. Clutch up.
          <br />
          <span className="text-gradient text-glow">Get paid.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
        >
          VeloRix is a free BGMI and Free Fire tournament app for India: daily custom rooms,
          skill-based cash prizes, and UPI payouts on Android 7.0+. ~25 MB, built for budget phones.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <AnimatedButton variant="hero" size="xl" className="pulse-glow rounded-full px-8" onClick={handleDownload}>
            <Download className="h-5 w-5" /> Download for Android
          </AnimatedButton>
          <a
            href="#how-it-works"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
          >
            How it works
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Phones */}
        <div className="relative mx-auto mt-16 max-w-5xl" style={{ perspective: "1200px" }}>
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-[110px]" />
          <div className="relative flex items-end justify-center gap-4 sm:gap-8">
            <motion.div className="hidden w-48 md:block lg:w-56" style={reduce ? undefined : { y: sideY }}>
              <IPhoneMockup src={appScreens[1].src} alt={appScreens[1].alt} className="opacity-70 -rotate-6" />
            </motion.div>
            <motion.div
              className="w-60 sm:w-72"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.4 }}
              style={reduce ? undefined : { rotateX, y, transformStyle: "preserve-3d" }}
            >
              <IPhoneMockup src={appScreens[0].src} alt={appScreens[0].alt} priority />
            </motion.div>
            <motion.div className="hidden w-48 md:block lg:w-56" style={reduce ? undefined : { y: sideY }}>
              <IPhoneMockup src={appScreens[5].src} alt={appScreens[5].alt} className="opacity-70 rotate-6" />
            </motion.div>
          </div>

          {/* Floating chips */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <span className="vx-eyebrow absolute left-[6%] top-[18%] bg-background/80 backdrop-blur"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified results</span>
            <span className="vx-eyebrow absolute right-[6%] top-[30%] bg-background/80 backdrop-blur"><Zap className="h-3.5 w-3.5 text-primary" /> Instant UPI</span>
            <span className="vx-eyebrow absolute left-[10%] bottom-[22%] bg-background/80 backdrop-blur"><Trophy className="h-3.5 w-3.5 text-primary" /> Ranked rewards</span>
          </div>
        </div>

        {/* Stats strip — static values so crawlers read real numbers */}
        <dl className="relative mx-auto -mt-6 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur-md sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-4 py-5 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} sm:border-l first:sm:border-l-0 border-border`}>
              <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl text-foreground sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;
