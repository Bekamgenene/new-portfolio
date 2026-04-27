"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedText } from "./animated-text";
import {
  BadgeCheck,
  Brain,
  Code2,
  Cloud,
  Braces,
  Database,
  Wrench,
} from "lucide-react";
import { useSettings } from "@/lib/settings-context";

const panelAccent = [
  "from-white/10 to-transparent",
  "from-sky-500/25 to-transparent",
  "from-blue-500/25 to-transparent",
  "from-emerald-500/20 to-transparent",
];

const iconByCategory: Record<string, typeof Code2> = {
  "AI & Machine Learning": Brain,
  "Programming Language": Braces,
  Frontend: Code2,
  Backend: Code2,
  Database: Database,
  DevOps: Cloud,
  Mobile: Code2,
  "Tools & Others": Wrench,
  Other: Wrench,
};

const statusColorByLevel = {
  high: "text-emerald-400 bg-emerald-500/15",
  mid: "text-sky-400 bg-sky-500/15",
  low: "text-amber-400 bg-amber-500/15",
};

export function SkillsSection() {
  const { profile } = useSettings();

  const canonicalCategories = [
    "AI & Machine Learning",
    "Programming Language",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "Tools & Others",
    "Other",
  ];

  const normalizeCategory = (raw?: string) => {
    const value = (raw || "").trim();
    if (!value) return "Other";
    if (canonicalCategories.includes(value)) return value;
    if (value.toLowerCase() === "tools") return "Tools & Others";
    return value;
  };

  const skillItems = (profile.skillsList || [])
    .filter((item) => item.name)
    .map((item) => ({
      ...item,
      category: normalizeCategory(item.category),
      level: Number.isFinite(item.level)
        ? Math.min(100, Math.max(0, Number(item.level)))
        : 50,
    }));

  const technologies = Array.from(new Set(skillItems.map((item) => item.name)));

  const categories = Array.from(
    new Set(skillItems.map((item) => item.category)),
  );

  const categoryOrder = [
    "AI & Machine Learning",
    "Programming Language",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "Tools & Others",
    "Other",
  ];

  const orderedCategories = [...categories].sort((left, right) => {
    const leftIndex = categoryOrder.indexOf(left);
    const rightIndex = categoryOrder.indexOf(right);

    if (leftIndex === -1 && rightIndex === -1) return left.localeCompare(right);
    if (leftIndex === -1) return right === "Other" ? -1 : 1;
    if (rightIndex === -1) return left === "Other" ? 1 : -1;
    return leftIndex - rightIndex;
  });

  const fallbackGroups =
    categories.length > 0
      ? orderedCategories.map((title) => ({
          title,
          icon: iconByCategory[title] || Code2,
          skills: skillItems.filter((item) => item.category === title),
        }))
      : [
          {
            title: "Skills",
            icon: Code2,
            skills: skillItems,
          },
        ];

  const getRowStatusClass = (level: number) => {
    if (level >= 80) return statusColorByLevel.high;
    if (level >= 55) return statusColorByLevel.mid;
    return statusColorByLevel.low;
  };

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-card/30"
    >
      {/* Background */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            {profile.skillsHeading || "My Skills"}
          </motion.span>
          <AnimatedText
            text={profile.skillsTitle || "Technologies I Work With"}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold justify-center"
          />
        </ScrollReveal>

        {/* Technology chips */}
        <ScrollReveal className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full bg-muted/80 border border-border/50 text-sm text-muted-foreground cursor-default backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.06,
                  y: -3,
                  backgroundColor: "rgba(34, 211, 238, 0.1)",
                  borderColor: "rgba(34, 211, 238, 0.3)",
                  color: "#22d3ee",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills board */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {fallbackGroups.map((group, panelIndex) => {
            const GroupIcon = group.icon;
            const RowIcon = iconByCategory[group.title] || Code2;

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: panelIndex * 0.07 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-white/10 bg-black/60 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm"
              >
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b ${panelAccent[panelIndex % panelAccent.length]} opacity-45`}
                />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-white">
                      <GroupIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {group.title}
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {group.skills.map((skill, index) => (
                      <motion.div
                        key={`${group.title}-${skill.name}-${index}`}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 text-white/90">
                            <RowIcon className="h-4 w-4 text-white/55" />
                            <span className="text-base tracking-wide">
                              {skill.name}
                            </span>
                          </div>

                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${getRowStatusClass(skill.level)}`}
                            aria-label="skill status"
                          >
                            <BadgeCheck className="h-4 w-4" />
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-white/10" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
