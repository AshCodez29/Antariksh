import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { highlightedProjects, boardProjects, STAGES } from '../data/projectsData';

const STATUS_LABEL = { completed: 'Completed', ongoing: 'Ongoing', prototype: 'Prototype' };

export default function Projects() {
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeDossier, setActiveDossier] = useState(null);

  const nextStack = () => {
    setActiveStackIndex((prev) => (prev + 1) % highlightedProjects.length);
  };

  const prevStack = () => {
    setActiveStackIndex((prev) => (prev - 1 + highlightedProjects.length) % highlightedProjects.length);
  };

  const filteredProjects =
    activeFilter === 'all'
      ? boardProjects
      : boardProjects.filter((p) => p.status === activeFilter);

  return (
    <div className="projects-page-wrapper">
      <video className="projects-galaxy" autoPlay muted playsInline loop preload="metadata" aria-hidden="true">
        <source src="/static/assets/green_galaxy.mp4" type="video/mp4" />
      </video>
      <div className="projects-veil" aria-hidden="true"></div>
      <div className="projects-grid-overlay" aria-hidden="true"></div>

      <Navbar />

      <main className="wrap">
        <section className="intro">
          <div className="eyebrow-row">
            <span className="orbit-dot"></span>
            <span className="kicker">PROJECT LOG / ACTIVE</span>
          </div>
          <h1>What we've built</h1>
          <p>Experiments, instruments, and tools made by the Antariksh crew. Explore the current build archive below.</p>
        </section>

        {/* Highlighted Project Stack Carousel */}
        <section className="project-stack-section" aria-labelledby="stack-title">
          <div className="stack-heading">
            <span className="mono">HIGHLIGHTED TRANSMISSIONS</span>
            <h2 id="stack-title">On the launch pad</h2>
          </div>
          <div className="project-stack" id="project-stack" aria-roledescription="carousel" aria-label="Highlighted projects">
            {highlightedProjects.map((card, idx) => {
              const depth = (idx - activeStackIndex + highlightedProjects.length) % highlightedProjects.length;
              return (
                <article
                  key={idx}
                  className="stack-card"
                  data-title={card.title}
                  data-status={card.status}
                  data-index={idx + 1}
                  data-depth={depth}
                  aria-hidden={depth > 2 ? 'true' : 'false'}
                  onClick={nextStack}
                >
                  <img src={card.image} alt={`Placeholder image for ${card.title}`} />
                  <div className="stack-card-bar">
                    <div>
                      <span>{card.status}</span>
                      <strong>{card.title}</strong>
                    </div>
                    <b>{card.index}</b>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="stack-controls">
            <button className="stack-arrow" id="stack-prev" type="button" aria-label="Previous highlighted project" onClick={prevStack}>
              ←
            </button>
            <div className="stack-dots" id="stack-dots" aria-label="Choose a highlighted project">
              {highlightedProjects.map((card, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={idx === activeStackIndex ? 'is-active' : ''}
                  aria-label={`Show ${card.title}`}
                  onClick={() => setActiveStackIndex(idx)}
                />
              ))}
            </div>
            <button className="stack-arrow" id="stack-next" type="button" aria-label="Next highlighted project" onClick={nextStack}>
              →
            </button>
          </div>
        </section>

        {/* Category Filters */}
        <div className="filters">
          <button
            className={`filter ${activeFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All missions
          </button>
          <button
            className={`filter ${activeFilter === 'completed' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            <span className="dot" style={{ background: 'var(--teal)' }}></span>Completed
          </button>
          <button
            className={`filter ${activeFilter === 'ongoing' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('ongoing')}
          >
            <span className="dot" style={{ background: 'var(--coral)' }}></span>Ongoing
          </button>
          <button
            className={`filter ${activeFilter === 'prototype' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('prototype')}
          >
            <span className="dot" style={{ background: 'var(--violet)' }}></span>Prototype
          </button>
        </div>

        {/* Board of Projects */}
        <div className="board" id="board">
          {filteredProjects.map((p, i) => (
            <article
              key={p.id}
              className={`project-card project-card-${i + 1}`}
              data-id={p.id}
              onClick={() => setActiveDossier(p)}
            >
              <div className={`project-image project-image-${p.id}`}>
                <span>{p.code}</span>
              </div>
              <div className="project-copy">
                <p className="project-status">
                  {STATUS_LABEL[p.status]} / {p.code}
                </p>
                <h2>{p.title}</h2>
                <p>{p.body[0]}</p>
                <button className="project-open" type="button">
                  OPEN BUILD LOG <b>↗</b>
                </button>
              </div>
              <aside className="project-actions">
                <div>
                  <span>STATUS AND<br />RESOURCES</span>
                  <b>{STATUS_LABEL[p.status].toUpperCase()}</b>
                  <small>
                    {p.stage + 1} / {STAGES.length} BUILD STAGES
                  </small>
                </div>
                <button className="project-article" type="button" onClick={(e) => e.stopPropagation()}>
                  VIEW ARTICLE
                </button>
              </aside>
              <div className="project-crew">
                <span>CREW</span>
                {p.team.map((member, idx) => (
                  <b key={idx}>{member}</b>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />

      {/* Dossier Modal */}
      {activeDossier && (
        <div className="dossier-backdrop is-open" onClick={() => setActiveDossier(null)}>
          <div className="dossier" onClick={(e) => e.stopPropagation()}>
            <div className="d-top">
              <div>
                <div className="d-code mono">{activeDossier.code}</div>
                <h2 className="d-title">{activeDossier.title}</h2>
              </div>
              <button className="d-close" aria-label="Close" onClick={() => setActiveDossier(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div>
              <span className={`stamp ${activeDossier.status}`}>
                {STATUS_LABEL[activeDossier.status].toUpperCase()}
              </span>
            </div>
            <div className="d-body">
              {activeDossier.body.map((t, idx) => (
                <p key={idx}>{t}</p>
              ))}
            </div>
            <div className="d-label mono">BUILD LOG</div>
            <ul className="checklist">
              {STAGES.map((s, i) => {
                const cls = i < activeDossier.stage ? 'done' : i === activeDossier.stage ? 'current' : '';
                const mark = i < activeDossier.stage ? '✓' : '';
                return (
                  <li key={i} className={cls}>
                    <span className="box">{mark}</span>
                    {s}
                  </li>
                );
              })}
            </ul>
            <div className="d-label mono">CREW</div>
            <div className="crew">
              {activeDossier.team.map((t, idx) => (
                <div className="crew-member" key={idx}>
                  <span className="crew-avatar">{t}</span>
                  {t}
                </div>
              ))}
            </div>
            {activeDossier.images && activeDossier.images.length > 0 && (
              <>
                <div className="d-label mono">FROM THE BUILD</div>
                <div className="polaroids">
                  {activeDossier.images.map((src, idx) => (
                    <div className="polaroid" key={idx}>
                      <img src={src} alt={`Photo from ${activeDossier.title}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
