"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedText } from "./animated-text";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useSettings } from "@/lib/settings-context";

const defaultExperiences = [
  {
    type: "work",
    title: "Machine Learning Intern",
    company: "CodeAlpha",
    location: "Remote",
    period: "2024 - Present",
    description:
      "Working on machine learning projects, developing AI models, and contributing to various web development tasks.",
    achievements: [
      "Developed ML models for data analysis",
      "Contributed to AI-powered applications",
      "Collaborated with global team members",
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
  },
  {
    type: "work",
    title: "Freelance Developer",
    company: "Self-Employed",
    location: "Ethiopia",
    period: "2023 - Present",
    description:
      "Building web applications and AI solutions for various clients, focusing on quality and user experience.",
    achievements: [
      "Delivered 10+ projects successfully",
      "Built AI-integrated applications",
      "Created modern responsive websites",
    ],
    technologies: ["Next.js", "Python", "Node.js", "Tailwind CSS"],
  },
  {
    type: "education",
    title: "BSc Computer Science & Engineering",
    company: "Adama Science and Technology University",
    location: "Adama, Ethiopia",
    period: "2022 - Present",
    description:
      "Pursuing Bachelor's degree with focus on AI, machine learning, and software engineering.",
    achievements: [
      "Strong academic performance",
      "Active in tech communities",
      "Multiple certifications earned",
    ],
    technologies: ["Python", "Java", "Data Structures", "Machine Learning"],
  },
  {
    type: "education",
    title: "AI & ML Certifications",
    company: "Elevvo Pathways & Others",
    location: "Online",
    period: "2023 - 2024",
    description:
      "Completed multiple certifications in AI fundamentals, building AI agents, and machine learning.",
    achievements: [
      "AI Fundamentals Certification",
      "Building AI Agents Certificate",
      "Machine Learning Track Completion",
    ],
    technologies: ["TensorFlow", "LangChain", "OpenAI", "Scikit-learn"],
  },
];

export function ExperienceSection() {
  const { profile } = useSettings();
  const [experiences, setExperiences] = useState(defaultExperiences);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const readExperiences = async () => {
      try {
        const response = await fetch("/api/portfolio-state", {
          cache: "no-store",
        });

        if (!response.ok) {
          setExperiences(defaultExperiences);
          return;
        }

        const data = (await response.json()) as {
          experiences?: Array<{
            id?: number;
            type?: "work" | "education" | "internship";
            role?: string;
            company?: string;
            location?: string;
            period?: string;
            description?: string;
            status?: "active" | "ended";
            achievements?: string[];
            technologies?: string[];
          }>;
        };

        const safeExperiences = Array.isArray(data.experiences)
          ? data.experiences
          : [];

        const mapped = safeExperiences.map((item, index) => ({
          type: item.type || "work",
          title: item.role || "Experience",
          company: item.company || "Organization",
          location: item.location || "",
          period: item.period || "",
          description: item.description || "",
          achievements: item.achievements || [],
          technologies: item.technologies || [],
          id: item.id ?? index + 1,
        }));

        setExperiences(mapped.length ? mapped : defaultExperiences);
      } catch {
        setExperiences(defaultExperiences);
      }
    };

    void readExperiences();

    const handlePortfolioUpdate = () => {
      void readExperiences();
    };

    window.addEventListener("portfolioStateUpdated", handlePortfolioUpdate);
    return () => {
      window.removeEventListener(
        "portfolioStateUpdated",
        handlePortfolioUpdate,
      );
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-card/30"
    >
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] translate-x-1/3" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            {profile.experienceHeading || "My Journey"}
          </motion.span>
          <AnimatedText
            text={profile.experienceTitle || "Experience & Education"}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold justify-center"
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-muted md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <ScrollReveal
                key={`${exp.title}-${index}`}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.1}
              >
                <div
                  className={`relative flex items-start gap-4 md:gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-0 md:left-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border-4 border-cyan-500 md:-translate-x-1/2 flex items-center justify-center z-10 shadow-lg shadow-cyan-500/20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1,
                    }}
                    whileHover={{ scale: 1.1, borderColor: "#a855f7" }}
                  >
                    {exp.type === "work" || exp.type === "internship" ? (
                      <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                    ) : (
                      <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                    )}

                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-cyan-500"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className={`ml-16 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-4" : "md:pl-4"}`}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative p-6 rounded-2xl bg-card/80 border border-border/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all group overflow-hidden">
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Type & period badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            exp.type === "work"
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                              : exp.type === "internship"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          }`}
                        >
                          {exp.type === "work" || exp.type === "internship" ? (
                            <Briefcase className="w-3 h-3" />
                          ) : (
                            <GraduationCap className="w-3 h-3" />
                          )}
                          {exp.type === "work"
                            ? "Work"
                            : exp.type === "internship"
                              ? "Internship"
                              : "Education"}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-cyan-400 transition-colors">
                        {exp.title}
                      </h3>

                      {/* Company */}
                      <div className="flex items-center gap-2 text-cyan-400 font-medium mb-1">
                        <span>{exp.company}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-2 mb-4">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
