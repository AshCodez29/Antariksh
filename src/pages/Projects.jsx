import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  highlightedProjects,
  boardProjects,
  STAGES,
} from "../data/projectsData";

const STATUS_LABEL = {
  completed: "Completed",
  ongoing: "Ongoing",
  prototype: "Prototype",
};

export default function Projects() {
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeDossier, setActiveDossier] = useState(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const nextStack = () => {
    setActiveStackIndex((prev) => (prev + 1) % highlightedProjects.length);
  };

  const prevStack = () => {
    setActiveStackIndex(
      (prev) =>
        (prev - 1 + highlightedProjects.length) % highlightedProjects.length,
    );
  };

  const filteredProjects =
    activeFilter === "all"
      ? boardProjects
      : boardProjects.filter((p) => p.status === activeFilter);

  // Keyboard Accessibility (Escape Key to Close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDossier(null);
      }
    };
    if (activeDossier) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDossier]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeDossier) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeDossier]);

  return (
    <div className="projects-page-wrapper">
      <video
        className="projects-galaxy"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/static/assets/green_galaxy.mp4" type="video/mp4" />
      </video>
      <div className="projects-veil" aria-hidden="true"></div>
      <div className="projects-grid-overlay" aria-hidden="true"></div>

      <Navbar />

      <main className="wrap">

        {/* Highlighted Project Stack Carousel */}
        <section
          className="project-stack-section"
          aria-label="Highlighted projects"
          style={{ paddingTop: 45 }}
        >
          <div
            className="project-stack"
            id="project-stack"
            aria-roledescription="carousel"
            aria-label="Highlighted projects"
          >
            {highlightedProjects.map((card, idx) => {
              const depth =
                (idx - activeStackIndex + highlightedProjects.length) %
                highlightedProjects.length;
              return (
                <article
                  key={card.id || idx}
                  className="stack-card"
                  data-title={card.title}
                  data-status={card.statusLabel || card.status}
                  data-index={idx + 1}
                  data-depth={depth}
                  aria-hidden={depth > 2 ? "true" : "false"}
                  onClick={nextStack}
                >
                  <img src={card.coverImageUrl || card.image} alt={card.title} />
                  <div className="stack-card-bar">
                    <div>
                      <span>{card.statusLabel || card.status}</span>
                      <strong>{card.title}</strong>
                    </div>
                    <b>{card.index}</b>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="stack-controls">
            <button
              className="stack-arrow"
              id="stack-prev"
              type="button"
              aria-label="Previous highlighted project"
              onClick={prevStack}
            >
              ←
            </button>
            <div
              className="stack-dots"
              id="stack-dots"
              aria-label="Choose a highlighted project"
            >
              {highlightedProjects.map((card, idx) => (
                <button
                  key={card.id || idx}
                  type="button"
                  className={idx === activeStackIndex ? "is-active" : ""}
                  aria-label={`Show ${card.title}`}
                  onClick={() => setActiveStackIndex(idx)}
                />
              ))}
            </div>
            <button
              className="stack-arrow"
              id="stack-next"
              type="button"
              aria-label="Next highlighted project"
              onClick={nextStack}
            >
              →
            </button>
          </div>
        </section>

        {/* Glassmorphic Category Filters (Desktop) */}
        <div className="filters desktop-filters" style={{ gap: "12px" }}>
          {["all", "completed", "ongoing", "prototype"].map((f) => (
            <button
              key={f}
              className={`filter ${activeFilter === f ? "is-active" : ""}`}
              onClick={() => setActiveFilter(f)}
              style={{
                background:
                  activeFilter === f
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                border: `1px solid rgba(255, 255, 255, ${activeFilter === f ? "0.5" : "0.15"})`,
                color: activeFilter === f ? "#fff" : "var(--text-dim)",
                transition: "all 0.25s ease",
                padding: "4px 16px",
              }}
            >
              
              {f === "all"
                ? "All missions"
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Category Filters (Mobile Dropdown) */}
        <div
          className="mobile-filters"
          style={{ position: "relative", marginBottom: "30px", zIndex: 10 }}
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
              fontSize: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              
              <span>
                {activeFilter === "all"
                  ? "All missions"
                  : activeFilter.charAt(0).toUpperCase() +
                    activeFilter.slice(1)}
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
              {["all", "completed", "ongoing", "prototype"].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setActiveFilter(f);
                    setIsFilterDropdownOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    textAlign: "left",
                    background:
                      activeFilter === f
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    color: activeFilter === f ? "#fff" : "var(--text-dim)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "1rem",
                  }}
                >
                  
                  {f === "all"
                    ? "All missions"
                    : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Board of Projects */}
        <div className="board" id="board">
          {/* Empty State Message */}
          {filteredProjects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "16px",
                border: "1px dashed rgba(255,255,255,0.1)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                No projects in this stage yet. Check back later!
              </p>
            </div>
          ) : (
            filteredProjects.map((p, i) => (
              <div
                key={p.id}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "800px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <article
                  className={`project-card project-card-${i + 1}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveDossier(p);
                    }
                  }}
                  onClick={() => setActiveDossier(p)}
                  style={{
                    gridTemplateColumns: "1fr",
                    position: "relative",
                    cursor: "pointer",
                    flexGrow: 1,
                  }}
                >
                  <div className={`project-image project-image-${p.id}`}>
                    <span>{p.code}</span>
                  </div>

                  {/* Original Gradient Card */}
                  <div
                    className="project-copy"
                    style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}
                  >
                    {/* Eye Logo READ MORE Top Right */}
                    <button
                      style={{
                        position: "absolute",
                        top: "24px",
                        right: "32px",
                        background: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        padding: "6px 14px",
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "1px",
                        pointerEvents: "none", /* Let click pass to article */
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      READ MORE
                    </button>

                    <p className="project-status">
                      {STATUS_LABEL[p.status]} / {p.code}
                    </p>
                    <h2>{p.title}</h2>
                    <p>{Array.isArray(p.body) ? p.body[0] : p.description}</p>
                    <button
                      className="project-open"
                      type="button"
                      tabIndex="-1"
                      style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                    >
                      OPEN BUILD LOG <b>↗</b>
                    </button>
                  </div>
                </article>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />

      {/* Dossier Modal - Untouched CSS styling */}
      {activeDossier && (
        <div
          className="dossier-backdrop is-open"
          onClick={() => setActiveDossier(null)}
        >
          <div className="dossier" onClick={(e) => e.stopPropagation()}>
            <div className="d-top">
              <div>
                <div className="d-code mono">{activeDossier.code}</div>
                <h2 className="d-title">{activeDossier.title}</h2>
              </div>
              <button
                className="d-close"
                aria-label="Close"
                onClick={() => setActiveDossier(null)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
              {Array.isArray(activeDossier.body) ? (
                activeDossier.body.map((t, idx) => <p key={idx}>{t}</p>)
              ) : (
                <p>{activeDossier.description}</p>
              )}
            </div>
            <div className="d-label mono">BUILD LOG</div>
            <ul className="checklist">
              {STAGES.map((s, i) => {
                const cls =
                  i < activeDossier.stage
                    ? "done"
                    : i === activeDossier.stage
                      ? "current"
                      : "";
                const mark = i < activeDossier.stage ? "✓" : "";
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
                  {/* Replaced full name with initials in avatar */}
                  <span className="crew-avatar">
                    {t.substring(0, 2).toUpperCase()}
                  </span>
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
                      <img
                        src={src}
                        alt={`Photo from ${activeDossier.title}`}
                        loading="lazy"
                      />
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
