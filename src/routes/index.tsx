import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildTournamentEventsJsonLd } from "@/lib/tournamentEvents";
import { faqs } from "@/data/faqs";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const TITLE =
  "Free Fire & BGMI Tournament App India: Daily Scrims, UPI Prizes | VeloRix";
const DESCRIPTION =
  "Play daily Free Fire and BGMI tournaments, custom room scrims and esports matches in India. Get room ID and password in the app, win skill-based cash prizes paid to UPI. Free Android download.";

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "VeloRix Tournaments",
  alternateName: ["VeloRix", "VeloRix Free Fire tournament app", "VeloRix BGMI tournament app"],
  applicationCategory: "GameApplication",
  operatingSystem: "Android 7.0+",
  url: "https://velorix-esports.tech/",
  downloadUrl: "https://velorix-esports.tech/download",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  keywords:
    "free fire tournament app, bgmi tournament app, esports tournament app india, daily scrims, custom room tournaments, free fire custom room, play games win cash upi",
  featureList: [
    "Daily Free Fire and BGMI tournaments",
    "Custom room ID and password in the app",
    "Skill-based cash prizes paid to UPI",
    "Verified match results",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "free fire tournament app, bgmi tournament app, esports tournament app india, ff custom room, daily scrims app, play and win cash" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://velorix-esports.tech/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://velorix-esports.tech/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(appJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(buildTournamentEventsJsonLd()),
      },
    ],
  }),
  component: Index,
});
