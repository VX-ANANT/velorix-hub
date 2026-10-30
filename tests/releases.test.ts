import { describe, expect, it } from "vitest";
import { publicRelease } from "../src/data/releases";

describe("public APK", () => {
  it("uses the requested public development build", () => {
    expect(publicRelease.version).toBe("V1-0.0-Dev build");
    expect(publicRelease.visibility).toBe("Public");
  });
  it("reports the uploaded file size without approximation", () => {
    expect(publicRelease.sizeBytes).toBe(30_161_083);
    expect(publicRelease.sizeLabel).toBe("30.16 MB");
  });
  it("uses the uploaded Android package instead of an old private build", () => {
    expect(publicRelease.url).toMatch(/^\/__l5e\/assets-v1\/[^/]+\/velorix-release\.apk$/);
    expect(publicRelease.filename).toBe("velorix-release.apk");
  });
});