"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedText } from "./animated-text";
import { TiltCard } from "./tilt-card";
import {
  ExternalLink,
  Award,
  Calendar,
  Building2,
  BadgeCheck,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import Image from "next/image";

const defaultCertificates = [
  {
    id: 1,
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SAA-C03-XXXXX",
    image: "/certificates/aws.jpg",
    color: "from-orange-500 to-yellow-500",
    skills: ["Cloud Architecture", "EC2", "S3", "Lambda", "VPC"],
    verifyUrl: "https://aws.amazon.com/verification",
  },
  {
    id: 2,
    title: "Google Cloud Developer",
    issuer: "Google Cloud",
    date: "2024",
    credentialId: "GCP-PCD-XXXXX",
    image: "/certificates/gcp.jpg",
    color: "from-blue-500 to-cyan-500",
    skills: ["GCP", "Kubernetes", "Cloud Run", "BigQuery"],
    verifyUrl: "https://cloud.google.com/certification",
  },
  {
    id: 3,
    title: "Meta Frontend Developer",
    issuer: "Meta",
    date: "2023",
    credentialId: "META-FE-XXXXX",
    image: "/certificates/meta.jpg",
    color: "from-blue-600 to-indigo-600",
    skills: ["React", "JavaScript", "UI/UX", "Testing"],
    verifyUrl: "https://www.coursera.org/verify",
  },
  {
    id: 4,
    title: "MongoDB Developer",
    issuer: "MongoDB University",
    date: "2023",
    credentialId: "MDB-DEV-XXXXX",
    image: "/certificates/mongodb.jpg",
    color: "from-green-500 to-emerald-500",
    skills: ["MongoDB", "NoSQL", "Aggregation", "Indexing"],
    verifyUrl: "https://university.mongodb.com",
  },
  {
    id: 5,
    title: "Kubernetes Administrator",
    issuer: "CNCF",
    date: "2023",
    credentialId: "CKA-XXXXX",
    image: "/certificates/kubernetes.jpg",
    color: "from-indigo-500 to-purple-500",
    skills: ["Kubernetes", "Docker", "Helm", "CI/CD"],
    verifyUrl: "https://www.cncf.io/certification",
  },
  {
    id: 6,
    title: "Professional Scrum Master",
    issuer: "Scrum.org",
    date: "2022",
    credentialId: "PSM-I-XXXXX",
    image: "/certificates/scrum.jpg",
    color: "from-cyan-500 to-teal-500",
    skills: ["Agile", "Scrum", "Sprint Planning", "Leadership"],
    verifyUrl: "https://www.scrum.org/certificates",
  },
];

export function CertificatesSection() {
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [certificates, setCertificates] = useState(defaultCertificates);
  const [selectedCert, setSelectedCert] = useState<
    (typeof defaultCertificates)[0] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const readCertificates = async () => {
      try {
        const response = await fetch("/api/portfolio-state", {
          cache: "no-store",
        });

        if (!response.ok) {
          setCertificates(defaultCertificates);
          return;
        }

        const data = (await response.json()) as {
          certificates?: Array<{
            id: number;
            title: string;
            issuer: string;
            date: string;
            status: "active" | "expired";
            image?: string;
            credentialId?: string;
            verifyUrl?: string;
            skills?: string[];
          }>;
        };

        const mapped = (data.certificates || [])
          .filter((c) => c.status === "active")
          .map((c, index) => {
            const fallback =
              defaultCertificates[index % defaultCertificates.length];
            return {
              id: c.id,
              title: c.title,
              issuer: c.issuer,
              date: c.date,
              credentialId: c.credentialId || fallback.credentialId,
              image: c.image || fallback.image,
              color: fallback.color,
              skills:
                Array.isArray(c.skills) && c.skills.length > 0
                  ? c.skills
                  : fallback.skills,
              verifyUrl: c.verifyUrl || fallback.verifyUrl,
            };
          });

        setCertificates(mapped.length ? mapped : defaultCertificates);
      } catch {
        setCertificates(defaultCertificates);
      }
    };

    void readCertificates();

    const handlePortfolioUpdate = () => {
      void readCertificates();
    };

    window.addEventListener("portfolioStateUpdated", handlePortfolioUpdate);

    return () => {
      window.removeEventListener(
        "portfolioStateUpdated",
        handlePortfolioUpdate,
      );
    };
  }, []);

  const nextCert = () => {
    const nextIndex = (currentIndex + 1) % certificates.length;
    setCurrentIndex(nextIndex);
    setSelectedCert(certificates[nextIndex]);
  };

  const prevCert = () => {
    const prevIndex =
      (currentIndex - 1 + certificates.length) % certificates.length;
    setCurrentIndex(prevIndex);
    setSelectedCert(certificates[prevIndex]);
  };

  const openModal = (cert: (typeof certificates)[0], index: number) => {
    setSelectedCert(cert);
    setCurrentIndex(index);
  };

  return (
    <section
      id="certificates"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            Credentials
          </motion.span>
          <AnimatedText
            text="Certificates & Achievements"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold justify-center"
          />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications that validate my expertise in
            cloud computing, development, and agile methodologies.
          </p>
        </ScrollReveal>

        {/* Certificates grid - same style as projects */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TiltCard
                  className="h-full group"
                  glareColor={
                    index % 3 === 0
                      ? "orange"
                      : index % 3 === 1
                        ? "cyan"
                        : "green"
                  }
                >
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHoveredCert(cert.id)}
                    onMouseLeave={() => setHoveredCert(null)}
                    onClick={() => openModal(cert, index)}
                  >
                    {/* Certificate image */}
                    <div className="relative h-52 overflow-hidden rounded-t-2xl">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                      {/* Verified badge */}
                      <motion.div
                        className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-xs font-semibold text-green-400 shadow-lg"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Verified
                      </motion.div>

                      {/* Year badge */}
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {cert.date}
                      </motion.div>

                      {/* Hover overlay with buttons */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-t ${cert.color} opacity-0 flex items-center justify-center gap-4`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCert === cert.id ? 0.3 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.div
                        className="absolute inset-0 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCert === cert.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredCert === cert.id ? 0 : 20,
                            opacity: hoveredCert === cert.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="View certificate"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </motion.button>
                        <motion.a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredCert === cert.id ? 0 : 20,
                            opacity: hoveredCert === cert.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Verify certificate"
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Certificate info */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full bg-gradient-to-r ${cert.color} bg-opacity-10 text-xs font-medium text-white`}
                        >
                          <span
                            className={`bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}
                          >
                            {cert.issuer}
                          </span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-orange-400 transition-colors">
                        {cert.title}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Building2 className="w-4 h-4" />
                        <span>{cert.issuer}</span>
                        <span className="text-muted-foreground/50">|</span>
                        <Calendar className="w-4 h-4" />
                        <span>{cert.date}</span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* View certificate link */}
                      <motion.button
                        className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors group/link"
                        whileHover={{ x: 5 }}
                      >
                        View Certificate
                        <Award className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
                      </motion.button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full View Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            {/* Navigation arrows */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                prevCert();
              }}
              className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                nextCert();
              }}
              className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.button>

            {/* Close button */}
            <motion.button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Certificate display */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate image frame */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${selectedCert.color} text-xs font-semibold text-white`}
                        >
                          {selectedCert.issuer}
                        </span>
                        <span className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-green-500/20 text-xs font-semibold text-green-400">
                          <BadgeCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          Verified
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                        {selectedCert.title}
                      </h2>
                      <p className="text-white/60 text-xs sm:text-sm font-mono">
                        ID: {selectedCert.credentialId}
                      </p>
                    </div>

                    <motion.a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r ${selectedCert.color} text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base w-full sm:w-auto flex-shrink-0`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify
                    </motion.a>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/10 text-xs sm:text-sm text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certificate counter */}
              <div className="flex justify-center gap-2 mt-6">
                {certificates.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setSelectedCert(certificates[idx]);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-8 bg-white"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
