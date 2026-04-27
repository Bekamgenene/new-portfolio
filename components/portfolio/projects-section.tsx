"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedText } from "./animated-text";
import { TiltCard } from "./tilt-card";
import { ExternalLink, Github, ArrowRight, Folder } from "lucide-react";
import Image from "next/image";

const categories = ["All", "AI/ML", "Web App", "UI/UX"];

const defaultProjects = [
  {
    id: 1,
    title: "AI Chat Assistant",
    description:
      "An intelligent chatbot powered by LangChain and OpenAI, capable of answering questions, generating content, and helping with various tasks.",
    image: "/projects/ecommerce.jpg",
    category: "AI/ML",
    technologies: ["Python", "LangChain", "OpenAI", "FastAPI", "React"],
    liveUrl: "#",
    githubUrl: "https://github.com/Bekamgenene",
    featured: true,
  },
  {
    id: 2,
    title: "Image Classification Model",
    description:
      "Deep learning model for image classification using TensorFlow and CNNs. Trained on custom datasets with high accuracy.",
    image: "/projects/dashboard.jpg",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas"],
    liveUrl: "#",
    githubUrl: "https://github.com/Bekamgenene",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Modern portfolio website with 3D animations, interactive elements, and smooth transitions showcasing my work and skills.",
    image: "/projects/social.jpg",
    category: "Web App",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://bekam-portfolio.vercel.app/",
    githubUrl: "https://github.com/Bekamgenene",
    featured: true,
  },
  {
    id: 4,
    title: "Sentiment Analysis Tool",
    description:
      "NLP-based sentiment analysis tool that analyzes text and social media posts to determine emotional tone and sentiment.",
    image: "/projects/dashboard.jpg",
    category: "AI/ML",
    technologies: ["Python", "NLTK", "Scikit-learn", "Flask", "React"],
    liveUrl: "#",
    githubUrl: "https://github.com/Bekamgenene",
    featured: false,
  },
  {
    id: 5,
    title: "Task Management Dashboard",
    description:
      "Full-stack task management application with user authentication, real-time updates, and team collaboration features.",
    image: "/projects/ecommerce.jpg",
    category: "Web App",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Bekamgenene",
    featured: false,
  },
  {
    id: 6,
    title: "UI/UX Design System",
    description:
      "A comprehensive design system with reusable components, design tokens, and documentation for consistent UI development.",
    image: "/projects/social.jpg",
    category: "UI/UX",
    technologies: ["Figma", "React", "Storybook", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Bekamgenene",
    featured: false,
  },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const readProjects = async () => {
      try {
        const response = await fetch("/api/portfolio-state", {
          cache: "no-store",
        });

        if (!response.ok) {
          setProjects(defaultProjects);
          return;
        }

        const data = (await response.json()) as {
          projects?: Array<{
            id: number;
            title: string;
            description: string;
            category: string;
            status: "published" | "draft";
            image?: string;
            githubUrl?: string;
            demoUrl?: string;
            technologies?: string[];
          }>;
        };

        const mapped = (data.projects || [])
          .filter((p) => p.status === "published")
          .map((p, index) => {
            const fallback = defaultProjects[index % defaultProjects.length];
            return {
              id: p.id,
              title: p.title,
              description: p.description,
              image: p.image || fallback.image,
              category: p.category,
              technologies:
                p.technologies && p.technologies.length
                  ? p.technologies
                  : fallback.technologies,
              liveUrl: p.demoUrl || fallback.liveUrl,
              githubUrl: p.githubUrl || fallback.githubUrl,
              featured: index < 3,
            };
          });

        setProjects(mapped.length ? mapped : defaultProjects);
      } catch {
        setProjects(defaultProjects);
      }
    };

    void readProjects();

    const handlePortfolioUpdate = () => {
      void readProjects();
    };

    window.addEventListener("portfolioStateUpdated", handlePortfolioUpdate);

    return () => {
      window.removeEventListener(
        "portfolioStateUpdated",
        handlePortfolioUpdate,
      );
    };
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "All" || project.category === activeCategory,
  );

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            My Work
          </motion.span>
          <AnimatedText
            text="Featured Projects"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold justify-center"
          />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for
            building digital products.
          </p>
        </ScrollReveal>

        {/* Category filters */}
        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeCategory === category
                  ? "text-white"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                  layoutId="activeCategory"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </ScrollReveal>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TiltCard
                  className="h-full group"
                  glareColor={
                    index % 3 === 0
                      ? "cyan"
                      : index % 3 === 1
                        ? "purple"
                        : "blue"
                  }
                >
                  <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Project image */}
                    <div className="relative h-52 overflow-hidden rounded-t-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                      {/* Featured badge */}
                      {project.featured && (
                        <motion.div
                          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-semibold text-white shadow-lg"
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Featured
                        </motion.div>
                      )}

                      {/* Hover overlay with buttons */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-purple-500/20 to-transparent flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredProject === project.id ? 0 : 20,
                            opacity: hoveredProject === project.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="View live site"
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredProject === project.id ? 0 : 20,
                            opacity: hoveredProject === project.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="View source code"
                        >
                          <Github className="w-5 h-5 text-white" />
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Project info */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* View project link */}
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                        whileHover={{ x: 5 }}
                      >
                        View Project
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </motion.a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more button */}
        <ScrollReveal className="text-center mt-16">
          <motion.a
            href="https://github.com/Bekamgenene"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-medium hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}
