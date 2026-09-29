export type ProjectStatus = "completed" | "ongoing" | "academic" | "experimental"

export type CaseStudySection =
  | { type: "text"; heading: string; body: string[] }
  | { type: "process"; heading: string; steps: { title: string; description: string }[] }
  | { type: "gallery"; heading: string; media: ProjectMedia[] }

export interface ProjectMedia {
  id: string
  label: string
  src: string | null
  width: number
  height: number
  alt: string
  decorative: boolean
  caption?: string
  status: "missing" | "review" | "approved"
  owner: string
  kind: "image" | "video" | "diagram" | "design" | "presentation"
}

export interface Project {
  media: ProjectMedia[]
  process?: CaseStudySection[]
  teamContributions?: string[]
  constraints?: string[]
  testing?: string[]
  contentStatus: "review" | "approved"
  slug: string
  title: string
  subtitle: string
  role: string
  dates: string
  status: ProjectStatus
  featured: boolean
  shortDescription: string
  challenge?: string
  contribution: string[]
  technologies: string[]
  outcome?: string
  liveUrl?: string
  repoUrl?: string
  aiAssisted?: string
  personalOwnership?: string
  lessons?: string
  relatedSlug?: string
  gradientClass: string
  accentColor: string
  category: string
}

