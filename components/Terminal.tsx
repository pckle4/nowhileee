"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTerminal } from "@/hooks/useTerminal"

export default function Terminal() {
  const [input, setInput] = useState("")
  const { lines, isProcessing, executeCommand } = useTerminal()
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isProcessing) {
      await executeCommand(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault()
    }
  }

  return (
    <div className="bg-black border border-terminal-green rounded-lg p-4 font-mono text-sm h-96 flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-terminal-green/30">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-terminal-green text-xs">terminal@portfolio:~$</span>
      </div>

      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4 space-y-1">
        <div className="text-terminal-green">Welcome to my portfolio terminal! Type 'help' for available commands.</div>
        {lines.map((line) => (
          <div
            key={line.id}
            className={`${
              line.type === "command"
                ? "text-neon-cyan"
                : line.type === "error"
                  ? "text-red-400"
                  : "text-terminal-green"
            }`}
          >
            {line.content}
          </div>
        ))}
        {isProcessing && (
          <div className="text-yellow-400 flex items-center gap-2">
            <span>Processing</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
              <div
                className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-neon-cyan">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-terminal-green outline-none caret-terminal-green"
          placeholder="Type a command..."
          disabled={isProcessing}
          autoFocus
        />
        <span className="text-terminal-green animate-blink">|</span>
      </form>
    </div>
  )
}
