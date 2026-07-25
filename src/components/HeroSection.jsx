import { useRef, useCallback } from "react";
import developerImg from "../assets/developer.jpg";
import "./HeroSection.css";

export default function HeroSection() {
  const sectionRef = useRef(null);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sectionRef.current.style.setProperty("--mx", `${x}px`);
    sectionRef.current.style.setProperty("--my", `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Fade spotlight to center on leave
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("--mx", "50%");
      sectionRef.current.style.setProperty("--my", "50%");
    }
  }, []);

  return (
    <section
      className="hero-section"
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor spotlight overlay */}
      <div className="hero-spotlight" aria-hidden="true"></div>

      {/* Background glowing/grid decorations */}
      <div className="hero-grid-bg"></div>
      <div className="hero-glow-blob cyan"></div>
      <div className="hero-glow-blob purple"></div>

      <div className="hero-container">
        {/* Left Info Column */}
        <div className="hero-info">
          <h1 className="hero-heading">
            Hi, I'm{" "}
            <span className="gradient-text hero-name">Bibek Chauhan</span>
          </h1>

          <div className="hero-role-row">
            <h2>Full-Stack Developer</h2>
          </div>

          <p className="hero-subtitle">
            Building fast, scalable web applications with clean code
            <br />
            and intuitive user experiences.
          </p>

          <div className="hero-actions">
            <button
              className="hero-btn-primary"
              onClick={() => handleScrollTo("contact")}
            >
              Let's Work Together <i className="fas fa-arrow-right"></i>
            </button>
            <button
              className="hero-btn-secondary"
              onClick={() => handleScrollTo("projects")}
            >
              View Projects
            </button>
          </div>

          <p className="hero-quote">
            "Let's build something amazing together."
          </p>
        </div>

        {/* Right Portrait Column */}
        <div className="hero-portrait-container">
          <div className="portrait-card">
            <img
              src={developerImg}
              alt="Bibek - Full-Stack Developer"
              className="portrait-image"
            />
          </div>
          <div className="portrait-caption-box">
            <h3>Bibek</h3>
            <p>Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
