// Sponsors — infinite horizontal scrolling marquee of partner/sponsor cards.
// Each card shows the sponsor's photo and name.
// To add a sponsor, drop a photo in src/sponsors/ and edit SPONSORS in src/data/site.js.
import { motion } from 'framer-motion';
import { SPONSORS } from '../data/site';

const sponsorImages = import.meta.glob('../sponsors/*', { eager: true, as: 'url' });
function getSponsorPhoto(filename) {
  if (!filename) return null;
  return sponsorImages[`../sponsors/${filename}`] ?? null;
}

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
          {loop.map((s, i) => {
            const photo = getSponsorPhoto(s.photo);
            return (
              <div key={i} className="sponsor-chip">
                <div className="sponsor-photo">
                  {photo ? (
                    <img src={photo} alt={s.name} loading="lazy" />
                  ) : (
                    <div className="sponsor-photo-fallback">{s.name.charAt(0)}</div>
                  )}
                </div>
                <span className="sponsor-name">{s.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
