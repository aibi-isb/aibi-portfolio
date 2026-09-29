# IB Studio Component Architecture Context

## Purpose

This file defines the reusable, component-based, non-hardcoded implementation philosophy for the IB Studio portfolio.

Read this file before:

- Adding or restructuring pages
- Creating project content
- Building homepage sections
- Building case-study layouts
- Adding design-system primitives
- Adding responsive device variants
- Adding animation hooks or utilities
- Registering project assets
- Adding navigation, cursor, document, or contact states
- Creating shared TypeScript types

Follow `AGENTS.md` for the complete product requirements and `ANIMATION_IMPLEMENTATION.md` for animation and effects decisions.

## Architecture principle

Use this philosophy:

> Content-driven components, token-driven styling, configuration-driven interaction, and scene-owned animation.

The architecture should make common changes local and predictable without forcing unique visual storytelling into an unreadable universal abstraction.

The practical test is:

> If changing one project, colour, breakpoint, cursor state, or document requires editing several unrelated components, the implementation is too hardcoded. If a one-off visual sequence has been forced into a complex universal abstraction, the implementation is too generic.

## System layers

Keep these responsibilities separate:

```text
Content records ────────> Typed content models ────────> Page and section components
Design tokens ─────────> Component variants ──────────> Consistent visual output
Interaction config ────> Shared hooks/controllers ────> Cursor and responsive behaviour
Scene-specific intent ─> Scene-owned timelines ───────> Cinematic storytelling
```

Do not place content, styling policy, shared behaviour, and complex animation orchestration inside one page component.

## Content-driven components

Project information must live in structured content files, not inside visual components.

A single project record should supply:

- Homepage featured-project section
- Supporting project card
- Hero slideshow
- Project cursor state
- Case-study route
- Case-study metadata
- Related-project navigation
- SEO metadata

Updating a title, role, date, status, description, link, or image should update every consumer automatically.

Recommended structure:

```text
content/
├── site.ts
├── navigation.ts
├── capabilities.ts
├── process.ts
├── documents.ts
└── projects/
    ├── index.ts
    ├── house-rental.ts
    ├── salone-fresh.ts
    ├── yummy-provision.ts
    └── dash-delivery.ts
```

Use one registry or index to expose ordered project collections such as `featuredProjects`, `supportingProjects`, and `allProjects`. Do not independently repeat those lists in the hero, homepage, and case-study navigation.

## TypeScript content models

Define shared content types in `types/`. Prefer discriminated unions where content sections have different requirements.

Recommended project model:

```ts
export type ProjectStatus =
  | 'completed'
  | 'in-progress'
  | 'academic'
  | 'experimental';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  dates: string;
  status: ProjectStatus;
  featured: boolean;
  disciplines: string[];
  technologies: string[];
  theme: ProjectTheme;
  media: ProjectMedia[];
  caseStudy: CaseStudySection[];
  links?: ProjectLinks;
};
```

Recommended case-study section union:

```ts
export type CaseStudySection =
  | {
      type: 'text';
      heading: string;
      body: string[];
    }
  | {
      type: 'gallery';
      images: ProjectImage[];
    }
  | {
      type: 'comparison';
      before: ProjectImage;
      after: ProjectImage;
    }
  | {
      type: 'process';
      steps: ProcessStep[];
    }
  | {
      type: 'quote';
      text: string;
      attribution?: string;
    }
  | {
      type: 'ai-contribution';
      assisted: string[];
      owned: string[];
    };
```

The case-study renderer selects a component from the `type` field. It must support omitted sections cleanly. Never invent text or display empty sections merely to satisfy a fixed layout.

Validate content at development time. A published project must have a unique slug, title, summary, role, dates, status, at least one discipline, a valid theme, and media with valid dimensions and alternative-text policy.

## Content rendering rules

Pass complete domain objects when a component represents a complete domain concept.

Prefer:

```tsx
<FeaturedProject project={project} />
```

Avoid:

```tsx
<FeaturedProject
  title="House Rental Management System"
  role="System Analyst and Frontend Developer"
  dates="January–March 2026"
  summary="..."
  technologies={[...]}
  image="..."
/>
```

Individual primitives should still receive focused props. Do not pass a full `Project` into a generic `Button`, `Badge`, or `MediaFrame` when only a label or status is needed.

## Token-driven styling

Use shared tokens for:

