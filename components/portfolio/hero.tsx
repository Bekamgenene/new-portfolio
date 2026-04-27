"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
]

export function Hero() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-mono text-sm mb-4">Hi, my name is</p>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2"
      >
        Your Name
      </motion.h1>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-muted-foreground mb-6"
      >
        I build things for the web.
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-muted-foreground max-w-xl text-lg leading-relaxed mb-8"
      >
        I&apos;m a software engineer specializing in building exceptional digital experiences. 
        Currently, I&apos;m focused on building accessible, human-centered products that make 
        a difference.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-4 mb-12"
      >
        <a
          href="#projects"
          className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded font-mono text-sm hover:bg-primary/10 transition-colors duration-300"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-sm hover:bg-primary/90 transition-colors duration-300"
        >
          Get In Touch
        </a>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex gap-5"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            aria-label={link.label}
          >
            <link.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
