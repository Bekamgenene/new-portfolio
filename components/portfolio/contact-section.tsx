"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedText } from "./animated-text";
import { useSettings } from "@/lib/settings-context";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  Linkedin,
  ExternalLink,
} from "lucide-react";

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

export function ContactSection() {
  const { contact, social, profile } = useSettings();

  const toSocialUrl = (
    raw: string,
    platform: "facebook" | "instagram" | "linkedin" | "telegram",
  ) => {
    const trimmed = (raw || "").trim();
    if (!trimmed) return "#";

    if (/^https?:\/\//i.test(trimmed)) return trimmed;

    // If user entered a domain/path (e.g. facebook.com/user), just add protocol.
    if (trimmed.includes(".")) {
      return `https://${trimmed.replace(/^www\./i, "www.")}`;
    }

    const value = trimmed
      .replace(/^@/, "")
      .replace(/^\/+/, "")
      .replace(/\/+$/, "");

    if (platform === "facebook") return `https://facebook.com/${value}`;
    if (platform === "instagram") return `https://instagram.com/${value}`;
    if (platform === "linkedin") return `https://linkedin.com/in/${value}`;
    return `https://t.me/${value}`;
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    { icon: MapPin, label: "Location", value: contact.location, href: "#" },
  ];

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: toSocialUrl(social.facebook, "facebook"),
      label: "Facebook",
    },
    {
      icon: InstagramIcon,
      href: toSocialUrl(social.instagram, "instagram"),
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: toSocialUrl(social.linkedin, "linkedin"),
      label: "LinkedIn",
    },
    {
      icon: TelegramIcon,
      href: toSocialUrl(social.telegram, "telegram"),
      label: "Telegram",
    },
  ];
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      window.dispatchEvent(new Event("messagesUpdated"));
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/3" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            {profile.contactHeading || "Get in Touch"}
          </motion.span>
          <AnimatedText
            text={profile.contactTitle || "Let's Work Together"}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold justify-center"
          />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {profile.contactDescription ||
              "Have a project in mind or just want to chat? Feel free to reach out."}
          </p>
        </ScrollReveal>

        {/* Main Content: Form on Left, Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* LEFT: Contact Form */}
          <ScrollReveal direction="left">
            <motion.form
              onSubmit={handleSubmit}
              className="relative h-full p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-card/30 border border-border/50 backdrop-blur-sm"
            >
              {/* Success message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="Full Name"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="Email Address"
                  />
                </div>

                {/* Message Details */}
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                    placeholder="Message Details"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-base hover:opacity-90 transition-all disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </ScrollReveal>

          {/* RIGHT: Direct Information */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="h-full flex flex-col">
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-6 sm:mb-8">
                Direct Information
              </h3>

              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-foreground text-base sm:text-lg break-all group-hover:text-cyan-400 transition-colors">
                      {item.value}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Location Map */}
              <motion.div
                className="relative z-0 flex-1 min-h-[200px] sm:min-h-[250px] rounded-xl sm:rounded-2xl overflow-hidden border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <iframe
                  src={
                    profile.contactMapEmbedUrl ||
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63068.32899373372!2d39.22437065!3d8.5403079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f4c4f4c9a0d%3A0x9bcf0dfc7d8a61d7!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
                <a
                  href={
                    profile.contactMapOpenUrl ||
                    "https://maps.google.com/maps?q=Adama,+Ethiopia"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 left-3 px-3 py-2 rounded-lg bg-card/95 backdrop-blur-sm border border-border/50 flex items-center gap-2 text-sm text-foreground hover:border-cyan-500/50 transition-all"
                >
                  Open in Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Social Links */}
              <div className="relative z-20 pointer-events-auto flex gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center flex-wrap">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all cursor-pointer pointer-events-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
