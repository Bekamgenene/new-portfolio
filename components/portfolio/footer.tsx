"use client";

import { motion } from "framer-motion";
import { useSettings } from "@/lib/settings-context";
import { Mail, MapPin, Phone, Heart, ArrowUp, Linkedin } from "lucide-react";

// Custom SVG icons for social media
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const { contact, social, profile } = useSettings();

  const socialLinks = [
    { icon: FacebookIcon, href: social.facebook, label: "Facebook" },
    { icon: InstagramIcon, href: social.instagram, label: "Instagram" },
    { icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
    { icon: TelegramIcon, href: social.telegram, label: "Telegram" },
    { icon: GithubIcon, href: social.github, label: "GitHub" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 overflow-hidden border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.a
              href="#home"
              className="inline-block mb-6 group relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-2xl tracking-[0.15em] group-hover:text-cyan-400 transition-colors duration-300">
                  {profile.name.split(" ")[0]?.toUpperCase()}
                </span>
                <span className="text-cyan-400/70 font-light text-xs tracking-[0.25em] uppercase">
                  {profile.name.split(" ").slice(1).join(" ").toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 left-0 w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
            </motion.a>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {profile.bio}
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 sm:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/30 group-hover:bg-cyan-400 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 sm:mb-6">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-white/40 hover:text-cyan-400 transition-colors text-sm group break-all"
                >
                  <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 group-hover:border-cyan-500/30 flex items-center justify-center transition-colors flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-cyan-400/70 group-hover:text-cyan-400" />
                  </div>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 text-white/40 hover:text-cyan-400 transition-colors text-sm group break-all"
                >
                  <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 group-hover:border-cyan-500/30 flex items-center justify-center transition-colors flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-cyan-400/70 group-hover:text-cyan-400" />
                  </div>
                  {contact.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/40 text-sm break-words">
                  <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400/70" />
                  </div>
                  {contact.location}
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 sm:mb-6">
              {profile.footerConnectTitle || "Let's Connect"}
            </h4>
            <p className="text-white/40 text-sm mb-4">
              {profile.footerConnectDescription ||
                "Ready to start a project or just want to say hi? Feel free to reach out!"}
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {profile.footerConnectButtonLabel || "Get In Touch"}
              <Mail className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6 sm:mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-white/30 text-xs sm:text-sm flex items-center gap-1.5 text-center flex-wrap justify-center">
            &copy; {new Date().getFullYear()} {profile.name}. Made with
            <Heart className="w-3.5 h-3.5 text-cyan-500 fill-cyan-500 mx-0.5" />
            All rights reserved.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/30 hover:text-cyan-400 transition-colors text-xs sm:text-sm group"
            whileHover={{ y: -2 }}
          >
            <span className="tracking-wide">Back to top</span>
            <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
