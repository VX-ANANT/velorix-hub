import { Download } from "@/lib/icons";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { useNavigate } from "@/lib/router-compat";
import { playDownloadSound } from "@/hooks/useSoundEffect";
import IPhoneMockup from "@/components/IPhoneMockup";
import { appScreens } from "@/data/appScreens";

const DownloadCTA = () => {
  const navigate = useNavigate();
  const handleDownload = () => {
    playDownloadSound();
    navigate("/download");
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="vx-panel grid items-center gap-10 p-8 sm:p-12 md:grid-cols-[1.2fr_1fr]"
        >
          <div className="vx-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div className="relative text-center md:text-left">
            <span className="vx-eyebrow"><span className="vx-dot" /> Free · Android 7.0+</span>
            <h2 className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-6xl">
              Your next lobby <span className="text-gradient text-glow">starts tonight.</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground md:mx-0 mx-auto">
              Grab the app, join a room, and see how you stack up. iOS is on the way.
            </p>
            <AnimatedButton variant="hero" size="xl" className="pulse-glow mt-8 rounded-full px-8" onClick={handleDownload}>
              <Download className="h-5 w-5" /> Download for Android
            </AnimatedButton>
          </div>
          <div className="relative mx-auto h-72 w-52 sm:h-80">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-[90px]" />
            <div className="relative rotate-6 translate-y-6">
              <IPhoneMockup src={appScreens[1].src} alt={appScreens[1].alt} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTA;
