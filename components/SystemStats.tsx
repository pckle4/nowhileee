"use client"

import { useState, useEffect } from "react"

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
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 10) + 85,
        uptime: Math.floor(Date.now() / 1000),
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="bg-terminal-gray border border-terminal-green/30 rounded p-4 font-mono text-xs">
      <div className="text-terminal-green mb-2">SYSTEM STATUS</div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">CPU:</span>
          <span className="text-terminal-green">{stats.cpu}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">MEM:</span>
          <span className="text-terminal-green">{stats.memory}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">NET:</span>
          <span className="text-terminal-green">{stats.network}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">UP:</span>
          <span className="text-terminal-green">{formatUptime(stats.uptime)}</span>
        </div>
      </div>
    </div>
  )
}
