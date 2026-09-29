import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import MediaFrame from "./MediaFrame"
import { identityAssets } from "../content/assets"
import { paragraphs, interests, education } from "../content/about"
import { useInView } from "../hooks/useInView"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function About() {
  const section = useRef<HTMLElement>(null)
  const portraitFlow = useRef<HTMLDivElement>(null)
  const portraitImage = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView(0.1)

  useGSAP(
    () => {
      const root = section.current
      const flow = portraitFlow.current
      const imageFrame = portraitImage.current
      if (!root || !flow || !imageFrame) return

      const media = gsap.matchMedia()
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 74%",
            end: () => `+=${Math.round(window.innerHeight * 0.75)}`,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .fromTo(flow, { width: "34%" }, { width: "52%", ease: "none" }, 0)
          .fromTo(
            imageFrame,
            { clipPath: "inset(18% 16% 18% 16% round 12px)" },
            { clipPath: "inset(0% 0% 0% 0% round 12px)", ease: "none" },
            0,
          )

        const biography = root.querySelectorAll<HTMLElement>("[data-about-copy]")
        gsap.fromTo(
          biography,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            ease: "none",
            immediateRender: false,
            stagger: 0.08,
            scrollTrigger: {
              trigger: root,
              start: "top 58%",
              end: "center 32%",
              scrub: 0.6,
            },
          },
        )
      })

      media.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          imageFrame,
          { clipPath: "inset(16% 12% 16% 12% round 12px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              end: "center 38%",
              scrub: 0.65,
            },
          },
        )
      })

      return () => media.revert()
    },
    { scope: section },
  )

  return (
    <section ref={section} id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 12% 48%, rgba(52, 68, 71, 0.2), transparent 44%), linear-gradient(120deg, transparent 34%, rgba(255, 255, 255, 0.018), transparent 72%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto px-6"
      >
        <div className={`reveal ${inView ? "visible" : ""} mb-12`}>
          <span className="label-mono">About me</span>
        </div>

        <div className="about-flow">
          <div
            ref={portraitFlow}
            className={`about-portrait-flow reveal reveal-delay-1 ${inView ? "visible" : ""}`}
          >
            <div ref={portraitImage} className="aspect-[3/4] overflow-hidden rounded-xl">
              <MediaFrame media={identityAssets.find((asset) => asset.id === "portrait")!} />
            </div>
            <div className="mt-5 glass rounded-xl p-4">
              <p className="label-mono mb-2">Education</p>
              <p className="text-sm font-medium" style={{ fontFamily: "Fraunces, serif" }}>
                {education.title}
              </p>
              <p className="text-xs text-foreground/50 mt-1">{education.locationAndDates}</p>
              <p className="text-xs text-foreground/40 mt-2 leading-relaxed">
                {education.description}
              </p>
            </div>
          </div>

          <div className="about-copy-flow">
            <h2
              className={`display-xl reveal reveal-delay-1 ${inView ? "visible" : ""}`}
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Design, development,
              <br />
              <span className="italic text-foreground/60">and everything between</span>
            </h2>

            {paragraphs.map((p, i) => (
              <p
                key={i}
                data-about-copy
                className={`about-paragraph text-foreground/70 leading-relaxed reveal ${inView ? "visible" : ""}`}
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                {p}
              </p>
            ))}

            {/* What I'm looking for */}
            <div
              className={`about-availability mt-4 glass rounded-xl p-5 reveal reveal-delay-4 ${inView ? "visible" : ""}`}
            >
              <p className="label-mono mb-3">Open to</p>
              <ul className="flex flex-col gap-2">
                {interests.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
