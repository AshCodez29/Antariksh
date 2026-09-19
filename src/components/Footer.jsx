import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <Link className="footer-logo" to="/" onClick={scrollToTop}>
            ANTARIKSH<span>✦</span>
          </Link>
          <div className="footer-extras">
            <div className="footer-follow">
              <span>FOLLOW THE COSMIC VOYAGE</span>
              <div className="socials">
                <a href="#" aria-label="Instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                    <circle cx="12" cy="12" r="4"></circle>
                    <circle cx="17.5" cy="6.5" r="1"></circle>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" title="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M6.2 8.3H3.1V21h3.1V8.3ZM4.7 3A1.8 1.8 0 1 0 4.7 6.6 1.8 1.8 0 0 0 4.7 3ZM21 13.7c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2v-1.8H9.5V21h3.1v-6.3c0-1.7.3-3.3 2.4-3.3 2 0 2 1.9 2 3.4V21v-7.3Z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" title="Twitter">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M19.9 7.1v.5c0 5.3-4 11.4-11.4 11.4-2.3 0-4.3-.7-6.1-1.8h.9c1.8 0 3.5-.6 4.8-1.6a4 4 0 0 1-3.7-2.8 4 4 0 0 0 1.8-.1A4 4 0 0 1 3 8.8v-.1c.5.3 1.2.5 1.8.5a4 4 0 0 1-1.2-5.3 11.3 11.3 0 0 0 8.2 4.2 4 4 0 0 1 6.8-3.6c.9-.2 1.7-.5 2.4-.9-.3.9-.9 1.6-1.6 2.1.7-.1 1.4-.3 2-.5-.4.7-.9 1.3-1.5 1.8Z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <a className="footer-location" href="#">
              FIND US AT: LOCATION PLACEHOLDER ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ANTARIKSH CLUB</span>
          <span>MADE UNDER THE SAME SKY</span>
          <a href="#" onClick={scrollToTop}>
            BACK TO EARTH ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
