"use client"
import React from"react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "../utils/cn"
import { Button } from "../components/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="inline-flex items-center rounded-lg border bg-background p-1 dark:bg-muted">
      <Button
        variant="ghost"
        size="icon"
        className={cn("size-8 rounded-md", theme === "system" && "bg-primary text-primary-foreground")}
        onClick={() => setTheme("system")}
      >
        <Monitor className="size-4" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn("size-8 rounded-md", theme === "light" && "bg-primary text-primary-foreground")}
        onClick={() => setTheme("light")}
      >
        <Sun className="size-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn("size-8 rounded-md", theme === "dark" && "bg-primary text-primary-foreground")}
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
    </div>
  )
}

