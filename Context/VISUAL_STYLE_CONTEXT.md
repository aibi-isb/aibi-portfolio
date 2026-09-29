# IB Studio Visual Style Context

## Purpose

This file defines how frosted glass, glassmorphism, muted aurora gradients, Bento layouts, liquid glass, and acrylic UI may be used in the IB Studio portfolio.

Read this file before implementing or reviewing:

- Navigation surfaces
- Cards and overlays
- Project backgrounds
- Gradient treatments
- Document panels
- Supporting-project layouts
- Cursor materials
- Device reflections
- Contact-section styling
- Mobile drawers and menus

Also follow:

- `AGENTS.md` for product and content requirements
- `COMPONENT_ARCHITECTURE.md` for reusable component and token rules
- `ANIMATION_IMPLEMENTATION.md` for motion, pointer, device, and reduced-motion behaviour

## Approved visual hierarchy

Use the trends in this order of importance:

1. Black-and-white editorial foundation
2. Frosted-glass interactive surfaces
3. Muted aurora-gradient atmosphere
4. Selective glassmorphism for structured content
5. Bento layouts for secondary information
6. Liquid-glass accents for memorable interactions
7. Little or no dedicated acrylic styling

Do not give every trend equal visual weight.

## Relevance summary

| Trend | Role | Recommended use |
| --- | --- | --- |
| Frosted glass | Primary | Navbar, project labels, document chooser, contact details |
| Aurora gradients | Primary | Device backgrounds, section transitions, contact area |
| Glassmorphism | Strong supporting | Cards, overlays, case-study metadata, capabilities |
| Bento layouts | Selective | Supporting projects, skills, education, credentials |
| Liquid glass | Accent only | Cursor states, selected buttons, device reflections |
| Acrylic UI | Limited | Mobile menu or document panel only when extra density is required |

## Black-and-white editorial foundation

The portfolio remains primarily black, white, charcoal, and warm gray.

Requirements:

- Use strong typography and generous space as the main design language.
- Use solid surfaces to create visual rest between translucent or animated sections.
- Let approved project imagery introduce most of the colour.
- Use subdued gradients to create atmosphere rather than decoration.
- Maintain readable body text and clear hierarchy over every surface.

Avoid:

- Saturated rainbow palettes
- Unrelated accent colours
- Bright neon gradients
- Making every section translucent
- Using material effects to compensate for weak hierarchy

## Frosted glass

### Role

Frosted glass is the primary translucent surface treatment and a recognizable part of the IB Studio visual language.

### Approved locations

- Floating navigation
- Project metadata over media
- Résumé and CV chooser
- Case-study navigation
- Gallery controls
- Contact information
- Mobile navigation
- Active process step

### Construction

A frosted surface should combine:

- Backdrop blur
- Translucent neutral background
- Fine border
- Restrained outer shadow
- Optional inner highlight
- Solid or more opaque fallback

Use shared design tokens. Do not assign arbitrary blur, opacity, border, or shadow values independently in each component.

### Rules

- Every frosted surface must retain readable contrast over its possible backgrounds.
- Large text areas should use a sufficiently opaque background.
- Glass should frame or organize content, not make content harder to read.
- Use stronger blur and opacity for navigation and dialogs than for small decorative labels.
- Do not stack several translucent panels directly over one another without a clear hierarchy.

## Glassmorphism

### Definition

Frosted glass describes a material effect. Glassmorphism describes the broader composition of layered translucent surfaces, borders, highlights, shadows, and visible background depth.

### Role

Use glassmorphism as a supporting system rather than the site-wide foundation.

### Approved locations

- Capability cards
- Process-step panels
- Project information overlays
- Case-study facts and metadata
- Floating device labels
- Document options
- Small contact-information groups

### Rules

- Pair glass sections with solid black, white, or charcoal sections.
- Keep glass-card density low enough that individual cards remain meaningful.
- Do not convert every piece of text into a glass card.
- Use one shared `GlassSurface` primitive with controlled variants.
- Prefer subtle depth and border separation over heavy shadow stacks.

Recommended conceptual variants:

- `subtle` — small metadata and labels
- `standard` — capability and process cards
- `strong` — navbar, dialogs, and mobile navigation
- `dark` — glass over pale or bright media

## Muted aurora gradients

### Role

Muted aurora gradients provide atmosphere and depth behind the black-and-white interface.

### Approved locations

- Behind the hero device
- Behind the design-to-code scene
- Between major project sections
- Behind the expanding portrait
- Within project-specific cinematic backgrounds
- In the contact conclusion

### Palette direction

Prefer combinations of:

- Graphite
- Smoke
- Silver
- Muted blue
- Subdued green
- Restrained violet
- Warm gray

### Rules

- Keep saturation low.
- Use broad, soft transitions rather than visible colour bands.
- Gradients may move slowly only when motion contributes to depth.
- Pointer-following gradient movement must be subtle and disabled for coarse pointers or reduced motion.
- Text contrast must not depend on the gradient remaining in one precise position.
- Use project-specific gradients through controlled theme tokens.

Avoid:

