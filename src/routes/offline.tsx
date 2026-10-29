import { createFileRoute } from "@tanstack/react-router";
import Offline from "@/pages/errors/Offline";

export const Route = createFileRoute("/offline")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, follow" },
      { title: "You're Offline | VeloRix Tournaments" },
      { name: "description", content: "No internet connection detected. Reconnect to continue." },
      { property: "og:title", content: "You're Offline | VeloRix Tournaments" },
      { property: "og:description", content: "No internet connection detected. Reconnect to continue." },
      { name: "twitter:title", content: "You're Offline | VeloRix Tournaments" },
      { name: "twitter:description", content: "No internet connection detected. Reconnect to continue." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-esports.tech/offline" }],
  }),
  component: Offline,
});
