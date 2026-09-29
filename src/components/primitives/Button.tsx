import type { ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "button-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "button-primary",
        secondary: "button-secondary",
        glass: "button-glass",
        textArrow: "button-text-arrow",
        project: "button-project",
        document: "button-document",
        contact: "button-contact",
        icon: "button-icon",
      },
      size: {
        small: "button-size-small",
        default: "button-size-default",
        large: "button-size-large",
        icon: "button-size-icon",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return <button className={buttonVariants({ className, size, variant })} {...props} />
}
