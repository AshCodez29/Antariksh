import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { timelineEvents, orbitActivities } from '../data/eventsData';

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const formatDateStr = (isoString) => {
    const d = new Date(isoString);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTimeStr = (startIso, endIso) => {
    const s = new Date(startIso);
    const e = new Date(endIso);
    if (isNaN(s.getTime())) return 'TBD';
    const sStr = s.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const eStr = isNaN(e.getTime()) ? '' : ` – ${e.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return `${sStr}${eStr}`;
  };

  const normalizedEvents = [...orbitActivities, ...timelineEvents].map(e => ({
    id: e.id || e.slug,
    slug: e.slug,
    type: e.group || 'organised',
    tag: (e.eventType || 'EVENT').replace('_', ' '),
    title: e.title,
    dateStr: formatDateStr(e.startDate),
    dateObj: new Date(e.startDate),
    summary: e.summary,
    body: e.agenda || e.summary,
    time: formatTimeStr(e.startDate, e.endDate),
    venue: e.venue,
    image: e.bannerImageUrl
  })).sort((a, b) => b.dateObj - a.dateObj);

  const filteredEvents = activeFilter === 'all' 
    ? normalizedEvents 
    : normalizedEvents.filter(e => e.type === activeFilter);

  const groupedEvents = filteredEvents.reduce((acc, ev) => {
    const year = ev.dateObj.getFullYear() || 1970;
    if (!acc[year]) acc[year] = [];
    acc[year].push(ev);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedEvents).sort((a, b) => b - a);

  useEffect(() => {
    if (filteredEvents.length > 0) {
      const isSelectedInList = selectedEvent && filteredEvents.find(e => e.id === selectedEvent.id);
      if (!isSelectedInList) {
        setSelectedEvent(filteredEvents[0]);
      }
    } else {
      setSelectedEvent(null);
    }
  }, [filteredEvents, selectedEvent]);

  return (
    <>
      <Navbar />
      <div className="events-page-wrapper">
        <video className="events-bg-video" autoPlay muted playsInline loop preload="metadata" aria-hidden="true">
          <source src="/static/assets/galaxies.mp4" type="video/mp4" />
        </video>
        <div className="events-bg-overlay"></div>

        <div className="archive-container">
          <header className="archive-internal-header">
            <h1>EVENT LOG</h1>
            <div className="archive-filters">
              {['all', 'organised', 'outreach'].map(f => (
                <button 
                  key={f}
                  className={`archive-filter-btn ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f === 'all' ? '[ ALL ]' : `[ ${f.toUpperCase()} ]`}
                </button>
              ))}
            </div>
          </header>

          <div className="archive-body">
            {/* Left Index (34% width, scrollable) */}
            <div className="archive-index">
              {sortedYears.map(year => (
                <div key={year} className="year-group">
                  <h2 className="year-label">{year}</h2>
                  <div className="year-divider"></div>
                  {groupedEvents[year].map(ev => (
                    <button 
                      key={ev.id}
                      className={`index-item ${selectedEvent?.id === ev.id ? 'selected' : ''}`}
                      onClick={() => setSelectedEvent(ev)}
                    >
                      <span className="index-date">{ev.dateStr}</span>
                      <h3 className="index-title">{ev.title}</h3>
                      <span className="index-category">{ev.tag}</span>
                    </button>
                  ))}
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <p className="no-events-text">No events found.</p>
              )}
            </div>

            {/* Right Dossier (66% width, inset image & breathing space) */}
            <div className="archive-dossier">
              {selectedEvent ? (
                <div className="dossier-inner">
                  <div className="dossier-hero-inset">
                    <img src={selectedEvent.image} alt={selectedEvent.title} />
                  </div>
                  
                  <div className="dossier-header-group">
                    <span className="dossier-category">[{selectedEvent.tag}]</span>
                    <h2 className="dossier-title">{selectedEvent.title}</h2>
                  </div>

                  <div className="dossier-meta">
                    <div className="dossier-meta-item">
                      <span className="dossier-meta-label">DATE</span>
                      <span className="dossier-meta-value">{selectedEvent.dateStr}</span>
                    </div>
                    <div className="dossier-meta-item">
                      <span className="dossier-meta-label">TIME</span>
                      <span className="dossier-meta-value">{selectedEvent.time}</span>
                    </div>
                    <div className="dossier-meta-item">
                      <span className="dossier-meta-label">LOCATION</span>
                      <span className="dossier-meta-value">{selectedEvent.venue}</span>
                    </div>
                  </div>

                  <div className="dossier-body">
                    {selectedEvent.body}
                  </div>
                </div>
              ) : (
                <div className="dossier-empty">
                  SELECT A TRANSMISSION TO BEGIN
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
