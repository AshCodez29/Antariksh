import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import CSS directly from src/css for instant Vite HMR
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './css/theme.css';
import './css/additions.css';
import './css/navigation.css';
import './css/mission-accordion.css';
import './css/placeholders.css';
import './css/team.css';
import './css/events.css';
import './css/events-archive.css';
import './css/event-year-layout.css';
import './css/event-year-adjustments.css';
import './css/event-orbit-final.css';
import './css/event-orbit-clean.css';
import './css/gallery.css';
import './css/gallery-page.css';
import './css/gallery-video.css';
import './css/gallery-filters.css';
import './css/gallery-palette.css';
import './css/apod.css';
import './css/projects-cards.css';
import './css/projects-sections.css';
import './css/projects-stack.css';

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



