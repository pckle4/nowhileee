"use client"

import type React from "react"

import { useState } from "react"
import { Send, Mail, User, MessageSquare } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })

    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-button bg-red-500"></div>
        <div className="terminal-button bg-yellow-500"></div>
        <div className="terminal-button bg-green-500"></div>
        <span className="text-terminal-green text-sm ml-4">contact_form.exe</span>
      </div>
      <div className="terminal-content">
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-terminal-green text-2xl mb-4">✓ MESSAGE_SENT</div>
            <div className="text-gray-400 font-mono">Thank you for your message! I'll get back to you soon.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-terminal-green font-mono mb-6">ESTABLISH_CONNECTION</div>

            <div>
              <label className="flex items-center gap-2 text-terminal-green font-mono text-sm mb-2">
                <User size={16} />
                NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green font-mono focus:border-terminal-green focus:outline-none"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-terminal-green font-mono text-sm mb-2">
                <Mail size={16} />
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green font-mono focus:border-terminal-green focus:outline-none"
                placeholder="Enter your email..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-terminal-green font-mono text-sm mb-2">
                <MessageSquare size={16} />
                MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green font-mono focus:border-terminal-green focus:outline-none resize-none"
                placeholder="Enter your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-terminal-green text-black font-mono py-3 px-6 rounded hover:bg-terminal-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  <Send size={16} />
                  SEND_MESSAGE
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
