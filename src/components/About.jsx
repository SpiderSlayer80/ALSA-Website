import { motion } from 'framer-motion';
import { PILLARS } from '../data/site';
import nzFlag from '../flags/New Zealand flag.svg';
import lkFlag from '../flags/Sri Lankan flag.svg';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about">
      <div className="about-grid-bg" />
      <div className="about-glow about-glow-a" />
      <div className="about-glow about-glow-b" />

      <motion.div
        className="about-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sec-eyebrow about-eyebrow">About ALSA</div>
        <h2 className="sec-h about-h">
          Sri Lankan students.<br />
          <span className="sec-h-accent">One Auckland network.</span>
        </h2>
        <div className="about-flag-divider" aria-hidden="true">
          <span className="afd-line" />
          <img src={lkFlag} alt="" className="afd-flag" loading="lazy" decoding="async" />
          <img src={nzFlag} alt="" className="afd-flag" loading="lazy" decoding="async" />
          <span className="afd-line" />
        </div>
        <p className="about-lead">
          ALSA is a student run association connecting Sri Lankan undergraduates,
          postgraduates and alumni across every major Auckland university. Five years
          in, we have grown into the largest Sri Lankan student collective in
          New Zealand, built and maintained entirely by the people in it.
        </p>
      </motion.div>

      <motion.div
        className="pillars-v2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {PILLARS.map((pillar, idx) => (
          <motion.article key={pillar.title} className="pillar-v2" variants={item}>
            <div className="pillar-num">{String(idx + 1).padStart(2, '0')}</div>
            <div className="pillar-icon">{pillar.icon}</div>
            <h3 className="pillar-title">{pillar.title}</h3>
            <p className="pillar-desc">{pillar.text}</p>
            <div className="pillar-shine" />
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="about-cta"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.a href="#join" className="btn-g" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          Become a Member <span className="btn-arrow">→</span>
        </motion.a>
        <motion.a href="#events" className="btn-o btn-o-dark" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          See What's Coming Up <span className="btn-arrow">→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
