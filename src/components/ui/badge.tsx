import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Apple badges — no capsules (≤10px radius), no gradients.
// Frosted for metadata. AA text on dark.
const badgeVariants = cva(
  "inline-flex items-center rounded-[8px] border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-background",
        secondary: "border-[var(--hairline)] bg-white/[0.06] text-[var(--text-secondary)] backdrop-blur",
        outline: "border-[var(--hairline)] text-[var(--text-secondary)]",
        muted: "border-transparent bg-white/[0.04] text-[var(--text-tertiary)]",
        success: "border-transparent bg-emerald-500/12 text-emerald-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
