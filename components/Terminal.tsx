"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTerminal } from "@/hooks/useTerminal"

export default function Terminal() {
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { history, executeCommand } = useTerminal()
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setIsTyping(true)
      executeCommand(input)
      setInput("")
      setTimeout(() => setIsTyping(false), 500)
    }
  }

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-button bg-red-500"></div>
        <div className="terminal-button bg-yellow-500"></div>
        <div className="terminal-button bg-green-500"></div>
        <span className="text-terminal-green text-sm ml-4">terminal.exe</span>
      </div>
      <div
        ref={terminalRef}
        className="terminal-content h-64 overflow-y-auto cursor-text"
        onClick={handleTerminalClick}
      >
        <div className="text-terminal-green mb-2">Welcome to Portfolio Terminal v1.0.0</div>
        <div className="text-gray-400 mb-4 text-sm">Type 'help' for available commands</div>

        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center gap-2 text-terminal-green">
              <span>user@portfolio:~$</span>
              <span>{entry.command}</span>
            </div>
            <div className="text-gray-300 whitespace-pre-line ml-4 text-sm">{entry.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-terminal-green">user@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-terminal-green outline-none font-mono"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="text-terminal-green animate-pulse">{isTyping ? "..." : "|"}</span>
        </form>
      </div>
    </div>
  )
}
