import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../css/navigation.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 40);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
        // Also close mobile menus when scrolling down
        setIsNavOpen(false);
        setIsMoreOpen(false);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsNavOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    setIsNavOpen(false);
    setIsMoreOpen(false);
    if (location.pathname === '/') {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + hash);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}
      aria-label="Primary navigation"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/static/assets/Antariksh_Logo.png" alt="ANTARIKSH" style={{ height: '28px', objectFit: 'contain' }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/events">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/projects">
                Projects
              </NavLink>
            </li>
            <li className="nav-item nav-more-wrap" style={{ position: 'relative' }}>
              <button
                className="nav-more-toggle"
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                aria-expanded={isMoreOpen}
                aria-label="Show more navigation options"
              >
                <span>More</span>
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'transform 0.25s ease', transform: isMoreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className={`collapse nav-more ${isMoreOpen ? 'show' : ''}`} id="more-nav">
                <Link to="/team" onClick={() => setIsMoreOpen(false)}>
                  Meet The Crew
                </Link>
                <a href="#missions" onClick={(e) => handleHashClick(e, '#missions')}>
                  Missions
                </a>
                <a href="#signal" onClick={(e) => handleHashClick(e, '#signal')}>
                  Reach Out
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="join-pill" href="mailto:hello@antariksh.club">
                Join the crew <span>↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
