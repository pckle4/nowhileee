"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Home, Briefcase, Code, Mail, FileText, Hand } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)
  const handRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animated underline with hand effect
  useEffect(() => {
    const logo = logoRef.current
    const underline = underlineRef.current
    const hand = handRef.current

    if (!logo || !underline || !hand) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      // Animate underline
      underline.style.transform = "scaleX(1)"
      underline.style.opacity = "1"
      // Animate hand
      hand.style.transform = "translateX(0) rotate(0deg)"
      hand.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      // Reset underline
      underline.style.transform = "scaleX(0)"
      underline.style.opacity = "0"
      // Reset hand
      hand.style.transform = "translateX(-10px) rotate(-15deg)"
      hand.style.opacity = "0"
    }

    logo.addEventListener("mouseenter", handleMouseEnter)
    logo.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      logo.removeEventListener("mouseenter", handleMouseEnter)
      logo.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the resume page
    if (window.location.pathname === "/resume") {
      // Navigate to home page first, then scroll
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { label: "Home", icon: Home, action: () => scrollToSection("hero") },
    { label: "Projects", icon: Briefcase, action: () => scrollToSection("projects") },
    { label: "Skills", icon: Code, action: () => scrollToSection("skills") },
    { label: "Contact", icon: Mail, action: () => scrollToSection("contact") },
  ]

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with animated underline and hand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div ref={logoRef} className="relative cursor-pointer group">
                <h1 className="text-xl lg:text-2xl font-black relative">
                  <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    NoWhile
                  </span>

                  {/* Animated Hand Pointer */}
                  <div
                    ref={handRef}
                    className="absolute -right-8 top-0 opacity-0 transition-all duration-500 ease-out"
                    style={{
                      transform: "translateX(-10px) rotate(-15deg)",
                    }}
                  >
                    <Hand className="w-5 h-5 text-amber-500" />
                  </div>
                </h1>

                {/* Animated Underline */}
                <div
                  ref={underlineRef}
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full origin-left transition-all duration-500 ease-out opacity-0"
                  style={{
                    transform: "scaleX(0)",
                  }}
                ></div>
              </div>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav ref={navRef} className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 font-medium relative"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>{item.label}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
            <Link
              href="/resume"
              className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 font-medium relative"
            >
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Resume</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
