import Link from 'next/link';
import { notFound } from 'next/navigation';

const validSlugs = [
  'house-rental',
  'salone-fresh',
  'yummy-provision',
  'dash-delivery',
];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="section-shell">
        <Link href="/" className="button-ghost mb-8">
          ← Back to portfolio
        </Link>

        <p className="eyebrow">Case study</p>
        <h1 className="display-xl mb-4">{slug.replace(/-/g, ' ')}</h1>
        <p className="max-w-2xl text-foreground/65 leading-relaxed">
          This project page is part of the portfolio foundation and will be populated with the dedicated
          case-study template once approved content is ready.
        </p>
      </div>
    </main>
  );
}
