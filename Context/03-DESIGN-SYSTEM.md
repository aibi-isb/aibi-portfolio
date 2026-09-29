# 03 — Design System v1.0

**Status: proposed specification, not previously approved.** E: minimalist, modern, technical, professional, spacious; navy/dark blue, electric blue, charcoal and white; optional green. Every exact value and rule below is **P**, including theme behavior, typography, layout, icons and motion. [Source boundary](README.md).

## Semantic palette — P

Light-first release. The dark column is an optional companion proposal, not a requirement to ship a theme switcher.

| Token | Light | Dark proposal | Use |
| --- | --- | --- | --- |
| canvas | `#F8FAFC` | `#0B1120` | Page background |
| surface | `#FFFFFF` | `#0F172A` | Cards and navigation |
| surface-muted | `#F1F5F9` | `#1E293B` | Secondary sections |
| ink | `#0F172A` | `#F8FAFC` | Main text |
| ink-muted | `#475569` | `#CBD5E1` | Supporting text |
| line | `#CBD5E1` | `#334155` | Decorative dividers |
| control-line | `#64748B` | `#94A3B8` | Input/control boundaries |
| brand | `#2563EB` | `#93C5FD` | Links and primary fill |
| brand-hover | `#1D4ED8` | `#BFDBFE` | Hover primary fill |
| on-brand | `#FFFFFF` | `#0B1120` | Primary text/icon |
| focus | `#2563EB` | `#93C5FD` | Keyboard outline |
| success | `#15803D` | `#86EFAC` | Confirmed success, optional green |
| danger | `#B91C1C` | `#FCA5A5` | Errors with supporting text |

Use the navy ink/canvas as the identity foundation. Blue indicates interaction; green is limited to real status. No fixed-color text on arbitrary project imagery. Place captions on a solid surface. Decorative line is not sufficient as the only boundary of an input; use control-line.

Contrast targets: normal text ≥4.5:1; large text ≥3:1; essential control boundaries and focus cues ≥3:1 against adjacent colors. These are implementation acceptance targets, not a claim that all rendered combinations have been audited. Check actual states, images, opacity and themes.

## Typography — P

Primary family: Inter, locally served if used; fallback `ui-sans-serif, system-ui, sans-serif`. Optional technical labels/code: JetBrains Mono with `ui-monospace, monospace` fallback. Do not ship the mono font unless needed. Use one sans family for headings and body.

| Role | Size | Line height | Weight |
| --- | --- | --- | --- |
| Display | `clamp(2.5rem, 5vw, 4rem)` | 1.1 | 700 |
| H1 (inner page) | `clamp(2rem, 4vw, 3rem)` | 1.15 | 700 |
| H2 | `clamp(1.75rem, 3vw, 2.25rem)` | 1.2 | 600 |
| H3 | 1.5rem | 1.3 | 600 |
| Lead | 1.25rem | 1.6 | 400 |
| Body | 1rem | 1.65 | 400 |
| Label | 0.875rem | 1.4 | 500 |
| Caption | 0.875rem | 1.5 | 400 |

Body measure ≤68ch; heading measure approximately 18–24ch. Heading letter spacing −0.02em; body normal. Preserve semantic heading order regardless of visual size. Avoid uppercase paragraphs and tiny metadata.

## Spacing, grid and breakpoints — P

Spacing scale (rem): `0, .25, .5, .75, 1, 1.5, 2, 3, 4, 6, 8` = `0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px` at a 16px root. Keep the browser root font preference intact.

- Page gutters: 1rem base, 1.5rem at sm, 2rem at lg.
- Content max width: 75rem; centered. Prose max width: 68ch.
- Section vertical space: 4rem base, 6rem at lg; reserve 8rem for a spacious desktop hero only if content allows.
- Grid: 4 conceptual columns mobile, 8 tablet, 12 desktop; gaps 1rem base and 1.5rem from md. Actual components use CSS Grid rather than empty spacer columns.
- Card padding: 1.5rem base, 2rem for larger featured cards.

| Breakpoint | Min width | Intended adaptation |
| --- | --- | --- |
| base | 0 | Stacked mobile layout |
| sm | 40rem / 640px | Wider gutters |
| md | 48rem / 768px | Two-column work cards |
| lg | 64rem / 1024px | Full navigation, split hero |
| xl | 80rem / 1280px | Optional three-column work grid |
| 2xl | 96rem / 1536px | Capped content, extra outer whitespace |

Widths are layout triggers, not device detection. Verify 320px through wide desktop, text zoom and landscape.

## Shape and elevation — P

| Token | Value | Use |
| --- | --- | --- |
| radius-sm | 0.375rem | Fields and small controls |
| radius-md | 0.75rem | Buttons and standard cards |
| radius-lg | 1rem | Featured media panels |
| radius-pill | 9999px | Small tags only |
| shadow-sm | `0 1px 3px rgb(15 23 42 / 0.08)` | Subtle raised surface |
| shadow-md | `0 8px 24px rgb(15 23 42 / 0.10)` | Hover card or dropdown |
| shadow-lg | `0 16px 48px rgb(15 23 42 / 0.16)` | Modal only if needed |

Borders are generally 1px. Prefer whitespace and borders before shadows. Dark surfaces rely on borders rather than stronger shadows. Layer order: base 0, sticky header 20, menu overlay 40, dialog 50, skip link 60.

## Iconography and imagery — P

Proposed icon family: Lucide-style outline icons, one consistent set, 20px in controls and 24px in feature headings, 1.75–2px stroke. The specific library is not historically approved. Decorative icons are hidden from assistive technology; icon-only controls require a name. Keep text for important actions. Use official brand assets where appropriate rather than approximated company marks.

Use real project screenshots, captioned prototypes and permission-cleared portraits. Default preview frame 16:10; mobile screenshots preserve their original ratio inside that frame. Use contain when cropping would hide essential evidence. Never fabricate product screens as completed work. An IB text monogram is a placeholder concept until final identity artwork exists.

## Motion — P

Fast 120ms, standard 180ms, entrance 240ms; easing `cubic-bezier(0.2, 0, 0, 1)`. Hover lift ≤2px. Transition specific properties, not `all`. No scroll hijacking, autoplay background video, custom cursor, required parallax or mandatory animation dependency in this baseline.

Honor `prefers-reduced-motion`: remove translations and entrance movement, use immediate state changes, keep all content visible. Never initialize essential text to hidden pending JavaScript. Motion communicates feedback and must not delay navigation.

## Theme behavior — P

Ship light-only first. If dark mode is implemented later, use the semantic dark column for all components, inherit system preference initially, persist explicit user choice and avoid a first-paint flash. Test every variant in both themes. Do not mix dark tokens with light on-brand text.

## Design handoff — P

If creating a Figma library later, use collections `Color/Semantic`, `Typography`, `Spacing`, `Radius`, `Elevation` and `Motion`; color modes Light/Dark. Bind components to semantic tokens. These are naming proposals; no Figma file or variables were created by this pack.
