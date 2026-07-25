import { projects } from "./ProjectsSection";
import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
        <div className="about-header">
          <span className="section-badge">
            <i className="fas fa-user"></i> About Me
          </span>
          <h2 className="section-title">
            Who <span className="gradient-text">I Am</span>
          </h2>
        </div>

      <div className="about-inner">
        <div className="about-left">
          <div className="code-editor">
            <div className="editor-header">
              <div className="editor-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="editor-filename">bibek_dev.js</span>
            </div>
            <div className="editor-body">
              <pre>
                <code>{`const developer = {
  name: "Bibek Chauhan",
  title: "Full-Stack Developer",
  university: "Chandigarh University",
  degree: "BE-CSE",
  focus: "Modern Web Applications",
  stack: [
    "MERN", "Java","Next.js",
    "TypeScript",
    "Tailwind", "Python",
    "SQL","Spring Boot"
  ],
  available: true,
  hire() {
    return "Let's build something amazing!";
  }
};`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-content">
            <h3 className="about-heading">About Me</h3>
            <p className="about-text">
              I'm <strong>Bibek</strong>, a passionate Full-Stack Developer and
              Computer Science student. I build modern, responsive, and scalable
              web applications with a focus on clean code, great user
              experience, and continuous learning. I'm currently seeking
              internship opportunities to grow as a software developer.
            </p>
            <a
              href="https://drive.google.com/file/d/1p1YQaNx8pXddpu2P0Q0ITEnX1oLuThwk/view?usp=sharing"
              target="_blank"
              className="download-resume-btn"
            >
              <i className="fas fa-eye"></i>Resume
            </a>
          </div>

          <div className="stats-pills">
            <span className="pill pill-cyan">
              {projects.length} Live Projects
            </span>
            <span className="pill pill-green">100% Responsive</span>
            <span className="pill pill-purple">Fast Performance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
