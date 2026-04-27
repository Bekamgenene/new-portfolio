"use client";

import Image from "next/image";
import { ArrowRight, Calendar, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedText } from "./animated-text";
import { useSettings } from "@/lib/settings-context";

type ArticleItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
  tags: string[];
  articleUrl?: string;
  sourceUrl?: string;
  status?: "published" | "draft";
};

export function ArticlesSection() {
  const { profile } = useSettings();

  const profileArticles = (
    (profile as { articles?: ArticleItem[] }).articles || []
  ).filter((item) => (item.status || "published") === "published");

  const articles = profileArticles;

  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      id="articles"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/3 w-[540px] h-[540px] bg-cyan-500/5 rounded-full blur-[130px]" />
      <div className="absolute bottom-0 right-0 w-[460px] h-[460px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          <AnimatedText
            text="Latest Articles"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold justify-center"
          />
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-white/80" />
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            Insights and thoughts on software engineering, machine learning, and
            the latest technology trends.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {articles.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-black/45 overflow-hidden shadow-[0_12px_34px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-44 sm:h-48">
                <Image
                  src={item.image || "/projects/dashboard.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="mt-3 text-lg sm:text-xl font-bold leading-snug">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${item.id}-${tag}`}
                      className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <motion.a
                    href={item.articleUrl || "#"}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  {(item.sourceUrl || "").trim() && (
                    <motion.a
                      href={item.sourceUrl}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Source
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
