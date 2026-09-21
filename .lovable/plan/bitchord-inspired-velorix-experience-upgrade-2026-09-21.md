# BitChord-inspired VeloRix experience upgrade

## Goal
Bring the polished, interactive feel of the referenced BitChord landing page into VeloRix while preserving VeloRix branding, content, navigation, download flow, and mobile performance.

## What will change
- Rework the first screen into a sharper esports command layout: VeloRix message and actions remain primary, with the existing real app preview presented as the product signal.
- Add a compact platform/readiness rail inspired by BitChord’s device tiles, adapted to VeloRix’s actual Android availability and tournament experience.
- Upgrade the app showcase and key feature presentation with interactive “arena system” panels, clearer status details, and refined depth.
- Add restrained Framer Motion sequences: staged first-screen entrance, spring-based gallery transitions, card focus/hover feedback, and small number/status reveals.
- Keep the existing lightweight Anime.js one-time reveals where they already work; avoid overlapping or continuous JavaScript animation loops.

## Visual direction
- Preserve AMOLED black, crimson accents, GFF Devanagari/Inter typography, and VeloRix copy.
- Borrow only interaction patterns and composition ideas—not BitChord’s branding, text, artwork, or source code.
- Use tactical grid lines, sharp borders, status markers, and restrained crimson light rather than generic gradients or decorative blobs.

## Technical details
- Update `framer-motion` from the current v12 release to the latest stable v13 release and adapt any changed APIs if required.
- Build original VeloRix components using the project’s existing design tokens and button components.
- Animate only opacity and transforms for primary motion; pause/disable nonessential effects for reduced motion and touch devices.
- Preserve semantic headings, keyboard controls, 44px touch targets, and descriptive labels.

## Verification
- Confirm the homepage renders at desktop and the current 394×666 mobile size without overlaps or horizontal scrolling.
- Test Download App, Learn More, gallery controls, navigation, and back behavior.
- Check runtime console, current build status, and reduced-motion behavior.
