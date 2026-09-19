import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { teamMembers } from '../data/teamData';

export default function Team() {
  return (
    <div className="crew-page">
      <video
        className="site-galaxy-background"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: -2, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/static/assets/galaxy_small.mp4" type="video/mp4" />
      </video>
      <div className="site-galaxy-veil" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} aria-hidden="true"></div>
      <div className="noise"></div>

      <Navbar />

      <main className="crew-main">
        <section className="crew-hero">
          <div className="container">
            <p className="crew-kicker">04 / MEET MEMBERS</p>
            <h1>The people<br /><em>behind the orbit.</em></h1>
            <p className="crew-intro">
              Different disciplines, one shared pull toward the sky. Meet the mentors, advisors, and students who make Antariksh move.
            </p>
          </div>
        </section>

        <section className="crew-directory" aria-label="Antariksh crew">
          <div className="container">
            <div className="crew-grid">
              {teamMembers.map((member) => (
                <article className="crew-card" key={member.id}>
                  <div className="crew-card-image">
                    <img src={member.image} alt={member.alt} />
                    <span className="crew-symbol">{member.symbol}</span>
                  </div>
                  <div className="crew-card-copy">
                    <p className="crew-card-index">CREW / {member.id}</p>
                    <h2 dangerouslySetInnerHTML={{ __html: member.name.replace('\n', '<br/>') }}></h2>
                    <p className="crew-role">{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="crew-quote">
          <div className="container">
            <blockquote style={{ fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '1rem' }}>
              “When you change the way you look at things, the things you look at change”
            </blockquote>
            <cite>— MAX PLANCK —</cite>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
