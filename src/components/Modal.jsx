// Modal — success overlay shown after a membership form submission.
// Displays the member's email and a payment note (paid vs free).
// Clicking the backdrop or the button closes it.
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ open, email, payNote, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="overlay open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <motion.span
              className="modal-icon"
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            >
              🦁
            </motion.span>
            <h3>Welcome to ALSA!</h3>
            <p>
              Your membership application has been received. We'll send confirmation to{' '}
              <strong style={{ color: 'var(--blue)' }}>{email}</strong> shortly.
              <br /><br />
              {payNote}
            </p>
            <motion.button
              className="modal-close"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Awesome, let's go! →
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
