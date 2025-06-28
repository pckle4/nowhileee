"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Heart, Code, Coffee, Clock, Calendar } from "lucide-react"
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
    }
  }

  const { date, time } = formatDateTime(currentDateTime)

  return (
    <footer ref={footerRef} className="footer-main opacity-0 translate-y-8 transition-all duration-700 ease-out">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <div className="footer-logo">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h3 className="footer-brand-title">
                <span className="footer-brand-gradient">NoWhile.com</span>
              </h3>
            </div>
            <p className="footer-brand-description">
              Full Stack Developer passionate about creating innovative web solutions and bringing ideas to life through
              code. Specializing in modern web technologies and user-centered design.
            </p>

            {/* Current Date & Time */}
            <div className="footer-datetime">
              <div className="footer-datetime-item">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span>{date}</span>
              </div>
              <div className="footer-datetime-item">
                <Clock className="w-4 h-4 text-cyan-500" />
                <span>{time}</span>
              </div>
            </div>

            {/* IP Detector */}
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

          {/* Contact Info */}
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
                <span className="footer-contact-text">Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
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
          </div>
        </div>
      </div>
    </footer>
  )
}