- Foundation colours
- Muted project accents
- Gradients
- Frosted-glass backgrounds
- Glass borders and highlights
- Blur strengths
- Shadows
- Corner radii
- Typography scale
- Section spacing
- Navigation dimensions
- Device dimensions
- Animation durations
- Easings and spring values
- Layer and z-index policy

Tokens should flow into component variants and page compositions:

```text
Design tokens ──> Component variants ──> Homepage and case studies
```

Do not embed unrelated arbitrary colour, blur, radius, shadow, or timing values throughout components.

Project-specific visual choices belong in a project theme:

```ts
export type ProjectTheme = {
  background: string;
  foreground: 'light' | 'dark';
  accent: string;
  gradient: string;
};
```

Use a controlled registry or typed theme tokens rather than injecting unsafe or unrestricted CSS strings from content.

## Primitive component system

Create a small collection of robust design-system primitives:

- `Button`
- `GlassSurface`
- `SectionShell`
- `Container`
- `SectionHeading`
- `StatusBadge`
- `MediaFrame`
- `IconAction`
- `GradientSurface`

Primitives own stable visual and accessibility policy. They must not know about a specific project.

### Button variants

Use the existing class-variance-authority dependency for one shared Button implementation.

Recommended variants:

- `primary`
- `secondary`
- `glass`
- `textArrow`
- `project`
- `document`
- `contact`
- `icon`

Prefer explicit variants:

```tsx
<Button variant="project" size="large" motion="magnetic" />
```

Avoid Boolean prop combinations:

```tsx
<Button glass dark large magnetic projectButton />
```

Use a small number of orthogonal axes such as `variant`, `size`, and `motion`. Prevent impossible combinations through TypeScript when practical.

All Button variants share:

- Typography
- Height and padding system
- Minimum touch target
- Focus treatment
- Disabled treatment
- Loading treatment when relevant
- Motion timing

## Portfolio components

Compose primitives into domain-aware portfolio components:

- `SiteHeader`
- `ScrollSpyNavigation`
- `MobileNavigation`
- `Hero`
- `FeaturedProject`
- `ProjectCard`
- `ProjectSlideshow`
- `ExpandingPortrait`
- `CapabilitySection`
- `ProcessTimeline`
- `DocumentChooser`
- `ContactSection`
- `CaseStudyLayout`
- `CaseStudyRenderer`
- `CaseStudyGallery`
- `ProjectPager`

Portfolio components may understand project and site content types. They should not duplicate content records or define global design tokens.

## Device component system

Expose one public device interface with separate intentional renderers:

```tsx
<ProjectDevice
  variant="responsive"
  project={project}
  mode="design-to-code"
/>
```

Recommended structure:

```text
ProjectDevice
├── LaptopFrame
├── TabletFrame
└── PhoneFrame
```

Shared device layers:

- Screen
- Bezel
- Reflection
- Shadow
- Media viewport
- Project label

Unique layers:

- Laptop hinge and keyboard
- Tablet edge and camera
- Phone speaker and controls

Keep device dimensions, aspect ratios, bezel values, perspectives, and breakpoint mappings in one configuration source. Do not repeat them in multiple components or animation files.

The device resolver may choose a renderer from a media query, but each renderer must remain deliberately designed for its breakpoint rather than merely scaling the laptop.

## Asset registry

Use a central asset registry or typed media records instead of embedding deep file paths throughout components.

Example:

```ts
export const projectAssets = {
  houseRental: {
    hero: {
      src: '/projects/house-rental/hero.webp',
      width: 1920,
      height: 1080,
      alt: 'House Rental dashboard showing property listings',
    },
    erd: {
      src: '/projects/house-rental/erd.webp',
      width: 1600,
      height: 1000,
      alt: 'Entity relationship diagram for the House Rental system',
    },
  },
};
```

Media records should support:

- Source
- Width and height
- Alternative text
- Decorative flag
- Caption
- Media type
- Focal point
- Mobile alternative
- Placeholder status

When the user supplies final assets, replace registry entries rather than searching through page components.

Never publish a development placeholder as approved project evidence.

## Configuration-driven interaction

Interactive components should declare intent through typed configuration or stable data attributes. A global controller or shared hook implements the behaviour.

### Cursor declarations

Example:

```tsx
<ProjectCard data-cursor="view" />
<DeviceScreen data-cursor="compare" />
<DocumentButton data-cursor="document" />
<ContactLink data-cursor="hello" />
```

Central registry:

