"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Monitor, Smartphone, Globe } from "lucide-react"

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
    if (isVisible && !deviceInfo) {
      fetchDeviceInfo()
    }
  }, [isVisible, deviceInfo])

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
      // Fallback for demo
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
    <div className="ip-detector-container">
      <button onClick={toggleVisibility} className="ip-detector-trigger" aria-label="Toggle device information">
        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

      {isVisible && (
        <div className="ip-detector-box">
          <div className="ip-detector-header">
            <Globe className="w-4 h-4 text-cyan-500" />
            <span className="ip-detector-title">Device Info</span>
          </div>

          {loading ? (
            <div className="ip-detector-loading">
              <div className="loading-spinner" />
              <span>Detecting...</span>
            </div>
          ) : deviceInfo ? (
            <div className="ip-detector-content">
              <div className="ip-detector-item">
                <div className="ip-detector-icon">
                  <Globe className="w-3 h-3" />
                </div>
                <div className="ip-detector-info">
                  <span className="ip-detector-label">IPv4</span>
                  <span className="ip-detector-value">{deviceInfo.ipv4}</span>
                </div>
              </div>

              <div className="ip-detector-item">
                <div className="ip-detector-icon">
                  {deviceInfo.device.includes("Mobile") ? (
                    <Smartphone className="w-3 h-3" />
                  ) : (
                    <Monitor className="w-3 h-3" />
                  )}
                </div>
                <div className="ip-detector-info">
                  <span className="ip-detector-label">Device</span>
                  <span className="ip-detector-value">{deviceInfo.device}</span>
                </div>
              </div>

              <div className="ip-detector-item">
                <div className="ip-detector-icon">
                  <Globe className="w-3 h-3" />
                </div>
                <div className="ip-detector-info">
                  <span className="ip-detector-label">Browser</span>
                  <span className="ip-detector-value">{deviceInfo.browser}</span>
                </div>
              </div>

              <div className="ip-detector-item">
                <div className="ip-detector-icon">
                  <Monitor className="w-3 h-3" />
                </div>
                <div className="ip-detector-info">
                  <span className="ip-detector-label">OS</span>
                  <span className="ip-detector-value">{deviceInfo.os}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
