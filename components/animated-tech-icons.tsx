"use client"

import { useEffect, useRef } from "react"
import { Code, Database, Globe, Zap, Cpu, HardDrive, Wifi, Monitor } from "lucide-react"

export default function AnimatedTechIcons() {
  const iconsRef = useRef<HTMLDivElement[]>([])

  const techIcons = [
    { Icon: Code, color: "text-violet-500", delay: 0 },
    { Icon: Database, color: "text-emerald-500", delay: 200 },
    { Icon: Globe, color: "text-cyan-500", delay: 400 },
    { Icon: Zap, color: "text-yellow-500", delay: 600 },
    { Icon: Cpu, color: "text-red-500", delay: 800 },
    { Icon: HardDrive, color: "text-blue-500", delay: 1000 },
    { Icon: Wifi, color: "text-purple-500", delay: 1200 },
    { Icon: Monitor, color: "text-orange-500", delay: 1400 },
  ]

  useEffect(() => {
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        setTimeout(() => {
          icon.classList.add("animate-float-in")
        }, techIcons[index].delay)
      }
    })
  }, [])

  return (
    <div className="hero-tech-icons">
      {techIcons.map(({ Icon, color, delay }, index) => (
        <div
          key={index}
          ref={(el) => el && (iconsRef.current[index] = el)}
          className={`hero-tech-icon ${color}`}
          style={{
            left: `${10 + (index % 4) * 20}%`,
            top: `${20 + Math.floor(index / 4) * 30}%`,
            animationDelay: `${delay}ms`,
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
      ))}
    </div>
  )
}
