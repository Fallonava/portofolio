"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Magnetic } from "@/components/ui/Magnetic"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10 border-[3px] border-border rounded-xl" />
  }

  return (
    <div className="w-10 h-10">
      <Magnetic intensity={0.3}>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative flex items-center justify-center w-full h-full bg-white brutal-border brutal-shadow-sm brutal-hover overflow-hidden rounded-xl group"
          aria-label="Toggle theme"
        >
          {/* Sun icon for light mode (visible when dark) */}
          <Sun className="h-[1.2rem] w-[1.2rem] text-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* Moon icon for dark mode (visible when light) */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] text-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </button>
      </Magnetic>
    </div>
  )
}
