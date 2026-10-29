import { Download, Smartphone, UserPlus, Gamepad2 } from "@/lib/icons";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    icon: Download,
    title: "Grab the APK",
    description: "Free ~25 MB download for Android 7.0+, straight from the official site.",
    meta: "~25 MB",
  },
  {
    icon: Smartphone,
    title: "Install and open",
    description: "Allow installs from this source, tap install, and you're in. No extra setup screens.",
    meta: "Under a minute",
  },
  {
    icon: UserPlus,
    title: "Make your account",
    description: "Pick a name and username. Paid tournaments are for players 18 and up.",
    meta: "18+ for paid rooms",
  },
  {
    icon: Gamepad2,
    title: "Join a room",
    description: "Register for a BGMI or Free Fire daily room, get the room ID in the app, and play for cash.",
    meta: "BGMI · Free Fire",
  },
];

const HowItWorksSection = () => {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              How it works
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Four steps from download to your first match. Most players are in a room within five minutes.
            </p>
            <a
              href="/download"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Download className="h-5 w-5" />
              Download VeloRix
            </a>
          </div>

          <ol className="relative">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className="group relative grid grid-cols-[3.5rem_1fr] gap-5 pb-10 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.75rem] top-16 bottom-2 w-0.5 bg-primary/20 sm:left-[2.25rem] sm:top-20"
                  />
                )}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:h-[4.5rem] sm:w-[4.5rem]">
                  <s.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <div className="rounded-3xl bg-card/60 p-6 transition-colors duration-300 group-hover:bg-card sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold text-foreground sm:text-2xl">{s.title}</h3>
                    <span className="text-sm font-medium text-primary">{s.meta}</span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
