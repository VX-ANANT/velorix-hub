# Lightweight esports motion upgrade

## Goal
Make VeloRix feel more polished and energetic without changing its working layout or slowing mobile devices.

## Changes
- Add a reusable Anime.js entrance effect for selected homepage groups, triggered only once when they enter view.
- Enhance the hero with a short, one-time wordmark and action reveal instead of continuous JavaScript animation.
- Add subtle pointer-responsive card highlights on capable devices, with touch and reduced-motion fallbacks.
- Preserve all navigation, buttons, content, and the existing AMOLED/crimson visual identity.

## Technical details
- Animate only `opacity` and `transform` for GPU-friendly rendering.
- Disable effects under `prefers-reduced-motion` and avoid animation loops.
- Load Anime.js only in the browser and clean up observers/listeners when components unmount.
- Verify desktop and mobile rendering, button navigation, runtime errors, and the current build status.
