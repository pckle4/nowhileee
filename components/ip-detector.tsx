"use client"

import { useState, useEffect } from "react"
import { X, Globe, MapPin, Wifi, Shield, Clock } from "lucide-react"

interface IPInfo {
  ip: string
  city: string
  region: string
  country: string
  timezone: string
  isp: string
  org: string
  as: string
}

interface IPDetectorProps {
  isOpen: boolean
  onClose: () => void
}

export default function IPDetector({ isOpen, onClose }: IPDetectorProps) {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && !ipInfo) {
      fetchIPInfo()
    }
  }, [isOpen, ipInfo])

  const fetchIPInfo = async () => {
    setLoading(true)
    setError(null)

    try {
      // Using a free IP API service
      const response = await fetch("https://ipapi.co/json/")
      if (!response.ok) throw new Error("Failed to fetch IP info")

      const data = await response.json()
      setIpInfo({
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        timezone: data.timezone,
        isp: data.org,
        org: data.org,
        as: data.asn,
      })
    } catch (err) {
      setError("Failed to fetch IP information")
      // Fallback mock data for demo
      setIpInfo({
        ip: "192.168.1.1",
        city: "Unknown",
        region: "Unknown",
        country: "Unknown",
        timezone: "UTC",
        isp: "Unknown ISP",
        org: "Unknown Organization",
        as: "AS0000",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-inter">Network Information</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">Your connection details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-gray-600 dark:text-gray-400 font-inter">Detecting network...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400 font-inter">{error}</p>
            </div>
          ) : ipInfo ? (
            <div className="space-y-4">
              {/* IP Address */}
              <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg">
                <Wifi className="w-5 h-5 text-cyan-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">IP Address</p>
                  <p className="font-mono text-gray-900 dark:text-white">{ipInfo.ip}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg">
                <MapPin className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">Location</p>
                  <p className="font-inter text-gray-900 dark:text-white">
                    {ipInfo.city}, {ipInfo.region}, {ipInfo.country}
                  </p>
                </div>
              </div>

              {/* Timezone */}
              <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg">
                <Clock className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">Timezone</p>
                  <p className="font-mono text-gray-900 dark:text-white">{ipInfo.timezone}</p>
                </div>
              </div>

              {/* ISP */}
              <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg">
                <Globe className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">Internet Provider</p>
                  <p className="font-inter text-gray-900 dark:text-white text-sm">{ipInfo.isp}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-inter">
            <Shield className="w-3 h-3" />
            <span>Your privacy is protected. Data is not stored.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
