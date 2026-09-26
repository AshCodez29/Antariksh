import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { galleryMemories, astroPhotos } from '../data/galleryData';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [apodData, setApodData] = useState({
    title: 'Astronomy Picture of the Day',
    date: new Date().toISOString().slice(0, 10),
    explanation: 'NASA’s Astronomy Picture of the Day brings a new view of our universe every day. (Currently showing placeholder due to NASA API rate limits on DEMO_KEY)',
    url: 'https://apod.nasa.gov/apod/image/2208/Cartwheel_Webb_960.jpg',
    media_type: 'image'
  });
  const [isApodModalOpen, setIsApodModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setApodData(data))
      .catch(() => {});
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return isNaN(d.getTime()) ? isoString : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  };

  const filteredMemories =
    selectedFilter === 'all'
      ? galleryMemories
      : galleryMemories.filter((mem) => mem.category === selectedFilter);

  const getApodPageUrl = (data) =>
    `https://apod.nasa.gov/apod/ap${data.date.replaceAll('-', '').slice(2)}.html`;

  return (
    <div className="gallery-page">
      <div className="noise"></div>
      <div className="gallery-page-video" aria-hidden="true">
        <video autoPlay muted playsInline loop preload="metadata">
          <source src="/static/assets/blue_galaxy.mp4" type="video/mp4" />
        </video>
      </div>

      <Navbar />

      <main>
        <header className="gallery-hero">
          <video className="gallery-hero-media" autoPlay muted playsInline loop preload="metadata" aria-label="Galaxy moving in space">
            <source src="/static/assets/blue_galaxy.mp4" type="video/mp4" />
          </video>
          <div className="gallery-hero-veil"></div>
          <div className="container gallery-hero-copy">
            <p className="kicker">ANTARIKSH ARCHIVES</p>
            <h1>We saw the cosmos<br /><em>& obviously, we took photos.</em></h1>
            <p>Events, experiments, stargazing, and whatever else happened along the way.</p>
            <a href="#moments" className="explore-link">  SCROLL DOWN TO EXPLORE <b>↓</b></a>
          </div>
          <div className="hero-ring"></div>
        </header>

        <section id="moments" className="gallery-page-content">
          <div className="container">
            <div className="gallery-page-heading">
              <div>
                <h2>Our <em>cosmic</em><br />scrapbook.</h2>
              </div>
              <button
                className="apod-card"
                id="apod-card"
                type="button"
                aria-haspopup="dialog"
                onClick={() => setIsApodModalOpen(true)}
              >
                <img
                  id="apod-thumb"
                  src={apodData.media_type === 'video' ? apodData.thumbnail_url : apodData.url}
                  alt="NASA Astronomy Picture of the Day"
                />
                <span>
                  <b>ASTRONOMY PICTURE OF THE DAY</b>
                  <strong id="apod-card-title">{apodData.title}</strong>
                  <p className="apod-click-info">CLICK FOR MORE INFO ↗</p>
                </span>
              </button>
            </div>

            <div className="gallery-controls" aria-label="Gallery controls">
              
              <div className="filter-container">
                {/* Desktop Filters */}
                <div className="desktop-filters" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['all', 'star-party', 'workshops', 'internal-talks', 'outreachs'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFilter(f)}
                      style={{
                        padding: "4px 16px",
                        borderRadius: "999px",
                        cursor: "pointer",
                        background:
                          selectedFilter === f
                            ? "rgba(255, 255, 255, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(12px)",
                        border: `1px solid rgba(255, 255, 255, ${selectedFilter === f ? "0.5" : "0.15"})`,
                        color: selectedFilter === f ? "#fff" : "var(--text-dim, #aebfd1)",
                        boxShadow:
                          selectedFilter === f
                            ? "0 4px 15px rgba(255, 255, 255, 0.1)"
                            : "none",
                        transition: "all 0.25s ease",
                        fontFamily: '"DM Mono", monospace',
                        fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      
                      {f === "all"
                        ? "All events"
                        : f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>

                {/* Mobile Filters */}
                <div
                  className="mobile-filters"
                  style={{ position: "relative", zIndex: 10, width: '100%' }}
                >
                  <button
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      background: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#fff",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
                      cursor: "pointer",
                      fontFamily: '"DM Mono", monospace'
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      
                      <span>
                        {selectedFilter === "all"
                          ? "All events"
                          : selectedFilter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: isFilterDropdownOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {isFilterDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        marginTop: "8px",
                        background: "rgba(9, 9, 27, 0.98)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      {['all', 'star-party', 'workshops', 'internal-talks', 'outreachs'].map((f) => (
                        <button
                          key={f}
                          onClick={() => {
                            setSelectedFilter(f);
                            setIsFilterDropdownOpen(false);
                          }}
                          style={{
                            width: "100%",
                            padding: "12px 20px",
                            textAlign: "left",
                            background:
                              selectedFilter === f
                                ? "rgba(255,255,255,0.1)"
                                : "transparent",
                            border: "none",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                            color: selectedFilter === f ? "#fff" : "var(--text-dim, #aebfd1)",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
                            cursor: "pointer",
                            fontFamily: '"DM Mono", monospace'
                          }}
                        >
                          
                          {f === "all"
                            ? "All events"
                            : f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <a className="astro-jump" href="#astrophotography" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '4px 16px',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
              }}>View astrophotography <b style={{marginLeft: '4px'}}>↓</b></a>
            </div>

            <div className="gallery-line">
              <span>{selectedFilter === 'all' ? 'SCROLL TO REVEAL' : `${selectedFilter.toUpperCase()} MOMENTS`}</span>
              <span>{filteredMemories.length} MOMENT{filteredMemories.length === 1 ? '' : 'S'} CAPTURED</span>
            </div>

            <div id="event-grid" className="event-grid">
              {filteredMemories.map((item, idx) => (
                <article
                  key={item.id || idx}
                  className="event-tile in-view"
                  data-event-type={item.category}
                  style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                >
                  <img src={item.mediaImageUrl} alt={item.caption} loading="lazy" />
                  <div className="tile-caption" style={{ opacity: 1 }}>
                    <strong>{item.caption}</strong>
                    <span>{formatDate(item.takenDate)}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="astrophotography" className="astrophotography-section">
          <div className="container">
            <div className="gallery-page-heading">
              <div>
                <p className="kicker">THROUGH OUR LENSES</p>
                <h2>Astrophoto<br /><em>archive.</em></h2>
              </div>
            </div>
            <div className="gallery-line">
              <span>CLUB CAPTURES</span>
              <span>6 PLACEHOLDER FRAMES</span>
            </div>
            <div id="astro-grid" className="event-grid astro-grid">
              {astroPhotos.map((photo, idx) => (
                <article
                  key={photo.id || idx}
                  className="event-tile in-view"
                  style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                >
                  <img src={photo.mediaImageUrl} alt={photo.caption} loading="lazy" />
                  <div className="tile-caption" style={{ opacity: 1 }}>
                    <strong>{photo.caption}</strong>
                    <span>{photo.tagline}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* APOD Modal */}
      {isApodModalOpen && (
        <div className="apod-modal open" id="apod-modal" onClick={() => setIsApodModalOpen(false)}>
          <article className="apod-dialog" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button
              className="apod-close"
              type="button"
              aria-label="Close Astronomy Picture of the Day"
              onClick={() => setIsApodModalOpen(false)}
            >
              ×
            </button>
            <div className="apod-image">
              <img 
                id="apod-image" 
                src={apodData.media_type === 'video' ? apodData.thumbnail_url : apodData.url} 
                alt="NASA Astronomy Picture of the Day" 
              />
            </div>
            <div className="apod-copy">
              <p>NASA / ASTRONOMY PICTURE OF THE DAY</p>
              <h2>{apodData.title}</h2>
              <time>{apodData.date}</time>
              <p>{apodData.explanation}</p>
              <a id="apod-link" href={getApodPageUrl(apodData)} target="_blank" rel="noopener noreferrer">
                READ ON NASA APOD ↗
              </a>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
