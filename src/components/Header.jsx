import { useState, useEffect, useRef } from 'react';
import './Header.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ theme, toggleTheme }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    if (isClickScrolling.current) return;
    
    const scrollPos = window.scrollY + 120;
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveTab(item.id);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    
    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-logo">
        Bibek<span className="logo-dot">.</span>
      </div>
      <nav className={`navbar-pill-container ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`navbar-pill-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="navbar-actions">
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Day/Night Mode">
          <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
        </button>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle Menu">
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
    </header>
  );
}
