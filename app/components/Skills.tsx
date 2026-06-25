"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Table2,
  ArrowRightLeft,
  Gauge,
  Container,
  Send,
  Rocket,
  GitBranch,
  FileText,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    label: "Languages",
    color: "teal",
    items: ["Golang", "Python", "TypeScript", "JavaScript", "PHP", "SQL"],
  },
  {
    label: "Frontend",
    color: "emerald",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    color: "cyan",
    items: ["Node.js", "Echo", "REST API", "Swagger"],
  },
  {
    label: "Databases",
    color: "purple",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    label: "DevOps",
    color: "orange",
    items: ["Docker", "Nginx", "Git", "Linux", "S3", "MinIO"],
  },
  {
    label: "AI / ML",
    color: "blue",
    items: ["YOLO Detection", "LLM Integration", "Frigate NVR"],
  },
  {
    label: "Architecture",
    color: "pink",
    items: ["Microservices", "MQTT", "JWT / OAuth", "N8N"],
  },
  {
    label: "IoT & Hardware",
    color: "pink",
    items: ["Firefly MiniPC", "OrangePi", "MQTT Sensors"],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  teal: { bg: "bg-teal", text: "text-teal", border: "border-teal/20", glow: "group-hover:shadow-teal/10" },
  emerald: { bg: "bg-emerald-400", text: "text-emerald-400", border: "border-emerald-500/20", glow: "group-hover:shadow-emerald-500/10" },
  cyan: { bg: "bg-cyan-400", text: "text-cyan-400", border: "border-cyan-500/20", glow: "group-hover:shadow-cyan-500/10" },
  orange: { bg: "bg-orange-400", text: "text-orange-400", border: "border-orange-500/20", glow: "group-hover:shadow-orange-500/10" },
  purple: { bg: "bg-purple-400", text: "text-purple-400", border: "border-purple-500/20", glow: "group-hover:shadow-purple-500/10" },
  blue: { bg: "bg-blue-400", text: "text-blue-400", border: "border-blue-500/20", glow: "group-hover:shadow-blue-500/10" },
  pink: { bg: "bg-pink-400", text: "text-pink-400", border: "border-pink-500/20", glow: "group-hover:shadow-pink-500/10" },
  amber: { bg: "bg-amber-400", text: "text-amber-400", border: "border-amber-500/20", glow: "group-hover:shadow-amber-500/10" },
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-28 px-6 bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-teal font-mono text-sm mb-2">// tech stack</p>
          <h2 className="text-3xl md:text-5xl heading-elegant text-text-primary">
            Tools of the Trade
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg">
            Everything I reach for when building systems that need to be fast,
            reliable, and maintainable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, catIdx) => {
            const c = colorMap[cat.color] ?? colorMap.teal;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: catIdx * 0.06 }}
                className={`group p-6 rounded-xl glass hover:border-teal/20 transition-all duration-300 hover:shadow-lg ${c.glow}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${c.bg}`} />
                  <h3 className={`text-sm font-semibold ${c.text}`}>
                    {cat.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-1.5 text-xs rounded-lg bg-bg border ${c.border} text-text-secondary group-hover:text-text-primary transition-colors`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl glass-strong"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="p-2.5 rounded-xl bg-teal/10 text-teal w-fit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg>
            </div>
            <div>
              <h3 className="text-text-primary font-semibold text-lg">Also Proficient In</h3>
              <p className="text-text-muted text-sm">Practices & tools I use daily across projects</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: "ERD Design", icon: Table2 },
              { name: "Database Migration", icon: ArrowRightLeft },
              { name: "Query Optimization", icon: Gauge },
              { name: "Docker Compose", icon: Container },
              { name: "Postman", icon: Send },
              { name: "Performance Tuning", icon: Rocket },
              { name: "CI/CD Concepts", icon: GitBranch },
              { name: "API Documentation", icon: FileText },
              { name: "Session Management", icon: KeyRound },
              { name: "Rate Limiting", icon: ShieldCheck },
            ].map((s) => (
              <div
                key={s.name}
                className="group flex items-center gap-2.5 p-3 rounded-xl bg-bg border border-border hover:border-teal/20 hover:bg-teal/5 transition-all duration-200 cursor-default"
              >
                <s.icon size={16} className="text-teal/60 group-hover:text-teal shrink-0 transition-colors" />
                <span className="text-xs sm:text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-tight">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
