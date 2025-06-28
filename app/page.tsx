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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EnhancedHeroSection />
        <ProjectsSection />
        <SkillsSection />
        <EnhancedContactSection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
