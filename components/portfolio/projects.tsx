"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Folder } from "lucide-react"
import Image from "next/image"

const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with modern web technologies for optimal performance and user experience.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "AI-Powered Dashboard",
    description:
      "An intelligent analytics dashboard that leverages machine learning to provide actionable insights. Features real-time data visualization, predictive analytics, and automated reporting.",
    image: "/projects/dashboard.jpg",
    technologies: ["React", "Python", "TensorFlow", "D3.js", "AWS"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Social Media App",
    description:
      "A modern social networking application with real-time messaging, content sharing, and community features. Designed with accessibility and performance in mind.",
    image: "/projects/social.jpg",
    technologies: ["React Native", "Node.js", "Socket.io", "MongoDB", "Redis"],
    github: "https://github.com",
    live: "https://example.com",
  },
]

const otherProjects = [
  {
    title: "Weather Application",
    description: "A beautiful weather app with 7-day forecasts, location-based weather data, and animated weather icons.",
    technologies: ["React", "OpenWeather API", "Geolocation"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Task Management Tool",
    description: "A Kanban-style project management tool with drag-and-drop functionality and team collaboration features.",
    technologies: ["Vue.js", "Firebase", "Vuex"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Portfolio Generator",
    description: "A CLI tool that generates beautiful portfolio websites from a simple configuration file.",
    technologies: ["Node.js", "EJS", "Commander.js"],
    github: "https://github.com",
  },
  {
    title: "Markdown Editor",
    description: "A minimalist markdown editor with live preview, syntax highlighting, and export options.",
    technologies: ["TypeScript", "CodeMirror", "React"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "API Rate Limiter",
    description: "A middleware package for implementing rate limiting in Node.js applications with Redis support.",
    technologies: ["Node.js", "Redis", "Express"],
    github: "https://github.com",
  },
  {
    title: "Chrome Extension",
    description: "A productivity Chrome extension that blocks distracting websites and tracks time spent on tasks.",
    technologies: ["JavaScript", "Chrome APIs", "Storage API"],
    github: "https://github.com",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-foreground mb-12 lg:hidden"
      >
        Projects
      </motion.h2>

      {/* Featured Projects */}
      <div className="space-y-24">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative grid lg:grid-cols-12 gap-4 items-center"
          >
            {/* Project Image */}
            <div
              className={`lg:col-span-7 relative aspect-video rounded-lg overflow-hidden bg-secondary ${
                index % 2 === 0 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Project Info */}
            <div
              className={`lg:col-span-5 ${
                index % 2 === 0 ? "lg:order-2 lg:text-right" : "lg:order-1"
              }`}
            >
              <p className="text-primary font-mono text-sm mb-2">Featured Project</p>
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <div className="relative z-10 p-6 rounded-lg bg-secondary text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </div>
              <ul
                className={`flex flex-wrap gap-3 text-xs font-mono text-muted-foreground mb-4 ${
                  index % 2 === 0 ? "lg:justify-end" : ""
                }`}
              >
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div
                className={`flex gap-4 ${index % 2 === 0 ? "lg:justify-end" : ""}`}
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24"
      >
        <h3 className="text-2xl font-bold text-foreground text-center mb-12">
          Other Noteworthy Projects
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group p-6 rounded-lg bg-secondary hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <Folder className="w-10 h-10 text-primary" />
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                {project.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
