// Testimonials — a staggered "wall of voices" on a dark background.
// All quotes are visible at once (no carousel): each card sits at a slightly
// different vertical offset, like photos pinned to a board.
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../data/site';
import { Ornament } from './icons';

const wall = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="testi-bg-orb one" />
      <div className="testi-bg-orb two" />

      <motion.div
        className="section-head light"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="sec-eyebrow" style={{ color: 'rgba(245,184,0,.7)', justifyContent: 'center' }}>
          Member Voices
        </div>
        <h2 className="sec-h" style={{ color: 'white' }}>Straight from the family</h2>
        <Ornament width={150} className="testi-ornament" />
      </motion.div>

      <motion.div
        className="testi-wall"
        variants={wall}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {TESTIMONIALS.map((t, idx) => (
          <motion.blockquote key={t.name} className={`testi-card tc-${idx % 4}`} variants={card}>
            <p>{t.quote}</p>
            <footer>
              <span className="testi-rule" aria-hidden="true" />
              <strong>{t.name}</strong>
              <span className="testi-role">{t.role}</span>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}
