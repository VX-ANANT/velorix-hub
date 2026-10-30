import apkAsset from "@/assets/releases/velorix-release.apk.asset.json";

export const publicRelease = {
  version: "V1-0.0-Dev build",
  date: "October 30, 2026",
  title: "First public release",
  visibility: "Public",
  tag: "release",
  sizeBytes: apkAsset.size,
  sizeLabel: `${(apkAsset.size / 1_000_000).toFixed(2)} MB`,
  url: apkAsset.url,
  filename: "velorix-release.apk",
  sha256: "35dc0a88d5f9828d367dd57f44551af6cbcef2ace321e6e3f3952bec7c37f4b9",
  items: ["First publicly available Android development build after private beta testing.", "Free APK download from the official VeloRix website."],
};