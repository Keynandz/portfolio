"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useInView } from "framer-motion";
import { Briefcase, ChevronRight, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import TiltCard from "./TiltCard";
import RevealText from "./RevealText";

const milestones = [
  {
    period: "Jan 2025 - Present",
    role: "R&D Software Engineer",
    company: "PT. Solu Filantropi Teknologi",
    type: "Full-time",
    highlights: [
      "Build production-ready prototypes from scratch, taking ownership of the full development lifecycle from concept to Docker deployment",
      "Implement advanced event-driven systems using Kafka to handle high-throughput real-time data streams",
      "Built automation workflows using N8N to streamline internal processes and reduce manual operational overhead",
      "Produced 43+ internal R&D documentation guides covering research findings to accelerate future development across teams",
      "Cross-domain research spanning IoT, AI model integration, and system architecture to drive innovation across the organization",
      "Design and source custom IoT hardware solutions, evaluating components and building device specifications for production use",
      "Serve as technical backbone across all business units, providing backup engineering support and cross-functional problem solving",
      "Reverse engineered a major bank EDC machine to decode proprietary protocols and enable software-level integration",
      "Reverse engineered a smartwatch to extract health and sensor data by decoding its proprietary communication layer",
    ],
    tech: ["GOlang", "Python", "Java", "JavaScript", "TypeScript", "Docker", "Kafka", "N8N"],
  },
  {
    period: "May 2024 - Jan 2025",
    role: "Software Engineer",
    company: "PT. Solu Filantropi Teknologi",
    type: "Full-time",
    highlights: [
      "Authored the internal backend coding standards and project structure guidelines, adopted company-wide to unify code readability across teams",
      "Contributed to 20+ projects building both microservice and monolith architectures from ERD design to production-ready systems",
      "Assisted frontend team with logic corrections and debugging, improving cross-team collaboration and reducing integration friction",
      "Supported IoT device development, bridging hardware and software layers for real-time data communication via MQTT",
      "Designed and implemented database schemas, caching strategies with Redis, and containerized deployments using Docker",
      "Implemented Kafka as a message broker for event streaming and reliable communication within project services",
    ],
    tech: ["GOlang", "Python", "Java", "JavaScript", "Docker", "Kafka"],
  },
  {
    period: "Jul 2023 - May 2024",
    role: "Backend Engineer",
    company: "PT. Solu Filantropi Teknologi",
    type: "Internship",
    certificate: "/certificate/sertifikat-7.jpeg",
    highlights: [
      "Built microservice and monolith backend systems from scratch, owning the full cycle from ERD design to finished product",
      "Delivered comprehensive API documentation with Swagger and Postman, establishing the documentation standard adopted by the team",
      "Implemented caching layers and optimized database queries to improve service performance and reliability",
      "Contributed to 4 projects, shipping production features with Go, PostgreSQL, Redis, and Docker",
    ],
    tech: ["GOlang", "PHP", "JavaScript"],
  },
  {
    period: "Jun 2022 - Aug 2022",
    role: "Data Uploader",
    company: "PT. Petrolink",
    type: "Internship",
    certificate: "/certificate/sertifikat-6.jpg",
    highlights: [
      "Conducted extensive data mining to extract corporate environmental metrics, including GHG emissions, Scope 1-3 CO2 footprints, and Net Zero targets",
      "Analyzed varied global sources such as ESG/CSR reports, Annual Greenhouse Gas Verification Reports, TCFD disclosures, and CDP Questionnaires",
      "Processed and inputted the gathered environmental sustainability data into the company's central database",
    ],
    tech: ["Data Research", "Database", "Data Entry"],
  },
];

function TimelineCard({
  milestone,
  isFirst,
  onViewCertificate,
}: {
  milestone: (typeof milestones)[number] & { certificate?: string };
  isFirst: boolean;
  onViewCertificate?: (cert: string) => void;
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
        className="w-full h-full"
      >
        <TiltCard
          className={`rounded-2xl p-5 sm:p-7 transition-all duration-300 ${
            isFirst
              ? "glass-strong border-teal/20 glow-teal-sm"
              : "glass hover:border-teal/15"
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
                <span className="text-sm text-text-secondary font-mono">{milestone.period}</span>
                <span className="hidden sm:inline text-text-muted text-xs">&bull;</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal/10 text-teal font-medium">
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

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-5 sm:items-start">
            <div className="flex flex-wrap gap-2">
              {milestone.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-teal/5 border border-teal/10 text-teal"
                >
                  {t}
                </span>
              ))}
            </div>
            {milestone.certificate && onViewCertificate && (
              <button
                onClick={() => onViewCertificate(milestone.certificate!)}
                className="group flex items-center justify-center w-full sm:w-auto gap-1.5 px-4 py-2 text-xs bg-teal text-bg font-semibold rounded-lg hover:bg-teal-light transition-all duration-200 glow-teal-sm hover:glow-teal sm:ml-auto shrink-0"
              >
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                View Certificate
              </button>
            )}
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [showCertificate, setShowCertificate] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showCertificate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCertificate]);

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
          <RevealText 
            text="Where I've Made Impact" 
            className="text-3xl sm:text-4xl md:text-5xl heading-elegant text-text-primary" 
          />
        </div>

        <div className="relative">
          <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-teal/40 via-border to-border" />

          <div className="space-y-12">
            {milestones.map((milestone, mIdx) => (
              <TimelineCard
                key={mIdx}
                milestone={milestone}
                isFirst={mIdx === 0}
                onViewCertificate={setShowCertificate}
              />
            ))}
          </div>
        </div>
      </div>

      {mounted && showCertificate && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-md"
          onClick={() => setShowCertificate(null)}
        >
          {/* Top bar: title + close */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
            <p className="text-sm sm:text-base font-medium text-text-primary line-clamp-1 pr-4">
              Certificate
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCertificate(null);
              }}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors shrink-0"
            >
              <X size={24} />
            </button>
          </div>

          {/* Full-screen centered image — fits 1 laptop screen, no scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-4 pb-4"
            onClick={() => setShowCertificate(null)}
          >
            <div 
              className="relative w-full h-full max-w-5xl flex items-center justify-center"
              onClick={() => setShowCertificate(null)}
            >
              <Image
                src={showCertificate}
                alt="Certificate"
                width={1200}
                height={800}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                style={{ width: "auto", height: "100%" }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </section>
  );
}