import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Background3D from "./components/Background3D";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Remove solid background on document element so 3D background can show through
    document.documentElement.style.background = 'transparent';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Background3D />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      {/* Mobile-only bottom nav bar — hidden on desktop via CSS */}
      <BottomNav />
    </>
  );
}

export default App;
