// ROOT COMPONENT — assembles every section of the page in order.
// To edit a section, open the matching file listed next to each import.
// Data/content for most sections lives in → src/data/site.js

import { useState } from 'react';

// ── Context (global state) ────────────────────────────────────────────────────
import { ToastProvider } from './context/ToastContext'; // → src/context/ToastContext.jsx  (pop-up notifications)

// ── UI Overlays & Utilities ──────────────────────────────────────────────────
import Loader         from './components/Loader';        // → src/components/Loader.jsx        (full-screen loading animation)
import ScrollProgress from './components/ScrollProgress';// → src/components/ScrollProgress.jsx (top progress bar)
import CustomCursor   from './components/CustomCursor';  // → src/components/CustomCursor.jsx   (custom mouse cursor)
import ScrollToTop    from './components/ScrollToTop';   // → src/components/ScrollToTop.jsx    (floating ↑ button)
import Modal          from './components/Modal';         // → src/components/Modal.jsx          (membership success pop-up)

// ── Navigation ───────────────────────────────────────────────────────────────
import Nav            from './components/Nav';           // → src/components/Nav.jsx            (top navbar + mobile menu link)

// ── Page Sections (top → bottom order) ──────────────────────────────────────
import Hero           from './components/Hero';          // → src/components/Hero.jsx           (banner / headline)
import About          from './components/About';         // → src/components/About.jsx          (about ALSA)
import Events         from './components/Events';        // → src/components/Events.jsx         (upcoming events)
import Gallery        from './components/Gallery';       // → src/components/Gallery.jsx        (photo grid + lightbox)
import Testimonials   from './components/Testimonials';  // → src/components/Testimonials.jsx   (member quotes)
import Team           from './components/Team';          // → src/components/Team.jsx           (committee members)
import Sponsors       from './components/Sponsors';      // → src/components/Sponsors.jsx       (sponsor logos)
import FAQ            from './components/FAQ';           // → src/components/FAQ.jsx            (accordion Q&A)
import Join           from './components/Join';          // → src/components/Join.jsx           (membership sign-up form)
import Contact        from './components/Contact';       // → src/components/Contact.jsx        (contact form)
import Footer         from './components/Footer';        // → src/components/Footer.jsx         (bottom footer)

export default function App() {
  // Modal state is lifted here so Join can trigger it without prop-drilling through siblings.
  const [modal, setModal] = useState({ open: false, email: '', payNote: '' });

  function handleSuccess(email, payNote) {
    setModal({ open: true, email, payNote });
  }

  return (
    <ToastProvider>
      {/* Overlays — rendered above everything else */}
      <Loader />
      <ScrollProgress />
      <CustomCursor />

      {/* Navigation bar */}
      <Nav />

      {/* Main page sections — edit their files to change content/layout */}
      <main>
        <Hero />
        <About />
        <Events />
        <Gallery />
        <Testimonials />
        <Team />
        <Sponsors />
        <FAQ />
        <Join onSuccess={handleSuccess} /> {/* triggers Modal on success */}
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />

      {/* Membership confirmation modal — controlled by Join via onSuccess */}
      <Modal
        open={modal.open}
        email={modal.email}
        payNote={modal.payNote}
        onClose={() => setModal({ open: false, email: '', payNote: '' })}
      />
    </ToastProvider>
  );
}
