# IB Studio Portfolio Implementation Workflow

## Project objective

Build a responsive, cinematic portfolio for **IB Studio — the portfolio of Ibrahim Bangura**.

The website should balance these objectives:

- Support junior design and frontend job applications
- Attract paid internship opportunities and freelance clients
- Create opportunities for collaboration

The experience will take visual inspiration from Squarespace’s polish, device presentations, typography, and motion without copying its layouts directly.

## Core experience

- One long, scroll-driven homepage
- Dedicated project case-study pages
- Staged-hybrid hero presentation
- Black-and-white visual foundation
- Muted colours and grainy aroura gradients
- Frosted-glass interface elements
- Sharp, controlled corner radii
- Responsive laptop, tablet, and phone presentations
- Reversible scroll animations
- IB Studio brand identity
- Separate résumé and CV access
- Quiet AI-workflow reference on the homepage
- Detailed AI contribution disclosures within case studies

---

# Epic 1 — Content and project preparation

## IBS-001 — Create the content and asset inventory

**Priority:** P0  
**Status:** Ready  
**Owner:** Ibrahim and development

### Objective

Establish the content required for every homepage section and case study without blocking early development.

### Scope

Create an inventory for:

- IB Studio logo
- Portrait photograph
- Résumé
- Full CV
- GitHub profile
- LinkedIn profile
- Email and optional telephone number
- Project screenshots
- Figma exports
- Brand presentations
- Diagrams and ERDs
- Application demonstrations
- Live project links
- Repository links

### Implementation notes

- Use labelled placeholders while final assets are unavailable.
- Maintain the intended dimensions and aspect ratios so replacing a placeholder does not disturb the layout.
- Do not fabricate screenshots, testimonials, clients, research results, or project outcomes.
- Record whether each project is completed, ongoing, experimental, or academic.

### Acceptance criteria

- Every required asset has an owner and status.
- Missing assets have correctly sized placeholders.
- Projects are clearly classified.
- No unsupported material appears publicly.

---

## IBS-002 — Finalize the content model

**Priority:** P0  
**Depends on:** IBS-001

### Objective

Store website content in a reusable structure separate from the visual components.

### Scope

Create structured records for:

- Navigation
- Homepage sections
- Featured projects
- Supporting projects
- Skills and capabilities
- Process steps
- Education
- Contact information
- Documents
- Case studies

Each project record should support:

- Title
- Slug
- Role
- Dates
- Status
- Short description
- Challenge
- Contribution
- Process
- Technologies
- Outcome
- Media
- Live link
- Repository link
- AI-assisted work
- Personal ownership
- Related project

### Acceptance criteria

- Project cards and case-study pages read from the same source.
- Content can be edited without rewriting layout components.
- Missing links or assets are handled safely.
- Ongoing projects display an “In progress” label.

---

# Epic 2 — Technical and visual foundation

## IBS-003 — Establish the application foundation

**Priority:** P0

### Objective

Prepare the existing React and Tailwind-based project for the complete portfolio.

### Scope

- Replace the current placeholder page.
- Establish homepage and case-study routes.
- Create shared page layouts.
- Configure typography.
- Add reusable metadata.
- Establish image handling.
- Prepare animation utilities.
- Add error and not-found states.
- Create development and production configuration.

### Planned routes

- `/` — scrolling homepage
- `/work/[project]` — individual case study
- `/resume` — résumé viewer or document handoff
- `/cv` — full CV viewer or document handoff

### Acceptance criteria

- Homepage and case-study routes load correctly.
- Shared layouts work across all pages.
- Project data can generate routes.
- Development and production builds succeed.

---

## IBS-004 — Build the IB Studio design system

**Priority:** P0  
**Depends on:** IBS-003

### Objective

Create the visual rules that will keep the entire experience consistent.

### Visual foundation

- Black and white as the primary palette
- Charcoal and warm gray surfaces
- Muted silver, blue, green, and violet gradients
- High-contrast typography
- Generous whitespace
- Sharp-to-medium radii
- Subtle borders and shadows
- Selective frosted glass

### Component system

Create reusable styles for:

- Primary black buttons
- Secondary outline buttons
- Frosted-glass buttons
- Text-and-arrow links
- Project action buttons
- Navigation controls
- Section labels
- Status labels
- Media frames
- Glass cards
- Project metadata
- Document options

### Acceptance criteria

- Colours, typography, spacing, radii, shadows, and blur strengths are defined centrally.
- Buttons have consistent states.
- Glass remains readable over every approved background.
- The visual system works in light and dark sections.
- Components are sharp and controlled rather than excessively rounded.

