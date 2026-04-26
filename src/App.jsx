// ROOT COMPONENT — assembles every section of the page in order.
// To edit a section, open the matching file listed next to each import.
// Data/content for most sections lives in → src/data/site.js

import { useState, lazy, Suspense } from 'react';

// ── Context (global state) ────────────────────────────────────────────────────
import { ToastProvider } from './context/ToastContext';

// ── Above-the-fold (loaded eagerly so first paint is complete) ────────────────
import Loader         from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor   from './components/CustomCursor';
import Modal          from './components/Modal';
import Nav            from './components/Nav';
import Hero           from './components/Hero';
import About          from './components/About';
import Events         from './components/Events';

// ── Below-the-fold (deferred — split into a separate chunk) ───────────────────
const Gallery      = lazy(() => import('./components/Gallery'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Team         = lazy(() => import('./components/Team'));
const Sponsors     = lazy(() => import('./components/Sponsors'));
const FAQ          = lazy(() => import('./components/FAQ'));
const Join         = lazy(() => import('./components/Join'));
const Contact      = lazy(() => import('./components/Contact'));
const Footer       = lazy(() => import('./components/Footer'));
const ScrollToTop  = lazy(() => import('./components/ScrollToTop'));

// Reserves vertical space while a chunk loads so layout doesn't jump.
const SectionPlaceholder = () => <div style={{ minHeight: '60vh' }} />;

export default function App() {
  const [modal, setModal] = useState({ open: false, email: '', payNote: '' });

  function handleSuccess(email, payNote) {
    setModal({ open: true, email, payNote });
  }

  return (
    <ToastProvider>
      <Loader />
      <ScrollProgress />
      <CustomCursor />

      <Nav />

      <main>
        <Hero />
        <About />
        <Events />
        <Suspense fallback={<SectionPlaceholder />}>
          <Gallery />
          <Testimonials />
          <Team />
          <Sponsors />
          <FAQ />
          <Join onSuccess={handleSuccess} />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <ScrollToTop />
      </Suspense>

      <Modal
        open={modal.open}
        email={modal.email}
        payNote={modal.payNote}
        onClose={() => setModal({ open: false, email: '', payNote: '' })}
      />
    </ToastProvider>
  );
}
