import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/bibek-chauhan/"
            className="social-link"
            target="_blank"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/chauhanbibek100"
            className="social-link"
            target="_blank"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.instagram.com/bibek_chauhan_292/?hl=en"
            className="social-link"
            target="_blank"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://wa.me/919263953996"
            className="social-link"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <p>&copy; {currentYear} Bibek Chauhan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
