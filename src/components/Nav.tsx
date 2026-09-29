import { navLinks } from "../content/navigation"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"



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
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)

      if (!isHome) return
      const sections = [...navLinks.map((link) => link.href.slice(1)), "contact"]
      let current = ""
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) current = id
        }
      }
      setActive(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return
    e.preventDefault()
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? "top-3" : "top-4"
        }`}
        style={{ width: "min(900px, calc(100vw - 2rem))" }}
        aria-label="Primary navigation"
      >
        <div
          className={`glass rounded-xl px-4 py-3 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-2.5" : "py-3"
          }`}
        >
          {/* Left: Logo + brand */}
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

          {/* Centre: nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const sectionId = href.slice(1)
              const isActive = active === sectionId
              return (
                <a
                  key={label}
                  href={isHome ? href : `/${href}`}
                  onClick={(e) => isHome && scrollTo(e, href)}
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

          {/* Right: CTA */}
          <div className="flex items-center gap-2">
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={(e) => isHome && scrollTo(e, "#contact")}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Let's talk
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="block w-5 h-3.5 relative">
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
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 glass rounded-xl p-5 transition-all duration-300 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={isHome ? href : `/${href}`}
                onClick={(e) => isHome && scrollTo(e, href)}
                className="px-4 py-3 rounded-lg text-base text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="divider my-2" />
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={(e) => isHome && scrollTo(e, "#contact")}
              className="px-4 py-3 rounded-lg bg-foreground text-background text-base font-medium text-center"
            >
              Let's talk
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