---

# Epic 3 — Navigation and homepage

## IBS-005 — Implement the frosted navigation

**Priority:** P0  
**Depends on:** IBS-004

### Objective

Create a floating, three-group navbar inspired by the reference structure.

### Structure

**Left group**

- IB Studio logo
- Optional current-section label

**Centre group**

- Work
- About
- Skills
- Process

**Right group**

- Let’s talk

### Behaviour

- Remains visible during scrolling
- Uses a frosted-glass surface
- Highlights the current homepage bookmark
- Smoothly scrolls to selected sections
- Adjusts contrast over light and dark backgrounds
- Collapses into an accessible mobile menu
- Reduces its visual size after the visitor leaves the hero

### Acceptance criteria

- Active navigation follows the visible section.
- Direct bookmark links work.
- Navigation remains readable over all sections.
- Keyboard and screen-reader navigation work.
- Mobile navigation does not cover important content.

---

## IBS-006 — Build the staged-hybrid hero

**Priority:** P0  
**Depends on:** IBS-004 and IBS-005

### Objective

Create a clean opening that develops into a cinematic presentation of the work.

### Content

- IB Studio identity
- Ibrahim Bangura’s name
- Junior UI and UX Designer and Frontend Developer
- Short positioning statement
- View Work button
- View Résumé and CV button
- Project slideshow device

### Entrance sequence

1. Navigation settles into position.
2. Headline appears through a masked reveal.
3. Introduction and buttons enter.
4. Device presentation moves into view.
5. Project slideshow begins.
6. Scrolling connects the device to the Work section.

### Project slideshow

Show selected imagery from:

- YUMMY Restaurant Mobile App
- YUMMY Restaurant Web App
- YUMMY Provision Shop WordPress App
- Dash Delivery Branding Kit

### Acceptance criteria

- The initial message is understandable before the animation finishes.
- Slideshow transitions are smooth.
- Visitors can pause or control important motion where appropriate.
- Mobile composition remains readable.
- Reduced-motion mode presents a calm static alternative.
- The hero does not delay access to the portfolio.

---

## IBS-007 — Build the cinematic featured-work sequence

**Priority:** P0  
**Depends on:** IBS-002 and IBS-006

### Objective

Present the strongest projects as large visual experiences before asking visitors to read detailed case studies.

### Initial featured projects

1. YUMMY Restaurant Mobile Application
3. YUMMY Restaurant Web Application
3. YUMMY Provision Shop WordPress Application
4. Dash Delivery branding

### Behaviour

- Alternate layouts between projects.
- Use project-specific gradients and muted background colours.
- Display role, date, status, and short contribution.
- Use large screenshots and device compositions.
- Reveal supporting text progressively.
- Make images and calls to action open the appropriate case study.
- Preserve normal navigation for visitors who do not use motion.

### Acceptance criteria

- Every featured project is understandable in a few seconds.
- Project status and personal contribution are visible.
- Each project links to the correct case study.
- Layouts feel related but not repetitive.
- Images remain sharp across screen densities.

---

## IBS-008 — Implement the expanding About portrait

**Priority:** P1  
**Depends on:** IBS-004

### Objective

Create a personal introduction between the featured work and capabilities.

### Behaviour

- Begin with a smaller portrait beside the introduction.
- Expand the portrait as the visitor scrolls.
- Reveal more of the photograph rather than simply stretching it.
- Introduce additional biography content during the expansion.
- Use black-and-white or lightly desaturated treatment.
- Transition naturally into the capabilities section.

### Acceptance criteria

- The photograph preserves its proportions.
- The expansion feels smooth in both scroll directions.
- Text remains readable throughout the sequence.
- Mobile uses a simplified vertical expansion.
- The section works with a placeholder until the final portrait is supplied.

---

## IBS-009 — Build the responsive design-to-code scene

**Priority:** P0  
**Depends on:** IBS-004

### Objective

Use a responsive device animation to demonstrate the transition from interface design to working implementation.

### Responsive devices

- Wide screens: laptop
- Medium screens: tablet
- Mobile screens: phone

Each version should be purposefully composed for its viewport rather than being a scaled copy of the laptop.

### Forward scroll sequence

1. Device enters over a muted graphite gradient.
2. Screen displays a Figma interface.
3. Design guides and spacing measurements appear.
4. Component boundaries become visible.
5. Design transitions into the implemented product.
6. Process content is revealed.
7. Laptop closes or tablet and phone turn face-down as the visitor leaves.

