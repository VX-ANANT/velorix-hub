import { createFileRoute } from "@tanstack/react-router";
import Changelog from "@/pages/Changelog";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Changelog | VeloRix Tournaments" },
      { name: "description", content: "Every release, fix and feature shipped to the VeloRix Tournaments app and website." },
      { property: "og:title", content: "Changelog | VeloRix Tournaments" },
      { property: "og:description", content: "Every release, fix and feature shipped to the VeloRix Tournaments app and website." },
      { name: "twitter:title", content: "Changelog | VeloRix Tournaments" },
      { name: "twitter:description", content: "Every release, fix and feature shipped to the VeloRix Tournaments app and website." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-esports.tech/changelog" }],
  }),
  component: Changelog,
});
