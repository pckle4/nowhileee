"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface IconData {
  name: string
  icon: string
  color: string
  x: number
  y: number
  z: number
  rotationX: number
  rotationY: number
  rotationZ: number
}

const techIcons = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Next.js", icon: "▲", color: "#000000" },
  { name: "TypeScript", icon: "TS", color: "#3178C6" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Redis", icon: "📦", color: "#DC382D" },
  { name: "GraphQL", icon: "◆", color: "#E10098" },
  { name: "Tailwind", icon: "🎨", color: "#06B6D4" },
  { name: "Figma", icon: "🎯", color: "#F24E1E" },
  { name: "Git", icon: "📝", color: "#F05032" },
  { name: "VS Code", icon: "💻", color: "#007ACC" },
]

export default function EnhancedTechIconCloud() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [icons, setIcons] = useState<IconData[]>([])
  const [isRotating, setIsRotating] = useState(true)
  const animationRef = useRef<number>()
  const rotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize icons in 3D space
    const radius = 150
    const initialIcons = techIcons.map((tech, index) => {
      const phi = Math.acos(-1 + (2 * index) / techIcons.length)
      const theta = Math.sqrt(techIcons.length * Math.PI) * phi

      return {
        ...tech,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
      }
    })

    setIcons(initialIcons)
  }, [])

  useEffect(() => {
    if (!isRotating) return

    const animate = () => {
      rotationRef.current.y += 0.005

      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)

          const newX = icon.x * cosY - icon.z * sinY
          const newZ = icon.x * sinY + icon.z * cosY

          return {
            ...icon,
            x: newX,
            z: newZ,
            rotationY: rotationRef.current.y,
          }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRotating])

  const handleMouseEnter = () => {
    setIsRotating(false)
  }

  const handleMouseLeave = () => {
    setIsRotating(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isRotating) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotationY = (mouseX / rect.width) * 2
    const rotationX = -(mouseY / rect.height) * 2

    setIcons((prevIcons) =>
      prevIcons.map((icon) => {
        // Apply mouse-based rotation
        const cosY = Math.cos(rotationY)
        const sinY = Math.sin(rotationY)
        const cosX = Math.cos(rotationX)
        const sinX = Math.sin(rotationX)

        // Rotate around Y axis
        const newX = icon.x * cosY - icon.z * sinY
        let newZ = icon.x * sinY + icon.z * cosY

        // Rotate around X axis
        const newY = icon.y * cosX - newZ * sinX
        newZ = icon.y * sinX + newZ * cosX

        return {
          ...icon,
          x: newX,
          y: newY,
          z: newZ,
        }
      }),
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-80 h-80 mx-auto cursor-grab active:cursor-grabbing"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {icons.map((icon, index) => {
          const scale = (icon.z + 200) / 400 // Perspective scaling
          const opacity = (icon.z + 200) / 400 // Depth-based opacity
          const zIndex = Math.round(icon.z + 200)

          return (
            <motion.div
              key={`${icon.name}-${index}`}
              className="absolute flex items-center justify-center"
              style={{
                transform: `translate3d(${icon.x}px, ${icon.y}px, 0px) scale(${scale})`,
                opacity: Math.max(0.3, opacity),
                zIndex,
              }}
              whileHover={{
                scale: scale * 1.2,
                transition: { duration: 0.2 },
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: Math.max(0.3, opacity), scale }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: `${icon.color}20`,
                  color: icon.color,
                  boxShadow: `0 4px 20px ${icon.color}40`,
                }}
              >
                {icon.icon}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Center glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-50 animate-pulse" />
      </div>
    </div>
  )
}
