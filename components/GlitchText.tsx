"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        const glitched = text
          .split("")
          .map((char) => (Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
          .join("")

        setGlitchText(glitched)

        setTimeout(() => setGlitchText(text), 100)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [text])

  return (
    <span className={`relative inline-block ${className}`} data-text={text}>
      <span className="relative z-10">{glitchText}</span>
      <span
        className="absolute top-0 left-0 text-red-500 opacity-70 animate-pulse"
        style={{
          transform: "translate(-1px, -1px)",
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
        }}
      >
        {glitchText}
      </span>
      <span
        className="absolute top-0 left-0 text-blue-500 opacity-70 animate-pulse"
        style={{
          transform: "translate(1px, 1px)",
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
        }}
      >
        {glitchText}
      </span>
    </span>
  )
}
