import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Terminal Portfolio | Full Stack Developer",
  description: "A cyberpunk-themed terminal portfolio showcasing full stack development skills",
  keywords: ["portfolio", "developer", "terminal", "cyberpunk", "full stack"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.className}>
      <body className="bg-terminal-dark text-terminal-green antialiased">{children}</body>
    </html>
  )
}