```ts
export const cursorStates = {
  default: { label: '', size: 'small' },
  view: { label: 'View', size: 'large' },
  compare: { label: 'Design ↔ Build', size: 'large' },
  document: { label: 'Open', size: 'medium' },
  hello: { label: 'Hello', size: 'large' },
} as const;
```

Do not scatter cursor labels, sizes, colours, or timing values throughout components.

### Navigation declarations

Store homepage bookmark information once:

```ts
export const homepageSections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'process', label: 'Process' },
] as const;
```

Use the same registry to render desktop links, mobile links, active-section observation, and hash navigation.

### Document declarations

Store résumé and CV information in one registry containing label, description, path, file type, size when known, and publication status. The hero button, chooser, footer, and metadata must read from this registry.

## Shared hooks and controllers

Keep reusable behaviour outside presentational components.

Recommended hooks and utilities:

- `useActiveSection`
- `useFinePointer`
- `useReducedMotion`
- `usePointerPosition`
- `useMagneticTarget`
- `useProjectSlideshow`
- `useResponsiveDevice`
- `useViewTransition`
- `useMediaLoaded`

Recommended animation helpers:

- `createMaskedReveal`
- `createSectionEntrance`
- `createMagneticEffect`
- `createPointerParallax`
- `createDeviceTimeline`
- `createPortraitTimeline`

Rules:

- A shared hook must encapsulate reusable behaviour, cleanup, or platform policy.
- Do not create a hook merely to rename one line of React state.
- Avoid React state updates for every pointer or scroll frame.
- Shared animation helpers must return or participate in reliable cleanup.
- Reduced-motion decisions should be centralized and respected by all consumers.

## Scene-owned animation

The hero, portrait, and design-to-code experience are distinct narrative scenes. Keep their exact timelines close to their components.

Recommended structure:

```text
components/scenes/
├── hero/
│   ├── Hero.tsx
│   ├── HeroDevice.tsx
│   └── hero.timeline.ts
├── portrait/
│   ├── ExpandingPortrait.tsx
│   └── portrait.timeline.ts
└── design-to-code/
    ├── DesignToCodeScene.tsx
    ├── DesignInspectionLens.tsx
    └── device.timeline.ts
```

Reuse animation helpers and tokens, but keep these scene-specific choices local:

- Exact sequence order
- Camera angles
- Hinge timing
- Portrait crop positions
- Per-project composition
- Unique transition choreography
- Breakpoint-specific art-direction adjustments

Do not build a giant universal animation JSON format containing every selector, coordinate, and timeline instruction.

## Reusable responsive logic

Define responsive device queries once:

```ts
export const deviceQueries = {
  laptop: '(min-width: 1280px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  phone: '(max-width: 767px)',
} as const;
```

Keep the same values aligned with CSS tokens and Tailwind conventions. Do not scatter `1280`, `768`, or equivalent conditions through the component tree.

Prefer CSS media queries when presentation alone changes. Use JavaScript media queries only when the rendered component or animation timeline genuinely differs.

Provide a deterministic initial render that does not produce hydration mismatches. Do not depend on `window.innerWidth` during server rendering.

## Accessibility belongs in primitives

Implement accessibility once in the lowest suitable reusable layer:

- `Button` owns focus, disabled, and loading states.
- `DocumentChooser` owns dialog focus management and dismissal.
- `ProjectSlideshow` owns control labels, pause behaviour, and active-slide state.
- `AdaptiveCursor` disables itself on coarse pointers.
- `AnimatedSection` or scene utilities provide reduced-motion behaviour.
- `MediaFrame` requires alternative text or an explicit decorative flag.
- `SectionBookmark` owns `aria-current` and header-offset behaviour.
- `ProjectPager` exposes previous and next project names.

Do not depend on every page author remembering the same focus, pointer, image, dialog, or motion requirements.

## Error and fallback ownership

Reusable systems must define their fallback behaviour:

- Missing optional media: omit the media block or use an approved development placeholder outside production.
- Missing project link: do not render the action.
- Unsupported View Transition API: navigate normally.
- Unsupported backdrop filter: use a more opaque solid surface.
- Reduced motion: render the intentional reduced-motion variant.
- Fine pointer unavailable: disable cursor and magnetic effects.
- JavaScript animation failure: leave semantic content readable and visible.
- Embla unavailable before hydration: render slides in readable source order.

Avoid silent broken controls and empty panels.

## What must not be hardcoded

Do not embed these in page or visual components:

