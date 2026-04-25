// Events — upcoming events grid pulled from EVENTS in site.js.
// Each card has a date badge, category tag, title, description, time and location.
// Cards alternate gold/blue accent colours via the `color` field on each event.
import { motion } from 'framer-motion';
import { EVENTS } from '../data/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Events() {
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
        <h2 className="sec-h" style={{ color: 'var(--blue)' }}>Upcoming Events</h2>
        <p className="section-sub">Mark the calendar. Bring your friends. See you there.</p>
      </motion.div>

      <motion.div
        className="events-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {EVENTS.map(ev => (
          <motion.article
            key={ev.title}
            className={`event-card event-${ev.color}`}
            variants={item}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="event-date">
              <span className="event-day">{ev.date.split(' ')[0]}</span>
              <span className="event-month">{ev.date.split(' ')[1]}</span>
            </div>
            <div className="event-body">
              <div className="event-tag">{ev.tag}</div>
              <h3 className="event-title">{ev.title}</h3>
              <p className="event-desc">{ev.description}</p>
              <div className="event-meta">
                <span>🕒 {ev.time}</span>
                <span>📍 {ev.location}</span>
              </div>
            </div>
            <div className="event-spark" />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
