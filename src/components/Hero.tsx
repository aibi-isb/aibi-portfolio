'use client'

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import useEmblaCarousel from "embla-carousel-react"
import MediaFrame from "./MediaFrame"
import { Button, buttonVariants } from "./primitives/Button"
import { featuredProjects } from "../data/projects"
import { site, documentAction } from "../content/site"
import { Link } from "react-router"

gsap.registerPlugin(useGSAP)

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
      role="group"
      aria-roledescription="slide"
      aria-label={slide.label}
      className={`relative h-full min-w-0 flex-[0_0_100%] transition-all duration-700 ${
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
    <div className="relative w-full max-w-lg mx-auto">
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
  const root = useRef<HTMLElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1 })
  const [slide, setSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
      timeline
        .fromTo(
          "[data-hero-identity]",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
        )
        .fromTo(
          "[data-hero-title-line]",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, stagger: 0.12 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero-copy]",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08 },
          "-=0.35",
        )
        .fromTo(
          "[data-hero-action]",
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-device]",
          { y: 28, rotateX: 2, autoAlpha: 0 },
          { y: 0, rotateX: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.65",
        )
    },
    { scope: root },
  )

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    const element = root.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const updateSelectedSlide = () => setSlide(emblaApi.selectedScrollSnap())
    const pauseForDrag = () => setIsPlaying(false)
    emblaApi.on("select", updateSelectedSlide)
    emblaApi.on("reInit", updateSelectedSlide)
    emblaApi.on("pointerDown", pauseForDrag)
    updateSelectedSlide()

    return () => {
      emblaApi.off("select", updateSelectedSlide)
      emblaApi.off("reInit", updateSelectedSlide)
      emblaApi.off("pointerDown", pauseForDrag)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || !isPlaying || !isInView || isInteracting || reducedMotion) return

    const interval = window.setInterval(() => emblaApi.scrollNext(), 5000)
    return () => window.clearInterval(interval)
  }, [emblaApi, isInView, isInteracting, isPlaying, reducedMotion])

  return (
    <section
      ref={root}
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 74% 36%, rgba(35, 66, 78, 0.25), transparent 43%), radial-gradient(ellipse at 24% 78%, rgba(48, 56, 62, 0.22), transparent 48%), linear-gradient(135deg, #08080a, #101216 58%, #08080a)",
        }}
      />
      <div className="absolute inset-0 surface-grid opacity-30 pointer-events-none" aria-hidden="true">
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          {/* Eyebrow */}
          <div data-hero-identity>
            <span className="label-mono block">{site.brand}</span>
            <span className="mt-2 block text-xs uppercase tracking-[0.22em] text-foreground/40">
              {site.portfolioLabel}
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-title"
            aria-label={`${site.firstName} ${site.lastName}`}
            className="display-2xl mt-4 mb-6"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            <span className="block overflow-hidden">
              <span data-hero-title-line className="block">{site.firstName}</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-title-line className="gradient-text italic block">{site.lastName}</span>
            </span>
          </h1>

          {/* Role */}
          <p data-hero-copy className="text-base text-foreground/50 font-light mb-4">
            {site.role}
          </p>

          {/* Body */}
          <p data-hero-copy className="text-lg text-foreground/70 leading-relaxed max-w-md mb-8">
            {site.introduction}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              data-hero-action
              className={buttonVariants({ variant: "primary" })}
            >
              View work
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
              data-hero-action
              className={buttonVariants({ variant: "secondary" })}
            >
              {documentAction.label}
            </Link>
          </div>

          {/* AI footnote */}
          <p data-hero-copy className="mt-8 text-xs text-foreground/40 max-w-xs leading-relaxed">
            {site.aiStatement}
          </p>
        </div>

        {/* Right: device */}
        <div
          data-hero-device
          className="relative"
          onPointerEnter={() => setIsInteracting(true)}
          onPointerLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget
            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
              setIsInteracting(false)
            }
          }}
        >
          <div className="mx-auto w-full max-w-lg">
            <DeviceFrame>
              <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                  {slides.map((item, index) => (
                    <ProjectSlide key={item.label} slide={item} active={index === slide} />
                  ))}
                </div>
              </div>
            </DeviceFrame>

            <div className="mt-5 flex items-center justify-between gap-3" aria-label="Project preview controls">
              <Button
                type="button"
                variant="secondary"
                size="small"
                aria-label="Previous project preview"
                onClick={() => {
                  emblaApi?.scrollPrev()
                  setIsPlaying(false)
                }}
              >
                Previous
              </Button>
              <div className="flex items-center gap-3">
                <p className="label-mono m-0" aria-live="off" aria-atomic="true">
                  {String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </p>
                <Button
                  type="button"
                  variant="glass"
                  size="small"
                  aria-label={isPlaying ? "Pause automatic previews" : "Resume automatic previews"}
                  aria-pressed={isPlaying && !reducedMotion}
                  disabled={reducedMotion}
                  onClick={() => setIsPlaying((playing) => !playing)}
                >
                  {reducedMotion ? "Manual" : isPlaying ? "Pause" : "Play"}
                </Button>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="small"
                aria-label="Next project preview"
                onClick={() => {
                  emblaApi?.scrollNext()
                  setIsPlaying(false)
                }}
              >
                Next
              </Button>
            </div>

            <div className="mt-3 flex justify-center gap-2" aria-label="Choose project preview">
              {slides.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={`Show ${item.label}`}
                  aria-pressed={index === slide}
                  onClick={() => {
                    emblaApi?.scrollTo(index)
                    setIsPlaying(false)
                  }}
                  className={`min-h-8 px-2 flex items-center justify-center ${
                    index === slide ? "text-foreground" : "text-foreground/35"
                  }`}
                >
                  <span className={`block h-1 rounded-full transition-all duration-300 ${
                    index === slide ? "w-6 bg-current" : "w-2 bg-current"
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
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
