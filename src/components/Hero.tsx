import MediaFrame from "./MediaFrame"
import { featuredProjects } from "../data/projects"
import { site, documentAction } from "../content/site"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

const slides = featuredProjects.map((project) => ({
  media: project.media.find((media) => media.id.endsWith("-cover")),
  label: project.title,
  category: project.category,
  gradient: project.gradientClass,
  accent: project.accentColor,
  lines: ["70%", "55%", "80%", "45%"].map((w) => ({ w })),
}))

function ProjectSlide({ slide, active }: { slide: (typeof slides)[0]; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ${
        active ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
      }`}
      aria-hidden={!active}
    >
      {slide.media?.status === "approved" ? <MediaFrame media={slide.media} /> : <>
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
      {/* Simulated screen content — placeholder wireframe */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 py-6 gap-3">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/10" />
            ))}
          </div>
          <div className="w-24 h-1.5 rounded-full bg-white/10" />
        </div>
        {/* Content lines */}
        {slide.lines.map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-1.5 rounded-full bg-white/10 transition-all duration-1000"
              style={{ width: active ? line.w : "0%", transitionDelay: `${i * 80}ms` }}
            />
          </div>
        ))}
        {/* Card blocks */}
        <div className="flex gap-2 mt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-16 rounded-lg border border-white/5"
              style={{ background: `${slide.accent}08` }}
            />
          ))}
        </div>
      </div>
      </>}
      {/* Project label */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="label-mono" style={{ color: slide.accent }}>
          {slide.category}{slide.media?.status !== "approved" && " · Preview placeholder"}
        </p>
        <p className="text-xs text-foreground/60 mt-0.5 font-mono">{slide.label}</p>
      </div>
    </div>
  )
}

function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Laptop body */}
      <div
        className="relative rounded-xl overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(145deg, #1a1a1f 0%, #111114 100%)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Screen bezel */}
        <div className="bg-[#0d0d10] m-2 rounded-lg overflow-hidden aspect-[16/10] relative">
          {/* Screen glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-violet-950/20" />
          {children}
        </div>
        {/* Bottom bar */}
        <div className="h-5 flex items-center justify-center">
          <div className="w-12 h-0.5 rounded-full bg-white/10" />
        </div>
      </div>
      {/* Stand shadow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/5 h-3 bg-black/30 blur-xl rounded-full" />
    </div>
  )
}

export default function Hero() {
  const [slide, setSlide] = useState(0)
  const [entered, setEntered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length)
    }, 3500)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  function goTo(i: number) {
    setSlide(i)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length)
    }, 3500)
  }

  function scrollToWork(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-emerald-900/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          {/* Eyebrow */}
          <div
            className={`transition-all duration-700 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="label-mono block">{site.brand}</span>
            <span className="mt-2 block text-xs uppercase tracking-[0.22em] text-foreground/40">
              {site.portfolioLabel}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`display-2xl mt-4 mb-6 transition-all duration-700 delay-100 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {site.firstName}
            <br />
            <span className="gradient-text italic">{site.lastName}</span>
          </h1>

          {/* Role */}
          <p
            className={`text-base text-foreground/50 font-light mb-4 transition-all duration-700 delay-150 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {site.role}
          </p>

          {/* Body */}
          <p
            className={`text-lg text-foreground/70 leading-relaxed max-w-md mb-8 transition-all duration-700 delay-200 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {site.introduction}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#work"
              onClick={scrollToWork}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              View my work
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link
              to={documentAction.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass-light text-foreground/80 font-medium hover:text-foreground transition-colors"
            >
              {documentAction.label}
            </Link>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-foreground/50 hover:text-foreground/80 transition-colors text-sm"
            >
              Let's talk →
            </a>
          </div>

          {/* AI footnote */}
          <p
            className={`mt-8 text-xs text-foreground/30 max-w-xs leading-relaxed transition-all duration-700 delay-500 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
          >
            {site.aiStatement}
          </p>
        </div>

        {/* Right: device */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <DeviceFrame>
            {slides.map((s, i) => (
              <ProjectSlide key={i} slide={s} active={i === slide} />
            ))}
          </DeviceFrame>

          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-5">
            {slides.map((s, i) => (
              <button
                key={i}
                aria-label={`Show ${s.label}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === slide ? "w-5 h-1.5 bg-foreground" : "w-1.5 h-1.5 bg-foreground/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${
          entered ? "opacity-40" : "opacity-0"
        }`}
        aria-hidden
      >
        <span className="label-mono text-foreground/40" style={{ fontSize: "0.6rem" }}>
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
