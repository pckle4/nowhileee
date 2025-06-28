"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import {
  Send,
  Terminal,
  User,
  Mail,
  MessageSquare,
  Zap,
  Github,
  Linkedin,
  Twitter,
  AtSign,
  CheckCircle,
} from "lucide-react"

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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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

  // Enhanced terminal typing animation
  useEffect(() => {
    const messages = [
      "$ whoami",
      "> ansh_shah",
      "$ cat skills.txt",
      "> Full Stack Developer",
      "> React | Next.js | Node.js",
      "> TypeScript | Python | AWS",
      "> Always learning new technologies...",
      "$ echo 'Ready to build something amazing!'",
      "> Ready to build something amazing!",
      "$ git status",
      "> On branch main",
      "> Your project is up to date.",
      "$ npm run dev",
      "> Starting development server...",
      "> ✓ Ready in 1.2s",
      "> ▲ Next.js running on http://localhost:3000",
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
          setTimeout(typeMessage, Math.random() * 50 + 25)
        } else {
          currentMessage += "\n"
          setTerminalText(currentMessage)
          messageIndex++
          charIndex = 0
          setTimeout(typeMessage, messageIndex === messages.length - 1 ? 2000 : 800)
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
    setIsSubmitted(true)

    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true)

      // Update terminal with success message
      const successMessage = `\n$ submit_form\n> Processing form data...\n> ✓ Message sent successfully!\n> Form Details:\n>   Name: ${formData.name}\n>   Email: ${formData.email}\n>   Subject: ${formData.subject}\n>   Message: ${formData.message.substring(0, 50)}${formData.message.length > 50 ? "..." : ""}\n> \n> Thank you ${formData.name}!\n> I'll get back to you soon.\n> $ _`
      setTerminalText((prev) => prev + successMessage)

      // Reset form after showing success
      setTimeout(() => {
        setIsSubmitted(false)
        setShowSuccess(false)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 5000)
    }, 2000)
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
          {/* Enhanced Terminal-Style Contact Form */}
          <div
            ref={formRef}
            className="terminal-container opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="control-button close"></div>
                <div className="control-button minimize"></div>
                <div className="control-button maximize"></div>
              </div>
              <div className="terminal-title">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm font-mono">contact@nowhile.com</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="terminal-content">
              {/* Enhanced Terminal Output */}
              <div ref={terminalRef} className="terminal-output">
                <pre className="terminal-text">
                  {terminalText}
                  {showCursor && <span className="terminal-cursor">█</span>}
                </pre>
              </div>

              {/* Enhanced Contact Form */}
              <form onSubmit={handleSubmit} className="terminal-form">
                <div className="form-grid">
                  <div className="form-field">
                    <div className="field-header">
                      <User className="w-4 h-4 text-cyan-400" />
                      <label className="field-label">name</label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="terminal-input"
                      placeholder="your_name"
                      required
                      disabled={isSubmitted}
                    />
                  </div>

                  <div className="form-field">
                    <div className="field-header">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <label className="field-label">email</label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="terminal-input"
                      placeholder="you@example.com"
                      required
                      disabled={isSubmitted}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <div className="field-header">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <label className="field-label">subject</label>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className="terminal-input"
                    placeholder="project_discussion"
                    required
                    disabled={isSubmitted}
                  />
                </div>

                <div className="form-field">
                  <div className="field-header">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <label className="field-label">message</label>
                  </div>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="terminal-input terminal-textarea"
                    placeholder="tell_me_about_your_project..."
                    required
                    disabled={isSubmitted}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`terminal-submit-button ${isSubmitted ? "submitting" : ""} ${showSuccess ? "success" : ""}`}
                >
                  {showSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      ./message_sent
                    </>
                  ) : isSubmitted ? (
                    <>
                      <div className="submit-spinner"></div>
                      ./sending_message
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      ./send_message
                    </>
                  )}
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
            <div className="contact-info-card">
              <h3 className="contact-card-title">Get In Touch</h3>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">
                    <AtSign className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <p className="contact-label">Email</p>
                    <p className="contact-value">theanshshah@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
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
                    <p className="contact-label">Location</p>
                    <p className="contact-value">Vadodara, Gujarat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Connect With Me */}
            <div className="social-card">
              <h3 className="contact-card-title">Connect With Me</h3>
              <div className="social-grid">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-enhanced"
                    onMouseEnter={() => setHoveredIcon(social.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div
                      className={`social-icon-enhanced ${hoveredIcon === social.name ? "hovered" : ""}`}
                      style={{
                        backgroundColor: hoveredIcon === social.name ? social.color : undefined,
                        color: hoveredIcon === social.name ? "white" : "#6b7280",
                        boxShadow: hoveredIcon === social.name ? `0 20px 40px ${social.color}40` : undefined,
                      }}
                    >
                      <social.icon className="w-8 h-8" />
                    </div>
                    <span className={`social-name ${hoveredIcon === social.name ? "active" : ""}`}>{social.name}</span>
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
