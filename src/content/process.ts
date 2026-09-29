import type { ProcessStep } from "../types/content"

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "Identify the users, the problem, the constraints, and the intended result. Stakeholder conversations, field research, assignment analysis, or independent product research.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Organise information into requirements, user roles, workflows, navigation, data models, and system specifications.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Explore layouts and interactions in Figma, establish visual hierarchy, and create reusable patterns that work across different devices.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Translate designs into functional interfaces using the technology that best fits the project.",
  },
  {
    number: "05",
    title: "Validate",
    description:
      "Review responsive behaviour, interactions, data, and implementation quality. Feedback is described honestly as informal, structured, or planned.",
  },
]
