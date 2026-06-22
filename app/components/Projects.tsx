"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Globe } from "lucide-react";

const projects = [
  {
    title: "Smart Surveillance System",
    desc: "Real-time object detection platform integrating YOLO models with Go backend for live video analytics across multiple camera feeds.",
    tech: ["Golang", "Python", "YOLO", "Frigate"],
    image: "https://picsum.photos/seed/surveillance/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
  {
    title: "E-Commerce Microservices",
    desc: "Scalable marketplace backend with 8+ microservices handling inventory, payments, orders, and user management via REST + gRPC.",
    tech: ["Go", "Echo", "PostgreSQL", "Redis"],
    image: "https://picsum.photos/seed/ecommerce/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
  {
    title: "IoT Environment Monitor",
    desc: "Sensor data pipeline collecting from 20+ MQTT devices on OrangePi edge hardware with real-time dashboard and alerting.",
    tech: ["Go", "MQTT", "Python", "OrangePi"],
    image: "https://picsum.photos/seed/iotmonitor/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
  {
    title: "Auth Middleware Framework",
    desc: "Reusable JWT + OAuth 2.0 authentication module adopted as the standard auth layer across all company backend projects.",
    tech: ["Go", "JWT", "OAuth 2.0", "Redis"],
    image: "https://picsum.photos/seed/authframework/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
  {
    title: "VoIP Communication Platform",
    desc: "Asterisk PBX deployment with custom dial plans, IVR menus, and SIP trunking for internal corporate communications.",
    tech: ["Asterisk", "VoIP", "SIP", "Linux"],
    image: "https://picsum.photos/seed/voipplatform/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
  {
    title: "POS & Inventory System",
    desc: "Full-stack point of sale application with real-time inventory sync, payment gateway integration, and reporting dashboard.",
    tech: ["Go", "PostgreSQL", "Docker"],
    image: "https://picsum.photos/seed/posinventory/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
  {
    title: "Campus Security Analytics",
    desc: "YOLOv5 model trained for campus perimeter detection achieving 85% mAP, deployed on edge devices with Go inference server.",
    tech: ["Python", "YOLOv5", "Go", "Edge"],
    image: "https://picsum.photos/seed/campussecure/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
  {
    title: "Workflow Automation Hub",
    desc: "N8N-based integration platform connecting 15+ business tools with custom webhook handlers and data transformation pipelines.",
    tech: ["N8N", "Go", "Webhooks", "REST"],
    image: "https://picsum.photos/seed/workflowauto/600/400",
    liveDemo: "https://github.com/Keynandz",
    sourceCode: "https://github.com/Keynandz",
  },
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

  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] rounded-2xl bg-surface border border-border hover:border-teal/25 transition-all duration-300 overflow-hidden group/card">
      <div className="relative h-40 sm:h-44 bg-bg-secondary overflow-hidden">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
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
      </div>
      <div className="p-5">
        <h3 className="text-text-primary font-bold text-base leading-tight mb-2">
          {project.title}
        </h3>
        <p className="text-text-secondary text-xs leading-relaxed mb-4 line-clamp-2">
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
        <div className="flex gap-2">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-teal text-bg text-xs font-semibold rounded-lg hover:bg-teal-light transition-colors"
          >
            <Globe size={13} />
            Live Demo
          </a>
          <a
            href={project.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-border-light text-text-primary text-xs font-medium rounded-lg hover:border-teal/40 hover:bg-teal/5 transition-colors"
          >
            <GithubIcon size={13} />
            Source Code
          </a>
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
  const [progress, setProgress] = useState(0);
  const [setWidth, setSetWidth] = useState(0);
  const [hovering, setHovering] = useState(false);

  const dragActive = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const lastTime = useRef<number | null>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => {
      const children = Array.from(track.children) as HTMLElement[];
      const oneSet = children.length / 3;
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
      viewportRef.current.scrollLeft = setWidth;
    }
  }, [setWidth]);

  useEffect(() => {
    if (!inView || setWidth <= 0) return;
    const speed = 50;

    const tick = (time: number) => {
      const vp = viewportRef.current;
      if (!vp) return;

      if (lastTime.current === null) lastTime.current = time;
      const delta = time - lastTime.current;
      lastTime.current = time;

      if (!dragActive.current && !hovering) {
        vp.scrollLeft += (speed * delta) / 1000;
      }

      if (vp.scrollLeft >= setWidth * 2) {
        vp.scrollLeft -= setWidth;
      }

      setProgress((vp.scrollLeft % setWidth) / setWidth);

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [inView, setWidth, hovering]);

  useEffect(() => {
    if (!isDragging) lastTime.current = null;
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragActive.current = true;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = viewportRef.current?.scrollLeft ?? 0;
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragActive.current || !viewportRef.current) return;
    const dx = e.clientX - dragStartX.current;
    viewportRef.current.scrollLeft = dragStartScroll.current - dx;
  };

  const endDrag = (e?: React.PointerEvent) => {
    if (!dragActive.current) return;
    dragActive.current = false;
    setIsDragging(false);
    if (e?.pointerId && viewportRef.current) {
      try {
        viewportRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const barRef = useRef<HTMLDivElement>(null);
  const barDragging = useRef(false);

  const syncBarDrag = (clientX: number) => {
    if (!barRef.current || !viewportRef.current || setWidth <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    viewportRef.current.scrollLeft = setWidth + ratio * setWidth;
  };

  const handleBarPointerDown = (e: React.PointerEvent) => {
    barDragging.current = true;
    setHovering(true);
    barRef.current?.setPointerCapture(e.pointerId);
    syncBarDrag(e.clientX);
  };

  const handleBarPointerMove = (e: React.PointerEvent) => {
    if (!barDragging.current) return;
    syncBarDrag(e.clientX);
  };

  const handleBarPointerUp = (e?: React.PointerEvent) => {
    if (!barDragging.current) return;
    barDragging.current = false;
    setHovering(false);
    if (e?.pointerId && barRef.current) {
      try { barRef.current.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  const tripled = [...projects, ...projects, ...projects];

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-teal font-mono text-sm mb-2">// projects</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            endDrag();
          }}
        >
          <div ref={trackRef} className="flex gap-5 pb-4">
            {tripled.map((project, i) => (
              <ProjectCard key={`${project.title}-${i}`} project={project} />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div
            ref={barRef}
            onPointerDown={handleBarPointerDown}
            onPointerMove={handleBarPointerMove}
            onPointerUp={handleBarPointerUp}
            onPointerLeave={handleBarPointerUp}
            className="relative h-6 flex items-center cursor-pointer group"
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-border rounded-full" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-teal/40 rounded-full transition-[width] duration-75"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-teal rounded-full shadow-lg shadow-teal/30 border-2 border-bg transition-[left,width,height] duration-75 group-hover:scale-125"
              style={{ left: `${progress * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
