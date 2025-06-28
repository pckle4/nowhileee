"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Download, Code, Palette, Zap, Cpu, Database, Globe } from "lucide-react"
import EnhancedTechIconCloud from "@/components/enhanced-tech-icon-cloud"

const floatingIcons = [
  { Icon: Code, color: "text-cyan-400", delay: 0 },
  { Icon: Palette, color: "text-purple-400", delay: 0.5 },
  { Icon: Zap, color: "text-yellow-400", delay: 1 },
  { Icon: Cpu, color: "text-green-400", delay: 1.5 },
  { Icon: Database, color: "text-blue-400", delay: 2 },
  { Icon: Globe, color: "text-pink-400", delay: 2.5 },
]

export default function EnhancedHeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) observer.observe(heroRef.current)

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current)
    }
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      {/* Animated Grid Background */}
      <div className="hero-grid-background">
        <div className="grid-pattern"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Floating Tech Icons */}
      <div className="floating-tech-icons">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="floating-icon"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{
              delay: item.delay,
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 4,
            }}
          >
            <item.Icon className={`w-8 h-8 ${item.color}`} />
          </motion.div>
        ))}
      </div>

      {/* Hero SVG Animations */}
      <div className="hero-svg-animations">
        <motion.div
          className="hero-svg hero-svg-1"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Code className="w-full h-full text-cyan-400/30" />
        </motion.div>
        <motion.div
          className="hero-svg hero-svg-2"
          animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Zap className="w-full h-full text-yellow-400/30" />
        </motion.div>
        <motion.div
          className="hero-svg hero-svg-3"
          animate={{ y: [-5, 15, -5], rotate: [0, 90, 180] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        >
          <Globe className="w-full h-full text-purple-400/30" />
        </motion.div>
      </div>

      <div className="hero-container">
        <div className="hero-content-grid">
          <div className="hero-text-content">
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm <span className="hero-name-gradient">Ansh Shah</span>
            </motion.h1>

            <motion.h2
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I create exceptional digital experiences through innovative web development, combining cutting-edge
              technology with user-centered design to bring ideas to life.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="hero-button-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="button-glow"></span>
                View My Work
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                className="hero-button-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="button-border-animation"></span>
                <Download className="w-5 h-5 mr-2" />
                Get In Touch
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="hero-cloud-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <EnhancedTechIconCloud />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
