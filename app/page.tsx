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

export default function Home() {
  return (
    <>
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
    </>
  );
}
