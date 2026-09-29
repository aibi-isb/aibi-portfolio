import Link from 'next/link';
import { createPageMetadata } from '../../src/lib/metadata';
import { buttonVariants } from '../../src/components/primitives/Button';
import { GlassSurface } from '../../src/components/primitives/GlassSurface';
import { documents } from '../../src/content/documents';

export const metadata = createPageMetadata(
  'Résumé and CV',
  'View the professional résumé and full CV for Ibrahim Bangura.',
  true,
);

function formatSize(sizeBytes?: number) {
  if (!sizeBytes) return null;
  if (sizeBytes < 1024 * 1024) return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`;
  return `${(sizeBytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="section-shell">
        <Link href="/" className={buttonVariants({ variant: 'textArrow', size: 'small', className: 'mb-8' })}>
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
          {documents.map((doc) => {
            const published = doc.status === 'approved' && Boolean(doc.href);
            const size = formatSize(doc.sizeBytes);

            return (
              <article key={doc.id}>
                <GlassSurface variant="standard" className="p-6">
                <div className="mb-4 inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-foreground/70">
                  {doc.format}
                </div>
                <h2 className="text-2xl mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                  {doc.title}
                </h2>
                <p className="text-foreground/60 leading-relaxed mb-4">{doc.description}</p>
                <div className="mb-5 flex flex-wrap gap-2 text-xs font-mono text-foreground/45">
                  <span>{doc.note}</span>
                  {size && <span>{size}</span>}
                  <span>{published ? 'Available' : 'Not published'}</span>
                </div>
                {published ? (
                  <a href={doc.href!} download className={buttonVariants({ variant: 'document' })}>
                    Download {doc.title}
                  </a>
                ) : (
                  <p className="text-sm text-foreground/55" role="status">
                    This document is not available yet.
                  </p>
                )}
                </GlassSurface>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
