import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENTS } from '../data/site';

// Load any image dropped into src/event posters/ as a static URL at build time.
const posters = import.meta.glob('../event posters/*', { eager: true, as: 'url' });
function getPoster(filename) {
  if (!filename) return null;
  return posters[`../event posters/${filename}`] ?? null;
}

function todayStartISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const pastContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const pastItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Events() {
  const today = todayStartISO();

  const { upcoming, past } = useMemo(() => {
    const sorted = [...EVENTS].sort((a, b) => a.dateISO.localeCompare(b.dateISO));
    return {
      upcoming: sorted.find(e => e.dateISO >= today && !e.hidden) || null,
      past: sorted.filter(e => e.dateISO < today).reverse(),
    };
  }, [today]);

  return (
    <section id="events">
      <div className="events-bg-grid" />

      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>What's On</div>
        <h2 className="sec-h" style={{ color: 'var(--blue)' }}>Events</h2>
        <p className="section-sub">The next chapter — and a look back at the moments we've already lived.</p>
      </motion.div>

      {upcoming ? (
        <UpcomingFeature event={upcoming} />
      ) : (
        <motion.div
          className="no-upcoming"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="no-upcoming-icon">📅</span>
          <p>No upcoming events yet — check back soon.</p>
        </motion.div>
      )}

      {past.length > 0 && (
        <div className="past-events-wrap">
          <motion.div
            className="past-events-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="past-divider" />
            <h3 className="past-events-title">Recent Events</h3>
            <div className="past-divider" />
          </motion.div>

          <motion.div
            className="past-events-grid"
            variants={pastContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {past.map(ev => (
              <PastEventCard key={ev.title} event={ev} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}

function UpcomingFeature({ event }) {
  const poster = getPoster(event.poster);
  const ticketed = !!event.eventbriteUrl;
  const [open, setOpen] = useState(false);

  const onPosterClick = () => {
    if (ticketed) {
      window.open(event.eventbriteUrl, '_blank', 'noopener,noreferrer');
    } else {
      setOpen(v => !v);
    }
  };

  return (
    <motion.div
      className={`fe-card event-${event.color}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="fe-tagline">
        <span className="fe-dot" />
        <span>Upcoming · Next on the calendar</span>
      </div>

      <div className="fe-grid">
        <button
          type="button"
          className={`fe-poster-wrap ${ticketed ? 'is-ticketed' : ''} ${open ? 'is-open' : ''}`}
          onClick={onPosterClick}
          aria-label={ticketed ? `Buy tickets for ${event.title}` : `Show details for ${event.title}`}
        >
          {poster ? (
            <img src={poster} alt={event.title} className="fe-poster" />
          ) : (
            <div className="fe-poster-placeholder">
              <span className="fpp-day">{event.date.split(' ')[0]}</span>
              <span className="fpp-month">{event.date.split(' ')[1]}</span>
            </div>
          )}

          {ticketed && (
            <div className="fe-hover-overlay">
              <div className="fe-hover-inner">
                <span className="fe-hover-icon">🎟</span>
                <span className="fe-hover-text">Buy Tickets</span>
                <span className="fe-hover-sub">Opens Eventbrite</span>
              </div>
            </div>
          )}

          {!ticketed && (
            <div className="fe-hover-overlay fe-hover-info">
              <div className="fe-hover-inner">
                <span className="fe-hover-icon">ⓘ</span>
                <span className="fe-hover-text">{open ? 'Hide details' : 'View details'}</span>
              </div>
            </div>
          )}
        </button>

        <div className="fe-info">
          <span className="fe-tag">{event.tag}</span>
          <h3 className="fe-title">{event.title}</h3>

          <ul className="fe-meta">
            <li><span className="fe-meta-icon">📅</span><span>{event.date} · {event.time}</span></li>
            <li><span className="fe-meta-icon">📍</span><span>{event.location}</span></li>
            <li>
              <span className="fe-meta-icon">🎟</span>
              <span>{ticketed ? 'Ticketed via Eventbrite' : 'Free entry — no tickets required'}</span>
            </li>
          </ul>

          <AnimatePresence initial={false}>
            {(open || ticketed) && (
              <motion.p
                key="desc"
                className="fe-desc"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 18 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {event.description}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="fe-cta-row">
            {ticketed ? (
              <a
                href={event.eventbriteUrl}
                className="fe-cta fe-cta-primary"
                target="_blank"
                rel="noreferrer"
              >
                🎟 Buy Tickets
              </a>
            ) : (
              <button
                type="button"
                className="fe-cta fe-cta-ghost"
                onClick={() => setOpen(v => !v)}
              >
                {open ? 'Hide details ↑' : 'Read more ↓'}
              </button>
            )}
            <a href="#contact" className="fe-cta-link">Questions? Get in touch →</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PastEventCard({ event }) {
  const poster = getPoster(event.poster);
  return (
    <motion.div className={`past-card event-${event.color}`} variants={pastItem}>
      <div className="past-poster-wrap">
        {poster ? (
          <img src={poster} alt={event.title} className="past-poster" />
        ) : (
          <div className="past-poster-placeholder">
            <span className="ppp-day">{event.date.split(' ')[0]}</span>
            <span className="ppp-month">{event.date.split(' ')[1]}</span>
          </div>
        )}
        <div className="past-poster-veil" />
        <span className="past-stamp">Past Event</span>
      </div>

      <div className="past-info">
        <span className="past-tag">{event.tag}</span>
        <h4 className="past-title">{event.title}</h4>
        <div className="past-meta">
          <span>📅 {event.date}</span>
          <span>📍 {event.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
