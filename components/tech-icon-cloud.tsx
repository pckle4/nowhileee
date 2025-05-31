"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface TechIconCloudProps {
  radius?: number
  iconSize?: number
}

export default function TechIconCloud({ radius = 120, iconSize = 32 }: TechIconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement[]>([])
  const [isClient, setIsClient] = useState(false)

  const techIcons = [
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    {
      name: "TypeScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "JavaScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    {
      name: "PostgreSQL",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    {
      name: "AWS",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Vue.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Nginx", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
    { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Position icons in 3D sphere
      iconsRef.current.forEach((icon, index) => {
        if (!icon) return

        const phi = Math.acos(-1 + (2 * index) / techIcons.length)
        const theta = Math.sqrt(techIcons.length * Math.PI) * phi

        const x = radius * Math.cos(theta) * Math.sin(phi)
        const y = radius * Math.sin(theta) * Math.sin(phi)
        const z = radius * Math.cos(phi)

        gsap.set(icon, {
          x: x,
          y: y,
          z: z,
          rotationX: Math.random() * 360,
          rotationY: Math.random() * 360,
        })
      })

      // Continuous rotation
      gsap.to(containerRef.current, {
        rotationY: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      })

      // Individual icon animations
      iconsRef.current.forEach((icon, index) => {
        if (!icon) return

        gsap.to(icon, {
          rotationX: "+=360",
          rotationY: "+=360",
          duration: 15 + Math.random() * 10,
          ease: "none",
          repeat: -1,
          delay: index * 0.1,
        })
      })

      // Hover effects
      iconsRef.current.forEach((icon) => {
        if (!icon) return

        const handleMouseEnter = () => {
          gsap.to(icon, {
            scale: 1.3,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        icon.addEventListener("mouseenter", handleMouseEnter)
        icon.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          icon.removeEventListener("mouseenter", handleMouseEnter)
          icon.removeEventListener("mouseleave", handleMouseLeave)
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isClient, radius, iconSize])

  if (!isClient) {
    return (
      <div className="relative flex items-center justify-center" style={{ width: radius * 2, height: radius * 2 }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center will-change-transform gpu-accelerated">
      <div
        ref={containerRef}
        className="relative preserve-3d will-change-transform"
        style={{
          width: radius * 2,
          height: radius * 2,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {techIcons.map((tech, index) => (
          <div
            key={tech.name}
            ref={(el) => el && (iconsRef.current[index] = el)}
            className="absolute will-change-transform cursor-pointer"
            style={{
              width: iconSize,
              height: iconSize,
              left: "50%",
              top: "50%",
              marginLeft: -iconSize / 2,
              marginTop: -iconSize / 2,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={tech.url || "/placeholder.svg"}
              alt={tech.name}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{
                imageRendering: "crisp-edges",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3)) brightness(1.1) contrast(1.1)",
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
