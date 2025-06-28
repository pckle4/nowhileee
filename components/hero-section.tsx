"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import TechIconCloud from "@/components/tech-icon-cloud"
import AnimatedTechIcons from "@/components/animated-tech-icons"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

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

    if (nameRef.current) observer.observe(nameRef.current)
    if (titleRef.current) observer.observe(titleRef.current)
    if (descRef.current) observer.observe(descRef.current)
    if (buttonsRef.current) observer.observe(buttonsRef.current)

    return () => {
      if (nameRef.current) observer.unobserve(nameRef.current)
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (descRef.current) observer.unobserve(descRef.current)
      if (buttonsRef.current) observer.unobserve(buttonsRef.current)
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="hero-section-with-grid">
      {/* Animated Grid Background */}
      <div className="hero-grid-background">
        <div className="grid-pattern"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Animated Tech Icons */}
      <AnimatedTechIcons />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
            <h1
              ref={nameRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "200ms" }}
            >
              Hi, I'm <span className="hero-name-gradient">Ansh Shah</span>
            </h1>

            <h2
              ref={titleRef}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "400ms" }}
            >
              Full Stack Developer
            </h2>

            <p
              ref={descRef}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "600ms" }}
            >
              I build modern, responsive web applications with cutting-edge technologies. Specializing in React,
              Next.js, and Node.js, I create seamless user experiences backed by robust server architectures.
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-wrap gap-4 justify-center md:justify-start opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "800ms" }}
            >
              <Link href="/resume" className="hero-button-primary">
                View Resume
              </Link>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="hero-button-secondary"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right Content - Tech Icon Cloud */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <TechIconCloud />
          </div>
        </div>
      </div>
    </section>
  )
}
