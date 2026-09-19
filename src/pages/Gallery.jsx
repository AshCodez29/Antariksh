import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { galleryMemories, astroPhotos } from '../data/galleryData';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [apodData, setApodData] = useState({
    title: 'Astronomy Picture of the Day',
    date: new Date().toISOString().slice(0, 10),
    explanation: 'NASA’s Astronomy Picture of the Day brings a new view of our universe every day.',
    url: 'https://apod.nasa.gov/apod/image/2401/OrionNebula_Hubble_960.jpg',
    media_type: 'image'
  });
  const [isApodModalOpen, setIsApodModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setApodData(data))
      .catch(() => {});
  }, []);

  const filteredMemories =
    selectedFilter === 'all'
      ? galleryMemories
      : galleryMemories.filter((mem) => mem[3] === selectedFilter);

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
            <p className="kicker">THE FLIGHT LOG / ARCHIVE 001</p>
            <h1>Proof we<br /><em>went outside.</em></h1>
            <p>Good company, odd experiments, late nights, and an alarming number of pictures of the moon.</p>
            <a href="#moments" className="explore-link">Unfold the archive <b>↓</b></a>
          </div>
          <div className="hero-ring">✦</div>
        </header>

        <section id="moments" className="gallery-page-content">
          <div className="container">
            <div className="gallery-page-heading">
              <div>
                <p className="kicker">MOMENTS IN ORBIT</p>
                <h2>Our cosmic<br />scrapbook.</h2>
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
                  src={apodData.media_type === 'image' ? apodData.url : apodData.url}
                  alt="NASA Astronomy Picture of the Day"
                />
                <span>
                  <b>NASA / APOD</b>
                  <strong id="apod-card-title">{apodData.title}</strong>
                  <small>OPEN TODAY’S IMAGE ↗</small>
                </span>
              </button>
            </div>

            <div className="gallery-controls" aria-label="Gallery controls">
              <label className="event-filter" htmlFor="event-filter">
                <span>FILTER BY EVENT</span>
                <select
                  id="event-filter"
                  name="event-filter"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All events</option>
                  <option value="star-party">Star Party</option>
                  <option value="workshops">Workshops</option>
                  <option value="internal-talks">Internal Talks</option>
                  <option value="outreachs">Outreachs</option>
                </select>
              </label>
              <a className="astro-jump" href="#astrophotography">View astrophotography <b>↓</b></a>
            </div>

            <div className="gallery-line">
              <span>{selectedFilter === 'all' ? 'SCROLL TO REVEAL' : `${selectedFilter.toUpperCase()} MOMENTS`}</span>
              <span>{filteredMemories.length} MOMENT{filteredMemories.length === 1 ? '' : 'S'} CAPTURED</span>
            </div>

            <div id="event-grid" className="event-grid">
              {filteredMemories.map((item, idx) => (
                <article
                  key={idx}
                  className="event-tile in-view"
                  data-event-type={item[3]}
                  style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                >
                  <img src={item[0]} alt={item[1]} loading="lazy" />
                  <div className="tile-caption" style={{ opacity: 1 }}>
                    <strong>{item[1]}</strong>
                    <span>{item[2]}</span>
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
              <p>A home for the club's views of the night sky. These are placeholder images for now, ready to be swapped with your own captures.</p>
            </div>
            <div className="gallery-line">
              <span>CLUB CAPTURES</span>
              <span>6 PLACEHOLDER FRAMES</span>
            </div>
            <div id="astro-grid" className="event-grid astro-grid">
              {astroPhotos.map((photo, idx) => (
                <article
                  key={idx}
                  className="event-tile in-view"
                  style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                >
                  <img src={photo[0]} alt={photo[1]} loading="lazy" />
                  <div className="tile-caption" style={{ opacity: 1 }}>
                    <strong>{photo[1]}</strong>
                    <span>{photo[2]}</span>
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
              <img id="apod-image" src={apodData.url} alt="NASA Astronomy Picture of the Day" />
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
