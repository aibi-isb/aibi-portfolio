'use client'

import { useRef } from "react"
import { Link } from "react-router"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import MediaFrame from "./MediaFrame"
import { buttonVariants } from "./primitives/Button"
import { projectStatuses } from "../content/project-status"
import { featuredProjects, type Project } from "../data/projects"

gsap.registerPlugin(ScrollTrigger, useGSAP)

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const root = useRef<HTMLElement>(null)
  const cover = project.media.find((media) => media.id.endsWith("-cover"))
  const status = projectStatuses[project.status]
  const reversed = index % 2 === 1
  const contribution = project.personalOwnership ?? project.shortDescription

  useGSAP(
    () => {
      const section = root.current
      const copy = section?.querySelector<HTMLElement>("[data-project-copy]")
      const media = section?.querySelector<HTMLElement>("[data-project-media]")
      if (!section || !copy || !media) return

      const mediaQuery = gsap.matchMedia()
      mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          copy,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 42%",
              scrub: 0.5,
            },
          },
        )

        gsap.fromTo(
          media,
          { clipPath: "inset(7% 6% 7% 6% round 12px)", scale: 0.96 },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            scale: 1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 35%",
              scrub: 0.7,
            },
          },
        )
      })

      return () => mediaQuery.revert()
    },
    { scope: root },
  )

  return (
    <article
      ref={root}
      className="relative isolate overflow-hidden border-t border-border py-16 md:py-24 lg:py-32"
      aria-labelledby={`featured-project-${project.slug}`}
    >
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${project.gradientClass} opacity-40`}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: `radial-gradient(ellipse at ${reversed ? "24%" : "78%"} 50%, ${project.accentColor}20, transparent 48%)`,
        }}
        aria-hidden="true"
      />

      <div className="section-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div
          data-project-media
          className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-card lg:col-span-7 ${
            reversed ? "lg:order-2" : ""
          }`}
        >
          {cover?.status === "approved" && cover.src ? (
            <MediaFrame media={cover} />
          ) : (
            <div
              className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-br p-6 md:p-9 ${project.gradientClass}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="label-mono text-foreground/65">{project.category}</span>
                <span className="text-xs font-mono text-foreground/45">Preview pending</span>
              </div>
              <div>
                <span className="mb-3 block h-px w-12" style={{ backgroundColor: project.accentColor }} />
                <p className="max-w-md text-xl text-foreground/85 md:text-2xl" style={{ fontFamily: "Fraunces, serif" }}>
                  {project.title}
                </p>
                <p className="mt-2 max-w-md text-sm text-foreground/55">
                  Approved project imagery will replace this reserved media area.
                </p>
              </div>
            </div>
          )}
        </div>

        <div
          data-project-copy
          className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="label-mono">{String(index + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}</span>
            <span className={`status-badge ${status.cls}`}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
              {status.label}
            </span>
          </div>

          <p className="eyebrow">{project.category}</p>
          <h3
            id={`featured-project-${project.slug}`}
            className="display-lg mb-4 max-w-xl"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {project.title}
          </h3>
          <p className="mb-5 max-w-xl text-sm text-foreground/55">
            {project.role} · {project.dates}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-foreground/75">
            {project.shortDescription}
          </p>

          <div className="mt-6 border-l border-white/20 pl-4">
            <p className="label-mono mb-2">My contribution</p>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/65">{contribution}</p>
          </div>

          <Link
            to={`/work/${project.slug}`}
            className={`${buttonVariants({ variant: "project", size: "large" })} mt-8`}
          >
            View case study
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="featured-work-title" className="relative">
      <header className="section-shell grid gap-5 py-20 md:grid-cols-12 md:items-end md:py-28">
        <div className="md:col-span-7">
          <p className="eyebrow">Selected work</p>
          <h2 id="featured-work-title" className="display-xl" style={{ fontFamily: "Fraunces, serif" }}>
            Projects shaped from idea to interface
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-foreground/60 md:col-span-5 md:justify-self-end">
          A selection of systems, applications, and brand work. Each case study separates my contribution from the team’s work and AI-assisted tasks.
        </p>
      </header>

      <div>
        {featuredProjects.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
