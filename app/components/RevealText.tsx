"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current || typeof window === "undefined") return;
    
    const words = textRef.current.querySelectorAll(".word");
    
    gsap.fromTo(words, 
      { opacity: 0, y: 30, rotationX: -30 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.4)",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  const words = text.split(" ").map((word, i) => (
    <span key={i} className="word inline-block mr-[0.3em] last:mr-0 origin-bottom" style={{ transformStyle: "preserve-3d" }}>
      {word}
    </span>
  ));

  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      <h2 ref={textRef} className={className}>
        {words}
      </h2>
    </div>
  );
}
