import MediaFrame from "./MediaFrame"
import { projectStatuses } from "../content/project-status"
import { Link } from "react-router"
import { featuredProjects, type Project } from "../data/projects"
import { useInView } from "../hooks/useInView"

function StatusBadge({ status }: { status: Project["status"] }) {
  const { label, cls } = projectStatuses[status]
  return (
    <span className={`status-badge ${cls}`}>
      <span className="w-1 h-1 rounded-full bg-current inline-block" />
      {label}
    </span>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView(0.1)
  const cover = project.media.find((media) => media.id.endsWith("-cover"))
  const isEven = index % 2 === 0

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal ${inView ? "visible" : ""}`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          !isEven ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Visual */}
        <div className="relative group">
          <Link
            to={`/work/${project.slug}`}
            className="block"
            aria-label={`View case study: ${project.title}`}
          >
            {cover?.status === "approved" ? <MediaFrame media={cover} /> : <>
            {/* Project visual placeholder */}
            <div
              className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br ${project.gradientClass} border border-white/5`}
            >
              {/* Atmospheric glow */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(ellipse at 30% 40%, ${project.accentColor}20 0%, transparent 60%)`,
                }}
              />
              {/* Simulated UI chrome */}
              <div className="absolute inset-0 flex flex-col p-6">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: i === 1 ? `${project.accentColor}60` : "rgba(255,255,255,0.08)" }}
                      />
                    ))}
                  </div>
                  <div
                    className="text-xs font-mono opacity-50 px-2 py-0.5 rounded border border-white/10"
                    style={{ color: project.accentColor }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Content blocks */}
                <div className="flex-1 flex flex-col gap-3">
                  <div
                    className="h-2 rounded-full w-2/3"
                    style={{ background: `${project.accentColor}30` }}
                  />
                  <div className="h-1.5 rounded-full w-full bg-white/5" />
                  <div className="h-1.5 rounded-full w-4/5 bg-white/5" />

                  <div className="flex gap-3 mt-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-xl p-3 border border-white/5"
                        style={{ background: `${project.accentColor}08` }}
                      >
                        <div
                          className="h-1.5 rounded-full mb-2 w-3/4"
                          style={{ background: `${project.accentColor}25` }}
                        />
                        <div className="h-1 rounded-full w-full bg-white/5" />
                        <div className="h-1 rounded-full w-2/3 bg-white/5 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom status */}
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: project.accentColor }}
                  />
                  <div className="h-1 rounded-full flex-1 bg-white/10" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground/80">
                  View case study →
                </span>
              </div>
            </div>
            <p className="text-xs text-foreground/60 mt-2">Preview placeholder · awaiting project imagery</p>
            </>}
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="label-mono">{project.category}</span>
            <StatusBadge status={project.status} />
          </div>

          <h2
            className="display-lg"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {project.title}
          </h2>

          <p className="text-sm text-foreground/50 font-mono">{project.role} · {project.dates}</p>

          <p className="text-foreground/70 leading-relaxed">{project.shortDescription}</p>

          {project.challenge && (
            <div className="border-l-2 pl-4" style={{ borderColor: `${project.accentColor}40` }}>
              <p className="text-sm text-foreground/50 leading-relaxed">{project.challenge}</p>
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-foreground/50 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium mt-2 group"
            style={{ color: project.accentColor }}
          >
            View case study
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {index < featuredProjects.length - 1 && (
        <div className="divider mt-16 mb-0" />
      )}
    </article>
  )
}

export default function FeaturedWork() {
  const { ref, inView } = useInView()

  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${inView ? "visible" : ""} mb-20`}
        >
          <span className="label-mono">Selected work</span>
          <h2
            className="display-xl mt-3"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Projects
          </h2>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
