import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Highlights from "./components/Highlights";
import GithubActivity from "./components/GithubActivity";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <GithubActivity />
        <Skills />
        <Experience />
        <Highlights />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
