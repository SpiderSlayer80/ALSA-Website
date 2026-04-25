// Lightbox — full-screen image viewer for the Gallery section.
// Supports keyboard navigation (Escape to close, Arrow keys to prev/next),
// prev/next buttons, a photo counter, and optional captions.
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Lightbox({ photos, index, onClose, onNav }) {
  useEffect(() => {
    if (index === null) return;
    const handler = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    // Lock page scroll while lightbox is open so arrow keys don't also scroll the background.
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [index, onClose, onNav]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
          <button
            className="lb-nav lb-prev"
            onClick={e => { e.stopPropagation(); onNav(-1); }}
            aria-label="Previous"
          >‹</button>
          <button
            className="lb-nav lb-next"
            onClick={e => { e.stopPropagation(); onNav(1); }}
            aria-label="Next"
          >›</button>

          <motion.div
            key={photo.id || photo.src}
            className="lb-frame"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <img src={photo.src} alt={photo.title || ''} />
            {photo.title && <div className="lb-caption">{photo.title}</div>}
            <div className="lb-counter">{index + 1} / {photos.length}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
