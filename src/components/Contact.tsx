import { visibleContactLinks as contactLinks, emailContact } from "../content/contact"
import { navLinks } from "../content/navigation"
import { useInView } from "../hooks/useInView"
import { buttonVariants } from "./primitives/Button"
import DocumentChooser from "./DocumentChooser"



export default function Contact() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="contact" className="py-28 lg:py-36 relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 18% 76%, rgba(67, 76, 78, 0.22), transparent 44%), radial-gradient(ellipse at 82% 42%, rgba(45, 65, 70, 0.18), transparent 48%), linear-gradient(180deg, transparent, rgba(19, 23, 25, 0.4))',
          }}
          aria-hidden="true"
        />
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Headline */}
        <div className={`reveal ${inView ? "visible" : ""} mb-4`}>
          <span className="label-mono">Get in touch</span>
        </div>

        <h2
          className={`reveal reveal-delay-1 ${inView ? "visible" : ""} display-2xl mb-6 max-w-3xl`}
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Have a role, project, or idea where design and development meet?
        </h2>

        <p
          className={`reveal reveal-delay-2 ${inView ? "visible" : ""} text-foreground/60 text-lg max-w-xl leading-relaxed mb-12`}
        >
          I am open to junior opportunities, internships, collaborative projects, and
          freelance work involving UI and UX design, frontend development, product
          design, or web implementation.
        </p>

        {/* Contact grid */}
        <div
          className={`reveal reveal-delay-3 ${inView ? "visible" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12`}
        >
          {contactLinks.map((link) => (
            <div key={link.label} className="glass rounded-xl p-4">
              <p className="label-mono mb-1.5">{link.label}</p>
              {link.href ? (
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors break-all"
                >
                  {link.value}
                  {link.external && (
                    <span className="ml-1 text-foreground/25" aria-hidden>
                      ↗
                    </span>
                  )}
                </a>
              ) : (
                <p className="text-sm text-foreground/60">{link.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div
          className={`reveal reveal-delay-4 ${inView ? "visible" : ""} flex flex-wrap gap-4 items-center`}
        >
          <a
            href={emailContact.href ?? undefined}
            className={buttonVariants({ variant: "contact", size: "large" })}
          >
            Let's talk
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <DocumentChooser variant="glass" size="large" />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 pt-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-medium text-foreground/60"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              IB Studio
            </span>
            <span className="text-foreground/20 text-xs">·</span>
            <span className="text-xs text-foreground/30">Ibrahim Bangura</span>
          </div>

          <nav className="flex gap-5" aria-label="Footer navigation">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-foreground/35 hover:text-foreground/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-foreground/25">
            Design &amp; development by Ibrahim Bangura
          </p>
        </div>
      </footer>
    </section>
  )
}
