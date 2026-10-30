import { Download as DownloadIcon, ShieldCheck, ArrowRight } from "@/lib/icons";
import { AnimatedButton } from "@/components/ui/animated-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { playDownloadSound } from "@/hooks/useSoundEffect";
import { publicRelease } from "@/data/releases";

// Download layout informed by 21st.dev App Download Section and Simple Badges.
const DownloadPage = () => (
  <div className="relative min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto max-w-5xl px-4 pb-24 pt-32">
      <BackButton />
      <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
        <section>
          <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">Download VeloRix</h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">The first public development build is here. Grab the APK and join us on Android.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Public</span>
            <span className="text-sm text-muted-foreground">{publicRelease.date}</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">{publicRelease.version}</h2>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            <div><dt className="text-sm text-muted-foreground">APK size</dt><dd className="mt-1 text-xl font-semibold text-foreground">{publicRelease.sizeLabel}</dd></div>
            <div><dt className="text-sm text-muted-foreground">Platform</dt><dd className="mt-1 text-xl font-semibold text-foreground">Android 7.0+</dd></div>
          </dl>
          <AnimatedButton asChild variant="hero" size="xl" className="mt-8 w-full rounded-lg sm:w-auto">
            <a href={publicRelease.url} download={publicRelease.filename} onClick={playDownloadSound}><DownloadIcon className="h-5 w-5" /> Download APK <span className="text-sm opacity-80">· {publicRelease.sizeLabel}</span></a>
          </AnimatedButton>
          <p className="mt-4 text-sm text-muted-foreground">Development build — some features may still change.</p>
          <a href="/changelog" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">Release history <ArrowRight className="h-4 w-4" /></a>
        </section>
        <section className="bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-foreground">Install on Android</h2>
          <ol className="mt-6 list-decimal space-y-5 pl-5 text-base leading-relaxed text-muted-foreground">
            <li>Download the APK using the button.</li>
            <li>Open the downloaded file. If Android asks, allow your browser to install apps from this source.</li>
            <li>Tap Install, then open VeloRix. You can turn that permission off again afterwards.</li>
          </ol>
          <div className="mt-8 flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" /><p className="text-sm leading-relaxed text-muted-foreground">No account is needed to download. Earlier private betas are not offered here.</p></div>
          <details className="mt-6 text-sm text-muted-foreground"><summary className="min-h-11 cursor-pointer py-3 text-foreground">Verify this file</summary><p className="mt-2">SHA-256</p><code className="mt-2 block break-all text-xs">{publicRelease.sha256}</code><p className="mt-3">{publicRelease.sizeBytes.toLocaleString("en-IN")} bytes</p></details>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);
export default DownloadPage;
