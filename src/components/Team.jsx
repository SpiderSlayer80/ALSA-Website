import { motion } from 'framer-motion';
import { TEAM } from '../data/site';
import TiltCard from './TiltCard';

// Load exec photos as plain URLs — `as: 'url'` prevents Vite from trying to
// parse image files as JS modules (fixes uppercase .JPG / .HEIC errors).
const photos = import.meta.glob('../exec photos/*', { eager: true, as: 'url' });

function getPhoto(filename) {
  if (!filename) return null;
  const key = `../exec photos/${filename}`;
  return photos[key] ?? null;
}

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
        {TEAM.map(m => {
          const photoSrc = getPhoto(m.photo);
          return (
            <motion.div key={m.name} variants={item}>
              <TiltCard className="team-card" intensity={8}>
                <div
                  className="team-avatar"
                  style={{
                    background: photoSrc
                      ? 'transparent'
                      : `linear-gradient(135deg, ${m.accent}, ${m.accent}aa)`,
                    boxShadow: `0 8px 24px ${m.accent}44`,
                    border: `3px solid ${m.accent}66`,
                  }}
                >
                  {photoSrc ? (
                    <img src={photoSrc} alt={m.name} />
                  ) : (
                    m.name.split(' ').map(w => w[0]).join('').slice(0, 2)
                  )}
                </div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
