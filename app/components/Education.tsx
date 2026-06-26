"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Trophy, BookOpen, X } from "lucide-react";
import Image from "next/image";

const education = [
  {
    degree: "BSc Information Systems",
    school: "Universitas Terbuka",
    period: "2024 - 2027 (In Progress)",
    detail: "Last GPA 3.75 / 4.00, balancing full-time work with academic growth.",
    icon: BookOpen,
  },
  {
    degree: "Vocational HS, Computer & Network Engineering",
    school: "SMKN 26 Jakarta",
    period: "2020 - 2024",
    detail: "IT Club member. Where the passion for systems and networks first sparked.",
    icon: GraduationCap,
    award: "3rd Place, National Data Science Competition (TSDN 2023)",
    awardImage: "/projects/Sertifikat-Pemenang-TSDN-2023-Tim-Exuberance_page-0001.jpg",
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showImage, setShowImage] = useState<string | null>(null);

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
          <h2 className="text-3xl md:text-5xl heading-elegant text-text-primary">
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
              className="group p-7 rounded-2xl glass hover:border-teal/20 transition-all duration-300"
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
                <div
                  onClick={() => setShowImage(edu.awardImage || null)}
                  className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-teal/5 border border-teal/10 cursor-pointer hover:bg-teal/10 transition-colors"
                >
                  <Trophy size={14} className="text-teal" />
                  <span className="text-xs text-teal font-medium">{edu.award}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {showImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImage(null)}
              className="absolute -top-12 right-0 p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={24} />
            </button>
            <div className="rounded-2xl glass overflow-hidden border border-border">
              <Image 
                src={showImage} 
                alt="Certificate" 
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
