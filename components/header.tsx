"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import type { HTMLHeaderElement, HTMLDivElement, HTMLNavElement } from "react"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const headerRef = useRef<HTMLHeaderElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLNavElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.fromTo(headerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })

      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" },
      )

      gsap.fromTo(
        navRef.current?.children || [],
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, stagger: 0.1, ease: "power2.out" },
      )

      // Underline animation
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          delay: 0.8,
          ease: "power2.out",
          repeat: -1,
          yoyo: true,
          repeatDelay: 3,
        },
      )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-cyan-500/20 shadow-lg dark:shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div ref={logoRef} className="relative">
              <h1 className="text-xl lg:text-2xl font-black">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  NoWhile
                </span>
              </h1>
              <div
                ref={underlineRef}
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform scale-x-0 rounded-full"
              ></div>
            </div>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-cyan-500/30 text-gray-700 dark:text-cyan-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
