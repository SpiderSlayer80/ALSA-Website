// AnimatedNumber — counts from 0 up to `to` using requestAnimationFrame once the element
// scrolls into view. Used in the Hero stats grid (e.g. "183 Members", "10+ Events").
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedNumber({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const tick = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // easeOutCubic: fast start, smooth deceleration into the final value
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}
