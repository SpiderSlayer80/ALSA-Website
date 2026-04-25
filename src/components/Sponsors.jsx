// Sponsors — infinite horizontal scrolling marquee of partner/sponsor chips.
// Each chip shows the sponsor's tier badge (Gold / Silver / Bronze) and name.
// To add a sponsor, edit the SPONSORS array in src/data/site.js.
import { motion } from 'framer-motion';
import { SPONSORS } from '../data/site';

export default function Sponsors() {
  // Duplicate the list so the CSS marquee can loop seamlessly: when the first copy scrolls
  // out of view, the second copy has already filled the gap — no visible jump.
  const loop = [...SPONSORS, ...SPONSORS];

  return (
    <section id="sponsors">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Backed By</div>
        <h2 className="sec-h" style={{ color: 'var(--blue)' }}>Our Partners & Sponsors</h2>
        <p className="section-sub">
          Local Sri Lankan businesses powering our community.{' '}
          <a href="#contact" className="inline-link">Become a sponsor →</a>
        </p>
      </motion.div>

      <div className="sponsors-marquee">
        <div className="sponsors-track">
          {loop.map((s, i) => (
            <div key={i} className={`sponsor-chip tier-${s.tier.toLowerCase()}`}>
              <span className="sponsor-tier">{s.tier}</span>
              <span className="sponsor-name">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
