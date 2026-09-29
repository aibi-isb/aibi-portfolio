 # 07 — React / Next.js + Tailwind implementation specification

Status: React/Tailwind, reusable components, responsive quality, accessibility, performance and SEO E; architecture and delivery choices below P. No code implementation or dependency migration is performed by this document. Consult [master scope](00-portfolio-master.md) and [local context discrepancy](README.md) before changing an existing repository.

## Architecture — P

Use React through Next.js App Router with TypeScript and Tailwind CSS. Keep case-study content in local typed records plus Markdown rendered through an explicit, maintained content pipeline. Avoid a CMS, database and authentication for the portfolio itself. Demonstrate database-backed work through case studies.

Select a supported stable Next.js/React pairing at implementation time, check the official requirements, and commit the lockfile. Tailwind examples here assume v4's CSS-first configuration; do not copy them into a v3 project without adapting them. Existing repositories keep their working toolchain until a migration is explicitly part of scope.

Proposed structure:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    about/page.tsx
    services/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    contact/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  components/
    ui/                  Button, Tag, Field, Container
    layout/              Header, Footer, MobileMenu
    portfolio/           ProjectCard, Gallery, MetadataList
  content/
    projects/            curated Markdown case studies
    projects.ts          validated metadata/index
    site.ts              verified identity and contact configuration
  lib/
    content.ts           load, validate, filter published records
public/
  projects/[slug]/       approved optimized images
  identity/              approved brand assets
```

A plain React build remains an acceptable alternative to Next.js if the existing project demands it, but must supply equivalent routing, prerendered discoverable case studies and page metadata. Do not maintain two frameworks for this portfolio.

## Rendering and interactions — P

Use server-rendered pages for content; isolate client components to menus, optional filters and an optional form. Server Components can render Client Components; interactive/browser-only behavior belongs at those boundaries. See [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).

Generate known project routes from published records; unknown or draft slugs return not-found. Keep Markdown rendering on the trusted build/server side, disable raw HTML unless safely handled, and do not execute user-submitted MDX. A missing optional link is omitted rather than rendered as `#`.

## Content contract — P

```ts
type ProjectOrigin = 'Academic' | 'Personal';
type ProjectMaturity =
  | 'Concept' | 'Prototype' | 'In progress' | 'Completed' | 'Archived';
type Project = {
  title: string;
  slug: string;
  origin: ProjectOrigin | null; // null permitted only in draft
  maturity: ProjectMaturity | null;
  publicationStatus: 'draft' | 'published';
  featured: boolean;
  summary: string;
  role: string;
  teamAndAssistance: string;
  capabilities: string[];
  stack: string[];
  dates?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  designUrl?: string;
  screenshots: { src: string; alt: string; caption: string }[];
  outcomes: { claim: string; evidence: string; conditions?: string }[];
  limitations: string[];
  bodyFile: string;
};
```

Validate unique slugs, allowed classifications, internal image paths, valid URL schemes, and existence of body files. Reject published records with missing origin/maturity/role/summary or unresolved placeholders. Do not constrain future genuine client projects to a false origin: extend the enum deliberately if supported by evidence. Published pages, cards, metadata and sitemap use the same filtered records.

## Tailwind token integration — P

Illustrative v4 bridge for the light baseline; implement the full token table from 03 in the same central stylesheet. Component classes reference semantic names rather than scattered hex values.

```css
@import "tailwindcss";

@theme {
  --color-canvas: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-muted: #f1f5f9;
  --color-ink: #0f172a;
  --color-ink-muted: #475569;
  --color-line: #cbd5e1;
  --color-control-line: #64748b;
  --color-brand: #2563eb;
  --color-brand-hover: #1d4ed8;
  --color-on-brand: #ffffff;
  --color-focus: #2563eb;
  --color-success: #15803d;
  --color-danger: #b91c1c;
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;
}
```

Use complete literal class strings in a variant map instead of dynamically constructing class names. Example semantic classes: `bg-surface text-ink border-control-line`. Explicitly map the remaining spacing, shadow and motion values from 03. Local font loading must actually provide Inter; otherwise use the system fallback rather than assuming a declaration downloads it. See [Tailwind theme variables](https://tailwindcss.com/docs/theme) and [responsive design](https://tailwindcss.com/docs/responsive-design).

## Contact and privacy — P

Baseline: verified email link plus verified professional profiles. No form backend is required. If adding a form, choose a real delivery service/server endpoint, validate input server-side, limit abuse and message length, preserve failed input and display success only after confirmed acceptance. Keep service secrets server-side and out of public environment variables. Document provider, retention and contact-data handling according to the actual deployment; do not add invented privacy promises. No analytics by default; add only with a defined need and appropriate consent handling.

## Accessibility — P acceptance criteria

Use semantic landmarks, logical headings, skip link, visible focus, accurate link names, alt text and complete keyboard flows. Meet the contrast targets in 03, check 200% text zoom and 320px layout, and test reduced motion. Menus expose state; form errors are connected to fields and announced. Optional dialogs restore focus. Do not use color-only labels or hover-only content.

Automated accessibility checks support manual keyboard and screen-reader checks; a passing scanner alone is not a compliance claim.

## Performance — P budgets and verification

Keep meaningful content visible without interaction code. Optimize images, declare dimensions and responsive sizes, lazy-load below-fold media, and load only the essential hero asset eagerly using the installed framework's documented API. Avoid autoplay media and animation libraries for the baseline. Subset fonts and limit weights.

Proposed targets: LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile when sufficient field data exists. Before launch, use repeatable mobile lab checks as diagnostics, not fabricated field results. Investigate large media and unnecessary client bundles when targets are missed; record test conditions. These numbers are targets, not measured results for an existing build.

## SEO and sharing — P

Each page has a useful title and description; each published case study has its own metadata. Use the verified domain for canonical URLs and metadataBase; omit fake domains from production. Generate sitemap entries from published content, and create readable social preview images from real assets. Add Person structured data only with verified values; do not imply a registered agency or fabricated reviews.

Next.js metadata exports belong in Server Components; use static metadata for fixed pages and generateMetadata for project-specific details. See [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) and [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata). Keep draft routes out of public output rather than relying on robots.txt to conceal them.

## Delivery and verification — P

1. Inventory the existing repository and its instructions; reconcile the alternative local style before implementation.
2. Build content validation, routes and static layouts with real or explicitly draft records.
3. Apply tokens and component contracts; add only necessary client interactions.
4. Run the repository's formatter, lint, type checking and production build commands.
5. Check all published routes, unknown slugs, missing links, project filtering if present and contact failure/success if a form is present.
6. Inspect at 320, 375, 768, 1024 and 1440px; test keyboard, zoom, reduced motion and long titles.
7. Review actual contrast, mobile media loading, layout shift, metadata and share previews.
8. Deploy to a compatible host under the implementation request's authorization; verify HTTPS, environment configuration, contact and links on the deployed version. Preserve a rollback path.

Use focused tests for content publication gates and any real form endpoint. Avoid tests that merely repeat static markup. Static export is an option only if the chosen runtime features and contact strategy support it; host selection and domain are V.

## Completion evidence

Record build/check results, tested routes and sizes, known limitations, deployed URL when applicable, and the exact release revision. This specification supplies a plan; no build, accessibility certification, performance result or deployment is claimed by the documentation pack.
