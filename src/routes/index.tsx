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
  "VeloRix Tournaments - Free Fire, BGMI & Esports Tournament App | Play & Win";
const DESCRIPTION =
  "Join VeloRix Tournaments - India's best Free Fire, BGMI & esports tournament app. Compete in daily Free Fire tournaments, win real cash prizes, and climb the leaderboard. Download free!";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
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
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(buildTournamentEventsJsonLd()),
      },
    ],
  }),
  component: Index,
});
