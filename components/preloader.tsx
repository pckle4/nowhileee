"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Palette, Lightbulb, Rocket, Sparkles } from "lucide-react"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: Code, text: "Initializing Code", color: "#00ffff" },
    { icon: Palette, text: "Loading Design", color: "#8b5cf6" },
    { icon: Lightbulb, text: "Generating Ideas", color: "#eab308" },
    { icon: Rocket, text: "Launching Experience", color: "#f97316" },
    { icon: Sparkles, text: "Adding Magic", color: "#ec4899" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 800)
          return prev
        }
      })
    }, 600)

    return () => clearInterval(timer)
  }, [])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 mx-auto relative">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index <= currentStep
                const angle = index * 72 - 90 // 360/5 = 72 degrees between each icon
                const radius = 40
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius

                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1 : 0.5,
                      opacity: isActive ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: isActive ? step.color : "rgba(255,255,255,0.1)",
                        boxShadow: isActive ? `0 0 20px ${step.color}` : "none",
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: isActive ? "white" : "#666" }} />
                    </div>
                  </motion.div>
                )
              })}

              {/* Center logo */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            <h2 className="text-2xl font-bold mb-2">{steps[currentStep]?.text}</h2>
            <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
