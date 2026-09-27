import AnimeHeading from "@/components/AnimeHeading";
import { Shield, Zap, Bell, Award } from "@/lib/icons";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import StarBorder from "@/components/reactbits/StarBorder";
import GradualBlur from "@/components/reactbits/GradualBlur";
import ScrollStack, { ScrollStackItem } from "@/components/reactbits/ScrollStack";
import { useAnimeInView } from "@/hooks/useAnimeInView";

const features = [
  {
    icon: Shield,
    title: "Fair Play",
    description:
      "Server-side room ID validation, emulator bans, and manual screenshot verification to ensure clean competitive integrity.",
  },
  {
    icon: Zap,
    title: "Low-End Optimization",
    description:
      "Lightweight ~25 MB APK engineered to run smoothly on 2GB RAM budget Android smartphones running Android 7.0+.",
  },
  {
    icon: Bell,
    title: "Match Alerts",
    description:
      "Push notifications deliver Free Fire daily room IDs and BGMI match timings before every tournament starts.",
  },
  {
    icon: Award,
    title: "Quick Payouts",
    description:
      "UPI instant payout: verified winnings are sent to your UPI or bank account within 15–30 minutes after results.",
  },
];

const FeaturesSection = () => {
  const { ref, isInView } = useScrollAnimation(0.1);
  const featureListRef = useAnimeInView<HTMLDivElement>({ delayStep: 85, translateY: 16 });

  return (
    <section id="features" className="py-24 bg-secondary relative overflow-hidden">
      {/* Static gradient lines — no animation */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            <AnimeHeading
              parts={[
                { text: "Why " },
                { text: "VeloRix", className: "text-gradient text-glow" },
                { text: "?" },
              ]}
            />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            VeloRix is a skill-based BGMI tournament app for India with fair-play checks, budget-phone support, and fast UPI payouts.
          </p>
        </motion.div>

        <div ref={featureListRef} className="max-w-2xl mx-auto">
          <ScrollStack topOffset={100} stagger={16} itemSpacing={48}>
            {features.map((feature) => (
              <ScrollStackItem key={feature.title} className="feature-motion-item" data-anime-item>
                <StarBorder as="div" color="hsl(350 85% 55%)" speed="6s" thickness={1} className="block w-full rounded-2xl">
                  <div className="liquid-glass p-7 sm:p-8 rounded-2xl group hover:border-primary/30 transition-colors duration-300">
                    <div className="w-14 h-14 rounded-xl bg-accent/80 flex items-center justify-center mb-5 relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-60" />
                      <feature.icon className="w-7 h-7 text-primary relative z-10" />
                    </div>
                    <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </StarBorder>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
      <GradualBlur target="parent" position="bottom" height="5rem" strength={1.5} divCount={4} opacity={0.8} />
    </section>
  );
};

export default FeaturesSection;
