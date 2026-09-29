# IB Studio Portfolio Implementation Instructions

## Mission

Build a polished, accessible, high-performance portfolio for **IB Studio — the portfolio of Ibrahim Bangura**.

The site must communicate Ibrahim's combined strengths in UI and UX design, frontend development, systems analysis, visual communication, and data modelling. It must support three goals equally:

- Junior design and frontend employment
- Freelance client acquisition
- Collaboration and project opportunities

Treat these instructions as the implementation authority for all work inside `portfolio/`. Preserve the root `AGENTS.md` rules, especially the requirement that files under `sources/` remain read-only.

## Product principles

1. Lead with evidence. Show projects and decisions before long skill lists.
2. Be cinematic without becoming difficult to use.
3. Use animation to explain transitions, hierarchy, and process—not as decoration alone.
4. Keep every claim accurate. Distinguish academic, independent, collaborative, ongoing, and experimental work.
5. Describe AI as an accelerator. Never imply that generated output replaced Ibrahim's judgment, review, refinement, testing, or responsibility.
6. Take inspiration from Squarespace's polish, visual rhythm, device presentations, and motion, but do not reproduce its compositions, copy, assets, or interaction sequences one-to-one.
7. Design mobile, tablet, laptop, and wide desktop experiences intentionally. Do not treat responsive design as simple scaling.

## Current stack

Use the existing application and dependencies unless a change is necessary and justified:

- React 19
- Vinext
- TypeScript
- Tailwind CSS 4
- shadcn-compatible UI primitives
- Lucide icons
- Cloudflare-compatible production output

Do not add a dependency when a small local component or browser capability is sufficient. Any animation library must be justified by functionality that would otherwise be fragile or excessively complex.

