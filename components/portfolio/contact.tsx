"use client"

import { motion } from "framer-motion"

export function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto text-center"
      >
        <p className="text-primary font-mono text-sm mb-4">What&apos;s Next?</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Get In Touch
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          I&apos;m currently looking for new opportunities. Whether you have a question, 
          want to discuss a project, or just want to say hi, I&apos;ll do my best to get 
          back to you!
        </p>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center px-8 py-4 border border-primary text-primary rounded font-mono text-sm hover:bg-primary/10 transition-colors duration-300"
        >
          Say Hello
        </a>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-24 pt-8 border-t border-border text-center"
      >
        <p className="text-xs text-muted-foreground font-mono">
          Designed & Built by <span className="text-primary">Your Name</span>
        </p>
        <p className="text-xs text-muted-foreground font-mono mt-2">
          Built with Next.js, Tailwind CSS & Framer Motion
        </p>
      </motion.footer>
    </section>
  )
}
