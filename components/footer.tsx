"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Heart, Code, Coffee, Clock, Calendar, Globe, Zap, Shield } from "lucide-react"
import IPDetector from "@/components/ip-detector"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }

  const { date, time, timezone } = formatDateTime(currentDateTime)

  return (
    <footer ref={footerRef} className="footer-main opacity-0 translate-y-8 transition-all duration-700 ease-out">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Enhanced Brand Section */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <div className="footer-logo">
                <Code className="w-5 h-5 text-white" />
                <div className="logo-glow"></div>
              </div>
              <h3 className="footer-brand-title">
                <span className="footer-brand-gradient">NoWhile.com</span>
              </h3>
            </div>
            <p className="footer-brand-description">
              Full Stack Developer passionate about creating innovative web solutions and bringing ideas to life through
              code. Specializing in modern web technologies and user-centered design.
            </p>

            {/* Enhanced Current Date & Time Display */}
            <div className="footer-datetime-enhanced">
              <div className="datetime-header">
                <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="datetime-title">Live Clock</span>
              </div>

              <div className="datetime-display">
                <div className="datetime-item primary">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <div className="datetime-content">
                    <span className="datetime-label">Date</span>
                    <span className="datetime-value">{date}</span>
                  </div>
                </div>

                <div className="datetime-item primary">
                  <Clock className="w-4 h-4 text-blue-400 animate-spin-slow" />
                  <div className="datetime-content">
                    <span className="datetime-label">Time</span>
                    <span className="datetime-value font-mono">{time}</span>
                  </div>
                </div>

                <div className="datetime-item">
                  <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                  <div className="datetime-content">
                    <span className="datetime-label">Timezone</span>
                    <span className="datetime-value font-mono text-sm">{timezone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced IP Detector */}
            <div className="footer-ip-section">
              <IPDetector />
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button
                  onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                  className="footer-link"
                >
                  <span className="footer-link-dot"></span>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="footer-link"
                >
                  <span className="footer-link-dot"></span>
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
                  className="footer-link"
                >
                  <span className="footer-link-dot"></span>
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="footer-link"
                >
                  <span className="footer-link-dot"></span>
                  Contact
                </button>
              </li>
              <li>
                <Link href="/resume" className="footer-link">
                  <span className="footer-link-dot"></span>
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <Link href="/privacy-policy" className="footer-link">
                  <span className="footer-link-dot"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="footer-link">
                  <span className="footer-link-dot"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div className="footer-section">
            <h4 className="footer-section-title">Get In Touch</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="footer-contact-text">contact@nowhile.com</span>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <Shield className="w-4 h-4 text-cyan-500 animate-pulse" />
                </div>
                <span className="footer-contact-text">Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Copyright Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <div className="footer-copyright-main">
              <span>© {new Date().getFullYear()}</span>
              <Link href="/" className="footer-copyright-brand">
                NoWhile.com
              </Link>
              <span>All rights reserved.</span>
            </div>

            <div className="footer-copyright-disclaimer">
              <p>
                This website and its content are protected by copyright law. Unauthorized reproduction or distribution
                of any materials from this site is strictly prohibited.
              </p>
            </div>
          </div>

          <div className="footer-built-with">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>using Next.js</span>
            <Code className="w-4 h-4 text-cyan-500" />
            <span>&</span>
            <Coffee className="w-4 h-4 text-amber-600" />
            <span className="footer-time-display">
              Current time: <span className="font-mono text-cyan-400">{time}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
