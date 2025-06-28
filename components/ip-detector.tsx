"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Monitor, Smartphone, Globe, Wifi, Shield, Zap, Copy, Check } from "lucide-react"

interface DeviceInfo {
  ipv4: string
  device: string
  browser: string
  os: string
  location: string
  isp: string
}

export default function IPDetector() {
  const [isVisible, setIsVisible] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showMinimal, setShowMinimal] = useState(true)

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
    if (userAgent.includes("Chrome")) return "Chrome Browser"
    if (userAgent.includes("Firefox")) return "Firefox Browser"
    if (userAgent.includes("Safari")) return "Safari Browser"
    if (userAgent.includes("Edge")) return "Edge Browser"
    return "Unknown Browser"
  }

  const getOSInfo = () => {
    const userAgent = navigator.userAgent
    if (userAgent.includes("Windows")) return "Windows OS"
    if (userAgent.includes("Mac")) return "macOS"
    if (userAgent.includes("Linux")) return "Linux OS"
    if (userAgent.includes("Android")) return "Android OS"
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
        location: "Location Hidden",
        isp: "ISP Protected",
      })
    } catch (err) {
      // Fallback for demo
      setDeviceInfo({
        ipv4: "192.168.1.1",
        device: getDeviceType(),
        browser: getBrowserInfo(),
        os: getOSInfo(),
        location: "Location Hidden",
        isp: "ISP Protected",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const toggleMinimal = () => {
    setShowMinimal(!showMinimal)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="ip-detector-container">
      <button onClick={toggleVisibility} className="ip-detector-trigger group" aria-label="Toggle device information">
        <div className="ip-detector-icon-wrapper">
          {isVisible ? (
            <EyeOff className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          )}
        </div>
        <span className="ip-detector-trigger-text">Device Inspector</span>
        <div className="ip-detector-pulse"></div>
      </button>

      {isVisible && (
        <div className="ip-detector-full-box">
          {/* Blurred Background Content */}
          <div className="ip-detector-blur-bg">
            <div className="blur-content">
              <div className="blur-item">
                <Shield className="w-6 h-6 text-blue-400 animate-pulse" />
                <span>Security Layer Active</span>
              </div>
              <div className="blur-item">
                <Wifi className="w-6 h-6 text-green-400 animate-bounce" />
                <span>Network Analysis</span>
              </div>
              <div className="blur-item">
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span>Real-time Monitoring</span>
              </div>
            </div>
          </div>

          {/* Top Control Button */}
          <button onClick={toggleMinimal} className="ip-detector-control" aria-label="Toggle view mode">
            {showMinimal ? <Eye className="w-4 h-4 text-cyan-400" /> : <EyeOff className="w-4 h-4 text-orange-400" />}
          </button>

          {/* Main Content */}
          <div className={`ip-detector-content ${showMinimal ? "minimal-view" : "full-view"}`}>
            <div className="ip-detector-header">
              <div className="header-icon">
                <Globe className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              </div>
              <span className="ip-detector-title">Network Inspector</span>
              <div className="status-indicator">
                <div className="status-dot animate-pulse"></div>
                <span>Active</span>
              </div>
            </div>

            {loading ? (
              <div className="ip-detector-loading">
                <div className="loading-container">
                  <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                  </div>
                  <div className="loading-bars">
                    <div className="bar bar-1"></div>
                    <div className="bar bar-2"></div>
                    <div className="bar bar-3"></div>
                  </div>
                </div>
                <span className="loading-text">Analyzing Network...</span>
              </div>
            ) : deviceInfo ? (
              <div className="ip-detector-data">
                {showMinimal ? (
                  // Minimal View - Only IP and Device
                  <div className="minimal-data">
                    <div className="data-item primary">
                      <div className="data-icon">
                        <Globe className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="data-info">
                        <span className="data-label">IPv4 Address</span>
                        <div className="data-value-container">
                          <span className="data-value">{deviceInfo.ipv4}</span>
                          <button
                            onClick={() => copyToClipboard(deviceInfo.ipv4)}
                            className="copy-button"
                            aria-label="Copy IP address"
                          >
                            {copied ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-400 hover:text-cyan-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="data-item">
                      <div className="data-icon">
                        {deviceInfo.device.includes("Mobile") ? (
                          <Smartphone className="w-4 h-4 text-purple-400" />
                        ) : (
                          <Monitor className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="data-info">
                        <span className="data-label">Device Type</span>
                        <span className="data-value">{deviceInfo.device}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Full View - All Information (Blurred for sensitive data)
                  <div className="full-data">
                    <div className="data-grid">
                      <div className="data-item primary">
                        <div className="data-icon animated">
                          <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
                        </div>
                        <div className="data-info">
                          <span className="data-label">IPv4 Address</span>
                          <div className="data-value-container">
                            <span className="data-value">{deviceInfo.ipv4}</span>
                            <button
                              onClick={() => copyToClipboard(deviceInfo.ipv4)}
                              className="copy-button"
                              aria-label="Copy IP address"
                            >
                              {copied ? (
                                <Check className="w-3 h-3 text-green-400" />
                              ) : (
                                <Copy className="w-3 h-3 text-gray-400 hover:text-cyan-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="data-item">
                        <div className="data-icon animated">
                          {deviceInfo.device.includes("Mobile") ? (
                            <Smartphone className="w-4 h-4 text-purple-400 animate-bounce" />
                          ) : (
                            <Monitor className="w-4 h-4 text-blue-400 animate-pulse" />
                          )}
                        </div>
                        <div className="data-info">
                          <span className="data-label">Device</span>
                          <span className="data-value">{deviceInfo.device}</span>
                        </div>
                      </div>

                      <div className="data-item">
                        <div className="data-icon animated">
                          <Globe className="w-4 h-4 text-orange-400 animate-spin-slow" />
                        </div>
                        <div className="data-info">
                          <span className="data-label">Browser</span>
                          <span className="data-value">{deviceInfo.browser}</span>
                        </div>
                      </div>

                      <div className="data-item">
                        <div className="data-icon animated">
                          <Shield className="w-4 h-4 text-red-400 animate-pulse" />
                        </div>
                        <div className="data-info">
                          <span className="data-label">Operating System</span>
                          <span className="data-value">{deviceInfo.os}</span>
                        </div>
                      </div>

                      {/* Sensitive Information - Blurred */}
                      <div className="data-item sensitive blurred">
                        <div className="data-icon animated">
                          <Wifi className="w-4 h-4 text-yellow-400 animate-bounce" />
                        </div>
                        <div className="data-info">
                          <span className="data-label">Location</span>
                          <span className="data-value blurred-text">{deviceInfo.location}</span>
                        </div>
                        <div className="privacy-badge">
                          <Shield className="w-3 h-3" />
                          <span>Protected</span>
                        </div>
                      </div>

                      <div className="data-item sensitive blurred">
                        <div className="data-icon animated">
                          <Zap className="w-4 h-4 text-indigo-400 animate-pulse" />
                        </div>
                        <div className="data-info">
                          <span className="data-label">ISP</span>
                          <span className="data-value blurred-text">{deviceInfo.isp}</span>
                        </div>
                        <div className="privacy-badge">
                          <Shield className="w-3 h-3" />
                          <span>Protected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