### Reverse scroll sequence

Scrolling upward reverses every stage:

- Device returns to its active position.
- Laptop opens.
- Tablet or phone turns face-up.
- Implementation returns to design mode.
- Guides and measurements reappear.

### Implementation requirements

- Tie animation to scroll progress.
- Avoid one-time playback.
- Preserve scroll position when the viewport changes.
- Provide a reduced-motion alternative.
- Avoid downloading unnecessary device assets.
- Keep animations responsive at lower connection speeds.

### Acceptance criteria

- Correct device is shown at every breakpoint.
- Motion is reversible.
- The device reaches a stable resting position.
- No animation state becomes stuck after resizing.
- Performance remains smooth on common mobile devices.

---

## IBS-010 — Implement capabilities, process, and AI positioning

**Priority:** P1  
**Depends on:** IBS-004 and IBS-009

### Objective

Explain how Ibrahim works without turning the section into a list of software logos.

### Capabilities

- Product and interface design
- Frontend implementation
- Systems and data
- Visual communication
- AI-assisted product delivery

### Process

1. Understand
2. Structure
3. Design
4. Build
5. Validate

### AI positioning

Homepage wording should be quiet and concise:

> I use AI and coding agents to accelerate design, implementation, and learning while retaining responsibility for requirements, decisions, review, refinement, and testing.

Case studies will contain the detailed explanation.

### Acceptance criteria

- Process is understandable without animation.
- Active process steps are visually clear.
- Skills are tied to real work.
- AI is presented honestly without dominating the homepage.
- No unsupported experience claims are included.

---

## IBS-011 — Add supporting work and credentials

**Priority:** P1  
**Depends on:** IBS-002 and IBS-004

### Objective

Present additional experience without weakening the featured-project hierarchy.

### Supporting projects

- University Voting System
- Yummy Restaurant Mobile Application
- AminBuy Marketplace
- Custom Cardboard VR Viewer
- OS Deployment Process

### Credentials

- Computer Science education
- Leadership
- Cross-functional communication
- Relevant practical coursework

### Acceptance criteria

- Supporting work is more compact than featured work.
- Ongoing and experimental projects are labelled.
- Academic projects are not misrepresented as employment.
- Every card can support future links and media.

---

## IBS-012 — Implement résumé and CV access

**Priority:** P1  
**Depends on:** IBS-004

### Objective

Provide both professional documents through one clear interaction.

### Primary button

**View résumé and CV**

### Document chooser

Open a frosted-glass chooser containing:

- **Quick Résumé** — concise professional overview
- **Full CV** — detailed education, projects, coursework, and achievements

### Acceptance criteria

- The user can distinguish the documents before opening them.
- Documents open or download correctly.
- File sizes and formats are shown.
- The interaction works with keyboard and touch.
- Missing documents remain unpublished rather than linking to placeholders.

---

## IBS-013 — Build the contact conclusion

**Priority:** P1  
**Depends on:** IBS-004 and IBS-011

### Objective

End the homepage with a clear invitation suitable for recruiters, clients, and collaborators.

### Content

> Have a role, project, or idea where design and development meet?

Include:

- Email
- LinkedIn
- GitHub
- Résumé and CV access
- Optional telephone number
- Let’s Talk button

### Visual treatment

- Large typography
- Muted gradient
- Selective frosted-glass contact details
- Subtle response to cursor or scroll
- No imitation of the reference website’s laptop footer

### Acceptance criteria

- Contact options work.
- External destinations are clearly identified.
- Telephone number appears only if approved.
- The footer includes IB Studio identity and essential navigation.

---

# Epic 4 — Case-study system

## IBS-014 — Create the reusable case-study template

**Priority:** P0  
**Depends on:** IBS-002 and IBS-004

### Objective

Build one flexible template that supports design, development, branding, systems, and physical-product projects.

### Case-study sections

- Project introduction
- Role, dates, status, and team
- Context and challenge
- Research or requirements
- Information architecture and flows
- Design exploration
- Interface or system decisions
- Implementation
- Data and technology
- AI-assisted workflow
- What I personally owned
- Constraints and compromises
- Testing and feedback
- Outcome
- Lessons and next steps
- Related projects

### Acceptance criteria

- Sections can be omitted when evidence is unavailable.
- Each case study clearly distinguishes team and personal contributions.
- AI-assisted and manual work are accurately differentiated.
- Media supports the written story.
- Case studies work on mobile and desktop.
- Visitors can navigate to the previous or next project.

---

