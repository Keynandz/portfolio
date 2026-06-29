"use client";

import Link from "next/link";
import FuzzyText from "./components/FuzzyText";
import CustomCursor from "./components/CustomCursor";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <CustomCursor />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-8">
        <div className="flex items-center justify-center">
          <FuzzyText
            fontSize="clamp(6rem, 20vw, 18rem)"
            fontWeight={900}
            color="#00D4AA"
            baseIntensity={0.15}
            hoverIntensity={0.5}
            enableHover={true}
            glitchMode={true}
            glitchInterval={3000}
            glitchDuration={150}
            transitionDuration={8}
          >
            404
          </FuzzyText>
        </div>

        <div className="flex flex-col items-center gap-3 max-w-md">
          <p className="text-teal font-mono text-sm">// page_not_found</p>
          <h1 className="text-2xl sm:text-3xl heading-elegant text-text-primary">
            Lost in the void
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            The page you are looking for does not exist or has been moved. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-teal text-bg text-sm font-semibold rounded-xl hover:bg-teal/90 transition-all duration-300"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-xl hover:border-teal/30 hover:text-text-primary transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
