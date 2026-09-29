# Progress Tracker

Update this file after every meaningful implementation, content-model, route, dependency, or verification change. Keep it aligned with `IMPLEMENTATION WORKFLOW.md` and record blockers honestly.

## Current Phase

- In progress: Epic 3 — Navigation and homepage.

## Current Goal

- Build the remaining homepage storytelling sections, starting with the cinematic featured-work sequence, while preserving the existing content registry and asset approval rules.

## Completed

- Epic 1 foundations: asset inventory with owners, dimensions, and missing/review states; shared project records and project status classifications are in place.
- Epic 2 foundation: Next.js static-export routes, shared root layout, page metadata helper, loading/error/not-found states, and static parameters generated from featured project records.
- Epic 2 design system: CVA button variants, reusable `GlassSurface`, shared dark/light glass, color, radius, spacing, shadow, blur, and motion tokens.
- IBS-005 navigation: floating glass navigation, observer-based active bookmarks, native hash navigation, responsive menu, keyboard dismissal, and reduced-motion-aware GSAP motion.
- IBS-006 hero: content-driven project previews, Embla controls, pause behavior, reduced-motion handling, and a scoped GSAP entrance.
- Featured case-study routes use project data for content and metadata. Review-stage case studies are marked `noindex, nofollow` until approved.
- `pnpm build` passed on 2026-09-29 and generated `/`, `/resume`, `/cv`, and all four featured work routes.
- Browser checks confirmed the case-study content and metadata, dark/light glass colors, and responsive navbar alignment.

## In Progress

- Epic 3 overall. Navigation and hero are implemented; the current Featured Work section still needs the cinematic presentation described by IBS-007.
- Public content readiness: project records remain in review, and approved project imagery, portrait, logo, résumé, CV, and profile details are still pending where listed in the asset inventory.

## Next Up

- IBS-007: build the cinematic featured-work sequence from `featuredProjects`, using labeled placeholders until approved media arrives.
- IBS-008: implement the expanding portrait with a stable reduced-motion/mobile presentation once the portrait is supplied.
- IBS-009: build the responsive laptop/tablet/phone design-to-code scene with reversible scroll behavior.
- Continue with capabilities/process, supporting work, document access, and contact polish; then review and populate case studies with approved content.

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

## Session Notes

- Workspace: `/Users/aibi/Documents/GitHub/aibi-portfolio`.
- Run `npm run dev -- --port 3002` for local browser work when the default ports are occupied; the current `dev` script uses Webpack.
- Run `pnpm build` to validate the static export.
- The latest Epic 2 source changes, dependency updates, and regenerated `out/` export are currently uncommitted. Preserve them when continuing; the old hashed export chunks are replaced by new build output.
