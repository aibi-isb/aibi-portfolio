import MediaFrame from "../components/MediaFrame"
import { projectStatuses } from "../content/project-status"
import { Link, useParams } from "react-router"
import Nav from "../components/Nav"
import { getProjectBySlug, projects, type Project } from "../data/projects"
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

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${inView ? "visible" : ""}`}
    >
      <h2
        className="text-base font-medium text-foreground/40 mb-4"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="relative min-h-[55vh] flex flex-col justify-end overflow-hidden pt-28 pb-12">
      {/* Background atmosphere */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradientClass}`}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 20% 60%, ${project.accentColor}15 0%, transparent 60%)`,
        }}
      />

      {/* Simulated screens */}
      <div className="absolute top-20 right-0 bottom-0 w-1/2 pointer-events-none hidden lg:block overflow-hidden">
        <div
          className="absolute right-8 top-8 w-80 aspect-[4/3] rounded-2xl border border-white/8 overflow-hidden"
          style={{ background: "rgba(10,10,14,0.7)" }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientClass} opacity-40`} />
          <div className="absolute inset-0 flex flex-col p-5 gap-3">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white/10" />
              ))}
            </div>
            <div className="h-2 rounded-full w-2/3" style={{ background: `${project.accentColor}30` }} />
            <div className="h-1.5 rounded-full w-full bg-white/5" />
            <div className="h-1.5 rounded-full w-4/5 bg-white/5" />
            <div className="flex gap-2 mt-2 flex-1">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-xl border border-white/5"
                  style={{ background: `${project.accentColor}08` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute right-32 top-24 w-36 aspect-[9/16] rounded-2xl border border-white/6 overflow-hidden"
          style={{ background: "rgba(10,10,14,0.8)" }}
        >
          <div className="p-3 h-full flex flex-col gap-2">
            <div className="h-1.5 rounded-full w-3/4 bg-white/8" />
            <div className="h-1 rounded-full w-full bg-white/5" />
            <div className="flex-1 rounded-xl" style={{ background: `${project.accentColor}10` }} />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-foreground/40 hover:text-foreground/70 transition-colors mb-8"
        >
          ← Back to portfolio
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="label-mono">{project.category}</span>
          <StatusBadge status={project.status} />
        </div>

        <h1
          className="display-xl mb-4 max-w-xl"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {project.title}
        </h1>

        <p className="text-lg text-foreground/65 max-w-lg leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/8">
          <div>
            <p className="label-mono mb-1">Role</p>
            <p className="text-sm text-foreground/70">{project.role}</p>
          </div>
          <div>
            <p className="label-mono mb-1">Timeline</p>
            <p className="text-sm text-foreground/70">{project.dates}</p>
          </div>
          <div>
            <p className="label-mono mb-1">Category</p>
            <p className="text-sm text-foreground/70">{project.category}</p>
          </div>
          {project.liveUrl && (
            <div>
              <p className="label-mono mb-1">Live</p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-foreground transition-colors"
                style={{ color: project.accentColor }}
              >
                View project ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TechStack({ techs, accentColor }: { techs: string[]; accentColor: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.map((t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-lg text-xs font-mono border border-white/8 text-foreground/60"
          style={{ background: `${accentColor}08` }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug ?? "")

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Nav />
        <div className="text-center mt-20">
          <p className="label-mono mb-4">404</p>
          <h1 className="display-lg mb-6" style={{ fontFamily: "Fraunces, serif" }}>
            Project not found
          </h1>
          <Link to="/" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    )
  }

  const projectIndex = projects.indexOf(project)
  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <ProjectHero project={project} />

        {/* Body */}
        <article className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">
          {/* Challenge */}
          {project.challenge && (
            <Section title="The challenge">
              <p className="text-foreground/70 leading-relaxed">{project.challenge}</p>
            </Section>
          )}

          {/* What I did */}
          <Section title="What I did">
            <ul className="flex flex-col gap-3">
              {project.contribution.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/70 text-sm leading-relaxed">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                    style={{ background: project.accentColor }}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Technologies */}
          <Section title="Technologies">
            <TechStack techs={project.technologies} accentColor={project.accentColor} />
          </Section>

          {/* Personal ownership */}
          {project.personalOwnership && (
            <Section title="What I personally owned">
              <div
                className="p-4 rounded-xl border-l-2 pl-5"
                style={{ borderColor: project.accentColor, background: `${project.accentColor}06` }}
              >
                <p className="text-foreground/70 text-sm leading-relaxed">{project.personalOwnership}</p>
              </div>
            </Section>
          )}

          {/* AI-assisted work */}
          {project.aiAssisted && (
            <Section title="AI-assisted workflow">
              <div className="glass rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded glass-light flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-foreground/50">AI</span>
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed">{project.aiAssisted}</p>
                </div>
              </div>
            </Section>
          )}

          {/* Outcome */}
          {project.outcome && (
            <Section title="Outcome">
              <p className="text-foreground/70 leading-relaxed">{project.outcome}</p>
            </Section>
          )}

          {project.process?.map((section, index) => (
            <Section key={`${section.heading}-${index}`} title={section.heading}>
              {section.type === "text" && section.body.map((paragraph) => <p key={paragraph} className="text-foreground/70 leading-relaxed mb-3">{paragraph}</p>)}
              {section.type === "process" && <ol className="space-y-4">{section.steps.map((step) => <li key={step.title}><h3 className="font-medium">{step.title}</h3><p className="text-foreground/70">{step.description}</p></li>)}</ol>}
              {section.type === "gallery" && <div className="space-y-4">{section.media.map((media) => <MediaFrame key={media.id} media={media} />)}</div>}
            </Section>
          ))}
          {project.media.length > 0 && (
            <Section title="Project media">
              <div className="space-y-4">
                {project.media.filter((media) => media.status === "approved" || media.id.endsWith("-screens")).map((media) => <MediaFrame key={media.id} media={media} />)}
              </div>
            </Section>
          )}
        </article>

        {/* Navigation between projects */}
        <nav
          className="border-t border-white/6 py-10"
          aria-label="Project navigation"
        >
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
            {prev ? (
              <Link
                to={`/work/${prev.slug}`}
                className="flex flex-col gap-1 group max-w-xs"
              >
                <span className="label-mono text-foreground/30 group-hover:text-foreground/50 transition-colors">
                  ← Previous
                </span>
                <span
                  className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/work/${next.slug}`}
                className="flex flex-col gap-1 text-right group max-w-xs"
              >
                <span className="label-mono text-foreground/30 group-hover:text-foreground/50 transition-colors">
                  Next →
                </span>
                <span
                  className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </main>
    </div>
  )
}
