"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    gsap.set(textRef.current, { opacity: 0, y: 20 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(progressRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.5")
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in"
    })
    .to(progressRef.current, {
      opacity: 0,
      duration: 0.3
    }, "-=0.3")
    .to(container.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center">
        <div ref={textRef} className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 font-display">
          <span className="text-text-primary">Ananda</span>
          <span className="text-teal">.</span>
        </div>
        
        <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-teal w-full"
          />
        </div>
      </div>
    </div>
  );
}
