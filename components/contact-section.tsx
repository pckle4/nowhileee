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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionData, setSubmissionData] = useState<any>(null)

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
    if (isSubmitted) return

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
  }, [isSubmitted])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const timestamp = new Date().toLocaleString()
    const submissionId = Math.random().toString(36).substr(2, 9).toUpperCase()

    setSubmissionData({
      ...formData,
      timestamp,
      submissionId,
      status: "success",
    })

    // Show terminal submission details
    const submissionText = `$ contact_form --submit
> Processing form data...
> ================================
> SUBMISSION SUCCESSFUL
> ================================
> ID: ${submissionId}
> Name: ${formData.name}
> Email: ${formData.email}
> Subject: ${formData.subject}
> Message: ${formData.message.substring(0, 50)}${formData.message.length > 50 ? "..." : ""}
> Timestamp: ${timestamp}
> Status: ✅ DELIVERED
> ================================
> Thank you for reaching out!
> I'll get back to you soon.
> ================================
$ _`

    setTerminalText(submissionText)
    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 10 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmissionData(null)
    }, 10000)
  }

  return (
    <section id="contact" ref={sectionRef} className="contact-section-enhanced">
      {/* Background with glassmorphism */}
      <div className="contact-background-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <h2 className="contact-title">
            <span className="contact-title-gradient">Let's Connect</span>
          </h2>
          <p className="contact-subtitle">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Terminal-Style Contact Form */}
          <div
            ref={formRef}
            className="terminal-container-enhanced opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {/* Terminal Header */}
            <div className="terminal-header-enhanced">
              <div className="terminal-controls">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
              </div>
              <div className="terminal-title">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="terminal-title-text">contact@nowhile.com</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="terminal-content-enhanced">
              {/* Terminal Output */}
              <div ref={terminalRef} className="terminal-output-enhanced">
                <pre className="terminal-pre">
                  {terminalText}
                  {!isSubmitted && showCursor && <span className="terminal-cursor">█</span>}
                </pre>
              </div>

              {/* Contact Form */}
              {!isSubmitted && (
                <form onSubmit={handleSubmit} className="terminal-form-enhanced">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="terminal-input-group">
                      <div className="terminal-input-label">
                        <User className="w-4 h-4 text-cyan-400" />
                        <label className="terminal-label">name</label>
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="terminal-input-enhanced"
                        placeholder="your_name"
                        required
                      />
                    </div>
                    <div className="terminal-input-group">
                      <div className="terminal-input-label">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <label className="terminal-label">email</label>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="terminal-input-enhanced"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="terminal-input-group">
                    <div className="terminal-input-label">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <label className="terminal-label">subject</label>
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      className="terminal-input-enhanced"
                      placeholder="project_discussion"
                      required
                    />
                  </div>

                  <div className="terminal-input-group">
                    <div className="terminal-input-label">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <label className="terminal-label">message</label>
                    </div>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="terminal-textarea-enhanced"
                      placeholder="tell_me_about_your_project..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="terminal-submit-enhanced">
                    {isSubmitting ? (
                      <>
                        <div className="terminal-loading-spinner" />
                        ./processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        ./send_message
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Success Message */}
              {isSubmitted && (
                <div className="terminal-success-message">
                  <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
                  <span className="text-green-400 font-mono">Message sent successfully!</span>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Contact Info & Social */}
          <div
            ref={socialRef}
            className="space-y-8 opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ animationDelay: "200ms" }}
          >
            {/* Contact Info */}
            <div className="contact-info-card-enhanced">
              <h3 className="contact-info-title">Get In Touch</h3>
              <div className="contact-info-items">
                <div className="contact-info-item-enhanced">
                  <div className="contact-info-icon-enhanced neon-cyan">
                    <AtSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="contact-info-label">Email</p>
                    <p className="contact-info-value">theanshshah@gmail.com</p>
                  </div>
                </div>
                <div className="contact-info-item-enhanced">
                  <div className="contact-info-icon-enhanced neon-purple">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <p className="contact-info-label">Location</p>
                    <p className="contact-info-value">Vadodara, Gujarat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="social-links-card-enhanced">
              <h3 className="social-links-title">Connect With Me</h3>
              <div className="social-links-grid">
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
                      className={`social-icon-enhanced ${hoveredIcon === social.name ? "social-icon-hovered" : ""}`}
                      style={{
                        backgroundColor: hoveredIcon === social.name ? social.color : undefined,
                        boxShadow: hoveredIcon === social.name ? `0 20px 40px ${social.color}40` : undefined,
                      }}
                    >
                      <social.icon className="w-8 h-8" />
                    </div>
                    <span
                      className={`social-name-enhanced ${hoveredIcon === social.name ? "social-name-hovered" : ""}`}
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
    </section>
  )
}
