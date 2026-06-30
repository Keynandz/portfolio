"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
        image: "/certificate/sertifikat-1.jpg",
      },
      {
        title: "3rd Winner Short Movie Competition",
        image: "/certificate/sertifikat-2.jpg",
      },
      {
        title: "1st Winner SIJA IT Club Competition (Website Development Category)",
        image: "/certificate/sertifikat-3.jpg",
      },
      {
        title: "Top 20 Game Development Competition by KKSI",
        images: ["/certificate/sertifikat-4-1.jpg", "/projects/sertifikat-4-2.jpg"],
      },
      {
        title: "Siswa Penggerak Digitalisasi Sekolah by Smarteschool",
        icon: Star,
        image: "/certificate/sertifikat-5.jpg"
      }
    ],
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeAward, setActiveAward] = useState<{ title: string, images: string[] } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeAward) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeAward]);

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

      {mounted && activeAward && activeAward.images.length > 0 && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-md"
          onClick={() => setActiveAward(null)}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
            <p className="text-sm sm:text-base font-medium text-text-primary line-clamp-1 pr-4">
              {activeAward.title}
            </p>
            <button
              onClick={() => setActiveAward(null)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors shrink-0"
            >
              <X size={24} />
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-4 pb-4"
            onClick={() => setActiveAward(null)}
          >
            <div 
              className="relative w-full h-full max-w-5xl flex items-center justify-center"
              onClick={() => setActiveAward(null)}
            >
              <Image 
                src={activeAward.images[currentImageIndex]} 
                alt={activeAward.title} 
                width={1200}
                height={800}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                style={{ width: "auto", height: "100%" }}
                onClick={(e) => e.stopPropagation()}
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
          </motion.div>
        </div>,
        document.body
      )}
    </section>
  );
}
