"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import EnhancedHeroSection from "@/components/enhanced-hero-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import EnhancedContactSection from "@/components/enhanced-contact-section"
import Footer from "@/components/footer"
import MobileNav from "@/components/mobile-nav"
import Preloader from "@/components/preloader"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        <Header />
        <main>
          <EnhancedHeroSection />
          <div id="about">
            <SkillsSection />
          </div>
          <div id="projects">
            <ProjectsSection />
          </div>
          <EnhancedContactSection />
        </main>
        <Footer />
        <MobileNav />
      </div>
    </>
  )
}
