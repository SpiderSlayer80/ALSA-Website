// HallOfFame — past ALSA committees, revealed when the Events page button is clicked.
//
// Photo loading is automatic via import.meta.glob — drop a JPG/PNG into
// src/past execs/{year}/ and it shows up. Filename conventions:
//   "Name - Role (Year).jpg"  → individual member card (2020–2022)
//   "TeamName Year.jpg"       → team group photo (2023+)
//
// 2020 is rendered with a unique "Founding Team" treatment — gold rings,
// laurel badges and a more ceremonial layout — to honour the founders.
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const allPhotos = import.meta.glob('../past execs/**/*', { eager: true, as: 'url' });

// Order roles for individual-format years so leadership shows up first.
const ROLE_RANK = [
  'president', 'co-president', 'vice president',
  'secretary', 'treasurer',
  'events manager', 'social media manager', 'marketing manager',
];

// Sort group-photo years' team panels in a sensible order.
const TEAM_RANK = ['Leadership', 'Events', 'Marketing', 'Finance'];

function parseEntry(filename) {
  const noExt = filename.replace(/\.[^.]+$/, '');
  const cleaned = noExt
    .replace(/\s*\(\d{4}\)\s*$/, '')   // "(2020)"
    .replace(/\s+\d{4}\s*$/, '')        // trailing " 2023"
    .trim();
  if (cleaned.includes(' - ')) {
    const [name, ...rest] = cleaned.split(' - ');
    return { type: 'individual', name: name.trim(), role: rest.join(' - ').trim() };
  }
  return { type: 'team', team: cleaned };
}

function rankRole(role) {
  const idx = ROLE_RANK.indexOf(role.toLowerCase());
  return idx === -1 ? 99 : idx;
}

function rankTeam(team) {
  const idx = TEAM_RANK.indexOf(team);
  return idx === -1 ? 99 : idx;
}

// Build per-year payload: { year, mode: 'individual'|'team', members|teams, isFounding }
function buildYears() {
  const byYear = {};
  for (const fullPath of Object.keys(allPhotos)) {
    const m = fullPath.match(/past execs\/(\d{4})\/([^/]+)$/);
    if (!m) continue;
    const [, yearStr, filename] = m;
    const year = Number(yearStr);
    const url = allPhotos[fullPath];
    const entry = parseEntry(filename);
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push({ ...entry, url });
  }
  return Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)
    .map(year => {
      const entries = byYear[year];
      const isIndividual = entries.some(e => e.type === 'individual');
      if (isIndividual) {
        return {
          year,
          mode: 'individual',
          isFounding: year === 2020,
          members: entries
            .filter(e => e.type === 'individual')
            .sort((a, b) => rankRole(a.role) - rankRole(b.role)),
        };
      }
      return {
        year,
        mode: 'team',
        isFounding: false,
        teams: entries
          .filter(e => e.type === 'team')
          .sort((a, b) => rankTeam(a.team) - rankTeam(b.team)),
      };
    });
}

