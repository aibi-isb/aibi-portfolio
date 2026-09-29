import Link from 'next/link';

export default function CvPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="section-shell">
        <Link href="/" className="button-ghost mb-8">
          ← Back to portfolio
        </Link>

        <p className="eyebrow">Documents</p>
        <h1 className="display-xl mb-4">Full CV</h1>
        <p className="max-w-2xl text-foreground/65 mb-8 leading-relaxed">
          The full CV is not yet published. This route is kept in place to support the final approved
          document once the file is ready.
        </p>

        <div className="glass-panel rounded-2xl p-6 max-w-xl">
          <p className="text-sm text-foreground/60 leading-relaxed">
            This route is intentionally protected from publishing placeholders. It will be replaced with
            the final PDF once the document is approved and publicly available.
          </p>
        </div>
      </div>
    </main>
  );
}
