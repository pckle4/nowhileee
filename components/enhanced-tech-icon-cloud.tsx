"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776AB" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "MongoDB", color: "#47A248" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ED" },
  { name: "AWS", color: "#FF9900" },
  { name: "Git", color: "#F05032" },
  { name: "Figma", color: "#F24E1E" },
  { name: "VS Code", color: "#007ACC" },
  { name: "GraphQL", color: "#E10098" },
  { name: "Redis", color: "#DC382D" },
]

interface TechIcon {
  id: number
  name: string
  color: string
  x: number
  y: number
  z: number
  rotationX: number
  rotationY: number
  scale: number
}

export default function EnhancedTechIconCloud() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [icons, setIcons] = useState<TechIcon[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const animationRef = useRef<number>()
  const rotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize icons in 3D sphere
    const radius = 150
    const newIcons: TechIcon[] = technologies.map((tech, index) => {
      const phi = Math.acos(-1 + (2 * index) / technologies.length)
      const theta = Math.sqrt(technologies.length * Math.PI) * phi

      return {
        id: index,
        name: tech.name,
        color: tech.color,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        rotationX: 0,
        rotationY: 0,
        scale: 1,
      }
    })

    setIcons(newIcons)
  }, [])

  useEffect(() => {
    const animate = () => {
      if (!isHovered) {
        // Continuous rotation when not hovered
        rotationRef.current.y += 0.005
      }

      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          // Apply rotation
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)
          const cosX = Math.cos(rotationRef.current.x)
          const sinX = Math.sin(rotationRef.current.x)

          // Rotate around Y axis
          const x1 = icon.x * cosY - icon.z * sinY
          const z1 = icon.x * sinY + icon.z * cosY

          // Rotate around X axis
          const y2 = icon.y * cosX - z1 * sinX
          const z2 = icon.y * sinX + z1 * cosX

          // Calculate scale based on z position (perspective)
          const scale = (300 + z2) / 300

          return {
            ...icon,
            rotationX: x1,
            rotationY: y2,
            scale: Math.max(0.4, Math.min(1.2, scale)),
          }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = (e.clientX - centerX) / rect.width
    const mouseY = (e.clientY - centerY) / rect.height

    setMousePosition({ x: mouseX, y: mouseY })

    // Update rotation based on mouse position
    rotationRef.current.x = mouseY * 0.5
    rotationRef.current.y += mouseX * 0.01
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Smoothly return to center
    rotationRef.current.x *= 0.95
  }

  return (
    <div
      ref={containerRef}
      className="relative w-80 h-80 mx-auto cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm"></div>

      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute w-12 h-12 flex items-center justify-center rounded-lg backdrop-blur-sm border border-white/20 shadow-lg"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate3d(${icon.rotationX}px, ${icon.rotationY}px, 0) scale(${icon.scale})`,
            zIndex: Math.round(icon.scale * 100),
            opacity: icon.scale,
            background: `linear-gradient(135deg, ${icon.color}20, ${icon.color}10)`,
          }}
          whileHover={{
            scale: icon.scale * 1.2,
            rotateY: 180,
            transition: { type: "spring", stiffness: 300, damping: 25 },
          }}
        >
          <span className="text-xs font-bold" style={{ color: icon.color }}>
            {icon.name.slice(0, 2)}
          </span>
        </motion.div>
      ))}

      {/* Center glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
