import React from "react";
import "./EducationSection.css";

// ==========================================
// DATA ARRAYS FOR EASY MAINTENANCE
// ==========================================

/**
 * Education data array.
 * To add a new degree or academic milestone:
 * Simply add a new object to this array.
 * Properties:
 *  - id: Unique number
 *  - degree: Name of the course/degree
 *  - institution: Name of the school/college/university
 *  - period: Start and End year/range
 *  - status: e.g. "Pursuing", "Completed" (handles badge colors)
 *  - gradeType: e.g. "CGPA" or "Score"
 *  - grade: Numeric value or percentage
 *  - description: Brief details of achievements, courses, or highlights
 */
const educationData = [
  {
    id: 1,
    degree: "B.E. — Computer Science & Engineering",
    institution: "Chandigarh University",
    period: "2024 – 2028",
    status: "Pursuing",
    gradeType: "CGPA",
    grade: "7.5",
    description:
      "Deepening knowledge in Core Computing, Algorithms, Data Structures, and Software Development methodologies. Actively participating in tech groups and hackathons.",
  },
  {
    id: 2,
    degree: "Higher Secondary Education (+2)",
    institution: "Siddharth National Secondary School",
    period: "2022 – 2023",
    status: "Completed",
    gradeType: "Score",
    grade: "85%",
    description:
      "Focused on Science stream including Mathematics, Physics, Chemistry, and Computer Science basics.",
  },
  {
    id: 3,
    degree: "Secondary Education (10th)",
    institution: "Shree Zilla Uchangal Ramdev Kalwar HS School",
    period: "2009 – 2021",
    status: "Completed",
    gradeType: "Score",
    grade: "86%",
    description:
      "Gained foundational academic knowledge with exceptional performances in mathematics and science subjects.",
  },
];

/**
 * Certifications data array.
 * To append a new certification:
 * Add a new object with the following properties:
 *  - id: Unique number
 *  - title: Name of the certification
 *  - issuer: Who provided it (e.g. Coursera, NPTEL, IBM, Meta, Google, Udemy)
 *  - platform: Name of the platform hosting the course (used for branding/styling)
 *  - date: Issue date/month
 *  - link: Credential verification URL
 *  - icon: Font Awesome icon class (e.g. 'fab fa-meta', 'fab fa-google', 'fas fa-award')
 */
const certificationsData = [
  {
    id: 1,
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    platform: "Coursera",
    date: "2024",
    link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    icon: "fab fa-meta",
  },
  {
    id: 2,
    title: "Spring Boot, Spring Security & Application Finalization",
    issuer: "Board Infinity",
    platform: "Coursera",
    date: "2026",
    link: "https://www.coursera.org/account/accomplishments/verify/PDQDGAKHH9WA",
    icon: "fas fa-book",
  },
  {
    id: 3,
    title: "React Basics",
    issuer: "Meta",
    platform: "Coursera",
    date: "2024",
    link: "https://www.coursera.org/learn/react-basics",
    icon: "fab fa-react",
  },
  {
    id: 4,
    title: "IBM Full Stack Software Developer",
    issuer: "IBM",
    platform: "Coursera",
    date: "2024",
    link: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer",
    icon: "fab fa-ibm",
  },
  {
    id: 5,
    title: "React Development",
    issuer: "LinkedIn Learning",
    platform: "LinkedIn",
    date: "2024",
    link: "https://www.linkedin.com/learning",
    icon: "fab fa-linkedin",
  },
  {
    id: 6,
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    platform: "Coursera",
    date: "2023",
    link: "https://www.coursera.org/professional-certificates/google-ux-design",
    icon: "fab fa-google",
  },
  {
    id: 7,
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    platform: "freeCodeCamp",
    date: "2023",
    link: "https://www.freecodecamp.org/certification/fccdf85764f-4d64-4bf8-be90-e74f26b55cf9",
    icon: "fab fa-free-code-camp",
  },
  {
    id: 8,
    title: "Introduction to Databases",
    issuer: "Meta",
    platform: "Coursera",
    date: "2023",
    link: "https://www.coursera.org/learn/introduction-to-databases",
    icon: "fas fa-database",
  },
  {
    id: 9,
    title: "Agile Software Development",
    issuer: "University of Minnesota",
    platform: "Coursera",
    date: "2023",
    link: "https://www.coursera.org/learn/agile-software-development",
    icon: "fas fa-sync",
  },
  {
    id: 10,
    title: "Advanced CSS and Sass",
    issuer: "Udemy",
    platform: "Udemy",
    date: "2023",
    link: "https://www.udemy.com",
    icon: "fab fa-css3-alt",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="education-section">
      <div className="education-container">
        {/* Section Header */}
        <div className="education-header">
          <span className="education-badge">
            <i className="fas fa-graduation-cap"></i> Learning Journey
          </span>
          <h2 className="education-title">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="education-grid">
          {/* Left Column: Academic Timeline */}
          <div className="education-card glass-panel">
            <div className="card-header">
              <h3>
                <i className="fas fa-university"></i> Academic Timeline
              </h3>
              <span className="timeline-glow-indicator">Education</span>
            </div>

            <div className="timeline-container">
              <div className="timeline-line"></div>
              {educationData.map((edu) => (
                <div className="timeline-item" key={edu.id}>
                  {/* Glowing vertical node */}
                  <div
                    className={`timeline-node ${edu.status.toLowerCase()}`}
                  ></div>

                  {/* Content card */}
                  <div className="timeline-content">
                    <div className="timeline-content-header">
                      <h4 className="degree-title">{edu.degree}</h4>
                      <span
                        className={`status-badge ${edu.status.toLowerCase()}`}
                      >
                        {edu.status}
                      </span>
                    </div>

                    <div className="institution-info">
                      <span className="institution-name">
                        {edu.institution}
                      </span>
                      <span className="date-range">
                        <i className="far fa-calendar-alt"></i> {edu.period}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications Grid */}
          <div className="certifications-card glass-panel">
            <div className="card-header">
              <h3>
                <i className="fas fa-award"></i> Professional Licenses
              </h3>
              <span className="cert-count-badge">
                <i className="fas fa-certificate"></i>{" "}
                {certificationsData.length}+ Certifications
              </span>
            </div>

            <div className="certifications-grid">
              {certificationsData.map((cert) => (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certification-card-item"
                  key={cert.id}
                  title={`View Certificate: ${cert.title}`}
                >
                  <h4 className="cert-title-text">{cert.title}</h4>

                  <div className="cert-card-footer">
                    <span className="view-cert-link">
                      Verify <i className="fas fa-external-link-alt"></i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
