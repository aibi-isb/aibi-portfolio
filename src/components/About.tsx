import MediaFrame from "./MediaFrame"
import { identityAssets } from "../content/assets"
import { paragraphs, interests, education } from "../content/about"
import { useInView } from "../hooks/useInView"

export default function About() {
  const { ref, inView } = useInView(0.1)





  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-900/8 rounded-full blur-3xl" />
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto px-6"
      >
        <div className={`reveal ${inView ? "visible" : ""} mb-12`}>
          <span className="label-mono">About me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Portrait */}
          <div className={`reveal reveal-delay-1 ${inView ? "visible" : ""} max-w-xs lg:max-w-none mx-auto lg:mx-0 w-full`}>
            <MediaFrame media={identityAssets.find((asset) => asset.id === "portrait")!} />
            {/* Education sidebar */}
            <div className="mt-5 glass rounded-xl p-4">
              <p className="label-mono mb-2">Education</p>
              <p
                className="text-sm font-medium"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                {education.title}
              </p>
              <p className="text-xs text-foreground/50 mt-1">{education.locationAndDates}</p>
              <p className="text-xs text-foreground/40 mt-2 leading-relaxed">
                {education.description}
              </p>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-6">
            <h2
              className={`display-xl reveal reveal-delay-1 ${inView ? "visible" : ""}`}
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Design, development,
              <br />
              <span className="italic text-foreground/60">and everything between</span>
            </h2>

            <div className="flex flex-col gap-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-foreground/70 leading-relaxed reveal ${inView ? "visible" : ""}`}
                  style={{ transitionDelay: `${(i + 2) * 100}ms` }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* What I'm looking for */}
            <div
              className={`mt-4 glass rounded-xl p-5 reveal reveal-delay-4 ${inView ? "visible" : ""}`}
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
