import { useState } from 'react';
import './SkillsSection.css';

const skillCategories = [
  { title: 'Languages', category: 'languages', skills: [
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f7df1e', level: 90 },
    { name: 'Python', icon: 'fab fa-python', color: '#3776ab', level: 75 },
    { name: 'TypeScript', icon: null, text: 'TS', color: '#3178c6', level: 80 },
  ]},
  { title: 'Frontend Frameworks', category: 'frameworks', skills: [
    { name: 'React', icon: 'fab fa-react', color: '#61dafb', level: 90 },
    { name: 'Next.js', icon: null, text: 'N', color: '#7b61ff', level: 85 },
    { name: 'HTML5', icon: 'fab fa-html5', color: '#e34f26', level: 95 },
  ]},
  { title: 'Backend Development', category: 'frameworks', skills: [
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#68a063', level: 85 },
    { name: 'Express', icon: null, text: 'Ex', color: '#f1f5f9', level: 80 },
    { name: 'Django', icon: 'fab fa-python', color: '#0c4b33', level: 60 },
  ]},
  { title: 'Database Systems', category: 'tools', skills: [
    { name: 'MongoDB', icon: null, text: 'MG', color: '#47a248', level: 80 },
    { name: 'PostgreSQL', icon: 'fas fa-database', color: '#336b91', level: 70 },
    { name: 'Redis', icon: null, text: 'Re', color: '#dc382c', level: 55 },
  ]},
  { title: 'DevOps & Cloud', category: 'tools', skills: [
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed', level: 65 },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032', level: 90 },
    { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900', level: 50 },
  ]},
  { title: 'Design & Styling', category: 'frameworks', skills: [
    { name: 'Tailwind', icon: null, text: 'TW', color: '#38bdf8', level: 90 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4', level: 95 },
    { name: 'Figma', icon: 'fab fa-figma', color: '#a259ff', level: 70 },
  ]},
];

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'tools', label: 'Tools' },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.category === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <span className="skills-badge"><i className="fas fa-bolt" style={{marginRight: '6px'}}></i>Technical Expertise</span>
          <h2 className="skills-title">My <span className="gradient-text">Skills</span></h2>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredCategories.map((cat) => (
            <div className="skills-card" key={cat.title}>
              <h3 className="skills-card-title">{cat.title}</h3>

              <ul className="skills-list">
                {cat.skills.map((skill) => (
                  <li className="skill-item" key={skill.name}>
                    <div
                      className="skill-icon-wrap"
                      style={{ '--skill-color': skill.color }}
                    >
                      {skill.icon ? (
                        <i className={skill.icon} />
                      ) : (
                        <span className="skill-text-icon">{skill.text}</span>
                      )}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{
                          '--fill-width': `${skill.level}%`,
                          '--skill-color': skill.color,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
