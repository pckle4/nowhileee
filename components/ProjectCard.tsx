"use client"

import { Github, ExternalLink, AlertCircle, CheckCircle, Wrench } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  status: "active" | "maintenance" | "archived"
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  status,
}: ProjectCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <CheckCircle size={16} className="text-terminal-green" />
      case "maintenance":
        return <Wrench size={16} className="text-neon-yellow" />
      case "archived":
        return <AlertCircle size={16} className="text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "text-terminal-green"
      case "maintenance":
        return "text-neon-yellow"
      case "archived":
        return "text-gray-500"
    }
  }

  return (
    <div className="terminal-window h-full">
      <div className="terminal-header">
        <div className="terminal-button bg-red-500"></div>
        <div className="terminal-button bg-yellow-500"></div>
        <div className="terminal-button bg-green-500"></div>
        <div className="flex items-center gap-2 ml-4">
          {getStatusIcon()}
          <span className={`text-sm font-mono ${getStatusColor()}`}>{status.toUpperCase()}</span>
        </div>
      </div>
      <div className="terminal-content h-full flex flex-col">
        <div className="text-terminal-green font-mono text-lg mb-3">{title}</div>
        <div className="text-gray-300 text-sm mb-4 flex-1">{description}</div>
        <div className="mb-4">
          <div className="text-terminal-green font-mono text-sm mb-2">TECH_STACK:</div>
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-terminal-green/10 border border-terminal-green/30 rounded text-xs font-mono text-terminal-green"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-3 border-t border-terminal-green/30">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-terminal-green transition-colors text-sm"
            >
              <Github size={16} />
              <span className="font-mono">CODE</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors text-sm"
            >
              <ExternalLink size={16} />
              <span className="font-mono">LIVE</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
