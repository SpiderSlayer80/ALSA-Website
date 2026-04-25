// Gallery — fetches photos live from a Flickr album via the Flickr REST API.
// Before credentials are entered it shows GALLERY_PLACEHOLDERS as a preview grid.
// Once loaded, photos appear in a masonry-style grid; clicking any opens the Lightbox.
// To connect: enter your Flickr User ID, Album ID, and API Key in the connector panel.
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_PLACEHOLDERS } from '../data/site';
import { useToast } from '../context/ToastContext';
import Lightbox from './Lightbox';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Gallery() {
  const toast = useToast();
  const [uid, setUid] = useState('');
  const [aid, setAid] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flickrAlbumUrl, setFlickrAlbumUrl] = useState('https://flickr.com');
  const [lbIndex, setLbIndex] = useState(null);

  async function loadFlickr() {
    if (!uid || !aid || !apiKey) {
      toast.error('Please fill in all three Flickr fields.');
      return;
    }
    setLoading(true);
    setFlickrAlbumUrl(`https://www.flickr.com/photos/${uid}/albums/${aid}`);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${aid}&user_id=${uid}&per_page=12&format=json&nojsoncallback=1&extras=url_m,url_b,title`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.stat !== 'ok') throw new Error(data.message || 'Flickr API error');
      setPhotos(data.photoset.photo.map(p => ({
        id: p.id,
        src: p.url_b || p.url_m,
        thumb: p.url_m,
        title: p.title,
        href: `https://www.flickr.com/photos/${uid}/${p.id}`,
      })));
      toast.success(`Loaded ${data.photoset.photo.length} photos from Flickr.`);
    } catch (e) {
      toast.error('Could not load Flickr photos: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  // Add photos.length before modulo so negative direction (-1) wraps to the last photo correctly.
  function navLb(dir) {
    if (lbIndex === null || !photos) return;
    setLbIndex((lbIndex + dir + photos.length) % photos.length);
  }

  return (
    <section id="gallery">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Captured Moments</div>
        <h2 className="sec-h" style={{ color: 'var(--blue)' }}>Our Events Gallery</h2>
        <p className="section-sub">Photos from ALSA events loaded live from Flickr.</p>
      </motion.div>

      <motion.div
        className="flickr-connector"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="fc-head">
          <div className="flickr-logo">flickr</div>
          <h3>Connect Your Flickr Album</h3>
        </div>
        <div className="fc-row">
          <input
            className="fc-in"
            placeholder="Flickr User ID"
            value={uid}
            onChange={e => setUid(e.target.value)}
          />
          <input
            className="fc-in"
            placeholder="Album ID"
            value={aid}
            onChange={e => setAid(e.target.value)}
          />
          <input
            className="fc-in"
            placeholder="Flickr API Key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
          <motion.button
            className="fc-btn"
            onClick={loadFlickr}
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? 'Loading…' : 'Load Photos'}
          </motion.button>
        </div>
        <p className="fc-help">
          Get a free API key at{' '}
          <a href="https://www.flickr.com/services/apps/create" target="_blank" rel="noreferrer">
            flickr.com/services/apps/create
          </a>{' '}
          → Non-Commercial Key.
        </p>
      </motion.div>

      <motion.div
        className="g-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        {photos
          ? photos.map((p, i) => (
              <motion.div
                key={p.id}
                variants={item}
                className="g-card"
                // First photo spans 2×2 as a hero tile; fifth spans 2 wide for visual rhythm.
                style={
                  i === 0
                    ? { gridColumn: 'span 2', gridRow: 'span 2' }
                    : i === 4
                    ? { gridColumn: 'span 2' }
                    : {}
                }
                onClick={() => setLbIndex(i)}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <img src={p.thumb} alt={p.title} loading="lazy" />
                <div className="g-overlay">
                  <div className="g-tag">ALSA Events</div>
                  <div className="g-cap">{p.title}</div>
                  <div className="g-zoom">⤢</div>
                </div>
              </motion.div>
            ))
          : GALLERY_PLACEHOLDERS.map(item => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.94 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                }}
                className="g-card"
              >
                <div className="g-ph">
                  <div className="g-ph-icon">{item.icon}</div>
                  <div className="g-ph-text">{item.label}</div>
                </div>
              </motion.div>
            ))}
      </motion.div>

      <div className="gallery-link-row">
        <motion.a
          href={flickrAlbumUrl}
          className="flickr-link"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span style={{ fontWeight: 900, color: '#ff0084' }}>flickr</span> View full album →
        </motion.a>
      </div>

      {photos && (
        <Lightbox
          photos={photos}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onNav={navLb}
        />
      )}
    </section>
  );
}
