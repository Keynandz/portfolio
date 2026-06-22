"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Trophy, BookOpen } from "lucide-react";

const education = [
  {
    degree: "BSc Information Systems",
    school: "Universitas Terbuka",
    period: "2024 - 2027 (In Progress)",
    detail: "GPA 3.75 / 4.00, balancing full-time work with academic growth.",
    icon: BookOpen,
  },
  {
    degree: "Vocational HS, Computer & Network Engineering",
    school: "SMKN 26 Jakarta",
    period: "2020 - 2024",
    detail: "IT Club member. Where the passion for systems and networks first sparked.",
    icon: GraduationCap,
    award: "3rd Place, National Data Science Competition",
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-teal font-mono text-sm mb-2">// education</p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary">
            Where I Learned
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-7 rounded-2xl bg-surface border border-border hover:border-teal/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-teal/10 text-teal shrink-0">
                  <edu.icon size={20} />
                </div>
                <div>
                  <h3 className="text-text-primary font-bold leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-teal text-sm font-medium mt-1">{edu.school}</p>
                  <p className="text-text-muted text-xs font-mono mt-1">
                    {edu.period}
                  </p>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {edu.detail}
              </p>

              {edu.award && (
                <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-teal/5 border border-teal/10">
                  <Trophy size={14} className="text-teal" />
                  <span className="text-xs text-teal font-medium">{edu.award}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
