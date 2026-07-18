import { useState, useEffect } from 'react';
import './ProjectsSection.css';

export const projects = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    desc: 'Full-stack shopping app with cart, auth, and payment integration.',
    longDesc: 'A comprehensive full-stack e-commerce solution featuring a responsive user interface, secure user authentication with JWT, and integration with Stripe for payment processing. It includes a complete administrative dashboard to manage products, categories, stock levels, and order fulfillments.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'JWT'],
    features: [
      'Secure credit card payments processing via Stripe SDK.',
      'Richer search filtering, paginated list view, and live shopping cart state management.',
      'Comprehensive Admin Panel for complete inventory control and sales charts.',
      'Automated email notification pipeline on successful order placements.'
    ],
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    icon: 'fas fa-shopping-cart',
    iconLabel: 'E-Commerce',
    demoLink: '#',
    repoLink: 'https://github.com'
  },
  {
    id: 'chat',
    title: 'Real-Time Chat App',
    desc: 'Socket.io powered chat with rooms, typing indicators, and file sharing.',
    longDesc: 'An instant messaging dashboard designed for collaborative workspaces. Operating on high-speed WebSockets, it supports multi-room structures, active typing indicator flags, unread message badges, and media file uploads via AWS S3.',
    tags: ['Next.js', 'Socket.io', 'Redis', 'Node.js', 'AWS S3', 'MongoDB'],
    features: [
      'Instant message delivery with sub-10ms delivery latency via Socket.io.',
      'State-aware presence indicators showing online/offline user statuses.',
      'Redis Pub/Sub adapter integration supporting horizontally scaled websocket servers.',
      'Direct drag-and-drop file sharing with pre-signed upload URLs.'
    ],
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    icon: 'fas fa-comments',
    iconLabel: 'Chat App',
    demoLink: '#',
    repoLink: 'https://github.com'
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    desc: 'Interactive data visualization dashboard with real-time charts and reports.',
    longDesc: 'A complex business intelligence console visualizing traffic stats, conversions, and server telemetry. It aggregates raw database rows into interactive responsive timeline graphs, bar groupings, and visual radial gauges.',
    tags: ['React', 'D3.js', 'PostgreSQL', 'Express', 'Recharts', 'Tailwind'],
    features: [
      'Custom SVG chart paths built using D3.js transitions and brush zooming features.',
      'Incremental cache updates utilizing server cache metrics for faster query loads.',
      'Exportable reporting supporting PDF and spreadsheet generations.',
      'Configurable widgets grid allowing users to reposition dashboard modules.'
    ],
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    icon: 'fas fa-chart-line',
    iconLabel: 'Dashboard',
    demoLink: '#',
    repoLink: 'https://github.com'
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-inner">
        <div className="projects-header">
          <span className="section-badge"><i className="fas fa-rocket"></i> My Work</span>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="projects-subtitle">Here are some of my recent projects that showcase my skills and passion for development.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-img" style={{ background: project.gradient }}>
                <div className="project-img-content">
                  <i className={project.icon}></i>
                  <span>{project.iconLabel}</span>
                </div>
              </div>
              <h4>{project.title}</h4>
              <p>{project.desc}</p>
              <div className="project-tags">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <button className="proj-link live" onClick={() => setSelectedProject(project)}>
                  View Details <i className="fas fa-info-circle"></i>
                </button>
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="proj-link github">
                  <i className="fab fa-github"></i> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-header">
              <div className="modal-icon" style={{ background: selectedProject.gradient }}>
                <i className={selectedProject.icon}></i>
              </div>
              <div className="modal-title">
                <h3>{selectedProject.title}</h3>
                <span>{selectedProject.iconLabel} Project</span>
              </div>
            </div>
            <div className="modal-body">
              <div>
                <h4>Project Overview</h4>
                <p>{selectedProject.longDesc}</p>
              </div>
              <div>
                <h4>Key Implementation Features</h4>
                <ul className="modal-features">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx}><i className="fas fa-check-circle"></i> {feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Technologies Stack</h4>
                <div className="modal-tech">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <a href={selectedProject.demoLink} className="modal-btn demo">
                  Launch App <i className="fas fa-external-link-alt"></i>
                </a>
                <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer" className="modal-btn github">
                  GitHub Code <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
