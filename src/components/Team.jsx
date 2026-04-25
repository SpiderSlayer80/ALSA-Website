// Team — committee member grid. Each card shows the member's initials in a gradient
// avatar, name, and role. Cards are wrapped in TiltCard for a 3D hover effect and
// stagger-animate into view as the section scrolls in.
import { motion } from 'framer-motion';
import { TEAM } from '../data/site';
import TiltCard from './TiltCard';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Team() {
  return (
    <section id="team">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Meet the Committee</div>
        <h2 className="sec-h" style={{ color: 'var(--blue)' }}>The Team Behind ALSA</h2>
        <p className="section-sub">Volunteer students keeping this community alive year after year.</p>
      </motion.div>

      <motion.div
        className="team-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {TEAM.map(m => (
          <motion.div key={m.name} variants={item}>
            <TiltCard className="team-card" intensity={8}>
              <div
                className="team-avatar"
                style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}aa)` }}
              >
                {m.initial}
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
