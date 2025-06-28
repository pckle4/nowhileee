"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Palette, Lightbulb, Rocket, Sparkles } from "lucide-react"

const steps = [
  { icon: Code, label: "Initializing", color: "text-cyan-400" },
  { icon: Palette, label: "Designing", color: "text-purple-400" },
  { icon: Lightbulb, label: "Innovating", color: "text-yellow-400" },
  { icon: Rocket, label: "Launching", color: "text-green-400" },
  { icon: Sparkles, label: "Perfecting", color: "text-pink-400" },
]

export default function Preloader() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepDuration = 600
    const totalSteps = steps.length

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500)
          return prev
        }
      })
    }, stepDuration)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2
        }
        clearInterval(progressInterval)
        return 100
      })
    }, 60)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  if (isComplete) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"
      >
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * window.innerWidth],
                y: [0, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* Main icon animation */}
          <motion.div
            className="mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-24 h-24 mx-auto relative">
              {steps.map((step, index) => {
                const Icon = step.icon
                const angle = (index / steps.length) * 360
                const isActive = index <= currentStep

                return (
                  <motion.div
                    key={index}
                    className={`absolute w-12 h-12 flex items-center justify-center rounded-full ${
                      isActive ? "bg-white/10" : "bg-white/5"
                    }`}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-40px)`,
                    }}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? step.color : "text-gray-500"}`} />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Current step label */}
          <motion.h2
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl font-bold text-white mb-4"
          >
            {steps[currentStep]?.label}
          </motion.h2>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-white/10 rounded-full mx-auto mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress percentage */}
          <motion.p
            className="text-gray-400 font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            {progress}%
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
