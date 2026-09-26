import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveCrew() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Member')
          .select('*')
          .eq('isAlumni', false)
          .order('displayOrder', { ascending: true, nullsFirst: false })
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching crew from Supabase:', error);
        } else if (data) {
          const sorted = [...data].sort((a, b) => {
            const orderA = a.displayOrder !== null && a.displayOrder !== undefined ? Number(a.displayOrder) : Infinity;
            const orderB = b.displayOrder !== null && b.displayOrder !== undefined ? Number(b.displayOrder) : Infinity;
            if (orderA !== orderB) {
              return orderA - orderB;
            }
            return (a.name || '').localeCompare(b.name || '');
          });
          setMembers(sorted);
        }
      } catch (err) {
        console.error('Failed to query Member table:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActiveCrew();
  }, []);

  const FILTERS = ['all', 'Mentors', 'BTech', 'TY', 'SY'];

  const filteredMembers = activeFilter === 'all'
    ? members
    : activeFilter === 'Mentors'
      ? members.filter(m => (m.department || '').toLowerCase().includes('faculty') || !m.academicYear || (m.role || '').toUpperCase() === 'ADMIN')
      : members.filter(m => m.academicYear === activeFilter);

  const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80';

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
          </div>
        </section>

        <section className="crew-directory" aria-label="Antariksh crew">
          <div className="container">
            
            {/* Filter Pills (Desktop - No Brackets) */}
            <div className="crew-domain-filters desktop-filters">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  className={`crew-domain-pill ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'all' ? 'ALL' : filter.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Filter Dropdown (Mobile) */}
            <div className="mobile-filters crew-mobile-dropdown">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="crew-mobile-dropdown-btn"
              >
                <span>
                  {activeFilter === 'all' ? 'ALL CREW' : activeFilter.toUpperCase()}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: isFilterDropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {isFilterDropdownOpen && (
                <div className="crew-mobile-dropdown-menu">
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setActiveFilter(f);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`crew-mobile-dropdown-item ${activeFilter === f ? 'active' : ''}`}
                    >
                      {f === 'all' ? 'ALL CREW' : f.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="crew-loading">
                LOADING CREW MANIFEST...
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="crew-empty">
                NO CREW MEMBERS FOUND IN THIS CATEGORY.
              </div>
            ) : (
              <div className="crew-grid-5">
                {filteredMembers.map((member) => (
                  <article 
                    className="crew-compact-card" 
                    key={member.id || member.slug}
                    onClick={() => setSelectedMember(member)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedMember(member);
                      }
                    }}
                  >
                    <div className="crew-square-image">
                      <img 
                        src={member.avatarImageUrl || FALLBACK_AVATAR} 
                        alt={member.name} 
                        loading="lazy"
                      />
                    </div>
                    <div className="crew-card-meta">
                      <h3 className="crew-member-name" title={member.name}>
                        {(member.name || '').replace(/\n/g, ' ')}
                      </h3>
                      <span className="crew-role-badge">
                        {member.academicYear || member.role || 'MEMBER'}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
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

      {/* Sci-Fi Frosted Glass Member Detail Modal */}
      {selectedMember && (
        <div className="crew-modal-backdrop" onClick={() => setSelectedMember(null)}>
          <div className="crew-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="crew-modal-close" 
              onClick={() => setSelectedMember(null)}
              aria-label="Close details"
            >
              ×
            </button>
            <div className="crew-modal-header">
              <div className="crew-modal-avatar">
                <img src={selectedMember.avatarImageUrl || FALLBACK_AVATAR} alt={selectedMember.name} />
              </div>
              <div className="crew-modal-info">
                <div className="crew-modal-badge-row">
                  <span className="crew-modal-role-badge">{selectedMember.role || 'MEMBER'}</span>
                </div>
                <h2>{(selectedMember.name || '').replace(/\n/g, ' ')}</h2>
                <p className="crew-modal-subtitle">
                  {[
                    selectedMember.department,
                    selectedMember.academicYear
                  ].filter(Boolean).join(' • ')}
                </p>
              </div>
            </div>

            {selectedMember.bio && (
              <p className="crew-modal-bio">{selectedMember.bio}</p>
            )}

            <div className="crew-modal-socials">
              {selectedMember.linkedinUrl && (
                <a href={selectedMember.linkedinUrl} target="_blank" rel="noopener noreferrer" className="crew-social-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96Z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {selectedMember.githubUrl && (
                <a href={selectedMember.githubUrl} target="_blank" rel="noopener noreferrer" className="crew-social-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {selectedMember.instagramUrl && (
                <a href={selectedMember.instagramUrl} target="_blank" rel="noopener noreferrer" className="crew-social-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
