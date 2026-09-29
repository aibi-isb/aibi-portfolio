import type { ContactLink } from "../types/content.ts"

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "aibi140814@gmail.com",
    href: "mailto:aibi140814@gmail.com",
    external: false,
    verified: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ibrahimbangura",
    href: "https://linkedin.com/in/ibrahimbangura",
    external: true,
    verified: false,
  },
  {
    label: "GitHub",
    value: "github.com/ibrahimbangura",
    href: "https://github.com/ibrahimbangura",
    external: true,
    verified: false,
  },
  {
    label: "Location",
    value: "Sierra Leone",
    href: null,
    external: false,
    verified: true,
  },
]

// Profile URLs in the scaffold have not been confirmed by the owner.
export const visibleContactLinks = contactLinks.filter((link) => link.verified)
export const emailContact = contactLinks.find((link) => link.label === "Email")!
