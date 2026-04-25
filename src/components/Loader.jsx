// Loader — full-screen branded splash screen shown for 1.4 seconds on first page load.
// Displays the ALSA lion, name, and an animated progress bar, then fades out.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader() {
  // Only show the splash on the first navigation in a session — otherwise a hash-link
  // click that triggers a soft reload (e.g. inside Responsively) replays the loader every time.
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('alsaLoaderSeen'); } catch (_) { return true; }
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem('alsaLoaderSeen', '1'); } catch (_) {}
    }, 1400);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <motion.div
            className="loader-inner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              className="loader-mark"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            >
              🦁
            </motion.div>
            <motion.div className="loader-title">ALSA</motion.div>
            <motion.div className="loader-bar">
              <motion.div
                className="loader-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
