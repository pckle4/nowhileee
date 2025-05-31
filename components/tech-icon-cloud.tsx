"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { useTheme } from "next-themes"

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

// Ultra-smooth physics for buttery smooth dragging
const PHYSICS = {
  friction: 0.985, // Increased friction for smoother deceleration
  dragSensitivity: 0.008, // Increased sensitivity for more responsive dragging
  autoRotationSpeed: 0.0002, // Slightly reduced auto-rotation
  momentum: 0.95, // Added momentum preservation
  smoothing: 0.15, // Added smoothing factor
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
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  // Performance refs with enhanced smoothing
  const rotationRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const iconImagesRef = useRef<Map<string, HTMLImageElement>>(new Map())
  const imagesLoadedRef = useRef<Set<string>>(new Set())
  const animationIdRef = useRef<number>()
  const isDraggingRef = useRef(false)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoized tech stack for performance
  const techStack = useMemo(
    () => [
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
    ],
    [],
  )

  // Get background style based on theme
  const getBackgroundStyle = useCallback(() => {
    if (!mounted) return "bg-gray-100"

    const isDark = resolvedTheme === "dark"
    return isDark
      ? "bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-cyan-900/80 backdrop-blur-md"
      : "bg-gradient-to-br from-white/80 via-gray-50/80 to-blue-50/80 backdrop-blur-md"
  }, [mounted, resolvedTheme])

  // Optimized canvas sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth < 640
      const isTablet = window.innerWidth < 1024

      let size = radius * 4
      if (isMobile) {
        size = Math.min(radius * 3, window.innerWidth - 40)
      } else if (isTablet) {
        size = radius * 3.5
      }

      setCanvasSize({ width: size, height: size })
    }

    updateCanvasSize()
    const debouncedResize = debounce(updateCanvasSize, 100)
    window.addEventListener("resize", debouncedResize, { passive: true })
    return () => window.removeEventListener("resize", debouncedResize)
  }, [radius])

  // Optimized image loading
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = techStack.map(async (tech) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.loading = "eager"

        return new Promise<void>((resolve) => {
          img.onload = () => {
            iconImagesRef.current.set(tech.name, img)
            imagesLoadedRef.current.add(tech.name)
            resolve()
          }

          img.onerror = () => {
            // Fast fallback creation
            const canvas = document.createElement("canvas")
            const size = iconSize * 2
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext("2d", { alpha: false })
            if (ctx) {
              ctx.fillStyle = tech.color
              ctx.fillRect(0, 0, size, size)
              ctx.fillStyle = "#ffffff"
              ctx.font = `bold ${size / 3}px Arial`
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
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
  }, [iconSize, techStack])

  // Generate sphere positions (memoized)
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
  }, [radius, techStack])

  // Optimized event position calculation
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

  // Fast 3D calculations with caching
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

  // Optimized icon detection
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

  // Ultra-smooth drag handlers with enhanced physics
  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      const pos = getEventPosition(e)
      setIsDragging(true)
      isDraggingRef.current = true
      setLastPos(pos)
      velocityRef.current = { x: 0, y: 0 }
      lastTimeRef.current = performance.now()
    },
    [getEventPosition],
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

      const currentTime = performance.now()
      const deltaTime = Math.max(1, currentTime - lastTimeRef.current)
      lastTimeRef.current = currentTime

      const deltaX = pos.x - lastPos.x
      const deltaY = pos.y - lastPos.y

      // Enhanced sensitivity with time-based smoothing
      const timeFactor = Math.min(1, deltaTime / 16) // Normalize to 60fps
      const rotationDeltaY = (deltaX * PHYSICS.dragSensitivity) / timeFactor
      const rotationDeltaX = (deltaY * PHYSICS.dragSensitivity) / timeFactor

      // Smooth interpolation to target rotation
      targetRotationRef.current.y += rotationDeltaY
      targetRotationRef.current.x += rotationDeltaX

      // Enhanced velocity calculation with momentum
      velocityRef.current.x = rotationDeltaX * PHYSICS.momentum
      velocityRef.current.y = rotationDeltaY * PHYSICS.momentum

      setLastPos(pos)
    },
    [getEventPosition, getIconAtPosition, lastPos],
  )

  const handleEnd = useCallback(() => {
    setIsDragging(false)
    isDraggingRef.current = false
  }, [])

  // Ultra-optimized animation loop with buttery smooth interpolation
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
      // Smooth interpolation for ultra-smooth rotation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * PHYSICS.smoothing
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * PHYSICS.smoothing

      if (!isDraggingRef.current) {
        // Apply auto-rotation and velocity with enhanced smoothing
        targetRotationRef.current.x += velocityRef.current.x
        targetRotationRef.current.y += velocityRef.current.y + PHYSICS.autoRotationSpeed

        // Enhanced friction with momentum preservation
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

      const isMobile = window.innerWidth < 640
      const scaleFactor = isMobile ? 0.9 : 1

      sortedIcons.forEach(({ icon, screenX, screenY, scale, depth }) => {
        const opacity = Math.max(0.4, Math.min(1, (depth + 150) / 250))
        const img = iconImagesRef.current.get(icon.name)
        const isLoaded = imagesLoadedRef.current.has(icon.name)
        const isHovered = hoveredIcon === icon.name

        ctx.save()
        ctx.translate(screenX, screenY)

        const finalScale = scale * scaleFactor * (isHovered ? 1.2 : 1)
        ctx.scale(finalScale, finalScale)
        ctx.globalAlpha = opacity

        if (img && isLoaded) {
          ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize)
        } else {
          ctx.fillStyle = icon.color
          ctx.fillRect(-iconSize / 2, -iconSize / 2, iconSize, iconSize)
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

  if (!mounted) {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div
          className="relative rounded-lg md:rounded-2xl shadow-lg bg-gray-100 animate-pulse w-full"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            maxWidth: "100%",
            aspectRatio: "1/1",
          }}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
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
        className={`relative rounded-lg md:rounded-2xl shadow-lg cursor-grab active:cursor-grabbing touch-none w-full h-auto border border-gray-200/30 dark:border-slate-700/30 ${getBackgroundStyle()}`}
        style={{
          cursor: hoveredIcon ? "pointer" : isDragging ? "grabbing" : "grab",
          touchAction: "none",
          maxWidth: "100%",
          aspectRatio: "1/1",
        }}
        aria-label="Interactive 3D Tech Stack Cloud"
        role="img"
      />

      {hoveredIcon && (
        <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-2 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-semibold pointer-events-none shadow-lg max-w-xs text-center font-inter">
          {hoveredIcon}
        </div>
      )}
    </div>
  )
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }) as T
}
