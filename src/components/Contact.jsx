import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO, SITE } from '../data/site';
import { useToast } from '../context/ToastContext';
import emailIcon     from '../svg icons/gmail.svg';
import instagramIcon from '../svg icons/instagram.svg';
import facebookIcon  from '../svg icons/facebook.svg';
import lionFace      from '../Logos/logo lion face.png';

const ICONS = { email: emailIcon, instagram: instagramIcon, facebook: facebookIcon };

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function sendContact() {
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    try {
      await fetch(SITE.sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          name: form.name,
          email: form.email,
          message: form.message,
          timestamp: new Date().toLocaleString('en-NZ'),
        }),
      });
      toast.success(
        <>
          Thanks {form.name}! We'll be in touch at {form.email} soon.{' '}
          <img src={lionFace} alt="" className="inline-lion" />
        </>
      );
      setForm({ name: '', email: '', message: '' });
    } catch (_) {
      toast.error('Something went wrong. Please email us directly at uoa.alsa2020@gmail.com');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact">
      <div className="contact-layout">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="sec-eyebrow">Get In Touch</div>
          <h2 className="sec-h">Contact ALSA</h2>
          <p className="ci-desc">
            Questions about membership, events, or interested in partnering with us?
            We'd love to hear from you.
          </p>
          <div className="ci-list">
            {CONTACT_INFO.map((item, i) => (
              <motion.div
                key={item.label}
                className="ci-row"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="ci-icon">
                  <img src={ICONS[item.icon]} alt={item.label} width="22" height="22" />
                </div>
                <div className="ci-b">
                  <strong>{item.label}</strong>
                  {item.href ? (
                    <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="cf-wrap"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h3>Send a Message</h3>
          <div className="cfg">
            <label>Your Name</label>
            <input type="text" placeholder="Full name" value={form.name} onChange={e => setField('name', e.target.value)} />
          </div>
          <div className="cfg">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setField('email', e.target.value)} />
          </div>
          <div className="cfg">
            <label>Message</label>
            <textarea placeholder="How can we help?" value={form.message} onChange={e => setField('message', e.target.value)} />
          </div>
          <motion.button
            className="cf-send"
            onClick={sendContact}
            disabled={sending}
            whileHover={{ scale: sending ? 1 : 1.02 }}
            whileTap={{ scale: sending ? 1 : 0.98 }}
          >
            {sending ? 'Sending…' : 'Send Message →'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