Useful commands:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
```

Run commands from `portfolio/`.

Before implementing or changing animation, scrolling, cursor effects, device scenes, carousels, page transitions, frosted glass, or reduced-motion behaviour, read `ANIMATION_IMPLEMENTATION.md` in full. It defines the approved libraries, ownership boundaries, component plan, effect mappings, fallbacks, and verification requirements for those features.

Before adding or restructuring pages, content models, project records, assets, components, variants, hooks, responsive logic, or case-study rendering, read `COMPONENT_ARCHITECTURE.md` in full. It defines the required content-driven, token-driven, reusable-component architecture and the boundary between healthy reuse and over-abstraction.

Before choosing or changing glass treatments, gradients, cards, Bento compositions, overlays, material effects, surface depth, or visual-effect hierarchy, read `VISUAL_STYLE_CONTEXT.md` in full. It defines which visual trends are primary, supporting, accent-only, or intentionally limited in the IB Studio design language.

## Brand hierarchy

Present the identity as:

**IB Studio**  
*The portfolio of Ibrahim Bangura*

Use the supplied IB Studio logo when it becomes available. Until then, use a clearly replaceable development placeholder. Do not invent a final logo.

Recommended document and browser title:

> IB Studio — Ibrahim Bangura's Design and Development Portfolio

The full name and professional role must remain visible in the hero even when the logo is present.

## Visual direction

### Palette

- Use black and white as the foundation.
- Add charcoal, warm gray, muted silver, and subdued blue, green, or violet gradients for depth.
- Avoid bright rainbow gradients, saturated neon colours, or a large number of unrelated accents.
- Let approved project imagery introduce most of the colour.

### Typography

- Use oversized, confident headings with compact supporting copy.
- Maintain clear contrast between display, heading, body, label, and metadata text.
- Keep body text readable and avoid excessively narrow or wide lines.
- Do not use tiny text merely to imitate an editorial layout.

### Shape and depth

- Prefer sharp or controlled corner radii, generally in the 4–12 px range.
- Reserve full pills for navigation states, tags, and controls that benefit from them.
- Use borders, shadows, gradients, and blur subtly.
- Do not apply glass effects to every surface.

### Frosted glass

Frosted glass is a recurring design language and may be used for:

- Floating navigation
- Project metadata overlays
- Case-study information panels
- Active process steps
- Gallery controls
- Document chooser
- Contact details over gradients
- Mobile navigation

Every glass surface must retain readable contrast over all backgrounds. Provide a solid or more opaque fallback when backdrop blur is unavailable.

## Information architecture

### Routes

- `/` — one long, scroll-driven homepage
- `/work/[slug]` — individual project case study
- `/resume` — résumé viewer, handoff, or download route
- `/cv` — full CV viewer, handoff, or download route

### Homepage order

1. Staged-hybrid hero
2. Cinematic featured work
3. Expanding About portrait
4. Responsive design-to-code transition
5. Capabilities and process
6. Supporting projects and credentials
7. Résumé and CV access
8. Contact conclusion and footer

The homepage must remain understandable and navigable if JavaScript animation fails or the visitor prefers reduced motion.

## Navigation specification

Build a floating frosted-glass navbar with three visual groups.

### Left

- IB Studio logo
- Optional current-section label where space permits

### Centre

- About
- Work
- Skills
- Process

### Right

- Let’s talk

### Behaviour

- Keep the navbar visible while scrolling.
- Use scroll-aware bookmarks so the active item follows the visible section.
- Set `aria-current` on the active link.
- Smoothly scroll to homepage sections without breaking browser history or direct hash links.
- Adapt contrast over light and dark backgrounds.
- Reduce the navbar's visual footprint after leaving the hero.
- Replace the centre links with an accessible mobile menu at narrow widths.
- Ensure keyboard, touch, and screen-reader operation.

## Hero specification

Use the approved **staged-hybrid** opening.

### Content

- IB Studio identity
- Ibrahim Bangura
- Junior UI and UX Designer and Frontend Developer
- Short positioning statement
- View Work button
- View Résumé and CV button
- Project slideshow device

### Entrance sequence

1. Navigation settles into position.
2. Headline appears through a restrained masked reveal.
3. Supporting copy and actions enter.
4. The project device moves into the composition.
5. Project screens begin transitioning.
6. Scroll progress connects the hero to the Work section.

Feature approved imagery from House Rental, SALONE FRESH, YUMMY Provision Shop, and Dash Delivery when supplied. Use labelled placeholders during development.

The hero device should feel integrated into the composition rather than like a generic carousel. Make the sequence controllable or pausable when motion persists long enough to distract.

## Featured work

Initial featured projects:

1. House Rental Management System
2. SALONE FRESH Mobile Application
3. YUMMY Provision Shop
4. Dash Delivery

Present these as large, cinematic sections before showing compact cards. Alternate layouts and project-specific muted gradients. Each section must communicate, without requiring a click:

- Project name
- Role
- Date
- Status
- Short contribution
- Case-study action

Both the media and explicit action may link to the case study. Do not make an entire large section an ambiguous link without a visible focus state.

## About portrait interaction

Begin with a smaller portrait beside the introduction. As the visitor scrolls:

- Expand the portrait into a wider crop.
- Reveal more of the original image instead of stretching it.
- Introduce additional biography content.
- Transition naturally into the design-to-code section.

Use a monochrome or lightly desaturated treatment unless the supplied photograph works better in natural colour. Simplify the interaction on small screens and in reduced-motion mode.

## Responsive design-to-code scene

This section demonstrates Ibrahim's ability to move from design into implementation.

Render a device suited to the viewport:

- `>= 1280px`: laptop
- `768px–1279px`: tablet
- `< 768px`: phone

These must be intentionally composed variants, not one device scaled to three sizes.

### Forward scroll sequence

1. Device enters over a muted graphite gradient.
2. Screen shows a Figma interface.
3. Design guides and spacing measurements appear.
4. Component boundaries become visible.
5. The design transitions into the implemented product.
6. Process content is revealed.
7. The laptop closes, or the tablet/phone turns face-down, as the visitor leaves.

### Reverse scroll sequence

Tie the full animation to scroll progress. When the visitor scrolls upward:

- Laptop opens.
- Tablet or phone turns face-up.
- Implemented interface returns to design mode.
- Component guides and measurements reappear.

Do not implement this as a one-time autoplay video. The resting states must be stable, and resizing or rotating the viewport must not leave the scene stuck between states.

For `prefers-reduced-motion: reduce`, replace the 3D sequence with accessible fades or a static before-and-after presentation.

## Capabilities and process

Present capabilities as evidence-backed areas rather than progress bars:

- Product and interface design
- Frontend implementation
- Systems and data
- Visual communication
- AI-assisted product delivery

Use this process:

1. Understand
2. Structure
3. Design
4. Build
5. Validate

Homepage AI language should be quiet and concise. Use wording equivalent to:

> I use AI and coding agents to accelerate design, implementation, and learning while retaining responsibility for requirements, decisions, review, refinement, and testing.

The detailed AI explanation belongs in each relevant case study.

## Supporting projects

Show these in a more compact editorial grid:

- University Voting System Desktop Application
- Yummy Restaurant Mobile Application
- AminBuy Marketplace
- Custom Cardboard VR Viewer
- OS Deployment Process

Display an honest status such as Completed, In progress, Academic, or Experimental. Never imply that academic projects were client engagements or paid employment.

## Résumé and CV interaction

Use one primary action labelled:

> View résumé and CV

Open an accessible frosted-glass chooser with:

- **Quick Résumé** — concise professional overview
- **Full CV** — detailed education, projects, coursework, and achievements

Show file type and size when known. Do not publish a link until the corresponding document exists. Never point production users to a placeholder document.

## Case-study template

Build one flexible case-study system. Sections must be optional so the layout does not invent content to fill gaps.

Supported sections:

- Introduction
- Role, dates, status, and team
- Context and challenge
- Research or requirements
- Information architecture and flows
- Design exploration
- Interface or system decisions
- Implementation
- Data and technology
- AI-assisted workflow
- What Ibrahim personally owned
- Team contributions
- Constraints and compromises
- Testing and feedback
- Outcome
- Lessons and next steps
- Related projects

Every case study must distinguish:

- What Ibrahim completed personally
- What teammates completed
- What AI accelerated
- What remained unfinished or planned
- Whether feedback was informal or structured

Initial release order:

1. House Rental Management System
2. SALONE FRESH Mobile Application
3. YUMMY Provision Shop
4. Dash Delivery

## Content source of truth

Use the approved portfolio copy and verified résumé information. Relevant local references include:

- `../output/Ibrahim_Bangura_Resume_Enhanced.docx`
- `../build_resume.py`

The user will supply and approve the following during development:

- IB Studio logo
- Portrait photograph
- Full CV
- Project screenshots and Figma exports
- Live project and repository links
- GitHub and LinkedIn profiles
- Public contact preferences

Use replaceable placeholders while waiting. Do not stop safe implementation work solely because an asset has not arrived. However, no placeholder, invented asset, or unverified link may remain in a production release.

## Content integrity

- Describe experience as academic, independent, collaborative, or project-based where applicable.
- Do not claim formal professional employment unless evidence is supplied.
- Do not claim production scale, production data governance, structured usability testing, or client results without evidence.
- Label AminBuy and Cardboard VR as ongoing.
- Describe Cardboard VR family reactions as informal feedback, not formal usability research.
- Do not add InVision or energy-sector experience without new evidence.
- Do not invent participant counts, conversion metrics, testimonials, awards, or client logos.
- A grade or B grade results may be stated only where already verified and contextually useful.

## Component architecture

Prefer small, reusable components with content supplied through typed data. Likely component groups include:

- `SiteHeader`
- `ScrollSpyNav`
- `MobileNavigation`
- `Hero`
- `ProjectDevice`
- `ProjectSlideshow`
- `FeaturedProjectSection`
- `ProjectCard`
- `ExpandingPortrait`
- `DesignToCodeScene`
- `ProcessSequence`
- `CapabilityList`
- `DocumentChooser`
- `ContactSection`
- `CaseStudyLayout`
- `MediaGallery`
- `ProjectPager`

Keep scroll and motion orchestration separate from content rendering. Avoid one oversized page component containing all copy, media, and animation logic.

## Animation requirements

- Prefer transform and opacity animations.
- Avoid layout-triggering animation where possible.
- Tie reversible narrative sequences to normalized scroll progress.
- Do not hijack scrolling or replace native scroll behaviour.
- Preserve usable focus states while elements move.
- Prevent cumulative layout shift by reserving media space.
- Pause nonessential animation when it leaves the viewport.
- Test animation on touch devices and slower hardware.
- Treat reduced-motion mode as a complete experience, not an afterthought.

## Accessibility requirements

- Use semantic landmarks and a logical heading hierarchy.
- Support full keyboard navigation.
- Provide visible focus states.
- Meet readable colour contrast on glass and gradient surfaces.
- Add meaningful alternative text to project media.
- Mark decorative visuals appropriately.
- Do not communicate status or meaning through motion or colour alone.
- Ensure menus, dialogs, slideshows, and document choices have accessible names and states.
- Make all content available when JavaScript animation is disabled.

## Performance requirements

- Use responsive image sizes and modern formats when source quality permits.
- Lazy-load below-the-fold media.
- Prioritize only essential hero assets.
- Avoid loading every case-study image on the homepage.
- Prevent auto-playing high-bandwidth video on constrained connections.
- Keep animation work on the compositor when possible.
- Check for layout shift, long tasks, and unnecessary client-side JavaScript.

## SEO and metadata

- Give every page a unique title and description.
- Use descriptive project slugs.
- Add canonical URLs, sitemap, robots configuration, and social preview metadata.
- Use the IB Studio identity for favicons when the approved logo is supplied.
- Exclude unfinished, private, or placeholder case studies from indexing.
- Add structured personal and project information when it accurately reflects the visible content.

## Implementation order

Work in this order unless a dependency requires a small adjustment:

1. Content model and asset placeholders
2. Application foundation and routes
3. Design tokens and core components
4. Frosted navigation and scroll-aware bookmarks
5. Staged-hybrid hero
6. Cinematic featured-work sequence
7. Expanding portrait
8. Responsive design-to-code scene
9. Capabilities and process
10. Supporting projects and credentials
11. Résumé and CV chooser
12. Contact conclusion
13. Reusable case-study template
14. Initial case-study population
15. Responsive, accessibility, motion, and performance QA
16. Metadata and production release

After major milestones, verify the current result visually before layering on the next complex animation.

## Verification

Before considering an implementation complete:

1. Run formatting and lint checks.
2. Run the production build.
3. Inspect the homepage and every published route.
4. Test small mobile, large mobile, tablet portrait, tablet landscape, laptop, and wide desktop sizes.
5. Test forward and reverse scroll behaviour.
6. Test viewport resizing and orientation changes.
7. Test keyboard-only navigation.
8. Test reduced-motion mode.
9. Test slow-loading or missing media behaviour.
10. Confirm every link, document, and contact action.
11. Confirm that no placeholder or unsupported claim is public.

## Definition of done

The portfolio is done only when it:

- Presents IB Studio and Ibrahim Bangura clearly
- Works intentionally across phone, tablet, laptop, and wide desktop
- Uses smooth, reversible motion without blocking access
- Provides an equivalent reduced-motion experience
- Shows cinematic project previews with visible case-study actions
- Provides detailed, honest case studies
- Distinguishes personal, team, and AI-assisted contributions
- Offers both résumé and CV
- Supports employment, freelance, and collaboration goals
- Contains no fabricated claims, broken links, or development placeholders
- Passes accessibility, performance, responsive, and production-build checks
