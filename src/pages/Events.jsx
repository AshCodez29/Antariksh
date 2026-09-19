import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { timelineEvents, orbitActivities } from '../data/eventsData';

const ICONS = {
  'star-party': (
    <path
      d="M8 1l1.8 4.6L14.5 6l-3.6 3.1L12 14 8 11.3 4 14l1.1-4.9L1.5 6l4.7-.4L8 1z"
      fill="none"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  workshop: (
    <path
      d="M2 14l4.2-4.2m0 0a2.6 2.6 0 103.6-3.6L13.5 2.5 12 1l-3.7 3.7a2.6 2.6 0 10-3.6 3.6z"
      fill="none"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  'internal-talk': (
    <path d="M1.5 3h13v8h-6l-3 3v-3h-4z" fill="none" strokeWidth="1.4" strokeLinejoin="round" />
  ),
  visit: (
    <>
      <circle cx="8" cy="8" r="6.5" fill="none" strokeWidth="1.3" />
      <path d="M11 5l-2 4-4 2 2-4z" fill="none" strokeWidth="1.2" strokeLinejoin="round" />
    </>
  )
};

const LABELS = {
  'star-party': 'Star Party',
  workshop: 'Workshop',
  'internal-talk': 'Internal Talk',
  visit: 'Visit'
};

export default function Events() {
  const [activeTimelineFilter, setActiveTimelineFilter] = useState('all');
  const [timelineModalEvent, setTimelineModalEvent] = useState(null);
  const [orbitModalEvent, setOrbitModalEvent] = useState(null);

  const filteredTimeline =
    activeTimelineFilter === 'all'
      ? timelineEvents
      : timelineEvents.filter((e) => e.category === activeTimelineFilter);

  const organizedEvents = orbitActivities.filter((e) => e.group === 'organised');
  const outreachEvents = orbitActivities.filter((e) => e.group === 'outreach');

  return (
    <>
      <Navbar />

      <div className="page">
        <header className="masthead">
          <div className="eyebrow-line">
            <span className="dash"></span>
            <span>Astronomy Club</span>
          </div>
          <h1>Events</h1>
          <p>Star parties, workshops, talks, and visits — everything the club has run and has coming up, in one timeline.</p>
        </header>

        <nav className="filters" aria-label="Filter events by category">
          {[
            { id: 'all', label: 'All' },
            { id: 'star-party', label: 'Star Parties' },
            { id: 'workshop', label: 'Workshops' },
            { id: 'internal-talk', label: 'Internal Talks' },
            { id: 'visit', label: 'Visits' }
          ].map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeTimelineFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTimelineFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="timeline">
          {filteredTimeline.length === 0 ? (
            <p className="empty-state">No events in this category yet.</p>
          ) : (
            filteredTimeline.map((ev, i) => (
              <div key={i} className="event" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="node" aria-hidden="true">
                  <svg viewBox="0 0 16 16">{ICONS[ev.category]}</svg>
                </div>
                <div className="event-date">
                  {ev.displayDate} · {LABELS[ev.category]}
                </div>
                <h3 className="event-title">{ev.title}</h3>
                <p className="event-excerpt">{ev.excerpt}</p>
                <button className="read-more" type="button" onClick={() => setTimelineModalEvent(ev)}>
                  Read More
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Timeline Modal */}
      {timelineModalEvent && (
        <div className="modal-backdrop open" onClick={() => setTimelineModalEvent(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setTimelineModalEvent(null)}>
              &times;
            </button>
            <div className="modal-kicker">
              {LABELS[timelineModalEvent.category]} · {timelineModalEvent.displayDate}
            </div>
            <h2>{timelineModalEvent.title}</h2>
            <div className="modal-meta">
              <div>
                <strong>When:</strong> {timelineModalEvent.time}
              </div>
              <div>
                <strong>Where:</strong> {timelineModalEvent.location}
              </div>
            </div>
            <p className="body">{timelineModalEvent.body}</p>
          </div>
        </div>
      )}

      {/* Orbit / Activities Experience Section */}
      <div className="events-experience">
        <video className="events-background" autoPlay muted playsInline loop preload="metadata" aria-hidden="true">
          <source src="/static/assets/galaxies.mp4" type="video/mp4" />
        </video>
        <div className="events-veil"></div>

        <main className="events-main">
          <section className="events-content">
            <header className="events-heading">
              <p>OUR JOURNEY</p>
              <h1>
                EVENTS <em>&amp;<br />ACTIVITIES</em>
              </h1>
              <span className="events-note">
                Different events.<br />Same sky.<br />One club. ✦
              </span>
              <div>
                From hands-on workshops to inspiring talks, exhibitions and outreach — explore the journeys that bring our club together.
              </div>
            </header>

            <div className="orbit-intro">
              <span>EVENT ARCHIVE / ACTIVE</span>
              <p>A collection of moments in orbit. Select a transmission to read its full story.</p>
            </div>

            <section className="event-orbit" aria-label="Event archive mosaic">
              <aside className="event-year-card year-26">
                <span>EVENTS</span>
                <b>2<br />0<br />2<br />6</b>
                <small>CURRENT ORBIT</small>
              </aside>
              <aside className="event-year-card year-25">
                <span>EVENTS</span>
                <b>2<br />0<br />2<br />5</b>
                <small>PAST ORBIT</small>
              </aside>

              <div className="orbit-message">
                <b>LOOK UP.<br />MAKE.<br />EXPLORE.</b>
                <span>ANTARIKSH / 2026</span>
              </div>

              <article className="orbit-fun-card fun-card-one">
                <span>✦ COSMIC NOTE</span>
                <strong>“The universe is under no obligation to make sense to you.”</strong>
                <small>— NEIL DEGRASSE TYSON</small>
              </article>

              <article className="orbit-fun-card fun-card-two">
                <span>TRANSMISSION / 025</span>
                <strong>Space is big.<br />Curiosity is bigger.</strong>
                <small>KEEP LOOKING UP ↗</small>
              </article>

              {/* Organised Events Grid */}
              <div className="event-card-grid">
                {organizedEvents.map((event, idx) => (
                  <article
                    key={idx}
                    className={`event-card orbit-card-${idx + 1}`}
                    tabIndex="0"
                    onClick={() => setOrbitModalEvent(event)}
                  >
                    <div className="event-card-image">
                      <img src={event.image} alt={event.title} />
                      <span className="event-card-tag">{event.tag}</span>
                    </div>
                    <div className="event-card-body">
                      <span className="event-card-date">{event.date}</span>
                      <h3>{event.title}</h3>
                      <p>{event.copy}</p>
                      <button className="event-read-more" type="button" aria-label={`Read more about ${event.title}`}>
                        READ MORE <b>→</b>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Outreach Events Grid */}
              <div className="event-card-grid event-card-grid-wide">
                {outreachEvents.map((event, idx) => (
                  <article
                    key={idx}
                    className={`event-card orbit-card-${idx + 5}`}
                    tabIndex="0"
                    onClick={() => setOrbitModalEvent(event)}
                  >
                    <div className="event-card-image">
                      <img src={event.image} alt={event.title} />
                      <span className="event-card-tag">{event.tag}</span>
                    </div>
                    <div className="event-card-body">
                      <span className="event-card-date">{event.date}</span>
                      <h3>{event.title}</h3>
                      <p>{event.copy}</p>
                      <button className="event-read-more" type="button" aria-label={`Read more about ${event.title}`}>
                        READ MORE <b>→</b>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="orbit-status">
                <i></i> SIGNALS NOMINAL <span>7 EVENTS LOGGED</span>
              </div>
            </section>
          </section>
        </main>

        <footer className="events-footer">
          EXPLORE <span>✦</span> LEARN <span>✦</span> GROW
        </footer>

        {/* Orbit Lightbox Modal */}
        {orbitModalEvent && (
          <div className="event-lightbox open" onClick={() => setOrbitModalEvent(null)}>
            <article className="magazine-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" type="button" aria-label="Close event details" onClick={() => setOrbitModalEvent(null)}>
                ×
              </button>
              <div className="magazine-image">
                <img src={orbitModalEvent.image} alt={orbitModalEvent.title} />
                <small>ANTARIKSH EVENT ARCHIVE</small>
              </div>
              <div className="magazine-copy">
                <p>{orbitModalEvent.tag} / EVENT LOG</p>
                <h2>{orbitModalEvent.title}</h2>
                <i></i>
                <p>{orbitModalEvent.detail}</p>
                <div className="magazine-meta">
                  <span>⌖ {orbitModalEvent.venue}</span>
                  <span>◷ {orbitModalEvent.date}</span>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
