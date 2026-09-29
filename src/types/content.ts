export interface NavigationItem { label: string; href: `#${string}` }
export interface Capability { title: string; description: string; tools: string[]; accent: string }
export interface ProcessStep { number: string; title: string; description: string }
export interface ContactLink {
  label: string
  value: string
  href: string | null
  external: boolean
  verified: boolean
}
export interface PortfolioDocument {
  id: "resume" | "cv"
  title: string
  description: string
  format: "PDF"
  note: string
  href: string | null
  accent: string
  status: "missing" | "review" | "approved"
  sizeBytes?: number
}
