"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, MessageSquare, Calculator, Send, CheckCircle, Loader2, Terminal, Code, Zap } from "lucide-react"

export default function EnhancedContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    captcha: "",
  })
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Generate random math captcha
  useEffect(() => {
    generateCaptcha()
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const generateCaptcha = () => {
    const operators = ["+", "-", "×"]
    const operator = operators[Math.floor(Math.random() * operators.length)]
    let num1, num2, answer

    switch (operator) {
      case "+":
        num1 = Math.floor(Math.random() * 20) + 1
        num2 = Math.floor(Math.random() * 20) + 1
        answer = num1 + num2
        break
      case "-":
        num1 = Math.floor(Math.random() * 20) + 10
        num2 = Math.floor(Math.random() * 10) + 1
        answer = num1 - num2
        break
      case "×":
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        answer = num1 * num2
        break
      default:
        num1 = 5
        num2 = 3
        answer = 8
    }

    setCaptchaQuestion({
      question: `${num1} ${operator} ${num2} = ?`,
      answer,
    })
  }

  const addToTerminal = (text: string, delay = 0) => {
    setTimeout(() => {
      setTerminalOutput((prev) => prev + text + "\n")
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, delay)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (Number.parseInt(formData.captcha) !== captchaQuestion.answer) {
      addToTerminal("❌ CAPTCHA verification failed. Please try again.")
      generateCaptcha()
      setFormData((prev) => ({ ...prev, captcha: "" }))
      return
    }

    setIsSubmitting(true)
    setTerminalOutput("")

    // Simulate form submission with terminal output
    addToTerminal("🚀 Initializing contact form submission...", 0)
    addToTerminal("📝 Validating form data...", 500)
    addToTerminal("✅ Form validation successful", 1000)
    addToTerminal("📧 Preparing email transmission...", 1500)
    addToTerminal(`👤 Name: ${formData.name}`, 2000)
    addToTerminal(`📮 Email: ${formData.email}`, 2200)
    addToTerminal(`💬 Message: ${formData.message.substring(0, 50)}${formData.message.length > 50 ? "..." : ""}`, 2400)
    addToTerminal("🔐 Encrypting message content...", 2800)
    addToTerminal("📡 Transmitting to server...", 3200)
    addToTerminal("✨ Message sent successfully!", 3800)
    addToTerminal("🎉 Thank you for reaching out!", 4200)
    addToTerminal("💫 I'll get back to you soon!", 4600)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "", captcha: "" })
    setIsSubmitted(false)
    setTerminalOutput("")
    generateCaptcha()
  }

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's start a conversation and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="contact-info-card">
              <h3 className="contact-card-title">Let's Connect</h3>
              <div className="contact-items">
                <motion.div
                  className="contact-item"
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="contact-icon">
                    <Mail className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">contact@nowhile.com</div>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-item"
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="contact-icon">
                    <Zap className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="contact-label">Response Time</div>
                    <div className="contact-value">Within 24 hours</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="social-card">
              <h3 className="contact-card-title">Follow Me</h3>
              <div className="social-grid">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-enhanced"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="social-icon-enhanced">
                    <Code className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <span className="social-name">GitHub</span>
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-enhanced"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="social-icon-enhanced">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="social-name">LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Terminal Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="terminal-container"
          >
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="control-button close"></div>
                <div className="control-button minimize"></div>
                <div className="control-button maximize"></div>
              </div>
              <div className="terminal-title">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 font-mono text-sm">contact@nowhile.com</span>
              </div>
            </div>

            <div className="terminal-content">
              {/* Terminal Output */}
              <div className="terminal-output" ref={terminalRef}>
                <div className="terminal-text">
                  Welcome to NoWhile Contact Terminal v2.0{"\n"}
                  {terminalOutput}
                  {showCursor && <span className="terminal-cursor">█</span>}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="terminal-form"
                  >
                    <div className="form-grid">
                      <div className="form-field">
                        <div className="field-header">
                          <User className="w-4 h-4 text-cyan-400" />
                          <label className="field-label">Name</label>
                        </div>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="terminal-input"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="form-field">
                        <div className="field-header">
                          <Mail className="w-4 h-4 text-blue-400" />
                          <label className="field-label">Email</label>
                        </div>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="terminal-input"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <div className="field-header">
                        <MessageSquare className="w-4 h-4 text-green-400" />
                        <label className="field-label">Message</label>
                      </div>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project..."
                        className="terminal-input terminal-textarea"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-field">
                      <div className="field-header">
                        <Calculator className="w-4 h-4 text-purple-400" />
                        <label className="field-label">Security Check: {captchaQuestion.question}</label>
                      </div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="number"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleInputChange}
                        placeholder="Enter the answer"
                        className="terminal-input"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`terminal-submit-button ${isSubmitting ? "submitting" : ""}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-300 mb-6">Thank you for reaching out. I'll get back to you soon!</p>
                    <motion.button
                      onClick={resetForm}
                      className="terminal-submit-button success"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
