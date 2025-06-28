"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function TerminalPortfolio() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showSystemStats, setShowSystemStats] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showCursor, setShowCursor] = useState(true)
  const [systemMessages, setSystemMessages] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  // System stats
  const [systemStats, setSystemStats] = useState({
    cpu: 88,
    ram: 94,
    net: 81,
    gpu: 94,
  })

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    // Loading progress simulation
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          setShowSystemStats(true)
          return 100
        }
        return prev + Math.random() * 3
      })
    }, 100)

    // System messages
    const messages = [
      "[INFO] Establishing secure connection...",
      "[WARN] High creativity levels detected...",
      "[DEBUG] Loading awesome projects...",
    ]

    let messageIndex = 0
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setSystemMessages((prev) => [...prev, messages[messageIndex]])
        messageIndex++
      } else {
        clearInterval(messageInterval)
      }
    }, 2000)

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate system stats fluctuation
    const statsInterval = setInterval(() => {
      setSystemStats((prev) => ({
        cpu: Math.max(80, Math.min(95, prev.cpu + (Math.random() - 0.5) * 4)),
        ram: Math.max(85, Math.min(98, prev.ram + (Math.random() - 0.5) * 2)),
        net: Math.max(75, Math.min(90, prev.net + (Math.random() - 0.5) * 6)),
        gpu: Math.max(88, Math.min(98, prev.gpu + (Math.random() - 0.5) * 3)),
      }))
    }, 1500)

    return () => {
      clearInterval(cursorInterval)
      clearInterval(loadingInterval)
      clearInterval(messageInterval)
      clearInterval(timeInterval)
      clearInterval(statsInterval)
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getProgressBar = (progress: number) => {
    const totalBars = 40
    const filledBars = Math.floor((progress / 100) * totalBars)
    const emptyBars = totalBars - filledBars
    return "█".repeat(filledBars) + "░".repeat(emptyBars)
  }

  const getStatBar = (percentage: number) => {
    const totalBars = 10
    const filledBars = Math.floor((percentage / 100) * totalBars)
    const emptyBars = totalBars - filledBars
    return "█".repeat(filledBars) + "░".repeat(emptyBars)
  }

  return (
    <div
      ref={terminalRef}
      className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-hidden"
      style={{ fontFamily: "Courier New, monospace" }}
    >
      {/* Header with IP and timestamp */}
      <div className="text-xs mb-8 opacity-70">
        <div className="flex justify-between">
          <span>IP: 192.168.1.100</span>
          <span>LOCATION: SECURE</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>PROTOCOL: HTTPS</span>
          <span>TIME: {formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Main terminal box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="border border-green-400 p-6 mb-8 max-w-2xl mx-auto"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl mb-2"
          >
            ANSH SHAH PORTFOLIO
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm">
            SYSTEM INITIALIZATION
          </motion.div>
        </div>
      </motion.div>

      {/* Hex numbers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs mb-8 opacity-60"
      >
        0x1A2B3C 0x4D5E6F 0x7G8H9I 0x1J2K3L
      </motion.div>

      {/* Loading bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span>LOADING...</span>
          <span>{Math.floor(loadingProgress)}%</span>
        </div>
        <div className="border border-green-400 p-1">
          <div className="font-mono text-xs">{getProgressBar(loadingProgress)}</div>
        </div>
      </motion.div>

      {/* Command prompt */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mb-8">
        <span className="text-green-300">root@ansh-portfolio:~$ </span>
        <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
      </motion.div>

      {/* System stats */}
      {showSystemStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto"
        >
          <div className="border border-green-400 p-3 text-center">
            <div className="text-sm mb-1">CPU</div>
            <div className="text-lg mb-1">{Math.floor(systemStats.cpu)}%</div>
            <div className="text-xs">{getStatBar(systemStats.cpu)}</div>
          </div>
          <div className="border border-green-400 p-3 text-center">
            <div className="text-sm mb-1">RAM</div>
            <div className="text-lg mb-1">{Math.floor(systemStats.ram)}%</div>
            <div className="text-xs">{getStatBar(systemStats.ram)}</div>
          </div>
          <div className="border border-green-400 p-3 text-center">
            <div className="text-sm mb-1">NET</div>
            <div className="text-lg mb-1">{Math.floor(systemStats.net)}%</div>
            <div className="text-xs">{getStatBar(systemStats.net)}</div>
          </div>
          <div className="border border-green-400 p-3 text-center">
            <div className="text-sm mb-1">GPU</div>
            <div className="text-lg mb-1">{Math.floor(systemStats.gpu)}%</div>
            <div className="text-xs">{getStatBar(systemStats.gpu)}</div>
          </div>
        </motion.div>
      )}

      {/* System messages */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="space-y-2">
        {systemMessages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5 + index * 0.5 }}
            className="text-sm"
          >
            {message}
          </motion.div>
        ))}
      </motion.div>

      {/* Matrix-style background effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent"></div>
      </div>
    </div>
  )
}
