import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-terminal-green text-terminal-dark hover:bg-terminal-green-bright hover:shadow-glow-bright border border-terminal-green",
        destructive:
          "bg-red-600 text-white hover:bg-red-500 border border-red-500",
        outline:
          "border border-terminal-green bg-transparent text-terminal-green hover:bg-terminal-green/10 hover:shadow-glow",
        secondary:
          "bg-terminal-dark-light text-terminal-green border border-terminal-green/50 hover:border-terminal-green hover:shadow-glow",
        ghost:
          "text-terminal-green hover:bg-terminal-green/10 hover:text-terminal-green-bright",
        link:
          "text-terminal-green underline-offset-4 hover:underline hover:text-terminal-green-bright",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
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
