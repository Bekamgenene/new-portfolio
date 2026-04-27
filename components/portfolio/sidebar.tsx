"use client"

import { motion } from "framer-motion"
import { Navigation } from "./navigation"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
]

export function Sidebar() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <a href="/">Your Name</a>
          </h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
            Senior Frontend Engineer
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
            I build accessible, pixel-perfect digital experiences for the web.
          </p>
        </motion.div>

        <Navigation />
      </div>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex items-center gap-5"
        aria-label="Social media"
      >
        {socialLinks.map((link, index) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label={`${link.label} (opens in a new tab)`}
            >
              <link.icon className="w-6 h-6" />
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </header>
  )
}
