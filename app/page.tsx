"use client"

import { useState, useEffect } from "react"
import TerminalPortfolio from "@/components/terminal-portfolio"
import Preloader from "@/components/preloader"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="min-h-screen bg-black">
      <TerminalPortfolio />
    </div>
  )
}
