# IB Studio Animation and Effects Implementation Context

## Purpose

This file is the implementation authority for animation, scrolling, pointer effects, responsive device presentations, frosted glass, project slideshows, and page transitions in the IB Studio portfolio.

Read this file before editing any of the following:

- Hero motion
- Scroll-driven sections
- Laptop, tablet, or phone scenes
- Custom cursor or magnetic interactions
- Project slideshows and media galleries
- Expanding portrait behaviour
- Design-to-code inspection effects
- Frosted-glass surfaces
- Homepage bookmark navigation
- Case-study page transitions
- Reduced-motion fallbacks

Follow the broader product, content, accessibility, and release rules in `AGENTS.md` as well.

## Approved architecture

Keep the existing application foundation:

- React 19
- Vinext
- TypeScript
- Tailwind CSS 4
- Base UI
- shadcn-compatible components
- Embla Carousel
- Lucide React
- Cloudflare-compatible production output

Add only the missing primary animation packages:

```bash
pnpm add gsap @gsap/react
```

Use **GSAP as the single primary animation engine**. Do not add Motion, Framer Motion, Lenis, Three.js, React Three Fiber, a custom-cursor package, or a second general animation framework during the initial implementation.

The approved production stack is:

```text
React + Vinext
Tailwind CSS + CSS variables
Base UI + shadcn-compatible components
GSAP + ScrollTrigger + @gsap/react
GSAP SplitText + Flip only where justified
Embla Carousel
Native Pointer Events
Native Intersection Observer
Native View Transition API as progressive enhancement
HTML/CSS 3D, masks, gradients, and backdrop filters
```

## Tool ownership

Use each tool for the work it handles best.

| Concern | Implementation owner |
| --- | --- |
| Component rendering and state | React |
| Routes and page layouts | Vinext |
| Tokens, layout, responsiveness, glass, gradients, radii | Tailwind CSS and CSS variables |
| Timelines and component motion | GSAP core |
| Reversible and pinned scroll sequences | GSAP ScrollTrigger |
| React lifecycle and cleanup for GSAP | `@gsap/react` |
| Selected headline masks | GSAP SplitText |
| Moving an element between measured layout states | GSAP Flip |
| Pointer, touch, or swipe velocity when genuinely needed | GSAP Observer |
| Project slideshow and media gallery | Embla Carousel |
| Accessible menus, dialogs, drawers, and popovers | Base UI or existing shadcn-compatible components |
| Active homepage bookmark | Intersection Observer |
| Case-study route transition | View Transition API with normal-navigation fallback |
| Laptop, tablet, and phone construction | Semantic HTML and CSS 3D |
| Cursor following and hover coordinates | Native Pointer Events with GSAP setters |

Avoid overlapping ownership. For example, do not make both Embla and GSAP control the same slide position. Embla owns slide selection and drag physics; GSAP may animate the surrounding device, labels, masks, or entrance and exit states.

## GSAP integration rules

### Client boundaries

GSAP code must run only in client components. Do not access `window`, `document`, element measurements, GSAP, or ScrollTrigger during server rendering.

### React lifecycle

Use `useGSAP()` from `@gsap/react` for GSAP setup and cleanup. Scope selectors to the component root.

Preferred pattern:

```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AnimatedSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Create scoped animations and ScrollTriggers here.
    },
    { scope: root },
  );

  return <section ref={root}>{/* content */}</section>;
}
```

Use `contextSafe()` for GSAP work started later from callbacks, timers, event handlers, or asynchronous actions. Do not leave global event listeners, animation frames, timelines, or ScrollTriggers alive after a component unmounts.

### Responsive animation setup

Use `gsap.matchMedia()` rather than the deprecated `ScrollTrigger.matchMedia()` API.

Create separate animation setups for:

- `(min-width: 1280px)` — wide laptop scene
- `(min-width: 768px) and (max-width: 1279px)` — tablet scene
- `(max-width: 767px)` — phone scene
- `(prefers-reduced-motion: reduce)` — reduced-motion experience
- `(pointer: fine)` — custom cursor and hover effects
- `(pointer: coarse)` — touch-appropriate behaviour

