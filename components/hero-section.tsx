"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import TechIconCloud from "@/components/tech-icon-cloud"

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
    <section id="hero" ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
            <h1
              ref={nameRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "200ms" }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Ansh Shah
              </span>
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
              <Link
                href="/resume"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                View Resume
              </Link>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
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
