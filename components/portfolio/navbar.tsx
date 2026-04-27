"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/lib/settings-context";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Articles", href: "#articles" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { profile } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const hasPublishedArticles = (
    (profile.articles || []) as Array<{
      status?: "published" | "draft";
    }>
  ).some((item) => (item.status || "published") === "published");

  const renderedNavItems = navItems.filter(
    (item) => item.href !== "#articles" || hasPublishedArticles,
  );

  // Split name into first and last
  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0]?.toUpperCase() || "BEKAM";
  const lastName = nameParts.slice(1).join(" ").toUpperCase() || "GENENE";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = renderedNavItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [renderedNavItems]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="group relative">
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-base sm:text-lg tracking-[0.15em] group-hover:text-cyan-400 transition-colors duration-300">
                {firstName}
              </span>
              <span className="text-cyan-400/70 font-light text-[10px] sm:text-xs tracking-[0.25em] uppercase">
                {lastName}
              </span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {renderedNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 group",
                  activeSection === item.href.slice(1)
                    ? "text-cyan-400"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-400 transition-all duration-300",
                    activeSection === item.href.slice(1)
                      ? "w-full"
                      : "w-0 group-hover:w-full",
                  )}
                />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-96 pb-4" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {renderedNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  activeSection === item.href.slice(1)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
