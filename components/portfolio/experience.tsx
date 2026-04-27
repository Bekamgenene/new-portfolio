"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useSettings } from "@/lib/settings-context";

const experiences = [
  {
    period: "2024 — Present",
    title: "Senior Frontend Engineer",
    company: "Tech Company",
    companyUrl: "https://example.com",
    description:
      "Build and maintain critical components used to construct frontend interfaces. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    period: "2022 — 2024",
    title: "Full Stack Developer",
    company: "Startup Inc",
    companyUrl: "https://example.com",
    description:
      "Developed and shipped highly interactive web applications for diverse clients. Interfaced with clients on a regular basis, providing expertise and recommendations for technical solutions.",
    technologies: ["React", "Node.js", "PostgreSQL", "GraphQL", "AWS"],
  },
  {
    period: "2020 — 2022",
    title: "Software Engineer",
    company: "Digital Agency",
    companyUrl: "https://example.com",
    description:
      "Collaborated with other developers and designers to create clean, user-friendly interfaces. Wrote modern, performant, maintainable code for a diverse array of client projects.",
    technologies: ["JavaScript", "React", "SCSS", "WordPress", "PHP"],
  },
  {
    period: "2019 — 2020",
    title: "Junior Developer",
    company: "Web Studio",
    companyUrl: "https://example.com",
    description:
      "Assisted in the development of various web projects, gaining hands-on experience with modern web technologies. Participated in code reviews and team meetings to learn industry best practices.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Git"],
  },
];

export function Experience() {
  const { profile } = useSettings();
  const cvDownloadUrl = profile.cvUrl || "/resume.pdf";
  const cvDownloadHref = `/api/download?url=${encodeURIComponent(cvDownloadUrl)}&filename=${encodeURIComponent(profile.cvFileName || `${profile.name.replace(/\s/g, "_")}_CV.pdf`)}`;

  return (
    <section id="experience" className="py-16 lg:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-foreground mb-12 lg:hidden"
      >
        Experience
      </motion.h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative grid sm:grid-cols-8 gap-4 p-4 -mx-4 rounded-lg hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
          >
            <div className="sm:col-span-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
              {exp.period}
            </div>
            <div className="sm:col-span-6">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  {exp.title} · {exp.company}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <a
          href={cvDownloadHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary font-medium transition-colors duration-300 group"
        >
          View Full Resume
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </a>
      </motion.div>
    </section>
  );
}
