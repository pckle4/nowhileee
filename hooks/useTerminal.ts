"use client"

import { useState, useCallback } from "react"

interface TerminalCommand {
  command: string
  output: string
  timestamp: string
}

export function useTerminal() {
  const [history, setHistory] = useState<TerminalCommand[]>([
    {
      command: "whoami",
      output: "full-stack-developer",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      command: "ls -la",
      output:
        "drwxr-xr-x  projects/\ndrwxr-xr-x  skills/\ndrwxr-xr-x  contact/\n-rw-r--r--  about.txt\n-rw-r--r--  resume.pdf",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const executeCommand = useCallback((command: string) => {
    const timestamp = new Date().toLocaleTimeString()
    let output = ""

    switch (command.toLowerCase().trim()) {
      case "help":
        output =
          "Available commands:\n  help - Show this help message\n  about - Show about information\n  skills - List technical skills\n  projects - Show recent projects\n  contact - Display contact information\n  clear - Clear terminal\n  whoami - Display current user"
        break
      case "about":
        output =
          "Full Stack Developer with 5+ years of experience.\nSpecialized in React, Node.js, and cloud technologies.\nPassionate about clean code and user experience."
        break
      case "skills":
        output =
          "Frontend: React, TypeScript, Next.js, Tailwind CSS\nBackend: Node.js, Python, Express, FastAPI\nDatabase: PostgreSQL, MongoDB, Redis\nDevOps: Docker, AWS, Vercel"
        break
      case "projects":
        output =
          "Recent Projects:\n1. E-Commerce Platform - React, Node.js, PostgreSQL\n2. Task Management App - Next.js, TypeScript, Prisma\n3. AI Chat Bot - Python, FastAPI, OpenAI"
        break
      case "contact":
        output = "Email: contact@example.com\nGitHub: github.com/username\nLinkedIn: linkedin.com/in/username"
        break
      case "clear":
        setHistory([])
        return
      case "whoami":
        output = "full-stack-developer"
        break
      case "":
        return
      default:
        output = `Command not found: ${command}\nType 'help' for available commands.`
    }

    setHistory((prev) => [...prev, { command, output, timestamp }])
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return { history, executeCommand, clearHistory }
}
