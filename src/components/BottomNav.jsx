import { useState, useEffect, useRef } from 'react';
import './BottomNav.css';

const navItems = [
  { id: 'home',     label: 'Home',     icon: 'fas fa-house' },
  { id: 'about',    label: 'About',    icon: 'fas fa-user' },
  { id: 'projects', label: 'Projects', icon: 'fas fa-rocket' },
  { id: 'skills',   label: 'Skills',   icon: 'fas fa-bolt' },
  { id: 'contact',  label: 'Contact',  icon: 'fas fa-envelope' },
];

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('home');
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  const handleScroll = () => {
    if (isClickScrolling.current) return;
    const scrollPos = window.scrollY + 110;
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveTab(item.id);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleClick = (id) => {
    setActiveTab(id);

    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => handleClick(item.id)}
          aria-label={item.label}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
