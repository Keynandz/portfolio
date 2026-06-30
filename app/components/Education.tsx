"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Trophy, BookOpen, X, ExternalLink, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

type Award = {
  title: string;
  image?: string;
  images?: string[];
  icon?: React.ElementType;
};

type EducationEntry = {
  degree: string;
  school: string;
  period: string;
  detail: string;
  icon: React.ElementType;
  awards?: Award[];
};

const education: EducationEntry[] = [
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
    awards: [
      {
        title: "3rd Winner of National Data Science Tournament 2023 (Student Category)",
        image: "/projects/sertifikat-1.jpg",
      },
      {
        title: "3rd Winner Short Movie Competition",
        image: "/projects/sertifikat-2.jpg",
      },
      {
        title: "1st Winner SIJA IT Club Competition (Website Development Category)",
        image: "/projects/sertifikat-3.jpg",
      },
      {
        title: "Top 20 Game Development Competition by KKSI",
        images: ["/projects/sertifikat-4-1.jpg", "/projects/sertifikat-4-2.jpg"],
      },
      {
        title: "Siswa Penggerak Digitalisasi Sekolah by Smarteschool",
        icon: Star,
        image: "/projects/sertifikat-5.jpg"
      }
    ],
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeAward, setActiveAward] = useState<{ title: string, images: string[] } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

              {edu.awards && edu.awards.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  {edu.awards.map((award, idx) => {
                    const images = award.images || (award.image ? [award.image] : []);
                    const Icon = award.icon || Trophy;
                    return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveAward({ title: award.title, images });
                        setCurrentImageIndex(0);
                      }}
                      className="group/award flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface/50 border border-teal/10 cursor-pointer hover:border-teal/30 hover:bg-teal/5 transition-all duration-300 hover:scale-[1.01] active:scale-95"
                    >
                      <div className="flex items-center gap-2.5 pr-2">
                        <Icon size={14} className="text-teal shrink-0 group-hover/award:scale-110 transition-transform" />
                        <span className="text-xs text-text-primary group-hover/award:text-teal font-medium transition-colors line-clamp-1">{award.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-60 group-hover/award:opacity-100 transition-opacity shrink-0">
                        <span className="text-[10px] font-mono text-teal hidden sm:block">View</span>
                        <ExternalLink size={14} className="text-teal" />
                      </div>
                    </div>
                  )})}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {activeAward && activeAward.images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveAward(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveAward(null)}
              className="absolute -top-12 right-0 p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={24} />
            </button>
            <div className="rounded-2xl glass overflow-hidden border border-border relative">
              <Image 
                src={activeAward.images[currentImageIndex]} 
                alt={activeAward.title} 
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
              {activeAward.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => prev === 0 ? activeAward.images.length - 1 : prev - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-sm border border-white/10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev + 1) % activeAward.images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-sm border border-white/10"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {activeAward.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(i);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentImageIndex ? "bg-teal w-4" : "bg-white/50 hover:bg-white/90"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              <p className="text-sm font-medium text-text-primary">{activeAward.title}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
