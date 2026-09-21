import { motion, useReducedMotion } from "framer-motion";
import { Gamepad2, ShieldCheck, Smartphone, Trophy } from "@/lib/icons";

const readinessItems = [
  {
    icon: Smartphone,
    label: "Android App",
    detail: "Available now",
    active: true,
  },
  {
    icon: Gamepad2,
    label: "Daily Matches",
    detail: "Free Fire + BGMI",
    active: true,
  },
  {
    icon: Trophy,
    label: "Ranked Play",
    detail: "Climb the board",
    active: true,
  },
  {
    icon: ShieldCheck,
    label: "Fair Results",
    detail: "Verified outcomes",
    active: true,
  },
];

const PlatformReadinessRail = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="platform-readiness-grid"
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.07, delayChildren: 0.72 },
        },
      }}
      aria-label="VeloRix app readiness"
    >
      {readinessItems.map((item) => (
        <motion.div
          key={item.label}
          className="platform-readiness-item"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="platform-readiness-icon" aria-hidden="true">
            <item.icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground">{item.label}</span>
            <span className="block truncate text-[0.68rem] uppercase text-muted-foreground">{item.detail}</span>
          </span>
          <span className="platform-readiness-status" aria-hidden="true" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlatformReadinessRail;