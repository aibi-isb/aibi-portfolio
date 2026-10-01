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
        {processSteps.map((step, index) => (
          <div key={step.number} className="design-screen__mode design-screen__mode--state" data-screen-state data-screen-state-index={index}>
            <p className="design-screen__kicker">
              {step.number} — {step.title}
            </p>
            <div className="design-screen__state-panel">
              <div className="design-screen__state-copy">
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </div>
              <div className="design-screen__state-metrics" aria-hidden="true">
                <span>Flow</span>
                <span>Signal</span>
                <span>Review</span>
              </div>
            </div>
          </div>
        ))}
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
          const screenStates = gsap.utils.toArray<HTMLElement>("[data-screen-state]")
          if (!device || !guides || steps.length === 0) return

          if (conditions?.laptop) {
            const stateCount = screenStates.length
            if (stateCount === 0) return

            const lid = device.querySelector<HTMLElement>("[data-device-lid]")
            const entryTransform = { x: 0, y: 70, rotateX: 16, rotateY: -18, scale: 0.92 }
            const centeredTransform = { x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 }
            const exitTransform = { x: 0, y: 0, rotateX: 0, rotateY: -18, scale: 0.97 }

            gsap.set(screenStates, {
              autoAlpha: 0,
              x: 26,
              y: 8,
              filter: "blur(4px)",
              transformPerspective: 1200,
            })
            gsap.set(screenStates[0], {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            })
            gsap.set(device, {
              ...entryTransform,
              transformPerspective: 1200,
              force3D: true,
              transformOrigin: "50% 50%",
            })
            if (lid) gsap.set(lid, { rotateX: 0, rotateY: 0, transformPerspective: 1200, force3D: true })

            const updateState = (progress: number) => {
              const activeIndex = Math.min(stateCount - 1, Math.max(0, Math.round(progress * (stateCount - 1))))

              gsap.to(screenStates, {
                autoAlpha: (index) => (index === activeIndex ? 1 : 0),
                x: (index) => (index === activeIndex ? 0 : index < activeIndex ? -16 : 18),
                y: (index) => (index === activeIndex ? 0 : 8),
                filter: (index) => (index === activeIndex ? "blur(0px)" : "blur(3px)"),
                duration: 0.26,
                ease: "power2.out",
                overwrite: true,
              })
            }

            const scrollTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: scene,
                pin: pinnedStage,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * 1.9)}`,
                scrub: 1,
                snap: {
                  snapTo: 1 / (stateCount - 1),
                  duration: 0.42,
                  ease: "power2.inOut",
                },
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => updateState(self.progress),
              },
            })

            scrollTimeline
              .fromTo(device, entryTransform, centeredTransform, 0)
              .to(device, { ...centeredTransform, duration: 0.25 }, 0.42)
              .to(device, { ...exitTransform, duration: 0.9, ease: "power2.inOut" }, 1)

            if (lid) {
              scrollTimeline.to(lid, { rotateX: 0, rotateY: 0, duration: 0.2, ease: "power2.inOut" }, 0)
            }

            gsap.fromTo(
              steps,
              { autoAlpha: 0.35, y: 6 },
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 62%",
                  end: "bottom 18%",
                  scrub: 0.8,
                },
              },
            )

            return
          }

          const sequence = gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              pin: false,
              start: "top 72%",
              end: "bottom 24%",
              scrub: 0.8,
              invalidateOnRefresh: true,
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

          sequence.to(device, { rotateY: 7, rotateX: 12, duration: 0.16 }, 0.9)
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
