// TiltCard — wraps any content in a 3D tilt effect that tracks mouse position.
// Used on the About pillars and Team cards to add depth and interactivity.
// `intensity` controls max tilt angle in degrees (default 10).
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({ children, className = '', intensity = 10, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });
  // Mouse position normalized to [-0.5, 0.5] relative to the card's own rect.
  // rx/ry invert axes so the card tilts *toward* the cursor, not away from it.
  const rx = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const ry = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        // preserve-3d required for rotateX/rotateY to render as actual 3D depth
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
