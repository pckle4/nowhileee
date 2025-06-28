"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"

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
  const [isHovered, setIsHovered] = useState(false)

  const statusColors = {
    active: "text-green-400",
    maintenance: "text-yellow-400",
    archived: "text-red-400",
  }

  return (
    <div
      className="bg-terminal-gray border border-terminal-green/30 rounded-lg p-6 hover:border-terminal-green/60 transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-terminal-green font-mono text-lg font-bold">{title}</h3>
        <div className={`text-xs font-mono ${statusColors[status]} uppercase`}>[{status}]</div>
      </div>

      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-terminal-green/10 text-terminal-green px-2 py-1 rounded border border-terminal-green/30 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-terminal-green transition-colors text-sm font-mono"
          >
            <Github size={16} />
            <span>source</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors text-sm font-mono"
          >
            <ExternalLink size={16} />
            <span>live</span>
          </a>
        )}
      </div>

      {isHovered && <div className="absolute inset-0 bg-terminal-green/5 rounded-lg pointer-events-none" />}
    </div>
  )
}
