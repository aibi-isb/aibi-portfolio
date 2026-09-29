import Link from 'next/link';

const documents = [
  {
    title: 'Quick Résumé',
    description: 'A concise overview of role, skills, and featured work.',
    status: 'Not available yet',
  },
  {
    title: 'Full CV',
    description: 'Detailed education, projects, coursework, and achievements.',
    status: 'Not available yet',
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="section-shell">
        <Link href="/" className="button-ghost mb-8">
          ← Back to portfolio
        </Link>

        <p className="eyebrow">Documents</p>
        <h1 className="display-xl mb-4">Résumé &amp; CV</h1>
        <p className="max-w-2xl text-foreground/65 mb-10 leading-relaxed">
          The approved résumé and CV will be published here once the final documents are ready.
          Until then, this route keeps the document chooser structure in place and avoids broken
          links or placeholder assets in production.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {documents.map((doc) => (
            <article key={doc.title} className="glass-panel rounded-2xl p-6">
              <div className="mb-4 inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-foreground/70">
                PDF
              </div>
              <h2 className="text-2xl mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                {doc.title}
              </h2>
              <p className="text-foreground/60 leading-relaxed mb-4">{doc.description}</p>
              <p className="text-sm text-foreground/45 font-mono">{doc.status}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
