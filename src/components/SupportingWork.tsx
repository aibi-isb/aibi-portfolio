import { projectStatuses } from "../content/project-status"
import { Link } from "react-router"
import { supportingProjects, type Project } from "../data/projects"
import { useInView } from "../hooks/useInView"

function StatusDot({ status }: { status: Project["status"] }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full inline-block shrink-0 mt-1.5"
      style={{ background: projectStatuses[status].color }}
      aria-hidden
    />
  )
}

function ProjectRow({ project, inView, delay }: { project: Project; inView: boolean; delay: number }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={`reveal ${inView ? "visible" : ""} group flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/6 transition-all duration-200`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Left: number */}
      <div className="shrink-0 w-8">
        <span className="text-xs font-mono text-foreground/25">
          {String(supportingProjects.indexOf(project) + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Centre: content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1">
          <StatusDot status={project.status} />
          <h3
            className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {project.title}
          </h3>
        </div>
        <p className="text-xs text-foreground/45 leading-relaxed mt-1 pl-3.5">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2 pl-3.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="text-xs font-mono text-foreground/30">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right: meta */}
      <div className="shrink-0 text-right sm:min-w-[120px]">
        <p className="text-xs font-mono text-foreground/30">{project.dates.split(";")[0].trim()}</p>
        <p className="text-xs text-foreground/25 mt-0.5">{project.category}</p>
        <p className="text-xs text-foreground/60 mt-1">{projectStatuses[project.status].label}</p>
        <span
          className="text-xs text-foreground/20 group-hover:text-foreground/50 transition-colors mt-2 block"
        >
          View →
        </span>
      </div>
    </Link>
  )
}

export default function SupportingWork() {
  const { ref, inView } = useInView(0.1)

  return (
    <section className="py-20 lg:py-28">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto px-6">
        <div className={`reveal ${inView ? "visible" : ""} mb-10`}>
          <span className="label-mono">More work</span>
          <h2
            className="display-lg mt-3"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Additional projects
          </h2>
        </div>

        <div className="divider mb-2" />

        <div className="flex flex-col">
          {supportingProjects.map((p, i) => (
            <ProjectRow
              key={p.slug}
              project={p}
              inView={inView}
              delay={i * 60}
            />
          ))}
        </div>

        {/* OS Deployment leadership note */}
        <div
          className={`reveal reveal-delay-4 ${inView ? "visible" : ""} mt-10 glass rounded-xl p-5`}
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg glass-light flex items-center justify-center shrink-0">
              <span className="text-xs font-mono text-foreground/50">↑</span>
            </div>
            <div>
              <p className="label-mono mb-1">Leadership</p>
              <p
                className="text-sm font-medium text-foreground/80"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                OS Deployment Process — Group Leader
              </p>
              <p className="text-xs text-foreground/45 mt-1 leading-relaxed">
                Led all five stages of a group research project on operating-system deployment.
                Organised meetings, completed a major share of the research, explained findings
                to group members and students outside the group. Received an A grade.
                November 2025 – March 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
