// Join — 3-step membership registration form.
//   Step 1: Personal details (name, email, phone, university, year, field)
//   Step 2: Choose Full ($10/yr via Stripe) or Social (free) membership
//   Step 3: Payment (Stripe card element) or free confirmation
// On submit, data is saved to localStorage and the success Modal is triggered via onSuccess().
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE, MEMBERSHIP_TIERS, UNIVERSITIES, STUDY_YEARS, FIELDS_OF_STUDY } from '../data/site';
import { useToast } from '../context/ToastContext';

// Maps step number → progress bar width so the animated bar grows as steps advance.
const PROG = { 1: '33%', 2: '66%', 3: '100%' };

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export default function Join({ onSuccess }) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [selMem, setSelMem] = useState('full');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    atUoA: '',           // 'Yes' | 'No'
    upi: '',             // UoA only
    universityId: '',
    university: '',      // non-UoA only
    field: '',
    year: '',
    continuing2027: '',  // 'Yes' | 'No'
  });
  const [cardError, setCardError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const stripeRef = useRef(null);
  const cardElRef = useRef(null);
  const cardDivRef = useRef(null);
  // Guards against mounting the Stripe card element twice — Stripe throws if you call .mount()
  // on an already-mounted element, which happens when the user navigates back to step 3.
  const cardMountedRef = useRef(false);

  // Initialize Stripe once — creating elements is expensive, so we do it outside of render.
  useEffect(() => {
    try {
      stripeRef.current = window.Stripe(SITE.stripeKey);
      const elements = stripeRef.current.elements({
        fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400' }],
      });
      cardElRef.current = elements.create('card', {
        style: {
          base: {
            fontFamily: 'Outfit,sans-serif',
            fontSize: '15px',
            color: '#0a1628',
            '::placeholder': { color: '#9aaabb' },
          },
        },
      });
      cardElRef.current.on('change', e => setCardError(e.error ? e.error.message : ''));
    } catch (_) {}
  }, []);

  // Mount card element when step 3 + paid tier
  useEffect(() => {
    if (step === 3 && selMem === 'full' && cardElRef.current && cardDivRef.current && !cardMountedRef.current) {
      try {
        cardElRef.current.mount(cardDivRef.current);
        cardMountedRef.current = true;
      } catch (_) {}
    }
  }, [step, selMem]);

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function goToStep(n) {
    if (n > 1) {
      const isUoA = form.atUoA === 'Yes';
      const missing =
        !form.firstName || !form.lastName || !form.email || !form.atUoA ||
        (isUoA && !form.upi) ||
        (!isUoA && !form.university);
      if (missing) {
        toast.error('Please fill in all required fields (*) before continuing.');
        return;
      }
    }
    setStep(n);
  }

  async function handleSubmit() {
    setSubmitting(true);
    const isUoA = form.atUoA === 'Yes';
    const paid = selMem === 'full' ? 'Yes (via website)' : 'Social (Free)';
    const data = {
      // ── Sheet columns (match "Form responses 1" exactly) ──────────────────
      timestamp:      new Date().toLocaleString('en-NZ'),
      firstName:      form.firstName,
      lastName:       form.lastName,
      email:          form.email,
      atUoA:          form.atUoA,
      // UoA-specific columns (cols 6-11)
      upi:            isUoA ? form.upi           : '',
      universityId:   isUoA ? form.universityId  : '',
      fieldUoA:       isUoA ? form.field         : '',
      yearUoA:        isUoA ? form.year          : '',
      continuing2027: isUoA ? form.continuing2027 : '',
      paidUoA:        isUoA ? paid               : '',
      // Non-UoA columns (cols 12-16)
      universityOther: !isUoA ? form.university  : '',
      universityIdOther: !isUoA ? form.universityId : '',
      fieldOther:     !isUoA ? form.field        : '',
      yearOther:      !isUoA ? form.year         : '',
      paidOther:      !isUoA ? paid              : '',
      // Extra
      phone:          form.phone,
      membership:     selMem === 'full' ? 'Full Member' : 'Social Member',
    };

    if (selMem === 'full' && stripeRef.current && cardElRef.current) {
      try {
        const { paymentMethod, error } = await stripeRef.current.createPaymentMethod({
          type: 'card',
          card: cardElRef.current,
          billing_details: { name: `${data.firstName} ${data.lastName}`, email: data.email },
        });
        if (error) {
          setCardError(error.message);
          setSubmitting(false);
          return;
        }
        data.paymentStatus = 'Paid';
        data.stripePaymentMethod = paymentMethod.id;
      } catch (_) {}
    }

    // Send to Google Sheets via Apps Script web app (fire-and-forget, no-cors)
    if (SITE.sheetsUrl) {
      try {
        await fetch(SITE.sheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (_) {}
    }

    // Keep localStorage as a local backup
    const members = JSON.parse(localStorage.getItem('alsaMembers2026') || '[]');
    members.push(data);
    localStorage.setItem('alsaMembers2026', JSON.stringify(members));

    setSubmitting(false);
    const payNote = selMem === 'full'
      ? 'Your NZD $10 payment is being processed via Stripe. A receipt will be emailed to you.'
      : 'Social Membership is free. Welcome aboard!';
    onSuccess(data.email, payNote);
    setStep(1);
    setSelMem('full');
    setForm({ firstName: '', lastName: '', email: '', phone: '', atUoA: '', upi: '', universityId: '', university: '', field: '', year: '', continuing2027: '' });
    cardMountedRef.current = false;
  }

  const isSocial = selMem === 'social';

  return (
    <section id="join">
      <div className="join-bg1" />
      <div className="join-bg2" />
      <div className="join-deco" />

      <div className="join-wrap">
        <motion.div
          className="join-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="sec-eyebrow" style={{ color: 'rgba(245,184,0,.7)', justifyContent: 'center' }}>
            Become a Member
          </div>
          <h2 className="sec-h">Join the ALSA Family</h2>
          <p>Sign up in three quick steps to access all events, exclusive member discounts and the wider ALSA community.</p>
        </motion.div>

        <motion.div
          className="form-shell"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="form-progress">
            <motion.div
              className="form-prog-bar"
              animate={{ width: PROG[step] }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <div className="form-body">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit">
                  <div className="step-label">Step 1 of 3</div>
                  <div className="step-title">Sign-Up Now!</div>
                  <div className="fgrid">
                    <div className="fg">
                      <label>First Name *</label>
                      <input type="text" placeholder="e.g. Amara" value={form.firstName} onChange={e => setField('firstName', e.target.value)} />
                    </div>
                    <div className="fg">
                      <label>Last Name *</label>
                      <input type="text" placeholder="e.g. Silva" value={form.lastName} onChange={e => setField('lastName', e.target.value)} />
                    </div>
                    <div className="fg">
                      <label>Email Address *</label>
                      <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setField('email', e.target.value)} />
                    </div>
                    <div className="fg">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+64 21 000 0000" value={form.phone} onChange={e => setField('phone', e.target.value)} />
                    </div>
                    <div className="fg full">
                      <label>Are you currently studying at the University of Auckland? *</label>
                      <select value={form.atUoA} onChange={e => setField('atUoA', e.target.value)}>
                        <option value="">Select an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {form.atUoA === 'Yes' && <>
                      <div className="fg">
                        <label>UPI *<span className="fg-hint"> e.g. lbal981</span></label>
                        <input type="text" placeholder="e.g. lbal981" value={form.upi} onChange={e => setField('upi', e.target.value)} />
                      </div>
                      <div className="fg">
                        <label>Student ID</label>
                        <input type="text" placeholder="e.g. 123456789" value={form.universityId} onChange={e => setField('universityId', e.target.value)} />
                      </div>
                    </>}

                    {form.atUoA === 'No' && <>
                      <div className="fg">
                        <label>Your University *</label>
                        <select value={form.university} onChange={e => setField('university', e.target.value)}>
                          <option value="">Select your university</option>
                          {UNIVERSITIES.filter(u => !u.includes('UoA')).map(u => <option key={u}>{u}</option>)}
                        </select>
                      </div>
                      <div className="fg">
                        <label>Student ID</label>
                        <input type="text" placeholder="Student ID number" value={form.universityId} onChange={e => setField('universityId', e.target.value)} />
                      </div>
                    </>}

                    {form.atUoA && <>
                      <div className="fg">
                        <label>What are you studying?</label>
                        <select value={form.field} onChange={e => setField('field', e.target.value)}>
                          <option value="">Select field</option>
                          {FIELDS_OF_STUDY.map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div className="fg">
                        <label>Year of Study in 2026</label>
                        <select value={form.year} onChange={e => setField('year', e.target.value)}>
                          <option value="">Select year</option>
                          {STUDY_YEARS.map(y => <option key={y}>{y}</option>)}
                        </select>
                      </div>
                      {form.atUoA === 'Yes' && (
                        <div className="fg full">
                          <label>Will you still be a student in 2027?</label>
                          <select value={form.continuing2027} onChange={e => setField('continuing2027', e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      )}
                    </>}
                  </div>
                  <div className="form-nav">
                    <div className="step-dots">
                      <div className="sdot active" /><div className="sdot" /><div className="sdot" />
                    </div>
                    <motion.button className="btn-next" onClick={() => goToStep(2)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      Choose Membership →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit">
                  <div className="step-label">Step 2 of 3</div>
                  <div className="step-title">Choose Your Membership</div>
                  <div className="mem-grid">
                    {MEMBERSHIP_TIERS.map(tier => (
                      <motion.label
                        key={tier.id}
                        className={`mem-card ${selMem === tier.id ? 'chosen' : ''}`}
                        onClick={() => setSelMem(tier.id)}
                        whileHover={{ y: -4 }}
                      >
                        <input type="radio" name="mem" value={tier.id} readOnly checked={selMem === tier.id} />
                        <div className={`mem-badge ${tier.badgeClass}`}>{tier.badge}</div>
                        <div className="mem-price">
                          {tier.pricePrefix && <sup>{tier.pricePrefix}</sup>}
                          {tier.price}
                          <span className="per">{tier.period}</span>
                        </div>
                        <ul className="mem-perks">
                          {tier.perks.map(perk => <li key={perk}>{perk}</li>)}
                        </ul>
                      </motion.label>
                    ))}
                  </div>
                  <div className="form-nav" style={{ marginTop: '28px' }}>
                    <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
                    <div className="step-dots">
                      <div className="sdot done" /><div className="sdot active" /><div className="sdot" />
                    </div>
                    <motion.button className="btn-next" onClick={() => setStep(3)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      Continue →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit">
                  <div className="step-label">Step 3 of 3</div>
                  <div className="step-title">{isSocial ? 'Confirm Registration' : 'Secure Payment'}</div>

                  {isSocial ? (
                    <div style={{ textAlign: 'center', padding: '36px 0' }}>
                      <motion.div
                        style={{ fontSize: '4rem', marginBottom: '18px' }}
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      >🎉</motion.div>
                      <p style={{ color: 'var(--muted)', lineHeight: 1.75, maxWidth: '380px', margin: '0 auto' }}>
                        Social Membership is completely free! Click confirm to join the ALSA community.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="order-box">
                        <div>
                          <div className="olabel">ALSA Full Membership 2026</div>
                          <div className="osub">All events, discounts &amp; voting rights</div>
                        </div>
                        <div className="order-amt">NZD $10</div>
                      </div>
                      <div className="stripe-row">
                        <div className="stripe-secure">
                          🔒 Secured by <span className="stripe-badge">stripe</span>
                        </div>
                        <div className="card-brands" style={{ marginLeft: 'auto' }}>
                          <div className="cbrand" style={{ color: '#1a1f71' }}>VISA</div>
                          <div className="cbrand" style={{ color: '#eb001b' }}>MC</div>
                          <div className="cbrand" style={{ color: '#2e77bc' }}>AMEX</div>
                        </div>
                      </div>
                      <div ref={cardDivRef} id="card-element" />
                      {cardError && <div id="card-errors">{cardError}</div>}
                      <div className="stripe-note">
                        <strong style={{ color: '#635bff' }}>⚡ Stripe Setup:</strong> Set{' '}
                        <code>SITE.stripeKey</code> in <code>src/data/site.js</code> with your publishable key.
                      </div>
                    </>
                  )}

                  <div className="form-nav" style={{ marginTop: '28px' }}>
                    <button className="btn-back" onClick={() => setStep(2)}>← Back</button>
                    <div className="step-dots">
                      <div className="sdot done" /><div className="sdot done" /><div className="sdot active" />
                    </div>
                    <motion.button
                      className={`btn-next ${!isSocial ? 'btn-pay' : ''}`}
                      onClick={handleSubmit}
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.04 }}
                      whileTap={{ scale: submitting ? 1 : 0.97 }}
                    >
                      {submitting ? 'Processing…' : isSocial ? 'Confirm & Join Free →' : 'Pay NZD $10 →'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
