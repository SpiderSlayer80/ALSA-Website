import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Each toast gets a random ID so we can remove it individually after its timer fires.
  const push = useCallback((message, type = 'info', duration = 3600) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration);
  }, []);

  const api = {
    success: msg => push(msg, 'success'),
    error: msg => push(msg, 'error'),
    info: msg => push(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-stack">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              className={`toast toast-${t.type}`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 120, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            >
              <span className="toast-icon">
                {t.type === 'success' ? '✓' : t.type === 'error' ? '⚠' : 'ℹ'}
              </span>
              <span className="toast-msg">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
