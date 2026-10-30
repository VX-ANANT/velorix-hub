# Project rules
- Preserve the Vercel rewrite for `/__l5e/assets-v1/*` to the published Lovable asset host so CDN pointers work for screenshots, frames, and APK downloads on the custom domain.
- Keep current APK metadata in a shared browser-safe release module and reference its CDN pointer; download controls and release details must agree.
- Keep historical release notes separate from the active release; changing the public download must not imply historical builds are available publicly.