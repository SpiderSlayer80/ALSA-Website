// Nav — sticky top navigation bar. Starts transparent over the Hero, switches to a
// frosted-glass style after 60px of scroll. On mobile, shows a hamburger that opens MobileMenu.
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SITE, NAV_LINKS } from '../data/site';
import MobileMenu from './MobileMenu';
import logoFace from '../Logos/logo lion face.png';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Programmatic scroll — works inside iframes (e.g. Responsively) where
  // default hash-link navigation can be intercepted.
  const handleNavClick = href => e => {
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        id="nav"
        className={scrolled ? 'scrolled' : ''}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#home" className="logo" onClick={handleNavClick('#home')}>
          <img src={logoFace} className="logo-mark" alt="" />
          <span className="logo-text">{SITE.name}</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={handleNavClick(link.href)}>
                <span>{link.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#join" className="nav-cta" onClick={handleNavClick('#join')}>
              Join Now <span aria-hidden>→</span>
            </a>
          </li>
        </ul>

        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
