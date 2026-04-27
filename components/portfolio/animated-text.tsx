"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export function AnimatedText({
  text = "",
  className,
  once = true,
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = text?.split(" ") || [];

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-wrap overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mr-2 inline-block"
          style={{ perspective: "1000px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="relative inline-block">
        {text}
        <span
          className="absolute left-0 top-0 -ml-[2px] text-cyan-500 opacity-70 animate-pulse"
          style={{ clipPath: "inset(0 0 50% 0)" }}
          aria-hidden
        >
          {text}
        </span>
        <span
          className="absolute left-0 top-0 ml-[2px] text-pink-500 opacity-70 animate-pulse"
          style={{ clipPath: "inset(50% 0 0 0)", animationDelay: "0.1s" }}
          aria-hidden
        >
          {text}
        </span>
      </span>
    </div>
  );
}

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

export function TypewriterText({ words, className }: TypewriterTextProps) {
  return (
    <motion.div
      className={cn(
        "relative inline-flex items-center justify-center min-w-[140px] sm:min-w-[220px] md:min-w-[280px] h-[1.8em]",
        className,
      )}
    >
      {words.map((word, i) => (
        <motion.span
          key={word}
          className="absolute max-w-[85vw] text-center break-words whitespace-normal sm:whitespace-nowrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 4,
            delay: i * 4,
            repeat: Infinity,
            repeatDelay: (words.length - 1) * 4,
            times: [0, 0.1, 0.9, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
