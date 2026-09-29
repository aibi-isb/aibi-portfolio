import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-xl mb-4">Page not found.</h1>
        <p className="text-foreground/65 mb-8 leading-relaxed">
          This page does not exist or has moved. Head back to the portfolio homepage.
        </p>
        <Link href="/" className="button-primary">
          Return home
        </Link>
      </div>
    </main>
  );
}
