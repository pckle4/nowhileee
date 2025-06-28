"use client"

import { useState, useEffect } from "react"

export default function TerminalPortfolio() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [systemStats, setSystemStats] = useState({
    cpu: 60,
    ram: 50,
    net: 92,
    gpu: 92,
  })

  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          return 100
        }
        return prev + 1
      })
    }, 100)

    // Animate system stats
    const statsInterval = setInterval(() => {
      setSystemStats((prev) => ({
        cpu: Math.max(50, Math.min(70, prev.cpu + (Math.random() - 0.5) * 10)),
        ram: Math.max(40, Math.min(60, prev.ram + (Math.random() - 0.5) * 8)),
        net: Math.max(85, Math.min(95, prev.net + (Math.random() - 0.5) * 5)),
        gpu: Math.max(85, Math.min(95, prev.gpu + (Math.random() - 0.5) * 5)),
      }))
    }, 2000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(loadingInterval)
      clearInterval(statsInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Info */}
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>IP: 192.168.1.1</span>
            <span>PROTOCOL: HTTPS</span>
            <span>ENCRYPTION: AES256</span>
            <span>SECURE</span>
          </div>
          <div className="flex justify-between">
            <span>PROTOCOL: HTTPS</span>
            <span>ANSH SHAH PORTFOLIO</span>
            <span>PORT: 443</span>
            <span>ON: 256</span>
          </div>
        </div>

        {/* Main Terminal Box */}
        <div className="border border-green-400 p-6 space-y-4">
          <div className="text-center space-y-2">
            <div className="text-lg font-bold">ANSH SHAH PORTFOLIO</div>
            <div className="text-sm">SYSTEM INITIALIZATION</div>
          </div>
        </div>

        {/* System Info */}
        <div className="text-xs text-center">0x1001008 0x1000001 0x1001011 0x1001011</div>

        {/* Loading Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>LOADING...</span>
            <span>{loadingProgress}%</span>
          </div>
          <div className="w-full bg-black border border-green-400 h-2">
            <div className="h-full bg-green-400 transition-all duration-100" style={{ width: `${loadingProgress}%` }} />
          </div>
        </div>

        {/* Command Prompt */}
        <div className="text-sm">
          <span className="text-white">root@ansh-portfolio:~$</span>
          <span className="animate-pulse">|</span>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div className="text-center">
            <div className="text-white">CPU</div>
            <div>{Math.round(systemStats.cpu)}%</div>
          </div>
          <div className="text-center">
            <div className="text-white">RAM</div>
            <div>{Math.round(systemStats.ram)}%</div>
          </div>
          <div className="text-center">
            <div className="text-white">NET</div>
            <div>{Math.round(systemStats.net)}%</div>
          </div>
          <div className="text-center">
            <div className="text-white">GPU</div>
            <div>{Math.round(systemStats.gpu)}%</div>
          </div>
        </div>

        {/* System Messages */}
        <div className="text-xs space-y-1">
          <div>[INFO] Establishing secure connection...</div>
          <div>[WARN] High creativity levels detected...</div>
          <div>[DEBUG] Loading awesome projects...</div>
        </div>
      </div>
    </div>
  )
}
