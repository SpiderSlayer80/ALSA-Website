import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SITE, HERO_STATS, HERO_WORDS } from '../data/site';
import AnimatedNumber from './AnimatedNumber';
import logoFull from '../Logos/logo full lion.png';
import logoText from '../Logos/logo text.png';
import photo1 from '../Photos/20250313_131748.jpg';
import photo2 from '../Photos/IMG_0278.jpeg';
import photo3 from '../Photos/Post.jpg';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Fewer scroll transforms = less JS work per frame
  const yContent       = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yOrb1          = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yOrb2          = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIndex(i => (i + 1) % HERO_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Floating glow particles. Pre-compute size / drift / timing so each one is
  // visually distinct without re-randomising on every render.
  const particles = Array.from({ length: 26 }, (_, i) => {
    const sizeBucket = i % 4;
    const size = [3, 5, 7, 9][sizeBucket];
    return {
      id: i,
      size,
      left: (i * 13.7) % 100,
      top:  (i * 21.3) % 100,
      yRange: 36 + (i % 5) * 14,
      xDrift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 9),
      duration: 6 + (i % 6),
      delay: (i * 0.27) % 5,
      peakOpacity: 0.45 + ((i % 5) * 0.11),
      glow: sizeBucket >= 2 ? 'particle-lg' : 'particle-sm',
    };
  });

  return (
    <section id="home" ref={ref}>
      <div className="hero-canvas">
        {/* Photos are static — no per-photo parallax to keep scroll smooth */}
        <div className="hero-photos">
          <div className="hero-photo hp1">
            <img src={photo1} alt="" decoding="async" fetchpriority="high" />
          </div>
          <div className="hero-photo hp2">
            <img src={photo2} alt="" decoding="async" fetchpriority="low" />
          </div>
          <div className="hero-photo hp3">
            <img src={photo3} alt="" decoding="async" fetchpriority="low" />
          </div>
        </div>

        <div className="hero-photo-overlay" />

        {/* Only 2 orbs still parallax — orb3 is static */}
        <motion.div className="hero-orb orb1" style={{ y: yOrb1 }} />
        <motion.div className="hero-orb orb2" style={{ y: yOrb2 }} />
        <div className="hero-orb orb3" />
        <div className="hero-grid" />
        <div className="hero-stripe" />

        <div className="hero-particles">
          {particles.map(p => (
            <motion.span
              key={p.id}
              className={`particle ${p.glow}`}
              style={{
                left: `${p.left}%`,
                top:  `${p.top}%`,
                width:  `${p.size}px`,
                height: `${p.size}px`,
              }}
              animate={{
                y: [0, -p.yRange, 0],
                x: [0, p.xDrift, 0],
                opacity: [0, p.peakOpacity, 0],
                scale: [0.6, 1.15, 0.6],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative watermark lion — slowly drifts so the page feels alive */}
      <motion.div
        className="hero-lion-mark"
        animate={{ y: [0, -14, 0], rotate: [0, 1.2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src={logoFull} alt="" decoding="async" />
      </motion.div>

      <motion.div className="hero-content" style={{ y: yContent, opacity: opacityContent }}>

        <motion.img
          src={logoFull}
          className="hero-logo-full"
          alt=""
          decoding="async"
          fetchpriority="high"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.h1
          className="hero-h1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <img src={logoText} className="hero-logo-text" alt="ALSA" decoding="async" fetchpriority="high" />
          <span className="hero-rotator">
            <AnimatePresence mode="wait">
              <motion.span
                key={HERO_WORDS[wordIndex]}
                className="outline"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {HERO_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          className="hero-fullname"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          {SITE.fullName}
        </motion.p>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
        >
          {SITE.description}
        </motion.p>

        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48 }}
        >
          <motion.a href="#join" className="btn-g" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Become a Member <span className="btn-arrow">→</span>
          </motion.a>
          <motion.a href="#about" className="btn-o" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Our Story <span className="btn-arrow">↓</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58 }}
        >
          {HERO_STATS.map(stat => (
            <div key={stat.label} className="hst">
              <span className="hst-n">
                <AnimatedNumber to={stat.number} suffix={stat.suffix} />
              </span>
              <span className="hst-l">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span>Scroll</span>
        <motion.div
          className="scroll-cue-line"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
