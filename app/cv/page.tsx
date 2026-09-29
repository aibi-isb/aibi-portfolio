import Link from 'next/link';
import { createPageMetadata } from '../../src/lib/metadata';
import { buttonVariants } from '../../src/components/primitives/Button';
import { GlassSurface } from '../../src/components/primitives/GlassSurface';

export const metadata = createPageMetadata(
  'Full CV',
  'View the detailed CV for Ibrahim Bangura, including education, projects, coursework, and achievements.',
  true,
);

export default function CvPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="section-shell">
        <Link href="/" className={buttonVariants({ variant: 'textArrow', size: 'small', className: 'mb-8' })}>
          ← Back to portfolio
        </Link>

        <p className="eyebrow">Documents</p>
        <h1 className="display-xl mb-4">Full CV</h1>
        <p className="max-w-2xl text-foreground/65 mb-8 leading-relaxed">
          The full CV is not yet published. This route is kept in place to support the final approved
          document once the file is ready.
        </p>

        <GlassSurface variant="standard" className="p-6 max-w-xl">
          <p className="text-sm text-foreground/60 leading-relaxed">
            This route is intentionally protected from publishing placeholders. It will be replaced with
            the final PDF once the document is approved and publicly available.
          </p>
        </GlassSurface>
      </div>
    </main>
  );
}
