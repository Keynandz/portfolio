"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#activity", label: "Activity" },
  { href: "#skills", label: "Tech Stack" },
  { href: "#experience", label: "Journey" },
  { href: "#highlights", label: "Highlights" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const rawProgress = max > 0 ? window.scrollY / max : 0;
        setProgress(Math.max(0, Math.min(1, rawProgress)));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-2xl shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="relative group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
            <span className="text-teal font-mono text-sm font-bold">A</span>
          </div>
          <span className="font-semibold text-text-primary hidden sm:block">
            ananda<span className="text-teal">.</span>dev
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-4 py-2 text-sm text-text-secondary hover:text-teal transition-colors rounded-lg hover:bg-teal/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="ml-3 px-5 py-2 text-sm font-medium rounded-lg bg-teal text-bg hover:bg-teal-light transition-colors"
          >
            Let&apos;s Talk
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-secondary hover:text-teal transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/95 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-text-secondary hover:text-teal transition-colors py-2"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="mt-2 px-5 py-3 text-sm font-medium rounded-lg bg-teal text-bg text-center"
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-teal via-teal-light to-teal transition-[width] duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </motion.nav>
  );
}
