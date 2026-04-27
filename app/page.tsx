"use client";

import { ParticlesBackground } from "@/components/portfolio/particles";
import { Navbar } from "@/components/portfolio/navbar";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { CertificatesSection } from "@/components/portfolio/certificates-section";
import { ArticlesSection } from "@/components/portfolio/articles-section";
import { Footer } from "@/components/portfolio/footer";
import { CustomCursor } from "@/components/portfolio/custom-cursor";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Custom cursor effect */}
      <CustomCursor />

      {/* Interactive Particles Background */}
      <ParticlesBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificatesSection />
        <ArticlesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
