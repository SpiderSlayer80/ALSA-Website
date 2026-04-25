// ScrollProgress — thin gold/blue bar pinned to the top of the viewport that fills
// as the user scrolls down the page, giving a visual reading-progress indicator.
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.3 });

  return <motion.div className="scroll-progress" style={{ scaleX: x }} />;
}
