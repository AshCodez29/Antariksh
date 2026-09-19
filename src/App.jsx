import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '/public/static/css/styles.css';
import '/public/static/css/theme.css';
import '/public/static/css/additions.css';
import '/public/static/css/navbar-fix.css';
import '/public/static/css/navigation.css';
import '/public/static/css/mission-accordion.css';
import '/public/static/css/footer-extras.css';
import '/public/static/css/placeholders.css';
import '/public/static/css/team.css';
import '/public/static/css/events.css';
import '/public/static/css/event-year-layout.css';
import '/public/static/css/event-year-adjustments.css';
import '/public/static/css/event-orbit-final.css';
import '/public/static/css/event-orbit-clean.css';
import '/public/static/css/gallery.css';
import '/public/static/css/gallery-page.css';
import '/public/static/css/gallery-video.css';
import '/public/static/css/gallery-filters.css';
import '/public/static/css/gallery-palette.css';
import '/public/static/css/apod.css';
import '/public/static/css/projects-cards.css';
import '/public/static/css/projects-sections.css';
import '/public/static/css/projects-stack.css';

// Import Pages
import Home from './pages/Home';
import Team from './pages/Team';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Projects from './pages/Projects';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}
