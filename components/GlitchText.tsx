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

  return <span className={`${className} transition-all duration-100`}>{glitchText}</span>
}
