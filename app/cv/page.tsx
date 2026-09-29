import Link from 'next/link';
import { createPageMetadata } from '../../src/lib/metadata';
import { buttonVariants } from '../../src/components/primitives/Button';
import { GlassSurface } from '../../src/components/primitives/GlassSurface';
import { documents } from '../../src/content/documents';

export const metadata = createPageMetadata(
  'Full CV',
  'View the detailed CV for Ibrahim Bangura, including education, projects, coursework, and achievements.',
  true,
);

export default function CvPage() {
  const document = documents.find((item) => item.id === 'cv')!;
  const published = document.status === 'approved' && Boolean(document.href);

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="section-shell">
        <Link href="/" className={buttonVariants({ variant: 'textArrow', size: 'small', className: 'mb-8' })}>
          ← Back to portfolio
        </Link>

        <p className="eyebrow">Documents</p>
        <h1 className="display-xl mb-4">{document.title}</h1>
        <p className="max-w-2xl text-foreground/65 mb-8 leading-relaxed">
          {document.description}
        </p>

        <GlassSurface variant="standard" className="p-6 max-w-xl">
          <p className="eyebrow">{document.format} · {document.note}</p>
          {published ? (
            <a href={document.href!} download className={buttonVariants({ variant: 'document' })}>
              Download {document.title}
            </a>
          ) : (
            <p className="text-sm text-foreground/60 leading-relaxed" role="status">
              This document is not available yet. No placeholder file is linked.
            </p>
          )}
        </GlassSurface>
      </div>
    </main>
  );
}
