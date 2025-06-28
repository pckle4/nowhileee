"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import TechIconCloud from "@/components/tech-icon-cloud"
import { Code, Zap, Cpu, Database, Globe, Rocket, Binary, Terminal } from "lucide-react"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

  const techIcons = [
    { Icon: Code, color: "text-blue-400", delay: "0s" },
    { Icon: Zap, color: "text-yellow-400", delay: "0.5s" },
    { Icon: Cpu, color: "text-purple-400", delay: "1s" },
    { Icon: Database, color: "text-green-400", delay: "1.5s" },
    { Icon: Globe, color: "text-cyan-400", delay: "2s" },
    { Icon: Rocket, color: "text-red-400", delay: "2.5s" },
    { Icon: Binary, color: "text-indigo-400", delay: "3s" },
    { Icon: Terminal, color: "text-orange-400", delay: "3.5s" },
  ]

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {/* Animated Grid Background */}
      <div ref={gridRef} className="hero-grid-background">
        <div className="grid-pattern"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Floating Tech Icons */}
      <div className="floating-tech-icons">
        {techIcons.map(({ Icon, color, delay }, index) => (
          <div key={index} className={`floating-icon ${color}`} style={{ animationDelay: delay }}>
            <Icon className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Animated SVG Elements */}
      <div className="hero-svg-animations">
        <svg className="hero-svg hero-svg-1" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-cyan-400 opacity-30"
          >
            <animate attributeName="r" values="30;35;30" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>

        <svg className="hero-svg hero-svg-2" viewBox="0 0 100 100">
          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-purple-400 opacity-20"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>

        <svg className="hero-svg hero-svg-3" viewBox="0 0 100 100">
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-400 opacity-25"
          >
            <animate attributeName="opacity" values="0.25;0.5;0.25" dur="2s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      <div className="hero-container">
        <div className="hero-content-grid">
          {/* Left Content */}
          <div className="hero-text-content">
            <h1
              ref={nameRef}
              className="hero-name opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "200ms" }}
            >
              Hi, I'm <span className="hero-name-gradient">Ansh Shah</span>
            </h1>

            <h2
              ref={titleRef}
              className="hero-title opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "400ms" }}
            >
              Full Stack Developer
            </h2>

            <p
              ref={descRef}
              className="hero-description opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "600ms" }}
            >
              I build modern, responsive web applications with cutting-edge technologies. Specializing in React,
              Next.js, and Node.js, I create seamless user experiences backed by robust server architectures.
            </p>

            <div
              ref={buttonsRef}
              className="hero-buttons opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "800ms" }}
            >
              <Link href="/resume" className="hero-button-primary">
                <span>View Resume</span>
                <div className="button-glow"></div>
              </Link>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="hero-button-secondary"
              >
                <span>Contact Me</span>
                <div className="button-border-animation"></div>
              </button>
            </div>
          </div>

          {/* Right Content - Tech Icon Cloud */}
          <div className="hero-cloud-container">
            <TechIconCloud />
          </div>
        </div>
      </div>
    </section>
  )
}
