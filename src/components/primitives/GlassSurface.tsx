import type { HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

const glassSurfaceVariants = cva("glass-surface", {
  variants: {
    variant: {
      subtle: "glass-surface--subtle",
      standard: "glass-surface--standard",
      strong: "glass-surface--strong",
      light: "glass-surface--light",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
})

export type GlassSurfaceProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof glassSurfaceVariants>

export function GlassSurface({ className, variant, ...props }: GlassSurfaceProps) {
  return <div className={glassSurfaceVariants({ className, variant })} {...props} />
}
