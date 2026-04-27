import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_EVENTS } from '../data/site';

const covers = import.meta.glob('../Covers/*', { eager: true, as: 'url' });
function getCover(filename) {
  if (!filename) return null;
  // Strip any leading path the user may have typed — only the filename matters
  const name = filename.replace(/^.*[\\/]/, '');
  return covers[`../Covers/${name}`] ?? null;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const miniItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function GalleryCard({ ev, variants, style, mini = false, activeCard, setActiveCard }) {
  const key = ev.title + ev.year;
  const isActive = activeCard === key;
  const cover = getCover(ev.photo);

  return (
    <motion.div
      variants={variants}
      className={`${mini ? 'g-mini-card' : 'g-card'} ${isActive ? 'g-card-active' : ''}`}
      style={style}
      onClick={() => setActiveCard(isActive ? null : key)}
      whileHover={!isActive ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.3 }}
    >
      {cover ? (
        <img src={cover} alt={ev.title} loading="lazy" />
      ) : (
        <div className="g-ph">
          <div className="g-ph-icon" style={mini ? { fontSize: '1.6rem' } : {}}>📸</div>
          <div className="g-ph-text">{mini ? 'Coming soon' : 'Photo coming soon'}</div>
        </div>
      )}

      {/* Always-visible bottom info overlay */}
      <div className="g-overlay">
        <div className="g-tag">{ev.date}</div>
        <div className="g-cap" style={mini ? { fontSize: '0.88rem' } : {}}>{ev.title}</div>
      </div>

      {/* Blue hue + "View Photos" button shown on click */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="g-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            {ev.albumUrl ? (
              <motion.a
                href={ev.albumUrl}
                target="_blank"
                rel="noreferrer"
                className="g-view-btn"
                style={mini ? { padding: '8px 16px', fontSize: '0.75rem' } : undefined}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                onClick={e => e.stopPropagation()}
              >
                View Photos →
              </motion.a>
            ) : (
              <motion.span
                className="g-view-btn g-view-btn-disabled"
                style={mini ? { padding: '8px 16px', fontSize: '0.75rem' } : undefined}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                No album yet
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeYear, setActiveYear] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const years = useMemo(
    () => [...new Set(GALLERY_EVENTS.map(e => e.year))].sort((a, b) => b - a),
    []
  );

  const yearEvents = useMemo(
    () => (activeYear ? GALLERY_EVENTS.filter(e => e.year === activeYear) : []),
    [activeYear]
  );

  const handleYear = y => {
    setActiveYear(prev => (prev === y ? null : y));
    setActiveCard(null);
  };

  return (
    <section id="gallery" onClick={() => setActiveCard(null)}>
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Captured Moments</div>
        <h2 className="sec-h" style={{ color: 'var(--blue)' }}>Our Events Gallery</h2>
        <p className="section-sub">Click any event to view the full album.</p>
      </motion.div>

      {/* ── Main featured grid ── */}
      <motion.div
        className="g-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        onClick={e => e.stopPropagation()}
      >
        {GALLERY_EVENTS.slice(0, 6).map((ev, i) => (
          <GalleryCard
            key={ev.title + ev.year}
            ev={ev}
            variants={item}
            style={i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : undefined}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        ))}
      </motion.div>

      {/* ── Browse by year ── */}
      <motion.div
        className="g-browse"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="g-browse-header">
          <div className="g-browse-rule" />
          <span className="g-browse-label">Browse by Year</span>
          <div className="g-browse-rule" />
        </div>

        <div className="g-year-tabs">
          {years.map(y => (
            <button
              key={y}
              type="button"
              className={`g-year-tab ${activeYear === y ? 'is-active' : ''}`}
              onClick={() => handleYear(y)}
            >
              {y}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {activeYear && (
            <motion.div
              key={activeYear}
              className="g-year-grid"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
              onClick={e => e.stopPropagation()}
            >
              {yearEvents.length > 0 ? (
                yearEvents.map(ev => (
                  <GalleryCard
                    key={ev.title}
                    ev={ev}
                    variants={miniItem}
                    mini
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                  />
                ))
              ) : (
                <p className="g-empty">No events recorded for {activeYear} yet.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