Return or rely on GSAP context cleanup so animations are reverted when a media query stops matching.

### ScrollTrigger rules

- Tie reversible narrative sequences to `progress` through a scrubbed timeline.
- Use pinning only where it materially improves the story.
- Pin the outer scene and animate descendants; do not animate the pinned node itself.
- Avoid nested pinning.
- Use development markers only during development and remove them before delivery.
- Refresh ScrollTrigger after approved media loads or changes dimensions.
- Test fast scroll, slow scroll, trackpad momentum, scrollbar dragging, keyboard scrolling, and reverse scrolling.
- Do not normalize or hijack native scrolling by default.

## GSAP plugin guidance

### ScrollTrigger

Use for:

- Hero-to-work scroll connection
- Featured-project section entrances
- Expanding portrait progress
- Responsive design-to-code scene
- Laptop closing and opening
- Tablet and phone face-up and face-down transitions
- Process-step activation

### SplitText

Use sparingly for:

- Hero headline line reveal
- One or two major section-title reveals

Prefer line or word splitting instead of character splitting. Keep the original accessible text intact through SplitText's accessibility behaviour or an equivalent screen-reader copy. Wait for fonts before splitting or enable responsive re-splitting. Revert split markup when animation no longer needs it.

Do not split long body paragraphs, links containing nested interactive content, project descriptions, or every heading on the page.

### Flip

Use only when the same visual element must transition between measured layout states, such as:

- A project image moving from the hero device into a featured-work composition
- A project card expanding into a larger preview
- A media item changing grid position

Do not use Flip for basic opacity, translation, or scale effects.

### Observer

Use only when unified pointer, touch, drag, swipe direction, or velocity is required. Ordinary hover tracking should use Pointer Events. Do not intercept the visitor's normal vertical scrolling merely to create a slideshow or panel transition.

## Effect implementation map

### Floating frosted navigation

Use:

- Tailwind backdrop-filter utilities
- CSS variables for opacity, blur, border, highlight, and shadow
- Base UI or semantic navigation primitives
- Intersection Observer for the active bookmark
- GSAP for entrance, compacting, and small magnetic effects

The navbar has three groups:

- Left: IB Studio logo and optional current-section label
- Centre: About, Work, Skills, Process
- Right: Let’s talk

Set `aria-current="location"` or `aria-current="page"` as appropriate on the active bookmark. Preserve direct hash links and normal browser history.

### Staged-hybrid hero

Use one GSAP timeline for:

1. Navbar settling
2. Masked headline reveal
3. Supporting copy and button entrance
4. Device entrance
5. Slideshow activation
6. Transition into the Work section

Use SplitText only for the main headline mask. Do not delay access to content until the animation completes. Establish readable starting styles in HTML and CSS so content remains available if JavaScript fails.

### Hero project slideshow

Use Embla Carousel for:

- Slide state
- Dragging and swiping
- Previous and next actions
- Looping when approved
- Keyboard and touch control

GSAP may animate slide labels, device reflections, or masks around Embla. It must not replace or fight Embla's internal slide movement.

Requirements:

- Pause autoplay on hover, focus, pointer interaction, or when off-screen.
- Disable autoplay in reduced-motion mode.
- Keep navigation controls outside the draggable viewport.
- Expose the active slide and control names accessibly.
- Reserve image dimensions to prevent layout shift.

### Device parallax

Use CSS perspective and GSAP transforms. Limit device tilt to approximately one or two degrees. Separate the shell, screen, reflection, and background into layers with different movement ranges.

Do not animate project labels or essential text with pointer parallax.

### Cinematic featured projects

Use ScrollTrigger for section entrance and exit timelines. Prefer:

- `transform`
- `opacity`
- `scale`
- `clip-path`
- CSS masks

Each project may use a restrained, project-specific gradient. Maintain a stable reading region while media moves.

### Expanding portrait

