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

export default function Gallery() {
  const [activeYear, setActiveYear] = useState(null);

  const years = useMemo(
    () => [...new Set(GALLERY_EVENTS.map(e => e.year))].sort((a, b) => b - a),
    []
  );

  const yearEvents = useMemo(
    () => (activeYear ? GALLERY_EVENTS.filter(e => e.year === activeYear) : []),
    [activeYear]
  );

  const handleYear = y => setActiveYear(prev => (prev === y ? null : y));

  return (
    <section id="gallery">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
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
      >
        {GALLERY_EVENTS.slice(0, 6).map((ev, i) => (
          <motion.a
            key={ev.title + ev.year}
            variants={item}
            className="g-card"
            href={ev.albumUrl || undefined}
            target={ev.albumUrl ? '_blank' : undefined}
            rel="noreferrer"
            style={i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : undefined}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {getCover(ev.photo) ? (
              <img src={getCover(ev.photo)} alt={ev.title} loading="lazy" />
            ) : (
              <div className="g-ph">
                <div className="g-ph-icon">📸</div>
                <div className="g-ph-text">Photo coming soon</div>
              </div>
            )}
            <div className="g-overlay">
              <div className="g-tag">{ev.date}</div>
              <div className="g-cap">{ev.title}</div>
              {ev.albumUrl && <div className="g-zoom">→</div>}
            </div>
          </motion.a>
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
            >
              {yearEvents.length > 0 ? (
                yearEvents.map(ev => (
                  <motion.a
                    key={ev.title}
                    variants={miniItem}
                    className="g-mini-card"
                    href={ev.albumUrl || undefined}
                    target={ev.albumUrl ? '_blank' : undefined}
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getCover(ev.photo) ? (
                      <img src={getCover(ev.photo)} alt={ev.title} loading="lazy" />
                    ) : (
                      <div className="g-ph">
                        <div className="g-ph-icon" style={{ fontSize: '1.6rem' }}>📸</div>
                        <div className="g-ph-text">Coming soon</div>
                      </div>
                    )}
                    <div className="g-overlay">
                      <div className="g-tag">{ev.date}</div>
                      <div className="g-cap" style={{ fontSize: '0.88rem' }}>{ev.title}</div>
                      {ev.albumUrl && <div className="g-zoom" style={{ width: 30, height: 30, fontSize: '0.9rem' }}>→</div>}
                    </div>
                  </motion.a>
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
