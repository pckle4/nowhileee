"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function SystemIndicator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 1, ease: "power2.out" },
      )

      // Activate system after delay
      setTimeout(() => {
        setIsActive(true)
      }, 2000)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-2 bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 rounded-full px-3 py-2 opacity-0"
    >
      {/* Status Indicator */}
      <div
        className={`w-2 h-2 rounded-full transition-all duration-500 ${
          isActive ? "bg-blue-400 shadow-lg shadow-blue-400/50 animate-pulse" : "bg-slate-500"
        }`}
      ></div>

      {/* Status Text */}
      <span
        className={`text-xs font-mono transition-colors duration-500 ${isActive ? "text-blue-300" : "text-slate-400"}`}
      >
        {isActive ? "SYSTEM ACTIVE" : "INITIALIZING"}
      </span>
    </div>
  )
}
