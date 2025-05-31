"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
  name: string
  color: string
}

interface TechIconCloudProps {
  radius?: number
  iconSize?: number
}

// Zero-lag physics for instant response
const PHYSICS = {
  friction: 0.98,
  dragSensitivity: 0.004,
  autoRotationSpeed: 0.0005,
}

export default function TechIconCloud({ radius = 125, iconSize = 36 }: TechIconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 350, height: 350 })

  // Instant response refs
  const rotationRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const iconImagesRef = useRef<Map<string, HTMLImageElement>>(new Map())
  const imagesLoadedRef = useRef<Set<string>>(new Set())
  const animationIdRef = useRef<number>()
  const isDraggingRef = useRef(false)

  // 25 tech icons
  const techStack = [
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Next.js", icon: "nextjs", color: "#000000" },
    { name: "Vue.js", icon: "vuejs", color: "#4FC08D" },
    { name: "Angular", icon: "angularjs", color: "#DD0031" },
    { name: "Svelte", icon: "svelte", color: "#FF3E00" },
    { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
    { name: "Node.js", icon: "nodejs", color: "#339933" },
    { name: "Express", icon: "express", color: "#000000" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "Docker", icon: "docker", color: "#2496ED" },
    { name: "Kubernetes", icon: "kubernetes", color: "#326CE5" },
    { name: "AWS", icon: "amazonwebservices", color: "#FF9900" },
    { name: "Firebase", icon: "firebase", color: "#FFCA28" },
    { name: "GitHub", icon: "github", color: "#181717" },
    { name: "MongoDB", icon: "mongodb", color: "#47A248" },
    { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    { name: "Redis", icon: "redis", color: "#DC382D" },
    { name: "GraphQL", icon: "graphql", color: "#E10098" },
    { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
    { name: "Figma", icon: "figma", color: "#F24E1E" },
    { name: "VS Code", icon: "vscode", color: "#007ACC" },
    { name: "Nginx", icon: "nginx", color: "#009639" },
    { name: "Linux", icon: "linux", color: "#FCC624" },
    { name: "Vercel", icon: "vercel", color: "#000000" },
  ]

  // Responsive canvas sizing with better mobile optimization
  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth < 640
      const isTablet = window.innerWidth < 1024

      let size = radius * 4 // Scale based on radius
      if (isMobile) {
        size = Math.min(radius * 3, window.innerWidth - 40)
      } else if (isTablet) {
        size = radius * 3.5
      }

      setCanvasSize({ width: size, height: size })
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [radius])

  // Load images with mobile optimization
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = techStack.map(async (tech) => {
        const img = new Image()
        img.crossOrigin = "anonymous"

        return new Promise<void>((resolve) => {
          img.onload = () => {
            iconImagesRef.current.set(tech.name, img)
            imagesLoadedRef.current.add(tech.name)
            resolve()
          }

          img.onerror = () => {
            const canvas = document.createElement("canvas")
            const size = iconSize * 2
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext("2d", { alpha: true })
            if (ctx) {
              ctx.imageSmoothingEnabled = true
              ctx.imageSmoothingQuality = "high"

              ctx.beginPath()
              ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2)
              ctx.fillStyle = tech.color
              ctx.fill()
              ctx.strokeStyle = "#ffffff"
              ctx.lineWidth = 3
              ctx.stroke()

              ctx.fillStyle = "#ffffff"
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.font = `bold ${size / 3}px Arial`
              ctx.fillText(tech.name.charAt(0), size / 2, size / 2)
            }

            const fallbackImg = new Image()
            fallbackImg.src = canvas.toDataURL()
            iconImagesRef.current.set(tech.name, fallbackImg)
            imagesLoadedRef.current.add(tech.name)
            resolve()
          }

          img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.icon}/${tech.icon}-original.svg`
        })
      })

      await Promise.all(imagePromises)
    }

    loadImages()
  }, [iconSize])

  // Generate sphere positions
  useEffect(() => {
    const newIcons: Icon[] = []
    const numIcons = techStack.length
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    techStack.forEach((tech, i) => {
      const y = i * offset - 1 + offset / 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = increment * i

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      newIcons.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        scale: 1,
        opacity: 1,
        id: i,
        name: tech.name,
        color: tech.color,
      })
    })

    setIconPositions(newIcons)
  }, [radius])

  // Mobile-optimized position calculation
  const getEventPosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }

    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0]
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  // Fast 3D calculations
  const getIconScreenPosition = useCallback((icon: Icon) => {
    if (!canvasRef.current) return { screenX: 0, screenY: 0, scale: 1, depth: 0 }

    const { x: rotX, y: rotY } = rotationRef.current
    const cosX = Math.cos(rotX)
    const sinX = Math.sin(rotX)
    const cosY = Math.cos(rotY)
    const sinY = Math.sin(rotY)

    const rotatedX = icon.x * cosY - icon.z * sinY
    const rotatedZ = icon.x * sinY + icon.z * cosY
    const rotatedY = icon.y * cosX + rotatedZ * sinX
    const finalZ = icon.y * sinX - rotatedZ * cosX

    const screenX = canvasRef.current.width / 2 + rotatedX
    const screenY = canvasRef.current.height / 2 + rotatedY
    const scale = Math.max(0.6, Math.min(1.4, (finalZ + 200) / 300))

    return { screenX, screenY, scale, depth: finalZ }
  }, [])

  // Mobile-optimized icon detection with larger touch areas
  const getIconAtPosition = useCallback(
    (x: number, y: number) => {
      const isMobile = window.innerWidth < 640
      const touchMultiplier = isMobile ? 1.5 : 1.3

      return iconPositions.find((icon) => {
        const { screenX, screenY, scale } = getIconScreenPosition(icon)
        const radius = (iconSize / 2) * scale * touchMultiplier
        const dx = x - screenX
        const dy = y - screenY
        return dx * dx + dy * dy < radius * radius
      })
    },
    [iconPositions, getIconScreenPosition, iconSize],
  )

  // Mobile-optimized drag handlers
  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      const pos = getEventPosition(e)

      const clickedIcon = getIconAtPosition(pos.x, pos.y)
      if (clickedIcon) {
        const targetX = -Math.atan2(
          clickedIcon.y,
          Math.sqrt(clickedIcon.x * clickedIcon.x + clickedIcon.z * clickedIcon.z),
        )
        const targetY = Math.atan2(clickedIcon.x, clickedIcon.z)

        gsap.to(rotationRef.current, {
          x: targetX,
          y: targetY,
          duration: 0.8,
          ease: "power2.out",
        })
        return
      }

      setIsDragging(true)
      isDraggingRef.current = true
      setLastPos(pos)
      velocityRef.current = { x: 0, y: 0 }
    },
    [getEventPosition, getIconAtPosition],
  )

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      const pos = getEventPosition(e)
      setMousePos(pos)

      if (!isDraggingRef.current) {
        const hoveredIcon = getIconAtPosition(pos.x, pos.y)
        setHoveredIcon(hoveredIcon?.name || null)
        return
      }

      // INSTANT rotation update
      const deltaX = pos.x - lastPos.x
      const deltaY = pos.y - lastPos.y

      const rotationDeltaY = deltaX * PHYSICS.dragSensitivity
      const rotationDeltaX = deltaY * PHYSICS.dragSensitivity

      rotationRef.current.y += rotationDeltaY
      rotationRef.current.x += rotationDeltaX

      velocityRef.current.x = rotationDeltaX * 0.2
      velocityRef.current.y = rotationDeltaY * 0.2

      setLastPos(pos)
    },
    [getEventPosition, getIconAtPosition, lastPos],
  )

  const handleEnd = useCallback(() => {
    setIsDragging(false)
    isDraggingRef.current = false
  }, [])

  // Ultra-smooth animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", {
      alpha: true,
      desynchronized: true,
      powerPreference: "high-performance",
    })
    if (!canvas || !ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    const animate = () => {
      if (!isDraggingRef.current) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const mouseInfluenceX = ((mousePos.y - centerY) / centerY) * PHYSICS.autoRotationSpeed
        const mouseInfluenceY = ((mousePos.x - centerX) / centerX) * PHYSICS.autoRotationSpeed

        rotationRef.current.x += velocityRef.current.x + mouseInfluenceX
        rotationRef.current.y += velocityRef.current.y + mouseInfluenceY

        velocityRef.current.x *= PHYSICS.friction
        velocityRef.current.y *= PHYSICS.friction
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const sortedIcons = iconPositions
        .map((icon) => ({
          icon,
          ...getIconScreenPosition(icon),
        }))
        .sort((a, b) => a.depth - b.depth)

      // Mobile-optimized rendering
      const isMobile = window.innerWidth < 640
      const scaleFactor = isMobile ? 0.9 : 1

      sortedIcons.forEach(({ icon, screenX, screenY, scale, depth }) => {
        const opacity = Math.max(0.4, Math.min(1, (depth + 150) / 250))
        const img = iconImagesRef.current.get(icon.name)
        const isLoaded = imagesLoadedRef.current.has(icon.name)
        const isHovered = hoveredIcon === icon.name

        ctx.save()
        ctx.translate(screenX, screenY)

        const finalScale = scale * scaleFactor * (isHovered ? 1.25 : 1)
        ctx.scale(finalScale, finalScale)
        ctx.globalAlpha = opacity * (isHovered ? 1 : 0.94)

        if (img && isLoaded) {
          if (isHovered) {
            ctx.shadowColor = "#06b6d4"
            ctx.shadowBlur = isMobile ? 12 : 18
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0
          }

          ctx.beginPath()
          ctx.arc(0, 0, iconSize / 2 + 4, 0, Math.PI * 2)
          ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.98)"
          ctx.fill()

          ctx.strokeStyle = isHovered ? "#06b6d4" : "rgba(6, 182, 212, 0.4)"
          ctx.lineWidth = isHovered ? 2 : 1
          ctx.stroke()

          ctx.shadowColor = "transparent"
          ctx.shadowBlur = 0

          ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, iconSize / 2, 0, Math.PI * 2)
          ctx.fillStyle = icon.color
          ctx.fill()
          ctx.strokeStyle = "#06b6d4"
          ctx.lineWidth = 2
          ctx.stroke()

          ctx.fillStyle = "#ffffff"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.font = `bold ${iconSize / 3}px Arial`
          ctx.fillText(icon.name.charAt(0), 0, 0)
        }

        ctx.restore()
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [iconPositions, mousePos, hoveredIcon, iconSize, canvasSize, getIconScreenPosition])

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <div className="absolute inset-0 bg-cyan-500/10 rounded-xl md:rounded-2xl blur-xl"></div>

      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        className="relative rounded-lg md:rounded-2xl shadow-xl md:shadow-2xl bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-cyan-900/80 cursor-grab active:cursor-grabbing border border-cyan-400/30 touch-none will-change-transform w-full h-auto backdrop-blur-sm"
        style={{
          cursor: hoveredIcon ? "pointer" : isDragging ? "grabbing" : "grab",
          touchAction: "none",
          transform: "translate3d(0, 0, 0)",
          maxWidth: "100%",
          aspectRatio: "1/1",
        }}
        aria-label="Interactive 3D Tech Stack Cloud - 25 Technologies"
        role="img"
      />

      <div className="absolute inset-0 rounded-lg md:rounded-2xl border border-cyan-400/30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute left-0 top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      </div>

      {hoveredIcon && (
        <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-xl text-xs md:text-sm font-semibold pointer-events-none shadow-lg border border-cyan-400/50 max-w-xs text-center">
          {hoveredIcon}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-600 dark:border-t-cyan-500"></div>
        </div>
      )}
    </div>
  )
}
