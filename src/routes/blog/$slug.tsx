import { createFileRoute } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { blogPosts } from "@/data/blogPosts";

const SITE = "https://velorix-esports.tech";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    const url = `${SITE}/blog/${params.slug}`;
    if (!post) {
      return {
        meta: [
          { title: "Article not found | VeloRix Blog" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const title = `${post.title} | VeloRix Blog`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: post.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: new Date(post.date).toISOString().slice(0, 10),
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "VeloRix" },
            publisher: { "@type": "Organization", name: "VeloRix" },
          }),
        },
      ],
    };
  },
  component: BlogPost,
});
