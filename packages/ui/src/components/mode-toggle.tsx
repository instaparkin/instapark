import React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "../components/button"
import { cn } from "../utils/cn"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="relative inline-grid h-9 grid-cols-[1fr_1fr_1fr] items-center text-sm font-medium">
      <Toggle className={cn("size-4 w-full h-hull p-1.5", theme === "system" && "border")} onClick={() => setTheme("system")}>
        <Monitor className="size-4" />
        <span className="sr-only">System theme</span>
      </Toggle>
      <Toggle className={cn("size-4 w-full h-hull p-1.5", theme === "light" && "border")} onClick={() => setTheme("light")}>
        <Sun className="size-4" />
        <span className="sr-only">Light theme</span>
      </Toggle>
      <Toggle className={cn("size-4 w-full h-hull p-1.5", theme === "dark" && "border")} onClick={() => setTheme("dark")}>
        <Moon className="size-4" />
        <span className="sr-only">Dark theme</span>
      </Toggle>
    </div>
  )
}

function Toggle({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button variant="ghost" size="icon" className={cn(className)} {...props} />
}

