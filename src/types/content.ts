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

export type AssetStatus = "missing" | "review" | "approved"

export interface AssetInventoryItem {
  id: string
  label: string
  category: "brand" | "person" | "document" | "profile" | "project" | "media"
  kind: "logo" | "photo" | "document" | "link" | "image" | "design" | "diagram" | "video"
  path: string | null
  status: AssetStatus
  owner: string
  required: boolean
  dimensions?: string
  notes: string
}
