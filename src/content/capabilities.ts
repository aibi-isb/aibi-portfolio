import type { Capability } from "../types/content"

export const capabilities: Capability[] = [
  {
    title: "Product & interface design",
    description: "Wireframes, interactive prototypes, user flows, information architecture, responsive layouts, design systems, typography, colour, branding.",
    tools: ["Figma", "Design Systems", "Prototyping"],
    accent: "#c4b5fd",
    projectSlugs: ["salone-fresh", "yummy-restaurant", "dash-delivery"],
  },
  {
    title: "Frontend implementation",
    description: "HTML5, CSS3, JavaScript, React, React Native, Expo, Tailwind CSS, Material UI, WordPress, WooCommerce, Elementor.",
    tools: ["React", "React Native", "Tailwind CSS"],
    accent: "#93c5fd",
    projectSlugs: ["salone-fresh", "yummy-provision", "house-rental"],
  },
  {
    title: "Systems & data",
    description: "Requirements analysis, flowcharts, software specifications, relational schemas, ERDs, Supabase, PostgreSQL, MySQL, SQLite, structured records.",
    tools: ["PostgreSQL", "Supabase", "diagrams.net"],
    accent: "#6ee7b7",
    projectSlugs: ["house-rental", "university-voting", "aminbuy"],
  },
  {
    title: "Visual communication",
    description: "Brand identity, visual hierarchy, layout composition, presentation design, technical drawing.",
    tools: ["Brand Identity", "UI Design", "LibreCAD"],
    accent: "#fcd34d",
    projectSlugs: ["dash-delivery", "vr-viewer"],
  },
  {
    title: "AI-assisted delivery",
    description: "I direct AI tools to accelerate design exploration, implementation, and learning — while retaining responsibility for all decisions, review, testing, and outcomes.",
    tools: ["Cursor", "Lovable", "GitHub Copilot", "Figma MCP"],
    accent: "#7b68ee",
    projectSlugs: ["house-rental", "salone-fresh", "yummy-provision"],
  },
]
