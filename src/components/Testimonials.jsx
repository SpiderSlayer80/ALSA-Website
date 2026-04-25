// Testimonials — auto-rotating carousel of member quotes on a dark background.
// Rotates every 5.2s; pauses while the user hovers. Dot buttons allow manual navigation.
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TESTIMONIALS } from '../data/site';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // Pause auto-rotation on hover so users can read long quotes without being interrupted.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI(x => (x + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];

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
        <h2 className="sec-h" style={{ color: 'white' }}>What Our Members Say</h2>
      </motion.div>

      <div
        className="testi-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="testi-quote-mark">"</div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            className="testi-quote"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{t.quote}</p>
            <footer>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="testi-dots">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              className={`testi-dot ${idx === i ? 'active' : ''}`}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
