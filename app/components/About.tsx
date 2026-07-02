"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Cpu, Shield } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealText from "./RevealText";

const stats = [
  { value: 15, suffix: "+", label: "Systems Built" },
  { value: 4302, suffix: "", label: "GitHub Contributions" },
  { value: 43, suffix: "", label: "Research & Docs" },
  { value: 3, suffix: "yrs", label: "Experience" },
];

const pillars = [
  {
    icon: Server,
    title: "Backend Architecture",
    desc: "Designing microservices and REST APIs that handle real-world scale with Golang.",
  },
  {
    icon: Code2,
    title: "Frontend & Full Stack",
    desc: "Building polished interfaces with Next.js and React, from concept to production.",
  },
  {
    icon: Cpu,
    title: "AI & Edge Computing",
    desc: "Bridging Python-based vision models with IoT hardware for real-time intelligence at the edge.",
  },
  {
    icon: Shield,
    title: "Security First",
    desc: "JWT, OAuth 2.0, rate limiting, and middleware patterns baked in from day one, not bolted on.",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-teal font-mono text-sm mb-2">// about me</p>
          <RevealText 
            text="The Engineer Behind the Code" 
            className="text-3xl md:text-5xl heading-elegant text-text-primary" 
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              At my core, I am a builder. I love taking a blank canvas and turning it into a{" "}
              <span className="text-text-primary font-medium">living, breathing system</span>. 
              While my comfort zone is building scalable backend architectures with Golang and PostgreSQL, 
              my curiosity constantly pushes me to explore everything from AI vision models to IoT edge computing.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              What really motivates me? It is the thrill of continuous learning and building things that{" "}
              <span className="text-teal font-medium">solve real-world problems</span>. Currently, I&apos;m diving deeper 
              into event-driven architectures and finding new ways to bridge the gap between software and physical hardware. 
              For me, it is not just about writing clean code, it is about the actual impact the product makes.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Beyond the screen, I thrive in environments where ideas flow freely. I&apos;m looking for a team that values{" "}
              <span className="text-text-primary font-medium">open communication, creative problem-solving, and a good sense of humor</span>. 
              If your team enjoys geeking out over system architecture and experimenting with new tech, 
              I would love to build something awesome together!
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-center p-4 rounded-xl glass-teal"
                >
                  <p className="text-2xl md:text-3xl font-bold text-teal">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="w-full"
              >
                <TiltCard className="group p-5 rounded-xl glass hover:border-teal/30 transition-all duration-300 relative">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-teal/10 text-teal shrink-0 group-hover:bg-teal/20 transition-colors">
                      <pillar.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
