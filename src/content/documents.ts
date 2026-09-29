import type { PortfolioDocument } from "../types/content.ts"

export const documents: PortfolioDocument[] = [
  {
    id: "resume",
    title: "Quick Résumé",
    description: "Concise professional overview — role, skills, featured projects, and contact.",
    format: "PDF",
    status: "missing",
    note: "1–2 pages",
    href: null, // Replace with actual PDF link when available
    accent: "#93c5fd",
  },
  {
    id: "cv",
    title: "Full CV",
    description:
      "Detailed record of education, all projects, coursework, tools, achievements, and process notes.",
    format: "PDF",
    status: "missing",
    note: "Extended",
    href: null,
    accent: "#c4b5fd",
  },
]
