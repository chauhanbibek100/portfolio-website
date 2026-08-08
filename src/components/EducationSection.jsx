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
    title: "Industrial Training Programme - Internship",
    issuer: "Chandigarh University",
    platform: "Chandigarh University",
    date: "2026",
    link: "https://drive.google.com/file/d/1_v3VUTb3UlEdT0KoebJmWcSxLXX8miK9/view",
  },
  {
    id: 2,
    title: "Spring Boot, Spring Security & Application Finalization",
    issuer: "Board Infinity",
    platform: "Coursera",
    date: "2026",
    link: "https://www.coursera.org/account/accomplishments/verify/PDQDGAKHH9WA",
  },
  {
    id: 3,
    title: "IoT Devices",
    issuer: "University of Illinois Urbana-Champaign",
    platform: "Coursera",
    date: "2024",
    link: "https://www.coursera.org/account/accomplishments/verify/YE69IY5OWOZG",
  },
  {
    id: 4,
    title: "Programming in Python: A Hands-on Introduction",
    issuer: "Codio",
    platform: "Coursera",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/09QZMJL74YJY",
  },
  {
    id: 5,
    title: "Deloitte Australia - Technology  Job Simulation",
    issuer: "Forage",
    platform: "Forage",
    date: "2025",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_cKQEdYQB8nihWLz3D_1751560187287_completion_certificate.pdf",
  },
  {
    id: 6,
    title: "Deloitte Australia - Cyber Job Simulation",
    issuer: "Forage",
    platform: "Forage",
    date: "2025",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_cKQEdYQB8nihWLz3D_1751563758900_completion_certificate.pdf",
  },
  {
    id: 7,
    title: "CyberPeace Foundation",
    issuer: "CyberPeace Foundation, google.org & Chandigarh University",
    platform: "CyberPeace Foundation",
    date: "2025",
    link: "https://block.cyberpeace.org/v2/doc?id=e8136121cf777c98c82c2d6136b65f9e3e7f80e1e06e75cc20e5c7f758f8ba15",
  },
  {
    id: 8,
    title: "5G Network Fundamentals",
    issuer: "Institut Mines-Télécom (IMT)",
    platform: "Coursera",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/verify/8KYB04RNNOJC",
  },
  {
    id: 9,
    title: "Using Databases with Python",
    issuer: "University of Michigan",
    platform: "Coursera",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/verify/K3NKM7LUQKY4",
  },
  {
    id: 10,
    title: "Python Data Analytics",
    issuer: "Meta",
    platform: "Meta",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/verify/MD3ZQJM2XMA1",
  },
  {
    id: 11,
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    platform: "Coursera",
    date: "2024",
    link: "https://www.coursera.org/account/accomplishments/verify/LA5RA8FCQJOS",
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
