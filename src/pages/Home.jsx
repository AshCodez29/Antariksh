import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';
import { teamMembers } from '../data/teamData';

export default function Home() {
  useReveal();
  const [activeAccordion, setActiveAccordion] = useState(0);

  const missions = [
    {
      index: '01',
      kicker: 'STARGAZING',
      title: 'STAR PARTIES',
      description:
        'Star Party is an Antariksh Club stargazing event held at remote venues, featuring meteor showers, astronomy talks, and telescope observations. Participants enjoy viewing the Milky Way and planets like Saturn, Jupiter, Venus, and Mars under a clear night sky.',
      symbol: '✦',
      bgImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85'
    },
    {
      index: '02',
      kicker: 'MAKE LAB',
      title: 'WORKSHOPS',
      description:
        'We conduct hands-on workshops in Radio Astronomy (ASRT & GMRT), Astrophotography, and Astronomical Image Processing, giving students practical exposure to observing, capturing, and analyzing the universe.',
      symbol: '⌁',
      bgImage: 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=1400&q=85'
    },
    {
      index: '03',
      kicker: 'COSMIC CULTURE',
      title: 'INTERNAL TALKS',
      description: 'Films, fireside talks and cosmic stories for every kind of curious mind.',
      symbol: '⌇',
      bgImage: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&w=1400&q=85'
    },
    {
      index: '04',
      kicker: 'OUTREACH',
      title: 'VOLUNTARY ACTIVITIES',
      description:
        'We organize expert-led workshops, science exhibitions, ISRO scientist talks, podcasts, and outreach programs, inspiring students and young learners through hands-on astronomy and space science experiences.',
      symbol: '↟',
      bgImage: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=85'
    }
  ];

  const marqueeMemories = [
    ['https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80', "Star Party '25", '12 SEP 2026'],
    ['https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80', 'Astro Photo Lab', '12 AUG 2026'],
    ['https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=900&q=80', 'Telescope Assembly', '14 FEB 2026'],
    ['https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&w=900&q=80', 'Planetarium Visit', '10 DEC 2025']
  ];

  return (
    <>
      <video
        className="site-galaxy-background"
        style={{ position: 'fixed', inset: 0, zIndex: -2, width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/static/assets/galaxy_small.mp4" type="video/mp4" />
      </video>
      <div className="site-galaxy-veil" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} aria-hidden="true"></div>
      <div className="noise"></div>

      <Navbar />

      <main id="home">
        <section className="hero">
          <video className="hero-video" autoPlay muted playsInline loop preload="metadata" aria-label="Galaxy moving in space">
            <source src="/static/assets/galaxy_small.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade"></div>
          <div className="hero-grid"></div>
          <div className="star star-a">✦</div>
          <div className="star star-b">✧</div>
          <div className="star star-c">✦</div>
          <div className="container hero-content">
            <div className="eyebrow hero-reveal"><i></i> EST. 2026 / EARTH ORBIT</div>
            <h1 aria-label="Antariksh Club">
              <span className="word word-one">ANTARIKSH</span>
              <span className="word word-two">
                Astronomy Club<span className="period">.</span>
              </span>
            </h1>
          </div>
          <div className="planet-dot"></div>
        </section>

        <section id="about" className="about section-pad">
          <div className="container">
            <div className="row align-items-end gy-5">
              <div className="col-lg-5 reveal">
                <p className="kicker">01 / ABOUT THE CLUB</p>
                <h2>Space is<br /><em>for everyone.</em></h2>
              </div>
              <div className="col-lg-6 offset-lg-1 reveal">
                <p className="lead-copy">
                  Astronomy Club, is a student-driven and faculty-guided entity encouraging astronomy
                  enthusiasts to build their careers in the field of astronomy. The objective of this club is to motivate
                  students towards the field of astronomy by emphasizing the opportunities for engineers in the field of
                  astronomy through arranging guidance lectures, stargazing programmes, and astrophysics forum.
                </p>
                <a href="#missions" className="text-link">
                  Meet our universe <span>→</span>
                </a>
              </div>
            </div>
            <div className="mission-stamp reveal">
              <span>WE BELIEVE</span>
              <strong>curiosity<br />has no<br />gravity.</strong>
              <span>✦ KEEP LOOKING UP ✦</span>
            </div>
          </div>
        </section>

        <section id="missions" className="missions section-pad">
          <div className="container">
            <div className="section-top reveal">
              <p className="kicker">02 / WHAT WE DO </p>
              <p className="mono">CHOOSE YOUR ADVENTURE ↓</p>
            </div>
            <div className="mission-accordion reveal" aria-label="What we do">
              {missions.map((mission, idx) => (
                <article
                  key={idx}
                  className={`accordion-mission ${activeAccordion === idx ? 'is-active' : ''}`}
                  tabIndex="0"
                  style={{ '--mission-image': `url('${mission.bgImage}')` }}
                  onMouseEnter={() => setActiveAccordion(idx)}
                  onFocus={() => setActiveAccordion(idx)}
                >
                  <div className="accordion-overlay"></div>
                  <div className="accordion-index">{mission.index}</div>
                  <div className="accordion-copy">
                    <span>{mission.kicker}</span>
                    <h3>{mission.title}</h3>
                    <p>{mission.description}</p>
                  </div>
                  <div className="accordion-symbol">{mission.symbol}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="flight-log" className="flight-log">
          <div className="container">
            <div className="log-intro reveal">
              <div>
                <p className="kicker">03 / THE FLIGHT LOG</p>
                <h2>Evidence of<br /><em>good times.</em></h2>
              </div>
              <p>Field notes from nights we looked up, days we got our hands dirty, and every delightfully nerdy moment in between.</p>
            </div>
          </div>
          <div className="featured-frame reveal">
            <Link to="/gallery">
              <img src="/static/assets/star-party-2025.jpg" alt="Club members gathered outdoors" />
            </Link>
            <div className="featured-veil"></div>
            <div className="featured-caption">
              <span>HIGHLIGHT EVENT</span>
              <strong>Star Party<br />2025</strong>
              <small>Hover to tune in ↓</small>
            </div>
            <div className="glass-orbit"><span>✦</span></div>
          </div>
          <div className="gallery-area">
            <div className="container">
              <div className="gallery-line">
                <span>ARCHIVE / SCROLL TO UNFOLD</span>
                <span>13 MOMENTS CAPTURED</span>
              </div>
            </div>
            <div className="marquee" aria-label="Flight log image archive">
              <div id="event-marquee" className="marquee-track">
                {[...marqueeMemories, ...marqueeMemories].map((mem, i) => (
                  <article className="marquee-item" key={i}>
                    <img src={mem[0]} alt={mem[1]} loading="lazy" />
                    <div className="marquee-label">
                      <strong>{mem[1]}</strong>
                      <span>{mem[2]}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="members" className="members section-pad">
          <div className="container">
            <div className="members-intro reveal">
              <p className="kicker">04 / MEET MEMBERS</p>
              <h2>The people<br /><em>behind the orbit.</em></h2>
              <p>Different disciplines, one shared pull toward the sky.</p>
            </div>
            <div className="member-deck">
              {teamMembers.slice(0, 4).map((member, idx) => (
                <article className="member-card reveal" key={member.id}>
                  <div className="member-image">
                    <img src={member.image} alt={member.alt} />
                    <span>{member.symbol}</span>
                  </div>
                  <div className="member-copy">
                    <p>CREW / {member.id}</p>
                    <h3 dangerouslySetInnerHTML={{ __html: member.name.replace('\n', '<br/>') }}></h3>
                    <span>{member.role}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="members-more reveal">
              <Link className="members-more-link" to="/team">
                View all crew <span>↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="container">
            <div className="quote-orbit"><span>✦</span></div>
            <blockquote className="reveal">“Somewhere, something incredible is waiting to be known.”</blockquote>
            <p className="quote-author reveal">— CARL SAGAN</p>
          </div>
        </section>

        <section id="signal" className="signal section-pad">
          <div className="container">
            <div className="signal-panel reveal">
              <div className="signal-static"></div>
              <div className="signal-copy">
                <p className="kicker">04 / TRANSMISSION INCOMING</p>
                <h2>Find your<br /><em>people.</em></h2>
                <p>Whether you know every moon of Jupiter or just love looking up, there’s a seat on this ship with your name on it.</p>
                <a className="launch-btn" href="mailto:hello@antariksh.club">Send a signal <span>↗</span></a>
              </div>
              <div className="signal-frequency"><span>FREQUENCY</span><b>22:22</b><span>MHz</span></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
