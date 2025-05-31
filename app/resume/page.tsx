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
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
      <Header />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Ansh Shah
              </span>
              {" - "}
              Resume
            </h1>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
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
                className="px-6 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                Back to Portfolio
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="w-full h-[800px] bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading resume...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
              {/* Resume Header */}
              <div className="p-8 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-2">Ansh Shah</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Full Stack Developer</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    contact@nowhile.com
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    nowhile.com
                  </div>
                </div>
              </div>

              {/* Resume Content */}
              <div className="p-8">
                {/* Summary */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">
                    Professional Summary
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Full Stack Developer with expertise in modern web technologies including React, Next.js, Node.js,
                    and cloud services. Passionate about creating efficient, scalable, and user-friendly applications
                    with clean code and best practices. Experienced in leading development teams and delivering projects
                    on time and within scope.
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">
                    Work Experience
                  </h3>

                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Senior Full Stack Developer</h4>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Jan 2022 - Present</span>
                    </div>
                    <p className="text-cyan-600 dark:text-cyan-400 mb-2">NoWhile Technologies</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Led development of QR code generator application with React and Node.js</li>
                      <li>Architected and implemented P2P file transfer solution using WebRTC</li>
                      <li>Created resume generator tool with PDF export capabilities</li>
                      <li>Managed team of 5 developers across multiple projects</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Full Stack Developer</h4>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Mar 2019 - Dec 2021</span>
                    </div>
                    <p className="text-cyan-600 dark:text-cyan-400 mb-2">Tech Innovations Inc.</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Developed and maintained multiple client-facing web applications</li>
                      <li>Implemented responsive designs and improved site performance by 40%</li>
                      <li>Integrated third-party APIs and payment gateways</li>
                      <li>Collaborated with design team to implement UI/UX improvements</li>
                    </ul>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">
                    Technical Skills
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Frontend</h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                        <li>React, Next.js, Vue.js</li>
                        <li>TypeScript, JavaScript (ES6+)</li>
                        <li>HTML5, CSS3, Tailwind CSS</li>
                        <li>Redux, Context API, React Query</li>
                        <li>Responsive Design, Accessibility</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Backend</h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                        <li>Node.js, Express, NestJS</li>
                        <li>MongoDB, PostgreSQL, Redis</li>
                        <li>GraphQL, REST API Design</li>
                        <li>AWS, Firebase, Vercel</li>
                        <li>Docker, CI/CD, Testing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">
                    Education
                  </h3>

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        Bachelor of Science in Computer Science
                      </h4>
                      <span className="text-sm text-gray-600 dark:text-gray-400">2015 - 2019</span>
                    </div>
                    <p className="text-cyan-600 dark:text-cyan-400">University of Technology</p>
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
