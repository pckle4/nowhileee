"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Send, Terminal, User, Mail, MessageSquare, Zap, Github, Linkedin, Twitter, AtSign } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      color: "#333",
      url: "https://github.com/ansh",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0077B5",
      url: "https://linkedin.com/in/ansh",
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      url: "https://twitter.com",
    },
    {
      name: "Email",
      icon: AtSign,
      color: "#EA4335",
      url: "mailto:theanshshah@gmail.com",
    },
  ]

  // Terminal typing animation
  useEffect(() => {
    const messages = [
      "$ whoami",
      "> ansh_shah",
      "$ cat skills.txt",
      "> Full Stack Developer",
      "> React | Next.js | Node.js",
      "> Always learning...",
      "$ echo 'Let\\'s build something amazing!'",
      "> Let's build something amazing!",
      "$ _",
    ]

    let messageIndex = 0
    let charIndex = 0
    let currentMessage = ""

    const typeMessage = () => {
      if (messageIndex < messages.length) {
        const fullMessage = messages[messageIndex]

        if (charIndex < fullMessage.length) {
          currentMessage += fullMessage[charIndex]
          setTerminalText(currentMessage)
          charIndex++
          setTimeout(typeMessage, Math.random() * 100 + 50)
        } else {
          currentMessage += "\n"
          setTerminalText(currentMessage)
          messageIndex++
          charIndex = 0
          setTimeout(typeMessage, 1000)
        }
      }
    }

    const timer = setTimeout(typeMessage, 2000)

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearInterval(cursorInterval)
    }
  }, [])

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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white/80 dark:from-slate-900/50 dark:to-slate-800/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 font-inter">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Terminal-Style Contact Form */}
          <div
            ref={formRef}
            className="bg-gray-900 dark:bg-black border border-gray-700 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm font-mono">contact@nowhile.com</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6">
              {/* Terminal Output */}
              <div
                ref={terminalRef}
                className="bg-black rounded-lg p-4 mb-6 font-mono text-sm text-green-400 min-h-[200px] overflow-hidden"
              >
                <pre className="whitespace-pre-wrap">
                  {terminalText}
                  {showCursor && <span className="bg-green-400 text-black">█</span>}
                </pre>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      <label className="text-gray-300 text-sm font-mono">name</label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 font-mono placeholder-gray-500"
                      placeholder="your_name"
                    />
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <label className="text-gray-300 text-sm font-mono">email</label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 font-mono placeholder-gray-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <label className="text-gray-300 text-sm font-mono">subject</label>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 font-mono placeholder-gray-500"
                    placeholder="project_discussion"
                  />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <label className="text-gray-300 text-sm font-mono">message</label>
                  </div>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none font-mono placeholder-gray-500"
                    placeholder="tell_me_about_your_project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-mono flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  ./send_message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div
            ref={socialRef}
            className="space-y-8 opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ animationDelay: "200ms" }}
          >
            {/* Contact Info */}
            <div className="bg-white/90 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-inter">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-cyan-500/30 transition-colors">
                    <AtSign className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-inter">Email</p>
                    <p className="text-gray-900 dark:text-white font-medium font-mono">theanshshah@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-cyan-500/30 transition-colors">
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

            {/* Connect With Me - Redesigned */}
            <div className="bg-white/90 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-inter">Connect With Me</h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col items-center"
                      onMouseEnter={() => setHoveredIcon(social.name)}
                      onMouseLeave={() => setHoveredIcon(null)}
                    >
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 ${
                          hoveredIcon === social.name
                            ? "shadow-2xl"
                            : "bg-gray-100/80 dark:bg-slate-700/50 border border-gray-200/50 dark:border-slate-600/50"
                        }`}
                        style={{
                          backgroundColor: hoveredIcon === social.name ? social.color : undefined,
                          color: hoveredIcon === social.name ? "white" : "#6b7280",
                          boxShadow: hoveredIcon === social.name ? `0 20px 40px ${social.color}40` : undefined,
                        }}
                      >
                        <social.icon className="w-8 h-8" />
                      </div>
                      <span
                        className={`mt-3 text-sm font-medium transition-all duration-300 font-inter ${
                          hoveredIcon === social.name
                            ? "text-gray-900 dark:text-white transform -translate-y-1"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
