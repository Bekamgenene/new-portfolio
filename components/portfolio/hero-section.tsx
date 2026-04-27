"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Hero3D } from "./hero-3d";
import { MagneticButton } from "./magnetic-button";
import { TypewriterText } from "./animated-text";
import { useSettings } from "@/lib/settings-context";

export function HeroSection() {
  const { profile, social, contact } = useSettings();

  // Extract first name from profile name
  const firstName = profile.name.split(" ")[0];
  const cvDownloadUrl = profile.cvUrl || "/cv/resume.pdf";
  const cvDownloadHref = `/api/download?url=${encodeURIComponent(cvDownloadUrl)}&filename=${encodeURIComponent(profile.cvFileName || `${profile.name.replace(/\s/g, "_")}_CV.pdf`)}`;

  const socialLinks = [
    { icon: Github, href: social.github, label: "GitHub" },
    { icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
  ];
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Hero3D />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-10" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 z-[5] opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Name with elegant effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
        >
          <span className="text-white/90">Hi, I&apos;m </span>
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400">
              {firstName}
            </span>
            <motion.span
              className="absolute -inset-4 bg-cyan-500/20 blur-3xl -z-10 rounded-full"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.h1>

        {/* Typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 flex flex-wrap items-center justify-center"
        >
          <span className="text-white/50 mr-2">I&apos;m a </span>
          <TypewriterText
            words={[
              "AI Engineer",
              "Full Stack Developer",
              "Machine Learning Expert",
              "Problem Solver",
            ]}
            className="text-cyan-400 font-semibold"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          {profile.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-10 sm:mb-16 px-4"
        >
          <MagneticButton href="#projects">View My Work</MagneticButton>
          <a
            href={cvDownloadHref}
            download={`${profile.name.replace(/\s/g, "_")}_CV.pdf`}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border border-white/10 hover:border-cyan-500/50 text-white font-medium rounded-xl transition-all duration-300 hover:bg-cyan-500/5"
          >
            <Download className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
            <span className="group-hover:text-cyan-400 transition-colors">
              Download CV
            </span>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-3"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-11 h-11 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <span className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <social.icon className="relative z-10 w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/30 hover:text-cyan-400 transition-colors group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-cyan-500/50 flex items-start justify-center p-1.5 transition-colors">
            <motion.div
              className="w-1 h-1.5 bg-white/50 group-hover:bg-cyan-400 rounded-full transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
