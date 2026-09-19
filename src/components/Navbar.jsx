import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
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
      className={`navbar navbar-expand-lg sticky-top ${isScrolled ? 'scrolled' : ''}`}
      style={{ position: 'sticky', top: 0, zIndex: 1000 }}
      aria-label="Primary navigation"
    >
      <div class="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-orbit">✦</span> ANTARIKSH
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
              <NavLink className="nav-link" to="/events">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/projects">
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
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className={`collapse nav-more ${isMoreOpen ? 'show' : ''}`} id="more-nav">
                <Link to="/team" onClick={() => setIsMoreOpen(false)}>
                  Meet Crew
                </Link>
                <a href="#missions" onClick={(e) => handleHashClick(e, '#missions')}>
                  Missions
                </a>
                <a href="#signal" onClick={(e) => handleHashClick(e, '#signal')}>
                  Signal
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
