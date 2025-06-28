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

    window.addEventListener("scroll", handleScroll)
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 shadow-2xl">
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
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))"
                          : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <Icon
                      className={`w-6 h-6 relative z-10 transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : "text-gray-400"
                      }`}
                    />

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
