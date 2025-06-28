"use client"

import { useState, useEffect } from "react"
import { Cpu, HardDrive, Wifi, Battery } from "lucide-react"

export default function SystemStats() {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    uptime: 0,
  })

  useEffect(() => {
    const updateStats = () => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 40) + 30,
        network: Math.floor(Math.random() * 20) + 80,
        uptime: Math.floor(Date.now() / 1000),
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="bg-black border border-terminal-green/30 rounded p-4">
      <div className="text-terminal-green font-mono mb-4 text-sm">SYSTEM_STATUS</div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-neon-cyan" />
            <span className="font-mono text-xs text-gray-400">CPU</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-gray-700 rounded">
              <div
                className="h-full bg-neon-cyan rounded transition-all duration-1000"
                style={{ width: `${stats.cpu}%` }}
              />
            </div>
            <span className="font-mono text-xs text-terminal-green">{stats.cpu}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive size={14} className="text-neon-purple" />
            <span className="font-mono text-xs text-gray-400">MEM</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-gray-700 rounded">
              <div
                className="h-full bg-neon-purple rounded transition-all duration-1000"
                style={{ width: `${stats.memory}%` }}
              />
            </div>
            <span className="font-mono text-xs text-terminal-green">{stats.memory}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-neon-green" />
            <span className="font-mono text-xs text-gray-400">NET</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-gray-700 rounded">
              <div
                className="h-full bg-neon-green rounded transition-all duration-1000"
                style={{ width: `${stats.network}%` }}
              />
            </div>
            <span className="font-mono text-xs text-terminal-green">{stats.network}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery size={14} className="text-neon-yellow" />
            <span className="font-mono text-xs text-gray-400">UPTIME</span>
          </div>
          <span className="font-mono text-xs text-terminal-green">{formatUptime(stats.uptime)}</span>
        </div>
      </div>
    </div>
  )
}
