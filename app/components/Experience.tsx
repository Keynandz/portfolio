"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";

const milestones = [
  {
    period: "2023 - Present",
    role: "Backend Developer & RnD Staff",
    company: "PT. Solu Filantropi Teknologi",
    type: "Full-time",
    highlights: [
      "Architected 15+ backend systems from blank canvas to production, owning every layer from ERD to deployment",
      "Built and shipped 6+ AI-powered computer vision products combining Python models with Go backends",
      "Designed microservice ecosystems with REST + MQTT communication patterns for real-time data flow",
      "Cut response times on high-traffic services through Redis caching, query optimization, and indexing strategies",
      "Established reusable auth middleware (JWT + OAuth 2.0) now used across all company projects",
      "Deployed and maintained VoIP infrastructure using Asterisk PBX for internal communications",
    ],
  },
  {
    period: "Jan 2023 - Jun 2023",
    role: "Backend Engineer Intern",
    company: "PT. Nusantara Digital Hub",
    type: "Internship",
    highlights: [
      "Developed RESTful APIs using Golang and Echo Framework serving 10K+ daily requests",
      "Implemented Redis caching layer that reduced average API response time by 40%",
      "Wrote comprehensive API documentation with Swagger, adopted as the team standard",
      "Participated in code reviews and introduced structured error handling patterns",
    ],
  },
  {
    period: "2022",
    role: "Freelance Backend Developer",
    company: "Self-Employed",
    type: "Freelance",
    highlights: [
      "Built 5+ custom backend solutions for SME clients including inventory management and POS systems",
      "Designed PostgreSQL schemas and implemented database migration pipelines for each project",
      "Deployed client projects using Docker Compose on Linux VPS with Nginx reverse proxy",
      "Integrated third-party payment gateways (Midtrans, Xendit) into e-commerce backends",
    ],
  },
  {
    period: "2021 - 2022",
    role: "IoT Developer & Research Assistant",
    company: "University Research Lab",
    type: "Research",
    highlights: [
      "Developed MQTT-based sensor data pipelines for environmental monitoring on OrangePi devices",
      "Built Python scripts for real-time data collection and visualization from 20+ IoT sensors",
      "Trained YOLOv5 object detection models for campus security camera analytics (85% mAP)",
      "Co-authored internal research report on edge computing architectures for smart buildings",
    ],
  },
];

function TimelineCard({
  milestone,
  isFirst,
}: {
  milestone: (typeof milestones)[number];
  isFirst: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <div ref={cardRef} className="relative pl-12 sm:pl-16">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className={`absolute left-[11px] sm:left-[15px] top-2 w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center ${
          isFirst ? "bg-teal/20 border-teal" : "bg-bg-secondary border-border-light"
        }`}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${isFirst ? "bg-teal" : "bg-text-muted"}`} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`rounded-2xl border p-5 sm:p-7 transition-all duration-300 ${
          isFirst
            ? "bg-surface border-teal/20 glow-teal-sm"
            : "bg-surface border-border hover:border-teal/15"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="p-2.5 rounded-xl bg-teal/10 text-teal shrink-0 w-fit"
          >
            <Briefcase size={20} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-tight">
              {milestone.role}
            </h3>
            <p className="text-teal text-sm font-medium mt-0.5">{milestone.company}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs text-text-muted font-mono">{milestone.period}</span>
              <span className="hidden sm:inline text-text-muted text-xs">&bull;</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal/10 text-teal font-medium">
                {milestone.type}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {milestone.highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
              className="flex items-start gap-2.5 group"
            >
              <ChevronRight
                size={14}
                className="text-teal/60 mt-0.5 shrink-0 group-hover:text-teal group-hover:translate-x-0.5 transition-all"
              />
              <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-16 px-2">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-teal font-mono text-sm mb-2"
          >
            // career path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary"
          >
            Where I&apos;ve Made Impact
          </motion.h2>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-teal/40 via-border to-border" />

          <div className="space-y-12">
            {milestones.map((milestone, mIdx) => (
              <TimelineCard
                key={mIdx}
                milestone={milestone}
                isFirst={mIdx === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
