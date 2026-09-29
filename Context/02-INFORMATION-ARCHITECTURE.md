# 02 — Information architecture and sitemap

Status: content areas and case-study approach E; exact routes, ordering, labels and layouts P. [Content strategy](01-content-strategy.md).

## Sitemap — P

```text
/                         Home
/work                     Work index
/work/[slug]              Published case study
/about                    About + skills
/services                 Four capability pillars
/contact                  Contact details and verified profile links
/404                      Helpful not-found view (framework not-found route)
```

`/404` describes the error experience, not a required manually authored App Router page. No standalone `/skills` route in v1. About uses `#skills`; Home uses `#selected-work`, `#services`, `#capabilities` and `#contact` for useful direct links.

Desktop navigation: logo → `/`, Work, Services, About, and **Let’s talk** → `/contact`. Footer repeats these destinations and includes verified GitHub/LinkedIn links. Mobile uses the same order behind an accessible menu. Show current page state; for project detail, mark Work as its parent section without claiming it is the exact current page.

## Page contracts — P

| Page | Ordered content | Main next step |
| --- | --- | --- |
| Home | Hero and role → value proposition → selected work → services → capabilities → brief about → contact CTA | Relevant case study or Contact |
| Work | Heading and short introduction → project list → optional filters → contact CTA | Project detail |
| Case study | Back to Work → title/origin/maturity → summary and role → problem/goals → process → solution/screens → technical decisions → outcomes/limits → lessons/next steps → evidence links | Repository/demo or Contact |
| About | Name and positioning → background → approach → skills with evidence → optional verified résumé → CTA | Work or Contact |
| Services | Offer introduction → four pillars with deliverables and evidence → process → CTA | Contact with a brief |
| Contact | Clear invitation → verified email → profile links → optional working form | Start a conversation |
| Not found | Plain explanation → Work and Home links | Return to useful content |

P process steps: Understand → Structure → Design → Build → Validate. This is proposed presentation language, not proof of a process applied to every past project.

## Work discovery — P

Begin with a simple list/grid. Add category filters only when enough published work makes them useful. Suggested capability categories: UI/UX, Web, WordPress, Applications and Automation. Categories may overlap and are distinct from origin (Academic/Personal) and maturity (Concept/Prototype/In progress/Completed/Archived).

Default is All. Use buttons with selected state, an announced result count and a reset action for zero matches. If filters are URL-backed, preserve them on browser back/forward. Never hide the project's origin when filtering.

## Responsive structure — P

Home hero stacks text above media on small screens; desktop may use two columns. Project grids use one column below 48rem, two from 48rem and optionally three from 80rem. Case studies remain a single reading flow; metadata can sit beside the overview at 64rem. Long technical tables scroll within a labeled region instead of forcing the entire page sideways.

## Navigation and publication rules — P

Use real links for destinations and buttons for actions. Preserve browser back/forward, fragment links and normal scrolling. Include a skip link and one main landmark. Sticky-header offsets must keep target headings visible.

Unknown slugs return not-found. Unpublished projects are excluded from navigation, route generation, search metadata and sitemap. Missing demos/repositories produce no dead links or disabled “Live” buttons. Stable descriptive slugs are assigned once a project is published; add redirects if they later change.