- Bright rainbow auroras
- Rapid gradient animation
- High-frequency noise
- Several competing gradients within one viewport
- Gradients behind long text without a stable reading surface

## Bento layouts

### Role

Use Bento layouts to organize secondary information. Do not use them for the primary cinematic featured-project sequence.

### Approved locations

- Supporting projects
- Skills and capabilities
- Education
- Leadership
- Credentials
- Small project facts inside case studies

### Example structure

```text
┌───────────────────────┬─────────────┐
│ Supporting project    │ Education   │
│ Large visual card     ├─────────────┤
│                       │ Leadership  │
├───────────┬───────────┴─────────────┤
│ Skills    │ Current exploration     │
└───────────┴─────────────────────────┘
```

### Rules

- Preserve clear reading order in the DOM.
- Use CSS Grid for composition.
- Let cards collapse into a logical single-column order on mobile.
- Vary card size based on information importance, not randomly.
- Do not make Bento cards compete with featured case studies.
- Keep card radii sharp or controlled according to the design system.
- Avoid filling empty grid areas with decorative content that adds no meaning.

## Liquid glass

### Definition

Liquid glass is more fluid and reactive than ordinary frosted glass. It may include refraction, distortion, stretching, lens effects, or shape response.

### Role

Use liquid glass only as a rare expressive accent.

### Approved locations

- Adaptive cursor states
- View Project cursor
- A selected hero action
- Device-screen reflections
- Design inspection lens
- A restrained IB Studio logo transition

### Rules

- Keep liquid effects away from body text.
- Do not place essential controls behind distortion.
- Maintain sharp or controlled overall geometry.
- Keep the effect local and short-lived.
- Provide a simple frosted or solid fallback.
- Disable persistent pointer-reactive distortion for reduced-motion users.

Avoid:

- Liquid-glass content panels
- Distorted navigation labels
- Large continuously moving refraction layers
- Applying the effect to every button
- Using liquid movement that conflicts with the site’s precise typography

## Acrylic UI

### Definition

Acrylic is a denser, system-like translucent material that typically combines stronger tinting, blur, noise, and layered depth.

### Role

Acrylic is not a separate primary design language for this portfolio. Use it only when a denser overlay genuinely needs more separation than ordinary frosted glass provides.

### Possible locations

- Mobile navigation drawer
- Résumé and CV panel
- Command-menu-style project navigator

### Rules

- First attempt the component with the approved strong frosted-glass variant.
- Introduce acrylic-like noise or density only if readability or layer separation remains inadequate.
- Keep it visually compatible with the existing glass tokens.
- Do not create a completely separate acrylic component system without an approved need.

## Surface assignment

Use this default assignment when selecting a material:

| Interface area | Default material |
| --- | --- |
| Page background | Solid black, white, charcoal, or muted aurora gradient |
| Floating navbar | Strong frosted glass |
| Project metadata | Subtle frosted glass |
| Featured-project media | Solid or gradient cinematic surface |
| Capability card | Standard glassmorphism or solid card |
| Supporting-project card | Solid or subtle glass Bento card |
| Process active state | Standard frosted glass |
| Case-study long-form text | Solid surface |
| Case-study metadata | Subtle glassmorphism |
| Gallery controls | Frosted glass |
| Document chooser | Strong frosted glass; acrylic-like density only if needed |
| Adaptive cursor | Solid, frosted, or liquid-glass accent depending on state |
| Design inspection lens | Liquid-glass accent with clear boundary |
| Contact background | Muted aurora gradient with readable solid or glass content |

## Component mapping

Implement material policy through reusable components and variants.

Recommended components:

- `GlassSurface`
- `GradientSurface`
- `BentoGrid`
- `BentoCard`
- `LiquidCursorSurface`
- `InspectionLens`
- `ProjectMetadata`
- `DocumentChooser`
- `MobileNavigationSurface`

Do not create a separate component for every combination of background, border, and blur. Prefer controlled variants.

Example:

```tsx
<GlassSurface strength="strong" tone="dark" />
<GlassSurface strength="subtle" tone="light" />
<GradientSurface theme={project.theme} intensity="muted" />
<BentoCard emphasis="primary" material="solid" />
```

Avoid Boolean prop collections:

```tsx
<GlassSurface strong dark noisy shiny bordered floating />
```

## Token requirements

Define shared tokens for:

- Glass background opacity
- Glass border opacity
- Inner highlight
- Blur strength
- Shadow colour and spread
- Acrylic noise opacity when approved
- Aurora colour stops
- Aurora saturation
- Gradient position and scale
- Liquid distortion strength
- Card radii
- Card gaps
- Bento spans
- Surface foreground colour

Project themes may select from controlled colour and gradient tokens. Do not allow project records to inject unrestricted CSS.

Suggested naming direction:

