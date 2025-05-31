"use client"

import { useEffect, useRef } from "react"

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement[]>([])

  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 80 },
        { name: "GSAP", level: 85 },
      ],
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express", level: 88 },
        { name: "Python", level: 85 },
        { name: "MongoDB", level: 82 },
        { name: "PostgreSQL", level: 80 },
        { name: "GraphQL", level: 75 },
      ],
      gradient: "from-green-400 to-emerald-600",
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      skills: [
        { name: "Docker", level: 85 },
        { name: "AWS", level: 80 },
        { name: "Git", level: 95 },
        { name: "Linux", level: 82 },
        { name: "Nginx", level: 78 },
        { name: "CI/CD", level: 75 },
      ],
      gradient: "from-purple-400 to-pink-600",
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
    categoriesRef.current.forEach((category) => {
      if (category) observer.observe(category)
    })

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      categoriesRef.current.forEach((category) => {
        if (category) observer.unobserve(category)
      })
    }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-900/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 font-inter">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter">
            Proficient in modern technologies and frameworks for building scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              ref={(el) => el && (categoriesRef.current[categoryIndex] = el)}
              className="bg-white/90 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 shadow-lg hover:shadow-xl opacity-0 translate-y-8 duration-700 ease-out"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              {/* Header */}
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-3">{category.icon}</div>
                <h3
                  className={`text-xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent font-inter`}
                >
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium font-inter">{skill.name}</span>
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold font-inter">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`skill-bar h-full bg-gradient-to-r ${category.gradient} rounded-full transform origin-left transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          transitionDelay: `${categoryIndex * 200 + skillIndex * 100}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
