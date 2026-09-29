export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-4" aria-live="polite" aria-busy="true">
        <div className="eyebrow">IB Studio</div>
        <div className="h-12 w-2/3 rounded-xl bg-white/8 animate-pulse" />
        <div className="h-4 w-full rounded-md bg-white/6 animate-pulse" />
        <div className="h-4 w-5/6 rounded-md bg-white/5 animate-pulse" />
        <div className="h-12 w-40 rounded-xl bg-white/8 animate-pulse" />
      </div>
    </div>
  );
}
