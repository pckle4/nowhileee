"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading the resume
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    // Create a link to download the resume
    const link = document.createElement("a")
    link.href = "/ansh-shah-resume.pdf" // This would be your actual resume PDF path
    link.download = "Ansh-Shah-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <Header />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center font-inter">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Ansh Shah
              </span>
              {" - "}
              Resume
            </h1>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center font-inter"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </button>

              <Link
                href="/"
                className="px-6 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 font-inter"
              >
                Back to Portfolio
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="w-full h-[800px] bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-lg animate-pulse flex items-center justify-center border border-gray-200/50 dark:border-slate-700/50">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 font-inter">Loading resume...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50">
              {/* Resume Header */}
              <div className="p-8 border-b border-gray-200/50 dark:border-slate-700/50 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-700/50">
                <h2 className="text-3xl font-bold mb-2 font-inter">Ansh Shah</h2>
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-mono">theanshshah@gmail.com</span>
                  </div>
                  <a
                    href="https://linkedin.com/in/ansh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-cyan-500 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="font-mono">linkedin.com/in/ansh</span>
                  </a>
                  <a
                    href="https://github.com/ansh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-cyan-500 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="font-mono">github.com/ansh</span>
                  </a>
                </div>
              </div>

              {/* Resume Content */}
              <div className="p-8 space-y-8">
                {/* Education */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-slate-700/50 pb-2 font-inter">
                    Education
                  </h3>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-inter">
                          Sardar Vallabhbhai Patel Institute of Technology, Vasad
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                          Bachelor of Engineering in Computer Engineering
                        </p>
                        <p className="text-cyan-600 dark:text-cyan-400 font-medium">(CGPA: 8.74)</p>
                        <p className="text-gray-600 dark:text-gray-400">Vadodara, Gujarat</p>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">Sep. 2022 – Jun 2026</span>
                    </div>
                  </div>
                </div>

                {/* Relevant Coursework */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-slate-700/50 pb-2 font-inter">
                    Relevant Coursework
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      "Data Structures",
                      "Wordpress",
                      "Algorithms Analysis",
                      "Database Management",
                      "OOP",
                      "Computer Networks",
                      "DBMS",
                      "Computer Architecture",
                    ].map((course) => (
                      <div key={course} className="flex items-center text-gray-700 dark:text-gray-300 font-inter">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                        {course}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-slate-700/50 pb-2 font-inter">
                    Projects
                  </h3>

                  {/* Resume Generator */}
                  <div className="mb-8 p-6 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-inter">
                          Resume Generator
                        </h4>
                        <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs rounded-full font-mono">
                          Live Demo
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">January 2025</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 font-mono text-sm">
                      TypeScript, Shadcn, ReactJS
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 font-inter">
                      <li>
                        Developed a responsive resume generator web application using React, TypeScript, and Tailwind
                        CSS to enable users to create professional resumes with an intuitive interface and real-time
                        preview functionality.
                      </li>
                      <li>
                        Implemented dynamic form validation and state management to ensure data integrity while allowing
                        users to customize resume sections, formatting, and styling options seamlessly.
                      </li>
                      <li>
                        Designed a component-based architecture with reusable UI elements and modular TypeScript
                        interfaces to maintain code scalability and type safety throughout the application.
                      </li>
                      <li>
                        Deployed the application on Vercel with optimized build configuration and responsive design
                        principles, ensuring cross-device compatibility and fast loading times for enhanced user
                        experience.
                      </li>
                    </ul>
                  </div>

                  {/* P2P File Transfer */}
                  <div className="mb-8 p-6 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-inter">
                          P2P File Transfer app
                        </h4>
                        <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs rounded-full font-mono">
                          Live Demo
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">January 2025</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 font-mono text-sm">html, css, Javascript</p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 font-inter">
                      <li>
                        Developed a peer-to-peer file transfer application using vanilla JavaScript that enables secure
                        file sharing between users after establishing a direct connection.
                      </li>
                      <li>
                        Implemented real-time chat functionality alongside file transfer capabilities, allowing users to
                        communicate seamlessly during the file sharing process.
                      </li>
                      <li>
                        Built connection management system with vanilla JavaScript to handle peer-to-peer networking and
                        ensure reliable data transmission between connected users.
                      </li>
                    </ul>
                  </div>

                  {/* QR Code Generator */}
                  <div className="mb-8 p-6 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-inter">
                          Qr code Generator
                        </h4>
                        <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs rounded-full font-mono">
                          Live Demo
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">March 2025</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 font-mono text-sm">
                      React, Typescript, Tailwind CSS
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 font-inter">
                      <li>
                        Built a versatile QR code generator using React, TypeScript, and Tailwind CSS supporting
                        multiple data types including URLs, text, location coordinates, dates, and business contact
                        information.
                      </li>
                      <li>
                        Implemented dynamic QR code generation with real-time preview functionality, allowing users to
                        instantly visualize and customize QR codes for various use cases.
                      </li>
                      <li>
                        Designed responsive user interface with input validation and error handling to ensure seamless
                        QR code creation across different devices and screen sizes.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-slate-700/50 pb-2 font-inter">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 font-inter">Languages:</h4>
                      <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                        Python, Java, C, HTML/CSS, JavaScript, C++, SQL
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 font-inter">Developer Tools:</h4>
                      <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                        VS Code, Eclipse, Android Studio
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 font-inter">
                        Technologies/Frameworks:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                        Linux, Git, GitHub, WordPress
                      </p>
                    </div>
                  </div>
                </div>

                {/* Leadership / Extracurricular */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-slate-700/50 pb-2 font-inter">
                    Leadership / Extracurricular
                  </h3>
                  <div className="p-6 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-inter">MECIA Hacks</h4>
                        <p className="text-cyan-600 dark:text-cyan-400 font-medium">Technical Head</p>
                        <p className="text-gray-600 dark:text-gray-400">SVIT</p>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">Sep 2024</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mt-4 font-inter">
                      <li>
                        Served as Tech Head for Media Hacks, leading frontend development and overseeing technical
                        implementation of event management systems.
                      </li>
                      <li>
                        Developed QR code-based attendance tracking system with scanner functionality to automatically
                        log participant check-ins and check-outs.
                      </li>
                      <li>
                        Maintained comprehensive attendance records and participant data through automated QR code
                        scanning integration.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
