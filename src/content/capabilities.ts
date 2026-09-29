import type { Capability } from "../types/content.ts"

export const capabilities: Capability[] = [
  {
    title: "Product & interface design",
    description: "Wireframes, interactive prototypes, user flows, information architecture, responsive layouts, design systems, typography, colour, branding.",
    tools: ["Figma", "Design Systems", "Prototyping"],
    accent: "#c4b5fd",
  },
  {
    title: "Frontend implementation",
    description: "HTML5, CSS3, JavaScript, React, React Native, Expo, Tailwind CSS, Material UI, WordPress, WooCommerce, Elementor.",
    tools: ["React", "React Native", "Tailwind CSS"],
    accent: "#93c5fd",
  },
  {
    title: "Systems & data",
    description: "Requirements analysis, flowcharts, software specifications, relational schemas, ERDs, Supabase, PostgreSQL, MySQL, SQLite, structured records.",
    tools: ["PostgreSQL", "Supabase", "diagrams.net"],
    accent: "#6ee7b7",
  },
  {
    title: "Visual communication",
    description: "Brand identity, visual hierarchy, layout composition, presentation design, technical drawing.",
    tools: ["Brand Identity", "UI Design", "LibreCAD"],
    accent: "#fcd34d",
  },
  {
    title: "AI-assisted delivery",
    description: "I direct AI tools to accelerate design exploration, implementation, and learning — while retaining responsibility for all decisions, review, testing, and outcomes.",
    tools: ["Cursor", "Lovable", "GitHub Copilot", "Figma MCP"],
    accent: "#7b68ee",
  },
]
