import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "neuro bg-primary text-primary-foreground hover:shadow-gold-glow transform hover:scale-105",
        destructive: "neuro bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "neuro-inset border border-border bg-transparent text-foreground hover:shadow-neuro-hover",
        secondary: "neuro bg-secondary text-secondary-foreground hover:shadow-neuro-hover",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-luxury",
        link: "text-primary underline-offset-4 hover:underline",
        luxury: "luxury-gradient text-primary-foreground hover:shadow-gold-glow-intense transform hover:scale-105 transition-luxury gold-glow",
        "luxury-outline": "neuro-inset border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-gold-glow transition-luxury",
        neuro: "neuro hover:shadow-neuro-hover text-foreground transition-luxury",
        "neuro-pressed": "neuro-pressed text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
