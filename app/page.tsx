"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MatrixRain from "@/components/MatrixRain"
import Terminal from "@/components/Terminal"
import GlitchText from "@/components/GlitchText"
import SystemStats from "@/components/SystemStats"
import ProjectCard from "@/components/ProjectCard"
import SkillBar from "@/components/SkillBar"
import ContactForm from "@/components/ContactForm"
import { useTypewriter } from "@/hooks/useTypewriter"
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Smartphone } from "lucide-react"

export default function Home() {
  const [currentSection, setCurrentSection] = useState("boot")
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  const bootText = useTypewriter("INITIALIZING PORTFOLIO SYSTEM...", 100)

  useEffect(() => {
    // Update time
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // Boot sequence
    const bootTimer = setTimeout(() => {
      setIsLoaded(true)
      setCurrentSection("main")
    }, 3000)

    return () => {
      clearInterval(timeInterval)
      clearTimeout(bootTimer)
    }
  }, [])

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      status: "active" as const,
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      status: "active" as const,
    },
    {
      title: "AI Chat Bot",
      description:
        "Intelligent chatbot powered by OpenAI API with context awareness and natural language processing capabilities.",
      technologies: ["Python", "FastAPI", "OpenAI", "Redis", "Docker"],
      githubUrl: "https://github.com",
      status: "maintenance" as const,
    },
  ]

  const skills = [
    { skill: "React", level: 95, category: "frontend" },
    { skill: "TypeScript", level: 90, category: "frontend" },
    { skill: "Next.js", level: 88, category: "frontend" },
    { skill: "Node.js", level: 85, category: "backend" },
    { skill: "Python", level: 80, category: "backend" },
    { skill: "PostgreSQL", level: 85, category: "database" },
    { skill: "MongoDB", level: 75, category: "database" },
    { skill: "Docker", level: 80, category: "devops" },
    { skill: "AWS", level: 70, category: "devops" },
  ]

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <MatrixRain />
        <div className="text-center z-10">
          <div className="text-terminal-green font-mono text-2xl mb-8">
            <GlitchText text="PORTFOLIO.EXE" />
          </div>
          <div className="text-terminal-green font-mono text-lg mb-4">{bootText}</div>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-terminal-dark relative">
      <MatrixRain />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-terminal-green/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-terminal-green font-mono font-bold text-xl">
            <GlitchText text="PORTFOLIO.SYS" />
          </div>
          <nav className="hidden md:flex gap-6">
            {["about", "projects", "skills", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`font-mono text-sm uppercase transition-colors ${
                  currentSection === section ? "text-terminal-green" : "text-gray-400 hover:text-terminal-green"
                }`}
              >
                [{section}]
              </button>
            ))}
          </nav>
          <div className="text-terminal-green font-mono text-sm">{currentTime}</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 relative z-10">
        <AnimatePresence mode="wait">
          {currentSection === "main" && (
            <motion.section
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-12"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Hero Section */}
                <div className="lg:col-span-2">
                  <div className="terminal-window mb-8">
                    <div className="terminal-header">
                      <div className="terminal-button bg-red-500"></div>
                      <div className="terminal-button bg-yellow-500"></div>
                      <div className="terminal-button bg-green-500"></div>
                      <span className="text-terminal-green text-sm ml-4">user@portfolio:~$</span>
                    </div>
                    <div className="terminal-content">
                      <div className="text-terminal-green text-3xl font-bold mb-4">
                        <GlitchText text="FULL STACK DEVELOPER" />
                      </div>
                      <div className="text-gray-300 mb-6">
                        <p className="mb-4">{"> Initializing developer profile..."}</p>
                        <p className="mb-4">{"> Loading expertise in modern web technologies..."}</p>
                        <p className="mb-4">{"> Passionate about creating innovative solutions and clean code."}</p>
                        <p className="text-terminal-green">{"> System ready. Welcome to my digital portfolio."}</p>
                      </div>
                      <div className="flex gap-4">
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-terminal-green transition-colors"
                        >
                          <Github size={20} />
                          <span className="font-mono">github</span>
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors"
                        >
                          <Linkedin size={20} />
                          <span className="font-mono">linkedin</span>
                        </a>
                        <a
                          href="mailto:contact@example.com"
                          className="flex items-center gap-2 text-gray-400 hover:text-neon-pink transition-colors"
                        >
                          <Mail size={20} />
                          <span className="font-mono">email</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Terminal */}
                  <Terminal />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <SystemStats />

                  <div className="bg-terminal-gray border border-terminal-green/30 rounded p-4">
                    <div className="text-terminal-green font-mono mb-4">QUICK_ACCESS</div>
                    <div className="space-y-2">
                      {[
                        { icon: Code, label: "Projects", section: "projects" },
                        { icon: Database, label: "Skills", section: "skills" },
                        { icon: Mail, label: "Contact", section: "contact" },
                        { icon: ExternalLink, label: "Resume", section: "resume" },
                      ].map(({ icon: Icon, label, section }) => (
                        <button
                          key={section}
                          onClick={() => setCurrentSection(section)}
                          className="w-full flex items-center gap-3 text-gray-400 hover:text-terminal-green transition-colors p-2 rounded hover:bg-terminal-green/10"
                        >
                          <Icon size={16} />
                          <span className="font-mono text-sm">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === "about" && (
            <motion.section
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-12"
            >
              <div className="terminal-window max-w-4xl mx-auto">
                <div className="terminal-header">
                  <div className="terminal-button bg-red-500"></div>
                  <div className="terminal-button bg-yellow-500"></div>
                  <div className="terminal-button bg-green-500"></div>
                  <span className="text-terminal-green text-sm ml-4">about.exe</span>
                </div>
                <div className="terminal-content">
                  <div className="text-terminal-green text-2xl font-bold mb-6">
                    <GlitchText text="ABOUT_ME.TXT" />
                  </div>
                  <div className="space-y-4 text-gray-300">
                    <p>{"> Full Stack Developer with 5+ years of experience building scalable web applications."}</p>
                    <p>{"> Specialized in React, Node.js, and cloud technologies."}</p>
                    <p>{"> Passionate about clean code, performance optimization, and user experience."}</p>
                    <p>{"> Always learning new technologies and staying up-to-date with industry trends."}</p>
                    <div className="mt-8">
                      <div className="text-terminal-green mb-4">EXPERTISE:</div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Smartphone size={16} className="text-neon-cyan" />
                            <span className="font-mono">Frontend Development</span>
                          </div>
                          <div className="text-sm text-gray-400 ml-6">React, Next.js, TypeScript, Tailwind CSS</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Server size={16} className="text-terminal-green" />
                            <span className="font-mono">Backend Development</span>
                          </div>
                          <div className="text-sm text-gray-400 ml-6">Node.js, Python, Express, FastAPI</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Database size={16} className="text-neon-purple" />
                            <span className="font-mono">Database Management</span>
                          </div>
                          <div className="text-sm text-gray-400 ml-6">PostgreSQL, MongoDB, Redis</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Code size={16} className="text-neon-pink" />
                            <span className="font-mono">DevOps & Cloud</span>
                          </div>
                          <div className="text-sm text-gray-400 ml-6">Docker, AWS, Vercel, GitHub Actions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === "projects" && (
            <motion.section
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-12"
            >
              <div className="text-center mb-12">
                <div className="text-terminal-green text-3xl font-bold font-mono mb-4">
                  <GlitchText text="PROJECTS.DIR" />
                </div>
                <div className="text-gray-400 font-mono">{"> Showcasing my latest work and contributions"}</div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {currentSection === "skills" && (
            <motion.section
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-12"
            >
              <div className="text-center mb-12">
                <div className="text-terminal-green text-3xl font-bold font-mono mb-4">
                  <GlitchText text="SKILLS.JSON" />
                </div>
                <div className="text-gray-400 font-mono">{"> Technical proficiency and expertise levels"}</div>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="terminal-window">
                    <div className="terminal-header">
                      <div className="terminal-button bg-red-500"></div>
                      <div className="terminal-button bg-yellow-500"></div>
                      <div className="terminal-button bg-green-500"></div>
                      <span className="text-terminal-green text-sm ml-4">frontend.skills</span>
                    </div>
                    <div className="terminal-content">
                      {skills
                        .filter((skill) => skill.category === "frontend")
                        .map((skill) => (
                          <SkillBar key={skill.skill} {...skill} />
                        ))}
                    </div>
                  </div>
                  <div className="terminal-window">
                    <div className="terminal-header">
                      <div className="terminal-button bg-red-500"></div>
                      <div className="terminal-button bg-yellow-500"></div>
                      <div className="terminal-button bg-green-500"></div>
                      <span className="text-terminal-green text-sm ml-4">backend.skills</span>
                    </div>
                    <div className="terminal-content">
                      {skills
                        .filter((skill) => skill.category === "backend")
                        .map((skill) => (
                          <SkillBar key={skill.skill} {...skill} />
                        ))}
                    </div>
                  </div>
                  <div className="terminal-window">
                    <div className="terminal-header">
                      <div className="terminal-button bg-red-500"></div>
                      <div className="terminal-button bg-yellow-500"></div>
                      <div className="terminal-button bg-green-500"></div>
                      <span className="text-terminal-green text-sm ml-4">database.skills</span>
                    </div>
                    <div className="terminal-content">
                      {skills
                        .filter((skill) => skill.category === "database")
                        .map((skill) => (
                          <SkillBar key={skill.skill} {...skill} />
                        ))}
                    </div>
                  </div>
                  <div className="terminal-window">
                    <div className="terminal-header">
                      <div className="terminal-button bg-red-500"></div>
                      <div className="terminal-button bg-yellow-500"></div>
                      <div className="terminal-button bg-green-500"></div>
                      <span className="text-terminal-green text-sm ml-4">devops.skills</span>
                    </div>
                    <div className="terminal-content">
                      {skills
                        .filter((skill) => skill.category === "devops")
                        .map((skill) => (
                          <SkillBar key={skill.skill} {...skill} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === "contact" && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-12"
            >
              <div className="text-center mb-12">
                <div className="text-terminal-green text-3xl font-bold font-mono mb-4">
                  <GlitchText text="CONTACT.EXE" />
                </div>
                <div className="text-gray-400 font-mono">{"> Establish connection and send message"}</div>
              </div>
              <div className="max-w-2xl mx-auto">
                <ContactForm />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-terminal-green/30 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 font-mono text-sm mb-4 md:mb-0">
              © 2024 Portfolio.sys - All rights reserved
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-mono text-sm">Built with Next.js & TypeScript</span>
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
