"use client"

import { useEffect, useState } from "react"

interface SkillBarProps {
  skill: string
  level: number
  category: string
}

export default function SkillBar({ skill, level, category }: SkillBarProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level)
    }, 500)

    return () => clearTimeout(timer)
  }, [level])

  const getCategoryColor = () => {
    switch (category) {
      case "frontend":
        return "bg-neon-cyan"
      case "backend":
        return "bg-terminal-green"
      case "database":
        return "bg-neon-purple"
      case "devops":
        return "bg-neon-orange"
      default:
        return "bg-terminal-green"
    }
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-terminal-green text-sm">{skill}</span>
        <span className="font-mono text-gray-400 text-xs">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${getCategoryColor()}`}
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </div>
  )
}
