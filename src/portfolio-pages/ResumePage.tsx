import { documents } from "../content/documents"
import { emailContact } from "../content/contact"
import { useState } from "react"
import { Link } from "react-router"
import Nav from "../components/Nav"



function DocumentCard({
  doc,
  selected,
  onSelect,
}: {
  doc: (typeof documents)[0]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl p-6 border transition-all duration-200 ${
        selected
          ? "border-white/20 bg-white/5"
          : "border-white/6 hover:border-white/12 hover:bg-white/[0.02]"
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono"
          style={{ background: `${doc.accent}15`, color: doc.accent, border: `1px solid ${doc.accent}20` }}
        >
          PDF
        </div>
        {selected && (
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
            style={{ background: doc.accent, color: "#08080a" }}
          >
            ✓
          </div>
        )}
      </div>

      <h3
        className="text-base font-medium mb-2"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {doc.title}
      </h3>
      <p className="text-sm text-foreground/55 leading-relaxed mb-4">{doc.description}</p>

      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded text-xs font-mono border border-white/8 text-foreground/40">
          {doc.format}
        </span>
        <span className="text-xs text-foreground/30 font-mono">{doc.note}</span>
      </div>
    </button>
  )
}

export default function ResumePage() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedDoc = documents.find((d) => d.id === selected)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-foreground/35 hover:text-foreground/60 transition-colors mb-12"
        >
          ← Back to portfolio
        </Link>

        <span className="label-mono block mb-4">Documents</span>

        <h1
          className="display-xl mb-4"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Résumé &amp; CV
        </h1>

        <p className="text-foreground/60 leading-relaxed mb-10">
          Choose the document that fits your needs. The quick résumé gives a concise professional
          overview. The full CV includes detailed project notes, coursework, and process context.
        </p>

        {/* Document chooser */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              selected={selected === doc.id}
              onSelect={() => setSelected(selected === doc.id ? null : doc.id)}
            />
          ))}
        </div>

        {/* Action */}
        {selectedDoc ? (
          <div className="flex flex-col gap-3">
            {selectedDoc.status === "approved" && selectedDoc.href ? (
              <a
                href={selectedDoc.href}
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                Download {selectedDoc.title}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M7 3v6M4 7l3 3 3-3M3 11h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-sm text-foreground/50">
                  <span className="font-medium text-foreground/70">{selectedDoc.title}</span> is not
                  yet available for download. Check back soon, or{" "}
                  <a
                    href={emailContact.href ?? undefined}
                    className="text-accent hover:underline"
                  >
                    email to request it directly
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-foreground/35 font-mono">
            Select a document above to continue.
          </p>
        )}

        {/* Contact bridge */}
        <div className="mt-16 pt-8 border-t border-white/6">
          <p className="text-sm text-foreground/40">
            Want to discuss a role or project directly?{" "}
            <a
              href={emailContact.href ?? undefined}
              className="text-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
            >
              Get in touch
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
