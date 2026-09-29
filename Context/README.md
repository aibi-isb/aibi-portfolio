# IB Dev Studio — portfolio documentation pack

Reconstructed 22 September 2026 • Documentation edition 1.0 • Design System v1.0 is a proposal.

## Read this first

This is a reconstruction, not a recovery of the original Markdown files. The primary source is the full accessible [Portfolio Site Summary conversation](chatgpt-conversation://6ab28357-249c-83ea-8d4a-57e00539273d), especially its 18-part portfolio summary. Its statements are recovered conversation context, not independent verification of repositories, completed features, or outcomes.

Status labels used throughout:

- **Established (E):** explicitly recorded in that conversation or required in the current request.
- **Proposed (P):** newly specified working default; usable for design exploration, not claimed as a past approval.
- **Verify (V):** missing facts, ambiguous classification, assets, URLs, or evidence required before publication.

All exact design tokens and component variants are P. Version 1.0 describes a coherent starting specification, not final visual approval. Draft copy is P. Project completion and impact are V unless evidence is supplied.

## Index

| File | Purpose |
| --- | --- |
| [00 — Master specification](00-portfolio-master.md) | Scope, established decisions, proposed defaults, release criteria |
| [01 — Content strategy](01-content-strategy.md) | Audiences, positioning, draft copy, services, editorial rules |
| [02 — Information architecture](02-information-architecture.md) | Sitemap, routes, navigation, page hierarchy |
| [03 — Design system v1.0](03-design-system.md) | Proposed colors, type, spacing, grids, motion and themes |
| [04 — Component system](04-component-system.md) | Variants, states, semantics and responsive behavior |
| [05 — Project portfolio](05-project-portfolio.md) | All 14 recovered projects, classification and evidence backlog |
| [06 — Case-study template](06-case-study-template.md) | Reusable, publication-safe writing scaffold |
| [07 — Implementation specification](07-implementation-spec.md) | React/Next.js, Tailwind, data, quality and delivery |

Read 00 → 01 → 02 before implementing 03 → 04 → 07. Use 05 to choose evidence and 06 to write it.

## Local context discrepancy

Existing `portfolio/VISUAL_STYLE_CONTEXT.md`, `portfolio/COMPONENT_ARCHITECTURE.md`, and `portfolio/ANIMATION_IMPLEMENTATION.md` describe another local direction: “IB Studio,” a black-and-white editorial foundation, glass surfaces and more elaborate motion. These are not evidence that the referenced conversation had locked those choices. This pack reconstructs the requested **IB Dev Studio** identity and navy/blue direction. It does not supersede the local application's instructions or modify its files. Before using this pack to change that application, reconcile the branding and visual directions explicitly.

## Decisions and missing inputs

E: brand, junior positioning, capability-led structure, honest classifications, case studies, React/Tailwind direction and responsive quality.

P: final copy, exact routes, all visual tokens, component contracts, Next.js App Router architecture, light-first theme, release process.

V: contact details, domain, profile/repository/demo links, portrait/logo assets, project roles and dates, ambiguous Academic/Personal labels, project maturity, final featured selection and measured outcomes.

Update the owning file when a proposal changes; record date, decision, evidence and affected files in its change log. Do not silently relabel a proposal as established history.
