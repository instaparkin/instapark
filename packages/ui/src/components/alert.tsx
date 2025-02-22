import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils/cn"

const alertVariants = cva(
  "relative space-y-6 w-full border-t border-b py-6 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
          "Not applied": "bg-blue-100 text-blue-800 border rounded-md p-6 dark:bg-blue-900 dark:text-blue-100",
          "Waiting For Approval": "bg-yellow-100 text-yellow-800 border rounded-md p-6 dark:bg-yellow-900 dark:text-yellow-100",
          "Approved": "bg-lime-100 text-lime-800 border rounded-md p-6 dark:bg-lime-900 dark:text-lime-100",
          "Rejected": "bg-red-100 text-red-800 border rounded-md p-6 dark:bg-destructive dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(" font-bold text-md sm:text-xl", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-md [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
