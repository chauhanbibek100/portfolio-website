import { projects } from "./ProjectsSection";
import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div className="about-left">
          <span className="section-badge">
            <i className="fas fa-user"></i> About Me
          </span>
          <h2 className="section-title">
            Who <span className="gradient-text">I Am</span>
          </h2>

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
    "React", "Next.js",
    "TypeScript",
    "Tailwind", "Node.js",
    "MongoDB"
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
            <h3 className="about-heading">
              Passionate About
              <br />
              Building &amp; Learning
            </h3>
            <p className="about-text">
              I'm <strong>Bibek</strong>, a passionate Computer Science student.
              I love creating modern, responsive web applications that deliver
              exceptional user experiences. From pixel-perfect frontends to
              robust backend systems, I enjoy the full spectrum of web
              development.
            </p>
            <div className="about-badges">
              <span className="badge">
                <i className="fas fa-code"></i> Clean Code
              </span>
            </div>
            <a
              href="https://drive.google.com/file/d/15qYOZIU4v7DYRT9I7taNmncH_pgqAZw_/view?usp=sharing"
              target="_blank"
              className="download-resume-btn"
            >
              <i className="fas fa-eye"></i> View Resume
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
