// About — "Who We Are" section. Left side has ALSA's mission text; right side shows
// four PILLARS (Cultural Events, Community, Academic, Sport) as stagger-animated TiltCards.
import { motion } from 'framer-motion';
import { PILLARS } from '../data/site';
import TiltCard from './TiltCard';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about">
      <div className="about-decor-circle" />
      <div className="about-decor-line" />

      <div className="about-layout">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sec-eyebrow">Who We Are</div>
          <h2 className="sec-h">
            A Home Away<br />
            <span className="sec-h-accent">From Home</span>
          </h2>
          <p className="about-p">
            ALSA is a community for Sri Lankan students studying across Auckland. Whether
            you've recently arrived in New Zealand or have called it home for years, ALSA is
            your place for cultural connection, support and friendship.
          </p>
          <p className="about-p">
            We celebrate our heritage through cultural events, support our members both
            academically and socially, and build lasting connections between Sri Lankan
            students and the wider Auckland community.
          </p>
          <motion.a
            href="#join"
            className="btn-g btn-g-sm"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Join ALSA Today <span className="btn-arrow">→</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="pillars"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {PILLARS.map(pillar => (
            <motion.div key={pillar.title} variants={item}>
              <TiltCard className="pillar" intensity={6}>
                <span className="p-icon">{pillar.icon}</span>
                <div className="p-title">{pillar.title}</div>
                <div className="p-text">{pillar.text}</div>
                <div className="p-glow" />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
