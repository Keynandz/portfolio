"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GithubActivity from "./components/GithubActivity";
import Highlights from "./components/Highlights";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Chatbot from "./components/Chatbot";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div 
        className="transition-opacity duration-700 ease-in-out"
        style={{ opacity: isLoading ? 0 : 1, pointerEvents: isLoading ? "none" : "auto" }}
      >
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          {false && <Projects />}
          <GithubActivity />
          <Highlights />
          <Education />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
}

