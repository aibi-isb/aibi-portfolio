import type { ProjectMedia } from "../types/project.ts"

export const identityAssets: ProjectMedia[] = [
  { id: "logo", label: "IB Studio logo", src: null, width: 256, height: 256, alt: "IB Studio", decorative: false, status: "missing", owner: "Ibrahim", kind: "image" },
  { id: "portrait", label: "Portrait photograph", src: null, width: 1200, height: 1600, alt: "Ibrahim Bangura", decorative: false, status: "missing", owner: "Ibrahim", kind: "image" },
]

// These dimensions reserve layout space; they do not describe supplied files.
// Replace the relevant record with the actual dimensions and approved public path.
export function createProjectMedia(slug: string): ProjectMedia[] {
  return [
    { id: `${slug}-cover`, label: "Project cover", kind: "image", width: 1600, height: 1200 },
    { id: `${slug}-screens`, label: "Project screenshots", kind: "image", width: 1920, height: 1080 },
    { id: `${slug}-design`, label: "Design export", kind: "design", width: 1600, height: 1000 },
    { id: `${slug}-demo`, label: "Application demonstration", kind: "video", width: 1920, height: 1080 },
    ...(slug === "house-rental" || slug === "university-voting" || slug === "aminbuy" || slug === "yummy-restaurant"
      ? [{ id: `${slug}-erd`, label: "Data model / ERD", kind: "diagram" as const, width: 1600, height: 1000 }] : []),
    ...(slug === "dash-delivery"
      ? [{ id: `${slug}-brand`, label: "Brand presentation", kind: "presentation" as const, width: 1920, height: 1080 }] : []),
  ].map((asset) => ({ ...asset, kind: asset.kind as ProjectMedia["kind"], src: null, alt: "", decorative: false, status: "missing", owner: "Ibrahim" }))
}
