import { useState } from "react"
import type { ProjectMedia } from "../types/project"

export default function MediaFrame({ media }: { media: ProjectMedia }) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const available = media.status === "approved" && media.src && media.src !== failedSource

  return (
    <figure className="w-full overflow-hidden rounded-xl border border-white/10 bg-card">
      <div className="relative" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
        {available ? (
          media.kind === "video" ? (
            <video src={media.src!} controls preload="none" aria-label={media.alt || media.label} className="h-full w-full object-contain" onError={() => setFailedSource(media.src)} />
          ) : (
            <img src={media.src!} width={media.width} height={media.height} alt={media.decorative ? "" : media.alt} loading="lazy" className="h-full w-full object-cover" onError={() => setFailedSource(media.src)} />
          )
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="text-xs font-mono text-foreground/70">{media.label}</span>
            <span className="text-xs text-foreground/60">{failedSource ? "Media unavailable" : "Placeholder · awaiting approved media"}</span>
          </div>
        )}
      </div>
      {available && media.caption && <figcaption className="p-4 text-sm text-foreground/70">{media.caption}</figcaption>}
    </figure>
  )
}
