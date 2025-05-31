"use client"

import { useEffect, useRef } from "react"

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement[]>([])

  const projects = [
    {
      title: "QR Code Generator",
      description:
        "A modern QR code generator with customizable designs, colors, and formats. Built with React and Canvas API for high-quality output.",
      tech: ["React", "TypeScript", "Canvas API", "Tailwind CSS"],
      features: ["Custom Colors", "Multiple Formats", "Batch Generation", "Download Options"],
      gradient: "from-green-400 to-emerald-600",
      icon: "📱",
    },
    {
      title: "P2P File Transfer",
      description:
        "Secure peer-to-peer file sharing application using WebRTC for direct browser-to-browser transfers without server storage.",
      tech: ["WebRTC", "Node.js", "Socket.io", "React"],
      features: ["End-to-End Encryption", "No File Size Limit", "Real-time Progress", "Cross-Platform"],
      gradient: "from-blue-400 to-cyan-600",
      icon: "🔄",
    },
    {
      title: "Resume Generator",
      description:
        "AI-powered resume builder with multiple templates, real-time preview, and export options. Helps create professional resumes effortlessly.",
      tech: ["Next.js", "AI Integration", "PDF Generation", "MongoDB"],
      features: ["AI Suggestions", "Multiple Templates", "PDF Export", "ATS Optimization"],
      gradient: "from-purple-400 to-pink-600",
      icon: "📄",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    projectsRef.current.forEach((project) => {
      if (project) observer.observe(project)
    })

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      projectsRef.current.forEach((project) => {
        if (project) observer.unobserve(project)
      })
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white/80 dark:from-slate-900/50 dark:to-slate-800/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 font-inter">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter">
            Explore my latest work showcasing innovative solutions and cutting-edge technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => el && (projectsRef.current[index] = el)}
              className="group relative bg-white/90 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 shadow-lg hover:shadow-xl opacity-0 translate-y-8 duration-700 ease-out"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-4">{project.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 font-inter">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-inter">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-2 font-inter">
                    Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-slate-700/50 text-xs text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-slate-600/50 font-inter"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-2 font-inter">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-gray-600 dark:text-gray-300 flex items-center font-inter"
                      >
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-inter">
                    Live Demo
                  </button>
                  <button className="px-4 py-2 border border-cyan-500/50 text-cyan-600 dark:text-cyan-400 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 font-inter">
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
