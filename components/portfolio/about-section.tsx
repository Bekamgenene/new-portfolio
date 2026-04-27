"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { AnimatedText } from "./animated-text";
import { TiltCard } from "./tilt-card";
import { Code2, Palette, Lightbulb, Rocket } from "lucide-react";
import { useSettings } from "@/lib/settings-context";
import Image from "next/image";

const defaultStats = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Projects Done" },
  { value: "1+", label: "Satisfied Clients" },
  { value: "18+", label: "Technologies" },
];

const defaultHighlights = [
  { title: "Clean Code", description: "Writing maintainable, scalable code" },
  { title: "UI/UX Focus", description: "Creating beautiful user experiences" },
  { title: "Problem Solver", description: "Turning ideas into solutions" },
  { title: "Fast Delivery", description: "Efficient project completion" },
];

const highlightVisuals = [
  { icon: Code2, color: "cyan" },
  { icon: Palette, color: "purple" },
  { icon: Lightbulb, color: "blue" },
  { icon: Rocket, color: "pink" },
];

export function AboutSection() {
  const { profile } = useSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const aboutParagraphs =
    profile.aboutParagraphs && profile.aboutParagraphs.length
      ? profile.aboutParagraphs
      : [profile.bio];
  const stats =
    profile.aboutStats && profile.aboutStats.length
      ? profile.aboutStats
      : defaultStats;
  const highlights =
    profile.aboutHighlights && profile.aboutHighlights.length
      ? profile.aboutHighlights
      : defaultHighlights;

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        style={{ y }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            {profile.aboutHeading || "About Me"}
          </motion.span>
          <AnimatedText
            text={
              profile.aboutTitle ||
              "Passionate Developer Creating Digital Excellence"
            }
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold justify-center text-balance"
          />
        </ScrollReveal>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24">
          {/* Animated image side */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-6 rounded-full border-2 border-dashed border-purple-500/30"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-12 rounded-full border-2 border-dashed border-blue-500/30"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Center content */}
                <div className="absolute inset-16 rounded-full overflow-hidden border-4 border-cyan-500/50 bg-gradient-to-br from-secondary to-card flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                  {profile.profileImage ? (
                    <Image
                      src={profile.profileImage}
                      alt={profile.name || "Profile image"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <motion.span
                      className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{ backgroundSize: "200% auto" }}
                    >
                      BG
                    </motion.span>
                  )}
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-2 right-4 sm:right-8 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card/90 border border-cyan-500/30 backdrop-blur-sm shadow-lg text-sm sm:text-base"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-cyan-400 font-bold">AI Engineer</span>
                </motion.div>
                <motion.div
                  className="absolute bottom-12 sm:bottom-8 left-0 sm:-left-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card/90 border border-purple-500/30 backdrop-blur-sm shadow-lg text-sm sm:text-base"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  <span className="text-purple-400 font-bold">
                    App devoloper
                  </span>
                </motion.div>
                <motion.div
                  className="absolute top-1/2 right-0 sm:-right-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card/90 border border-blue-500/30 backdrop-blur-sm shadow-lg text-sm sm:text-base"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <span className="text-blue-400 font-bold">Full Stack</span>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6">
              {aboutParagraphs.map((paragraph, index) => (
                <p
                  key={`${paragraph.slice(0, 20)}-${index}`}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              {/* Animated stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative p-4 rounded-2xl bg-card/50 border border-border text-center group hover:border-cyan-500/30 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Highlights grid with tilt cards */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const visual = highlightVisuals[index % highlightVisuals.length];
            return (
              <StaggerItem key={item.title}>
                <TiltCard glareColor={visual.color} className="h-full">
                  <div className="p-6">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${visual.color}-500/20 to-${visual.color}-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <visual.icon
                        className={`w-7 h-7 text-${visual.color}-400`}
                      />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
