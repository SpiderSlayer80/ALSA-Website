import Stripe from 'stripe';

// Membership price is fixed server-side — the client can never influence the
// amount charged. Update here (and the copy in src/data/site.js) if the fee changes.
const MEMBERSHIP_AMOUNT_CENTS = 1000; // NZD $10.00
const MEMBERSHIP_CURRENCY = 'nzd';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    // Configuration problem — never expose internals to the browser.
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payments are temporarily unavailable. Please try again later.' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { email } = req.body || {};
    // Only attach a receipt email if it actually looks like one; a malformed
    // address would make Stripe reject the whole intent.
    const receiptEmail =
      typeof email === 'string' && EMAIL_RE.test(email.trim()) && email.length <= 254
        ? email.trim()
        : null;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: MEMBERSHIP_AMOUNT_CENTS,
      currency: MEMBERSHIP_CURRENCY,
      automatic_payment_methods: { enabled: true },
      description: 'ALSA Full Membership',
      metadata: { source: 'alsa-website', product: 'full-membership' },
      ...(receiptEmail ? { receipt_email: receiptEmail } : {}),
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    // Log the real error server-side; the browser only ever sees a generic message.
    console.error('create-payment-intent failed:', err);
    res.status(500).json({ error: 'We could not start the payment. Please try again in a moment.' });
  }
}
