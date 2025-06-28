"use client"

import { useState, useCallback } from "react"

export interface TerminalLine {
  id: string
  type: "command" | "output" | "error"
  content: string
  timestamp: Date
}

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const addLine = useCallback((content: string, type: TerminalLine["type"] = "output") => {
    const newLine: TerminalLine = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content,
      timestamp: new Date(),
    }
    setLines((prev) => [...prev, newLine])
  }, [])

  const clearTerminal = useCallback(() => {
    setLines([])
  }, [])

  const executeCommand = useCallback(
    async (command: string) => {
      setIsProcessing(true)
      addLine(`$ ${command}`, "command")

      // Simulate command processing
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Process different commands
      switch (command.toLowerCase().trim()) {
        case "help":
          addLine("Available commands:")
          addLine("  help     - Show this help message")
          addLine("  about    - Show information about me")
          addLine("  skills   - List my technical skills")
          addLine("  projects - Show my projects")
          addLine("  contact  - Get my contact information")
          addLine("  clear    - Clear the terminal")
          break
        case "about":
          addLine("Hi! I'm a Full Stack Developer passionate about creating")
          addLine("innovative web applications and solving complex problems.")
          break
        case "skills":
          addLine("Technical Skills:")
          addLine("• Frontend: React, Next.js, TypeScript, Tailwind CSS")
          addLine("• Backend: Node.js, Python, Express, FastAPI")
          addLine("• Database: PostgreSQL, MongoDB, Redis")
          addLine("• DevOps: Docker, AWS, Vercel, GitHub Actions")
          break
        case "projects":
          addLine("Featured Projects:")
          addLine("1. E-commerce Platform - Full-stack web application")
          addLine("2. Task Management App - React & Node.js")
          addLine("3. AI Chat Bot - Python & OpenAI API")
          break
        case "contact":
          addLine("Contact Information:")
          addLine("Email: contact@example.com")
          addLine("GitHub: github.com/username")
          addLine("LinkedIn: linkedin.com/in/username")
          break
        case "clear":
          clearTerminal()
          setIsProcessing(false)
          return
        default:
          addLine(`Command not found: ${command}`, "error")
          addLine('Type "help" for available commands')
      }

      setIsProcessing(false)
    },
    [addLine, clearTerminal],
  )

  return {
    lines,
    isProcessing,
    executeCommand,
    clearTerminal,
    addLine,
  }
}