const sectionVariants = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: 'auto', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const memberVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function HallOfFame() {
  const [open, setOpen] = useState(false);
  const [activeYear, setActiveYear] = useState(null);
  const [peek, setPeek] = useState(null); // { src, name }

  const years = useMemo(buildYears, []);
  const active = years.find(y => y.year === activeYear) || null;

  return (
    <div className="hof-wrap">
      <motion.button
        type="button"
        className={`hof-toggle ${open ? 'is-open' : ''}`}
        onClick={() => {
          setOpen(v => {
            const next = !v;
            if (next && !activeYear && years[0]) setActiveYear(years[0].year);
            return next;
          });
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="hof-toggle-icon">🏆</span>
        <span className="hof-toggle-text">
          <span className="hof-toggle-title">Hall of Fame</span>
        </span>
        <span className="hof-toggle-chev">{open ? '↑' : '↓'}</span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="hof-body"
            className="hof-body"
            variants={sectionVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <div className="hof-inner">
              <div className="hof-intro">
                <div className="hof-intro-eyebrow">Six years of community</div>
                <h3 className="hof-intro-h">The teams that built ALSA</h3>
                <p className="hof-intro-p">
                  From the founding committee in 2020 to today — every team that's worn the lion before us.
                </p>
              </div>

              <div className="hof-years">
                {years.map(y => (
                  <button
                    key={y.year}
                    type="button"
                    className={`hof-year ${y.year === activeYear ? 'is-active' : ''} ${y.isFounding ? 'is-founding' : ''}`}
                    onClick={() => setActiveYear(y.year)}
                  >
                    {y.isFounding && <span className="hof-year-badge">Founders</span>}
                    <span className="hof-year-num">{y.year}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.year}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {active.isFounding ? (
                      <FoundingTeam data={active} onPeek={setPeek} />
                    ) : active.mode === 'individual' ? (
                      <IndividualGrid data={active} onPeek={setPeek} />
                    ) : (
                      <TeamGrid data={active} onPeek={setPeek} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo peek popup — shows the full uncropped photo in a floating card */}
      <AnimatePresence>
        {peek && (
          <motion.div
            className="hof-peek-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPeek(null)}
          >
            <motion.div
              className="hof-peek-card"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <img src={peek.src} alt={peek.name} />
              {peek.name && <div className="hof-peek-name">{peek.name}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FoundingTeam({ data, onPeek }) {
  return (
    <div className="hof-founding">
      <div className="hof-founding-deco hof-deco-l">❦</div>
      <div className="hof-founding-deco hof-deco-r">❦</div>
      <div className="hof-founding-head">
        <div className="hof-founding-crown">👑</div>
        <div className="hof-founding-eyebrow">Est. 2020</div>
        <h4 className="hof-founding-h">The Founding Committee</h4>
        <p className="hof-founding-p">
          The pioneers who started it all. Without these six, none of this would exist.
        </p>
      </div>
      <motion.div
        className="hof-founding-grid"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {data.members.map(m => (
          <motion.div
            key={m.name}
            className="hof-founding-card hof-peekable"
            variants={memberVariants}
            onClick={() => onPeek({ src: m.url, name: m.name })}
          >
            <div className="hof-founding-frame">
              <div className="hof-founding-laurel hof-laurel-l">🌿</div>
              <div className="hof-founding-laurel hof-laurel-r">🌿</div>
              <img src={m.url} alt={m.name} />
            </div>
            <div className="hof-founding-name">{m.name}</div>
            <div className="hof-founding-role">{m.role}</div>
            <div className="hof-founding-pioneer">Pioneer</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function IndividualGrid({ data, onPeek }) {
  return (
    <div className="hof-year-block">
      <div className="hof-year-h">{data.year} Committee</div>
      <motion.div
        className="hof-grid"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {data.members.map(m => (
          <motion.div
            key={m.name}
            className="hof-card hof-peekable"
            variants={memberVariants}
            onClick={() => onPeek({ src: m.url, name: m.name })}
          >
            <div className="hof-photo">
              <img src={m.url} alt={m.name} />
            </div>
            <div className="hof-name">{m.name}</div>
            <div className="hof-role">{m.role}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function TeamGrid({ data, onPeek }) {
  return (
    <div className="hof-year-block">
      <div className="hof-year-h">{data.year} Committee</div>
      <motion.div
        className="hof-team-grid"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {data.teams.map(t => (
          <motion.div
            key={t.team}
            className="hof-team-card hof-peekable"
            variants={memberVariants}
            onClick={() => onPeek({ src: t.url, name: `${data.year} ${t.team}` })}
          >
            <div className="hof-team-photo">
              <img src={t.url} alt={`${data.year} ${t.team} team`} />
            </div>
            <div className="hof-team-label">{t.team}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