Use a ScrollTrigger scrub timeline with a clipping wrapper or Flip when the element truly changes layout state.

Requirements:

- Reveal more of the original photograph rather than stretching it.
- Maintain the source aspect ratio.
- Keep biography text stable and readable.
- Use a simplified vertical reveal on mobile.
- Use a stable wide image in reduced-motion mode.

### Portrait colour lens

Use a CSS `mask-image`, `clip-path`, or layered image controlled by CSS custom properties such as `--pointer-x` and `--pointer-y`. Update those values through one Pointer Event handler and a GSAP quick setter.

The effect may reveal natural colour or extra detail inside a soft local area. It must not resemble a harsh flashlight and must disappear cleanly when the pointer leaves.

### Responsive design-to-code scene

Build three intentional DOM device variants:

- Laptop for widths of 1280 px and above
- Tablet for widths from 768 px through 1279 px
- Phone below 768 px

Each device consists of reusable semantic layers:

- Shell
- Bezel
- Screen
- Reflection
- Shadow
- Project-content layer
- Laptop keyboard and hinge where applicable

Use CSS:

- `perspective`
- `transform-style: preserve-3d`
- `rotateX`, `rotateY`, and `rotateZ`
- `translate3d`
- `backface-visibility`
- Masks and gradients

Use ScrollTrigger to drive the sequence.

Forward sequence:

1. Device enters over a muted graphite gradient.
2. Figma interface appears.
3. Design guides and spacing measurements appear.
4. Component boundaries become visible.
5. Screen transforms into the implemented product.
6. Process content is revealed.
7. Laptop closes, or tablet/phone turns face-down, as the visitor leaves.

Reverse every stage when scrolling upward. Do not use a one-time autoplay video for this interaction.

### Design inspection lens

Use two aligned screen layers and a pointer-positioned CSS mask. The implemented application remains the base layer; the masked area reveals the design layer, spacing guides, and selected component labels.

Cursor state:

```html
data-cursor="compare"
```

The visual cursor label may read `Design ↔ Build`. Scroll owns the overall device timeline; the pointer lens is an optional inspection layer and must not change scroll progress.

### Process sequence

Use ScrollTrigger or Intersection Observer to activate Understand, Structure, Design, Build, and Validate. Use CSS transitions for small colour and border changes. Do not create a pinned experience if normal section progression communicates the process clearly.

### Frosted capability cards

Use Tailwind backdrop blur, a translucent background, subtle borders, and a pointer-driven radial-gradient custom property. Cards may rise by three or four pixels on hover. Do not apply strong 3D tilt.

### Résumé and CV chooser

Use Base UI Dialog or Popover depending on final interaction and available space. The trigger label is:

> View résumé and CV

Offer:

- Quick Résumé
- Full CV

Use a frosted surface, but let Base UI own focus management, escape handling, dismissal, and accessibility state. Do not replace semantic controls with animated `div` elements.

### Case-study gallery

Use Embla Carousel. Provide visible previous and next controls, pagination or position information, keyboard access, swipe support, image descriptions, and a non-carousel reading order for assistive technology when needed.

### Page transitions

Use the View Transition API only as progressive enhancement. Candidate shared elements include:

- Project title
- Hero image
- Device screen
- Project number
- Background colour block

Navigation must complete normally when the API is unavailable, disabled, interrupted, or reduced motion is requested.

## Cursor system

Do not add a dedicated cursor library. Implement one global `AdaptiveCursor` with:

- Native Pointer Events
- GSAP `quickTo()` or `quickSetter()`
- One pointer-position source
- One animation loop at most
- Contextual `data-cursor` attributes

Supported states:

```html
data-cursor="view"
data-cursor="explore"
data-cursor="document"
data-cursor="compare"
data-cursor="hello"
data-cursor="previous"
data-cursor="next"
```

Rules:

- Enable only when `(pointer: fine)` matches.
- Do not hide the native cursor until the custom cursor is mounted and ready.
- Disable over text inputs, document embeds, and native controls.
- Do not use a long particle trail.
- Keep movement delay extremely low.
- Do not place essential meaning only in the cursor label.
- Use normal focus styles for keyboard users.

