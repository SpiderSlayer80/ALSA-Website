import { motion } from 'framer-motion';
import { GALLERY_EVENTS } from '../data/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Gallery() {
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

      <motion.div
        className="g-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        {GALLERY_EVENTS.map((ev, i) => (
          <motion.a
            key={ev.title}
            variants={item}
            className="g-card"
            href={ev.albumUrl || undefined}
            target={ev.albumUrl ? '_blank' : undefined}
            rel="noreferrer"
            style={i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : undefined}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {ev.photo ? (
              <img src={ev.photo} alt={ev.title} loading="lazy" />
            ) : (
              <div className="g-ph">
                <div className="g-ph-icon">📸</div>
                <div className="g-ph-text">Photo coming soon</div>
              </div>
            )}
            <div className="g-overlay">
              <div className="g-tag">{ev.date}</div>
              <div className="g-cap">{ev.title}</div>
              {ev.albumUrl && <div className="g-zoom">View Album →</div>}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
