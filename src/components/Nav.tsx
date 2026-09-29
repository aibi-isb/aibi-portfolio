'use client'

import { navLinks } from "../content/navigation"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Link, useLocation } from "react-router"

gsap.registerPlugin(useGSAP)

function IBLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="IB Studio">
      <rect width="32" height="32" rx="6" fill="rgba(247,246,242,0.08)" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="14"
        fontWeight="400"
        fill="#f7f6f2"
      >
        IB
      </text>
    </svg>
  )
}

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.fromTo(
        navRef.current,
        { y: -12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
      )
    },
    { scope: navRef },
  )

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.to(surfaceRef.current, {
        scale: scrolled ? 0.97 : 1,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "top center",
      })
    },
    { dependencies: [scrolled], scope: navRef, revertOnUpdate: true },
  )

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      setActive("")
      return
    }

    const hero = document.querySelector("main > section")
    const sections = new Set([...navLinks.map((link) => link.href.slice(1)), "contact"])
    const sectionElements = Array.from(
      document.querySelectorAll<HTMLElement>("main [id]"),
    ).filter((element) => sections.has(element.id))
    const visibleSections = new Set<HTMLElement>()

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target as HTMLElement)
          } else {
            visibleSections.delete(entry.target as HTMLElement)
          }
        }

        const current = sectionElements.filter((element) => visibleSections.has(element)).at(-1)
        if (current) setActive(current.id)
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )

    sectionElements.forEach((element) => sectionObserver.observe(element))

    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            setScrolled(!entry.isIntersecting)
            if (entry.isIntersecting) setActive("")
          },
          { threshold: 0 },
        )
      : null

    if (hero && heroObserver) {
      heroObserver.observe(hero)
    }

    const hashId = window.location.hash.slice(1)
    if (hashId) {
      document.getElementById(hashId)?.scrollIntoView({ behavior: "auto", block: "start" })
    }

    return () => {
      sectionObserver.disconnect()
      heroObserver?.disconnect()
    }
  }, [isHome])

  useEffect(() => {
    if (!mobileOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-[top] duration-500 ${
          scrolled ? "top-3" : "top-4"
        }`}
        style={{ width: "min(900px, calc(100vw - 2rem))" }}
        aria-label="Primary navigation"
      >
        <div ref={navRef}>
          <div
            ref={surfaceRef}
            className="glass-surface glass-surface--strong rounded-xl px-4 py-3 flex items-center justify-between"
          >
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="IB Studio — home"
          >
            <IBLogo />
            <span
              className="font-display text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              IB Studio
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const sectionId = href.slice(1)
              const isActive = active === sectionId
              return (
                <a
                  key={label}
                  href={isHome ? href : `/${href}`}
                  onClick={closeMobileMenu}
                  aria-current={isHome && isActive ? "location" : undefined}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-foreground"
                      : "text-foreground/50 hover:text-foreground/90 hover:bg-white/5"
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={closeMobileMenu}
              aria-current={isHome && active === "contact" ? "location" : undefined}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Let's talk
            </a>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span className="block w-5 h-3.5 relative" aria-hidden="true">
                <span
                  className={`absolute w-full h-px bg-current transition-all duration-300 ${
                    mobileOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1.5 w-full h-px bg-current transition-opacity duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute w-full h-px bg-current transition-all duration-300 ${
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 w-full bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close navigation menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={closeMobileMenu}
        />
        <nav
          aria-label="Mobile navigation"
          inert={!mobileOpen}
          className={`absolute top-20 left-4 right-4 glass rounded-xl p-5 transition-all duration-300 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={isHome ? href : `/${href}`}
                onClick={closeMobileMenu}
                aria-current={isHome && active === href.slice(1) ? "location" : undefined}
                className="px-4 py-3 rounded-lg text-base text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="divider my-2" />
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={closeMobileMenu}
              aria-current={isHome && active === "contact" ? "location" : undefined}
              className="px-4 py-3 rounded-lg bg-foreground text-background text-base font-medium text-center"
            >
              Let's talk
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
