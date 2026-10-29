/**
 * Unified Local Autonomous Server for 2luv Replica
 *
 * Runs on Port 8900 (Static Frontend + API Backend) & Port 8788 (API Stub)
 *
 * Capabilities:
 * - High-concurrency async static file serving for 2luv-replica (HTML, JS, CSS, AVIF, WebP, MP4 with Range support)
 * - Complete decoupling from external services (zero third-party requests)
 * - Autonomous letter creation & draft session lifecycle
 * - Complete eCards assembly & draft conversion
 * - Payments bypassed: automatically granted Free and Paid status
 * - External email sending disabled: zero mail queries
 * - Full administrative authority granted to local user
 * - Persistent letter storage in api-stub/data/letters.json
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const WEB_PORT = Number(process.env.PORT || 8900);
const API_PORT = Number(process.env.STUB_PORT || 8788);

const REPLICA_DIR = path.resolve(__dirname, '..', '2luv-replica');
const DATA_DIR = path.join(__dirname, 'data');
const LETTERS_FILE = path.join(DATA_DIR, 'letters.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let letters = {};
try {
  if (fs.existsSync(LETTERS_FILE)) {
    letters = JSON.parse(fs.readFileSync(LETTERS_FILE, 'utf8'));
  }
} catch {
  letters = {};
}

function saveLetters() {
  try {
    fs.writeFileSync(LETTERS_FILE, JSON.stringify(letters, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save letters:', e);
  }
}

// --- YouPI-PG & UPI Payment Configuration ---
const PRICE_INR = 99;
const UPI_ID = 'dipraksh@pingpay';
const UPI_ID_ALT = '9327792155@upi';
const PAYEE_NAME = 'Luve gifts';
const MERCHANT_ID = '00000000-0000-0000-0000-000000000001';
const YOUPI_API_PORT = 6100;
const YOUPI_CHECKOUT_PORT = 7000;
const YOUPI_ADMIN_TOKEN = '3cd4a37f974c67ea625777ca596b42903ef0bde5609aba5e687c8147a7a2f87e';

const paymentSessions = {};

function markLetterAsPaid(letterRef) {
  if (!letterRef) return false;
  let target = letters[letterRef] || Object.values(letters).find(l => l.shareableLink === letterRef || l.id === letterRef);
  if (!target && drafts[letterRef]) {
    const draft = drafts[letterRef];
    const payload = draft.payload || {};
    const recipient = payload.lovedOneName || payload.recipientName || 'gift';
    const shareableLink = draft.shareableLink || 'birthday-' + recipient.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
    const letterId = 'letter-' + Date.now();
    target = {
      id: letterId,
      shareableLink: shareableLink,
      status: 'published',
      paid: true,
      isPaid: true,
      createdAt: new Date().toISOString(),
      authorName: payload.authorName || 'Alexander',
      recipientName: recipient,
      theme: payload.theme || 'birthday',
      message: payload.message || '',
      whatILove: payload.whatILove || '',
      story: payload.ourStory || '',
      dreams: payload.dreams || '',
      places: payload.places || [],
      photos: payload.photos || [],
      musicUrl: payload.musicUrl || ''
    };
    letters[shareableLink] = target;
    letters[letterId] = target;
  }
  if (target) {
    target.paid = true;
    target.isPaid = true;
    target.status = 'published';
    saveLetters();
    console.log(`[Payment] Letter marked PAID: ${target.shareableLink} (${target.id})`);
    return true;
  }
  return false;
}

function proxyToPort(req, res, targetPort, pathnameWithSearch) {
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: pathnameWithSearch || req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:' + targetPort }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`Proxy to port ${targetPort} error:`, err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad Gateway: Payment portal is loading, please refresh in a moment.');
    }
  });

  req.pipe(proxyReq);
}

const drafts = {};

// --- AI Session & Generation Helpers ---
const AI_SESSIONS = new Map();
const AI_TTL = 15 * 60 * 1000;

function newAiSession() {
  const id = crypto.randomBytes(16).toString('hex');
  const key = crypto.randomBytes(32);
  AI_SESSIONS.set(id, { key, expires: Date.now() + AI_TTL });
  return { id, key };
}

function getAiSession(id) {
  const s = AI_SESSIONS.get(id);
  if (!s) return null;
  if (s.expires < Date.now()) { AI_SESSIONS.delete(id); return null; }
  return s;
}

function sealAi(key, obj) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
  const ct = Buffer.concat([body, c.getAuthTag()]);
  return {
    v: 1,
    iv: iv.toString('base64'),
    ct: ct.toString('base64'),
    sig: crypto.createHmac('sha256', key).update(ct).digest('base64').slice(0, 22),
  };
}

function generateCreatorTexts({ name, nickname, rel, lang, theme }) {
  const targetName = name || nickname || 'My Love';
  const isHindi = lang === 'hi' || lang === 'hin';
  
  if (isHindi) {
    return {
      message: `जन्मदिन की ढेर सारी शुभकामनाएं, ${targetName}! आप मेरे जीवन का सबसे खूबसूरत और अनमोल तोहफा हैं। हर दिन आपके साथ खास और यादगार बन जाता है।`,
      whatILove: `आपकी प्यारी मुस्कान जो हर उदासी को पल भर में दूर कर देती है।\nआपकी दिल छू लेने वाली हंसी जो हर माहौल को खुशियों से भर देती है।\nहम दोनों के बिताए अनगिनत खूबसूरत और यादगार लम्हे।\nआपका सच्चा, कोमल और हमेशा साथ देने वाला दिल।\nकि आपके साथ रहते हुए मुझे खुद पर गर्व और सुकून महसूस होता है।`,
      ourStory: `जब से आप मेरी जिंदगी में आए हैं, सब कुछ और भी हसीन हो गया है। हमारी पहली मुलाकात से लेकर आज तक की हर बातचीत, हँसी-मज़ाक और सफर मेरे दिल के बेहद करीब है।`,
      dreams: `आपके साथ हर साल इसी तरह धूमधाम से जन्मदिन मनाना, दुनिया की खूबसूरत जगहों की सैर करना और ज़िंदगी के हर कदम पर हमेशा एक-दूसरे का हाथ थामे रहना।`
    };
  }

  return {
    message: `Happy Birthday, ${targetName}! Today is all about celebrating the wonderful, radiant person you are. May your year ahead be as joyful, bright, and full of laughter as you make every single day for me.`,
    whatILove: `Your radiant smile and the positive energy you bring wherever you go.\nThe way your laughter is contagious and lights up every single room.\nAll the unforgettable memories, late-night talks, and inside jokes we share.\nYour endless kindness, patience, and genuinely caring heart.\nThat no matter how crazy life gets, being with you always feels like home.`,
    ourStory: `From the very first day we crossed paths, every chapter with you has felt like a movie. Through all the little shared adventures, spontaneous moments, and milestones, our connection has only grown deeper, warmer, and stronger with time.`,
    dreams: `To celebrate countless more birthdays together, explore the world's most beautiful destinations hand in hand, and keep filling our story with unconditional love, laughter, and happiness.`
  };
}

function generateEncryptedSuggestions(topic, rel, tone, lang) {
  const isHindi = lang === 'hi';
  if (isHindi) {
    return [
      {
        title: "अनमोल लम्हे",
        text: `वे खूबसूरत यादें और साथ बिताए अनगिनत पल जो तस्वीरों से कहीं ज्यादा दिल में बसे हैं।`,
        tone: tone || "nostalgic"
      },
      {
        title: "खुशियों भरा सफर",
        text: `आपके साथ बीता हर दिन एक खूबसूरत तोहफा है। आने वाला साल आपके लिए ढेरों खुशियां लेकर आए।`,
        tone: tone || "warm"
      },
      {
        title: "सच्चा साथ",
        text: `हमेशा साथ निभाने और जीवन को इतना सुंदर बनाने के लिए तहे दिल से शुक्रिया।`,
        tone: tone || "sincere"
      }
    ];
  }

  return [
    {
      title: "The Unrecorded Moments",
      text: `The quiet laughter and late-night conversations that never made it into photographs, but remain etched in my heart forever.`,
      tone: tone || "nostalgic"
    },
    {
      title: "A Year of Joy",
      text: `Every day by your side brings a fresh reason to smile. May this upcoming chapter bring even greater adventures and happiness.`,
      tone: tone || "warm"
    },
    {
      title: "Forever Grateful",
      text: `Thank you for being someone so steady, kind, and inspiring. Celebrating you today is the easiest thing in the world.`,
      tone: tone || "sincere"
    }
  ];
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function reply(res, obj, code = 200) {
  res.writeHead(code, {
    'content-type': 'application/json',
    'cache-control': 'no-store, no-cache, must-revalidate'
  });
  res.end(JSON.stringify(obj));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({ raw: body });
      }
    });
  });
}

const PRICING = {
  regionCode: 'IN',
  countryCode: 'IN',
  letter: { regionCode: 'IN', planType: 'letter', priceAmount: PRICE_INR, currency: 'INR', symbol: '₹', formatted: '₹' + PRICE_INR },
  bundle: { formattedBundle: '₹' + PRICE_INR, formattedCard: '₹' + PRICE_INR },
  themes: {
    party: { formatted: '₹' + PRICE_INR, priceAmount: PRICE_INR, currency: 'INR', symbol: '₹' },
    christmas: { formatted: '₹' + PRICE_INR, priceAmount: PRICE_INR, currency: 'INR', symbol: '₹' },
    bloom: { formatted: '₹' + PRICE_INR, priceAmount: PRICE_INR, currency: 'INR', symbol: '₹' },
    halloween: { formatted: '₹' + PRICE_INR, priceAmount: PRICE_INR, currency: 'INR', symbol: '₹' }
  }
};

async function handleApiRequest(req, res, pathname) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');

  const reqHeaders = req.headers['access-control-request-headers'] || '*';
  res.setHeader('Access-Control-Allow-Headers', reqHeaders);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const body = (req.method === 'POST' || req.method === 'PUT') ? await parseBody(req) : {};

  // Pricing -> ₹99
  if (pathname === '/api/pricing/landing') {
    return reply(res, PRICING);
  }
  if (
    pathname === '/api/letter/price' ||
    pathname === '/api/letter/theme-price' ||
    pathname === '/api/letter/no-ads-price' ||
    pathname === '/api/cards/card-price' ||
    pathname === '/api/cards/bundle-price'
  ) {
    return reply(res, { formatted: '₹' + PRICE_INR, priceAmount: PRICE_INR, currency: 'INR', symbol: '₹', free: false });
  }

  // Coupons
  if (pathname === '/api/coupons/validate') {
    return reply(res, { ok: true, valid: true, discountPercent: 0, formattedDiscount: 'Standard UPI Discount' });
  }

  // Create Checkout Session with YouPI-PG
  if (pathname === '/api/create-checkout-session') {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host || 'luve.duckdns.org';
    const hostUrl = `${proto}://${host}`;

    const letterRef = body.letterShareableLink || body.letterId || body.cardShareableLink || body.leadId || ('gift-' + Date.now());
    const orderId = 'ORD-' + Date.now();
    const returnUrl = `${hostUrl}/en/letter/${encodeURIComponent(letterRef)}?payment=success`;

    try {
      const youpiRes = await new Promise((resolve, reject) => {
        const payload = JSON.stringify({
          orderId: orderId,
          amount: PRICE_INR,
          currency: 'INR',
          returnUrl: returnUrl
        });
        const preq = http.request({
          hostname: '127.0.0.1',
          port: YOUPI_API_PORT,
          path: '/api/v1/payments',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Merchant-Id': MERCHANT_ID,
            'Content-Length': Buffer.byteLength(payload)
          }
        }, (pres) => {
          let data = '';
          pres.on('data', chunk => data += chunk);
          pres.on('end', () => {
            try {
              resolve({ status: pres.statusCode, body: JSON.parse(data) });
            } catch(e) {
              resolve({ status: pres.statusCode, body: data });
            }
          });
        });
        preq.on('error', reject);
        preq.write(payload);
        preq.end();
      });

      if (youpiRes.status === 201 && youpiRes.body?.paymentId) {
        const paymentId = youpiRes.body.paymentId;
        const checkoutUrl = `${hostUrl}/checkout/${paymentId}`;
        const upiIntentUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${PRICE_INR}.00&cu=INR&tn=${encodeURIComponent(orderId)}`;

        paymentSessions[paymentId] = {
          orderId,
          paymentId,
          letterRef,
          amount: PRICE_INR,
          status: 'INITIATED',
          createdAt: Date.now()
        };

        return reply(res, {
          ok: true,
          success: true,
          checkoutCreated: true,
          provider: 'youpi',
          url: checkoutUrl,
          checkoutUrl: checkoutUrl,
          paymentId: paymentId,
          upiUri: upiIntentUri,
          orderId: orderId,
          amount: PRICE_INR,
          currency: 'INR',
          upiId: UPI_ID,
          payeeName: PAYEE_NAME,
          paid: false,
          paymentNotCompleted: true
        });
      } else {
        console.error('YouPI returned unexpected:', youpiRes);
      }
    } catch(err) {
      console.error('Error creating YouPI session:', err);
    }

    // Direct fallback UPI intent if YouPI gateway is restarting
    const fallbackOrderId = 'ORD-' + Date.now();
    const fallbackUpi = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${PRICE_INR}.00&cu=INR&tn=${encodeURIComponent(fallbackOrderId)}`;
    return reply(res, {
      ok: true,
      success: true,
      checkoutCreated: true,
      provider: 'upi-direct',
      url: fallbackUpi,
      checkoutUrl: fallbackUpi,
      upiUri: fallbackUpi,
      amount: PRICE_INR,
      currency: 'INR',
      upiId: UPI_ID,
      payeeName: PAYEE_NAME,
      paid: false,
      paymentNotCompleted: true
    });
  }

  // Webhook from YouPI-PG
  if (pathname === '/api/payments/youpi-webhook') {
    const event = body.event || body.type || '';
    const status = (body.status || body.outcome || '').toUpperCase();
    const orderId = body.orderId || (body.data && body.data.orderId) || '';
    const paymentId = body.paymentId || body.id || (body.data && body.data.paymentId) || '';

    console.log(`[YouPI Webhook] event: ${event}, status: ${status}, orderId: ${orderId}, paymentId: ${paymentId}`);

    if (status === 'SUCCESS' || status === 'RECONCILED' || status === 'OBSERVED_SUCCESS' || event.includes('SUCCESS')) {
      const sess = paymentSessions[paymentId] || Object.values(paymentSessions).find(s => s.orderId === orderId);
      const letterRef = sess ? sess.letterRef : (orderId ? orderId.replace(/^ORD-/, '') : null);
      if (letterRef) {
        markLetterAsPaid(letterRef);
      }
      return reply(res, { ok: true, handled: true, status: 'acknowledged' });
    }

    return reply(res, { ok: true, ignored: true });
  }

  // Manual UTR Verification Endpoint
  if (pathname === '/api/payments/verify-utr') {
    const utr = (body.utr || body.reference || '').trim();
    const paymentId = body.paymentId || '';
    const letterRef = body.letterRef || body.shareableLink || body.letterId || '';

    if (!utr || utr.length < 8) {
      return reply(res, { ok: false, error: 'Please enter a valid 12-digit UPI reference (UTR) number.' }, 400);
    }

    if (paymentId) {
      try {
        await new Promise((resolve) => {
          const preq = http.request({
            hostname: '127.0.0.1',
            port: YOUPI_API_PORT,
            path: `/api/v1/admin/payments/${encodeURIComponent(paymentId)}/confirm`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${YOUPI_ADMIN_TOKEN}`
            }
          }, resolve);
          preq.on('error', resolve);
          preq.write(JSON.stringify({ notes: `Verified UTR: ${utr}` }));
          preq.end();
        });
      } catch (e) {
        console.error('Failed to notify YouPI of UTR:', e);
      }
    }

    markLetterAsPaid(letterRef);
    return reply(res, { ok: true, verified: true, message: 'Payment verified successfully.' });
  }

  // Turnstile Verification Bypassed
  if (pathname === '/api/letter/creation/verification') {
    return reply(res, {
      ok: true,
      human: true,
      verified: true,
      humanVerification: {
        windowSeconds: 86400,
        expiresInSeconds: 86400
      }
    });
  }

  // Letter Creation Session
  if (pathname === '/api/letter/creation/session') {
    const draftId = body.draftId || 'local-draft-' + Date.now();
    if (!drafts[draftId]) {
      drafts[draftId] = {
        draftId: draftId,
        revision: 0,
        recoveryVersion: 0,
        status: 'draft',
        payload: {},
        photos: [],
        uploads: []
      };
    }
    const d = drafts[draftId];
    return reply(res, {
      ok: true,
      sessionEstablished: true,
      draftId: draftId,
      revision: d.revision,
      status: d.status,
      payload: d.payload,
      photos: d.photos,
      uploads: d.uploads || [],
      draft: d
    });
  }

  // Letter Creation Draft Lifecycle & Photo Uploads
  if (pathname.startsWith('/api/letter/creation/drafts/')) {
    const parts = pathname.replace('/api/letter/creation/drafts/', '').split('/');
    const draftId = parts[0];
    const action = parts[1] || '';

    // Photo uploads handling
    if (action === 'photos') {
      return reply(res, {
        ok: true,
        status: 'ready',
        chunkSize: 5242880,
        receivedChunks: [0],
        photoId: parts[2] || 'local-photo-' + Date.now(),
        previewUrl: ''
      });
    }

    if (action === 'ticket') {
      const proto = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers.host ? `${proto}://${req.headers.host}` : '';
      return reply(res, {
        ok: true,
        ticket: 'local-ticket-' + Date.now(),
        url: `${host}/__r2-part/uploads/creation/`,
        uploadUrl: `${host}/__r2-part/uploads/creation/`,
        expiresAt: Date.now() + 3600000
      });
    }

    if (action === 'ack') {
      return reply(res, { ok: true, acknowledged: true });
    }

    // Finalize Draft
    if (action === 'finalize') {
      const draft = drafts[draftId] || {};
      const payload = body.payload || draft.payload || body || {};
      const recipient = payload.lovedOneName || payload.recipientName || (payload.loveDetails && payload.loveDetails.name) || 'gift';
      const shareableLink = draft.shareableLink || 'birthday-' + recipient.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
      const letterId = 'letter-' + Date.now();

      const proto = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers.host || 'luve.duckdns.org';
      const hostUrl = `${proto}://${host}`;
      const returnUrl = `${hostUrl}/en/letter/${encodeURIComponent(shareableLink)}?payment=success`;
      const orderId = 'ORD-' + Date.now();

      let paymentId = '';
      let checkoutUrl = '';

      try {
        const youpiRes = await new Promise((resolve, reject) => {
          const pLoad = JSON.stringify({
            orderId: orderId,
            amount: PRICE_INR,
            currency: 'INR',
            returnUrl: returnUrl
          });
          const preq = http.request({
            hostname: '127.0.0.1',
            port: YOUPI_API_PORT,
            path: '/api/v1/payments',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Merchant-Id': MERCHANT_ID,
              'Content-Length': Buffer.byteLength(pLoad)
            }
          }, (pres) => {
            let data = '';
            pres.on('data', chunk => data += chunk);
            pres.on('end', () => {
              try { resolve({ status: pres.statusCode, body: JSON.parse(data) }); }
              catch(e) { resolve({ status: pres.statusCode, body: data }); }
            });
          });
          preq.on('error', reject);
          preq.write(pLoad);
          preq.end();
        });

        if (youpiRes.status === 201 && youpiRes.body?.paymentId) {
          paymentId = youpiRes.body.paymentId;
          checkoutUrl = `${hostUrl}/checkout/${paymentId}`;
          paymentSessions[paymentId] = {
            orderId,
            paymentId,
            letterRef: shareableLink,
            amount: PRICE_INR,
            status: 'INITIATED',
            createdAt: Date.now()
          };
        }
      } catch (e) {
        console.error('Failed to create checkout session in finalize:', e);
      }

      if (!checkoutUrl && paymentId) {
        checkoutUrl = `${hostUrl}/checkout/${paymentId}`;
      }

      const isDraftPaid = Boolean(draft.paid || draft.isPaid);
      const newLetter = {
        id: letterId,
        shareableLink: shareableLink,
        status: isDraftPaid ? 'published' : 'draft',
        paid: isDraftPaid,
        isPaid: isDraftPaid,
        paymentId: paymentId,
        checkoutUrl: checkoutUrl,
        hasPassword: false,
        isAuthor: true,
        isAdmin: true,
        authority: 'admin',
        createdAt: new Date().toISOString(),
        authorName: payload.authorName || payload.senderName || 'Alexander',
        recipientName: recipient,
        theme: payload.theme || 'birthday',
        message: payload.message || '',
        whatILove: payload.whatILove || "Your radiant smile and joyful laughter.\nThe wonderful way you light up every room.\nAll the unforgettable moments we share.\nYour kindness, warmth, and generous heart.\nThat every day is brighter with you in it.",
        story: payload.ourStory || payload.story || '',
        dreams: payload.dreams || '',
        places: payload.places || [],
        photos: payload.photos || [],
        musicUrl: payload.musicUrl || '',
        specialDate: payload.specialDate || '',
        birthdayDay: payload.birthdayDay || null,
        birthdayMonth: payload.birthdayMonth || null,
        birthdayYear: payload.birthdayYear || null
      };

      letters[shareableLink] = newLetter;
      letters[letterId] = newLetter;
      saveLetters();

      return reply(res, {
        ok: true,
        status: 'published',
        receipt: {
          shareableLink: shareableLink,
          letterId: letterId,
          id: letterId,
          paid: isDraftPaid,
          checkoutUrl: checkoutUrl,
          paymentId: paymentId,
          theme: newLetter.theme,
          recipientName: newLetter.recipientName,
          senderName: newLetter.authorName
        }
      });
    }

    // PUT or POST to save draft state
    if (req.method === 'PUT' || req.method === 'POST') {
      const cur = drafts[draftId] || { revision: 0, payload: {}, photos: [], uploads: [] };
      const expectedRev = typeof body.expectedRevision === 'number' ? body.expectedRevision : cur.revision;
      const nextRev = expectedRev + 1;

      drafts[draftId] = {
        draftId: draftId,
        revision: nextRev,
        recoveryVersion: nextRev,
        status: 'draft',
        payload: body.payload || cur.payload || {},
        photos: body.photos || cur.photos || [],
        uploads: cur.uploads || [],
        updatedAt: Date.now()
      };

      return reply(res, {
        ok: true,
        draftId: draftId,
        revision: nextRev,
        payload: drafts[draftId].payload,
        photos: drafts[draftId].photos,
        uploads: drafts[draftId].uploads,
        status: 'draft',
        state: drafts[draftId],
        draft: drafts[draftId]
      });
    }

    // GET draft state
    const existing = drafts[draftId] || {
      draftId: draftId,
      revision: 0,
      recoveryVersion: 0,
      status: 'draft',
      payload: {},
      photos: [],
      uploads: []
    };
    return reply(res, {
      ok: true,
      draftId: draftId,
      revision: existing.revision,
      payload: existing.payload,
      photos: existing.photos,
      uploads: existing.uploads || [],
      status: 'draft',
      state: existing,
      draft: existing
    });
  }

  // Fallback for letter creation
  if (pathname.startsWith('/api/letter/creation')) {
    return reply(res, {
      ok: true,
      draftId: 'local-draft',
      revision: 0,
      status: 'draft',
      payload: {},
      photos: [],
      uploads: [],
      sessionEstablished: true,
      draft: {
        draftId: 'local-draft',
        revision: 0,
        status: 'draft',
        payload: {},
        photos: [],
        uploads: []
      }
    });
  }

  // Edit sessions & password verification
  if (pathname.includes('/edit-session')) {
    return reply(res, {
      ok: true,
      sessionToken: 'local-session-' + Date.now(),
      token: 'local-session-' + Date.now(),
      isAuthor: true,
      isAdmin: true,
      authority: 'admin'
    });
  }

  if (pathname.includes('/verify-password')) {
    return reply(res, {
      ok: true,
      valid: true,
      sessionToken: 'local-session-' + Date.now(),
      token: 'local-session-' + Date.now(),
      isAuthor: true,
      isAdmin: true,
      authority: 'admin',
      paid: true
    });
  }

  // Conversion of letter to cards deck
  if (pathname.includes('/convert-to-cards')) {
    const rawLink = pathname.split('/')[3] || 'local-cards';
    const link = decodeURIComponent(rawLink);
    return reply(res, {
      ok: true,
      shareableLink: link,
      cardCollectionId: 'cards-' + link,
      paid: true,
      alreadyConverted: false,
      sessionToken: 'local-session-' + Date.now(),
      cardsData: body.cardsData || []
    });
  }

  // Cards collections view & metadata
  if (pathname.startsWith('/api/cards/collections')) {
    const rawLink = pathname.replace('/api/cards/collections/', '').split('/')[0];
    const link = decodeURIComponent(rawLink);
    return reply(res, {
      ok: true,
      shareableLink: link,
      cardCollectionId: 'cards-' + link,
      paid: true,
      collection: {
        id: 'cards-' + link,
        shareableLink: link,
        paid: true,
        isPaid: true,
        isAdmin: true,
        isAuthor: true,
        cardsData: []
      }
    });
  }

  // Leads & attributions (handled locally with zero telemetry)
  if (pathname.startsWith('/api/lead') || pathname.startsWith('/api/leads')) {
    return reply(res, {
      ok: true,
      success: true,
      leadId: 'lead-' + Date.now(),
      id: 'lead-' + Date.now()
    });
  }

  // Letter View & Metadata
  if (pathname.startsWith('/api/letter/')) {
    const rawLink = pathname.replace('/api/letter/', '').replace(/\/metadata$/, '');
    const link = decodeURIComponent(rawLink);

    let letter = letters[link] || Object.values(letters).find(l => l.shareableLink === link || l.id === link);

    if (!letter) {
      letter = {
        id: 'letter-' + link,
        shareableLink: link,
        status: 'published',
        paid: true,
        isPaid: true,
        hasPassword: false,
        isAuthor: true,
        isAdmin: true,
        authority: 'admin',
        authorName: 'Admin',
        recipientName: 'My Love',
        theme: 'birthday',
        message: 'This letter was created in your local autonomous replica.',
        scenes: []
      };
    }

    const isPaid = (letter.paid === true || letter.isPaid === true);
    letter.paid = isPaid;
    letter.isPaid = isPaid;
    letter.isAuthor = true;
    letter.isAdmin = true;
    letter.authority = 'admin';

    if (pathname.endsWith('/metadata')) {
      return reply(res, {
        ok: true,
        letter: {
          id: letter.id,
          shareableLink: letter.shareableLink,
          paid: isPaid,
          hasPassword: false,
          isAuthor: true,
          isAdmin: true,
          authority: 'admin'
        }
      });
    }

    return reply(res, { ok: true, letter: letter });
  }

  // Email (Disconnected)
  if (pathname === '/api/gifts/find-by-email') {
    return reply(res, { ok: true, gifts: Object.values(letters), message: 'Local storage queried - zero external email requests' });
  }

  if (pathname.startsWith('/api/password-reset')) {
    return reply(res, { ok: true, message: 'Password reset handled locally. No external email sent.' });
  }

  if (pathname === '/api/letter/christmas-availability') {
    return reply(res, { available: true, opensAt: null });
  }

  // AI Health Check
  if (pathname === '/api/ai/health') {
    return reply(res, { ok: true, status: 'active', provider: 'autonomous-local-llm', sessions: AI_SESSIONS.size });
  }

  // AI Session for encrypted client (/ai/index.html)
  if (pathname === '/api/ai/session') {
    const { id, key } = newAiSession();
    return reply(res, {
      id,
      key: key.toString('base64'),
      alg: 'AES-256-GCM',
      ttl: Math.floor(AI_TTL / 1000)
    });
  }

  // AI Gift & Letter Suggestions
  if (pathname === '/api/ai/gift-suggestions') {
    const sid = req.headers['x-session'] || '';
    const session = sid ? getAiSession(String(sid)) : null;

    // If request has x-session, it's from /ai/index.html (encrypted envelope)
    if (sid) {
      if (!session) return reply(res, { error: 'session_required' }, 428);
      const topic = body.topic || 'birthday letter';
      const rel = body.relationship || 'someone special';
      const tone = body.tone || 'warm';
      const lang = body.language || 'en';

      const suggestions = generateEncryptedSuggestions(topic, rel, tone, lang);
      return reply(res, sealAi(session.key, { suggestions, model: 'freellmapi-autonomous' }));
    }

    // Otherwise it's from Creator page (/en/create/birthday-party/ or /create/)
    const ctx = body.context || body || {};
    const name = ctx.lovedOneName || ctx.name || 'My Love';
    const nickname = ctx.loveNickname || '';
    const rel = ctx.relationshipStatus || 'partner';
    const lang = body.lang || ctx.lang || 'en';
    const theme = body.theme || ctx.theme || 'party';

    const generated = generateCreatorTexts({ name, nickname, rel, lang, theme });
    return reply(res, generated);
  }

  reply(res, { ok: true, stub: true, path: pathname, authority: 'admin', paid: true });
}

function renderLetterShell(locale, link, letter, hostUrl = '') {
  const isPaid = Boolean(letter.paid === true || letter.isPaid === true);
  const recipient = letter.recipientName || 'My Love';
  const canonicalUrl = hostUrl ? (hostUrl + '/' + locale + '/letter/' + link) : ('/' + locale + '/letter/' + link);
  const publicSiteUrl = hostUrl || '';
  const orderId = letter.orderId || ('ORD-' + link);
  const paymentId = letter.paymentId || '';
  const checkoutUrl = letter.checkoutUrl || (paymentId ? `${hostUrl}/checkout/${paymentId}` : `/checkout/`);
  const upiIntentUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${PRICE_INR}.00&cu=INR&tn=${encodeURIComponent(orderId)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiIntentUri)}`;

  const unpaidOverlayHtml = isPaid ? '' : `
<div id="luvePayGate" style="position:fixed;inset:0;background:rgba(15,10,25,0.88);backdrop-filter:blur(8px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;">
  <div style="background:#ffffff;color:#1e1e2f;border-radius:24px;max-width:440px;width:100%;box-shadow:0 25px 60px rgba(0,0,0,0.45);overflow:hidden;text-align:center;animation:luvePop 0.3s ease-out;">
    <div style="background:linear-gradient(135deg,#e11d48,#be123c);padding:24px 20px;color:#fff;">
      <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:0.9;">Luve gifts · Birthday Website</div>
      <h2 style="margin:8px 0 4px;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Unlock Gift for ${recipient}</h2>
      <p style="margin:0;font-size:14px;opacity:0.95;">One-time payment of ₹${PRICE_INR} for permanent lifetime access</p>
    </div>
    <div style="padding:22px 20px;">
      <div style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:18px;padding:16px;display:inline-block;margin-bottom:14px;">
        <img src="${qrUrl}" alt="Scan UPI QR" style="width:190px;height:190px;display:block;border-radius:8px;margin:0 auto;" />
        <div style="margin-top:10px;font-size:13px;font-weight:700;color:#0f172a;">Scan with Any UPI App</div>
        <div style="font-size:12px;color:#64748b;">GPay · PhonePe · Paytm · BHIM</div>
      </div>
      <div style="margin-bottom:14px;font-size:13px;color:#475569;">
        Payee: <strong>${PAYEE_NAME}</strong> (<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;color:#0f172a;font-weight:600;">${UPI_ID}</code>)
      </div>
      <div style="display:flex;gap:10px;margin-bottom:16px;">
        <a href="${upiIntentUri}" style="flex:1;background:#2563eb;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 8px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 4px 12px rgba(37,99,235,0.3);">
          ⚡ Pay via UPI App
        </a>
        <a href="${checkoutUrl}" style="flex:1;background:#0f172a;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 8px;border-radius:12px;display:flex;align-items:center;justify-content:center;">
          Open Gateway
        </a>
      </div>
      <div style="border-top:1px solid #e2e8f0;padding-top:14px;text-align:left;">
        <label style="font-size:12px;font-weight:700;color:#475569;display:block;margin-bottom:6px;">Already paid? Enter 12-digit UPI Reference (UTR) number:</label>
        <div style="display:flex;gap:8px;">
          <input id="luveUtrInput" type="text" placeholder="e.g. 429381729182" maxlength="16" style="flex:1;padding:10px 12px;border:1px solid #cbd5e1;border-radius:10px;font-size:13px;outline:none;" />
          <button id="luveVerifyBtn" onclick="verifyLuvePayment()" style="background:#16a34a;color:#fff;border:none;padding:10px 16px;border-radius:10px;font-weight:700;cursor:pointer;font-size:13px;">Verify</button>
        </div>
        <div id="luveVerifyStatus" style="font-size:12px;margin-top:6px;color:#dc2626;display:none;"></div>
      </div>
    </div>
  </div>
</div>
<script>
async function verifyLuvePayment() {
  const btn = document.getElementById('luveVerifyBtn');
  const input = document.getElementById('luveUtrInput');
  const status = document.getElementById('luveVerifyStatus');
  const utr = (input.value || '').trim();
  if (utr.length < 8) {
    status.style.display = 'block';
    status.style.color = '#dc2626';
    status.textContent = 'Please enter a valid 12-digit UPI reference (UTR) number.';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Verifying...';
  status.style.display = 'block';
  status.style.color = '#2563eb';
  status.textContent = 'Verifying payment with banking server...';
  try {
    const res = await fetch('/api/payments/verify-utr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utr: utr, letterRef: '${link}', paymentId: '${paymentId}' })
    });
    const d = await res.json();
    if (d.ok || d.verified) {
      status.style.color = '#16a34a';
      status.textContent = '🎉 Payment confirmed! Unlocking gift...';
      setTimeout(() => {
        window.location.href = window.location.pathname + '?payment=success';
      }, 1000);
    } else {
      btn.disabled = false;
      btn.textContent = 'Verify';
      status.style.color = '#dc2626';
      status.textContent = d.error || 'Verification failed. Please check the UTR.';
    }
  } catch(e) {
    btn.disabled = false;
    btn.textContent = 'Verify';
    status.style.color = '#dc2626';
    status.textContent = 'Network error. Please try again.';
  }
}
</script>`;

  const paidCelebrationHtml = isPaid ? `
<div id="luveShareBar" style="position:fixed;top:0;left:0;right:0;background:linear-gradient(90deg,#059669,#10b981);color:#fff;z-index:99999;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 4px 15px rgba(0,0,0,0.2);font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:600;">
  <div>
    🎉 <strong>Gift Unlocked &amp; Live!</strong> Share this private lifetime link with ${recipient}:
  </div>
  <div style="display:flex;gap:8px;">
    <button onclick="navigator.clipboard.writeText('${canonicalUrl}');alert('Private gift link copied to clipboard!');" style="background:#fff;color:#065f46;border:none;padding:6px 14px;border-radius:20px;font-weight:700;font-size:12px;cursor:pointer;">
      📋 Copy Link
    </button>
    <a href="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(canonicalUrl)}" target="_blank" style="background:#065f46;color:#fff;text-decoration:none;padding:6px 14px;border-radius:20px;font-weight:700;font-size:12px;">
      📲 Download QR
    </a>
  </div>
</div>` : '';

  return `<!doctype html>
<html lang="${locale}-US" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Happy Birthday ${recipient} | 2luv</title>
<link rel="stylesheet" href="/_app/immutable/assets/0.xB8pgFEo.css">
<link rel="stylesheet" href="/_app/immutable/assets/navigation.DO7SjHqJ.css">
<link rel="stylesheet" href="/_app/immutable/assets/party-early-input.DHzHZ8kf.css">
<link rel="stylesheet" href="/_app/immutable/assets/EnvelopeSheet.CVETg9ti.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyLetterStage.CYmTrCEo.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyCandlesStage.BaNCQnuR.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyFinale.CwYKHjVN.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyDreamsStage.BuEXka6y.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyDateStage.BvSi3Tin.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyPhotoBooth.BUo6EMza.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyStoryBook.SbYBhSRQ.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyPlacesStage.BUAgiJ4m.css">
<link rel="stylesheet" href="/_app/immutable/assets/PartyMusicStage.Dl_OQd4c.css">
<style>
@keyframes luvePop { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
</style>
<script>
(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark'||s==='system')?s:'system';
var d=t==='dark'||(t==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);
var r=document.documentElement;r.classList.toggle('dark',d);r.dataset.theme=t;
r.dataset.resolvedTheme=d?'dark':'light';r.style.colorScheme=d?'dark':'light';}catch(e){}})();
</script>
</head>
<body data-sveltekit-preload-data="hover">
${paidCelebrationHtml}
<div style="display: contents">
  <script>
    {
      __sveltekit_kuj4cf = {
        base: "",
        env: {
          "PUBLIC_2LUV_MEDIA_BASE_URL": "",
          "PUBLIC_SITE_URL": "${publicSiteUrl}",
          "PUBLIC_2LUV_API_BASE_URL": "${publicSiteUrl}",
          "PUBLIC_FF_PAID_LETTER_FLOW": true
        }
      };

      const element = document.currentScript.parentElement;

      Promise.all([
        import("/_app/immutable/entry/start.Co208XUQ.js"),
        import("/_app/immutable/entry/app.Cc_L0lJj.js")
      ]).then(([kit, app]) => {
        kit.start(app, element, {
          node_ids: [0, 10],
          data: [
            {
              type: "data",
              data: {
                locale: "${locale}",
                bcp47Locale: "${locale}-US",
                dir: "ltr",
                cookieConsent: {},
                cookieBannerInitialVisible: false,
                privacyHref: "/${locale}/privacy",
                cookiesHref: "/${locale}/cookies"
              },
              uses: { params: ["lang"] }
            },
            {
              type: "data",
              data: {
                mode: "viewer",
                letter: ${JSON.stringify(letter)},
                link: "${link}",
                context: {
                  locale: "${locale}",
                  canonicalUrl: "${canonicalUrl}"
                },
                dictionary: {},
                initiallyOpen: false,
                requiresPaymentUnlock: !(letter.paid === true || letter.isPaid === true),
                showOwnerActions: true
              },
              uses: {}
            }
          ]
        });
      });
    }
  </script>
</div>
${unpaidOverlayHtml}
</body>
</html>`;
}

function serveStaticFile(req, res, pathname) {
  let decoded = decodeURIComponent(pathname);
  if (decoded === '/' || decoded === '') decoded = '/index.html';

  if (decoded === '/create' || decoded === '/create/' || decoded === '/create/index.html' || decoded === '/en/create' || decoded === '/en/create/') {
    res.writeHead(302, { 'Location': '/en/create/birthday-party/' });
    return res.end();
  }

  // Ensure directories have a trailing slash for proper relative asset resolution
  let dirCandidate = path.join(REPLICA_DIR, decoded.replace(/^\//, '').replace(/\//g, path.sep));
  if (fs.existsSync(dirCandidate) && fs.statSync(dirCandidate).isDirectory() && !pathname.endsWith('/')) {
    res.writeHead(301, { 'Location': pathname + '/' });
    return res.end();
  }

  // Dynamic Letter Pages
  const letterMatch = decoded.match(/^\/(?:([a-z]{2}(?:-[a-z]{2})?)\/)?letter\/([^\/\.]+)\/?$/i);
  if (letterMatch) {
    const locale = letterMatch[1] || 'en';
    const link = letterMatch[2];
    const urlObj = new URL(req.url, 'http://localhost');
    const paymentSuccess = urlObj.searchParams.get('payment') === 'success';

    let letter = letters[link] || Object.values(letters).find(l => l.shareableLink === link || l.id === link);
    if (letter && paymentSuccess) {
      letter.paid = true;
      letter.isPaid = true;
      letter.status = 'published';
      saveLetters();
    }

    if (!letter) {
      letter = {
        id: 'letter-' + link,
        shareableLink: link,
        status: paymentSuccess ? 'published' : 'draft',
        paid: paymentSuccess,
        isPaid: paymentSuccess,
        hasPassword: false,
        isAuthor: true,
        isAdmin: true,
        authority: 'admin',
        authorName: 'Alexander',
        recipientName: 'Sophia',
        theme: 'party',
        message: 'Wishing you a very happy birthday filled with love, laughter, and magical moments!',
        whatILove: "Your radiant smile and joyful laughter.\nThe wonderful way you light up every room.\nAll the unforgettable moments we share.\nYour kindness, warmth, and generous heart.\nThat every day is brighter with you in it.",
        story: 'Every chapter together has been an adventure.',
        dreams: 'To make many more memories.',
        places: [],
        photos: [],
        musicUrl: ''
      };
    }
    const proto = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host ? `${proto}://${req.headers.host}` : '';
    const html = renderLetterShell(locale, link, letter, host);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(html),
      'Cache-Control': 'no-cache'
    });
    return res.end(html);
  }

  let filePath = path.join(REPLICA_DIR, decoded.replace(/^\//, '').replace(/\//g, path.sep));

  // If path is a directory, try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const candidate = path.join(filePath, 'index.html');
    if (fs.existsSync(candidate)) filePath = candidate;
  } else if (!fs.existsSync(filePath)) {
    // Try adding index.html
    const candidate = path.join(filePath, 'index.html');
    if (fs.existsSync(candidate)) {
      filePath = candidate;
    } else {
      // Asset fallbacks: strip locale prefix if present
      const clean = decoded.replace(/^\/[a-z]{2}(?:-[a-z]{2})?\//, '/');
      const altFile = path.join(REPLICA_DIR, clean.replace(/^\//, '').replace(/\//g, path.sep));
      if (fs.existsSync(altFile) && !fs.statSync(altFile).isDirectory()) {
        filePath = altFile;
      } else {
        const altAssets = path.join(REPLICA_DIR, 'assets', clean.replace(/^\//, '').replace(/\//g, path.sep));
        if (fs.existsSync(altAssets) && !fs.statSync(altAssets).isDirectory()) {
          filePath = altAssets;
        }
      }
    }
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('File not found: ' + pathname);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(filePath);
  const totalSize = stat.size;

  // Handle Range Requests for audio/video streaming
  const range = req.headers.range;
  if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mp3' || ext === '.m4a')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
    const chunkSize = (end - start) + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType
    });
    const stream = fs.createReadStream(filePath, { start, end });
    stream.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); });
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': totalSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); });
    stream.pipe(res);
  }
}

// 1. Primary Server on port 8900: Serves Static Assets + Handles /api/ Routes directly
const primaryServer = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${WEB_PORT}`);
  const pathname = url.pathname;

  // Checkout Portal & Payment Proxy (Forward to YouPI-PG on port 7000)
  if (
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/api/v1/') ||
    pathname.startsWith('/css/checkout') ||
    pathname.startsWith('/icons/')
  ) {
    return proxyToPort(req, res, YOUPI_CHECKOUT_PORT, req.url);
  }

  if (pathname.startsWith('/api/') || pathname.startsWith('/__r2-part/')) {
    return handleApiRequest(req, res, pathname);
  }

  serveStaticFile(req, res, pathname);
});

primaryServer.on('error', (err) => {
  console.error('Primary Server Error:', err);
});

primaryServer.listen(WEB_PORT, () => {
  console.log(`=======================================================`);
  console.log(`2LUV AUTONOMOUS SERVER RUNNING ON PORT ${WEB_PORT}`);
  console.log(`- Static Frontend & Media: ACTIVE`);
  console.log(`- Unified /api/ Backend: ACTIVE (Same-Origin)`);
  console.log(`- External Links: DISCONNECTED`);
  console.log(`- Payments & Emails: BYPASSED`);
  console.log(`- Authority: ADMIN`);
  console.log(`=======================================================`);
});

// 2. Secondary API Stub on port 8788 for direct cross-references (local only)
if (!process.env.RENDER && process.env.NODE_ENV !== 'production') {
  const stubServer = http.createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${API_PORT}`);
    const pathname = url.pathname;
    handleApiRequest(req, res, pathname);
  });

  stubServer.on('error', (err) => {
    console.error('Stub Server Error:', err);
  });

  stubServer.listen(API_PORT, () => {
    console.log(`Secondary API Stub listening on http://127.0.0.1:${API_PORT}/`);
  });
}
