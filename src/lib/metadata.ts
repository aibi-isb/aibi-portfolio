import type { Metadata } from "next"

export function createPageMetadata(
  title: string,
  description: string,
  noIndex = false,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}