## IBS-015 — Populate and review the first case studies

**Priority:** P0  
**Depends on:** IBS-014

### Initial release order

1. House Rental Management System
2. SALONE FRESH Mobile Application
3. YUMMY Provision Shop
4. Dash Delivery

### Review requirements

For each project, confirm:

- Dates
- Role
- Status
- Team contribution
- Personal contribution
- Tools used
- Research method
- Design decisions
- Implementation completed
- AI assistance
- Testing performed
- Outcome
- Images
- Links

### Acceptance criteria

- All claims are evidence-based.
- No placeholder language remains in published case studies.
- Every image has a purpose and description.
- Ongoing limitations are stated honestly.
- Project links work.

---

# Epic 5 — Quality and release

## IBS-016 — Complete responsive and animation QA

**Priority:** P0  
**Depends on:** All homepage and case-study tickets

### Test viewports

- Small mobile
- Large mobile
- Tablet portrait
- Tablet landscape
- Laptop
- Wide desktop

### Test areas

- Navigation and active bookmarks
- Hero entrance
- Project slideshow
- Portrait expansion
- Device substitution
- Device closing and face-down animations
- Reverse scrolling
- Orientation changes
- Touch interaction
- Reduced-motion mode
- Slow network behaviour
- Image loading
- Document chooser

### Acceptance criteria

- No clipping, overlap, or unintended horizontal scrolling.
- Animations remain smooth and reversible.
- Layout does not jump when media loads.
- Controls remain usable on touch devices.
- The site remains understandable when animations are disabled.

---

## IBS-017 — Accessibility and performance audit

**Priority:** P0  
**Depends on:** IBS-016

### Scope

- Keyboard navigation
- Focus visibility
- Heading structure
- Alternative text
- Colour contrast
- Screen-reader labels
- Reduced-motion support
- Responsive images
- Lazy loading
- Font loading
- JavaScript usage
- Animation performance

### Acceptance criteria

- All core content is accessible without a mouse.
- Important meaning is not communicated only through animation.
- Text remains readable over frosted and gradient surfaces.
- Images use appropriate formats and dimensions.
- Initial loading remains fast despite cinematic media.

---

## IBS-018 — SEO, metadata, and sharing

**Priority:** P1  
**Depends on:** IBS-015

### Scope

- Page titles
- Page descriptions
- Canonical URLs
- Social-sharing images
- Structured personal and project information
- Sitemap
- Robots configuration
- Favicons using the IB Studio identity
- Descriptive case-study URLs

### Primary title

**IB Studio — Ibrahim Bangura’s Design and Development Portfolio**

### Acceptance criteria

- Every published page has unique metadata.
- Social previews use approved imagery.
- Project pages are discoverable.
- Unfinished or private pages are excluded from indexing.

---

## IBS-019 — Final content approval and launch

**Priority:** P0  
**Depends on:** IBS-017 and IBS-018

### Final approval checklist

- IB Studio logo approved
- Portrait approved
- Résumé approved
- CV approved
- Contact details approved
- GitHub and LinkedIn links verified
- Project imagery approved
- Project claims reviewed
- Case studies reviewed
- Mobile experience approved
- Reduced-motion experience approved
- Domain and analytics configured
- Production deployment verified

### Acceptance criteria

- No development placeholders remain on public pages.
- Production links and documents work.
- Final site matches the approved visual direction.
- Published claims remain accurate and defensible.
- Rollback or previous deployment remains available.

---

# Recommended implementation order

1. IBS-001 and IBS-002 — Content structure
2. IBS-003 and IBS-004 — Foundation and design system
3. IBS-005 and IBS-006 — Navigation and hero
4. IBS-007 and IBS-008 — Featured work and portrait
5. IBS-009 and IBS-010 — Device scene and process
6. IBS-011, IBS-012, and IBS-013 — Supporting content and contact
7. IBS-014 and IBS-015 — Case studies
8. IBS-016 and IBS-017 — Quality assurance
9. IBS-018 and IBS-019 — Metadata and launch

# Project definition of done

The portfolio is complete when it:

- Presents IB Studio and Ibrahim Bangura clearly
- Works across laptop, tablet, and phone
- Uses motion intentionally and reversibly
- Remains usable with reduced motion
- Shows strong cinematic project previews
- Provides detailed, honest case studies
- Distinguishes personal, team, and AI-assisted contributions
- Offers both résumé and CV
- Supports employment, freelance, and collaborative opportunities
- Contains no fabricated experience or unfinished placeholders
- Is accessible, performant, and ready for public sharing