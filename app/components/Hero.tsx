"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Mail, ExternalLink } from "lucide-react";

const roles = [
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "Golang Engineer",
  "API Architect",
  "AI Integration Specialist",
  "Systems Builder"
];

function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function useTypingAnimation(texts: string[], typingSpeed = 80, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? current.substring(0, displayText.length - 1)
              : current.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? typingSpeed / 2 : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, pauseDuration]);

  return displayText;
}

export default function Hero() {
  const typedText = useTypingAnimation(roles);
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-grid"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-teal/3 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-teal/5 border border-teal/10 text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inset-0 rounded-full bg-teal opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-teal" />
          </span>
          <span className="text-text-secondary">
            Available for <span className="text-teal">new opportunities</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-text-primary">Ananda</span>
          <br />
          <span className="text-gradient-teal">Purnomo</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 mb-8 font-mono text-lg md:text-xl"
        >
          <span className="text-teal">&gt;</span>
          <span className="text-text-secondary">{typedText}</span>
          <span className="cursor-blink text-teal font-bold">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          I turn complex problems into{" "}
          <span className="text-text-primary font-medium">elegant systems</span>.
          From database architecture to production deployment, I build it all,
          with <span className="text-teal">Golang + Javascript & AI</span> as my weapon of choice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <a
            href="#experience"
            className="group px-7 py-3.5 bg-teal text-bg font-semibold rounded-lg hover:bg-teal-light transition-all duration-200 flex items-center gap-2 glow-teal-sm hover:glow-teal"
          >
            Explore My Work
            <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 border border-border-light text-text-primary font-medium rounded-lg hover:border-teal/40 hover:bg-teal/5 transition-all duration-200"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-text-secondary"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            Jakarta, Indonesia
          </span>
          <a
            href="https://github.com/Keynandz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-teal transition-colors"
          >
            <GithubIcon size={13} />
            /Keynandz
          </a>
          <a
            href="mailto:nanpurnanda@gmail.com"
            className="flex items-center gap-1.5 hover:text-teal transition-colors"
          >
            <Mail size={13} />
            nanpurnanda@gmail.com
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-teal transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
