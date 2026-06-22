"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Cpu, Shield } from "lucide-react";

const stats = [
  { value: 15, suffix: "+", label: "Systems Built" },
  { value: 4302, suffix: "", label: "GitHub Commits" },
  { value: 6, suffix: "+", label: "AI Projects" },
  { value: 3, suffix: "yrs", label: "Experience" },
];

const pillars = [
  {
    icon: Server,
    title: "Backend Architecture",
    desc: "Designing microservices and REST APIs that handle real-world scale with Golang and Echo.",
  },
  {
    icon: Code2,
    title: "Full Lifecycle Dev",
    desc: "From ERD sketches to production deploys, I own the entire pipeline, not just a slice of it.",
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
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary">
            The Engineer Behind the Code
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              I don&apos;t just write code, I{" "}
              <span className="text-text-primary font-medium">architect systems</span>.
              Every project I take on starts from a blank canvas: mapping entities,
              designing schemas, choosing the right protocol, and building APIs
              that other engineers actually enjoy consuming.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              My core loop is{" "}
              <span className="text-teal font-medium">Golang + PostgreSQL + Docker</span>,
              but I&apos;m equally comfortable training object detection models in
              Python, wiring up MQTT sensors on an OrangePi, or setting up a
              VoIP stack with Asterisk.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              What drives me? Shipping things that{" "}
              <span className="text-text-primary font-medium">actually run in production</span>{""},
              not just passing code review.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-surface border border-border"
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
                className="group p-5 rounded-xl bg-surface border border-border hover:border-teal/30 transition-all duration-300"
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
