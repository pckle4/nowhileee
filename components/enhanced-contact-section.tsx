"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  Calculator,
  Sparkles,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface FormData {
  name: string
  email: string
  message: string
  captcha: string
}

export default function EnhancedContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    captcha: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "$ Welcome to Ansh Shah's Contact Terminal",
    "$ System initialized successfully",
    "$ Ready to receive your message...",
    "$ Type your details below and hit send",
  ])
  const terminalRef = useRef<HTMLDivElement>(null)

  // Generate random math captcha
  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const operators = ["+", "-", "*"]
    const operator = operators[Math.floor(Math.random() * operators.length)]

    let answer = 0
    let question = ""

    switch (operator) {
      case "+":
        answer = num1 + num2
        question = `${num1} + ${num2}`
        break
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`
        break
      case "*":
        const smallNum1 = Math.floor(Math.random() * 10) + 1
        const smallNum2 = Math.floor(Math.random() * 10) + 1
        answer = smallNum1 * smallNum2
        question = `${smallNum1} × ${smallNum2}`
        break
    }

    setCaptchaQuestion({ question, answer })
  }

  const addToTerminal = (message: string) => {
    setTerminalOutput((prev) => [...prev, message])
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 100)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "name" && value) {
      addToTerminal(`$ Name field updated: ${value}`)
    } else if (field === "email" && value.includes("@")) {
      addToTerminal(`$ Email validated: ${value}`)
    } else if (field === "message" && value.length > 10) {
      addToTerminal(`$ Message length: ${value.length} characters`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate captcha
    if (Number.parseInt(formData.captcha) !== captchaQuestion.answer) {
      addToTerminal("$ ERROR: Incorrect captcha answer")
      generateCaptcha()
      setFormData((prev) => ({ ...prev, captcha: "" }))
      return
    }

    setIsSubmitting(true)
    addToTerminal("$ Processing form submission...")
    addToTerminal(`$ Name: ${formData.name}`)
    addToTerminal(`$ Email: ${formData.email}`)
    addToTerminal(`$ Message: ${formData.message.substring(0, 50)}...`)
    addToTerminal("$ Validating data...")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    addToTerminal("$ Message sent successfully!")
    addToTerminal("$ Thank you for reaching out!")
    addToTerminal("$ I will get back to you soon.")

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "", captcha: "" })
      setTerminalOutput([
        "$ Welcome to Ansh Shah's Contact Terminal",
        "$ System initialized successfully",
        "$ Ready to receive your message...",
        "$ Type your details below and hit send",
      ])
      generateCaptcha()
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ansh@example.com",
      color: "#06b6d4",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      color: "#10b981",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
      color: "#333",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
      color: "#0077b5",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com",
      color: "#1da1f2",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Get In Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Create Something
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Amazing Together</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your
            ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send Message</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <User className="w-5 h-5" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="pl-12 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300"
                            required
                          />
                        </motion.div>

                        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Mail className="w-5 h-5" />
                          </div>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="pl-12 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300"
                            required
                          />
                        </motion.div>
                      </div>

                      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                        <div className="absolute left-3 top-4 text-gray-400">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <Textarea
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="pl-12 min-h-[120px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                          required
                        />
                      </motion.div>

                      {/* Math Captcha */}
                      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Calculator className="w-5 h-5" />
                        </div>
                        <Input
                          type="number"
                          placeholder={`What is ${captchaQuestion.question}?`}
                          value={formData.captcha}
                          onChange={(e) => handleInputChange("captcha", e.target.value)}
                          className="pl-12 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-mono">
                          {captchaQuestion.question} = ?
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Thank you for reaching out. I'll get back to you soon!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terminal & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Terminal */}
            <Card className="bg-gray-900 border-gray-700 shadow-2xl overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-300 text-sm font-mono ml-4">contact-terminal</span>
              </div>
              <div ref={terminalRef} className="p-4 h-64 overflow-y-auto bg-black font-mono text-sm">
                {terminalOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-green-400 mb-1"
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-green-400"
                >
                  █
                </motion.span>
              </div>
            </Card>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-4 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${info.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{info.label}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{info.value}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg flex items-center justify-center group"
                  >
                    <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
