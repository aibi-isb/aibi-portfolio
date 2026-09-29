import { capabilities } from "../content/capabilities"
import { processSteps } from "../content/process"
import { useInView } from "../hooks/useInView"



function CapabilityCard({
  cap,
  index,
  inView,
}: {
  cap: (typeof capabilities)[0]
  index: number
  inView: boolean
}) {
  return (
    <div
      className={`reveal ${inView ? "visible" : ""} glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/12 transition-colors`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Accent dot */}
      <div className="w-2 h-2 rounded-full" style={{ background: cap.accent }} />

      <h3
        className="text-base font-medium"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {cap.title}
      </h3>

      <p className="text-sm text-foreground/55 leading-relaxed flex-1">{cap.description}</p>

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
        {cap.tools.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded text-xs font-mono text-foreground/40 border border-white/6"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}



function ProcessStep({
  step,
  index,
  total,
  inView,
}: {
  step: (typeof processSteps)[0]
  index: number
  total: number
  inView: boolean
}) {
  return (
    <div
      className={`reveal ${inView ? "visible" : ""} flex gap-5 group`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left: number + connector */}
      <div className="flex flex-col items-center gap-0 shrink-0">
        <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <span
            className="text-xs font-mono text-foreground/50 group-hover:text-foreground/80 transition-colors"
          >
            {step.number}
          </span>
        </div>
        {index < total - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-white/8 to-transparent mt-2 mb-2 min-h-[2rem]" />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-8">
        <h3
          className="text-base font-medium mb-2"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {step.title}
        </h3>
        <p className="text-sm text-foreground/55 leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}

export default function Capabilities() {
  const { ref: capsRef, inView: capsInView } = useInView(0.05)
  const { ref: procRef, inView: procInView } = useInView(0.1)

  return (
    <>
      {/* Capabilities */}
      <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/3 w-80 h-80 bg-violet-900/8 rounded-full blur-3xl" />
        </div>

        <div ref={capsRef as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto px-6">
          <div className={`reveal ${capsInView ? "visible" : ""} mb-12`}>
            <span className="label-mono">What I do</span>
            <h2
              className="display-xl mt-3"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <CapabilityCard
                key={cap.title}
                cap={cap}
                index={i}
                inView={capsInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 lg:py-32">
        <div
          ref={procRef as React.RefObject<HTMLDivElement>}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: intro */}
            <div>
              <div className={`reveal ${procInView ? "visible" : ""}`}>
                <span className="label-mono">How I work</span>
                <h2
                  className="display-xl mt-3 mb-6"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  My process
                </h2>
                <p className="text-foreground/60 leading-relaxed">
                  Every project is different, but the approach follows a consistent shape — from
                  understanding the problem through to validating the result.
                </p>
              </div>

              {/* Design-to-code visual */}
              <div
                className={`reveal reveal-delay-2 ${procInView ? "visible" : ""} mt-10 glass rounded-2xl p-5 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-blue-900/5" />
                <p className="label-mono mb-4 relative z-10">Design → Code</p>

                <div className="relative z-10 flex flex-col gap-3">
                  {/* Figma layer */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-900/15 border border-violet-900/20">
                    <div className="w-3 h-3 rounded bg-violet-400/50" />
                    <span className="text-xs font-mono text-foreground/60">Component.fig</span>
                    <div className="ml-auto w-12 h-1.5 rounded-full bg-violet-400/20" />
                  </div>
                  {/* Arrow */}
                  <div className="flex justify-center text-foreground/20 text-sm">↓</div>
                  {/* Code layer */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-900/15 border border-blue-900/20">
                    <div className="w-3 h-3 rounded bg-blue-400/50" />
                    <span className="text-xs font-mono text-foreground/60">Component.tsx</span>
                    <div className="ml-auto w-12 h-1.5 rounded-full bg-blue-400/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: steps */}
            <div className="flex flex-col">
              {processSteps.map((step, i) => (
                <ProcessStep
                  key={step.number}
                  step={step}
                  index={i}
                  total={processSteps.length}
                  inView={procInView}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
