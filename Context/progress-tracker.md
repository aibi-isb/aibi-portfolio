# Progress Tracker

Update this file after every meaningful implementation, content-model, route, dependency, or verification change. Keep it aligned with `IMPLEMENTATION WORKFLOW.md` and record blockers honestly.

## Current Phase

- Complete: Epic 3 — Navigation and homepage.

## Current Goal

- Begin Epic 4 by building the reusable case-study renderer and review workflow for the first four projects.

## Completed

- Epic 1 foundations: asset inventory with owners, dimensions, and missing/review states; shared project records and project status classifications are in place.
- Epic 2 foundation: Next.js static-export routes, shared root layout, page metadata helper, loading/error/not-found states, and static parameters generated from featured project records.
- Epic 2 design system: CVA button variants, reusable `GlassSurface`, shared dark/light glass, color, radius, spacing, shadow, blur, and motion tokens.
- IBS-005 navigation: floating glass navigation, observer-based active bookmarks, native hash navigation, responsive menu, keyboard dismissal, and reduced-motion-aware GSAP motion.
- IBS-006 hero: content-driven project previews, Embla controls, pause behavior, reduced-motion handling, and a scoped GSAP entrance.
- IBS-007 featured work: alternating cinematic project sections driven by the project registry, with visible role, dates, status, personal contribution, approved-media handling, and reversible scroll reveals.
- IBS-008 About portrait: prominent reversible desktop width-and-clip reveal; floated portrait lets copy reflow beside and beneath it, with the availability panel clearing below. Completion uses a fixed viewport-relative scrub distance so full width is reached while the photo is still visible. Tablet/mobile retain the stacked layout and use clip-only portrait motion.
- IBS-009 design-to-code scene: separate laptop, tablet, and phone structures; responsive device selection; reversible scroll timeline; static comparison for mobile and reduced motion.
- IBS-010 capabilities and process: capability cards link to supporting project evidence; the current process step is highlighted through Intersection Observer; AI contribution wording remains content-driven.
- IBS-011 supporting project links: static case-study generation now includes every registered project, not only featured entries.
- IBS-012 résumé/CV access: shared native-dialog chooser uses the document registry, supports keyboard dismissal/focus handling, displays file details when known, and does not link unpublished documents.
- IBS-013 contact conclusion: verified contact records remain the source of visible links; footer bookmarks use native hash navigation.
- Featured case-study routes use project data for content and metadata. Review-stage case studies are marked `noindex, nofollow` until approved.
- The latest `pnpm build` passed on 2026-09-29 after Epic 3 and the About portrait refinement; the static export generated all 14 pages.

## In Progress

- Public content readiness: project records remain in review, and approved project imagery, portrait, logo, résumé, CV, and profile details are still pending where listed in the asset inventory.

## Next Up

- IBS-014: build the flexible case-study template from project records, including optional sections, related-project navigation, and media galleries.
- IBS-015: review and populate House Rental, SALONE FRESH, YUMMY Provision Shop, and Dash Delivery content with approved evidence.
- Once approved assets/content arrive, replace labeled media placeholders and update project content statuses before indexing.

## Open Questions

- When will the approved IB Studio logo, portrait, project media, résumé, and CV be supplied?
- Which project records have completed content review and may be indexed? Current featured case studies are intentionally `noindex` while their content status is `review`.
- Confirm public GitHub/LinkedIn URLs and any additional contact details before publication.

## Architecture Decisions

- Next.js 15 App Router produces the static export; the homepage continues to mount the existing client-side React Router application. Static case-study routes use the same project registry.
- The `dev` script uses Next.js's default Webpack compiler. Forced Turbopack previously failed while scanning the intentionally absent `src/pages` directory.
- GSAP with `@gsap/react` owns scene entrance/scroll motion; Embla owns slideshow state; Intersection Observer owns section visibility. Native scrolling remains in control.
- Case-study generation uses `featuredProjects`; unapproved records are excluded from search indexing through generated metadata.
- CVA defines shared button variants. `GlassSurface` and legacy glass classes consume centralized CSS tokens and have opaque fallbacks.
- The design-to-code scene uses CSS device-specific laptop/tablet/phone structures; ScrollTrigger owns reversible desktop/tablet motion, while mobile and reduced-motion users receive stable alternatives.
- The résumé/CV chooser uses the native `<dialog>` element for focus and Escape behavior; document links are only rendered for approved records with a path.

## Session Notes

- Workspace: `/Users/aibi/Documents/GitHub/aibi-portfolio`.
- Run `npm run dev -- --port 3002` for local browser work when the default ports are occupied; the current `dev` script uses Webpack.
- Run `pnpm build` to validate the static export.
- Epic 3 passed `pnpm exec tsc --noEmit --incremental false`, `git diff --check`, and `pnpm build` on 2026-09-29. The static export generated 14 pages, including every registered project route.
- Browser QA verified the native document chooser opens/closes on Escape and restores focus; case-study and document metadata; supporting-project route rendering; desktop/tablet/mobile device selection; reduced-motion static comparison; reversible design/build sequence; mobile hash navigation; and no horizontal overflow at 390px.
- About portrait QA verified desktop width expands from 375 px to about 574 px and contracts in reverse; at full expansion the image spans approximately y=192–958 in a 900 px viewport. Biography copy shifts/reflows and the availability panel remains below. At 390 px, the portrait stays stacked, animates only its clip reveal, and the document has no horizontal overflow.
- The Epic 3 source changes and regenerated `out/` export are currently uncommitted. Preserve them when continuing; old hashed export chunks were replaced by the latest build output.
- A single Webpack dev server is available at `http://localhost:3002` for the current preview.
