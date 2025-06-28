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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return "bg-neon-cyan"
      case "backend":
        return "bg-terminal-green"
      case "database":
        return "bg-neon-purple"
      case "devops":
        return "bg-neon-pink"
      default:
        return "bg-terminal-green"
    }
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-terminal-green font-mono text-sm">{skill}</span>
        <span className="text-gray-400 font-mono text-xs">{level}%</span>
      </div>
      <div className="w-full bg-terminal-gray border border-terminal-green/30 rounded-full h-2">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getCategoryColor(category)}`}
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </div>
  )
}
