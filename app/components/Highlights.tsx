"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Eye, Database, Network, Cpu, BookOpen } from "lucide-react";

const highlights = [
  {
    icon: Zap,
    title: "15+ Production Systems",
    desc: "Designed, built, and deployed complete backend systems, from database schema to Docker deployment, handling real business traffic.",
    tags: ["Go", "PostgreSQL", "Docker"],
  },
  {
    icon: Eye,
    title: "AI Vision at the Edge",
    desc: "Trained YOLO-based object detection models and deployed them on IoT edge devices (Firefly, OrangePi) with Frigate NVR for real-time analytics.",
    tags: ["Python", "YOLO", "IoT"],
  },
  {
    icon: Database,
    title: "Query Optimization Wins",
    desc: "Systematically reduced query execution time on high-traffic services through indexing strategies, query rewrites, and Redis caching layers.",
    tags: ["SQL", "Redis", "Performance"],
  },
  {
    icon: Network,
    title: "Microservice Architecture",
    desc: "Designed inter-service communication patterns using REST + MQTT, enabling independent scaling and fault isolation across services.",
    tags: ["REST", "MQTT", "Microservices"],
  },
  {
    icon: Cpu,
    title: "Reusable Auth Framework",
    desc: "Engineered a highly secure, modular JWT and OAuth 2.0 middleware. This robust framework was adopted as the standard authentication layer across all enterprise projects.",
    tags: ["JWT", "OAuth 2.0", "Middleware"],
  },
  {
    icon: BookOpen,
    title: "43 R&D Guides",
    desc: "Created 43 comprehensive documentation guides covering extensive research topics to facilitate and streamline future development efforts.",
    tags: ["Documentation", "Research", "Knowledge Base"],
  },
];

export default function Highlights() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="highlights" ref={ref} className="py-28 px-6 bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-teal font-mono text-sm mb-2">// key wins</p>
          <h2 className="text-3xl md:text-5xl heading-elegant text-text-primary">
            Things I&apos;m Proud Of
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg">
            Not just tasks I completed, but problems I solved that made a measurable
            difference.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-5 sm:p-7 rounded-2xl glass hover:border-teal/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal/5 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-teal/10 text-teal group-hover:bg-teal/20 transition-colors duration-300">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-text-primary font-bold leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-5">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-teal/8 border border-teal/15 text-teal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
