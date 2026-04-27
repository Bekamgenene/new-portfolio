"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section id="about" className="py-16 lg:py-24 scroll-mt-16 lg:scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-foreground mb-8 lg:hidden"
      >
        About
      </motion.h2>

      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          I&apos;m a developer passionate about crafting accessible, pixel-perfect user 
          interfaces that blend thoughtful design with robust engineering. My favorite 
          work lies at the intersection of design and development, creating experiences 
          that not only look great but are meticulously built for performance and usability.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Currently, I&apos;m a Senior Front-End Engineer at{" "}
          <a
            href="https://example.com"
            className="font-medium text-foreground hover:text-primary transition-colors duration-300"
          >
            Company Name
          </a>
          , specializing in accessibility. I contribute to the creation and maintenance 
          of UI components that power our platform, ensuring it meets web accessibility 
          standards and best practices to deliver an inclusive user experience.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          In the past, I&apos;ve had the opportunity to develop software across a variety 
          of settings — from{" "}
          <span className="font-medium text-foreground">advertising agencies</span> and{" "}
          <span className="font-medium text-foreground">large corporations</span> to{" "}
          <span className="font-medium text-foreground">start-ups</span> and{" "}
          <span className="font-medium text-foreground">small digital product studios</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          In my spare time, I&apos;m usually climbing, reading, hanging out with my 
          family, or exploring new technologies and open-source projects.
        </motion.p>
      </div>
    </section>
  )
}
