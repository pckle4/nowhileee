"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Monitor, Smartphone, Globe, Wifi, Cpu } from "lucide-react"

interface DeviceInfo {
  ipv4: string
  device: string
  browser: string
  os: string
}

export default function IPDetector() {
  const [isVisible, setIsVisible] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDeviceInfo()
  }, [])

  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
      return "Mobile Device"
    }
    return "Desktop Computer"
  }

  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent
    if (userAgent.includes("Chrome")) return "Chrome"
    if (userAgent.includes("Firefox")) return "Firefox"
    if (userAgent.includes("Safari")) return "Safari"
    if (userAgent.includes("Edge")) return "Edge"
    return "Unknown Browser"
  }

  const getOSInfo = () => {
    const userAgent = navigator.userAgent
    if (userAgent.includes("Windows")) return "Windows"
    if (userAgent.includes("Mac")) return "macOS"
    if (userAgent.includes("Linux")) return "Linux"
    if (userAgent.includes("Android")) return "Android"
    if (userAgent.includes("iOS")) return "iOS"
    return "Unknown OS"
  }

  const fetchDeviceInfo = async () => {
    setLoading(true)

    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()

      setDeviceInfo({
        ipv4: data.ip,
        device: getDeviceType(),
        browser: getBrowserInfo(),
        os: getOSInfo(),
      })
    } catch (err) {
      setDeviceInfo({
        ipv4: "192.168.1.1",
        device: getDeviceType(),
        browser: getBrowserInfo(),
        os: getOSInfo(),
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="ip-detector-full-container">
      <div className="ip-detector-full-box">
        {/* Toggle Icon */}
        <button onClick={toggleVisibility} className="ip-detector-toggle-icon" aria-label="Toggle device information">
          {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </button>

        {/* Header */}
        <div className="ip-detector-full-header">
          <div className="ip-detector-animated-icon">
            <Globe className="w-4 h-4 text-emerald-500 animate-spin-slow" />
          </div>
          <span className="ip-detector-full-title">Network Monitor</span>
        </div>

        {/* Content */}
        <div className={`ip-detector-full-content ${!isVisible ? "blurred" : ""}`}>
          {loading ? (
            <div className="ip-detector-full-loading">
              <div className="loading-spinner-colorful" />
              <span>Scanning network...</span>
            </div>
          ) : deviceInfo ? (
            <div className="ip-detector-items">
              <div className="ip-detector-full-item">
                <div className="ip-detector-full-icon neon-blue">
                  <Wifi className="w-3 h-3 animate-pulse" />
                </div>
                <div className="ip-detector-full-info">
                  <span className="ip-detector-full-label">IPv4</span>
                  <span className="ip-detector-full-value">{deviceInfo.ipv4}</span>
                </div>
              </div>

              <div className="ip-detector-full-item">
                <div className="ip-detector-full-icon neon-purple">
                  {deviceInfo.device.includes("Mobile") ? (
                    <Smartphone className="w-3 h-3 animate-bounce-subtle" />
                  ) : (
                    <Monitor className="w-3 h-3 animate-float" />
                  )}
                </div>
                <div className="ip-detector-full-info">
                  <span className="ip-detector-full-label">Device</span>
                  <span className="ip-detector-full-value">{deviceInfo.device}</span>
                </div>
              </div>

              <div className="ip-detector-full-item">
                <div className="ip-detector-full-icon neon-orange">
                  <Globe className="w-3 h-3 animate-spin-slow" />
                </div>
                <div className="ip-detector-full-info">
                  <span className="ip-detector-full-label">Browser</span>
                  <span className="ip-detector-full-value">{deviceInfo.browser}</span>
                </div>
              </div>

              <div className="ip-detector-full-item">
                <div className="ip-detector-full-icon neon-green">
                  <Cpu className="w-3 h-3 animate-pulse" />
                </div>
                <div className="ip-detector-full-info">
                  <span className="ip-detector-full-label">OS</span>
                  <span className="ip-detector-full-value">{deviceInfo.os}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Status Indicator */}
        <div className="ip-detector-status">
          <div className="status-dot animate-pulse-glow"></div>
          <span className="status-text">Live</span>
        </div>
      </div>
    </div>
  )
}
