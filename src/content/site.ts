import { assetInventory } from "./inventory"

export const site = {
  brand: "IB Studio",
  portfolioLabel: "The portfolio of Ibrahim Bangura",
  firstName: "Ibrahim",
  lastName: "Bangura",
  title: "IB Studio — Ibrahim Bangura's Design and Development Portfolio",
  description:
    "Portfolio of Ibrahim Bangura, showcasing design, frontend development, systems analysis, and data modelling work.",
  role: "Junior UI and UX Designer and Frontend Developer",
  introduction:
    "I turn research, requirements, and ideas into clear interfaces and working digital products — across design, development, and systems.",
  aiStatement:
    "I use AI and coding agents to accelerate design, implementation, and learning while retaining responsibility for requirements, decisions, review, refinement, and testing.",
}

export const contentInventory = assetInventory
export const documentAction = { label: "View résumé and CV", href: "/resume" }

export const homepageSections = {
  work: { eyebrow: "Selected projects", title: "Featured work" },
  about: { eyebrow: "About me", title: "Design, development, and everything between" },
  skills: { eyebrow: "What I do", title: "Capabilities" },
  process: { eyebrow: "How I work", title: "My process" },
  contact: {
    eyebrow: "Get in touch",
    title: "Have a role, project, or idea where design and development meet?",
  },
}
