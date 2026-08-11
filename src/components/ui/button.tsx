import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Super Frontend 3D Buttons — Triada Beta 4 dual system
// .btn-primary = black ink · .btn-glass = slate glass · .btn-ghost = quiet
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "btn-primary",
        glass: "btn-glass",
        ghost: "btn-ghost",
        outline: "btn-ghost",
        secondary: "btn-glass",
        subtle: "btn-ghost",
        link: "underline-offset-4 hover:underline text-[var(--text-secondary)]",
        gradient: "btn-primary",
        destructive: "btn-primary",
      },
      size: {
        default: "",
        sm: "btn-sm",
        lg: "",
        icon: "btn-sm !p-0 aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
