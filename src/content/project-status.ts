import type { ProjectStatus } from "../types/project"

export const projectStatuses: Record<ProjectStatus, { label: string; cls: string; color: string }> = {
  completed: { label: "Completed", cls: "status-badge-completed", color: "#34d399" },
  ongoing: { label: "In progress", cls: "status-badge-ongoing", color: "#fbbf24" },
  academic: { label: "Academic", cls: "status-badge-academic", color: "#93c5fd" },
  experimental: { label: "Experimental", cls: "status-badge-ongoing", color: "#fbbf24" },
}
