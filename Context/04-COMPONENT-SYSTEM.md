# 04 — UI and component system

Status: reusable, responsive components E; all names, variants, dimensions and contracts P. Tokens are defined in [03](03-design-system.md); page placement in [02](02-information-architecture.md).

## Shared contract — P

All interactive components support keyboard operation, visible focus, readable labels and touch targets of at least 44×44px as the design default. Focus: 2px focus-token outline with a 2px offset on a contrasting surface. Do not remove the browser outline without a replacement. States must not rely on color alone.

Use links for navigation and buttons for actions. Disabled buttons use native disabled semantics; avoid rendering fake disabled links. Loading actions retain their width and accessible name, prevent repeat submission and expose busy state. Touch users get complete content without hover. Keep native semantics unless a complex widget genuinely needs ARIA.

## Component catalog — P

| Component | Variants/inputs | States and behavior |
| --- | --- | --- |
| Button / ActionLink | primary, secondary, text; sm 44px, md 48px; optional leading/trailing icon | Default, hover, focus-visible, active; Button additionally disabled/loading. Primary uses brand/on-brand; secondary surface/ink/control-line; text links are underlined in prose. Full width on small screens only where layout needs it. |
| IconButton | 44px hit target; 20px icon | Accessible name, hover/focus/active/disabled; tooltip is optional and not its only name. |
| SiteHeader | Brand, navigation, CTA | Sticky optional; solid surface; compact mobile menu below lg. Header never obscures focused content or anchor targets. |
| MobileMenu | Expanded/collapsed | Button exposes aria-expanded and aria-controls. Inline disclosure by default, closes on selection/Escape and returns focus to trigger on Escape. If changed to modal drawer, add focus containment, background inertness and focus restoration. |
| SectionHeading | Eyebrow optional, title, intro | Correct heading level; intro ≤68ch; no arbitrary heading skips. |
| ProjectCard | featured, standard; project record | Image, title link, origin, maturity, capability, short summary and role. One clear primary case-study link; separate repository link if needed. No nested links or click handlers on the whole article. |
| ServiceCard | Title, description, deliverables, evidence link | No interactive styling unless a destination exists. Avoid implying every listed deliverable is verified in every project. |
| Tag | origin, capability, maturity | Noninteractive text by default. “Academic” and “Personal” remain readable; status includes words. |
| FilterBar | All plus capability categories | Real buttons, aria-pressed, result count announcement and reset. Distinct from static tags. |
| SkillGroup | Heading, technologies, evidence links | Semantic list; no arbitrary scores or progress meters. |
| CaseStudyHeader | Title, summary, origin, maturity, role, links | One h1. Omit absent dates, demo and repository controls. Origin remains near title. |
| ProjectGallery | Image, alt, caption, optional figure number | Static responsive figures first; optional lightbox needs dialog semantics, close control, Escape and focus return. No autoplay. |
| MetadataList | Role, context, dates, stack, team | Semantic description list; wrap long text and URLs. Missing facts omitted or resolved before release. |
| TextField / TextArea | Visible label, required flag, hint, error | Empty, populated, focus, invalid, disabled. aria-describedby connects hint/error. No placeholder-only labels. |
| ContactForm (optional) | Name, email, message; optional timing/budget | Idle, validating, submitting, success, error. Announce result, preserve failed input, show field errors, prevent duplicate sends. Success only after server acceptance. |
| ContactCTA | Heading, brief text, verified destination | No invented email or fake submission interaction. |
| SiteFooter | Brand, routes, verified profiles | Clear link labels; no fake legal/copyright ownership claims for project assets. |
| EmptyState / NotFound | Explanation, recovery link/action | Helpful text; never a blank grid or loading spinner forever. |

## Project card content order — P

1. Screenshot/preview with accurate caption where needed.
2. Academic or Personal origin and maturity.
3. Project title.
4. One sentence explaining the problem and implemented scope.
5. Ibrahim's role and up to three useful technology/capability tags.
6. “Read case study” destination.

The featured variant may use a wider image and longer summary; it does not remove the origin label. Do not make “Featured” imply production-ready.

## Composition and responsive rules — P

Use Section and Container for shared layout; keep project data independent from card markup. Cards stretch evenly within grids but text is never clipped to force equal height. Buttons may wrap; metadata stacks on narrow screens. Sticky navigation must not consume excessive space at 200% zoom. Case-study text and images follow one meaningful DOM order at every width.

Prefer simple components over a large general-purpose widget library. An accessible primitive library may be evaluated for optional dialogs; the choice is not established. Do not add galleries, modals or carousels just to populate this component catalog.

## Review matrix — P

Review primary and secondary buttons, navigation, one project card, fields and optional overlays in default, hover, focus, active, disabled, loading and error states where applicable. Test keyboard-only, touch, reduced motion, narrow layouts and zoom. If dark mode ships, repeat with dark tokens. No component is accepted solely from a static screenshot.
