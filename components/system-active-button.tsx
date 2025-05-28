"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function SystemActiveButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade in
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 3, ease: "power2.out" },
      )

      // Activate after delay
      setTimeout(() => {
        setIsActive(true)
      }, 3500)

      // Pulse animation
      gsap.to(pulseRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        repeat: -1,
      })
    }, buttonRef)

    return () => ctx.revert()
  }, [])

  const handleClick = () => {
    // Add click animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`
        relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 opacity-0 touch-manipulation
        ${
          isActive
            ? "bg-blue-500/10 border-blue-400/50 text-blue-400 dark:text-blue-300"
            : "bg-slate-500/10 border-slate-400/50 text-slate-500"
        }
        hover:scale-105 active:scale-95
      `}
    >
      {/* Pulse Effect */}
      <div
        ref={pulseRef}
        className={`absolute inset-0 rounded-full ${
          isActive ? "bg-blue-400/20" : "bg-slate-400/20"
        } pointer-events-none`}
      ></div>

      {/* Status Indicator */}
      <div className="relative">
        <div
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${
            isActive ? "bg-blue-400 shadow-lg shadow-blue-400/50" : "bg-slate-400"
          }`}
        ></div>
        {isActive && (
          <div className="absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        )}
      </div>

      {/* Status Text */}
      <span className="text-xs font-mono font-medium relative z-10">{isActive ? "SYSTEM ACTIVE" : "INITIALIZING"}</span>

      {/* Tech Lines */}
      <div className="flex flex-col gap-0.5 relative z-10">
        <div
          className={`w-2 sm:w-3 h-0.5 ${isActive ? "bg-blue-400" : "bg-slate-400"} transition-colors duration-500`}
        ></div>
        <div
          className={`w-1.5 sm:w-2 h-0.5 ${isActive ? "bg-blue-400" : "bg-slate-400"} transition-colors duration-500`}
        ></div>
        <div
          className={`w-2 sm:w-3 h-0.5 ${isActive ? "bg-blue-400" : "bg-slate-400"} transition-colors duration-500`}
        ></div>
      </div>
    </button>
  )
}
