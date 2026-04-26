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
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Track which section the user is scrolling through using IntersectionObserver.
  // rootMargin shrinks the detection zone to roughly the middle 30% of the viewport
  // so the active link only flips when the section is clearly the focal point.
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''));
    const targets = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    );

    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
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
          <img src={logoFace} className="logo-mark" alt="" decoding="async" width="40" height="40" />
          <span className="logo-text">{SITE.name}</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={isActive ? 'nav-active' : ''}
                  onClick={handleNavClick(link.href)}
                >
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
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
