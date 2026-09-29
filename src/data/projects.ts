import type { Project } from "../types/project.ts"
import { createProjectMedia } from "../content/assets.ts"
export type { Project, ProjectStatus, CaseStudySection } from "../types/project.ts"

export const projects: Project[] = [
  {
    slug: "house-rental",
    media: createProjectMedia("house-rental"),
    contentStatus: "review",
    title: "House Rental Management System",
    subtitle: "A rental platform connecting tenants, landlords, and agents",
    role: "System Analyst and Frontend Developer",
    dates: "January – March 2026",
    status: "completed",
    featured: true,
    category: "Systems · Web",
    shortDescription:
      "A rental platform designed to help tenants discover properties and support landlords and agents in managing rental listings and booking requests.",
    challenge:
      "Rental information in Sierra Leone can be difficult to find, inconsistent, and disconnected from the people managing the properties. Our student team explored how a digital system could organise listings, searches, user roles, and booking-related activities.",
    contribution: [
      "Participated in field research with landlords and a property agent",
      "Translated research and feasibility findings into system requirements",
      "Defined user roles, workflows, information structures, and software specifications",
      "Designed responsive interfaces in Figma",
      "Implemented rental interfaces using React, Material UI, and Tailwind CSS",
      "Defined the database schema and entity relationships",
      "Refined AI-assisted ERD visualisations in diagrams.net",
      "Implemented a live Supabase database",
      "Used SQLite for local settings, preferences, and offline-related persistence",
      "Collaborated with teammates through planning and implementation meetings",
    ],
    technologies: ["Figma", "React", "Material UI", "Tailwind CSS", "Supabase", "PostgreSQL", "SQLite", "diagrams.net"],
    outcome:
      "The team delivered a completed working application. The project became one of my strongest examples of connecting stakeholder research, systems analysis, interface design, frontend implementation, and database architecture.",
    aiAssisted:
      "AI tools were used to accelerate ERD generation in diagrams.net. I reviewed, corrected, and finalised all diagrams personally, and all architectural decisions were made by me.",
    personalOwnership:
      "System requirements, user flows, Figma designs, frontend implementation, database schema design, and ERD refinement.",
    gradientClass: "from-slate-900 via-blue-950 to-slate-900",
    accentColor: "#93c5fd",
  },
  {
    slug: "salone-fresh",
    media: createProjectMedia("salone-fresh"),
    contentStatus: "review",
    title: "SALONE FRESH",
    subtitle: "Mobile shopping experience for discovering fresh local produce",
    role: "UI Designer and React Native Developer",
    dates: "2026",
    status: "completed",
    featured: true,
    category: "Mobile · Design System",
    shortDescription:
      "A mobile shopping experience designed around discovering fresh products through a simple, reusable interface system.",
    contribution: [
      "Created a design system in Figma",
      "Designed and implemented Splash, Home, Product Details, and Profile screens",
      "Built reusable buttons, search bars, category cards, product cards, navigation elements, and profile options",
      "Refined typography, spacing, layout hierarchy, and responsive behaviour",
      "Connected Figma Dev Mode MCP with Cursor and VS Code to support design-to-code work",
      "Directed and reviewed the AI-assisted implementation",
      "Tested the resulting React Native application",
    ],
    technologies: ["Figma", "React Native", "Expo", "Cursor", "VS Code", "Figma Dev Mode MCP"],
    outcome:
      "The project demonstrates my ability to move from a Figma system to reusable mobile components and functional React Native screens.",
    aiAssisted:
      "AI coding agents in Cursor assisted with component implementation. I directed the generation, reviewed all output, corrected layout and logic issues, and tested the resulting screens.",
    personalOwnership:
      "Design system architecture, all Figma screens, component specifications, AI direction and review, and final quality testing.",
    gradientClass: "from-emerald-950 via-slate-900 to-slate-900",
    accentColor: "#6ee7b7",
  },
  {
    slug: "yummy-provision",
    media: createProjectMedia("yummy-provision"),
    contentStatus: "review",
    title: "YUMMY Provision Shop",
    subtitle: "Hosted grocery storefront built with WordPress and WooCommerce",
    role: "Web Designer and Developer",
    dates: "July – August 2026",
    status: "completed",
    featured: true,
    category: "E-commerce · Web",
    shortDescription:
      "A hosted grocery storefront built with WordPress and WooCommerce, featuring a catalogue of more than 30 products.",
    challenge:
      "Configuring a credible e-commerce experience requires coordinating product data, discovery, checkout, and administration in a way that feels coherent to both customers and shop owners.",
    contribution: [
      "Customised the storefront using Elementor and the Gardarobe theme",
      "Configured product discovery, search, cart, checkout, and administration experiences",
      "Prepared and refined a CSV catalogue containing more than 30 sample products",
      "Organised product names, descriptions, categories, attributes, prices, shipping, and tax information",
      "Used AI to accelerate catalogue preparation, then personally reviewed and edited all spreadsheet content",
      "Tested the website on desktop, tablet, Android, and iPhone",
    ],
    technologies: ["WordPress", "WooCommerce", "Elementor", "Excel", "CSV", "Responsive Web Design"],
    outcome:
      "The project gave me practical experience combining interface customisation, responsive web design, e-commerce configuration, and structured product-data management.",
    aiAssisted:
      "AI assisted in drafting the initial product catalogue CSV. I reviewed every row, corrected descriptions, adjusted pricing, and reorganised categories before publishing.",
    personalOwnership:
      "Storefront configuration, theme customisation, all product data preparation, and full device testing.",
    gradientClass: "from-amber-950 via-slate-900 to-slate-900",
    accentColor: "#fcd34d",
  },
  {
    slug: "dash-delivery",
    media: createProjectMedia("dash-delivery"),
    contentStatus: "review",
    title: "Dash Delivery",
    subtitle: "Brand identity and interface direction for a delivery service",
    role: "Brand and UI Designer",
    dates: "September 2025; revisited September 2026",
    status: "completed",
    featured: true,
    category: "Brand · UI Design",
    shortDescription:
      "Developed the visual direction for a delivery brand, including its logo, colour palette, typography, brand guidelines, and interface direction.",
    contribution: [
      "Developed the overall visual direction for the brand",
      "Created a logo, colour palette, and typographic system",
      "Produced brand guidelines and supporting visual assets",
      "Established an interface direction for delivery-related flows",
      "Revisited and refined the work in September 2026",
    ],
    technologies: ["Figma", "Brand Identity", "UI Design"],
    outcome:
      "A cohesive brand identity with a clear visual language that communicates speed, reliability, and local character.",
    aiAssisted:
      "Some supporting illustrations were AI-assisted. All final design decisions, refinements, and brand rules were made and reviewed by me.",
    personalOwnership: "Complete brand direction, logo, guidelines, and interface concept.",
    gradientClass: "from-violet-950 via-slate-900 to-slate-900",
    accentColor: "#c4b5fd",
  },
  {
    slug: "university-voting",
    media: createProjectMedia("university-voting"),
    contentStatus: "review",
    title: "University Voting System",
    subtitle: "Desktop application for secure academic elections",
    role: "System Analyst, Systems Engineer, and Secondary Developer",
    dates: "March – July 2025",
    status: "academic",
    featured: false,
    category: "Systems · Desktop",
    shortDescription:
      "Translated requirements into flowcharts and software specifications, supported the lead developer with application logic, wrote the MySQL database schema, and configured the development environment.",
    contribution: [
      "Translated requirements into flowcharts and software specifications",
      "Supported the lead developer with application logic",
      "Wrote the MySQL database schema",
      "Configured the NetBeans and MySQL Workbench environment",
    ],
    technologies: ["Java", "NetBeans", "MySQL", "MySQL Workbench", "Flowcharts"],
    outcome: "The group delivered a working desktop application and received an A grade.",
    gradientClass: "from-slate-900 to-slate-900",
    accentColor: "#93c5fd",
  },
  {
    slug: "yummy-restaurant",
    media: createProjectMedia("yummy-restaurant"),
    contentStatus: "review",
    title: "Yummy Restaurant",
    subtitle: "Mobile app UI for menu discovery, ordering, and delivery tracking",
    role: "Product and Interface Design",
    dates: "March – July 2026",
    status: "completed",
    featured: false,
    category: "Mobile · Design",
    shortDescription:
      "Designed customer journeys for menu discovery, ordering, payment, and delivery tracking, together with administrative dashboard concepts and reusable interface components.",
    contribution: [
      "Designed customer journeys for menu discovery, ordering, payment, and delivery tracking",
      "Created administrative dashboard concepts",
      "Built reusable interface components",
      "Developed an AI-assisted PostgreSQL schema with seeded mock data in Supabase",
    ],
    technologies: ["Figma", "Supabase", "PostgreSQL", "Mobile UI Design"],
    gradientClass: "from-rose-950 to-slate-900",
    accentColor: "#fca5a5",
  },
  {
    slug: "aminbuy",
    media: createProjectMedia("aminbuy"),
    contentStatus: "review",
    title: "AminBuy Marketplace",
    subtitle: "Ongoing marketplace concept for buyers and sellers",
    role: "Product Designer and Developer",
    dates: "May 2025 – present",
    status: "ongoing",
    featured: false,
    category: "Product · Web",
    shortDescription:
      "An ongoing marketplace concept built around buyer and seller journeys, storefronts, product discovery, ordering, mobile access, trust, and low-bandwidth conditions.",
    contribution: [
      "Designed buyer and seller journeys",
      "Built product exploration with Lovable and Supabase",
      "Seeded mock data for prototyping",
      "Planning direct user interviews and structured research",
    ],
    technologies: ["Lovable", "Supabase", "PostgreSQL", "Product Design"],
    gradientClass: "from-slate-900 to-slate-900",
    accentColor: "#7b68ee",
  },
  {
    slug: "vr-viewer",
    media: createProjectMedia("vr-viewer"),
    contentStatus: "review",
    title: "Custom Cardboard VR Viewer",
    subtitle: "Physical product exploration with technical drawings and prototypes",
    role: "Product Designer and Prototype Developer",
    dates: "August 2025 – present",
    status: "ongoing",
    featured: false,
    category: "Physical · Prototype",
    shortDescription:
      "An ongoing physical-product exploration involving custom Cardboard VR viewer dimensions, technical drawings in LibreCAD, and early physical prototypes.",
    contribution: [
      "Created custom Cardboard VR viewer dimensions",
      "Produced technical drawings in LibreCAD",
      "Built early physical prototypes",
      "Collected informal feedback from family members",
    ],
    technologies: ["LibreCAD", "Technical Drawing", "Physical Prototyping"],
    gradientClass: "from-slate-900 to-slate-900",
    accentColor: "#6ee7b7",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const supportingProjects = projects.filter((p) => !p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
