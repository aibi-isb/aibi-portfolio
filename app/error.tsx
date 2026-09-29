'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="eyebrow">Error</p>
        <h1 className="display-xl mb-4">Something went wrong.</h1>
        <p className="text-foreground/65 mb-8 leading-relaxed">
          The IB Studio portfolio hit an unexpected issue while loading. Please try again.
        </p>
        <button onClick={() => reset()} className="button-primary">
          Try again
        </button>
      </div>
    </main>
  );
}
