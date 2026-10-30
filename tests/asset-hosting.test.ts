import { describe, expect, it } from "vitest";
import config from "../vercel.json";
import screenshot from "../src/assets/app/app-2.webp.asset.json";

describe("custom-domain asset hosting", () => {
  it("forwards screenshot and download asset paths to the public asset host", () => {
    const rewrite = config.rewrites.find(
      (rule) => rule.source === "/__l5e/assets-v1/:path*",
    );
    expect(rewrite?.destination).toBe(
      "https://velorix-hub.lovable.app/__l5e/assets-v1/:path*",
    );
    const assetPath = screenshot.url.replace("/__l5e/assets-v1/", "");
    expect(rewrite?.destination.replace(":path*", assetPath)).toBe(
      `https://velorix-hub.lovable.app${screenshot.url}`,
    );
  });
});