- Project titles
- Project summaries and descriptions
- Project status
- Project dates and roles
- Technology lists
- Image paths and alternative text
- Project links
- Navigation items
- Contact links
- Résumé and CV paths
- Cursor labels
- Breakpoint values
- Glass opacity and blur
- Project theme colours and gradients
- Shared animation durations and easings
- Device dimensions
- Case-study section order
- Featured and supporting project lists

## What may remain intentionally specific

Do not over-abstract unique art direction. These may remain scene-specific:

- Hero composition
- Laptop hinge choreography
- Portrait crop sequence
- Per-project cinematic layouts
- Device camera angles
- Project-specific mask shapes
- Carefully designed breakpoint adjustments
- Unique case-study editorial moments

The rule is:

> Reuse stable policies, data structures, and behaviours. Keep unique storytelling decisions close to the scene that needs them.

## Avoid premature abstraction

Use the rule of three as a guide, not a law:

- First instance: implement clearly and locally.
- Second similar instance: compare the real similarities and differences.
- Third stable instance: extract a shared primitive, hook, helper, or variant.

Extract earlier when accessibility, cleanup, content integrity, or global design policy must be consistent from the first use.

Do not create generic components with dozens of props in anticipation of unknown future requirements.

## Recommended directory architecture

```text
portfolio/
├── app/
│   ├── page.tsx
│   ├── work/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── resume/
│   │   └── page.tsx
│   ├── cv/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── primitives/
│   ├── navigation/
│   ├── portfolio/
│   ├── devices/
│   ├── scenes/
│   └── case-study/
├── content/
│   ├── site.ts
│   ├── navigation.ts
│   ├── capabilities.ts
│   ├── process.ts
│   ├── documents.ts
│   └── projects/
├── lib/
│   ├── animation/
│   ├── cursor/
│   ├── media/
│   └── accessibility/
├── styles/
│   ├── tokens.css
│   ├── glass.css
│   └── motion.css
├── types/
│   ├── project.ts
│   ├── media.ts
│   └── animation.ts
└── public/
    ├── brand/
    ├── documents/
    └── projects/
```

Adjust this structure when the framework requires a different location, but preserve the responsibility boundaries. Do not create empty directories before they have real content.

## Dependency policy

Before adding a package, determine whether the need is already covered by:

1. The browser platform
2. React or Vinext
3. Tailwind CSS
4. Base UI or existing shadcn-compatible primitives
5. GSAP and its approved plugins
6. Embla Carousel
7. A small local utility

Add a new dependency only when it provides a material capability, accessibility guarantee, or maintenance benefit that the existing stack cannot reasonably provide.

Do not add overlapping component libraries or animation frameworks.

## Implementation sequence

1. Define shared types.
2. Define site, navigation, document, process, and capability records.
3. Define project records and project registry.
4. Define tokens and controlled project themes.
5. Build core primitives.
6. Build accessible navigation and document components.
7. Build device primitives and responsive resolver.
8. Build homepage portfolio components.
9. Build scene-owned animations using the animation context.
10. Build the case-study renderer.
11. Populate initial project records and case studies.
12. Add asset registry entries as approved assets arrive.
13. Verify fallbacks, accessibility, responsiveness, and content integrity.

## Review checklist

Before completing a component or architecture ticket, confirm:

- Content is not duplicated across components.
- Shared tokens replace repeated arbitrary values.
- Repeated interaction behaviour has one owner.
- Components have clear responsibility boundaries.
- Props describe intent rather than internal styling accidents.
- Variants do not permit nonsensical combinations.
- Domain components receive typed domain data.
- Primitives receive focused props.
- Assets include dimensions and alternative-text policy.
- Responsive logic does not cause hydration mismatches.
- Reduced-motion and coarse-pointer states are supported.
- Missing links and optional content do not create empty controls.
- Unique animation choreography remains readable and local.
- No new dependency duplicates existing capability.

## Completion standard

The component architecture is successful when:

- A project can be added primarily by creating one typed content record and supplying assets.
- A project edit updates the homepage, cards, case-study route, navigation, and metadata automatically.
- A global style change can be made through tokens or a controlled variant.
- Cursor and document states can be extended through central registries.
- Laptop, tablet, and phone variants share stable device contracts without losing intentional art direction.
- Accessibility and fallbacks are built into reusable layers.
- Scene timelines remain isolated, reversible, and understandable.
- Pages compose existing components instead of duplicating logic.
- Unique project presentations remain possible without modifying global primitives.
- The implementation is neither hardcoded nor over-generalized.

