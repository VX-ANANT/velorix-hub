import { Shield, Zap, Bell, Award } from "@/lib/icons";
import { motion } from "framer-motion";
import IPhoneMockup from "@/components/IPhoneMockup";
import { appScreens } from "@/data/appScreens";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

/** Bento grid layout, inspired by 21st.dev bento feature components. */
const FeaturesSection = () => (
  <section id="features" className="relative py-24">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <span className="vx-eyebrow"><span className="vx-dot" /> Why VeloRix</span>
        <h2 className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-6xl">
          Built for grinders, <span className="text-gradient">not for show.</span>
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          VeloRix is a skill-based BGMI tournament app for India with fair-play checks, budget-phone support, and fast UPI payouts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2">
        <motion.article {...reveal} className="vx-panel p-7 md:col-span-4 md:row-span-1">
          <Shield className="h-8 w-8 text-primary" />
          <h3 className="mt-6 text-2xl font-semibold text-foreground">Fair Play</h3>
          <p className="mt-2 max-w-md text-muted-foreground">
            Server-side room ID validation, emulator bans, and manual screenshot verification to ensure clean competitive integrity.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Room ID checks", "Emulator bans", "Screenshot review"].map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t}</span>
            ))}
          </div>
        </motion.article>

        <motion.article {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="vx-panel flex flex-col justify-between p-7 md:col-span-2 md:row-span-2">
          <div>
            <Award className="h-8 w-8 text-primary" />
            <h3 className="mt-6 text-2xl font-semibold text-foreground">Quick Payouts</h3>
            <p className="mt-2 text-muted-foreground">
              UPI instant payout: verified winnings are sent to your UPI or bank account within 15–30 minutes after results.
            </p>
          </div>
          <div className="mx-auto mt-8 w-40 translate-y-12">
            <IPhoneMockup src={appScreens[5].src} alt={appScreens[5].alt} />
          </div>
        </motion.article>

        <motion.article {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="vx-panel p-7 md:col-span-2">
          <Zap className="h-8 w-8 text-primary" />
          <h3 className="mt-6 text-xl font-semibold text-foreground">Low-End Optimization</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Lightweight ~25 MB APK engineered to run smoothly on 2GB RAM budget Android smartphones running Android 7.0+.
          </p>
        </motion.article>

        <motion.article {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="vx-panel p-7 md:col-span-2">
          <Bell className="h-8 w-8 text-primary" />
          <h3 className="mt-6 text-xl font-semibold text-foreground">Match Alerts</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Push notifications deliver Free Fire daily room IDs and BGMI match timings before every tournament starts.
          </p>
        </motion.article>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
