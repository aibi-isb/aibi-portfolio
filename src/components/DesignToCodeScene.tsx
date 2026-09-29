'use client'

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { processSteps } from "../content/process"
import { deviceQueries } from "../lib/device-queries"

gsap.registerPlugin(ScrollTrigger, useGSAP)

function DeviceScreen() {
  return (
    <div className="design-screen">
      <div className="design-screen__toolbar">
        <span>Workflow schematic</span>
        <span>Design ↔ build</span>
      </div>
      <div className="design-screen__canvas">
        <div className="design-screen__mode design-screen__mode--design" data-screen-design>
          <p className="design-screen__kicker">Interface blueprint</p>
          <div className="design-screen__blueprint">
            <div className="design-screen__blueprint-heading" />
            <div className="design-screen__blueprint-copy" />
            <div className="design-screen__blueprint-copy design-screen__blueprint-copy--short" />
            <div className="design-screen__blueprint-action" />
            <div className="design-screen__blueprint-grid">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
        <div className="design-screen__mode design-screen__mode--build" data-screen-build>
          <p className="design-screen__kicker">Responsive implementation</p>
          <div className="design-screen__build-layout">
            <div className="design-screen__build-header" />
            <div className="design-screen__build-main">
              <div>
                <div className="design-screen__build-heading" />
                <div className="design-screen__build-copy" />
                <div className="design-screen__build-action" />
              </div>
              <div className="design-screen__build-panel" />
            </div>
          </div>
        </div>
        <div className="design-screen__guides" data-screen-guides aria-hidden="true">
          <span>Type</span>
          <span>Spacing</span>
          <span>Components</span>
        </div>
      </div>
    </div>
  )
}

function Device({ variant }: { variant: "laptop" | "tablet" | "phone" }) {
  if (variant === "laptop") {
    return (
      <div className="design-device design-device--laptop" data-scene-device="laptop" aria-hidden="true">
        <div className="design-device__lid" data-device-lid>
          <div className="design-device__bezel">
            <DeviceScreen />
          </div>
        </div>
        <div className="design-device__keyboard" />
      </div>
    )
  }

  if (variant === "tablet") {
    return (
      <div className="design-device design-device--tablet" data-scene-device="tablet" aria-hidden="true">
        <div className="design-device__tablet-frame">
          <DeviceScreen />
        </div>
      </div>
    )
  }

  return (
    <div className="design-device design-device--phone" data-scene-device="phone" aria-hidden="true">
      <div className="design-device__phone-frame">
        <div className="design-device__phone-camera" />
        <DeviceScreen />
      </div>
    </div>
  )
}

export default function DesignToCodeScene() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scene = root.current
      const pinnedStage = stage.current
      if (!scene || !pinnedStage) return

      const media = gsap.matchMedia()
      media.add(
        {
          laptop: deviceQueries.laptop,
          tablet: deviceQueries.tablet,
          phone: deviceQueries.phone,
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions
          if (conditions?.reduced) return

          const deviceName = conditions?.laptop
            ? "laptop"
            : conditions?.tablet
              ? "tablet"
              : "phone"
          const device = scene.querySelector<HTMLElement>(`[data-scene-device="${deviceName}"]`)
          const design = scene.querySelector<HTMLElement>("[data-screen-design]")
          const build = scene.querySelector<HTMLElement>("[data-screen-build]")
          const guides = scene.querySelector<HTMLElement>("[data-screen-guides]")
          const steps = scene.querySelectorAll<HTMLElement>("[data-process-step]")
          if (!device || !design || !build || !guides || steps.length === 0) return

          const sequence = gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              pin: conditions?.laptop ? pinnedStage : false,
              start: conditions?.laptop ? "top top" : "top 72%",
              end: conditions?.laptop
                ? () => `+=${Math.round(window.innerHeight * 1.65)}`
                : "bottom 24%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: conditions?.laptop ? 1 : 0,
            },
          })

          sequence
            .fromTo(device, { y: 18, rotateX: 4 }, { y: 0, rotateX: 0, duration: 0.18 }, 0)
            .fromTo(guides, { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.18 }, 0.16)
            .to(guides, { autoAlpha: 0, duration: 0.12 }, 0.42)
            .to(design, { autoAlpha: 0, duration: 0.14 }, 0.5)
            .to(build, { autoAlpha: 1, duration: 0.14 }, 0.5)
            .fromTo(
              steps,
              { autoAlpha: 0.55, y: 8 },
              { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.2 },
              0.45,
            )

          if (conditions?.laptop) {
            const lid = device.querySelector<HTMLElement>("[data-device-lid]")
            if (lid) sequence.to(lid, { rotateX: 62, duration: 0.16 }, 0.9)
          } else {
            sequence.to(device, { rotateY: 7, rotateX: 12, duration: 0.16 }, 0.9)
          }
        },
      )

      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="design-to-code-scene" aria-labelledby="design-to-code-title">
      <div ref={stage} className="design-to-code-scene__stage">
        <div className="section-shell design-to-code-scene__content">
          <header className="design-to-code-scene__heading">
            <p className="eyebrow">From design to build</p>
            <h2 id="design-to-code-title" className="display-xl" style={{ fontFamily: "Fraunces, serif" }}>
              One system, carried through to implementation.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65">
              A schematic view of how requirements, interface decisions, reusable components, and validation connect. This is a process illustration, not a project screenshot.
            </p>
          </header>

          <div className="design-to-code-scene__layout">
            <div className="design-to-code-scene__device-stage">
              <Device variant="laptop" />
              <Device variant="tablet" />
              <Device variant="phone" />
            </div>

            <ol className="design-to-code-scene__steps" aria-label="Design and development process">
              {processSteps.map((step) => (
                <li key={step.number} data-process-step>
                  <span className="design-to-code-scene__step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="design-to-code-scene__static-comparison" aria-label="Design and implementation comparison">
            <article>
              <p className="eyebrow">Design</p>
              <h3>Define the structure</h3>
              <p>Organise hierarchy, spacing, and reusable interface patterns.</p>
            </article>
            <article>
              <p className="eyebrow">Build</p>
              <h3>Validate the result</h3>
              <p>Implement responsive components and review their behaviour.</p>
            </article>
          </div>
        </div>
      </div>
      <p className="sr-only">
        The device scene presents a schematic design blueprint, reveals spacing and component guides, transitions to an implementation layout, and closes as the visitor continues scrolling. The sequence reverses when scrolling upward. Mobile and reduced-motion users receive a static comparison.
      </p>
    </section>
  )
}