## Magnetic actions

Use Pointer Events and GSAP quick setters. Limit magnetic movement to a few pixels and keep the visible hit target stationary. The pointer must not have to chase a moving button.

Apply only to:

- Main navbar links
- Primary hero actions
- Project actions
- Contact action

Do not make every inline link magnetic.

## Glass design tokens

Define shared variables rather than assigning unrelated values per component.

Minimum token set:

```css
:root {
  --glass-bg-subtle: rgb(255 255 255 / 0.08);
  --glass-bg-strong: rgb(255 255 255 / 0.16);
  --glass-border: rgb(255 255 255 / 0.22);
  --glass-highlight: rgb(255 255 255 / 0.34);
  --glass-shadow: 0 18px 60px rgb(0 0 0 / 0.12);
  --glass-blur-subtle: 10px;
  --glass-blur-strong: 18px;
}
```

Treat these values as starting points, not final visual approval. Create dark-on-light equivalents where necessary. Add a more opaque fallback inside a `@supports` rule strategy when backdrop filtering is not available.

## Button system

Use the existing class-variance-authority dependency to define one shared Button component with these variants:

- `primary` — solid black
- `secondary` — white or transparent outline
- `glass` — translucent with backdrop blur
- `textArrow` — unboxed text with animated arrow
- `project` — supports the View interaction
- `document` — résumé or CV choice
- `contact` — large closing action
- `icon` — carousel and navigation controls

All variants share:

- Typography
- Height system
- Focus treatment
- Disabled treatment
- Motion timing
- Minimum touch target

Button animation must not change the actual hit target position or remove focus visibility.

## Recommended custom components

Build and reuse these components as needed:

- `GlassSurface`
- `AdaptiveCursor`
- `MagneticAction`
- `GradientSpotlight`
- `MaskedTextReveal`
- `ProjectDevice`
- `LaptopFrame`
- `TabletFrame`
- `PhoneFrame`
- `ProjectSlideshow`
- `FeaturedProjectSection`
- `ExpandingPortrait`
- `DesignInspectionLens`
- `DesignToCodeScene`
- `ProcessTimeline`
- `CaseStudyCard`
- `DocumentChooser`
- `CaseStudyGallery`
- `SectionBookmark`
- `ReducedMotionFallback`

Do not create a component merely to wrap one element. Components should isolate reusable behaviour, visual policy, accessibility, or complex animation lifecycle.

## Smooth scrolling decision

Do not add Lenis during initial implementation. Use native scrolling with ScrollTrigger scrub smoothing. Smooth hash navigation may use native `scroll-behavior` or GSAP ScrollToPlugin after accessibility testing.

Lenis may be evaluated only after the full native-scroll prototype works. If proposed later, verify:

- Reduced-motion behaviour
- Keyboard scrolling
- Hash navigation
- Dialog scroll locking
- Mobile browser controls
- Case-study route changes
- Browser back and forward navigation

Do not add it solely because the design calls for smooth animation. Smooth animation and modified scroll input are separate decisions.

## Three-dimensional rendering decision

Do not add Three.js or React Three Fiber initially. HTML and CSS 3D are preferred because they:

- Keep screen content crisp and semantic
- Allow real responsive images and HTML inside devices
- Use fewer assets
- Avoid an additional Canvas and render loop
- Degrade more easily on mobile and reduced-motion configurations

React Three Fiber may be proposed only if the completed CSS prototype cannot meet an approved visual requirement, such as realistic lighting, physical materials, or camera movement that CSS cannot reproduce convincingly.

If proposed, document the visual gap, expected performance cost, loading fallback, mobile plan, and why pre-rendered media is insufficient before adding:

```bash
pnpm add three @react-three/fiber @react-three/drei
```

## Reduced-motion implementation

Every complex sequence must include a reduced-motion version.

Replace:

