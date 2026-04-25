import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, SITE } from '../data/site';
import logoFull from '../Logos/logo full lion.png';
import logoText from '../Logos/logo text.png';

const MENU_LINKS = NAV_LINKS.filter(l => l.href !== '#join');

// Smooth-scroll to the target manually so the nav works inside iframes
// (e.g. Responsively) where hash-link defaults can be intercepted.
function scrollToHash(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function MobileMenu({ open, onClose }) {
  const handleClick = href => e => {
    e.preventDefault();
    onClose();
    setTimeout(() => scrollToHash(href), 260); // wait for the overlay to fade out
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div className="mm-glow" aria-hidden />

          <button className="mm-close" onClick={onClose} aria-label="Close">✕</button>

          <motion.div
            className="mm-brand"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={logoFull} alt="" className="mm-lion" />
            <img src={logoText} alt="ALSA" className="mm-text-logo" />
            <span className="mm-tag">Auckland Lankan Students</span>
          </motion.div>

          <nav className="mm-nav">
            {MENU_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={handleClick(l.href)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
              >
                <span className="mm-num">0{i + 1}</span>
                <span className="mm-label">{l.label}</span>
                <span className="mm-arrow">→</span>
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#join"
            className="mm-cta"
            onClick={handleClick('#join')}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            Become a Member <span aria-hidden>→</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
