"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  if (!mounted) {
    return <div className="w-12 h-7 sm:w-14 sm:h-8 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-7 sm:w-14 sm:h-8 bg-gray-200 dark:bg-slate-700 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 shadow-md touch-manipulation"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div
        className={`
          w-5 h-5 sm:w-6 sm:h-6 bg-white dark:bg-slate-900 rounded-full shadow-sm transform transition-transform duration-200 flex items-center justify-center
          ${isDark ? "translate-x-5 sm:translate-x-6" : "translate-x-0"}
        `}
      >
        {isDark ? <span className="text-xs">🌙</span> : <span className="text-xs">☀️</span>}
      </div>
    </button>
  )
}
