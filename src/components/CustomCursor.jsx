// CustomCursor — replaces the default OS cursor on desktop with a dot + lagging ring.
// The dot snaps to the mouse instantly; the ring follows with a spring delay.
// Both are hidden on touch/mobile devices (pointer: coarse).
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 280, damping: 28, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 280, damping: 28, mass: 0.4 });

  useEffect(() => {
    // Skip on touch screens — no mouse to track, and the custom cursor would just sit at 0,0.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    // mx/my are set directly (no spring) so the dot snaps exactly to the pointer.
    // The ring uses sx/sy (spring) for a trailing lag that gives the illusion of weight.
    const move = e => { mx.set(e.clientX); my.set(e.clientY); };

    // Skip the closest() walk if the pointer is still inside the same element.
    let lastTarget = null;
    let lastResult = false;
    const over = e => {
      const t = e.target;
      if (t === lastTarget) return;
      lastTarget = t;
      const tag = t.tagName;
      const interactive =
        tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' ||
        tag === 'SELECT' || tag === 'LABEL' || t.closest('button') || t.closest('a');
      const next = !!interactive;
      if (next === lastResult) return;
      lastResult = next;
      setHovering(next);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: mx, y: my }}
      />
      <motion.div
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{ x: sx, y: sy }}
      />
    </>
  );
}
