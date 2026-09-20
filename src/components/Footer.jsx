import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-compact">
      <div className="footer-compact-container">
        
        <Link className="footer-compact-brand" to="/" onClick={scrollToTop}>
          <img src="/static/assets/Antariksh_Logo.png" alt="ANTARIKSH" className="footer-compact-logo" />
        </Link>
        
        <div className="footer-compact-socials">
          <a href="mailto:contact@antariksh.club" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
              <path d="M2 4l10 8 10-8"></path>
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 0c-6.627 0-12.031 5.405-12.031 12.031 0 2.115.548 4.148 1.587 5.96l-1.587 5.809 5.945-1.562c1.775.98 3.753 1.496 5.808 1.496 6.627 0 12.031-5.405 12.031-12.031s-5.404-12.031-12.031-12.031zm3.328 17.37c-.503.143-1.488.242-2.126.115-.638-.127-2.025-.563-3.033-1.341-1.007-.779-1.928-2.112-2.21-2.571-.281-.459-.444-1.127-.406-1.724.037-.597.242-1.054.496-1.309.255-.255.626-.358.894-.358.268 0 .523.013.727.051.205.038.562-.051.843.587.281.639.881 2.146.958 2.3.076.153.127.358-.026.601-.153.242-.255.421-.485.664-.23.243-.485.536-.689.702-.23.192-.472.409-.204.869.268.46 1.187 1.954 2.541 3.167 1.742 1.562 3.153 2.056 3.639 2.273.486.217.753.192 1.047-.077.294-.268 1.251-1.455 1.583-1.953.332-.498.638-.408 1.085-.243.447.166 2.822 1.328 3.307 1.571.485.242.804.37.919.574.115.205.115 1.188-.387 2.133z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/antariksh-astronomy-club/" aria-label="LinkedIn" target="_blank">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/antarikshclubvi?stkn=MWgwdnRjaWJqOGl6cw==" aria-label="Instagram" target="_blank">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
        
        <span className="footer-compact-copy">© {new Date().getFullYear()} Antariksh Astronomy Club</span>

      </div>
    </footer>
  );
}
