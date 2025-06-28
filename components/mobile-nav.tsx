"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, Mail, FileText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const navItems = [
  { icon: Home, href: "#hero", label: "Home" },
  { icon: User, href: "#about", label: "About" },
  { icon: Briefcase, href: "#projects", label: "Projects" },
  { icon: Mail, href: "#contact", label: "Contact" },
  { icon: FileText, href: "/resume", label: "Resume" },
]

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(false)
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 100)

      // Update active section based on scroll position
      const sections = ["hero", "about", "projects", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      window.location.href = href
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-around">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive =
                  activeSection === item.href.replace("#", "") ||
                  (item.href === "/resume" && window.location.pathname === "/resume")

                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="relative p-3 rounded-xl transition-all duration-300"
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4))"
                          : "transparent",
                        scale: isActive ? 1 : 0.8,
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />

                    <motion.div
                      animate={{
                        rotate: isActive ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon
                        className={`w-6 h-6 relative z-10 transition-all duration-300 ${
                          isActive ? "text-cyan-400 drop-shadow-lg" : "text-gray-400"
                        }`}
                      />
                    </motion.div>

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                          delay: 0.1,
                        }}
                      />
                    )}

                    {/* Ripple effect on tap */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-cyan-400/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 2, opacity: [0, 1, 0] }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )
              })}
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 20 - 10],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    left: `${20 + i * 20}%`,
                    top: "50%",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
