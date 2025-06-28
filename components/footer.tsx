"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Globe, Heart, Code, Coffee } from "lucide-react"
import IPDetector from "@/components/ip-detector"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [showIPDetector, setShowIPDetector] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) observer.observe(footerRef.current)

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current)
    }
  }, [])

  return (
    <>
      <footer
        ref={footerRef}
        className="relative border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    NoWhile.com
                  </span>
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-inter">
                Full Stack Developer passionate about creating innovative web solutions and bringing ideas to life
                through code. Specializing in modern web technologies and user-centered design.
              </p>

              {/* Network Info Button */}
              <button
                onClick={() => setShowIPDetector(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-300 group border border-gray-200 dark:border-slate-700"
              >
                <Globe className="w-4 h-4 text-cyan-500 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">Network Info</span>
              </button>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-inter">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-inter flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-inter flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-inter flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Skills
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-inter flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact
                  </button>
                </li>
                <li>
                  <Link
                    href="/resume"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-inter flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Resume
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-inter">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-400 group">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="font-mono text-sm">contact@nowhile.com</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 group">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="font-inter text-sm">Available Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <span>© {new Date().getFullYear()}</span>
                  <Link
                    href="/"
                    className="font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                  >
                    NoWhile.com
                  </Link>
                  <span>All rights reserved.</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm font-inter">
                <span>Built with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>using Next.js</span>
                <Code className="w-4 h-4 text-cyan-500" />
                <span>&</span>
                <Coffee className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* IP Detector Modal */}
      <IPDetector isOpen={showIPDetector} onClose={() => setShowIPDetector(false)} />
    </>
  )
}
