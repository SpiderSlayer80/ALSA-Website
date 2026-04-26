import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TEAM } from '../data/site';
import TiltCard from './TiltCard';
import HallOfFame from './HallOfFame';

// Load exec photos as plain URLs — `as: 'url'` prevents Vite from trying to
// parse image files as JS modules (fixes uppercase .JPG / .HEIC errors).
const photos = import.meta.glob('../exec photos/*', { eager: true, as: 'url' });
const intros = import.meta.glob('../Exec Intros/*', { eager: true, as: 'url' });

function getPhoto(filename) {
  if (!filename) return null;
  const key = `../exec photos/${filename}`;
  return photos[key] ?? null;
}

function getIntro(photoFilename) {
  if (!photoFilename) return null;
  // Reuse the photo basename — e.g. 'Kalshika.JPG' → look up 'Kalshika.png'
  const base = photoFilename.replace(/\.[^.]+$/, '');
  const key = `../Exec Intros/${base}.png`;
  return intros[key] ?? null;
}

const GROUP_ORDER = ['Leadership', 'Managers', 'Executives', 'Junior Reps'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function MemberCard({ m, onOpen }) {
  const photoSrc = getPhoto(m.photo);
  const introSrc = getIntro(m.photo);
  const clickable = Boolean(introSrc);
  return (
    <motion.div variants={item}>
      <TiltCard
        className={`team-card${clickable ? ' team-card-clickable' : ''}`}
        intensity={8}
        onClick={clickable ? () => onOpen({ name: m.name, role: m.role, src: introSrc }) : undefined}
      >
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
            <img src={photoSrc} alt={m.name} style={{ objectPosition: m.crop ?? 'center top' }} />
          ) : (
            m.name.split(' ').map(w => w[0]).join('').slice(0, 2)
          )}
        </div>
        <div className="team-name">{m.name}</div>
        <div className="team-role">{m.role}</div>
      </TiltCard>
    </motion.div>
  );
}

export default function Team() {
  const [active, setActive] = useState(null);

  // Lock body scroll while the lightbox is open, and close on Escape.
  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const grouped = GROUP_ORDER.map(g => ({
    label: g,
    members: TEAM.filter(m => m.group === g),
  }));

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
        <p className="section-sub">Members keeping this community alive year after year.</p>
      </motion.div>

      {grouped.map(({ label, members }) => (
        <div key={label} className="team-group">
          <motion.div
            className="team-group-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.div>
          <motion.div
            className="team-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {members.map(m => <MemberCard key={m.name} m={m} onOpen={setActive} />)}
          </motion.div>
        </div>
      ))}

      <HallOfFame />

      <AnimatePresence>
        {active && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <motion.button
              className="intro-close"
              onClick={e => { e.stopPropagation(); setActive(null); }}
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.15 } }}
              exit={{ opacity: 0 }}
            >
              ×
            </motion.button>
            <motion.img
              key={active.src}
              className="intro-img"
              src={active.src}
              alt={`${active.name} — ${active.role}`}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