```css
:root {
  --surface-solid-light: #ffffff;
  --surface-solid-dark: #0b0b0c;
  --surface-charcoal: #171719;

  --glass-bg-subtle: rgb(255 255 255 / 0.08);
  --glass-bg-standard: rgb(255 255 255 / 0.12);
  --glass-bg-strong: rgb(255 255 255 / 0.18);
  --glass-border: rgb(255 255 255 / 0.22);
  --glass-highlight: rgb(255 255 255 / 0.34);
  --glass-blur-subtle: 10px;
  --glass-blur-standard: 14px;
  --glass-blur-strong: 18px;

  --aurora-blue: rgb(89 112 135 / 0.34);
  --aurora-green: rgb(82 116 103 / 0.28);
  --aurora-violet: rgb(104 91 123 / 0.25);
  --aurora-silver: rgb(194 198 204 / 0.24);

  --liquid-distortion-subtle: 0.08;
  --liquid-distortion-active: 0.16;
}
```

These values are starting points for prototyping, not final visual approval.

## Motion policy by material

### Frosted glass

- May fade, translate slightly, or change opacity.
- Background highlight may follow the pointer subtly.
- Blur should not animate continuously because of rendering cost.

### Aurora gradients

- May drift slowly or respond slightly to pointer position.
- Must become static in reduced-motion mode.
- Avoid rapid hue rotation.

### Bento cards

- May rise three or four pixels.
- May reveal media or change border emphasis.
- Avoid strong 3D tilt on every card.

### Liquid glass

- May stretch or refract briefly during pointer interaction.
- Must settle quickly into a stable state.
- Must not obscure labels or focus indicators.

### Acrylic

- Prefer stable material behaviour.
- Avoid animating noise texture.
- Use transitions only for opening and closing the containing panel.

## Responsive behaviour

- Reduce the number of simultaneous glass layers on mobile.
- Increase opacity when small text appears over complex imagery.
- Simplify aurora backgrounds for lower-powered devices.
- Convert Bento grids into a meaningful single-column sequence.
- Disable liquid pointer effects on coarse-pointer devices.
- Do not depend on hover to reveal essential card content.
- Preserve the same material hierarchy rather than making every mobile surface solid or every mobile surface glass.

## Accessibility requirements

- Maintain readable text contrast over all translucent and gradient backgrounds.
- Provide visible focus indicators independent of glass highlights.
- Do not use transparency as the only indication of state.
- Do not place long body copy directly over visually active gradients.
- Ensure solid fallbacks preserve hierarchy.
- Respect reduced motion for pointer-following and continuously animated backgrounds.
- Preserve logical DOM reading order in Bento layouts.
- Ensure liquid-glass or lens effects do not interfere with text selection or control activation.

## Performance requirements

- Limit large backdrop-filter regions.
- Avoid several overlapping full-screen blurred layers.
- Prefer static raster noise when acrylic noise is approved.
- Animate transform and opacity instead of blur values where possible.
- Pause off-screen gradient and pointer effects.
- Use CSS custom properties for pointer coordinates rather than React state on every frame.
- Test glass and gradient performance on mobile devices.
- Provide lower-cost mobile and reduced-motion variants.

## What to avoid

- A page made entirely of glass cards
- Bento layouts for the four primary cinematic projects
- Liquid distortion behind body text
- Strong acrylic styling that makes the site resemble an operating system
- Bright rainbow auroras
- Excessive blur that makes surfaces look cloudy
- Large shadow stacks around every card
- Pill-shaped treatment on every component
- Random Bento card sizes without information hierarchy
- Separate material systems with unrelated tokens
- Effects that disappear without leaving usable semantic content

## Implementation order

1. Establish the black-and-white solid surface system.
2. Define shared glass, gradient, radius, and shadow tokens.
3. Build the `GlassSurface` variants.
4. Build muted `GradientSurface` themes.
5. Apply strong frosted glass to navigation and document chooser.
6. Apply subtle glass to project metadata and controls.
7. Build solid and glass Bento card variants.
8. Compose the supporting-project and credentials Bento layout.
9. Add selected pointer-responsive gradient behaviour.
10. Add liquid-glass accents only to approved interactions.
11. Evaluate whether any panel genuinely requires acrylic-like density.
12. Verify readability, mobile performance, fallbacks, and reduced-motion behaviour.

## Review checklist

Before approving a material or layout implementation, confirm:

- The black-and-white editorial foundation remains dominant.
- Frosted glass has a clear functional purpose.
- Aurora gradients remain muted.
- Glassmorphism is balanced by solid surfaces.
- Bento is used only for secondary information.
- Liquid glass is local, brief, and readable.
- Acrylic is absent unless a documented need exists.
- Shared components and tokens are used.
- Text contrast remains sufficient over every background state.
- Mobile uses fewer simultaneous effects.
- Solid fallbacks are available.
- Reduced-motion behaviour is intentional.
- No essential information depends on hover, transparency, or distortion.
- Visual styling does not imitate the Squarespace reference one-to-one.

## Completion standard

The visual-material system is successful when:

- The portfolio feels primarily black-and-white, editorial, and precise.
- Frosted glass is recognizable but not excessive.
- Muted aurora gradients add depth without becoming the subject.
- Glassmorphism organizes selected information clearly.
- Bento layouts make secondary content easier to scan.
- Liquid glass creates a few memorable moments without harming usability.
- Acrylic remains limited or unnecessary.
- All material effects share coherent tokens and component variants.
- The same hierarchy survives on mobile, without motion, and without backdrop-filter support.

