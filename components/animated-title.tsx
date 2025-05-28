"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function AnimatedTitle() {
  const titleRef = useRef<HTMLDivElement>(null)
  const glitchRef1 = useRef<HTMLDivElement>(null)
  const glitchRef2 = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])
  const sparklesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade in animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
      )

      // Gradient animation
      gsap.to(titleRef.current, {
        backgroundPosition: "200% center",
        duration: 3,
        ease: "none",
        repeat: -1,
      })

      // Underline animation for "NoWhile" - positioned below text
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.5,
          delay: 1.5,
          ease: "power2.out",
          repeat: -1,
          yoyo: true,
          repeatDelay: 2,
        },
      )

      // Floating elements animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            duration: 2 + index * 0.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.3,
          })
        }
      })

      // Sparkle animation
      sparklesRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            repeat: -1,
            yoyo: true,
            delay: index * 0.7,
          })
        }
      })

      // Glitch effect every 3 seconds
      gsap
        .timeline({ repeat: -1, repeatDelay: 3 })
        .to([glitchRef1.current, glitchRef2.current], {
          opacity: 0.7,
          duration: 0.1,
        })
        .to(
          glitchRef1.current,
          {
            x: -2,
            y: 2,
            duration: 0.05,
          },
          0,
        )
        .to(
          glitchRef2.current,
          {
            x: 2,
            y: -2,
            duration: 0.05,
          },
          0,
        )
        .to([glitchRef1.current, glitchRef2.current], {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.1,
        })
    }, titleRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={titleRef} className="relative px-2 md:px-0">
      {/* Main Title with better mobile responsiveness */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-3 md:mb-6 relative leading-tight">
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_100%]">
          Coming in
        </span>
        <br />
        <span className="relative inline-block">
          {/* NoWhile with solid fallback and gradient overlay */}
          <span className="text-slate-800 dark:text-white relative z-10">NoWhile</span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_100%] z-20">
            NoWhile
          </span>
          {/* Animated Underline - responsive positioning */}
          <div
            ref={underlineRef}
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-4 left-0 w-full h-0.5 sm:h-1 md:h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform scale-x-0 rounded-full"
          ></div>
        </span>
      </h1>

      {/* Glitch Layers - responsive text sizes */}
      <div
        ref={glitchRef1}
        className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-red-500 opacity-0 pointer-events-none leading-tight"
      >
        Coming in
        <br />
        NoWhile
      </div>
      <div
        ref={glitchRef2}
        className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-blue-500 opacity-0 pointer-events-none leading-tight"
      >
        Coming in
        <br />
        NoWhile
      </div>

      {/* Floating Elements - responsive sizes */}
      <div
        ref={(el) => el && (floatingElementsRef.current[0] = el)}
        className="absolute -top-1 sm:-top-2 md:-top-4 -left-1 sm:-left-2 md:-left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-8 md:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
      ></div>
      <div
        ref={(el) => el && (floatingElementsRef.current[1] = el)}
        className="absolute -top-0.5 sm:-top-1 md:-top-2 -right-2 sm:-right-4 md:-right-8 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-6 md:h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
      ></div>
      <div
        ref={(el) => el && (floatingElementsRef.current[2] = el)}
        className="absolute -bottom-1 sm:-bottom-2 md:-bottom-4 left-1/4 w-2 h-2 sm:w-2 sm:h-2 md:w-4 md:h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
      ></div>
      <div
        ref={(el) => el && (floatingElementsRef.current[3] = el)}
        className="absolute -bottom-0.5 sm:-bottom-1 md:-bottom-2 right-1/4 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-5 md:h-5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
      ></div>

      {/* Sparkle Effects - responsive sizes */}
      <div
        ref={(el) => el && (sparklesRef.current[0] = el)}
        className="absolute top-1/4 left-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-2 md:h-2 bg-white dark:bg-yellow-300 rounded-full opacity-0 scale-0"
      ></div>
      <div
        ref={(el) => el && (sparklesRef.current[1] = el)}
        className="absolute top-3/4 right-1/3 w-0.5 h-0.5 sm:w-0.5 sm:h-0.5 md:w-1 md:h-1 bg-white dark:bg-yellow-300 rounded-full opacity-0 scale-0"
      ></div>
      <div
        ref={(el) => el && (sparklesRef.current[2] = el)}
        className="absolute top-1/2 right-1/4 w-0.5 h-0.5 sm:w-0.75 sm:h-0.75 md:w-1.5 md:h-1.5 bg-white dark:bg-yellow-300 rounded-full opacity-0 scale-0"
      ></div>
    </div>
  )
}
