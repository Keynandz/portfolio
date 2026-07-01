"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Globe, FileText } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "G4S Super App",
    desc: "Architected and built a scalable microservices-based super app from scratch serving thousands of G4S users. Engineered the complete backend architecture featuring complex PostgreSQL schemas, real-time WebSocket communication, secure OAuth 2.0 authentication, and automated data pipelines.",
    tech: ["GO", "GORM", "PostgreSQL", "Firebase", "GOPDF", "Cron", "MinIO", "WebSocket", "Docker", "Oauth 2.0", "JWT"],
    image: "/projects/project-1.jpeg",
    liveDemo: "https://gracia.g4sindonesia.com",
    sourceCode: "",
    documentUrl: "",
  },
  {
    title: "G4S Smart Patrol",
    desc: "Developed and maintained core backend features for an enterprise-level patrol management system that remains in active daily use. Contributed to a scalable 5-service microservice architecture, optimizing API endpoints and PostgreSQL queries to ensure seamless data flow and high availability.",
    tech: ["GO", "GORM", "PostgreSQL", "Firebase", "GOPDF", "Cron", "MinIO", "WebSocket", "Docker", "Oauth 2.0", "JWT"],
    image: "/projects/project-2.jpeg",
    liveDemo: "https://smartpatrol.g4sindonesia.com/",
    sourceCode: "",
    documentUrl: "",
  },
  {
    title: "Backend Coding Standard",
    desc: "Authored the internal backend coding standards and project structure guidelines. Adopted company-wide to unify Go programming patterns, ERD design, and architecture consistency.",
    tech: ["GO", "Best Practices", "System Design", "Clean Architecture"],
    images: ["/projects/project-3-1.png", "/projects/project-3-2.png"],
    documentUrl: "https://1drv.ms/p/c/b56610e74089f2d8/EdjyiUDnEGYggLXICAAAAAABfRiRbisXHFwoR9bYAxPEAA?e=dTFJU3",
  },
  {
    title: "Advanced Auth Middleware",
    desc: "An independent study where I engineered a custom JWT middleware in Go to deeply understand advanced security layers. I successfully implemented fine-grained Role-Based Access Control (RBAC) combined with Attribute-Based Access Control (ABAC) from scratch.",
    tech: ["GO", "JWT", "RBAC", "ABAC", "Security"],
    image: "/projects/project-4.jpg",
    liveDemo: "",
    sourceCode: "https://github.com/Keynandz/middleware",
    documentUrl: "",
  }
];

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [imgError, setImgError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = project.images ||(project.image ? [project.image] : []);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <div className="flex flex-col h-auto flex-shrink-0 w-[330px] sm:w-[374px] rounded-2xl bg-surface border border-border hover:border-teal/25 transition-all duration-300 overflow-hidden group/card">
      <div className="relative h-[176px] sm:h-[194px] bg-bg-secondary overflow-hidden">
        {!imgError ? (
          <Image
            src={images[currentImage]}
            alt={project.title}
            width={600}
            height={400}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-bg-secondary via-bg to-bg-secondary">
            <Code2 size={32} className="text-border-light" />
            <span className="text-[10px] text-text-muted font-mono tracking-wide uppercase">
              {project.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentImage ? "bg-teal w-4" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-text-primary font-bold text-base leading-tight mb-2">
          {project.title}
        </h3>
        <p className="text-text-secondary text-xs leading-relaxed mb-4">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-teal/8 border border-teal/15 text-teal"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          {project.documentUrl ? (
            <a
              href={project.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-teal text-bg text-xs font-semibold rounded-lg hover:bg-teal-light transition-colors pointer-events-auto w-full"
            >
              <FileText size={13} />
              View Document
            </a>
          ) : (
            <>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 bg-teal text-bg text-xs font-semibold rounded-lg hover:bg-teal-light transition-colors pointer-events-auto ${
                    project.sourceCode ? "flex-1" : "w-full"
                  }`}
                >
                  <Globe size={13} />
                  Live Demo
                </a>
              )}
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-border-light text-text-primary text-xs font-medium rounded-lg hover:border-teal/40 hover:bg-teal/5 transition-colors pointer-events-auto"
                >
                  <GithubIcon size={13} />
                  Source Code
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [setWidth, setSetWidth] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Refs mirror state so the RAF loop reads latest values without restarting
  const isDraggingRef = useRef(false);
  const hoveringRef = useRef(false);
  useEffect(() => { isDraggingRef.current = isDragging; }, [isDragging]);
  useEffect(() => { hoveringRef.current = hovering; }, [hovering]);

  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const lastTime = useRef<number | null>(null);
  const rafId = useRef(0);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = () => {
    setHovering(true);
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setHovering(false);
    }, 1500);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => {
      const children = Array.from(track.children) as HTMLElement[];
      const oneSet = children.length / 7;
      let w = 0;
      for (let i = 0; i < oneSet; i++) {
        w += children[i].offsetWidth + 20;
      }
      setSetWidth(w);
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (setWidth > 0 && viewportRef.current && viewportRef.current.scrollLeft === 0) {
      viewportRef.current.scrollLeft = setWidth * 3;
    }
  }, [setWidth]);

  useEffect(() => {
    if (!inView || setWidth <= 0) return;
    const speed = 30;
    lastTime.current = null;
    let exactScroll = viewportRef.current?.scrollLeft || 0;

    const tick = (time: number) => {
      const vp = viewportRef.current;
      if (!vp) return;

      if (lastTime.current === null) {
        lastTime.current = time;
      }
      const delta = time - lastTime.current;
      lastTime.current = time;

      // Read latest values from refs — no effect restart needed
      if (!isDraggingRef.current && !hoveringRef.current) {
        exactScroll += (speed * delta) / 1000;
        
        // Seamless wrap
        if (exactScroll >= setWidth * 5) {
          exactScroll -= (setWidth * 2);
        } else if (exactScroll <= setWidth * 1) {
          exactScroll += (setWidth * 2);
        }

        vp.scrollLeft = exactScroll;
      } else {
        // Sync exactScroll when user drags or hovers
        exactScroll = vp.scrollLeft;

        let wrapped = false;
        let shift = 0;
        if (exactScroll >= setWidth * 5) {
          shift = -(setWidth * 2);
          exactScroll += shift;
          wrapped = true;
        } else if (exactScroll <= setWidth * 1) {
          shift = setWidth * 2;
          exactScroll += shift;
          wrapped = true;
        }

        if (wrapped) {
          vp.scrollLeft = exactScroll;
          if (isDraggingRef.current) {
            dragStartScroll.current += shift;
          }
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [inView, setWidth]); // refs handle isDragging/hovering

  useEffect(() => {
    if (!isDragging) lastTime.current = null;
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) {
      return;
    }
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = viewportRef.current?.scrollLeft ?? 0;
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !viewportRef.current) return;
    const dx = e.clientX - dragStartX.current;
    viewportRef.current.scrollLeft = dragStartScroll.current - dx;
  };

  const endDrag = (e?: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (e?.pointerId && viewportRef.current) {
      try {
        viewportRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const multiplied = useMemo(() => Array(7).fill(projects).flat(), []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-teal font-mono text-sm mb-2">// projects</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-elegant text-text-primary">
              Things I&apos;ve Built
            </h2>
          </div>
          <p className="text-text-muted text-sm max-w-xs">
            Drag or use the slider to explore, auto-scrolls infinitely
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          ref={viewportRef}
          className="overflow-x-auto scrollbar-hide px-6 select-none"
          onPointerDown={(e) => e.pointerType === "mouse" && handlePointerDown(e)}
          onPointerMove={(e) => e.pointerType === "mouse" && handlePointerMove(e)}
          onPointerUp={(e) => e.pointerType === "mouse" && endDrag(e)}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") {
              setHovering(false);
              endDrag(e);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div ref={trackRef} className="flex items-stretch gap-5 pb-4">
            {multiplied.map((project, i) => (
              <ProjectCard key={`${project.title}-${i}`} project={project} />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
