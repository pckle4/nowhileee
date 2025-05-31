"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "#333",
      url: "https://github.com/ansh",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "#0077B5",
      url: "https://linkedin.com/in/ansh",
    },
    {
      name: "Twitter",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "#1DA1F2",
      url: "https://twitter.com",
    },
    {
      name: "Email",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      color: "#EA4335",
      url: "mailto:theanshshah@gmail.com",
    },
  ]

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

    if (titleRef.current) observer.observe(titleRef.current)
    if (formRef.current) observer.observe(formRef.current)
    if (socialRef.current) observer.observe(socialRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (formRef.current) observer.unobserve(formRef.current)
      if (socialRef.current) observer.unobserve(socialRef.current)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-slate-900/50 dark:to-slate-800/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 font-inter">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-inter">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-gray-50/50 dark:bg-slate-700/50 border border-gray-300/50 dark:border-slate-600/50 rounded-lg text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 peer placeholder-transparent font-inter"
                    placeholder="Your name"
                    id="name"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-inter ${
                      focusedField === "name" || formData.name
                        ? "-top-2 text-xs bg-white dark:bg-slate-800 px-2 text-cyan-500"
                        : "top-3 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-gray-50/50 dark:bg-slate-700/50 border border-gray-300/50 dark:border-slate-600/50 rounded-lg text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 peer placeholder-transparent font-inter"
                    placeholder="your@email.com"
                    id="email"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-inter ${
                      focusedField === "email" || formData.email
                        ? "-top-2 text-xs bg-white dark:bg-slate-800 px-2 text-cyan-500"
                        : "top-3 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Email Address
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-gray-50/50 dark:bg-slate-700/50 border border-gray-300/50 dark:border-slate-600/50 rounded-lg text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 peer placeholder-transparent font-inter"
                  placeholder="Project discussion"
                  id="subject"
                />
                <label
                  htmlFor="subject"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-inter ${
                    focusedField === "subject" || formData.subject
                      ? "-top-2 text-xs bg-white dark:bg-slate-800 px-2 text-cyan-500"
                      : "top-3 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Subject
                </label>
              </div>
              <div className="relative">
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-gray-50/50 dark:bg-slate-700/50 border border-gray-300/50 dark:border-slate-600/50 rounded-lg text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none peer placeholder-transparent font-inter"
                  placeholder="Tell me about your project..."
                  id="message"
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-inter ${
                    focusedField === "message" || formData.message
                      ? "-top-2 text-xs bg-white dark:bg-slate-800 px-2 text-cyan-500"
                      : "top-3 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Your Message
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-inter"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div
            ref={socialRef}
            className="space-y-8 opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ animationDelay: "200ms" }}
          >
            {/* Contact Info */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-inter">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-inter">Email</p>
                    <p className="text-gray-900 dark:text-white font-medium font-mono">theanshshah@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-inter">Phone</p>
                    <p className="text-gray-900 dark:text-white font-medium font-mono">+91 9586888734</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-inter">Location</p>
                    <p className="text-gray-900 dark:text-white font-medium font-inter">Vadodara, Gujarat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-inter">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    onMouseEnter={() => setHoveredIcon(social.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
                        hoveredIcon === social.name
                          ? "shadow-lg"
                          : "bg-gray-100/50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-slate-600/50"
                      }`}
                      style={{
                        backgroundColor: hoveredIcon === social.name ? social.color : undefined,
                        color: hoveredIcon === social.name ? "white" : "#6b7280",
                        boxShadow: hoveredIcon === social.name ? `0 8px 25px ${social.color}40` : undefined,
                      }}
                    >
                      {social.icon}
                    </div>

                    {/* Tooltip */}
                    <div
                      className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium text-white transition-all duration-200 pointer-events-none font-inter ${
                        hoveredIcon === social.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      }`}
                      style={{ backgroundColor: social.color }}
                    >
                      {social.name}
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                        style={{ borderTopColor: social.color }}
                      ></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