- Parallax with stable positioning
- Device rotation with crossfades or static before-and-after panels
- Laptop closing with a stable final image
- Portrait expansion with a wide static portrait
- Masked text movement with a short opacity transition
- Automatic slideshow movement with manual controls
- Pointer-following gradients with fixed gradients

Do not merely shorten the full animation. Remove large translations, rotations, depth changes, and persistent motion.

The entire page must remain complete and understandable in reduced-motion mode.

## Accessibility constraints

- Preserve semantic HTML beneath all effects.
- Do not communicate content only through hover.
- Do not communicate status only through motion or colour.
- Keep visible keyboard focus.
- Keep text contrast readable over glass and gradients.
- Provide accessible names and states for slideshow controls.
- Ensure animated headings remain one coherent announcement for screen readers.
- Prevent cursor effects from interfering with text selection.
- Do not trap keyboard focus in device or gallery scenes.
- Ensure direct hash navigation positions headings below the floating navbar.

## Performance constraints

- Prefer `transform`, `opacity`, and carefully tested `clip-path` animation.
- Reserve media dimensions to prevent layout shift.
- Lazy-load below-the-fold project images.
- Load only essential hero media eagerly.
- Pause nonessential effects outside the viewport.
- Keep pointer tracking centralized.
- Avoid repeated React state updates on every pointer or scroll frame; use GSAP values, refs, or CSS custom properties.
- Dynamically import heavy client-only scenes when practical.
- Do not load every case-study asset on the homepage.
- Avoid high-resolution autoplay video for device screens.
- Test on slower mobile hardware, not only a desktop browser.

## Initial implementation order

1. Install GSAP and `@gsap/react`.
2. Create animation utilities and reduced-motion media-query helpers.
3. Define glass, gradient, radius, and motion tokens.
4. Build accessible Button and GlassSurface components.
5. Build floating navigation and Intersection Observer scrollspy.
6. Build the static hero and device shell before animation.
7. Add the GSAP hero timeline.
8. Add the Embla project slideshow.
9. Build featured-project sections and entrances.
10. Build the expanding portrait with its reduced-motion state.
11. Build static laptop, tablet, and phone variants.
12. Add responsive ScrollTrigger device timelines.
13. Add the optional design inspection lens.
14. Add the adaptive cursor and magnetic actions.
15. Build résumé/CV chooser and case-study galleries.
16. Add progressive page transitions.
17. Complete motion, responsive, accessibility, and performance QA.

Do not begin with cursor polish or complex 3D motion before the static content, hierarchy, and responsive layouts are correct.

## Verification checklist

Before completing any animation ticket, verify:

- Forward scrolling
- Reverse scrolling
- Fast scrolling past the whole scene
- Resize across all three device breakpoints
- Portrait and landscape orientation changes
- Mouse, trackpad, touchscreen, keyboard, and scrollbar input
- Reduced-motion mode
- JavaScript-disabled or animation-failed content visibility
- Focus order and focus visibility
- Slideshow pause and controls
- Route back and forward navigation
- Missing or slow media behaviour
- No animation or listener leaks after navigation
- No clipping, overlap, horizontal overflow, or layout shift
- No development markers or placeholder debugging controls

Run:

```bash
pnpm format
pnpm lint
pnpm build
```

Then visually inspect the homepage and every published case-study route at mobile, tablet, laptop, and wide-desktop sizes.

## Completion standard

The animation and effects implementation is complete only when:

- Motion supports the portfolio story rather than competing with it.
- All scroll narratives reverse correctly.
- Laptop, tablet, and phone variants work at their intended breakpoints.
- Custom cursor and hover effects are limited to fine-pointer devices.
- Touch users receive complete equivalent interactions.
- Reduced-motion users receive a complete, intentional experience.
- Embla owns carousel state without competing animation logic.
- Glass surfaces remain readable and have fallbacks.
- Page transitions degrade to normal navigation.
- No unnecessary animation, cursor, smooth-scroll, or 3D library has been added.
- The production build passes and the experience has been visually verified.

