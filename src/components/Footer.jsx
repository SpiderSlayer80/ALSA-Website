// Footer — site footer with three areas:
//   • Newsletter signup CTA (email input + toast on subscribe)
//   • Brand blurb, social icon links, and two-column FOOTER_NAV link groups
//   • Copyright bar with credit
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SITE, FOOTER_NAV } from '../data/site';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState('');

  function subscribe(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email.');
      return;
    }
    toast.success(`Subscribed ${email} to the ALSA newsletter.`);
    setEmail('');
  }

  return (
    <footer>
      <div className="footer-inner">
        <motion.div
          className="footer-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3>Stay in the loop</h3>
            <p>Monthly updates on events, member spotlights and opportunities. No spam.</p>
          </div>
          <form className="footer-form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Subscribe
            </motion.button>
          </form>
        </motion.div>

        <div className="footer-top">
          <div>
            <div className="footer-brand">{SITE.name}</div>
            <p className="footer-tagline">
              {SITE.fullName}. Uniting Sri Lankan students across Auckland. 🦁
            </p>
            <div className="fsocs" style={{ marginTop: '20px' }}>
              <a href={SITE.instagram} className="fsoc" target="_blank" rel="noreferrer" aria-label="Instagram">📸</a>
              <a href={SITE.facebook} className="fsoc" target="_blank" rel="noreferrer" aria-label="Facebook">📘</a>
              <a href={SITE.flickr} className="fsoc" target="_blank" rel="noreferrer" aria-label="Flickr">📷</a>
              <a href={`mailto:${SITE.email}`} className="fsoc" aria-label="Email">✉️</a>
            </div>
          </div>
          <div className="footer-nav">
            {FOOTER_NAV.map(col => (
              <div key={col.heading} className="fnc">
                <h4>{col.heading}</h4>
                <ul>
                  {col.links.map(link => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="footer-hr" />
        <div className="footer-bottom">
          <p className="footer-copy">© {SITE.year} {SITE.fullName}. All rights reserved.</p>
          <p className="footer-credit">
            Made with <span style={{ color: 'var(--gold)' }}>♥</span> in Auckland
          </p>
        </div>
      </div>
    </footer>
  );
}
