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
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <div className="bg-terminal-gray border border-terminal-green rounded-lg p-6 text-center">
        <div className="text-terminal-green text-2xl mb-4">✓</div>
        <div className="text-terminal-green font-mono">Message transmitted successfully!</div>
        <div className="text-gray-400 text-sm mt-2 font-mono">I'll get back to you soon.</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-terminal-gray border border-terminal-green/30 rounded-lg p-6">
      <div className="text-terminal-green font-mono mb-6 text-lg">CONTACT_FORM.EXE</div>

      <div className="space-y-4">
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
            className="w-full bg-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green font-mono focus:border-terminal-green outline-none"
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
            className="w-full bg-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green font-mono focus:border-terminal-green outline-none"
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
            rows={4}
            className="w-full bg-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green font-mono focus:border-terminal-green outline-none resize-none"
            placeholder="Enter your message..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-terminal-green text-black font-mono py-2 px-4 rounded hover:bg-terminal-green/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            TRANSMITTING...
          </>
        ) : (
          <>
            <Send size={16} />
            SEND_MESSAGE
          </>
        )}
      </button>
    </form>
  )
}
