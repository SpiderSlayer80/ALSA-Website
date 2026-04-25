// FAQ — accordion of frequently asked questions. Only one item is open at a time.
// Clicking an open item collapses it; clicking a closed item expands it with an
// animated height transition. The + icon rotates 45° to become an ×.
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FAQ as FAQ_ITEMS } from '../data/site';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Good Questions</div>
        <h2 className="sec-h" style={{ color: 'var(--blue)' }}>Frequently Asked</h2>
      </motion.div>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={item.q}
              className={`faq-item ${isOpen ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{item.q}</span>
                <motion.span
                  className="faq-plus"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-a-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="faq-a">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
