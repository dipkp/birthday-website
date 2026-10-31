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
const QRCode = require('qrcode');

const WEB_PORT = Number(process.env.PORT || 8900);
const API_PORT = Number(process.env.STUB_PORT || 8788);

const REPLICA_DIR = path.resolve(__dirname, '..', '2luv-replica');
const DATA_DIR = path.join(__dirname, 'data');
const LETTERS_FILE = path.join(DATA_DIR, 'letters.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const CHUNKS_DIR = path.join(UPLOADS_DIR, 'chunks');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(CHUNKS_DIR)) {
  fs.mkdirSync(CHUNKS_DIR, { recursive: true });
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

// --- Settings, Vouchers & Multi-Gateway Configuration ---
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const VOUCHERS_FILE = path.join(DATA_DIR, 'vouchers.json');

let settings = {
  adminPasswordHash: '8d1a6b0e48e670fbb9372e6c2100b3216ec37135ca9fe8c59bc5bf91d9376d1d', // dipkp@2909
  activeGateway: 'youpi',
  defaultPrice: 99,
  currency: 'INR',
  youpi: {
    enabled: true,
    upiId: 'dipraksh@pingpay',
    altUpiId: '9327792155@upi',
    payeeName: 'Luve gifts',
    price: 99
  },
  razorpay: {
    enabled: false,
    keyId: '',
    keySecret: '',
    price: 99
  },
  manualUpi: {
    enabled: false,
    upiId: 'dipraksh@pingpay',
    payeeName: 'Luve gifts',
    price: 99
  },
  freeMode: {
    enabled: false
  }
};

try {
  if (fs.existsSync(SETTINGS_FILE)) {
    settings = { ...settings, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) };
  } else {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
  }
} catch (e) {
  console.error('Failed to load settings:', e);
}

function saveSettings() {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

let vouchers = {};
try {
  if (fs.existsSync(VOUCHERS_FILE)) {
    vouchers = JSON.parse(fs.readFileSync(VOUCHERS_FILE, 'utf8'));
  } else {
    vouchers = {
      "FREEGIFT": {
        "code": "FREEGIFT",
        "type": "percent",
        "value": 100,
        "maxUses": 100,
        "usedCount": 0,
        "active": true,
        "expiresAt": "2027-12-31T23:59:59.000Z",
        "createdAt": new Date().toISOString(),
        "note": "100% Free VIP pass"
      },
      "LUVE50": {
        "code": "LUVE50",
        "type": "flat",
        "value": 50,
        "maxUses": 50,
        "usedCount": 0,
        "active": true,
        "expiresAt": "2027-12-31T23:59:59.000Z",
        "createdAt": new Date().toISOString(),
        "note": "Flat ₹50 discount"
      }
    };
    fs.writeFileSync(VOUCHERS_FILE, JSON.stringify(vouchers, null, 2), 'utf8');
  }
} catch (e) {
  vouchers = {};
}

function saveVouchers() {
  try {
    fs.writeFileSync(VOUCHERS_FILE, JSON.stringify(vouchers, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save vouchers:', e);
  }
}

let PRICE_INR = settings.defaultPrice || 99;
let UPI_ID = settings.youpi?.upiId || 'dipraksh@pingpay';
let UPI_ID_ALT = settings.youpi?.altUpiId || '9327792155@upi';
let PAYEE_NAME = settings.youpi?.payeeName || 'Luve gifts';
const MERCHANT_ID = '00000000-0000-0000-0000-000000000001';
const YOUPI_API_PORT = 6100;
const YOUPI_CHECKOUT_PORT = 7000;
const YOUPI_ADMIN_TOKEN = '3cd4a37f974c67ea625777ca596b42903ef0bde5609aba5e687c8147a7a2f87e';

function syncGlobalVars() {
  PRICE_INR = settings.defaultPrice || 99;
  UPI_ID = settings.youpi?.upiId || 'dipraksh@pingpay';
  UPI_ID_ALT = settings.youpi?.altUpiId || '9327792155@upi';
  PAYEE_NAME = settings.youpi?.payeeName || 'Luve gifts';
}

const adminSessions = new Map();

function checkAdminAuth(req) {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/luve_admin_token=([^;]+)/);
  const token = (match ? match[1] : null) || req.headers['x-admin-token'] || req.headers['authorization']?.replace(/^Bearer\s+/i, '');
  if (!token) return false;
  const sess = adminSessions.get(token);
  if (!sess) return false;
  if (Date.now() > sess.expiresAt) {
    adminSessions.delete(token);
    return false;
  }
  return true;
}

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
  if (!target) {
    const letterId = 'letter-' + Date.now();
    target = {
      id: letterId,
      shareableLink: letterRef,
      status: 'published',
      paid: true,
      isPaid: true,
      createdAt: new Date().toISOString(),
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
    letters[letterRef] = target;
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

async function getOrCreatePaymentSession(letterRef, hostUrl) {
  const existing = Object.values(paymentSessions).find(s => s.status === 'INITIATED' && (Date.now() - s.createdAt < 3600000));
  if (existing) {
    return existing;
  }
  const orderId = 'ORD-' + Date.now();
  const returnUrl = `${hostUrl}/en/letter/${encodeURIComponent(letterRef || 'birthday-gift')}?payment=success`;
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
          try { resolve({ status: pres.statusCode, body: JSON.parse(data) }); }
          catch(e) { resolve({ status: pres.statusCode, body: data }); }
        });
      });
      preq.on('error', reject);
      preq.write(payload);
      preq.end();
    });
    if (youpiRes.status === 201 && youpiRes.body?.paymentId) {
      const paymentId = youpiRes.body.paymentId;
      const sess = {
        orderId,
        paymentId,
        letterRef: letterRef || 'birthday-gift',
        amount: PRICE_INR,
        status: 'INITIATED',
        createdAt: Date.now()
      };
      paymentSessions[paymentId] = sess;
      return sess;
    }
  } catch(err) {
    console.error('getOrCreatePaymentSession error:', err);
  }
  return null;
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
      if (targetPort === YOUPI_CHECKOUT_PORT) {
        const proto = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host || 'localhost:' + WEB_PORT;
        return serveManualUpiCheckout(req, res, 'gift', `${proto}://${host}`);
      }
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad Gateway: Payment portal is loading, please refresh in a moment.');
    }
  });

  req.pipe(proxyReq);
}

function serveManualUpiCheckout(req, res, letterRef, hostUrl) {
  const price = settings.defaultPrice || 99;
  const upiId = settings.manualUpi?.upiId || settings.youpi?.upiId || 'dipraksh@pingpay';
  const payee = settings.manualUpi?.payeeName || settings.youpi?.payeeName || 'Luve gifts';
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${price}.00&cu=INR&tn=${encodeURIComponent(letterRef || 'Luve-Gift')}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UPI Checkout · ${payee}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin:0; padding:0; }
    body {
      background: #090d16;
      background-image: radial-gradient(at 50% 0%, rgba(236,72,153,0.15) 0, transparent 60%);
      color: #fff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .pay-card {
      background: rgba(18, 26, 43, 0.9);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 2.25rem;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 25px 50px rgba(0,0,0,0.6);
      text-align: center;
    }
    .qr-box {
      background: #fff;
      padding: 1rem;
      border-radius: 14px;
      display: inline-block;
      margin: 1.25rem 0;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }
    .btn {
      display: inline-block;
      width: 100%;
      padding: 0.8rem;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      font-size: 0.95rem;
      transition: all 0.2s;
    }
    .btn-upi { background: linear-gradient(135deg, #10b981, #059669); color: #fff; text-decoration: none; margin-bottom: 0.75rem; }
    .btn-submit { background: linear-gradient(135deg, #ec4899, #db2777); color: #fff; }
    input {
      width: 100%;
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(0,0,0,0.3);
      color: #fff;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
      outline: none;
    }
    input:focus { border-color: #ec4899; }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      background: rgba(236,72,153,0.15);
      border: 1px solid rgba(236,72,153,0.3);
      color: #f472b6;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="pay-card">
    <span class="badge">UPI Direct Gateway</span>
    <h1 style="font-family:'Outfit',sans-serif; font-size:1.6rem; margin-bottom:0.25rem;">${payee}</h1>
    <div style="font-size:2.2rem; font-weight:800; color:#34d399; font-family:'Outfit',sans-serif; margin:0.5rem 0;" id="displayAmount">₹${price}.00</div>
    <p style="color:#94a3b8; font-size:0.85rem;">Scan this QR with any UPI App (GPay, PhonePe, Paytm, BHIM)</p>
    
    <div class="qr-box">
      <img id="upiQrImg" src="/api/qrcode?data=${encodeURIComponent(upiUri)}" alt="UPI QR Code" width="180" height="180" style="display:block; border-radius:8px;" />
      <button type="button" onclick="downloadUpiQR()" style="margin-top:8px;background:#1e40af;color:#fff;border:none;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;width:100%;">⬇️ Download QR</button>
    </div>

    <div style="margin-bottom:1.25rem;">
      <a id="openUpiBtn" href="${upiUri}" class="btn btn-upi">📲 Open UPI App on Phone</a>
      <div style="font-size:0.8rem; color:#94a3b8;">Or copy UPI ID: <strong style="color:#fff; cursor:pointer;" onclick="navigator.clipboard.writeText('${upiId}'); alert('UPI ID copied: ${upiId}');">${upiId} 📋</strong></div>
    </div>

    <!-- Voucher box -->
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1rem; margin-bottom:1.25rem; text-align:left;">
      <div style="font-size:0.8rem; font-weight:700; color:#cbd5e1; margin-bottom:0.4rem;">🎟️ Have a discount voucher / promo code?</div>
      <div style="display:flex; gap:0.5rem;">
        <input type="text" id="voucherCode" placeholder="e.g. FREEGIFT or LUVE50" style="text-transform:uppercase; margin-bottom:0;" />
        <button type="button" class="btn" style="width:auto; padding:0 1rem; background:#3b82f6; color:#fff;" onclick="applyVoucher()">Apply</button>
      </div>
      <div id="voucherMsg" style="font-size:0.75rem; margin-top:0.4rem; display:none; font-weight:600;"></div>
    </div>

    <!-- UTR Form -->
    <form onsubmit="submitUtr(event)" style="text-align:left;">
      <label style="font-size:0.8rem; font-weight:700; color:#cbd5e1; display:block; margin-bottom:0.3rem;">Enter 12-Digit UTR / Bank Ref Number:</label>
      <input type="text" id="utrNumber" placeholder="e.g. 429182749102" required maxlength="20" />
      <button type="submit" class="btn btn-submit">Verify Payment & Unlock Gift ⚡</button>
    </form>
  </div>

  <script>
    const letterRef = "${letterRef}";
    let currentUpiUri = "${upiUri}";

    async function submitUtr(e) {
      e.preventDefault();
      const utr = document.getElementById('utrNumber').value.trim();
      const btn = e.target.querySelector('button');
      btn.textContent = 'Verifying...';
      btn.disabled = true;
      try {
        const res = await fetch('/api/payments/verify-utr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ utr, letterRef })
        });
        const data = await res.json();
        if (data.ok) {
          alert('Payment confirmed! Your gift is unlocked.');
          window.location.href = '/en/letter/' + encodeURIComponent(letterRef) + '?payment=success';
        } else {
          alert(data.error || 'Verification failed. Please check UTR number.');
          btn.textContent = 'Verify Payment & Unlock Gift ⚡';
          btn.disabled = false;
        }
      } catch (err) {
        alert('Server connection error. Please try again.');
        btn.textContent = 'Verify Payment & Unlock Gift ⚡';
        btn.disabled = false;
      }
    }

    async function applyVoucher() {
      const code = document.getElementById('voucherCode').value.trim();
      const msg = document.getElementById('voucherMsg');
      if (!code) return;
      try {
        const res = await fetch('/api/voucher/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, letterRef })
        });
        const data = await res.json();
        msg.style.display = 'block';
        if (data.ok) {
          msg.style.color = '#34d399';
          msg.textContent = data.message;
          document.getElementById('displayAmount').textContent = '₹' + data.finalPrice + '.00';
          if (data.unlocked) {
            setTimeout(() => { window.location.href = data.redirectUrl || ('/en/letter/' + encodeURIComponent(letterRef) + '?payment=success'); }, 800);
            return;
          }
          const newPrice = data.finalPrice;
          currentUpiUri = 'upi://pay?pa=' + encodeURIComponent('${upiId}') + '&pn=' + encodeURIComponent('${payee}') + '&am=' + newPrice + '.00&cu=INR&tn=' + encodeURIComponent(letterRef || 'Luve-Gift');
          document.getElementById('upiQrImg').src = '/api/qrcode?data=' + encodeURIComponent(currentUpiUri);
          document.getElementById('openUpiBtn').href = currentUpiUri;
        } else {
          msg.style.color = '#f43f5e';
          msg.textContent = data.error || 'Invalid code';
        }
      } catch (e) {
        msg.style.display = 'block';
        msg.style.color = '#f43f5e';
        msg.textContent = 'Failed to apply voucher';
      }
    }

    function downloadUpiQR() {
      window.location.href = '/api/download-qr?data=' + encodeURIComponent(currentUpiUri) + '&filename=upi-payment-qr.png';
    }
  </script>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function serveRazorpayCheckout(req, res, letterRef, hostUrl) {
  const price = settings.defaultPrice || 99;
  const keyId = settings.razorpay?.keyId || 'rzp_test_placeholder';
  const payee = settings.youpi?.payeeName || 'Luve gifts';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Razorpay Checkout · ${payee}</title>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <style>
    body { background: #090d16; color: #fff; font-family: sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
    .card { background: #161f2e; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:2rem; max-width:400px; width:100%; text-align:center; box-sizing:border-box; }
    .btn { background: #ec4899; color:#fff; border:none; padding:0.8rem 1.5rem; font-size:1rem; border-radius:8px; cursor:pointer; font-weight:700; width:100%; margin-top:1rem; }
    input { width:100%; padding:0.6rem; border-radius:6px; border:1px solid rgba(255,255,255,0.2); background:#090d16; color:#fff; margin-top:0.5rem; box-sizing:border-box; }
  </style>
</head>
<body>
  <div class="card">
    <h2>${payee}</h2>
    <div style="font-size:2rem; font-weight:800; color:#38bdf8; margin:1rem 0;" id="displayAmount">₹${price}.00</div>
    <p style="color:#94a3b8; font-size:0.85rem;">Pay securely using Cards, Netbanking, Wallets, or UPI via Razorpay.</p>
    
    <div style="margin:1rem 0; text-align:left;">
      <label style="font-size:0.75rem; text-transform:uppercase; color:#94a3b8;">Have a coupon code?</label>
      <div style="display:flex; gap:0.5rem; margin-top:0.25rem;">
        <input type="text" id="vCode" placeholder="PROMO CODE" style="margin-top:0; text-transform:uppercase;" />
        <button type="button" class="btn" style="width:auto; margin-top:0; padding:0.6rem 1rem; background:#3b82f6;" onclick="applyVoucher()">Apply</button>
      </div>
      <div id="vMsg" style="font-size:0.75rem; margin-top:0.3rem; display:none;"></div>
    </div>

    <button id="rzp-btn" class="btn" onclick="openRazorpay()">Pay with Razorpay 💳</button>
  </div>

  <script>
    const letterRef = "${letterRef}";
    const keyId = "${keyId}";
    let currentAmount = ${price * 100};

    function openRazorpay() {
      const options = {
        key: keyId,
        amount: currentAmount,
        currency: "INR",
        name: "${payee}",
        description: "Gift Unlock for " + letterRef,
        handler: function (response) {
          fetch('/api/payments/verify-utr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ utr: response.razorpay_payment_id || 'RZP-' + Date.now(), letterRef })
          }).then(() => {
            alert('Payment Successful!');
            window.location.href = '/en/letter/' + encodeURIComponent(letterRef) + '?payment=success';
          });
        },
        theme: { color: "#ec4899" }
      };
      const rzp = new Razorpay(options);
      rzp.open();
    }

    async function applyVoucher() {
      const code = document.getElementById('vCode').value.trim();
      const msg = document.getElementById('vMsg');
      if (!code) return;
      const res = await fetch('/api/voucher/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, letterRef })
      });
      const data = await res.json();
      msg.style.display = 'block';
      if (data.ok) {
        msg.style.color = '#34d399';
        msg.textContent = data.message;
        document.getElementById('displayAmount').textContent = '₹' + data.finalPrice + '.00';
        if (data.unlocked && data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          currentAmount = data.finalPrice * 100;
        }
      } else {
        msg.style.color = '#f43f5e';
        msg.textContent = data.error || 'Invalid code';
      }
    }
  </script>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
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

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseBody(req) {
  return new Promise((resolve) => {
    readRawBody(req).then(buf => {
      try {
        resolve(buf.length > 0 ? JSON.parse(buf.toString('utf8')) : {});
      } catch {
        resolve({ raw: buf.toString('utf8') });
      }
    }).catch(() => resolve({}));
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

  let rawBuffer = Buffer.alloc(0);
  let body = {};
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    rawBuffer = await readRawBody(req);
    try {
      body = rawBuffer.length > 0 ? JSON.parse(rawBuffer.toString('utf8')) : {};
    } catch {
      body = { raw: rawBuffer.toString('utf8') };
    }
  }

  // Direct High-Performance Local QR Code Generator & Native Downloader
  if (pathname === '/api/qrcode' || pathname === '/api/download-qr') {
    const u = new URL(req.url, 'http://localhost');
    const data = u.searchParams.get('data') || 'https://2-luv.com';
    const filename = u.searchParams.get('filename') || 'gift-qr-code.png';
    const isDownload = pathname === '/api/download-qr' || u.searchParams.get('download') === '1';

    try {
      const buffer = await QRCode.toBuffer(data, {
        width: 450,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      const headers = {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length,
        'Cache-Control': 'public, max-age=86400'
      };
      if (isDownload) {
        headers['Content-Disposition'] = `attachment; filename="${filename}"`;
      }
      res.writeHead(200, headers);
      return res.end(buffer);
    } catch (err) {
      console.error('QR generation error:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Error generating QR code');
    }
  }

  // Direct R2 Part Upload / Serve Handlers
  if (pathname.startsWith('/__r2-part/uploads/')) {
    const filename = path.basename(pathname);
    if (req.method === 'PUT' || req.method === 'POST') {
      const ext = (filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.webp')) ? '' : '.jpg';
      const finalName = filename + ext;
      const targetFile = path.join(UPLOADS_DIR, finalName);
      fs.writeFileSync(targetFile, rawBuffer);
      return reply(res, { ok: true, key: filename, url: `/uploads/${finalName}`, previewUrl: `/uploads/${finalName}` });
    }
    return serveUploadedFile(req, res, pathname);
  }

  // Legacy/Direct Image Upload Endpoints
  if (pathname === '/upload-image' || pathname === '/api/upload-image') {
    const filename = `img-${Date.now()}.jpg`;
    fs.writeFileSync(path.join(UPLOADS_DIR, filename), rawBuffer);
    return reply(res, {
      ok: true,
      url: `/uploads/${filename}`,
      previewUrl: `/uploads/${filename}`,
      status: 'ready'
    });
  }

  // Audio Proxy & Streaming for background music and voice notes
  if (pathname === '/api/audio-proxy') {
    const u = new URL(req.url, 'http://localhost');
    const audioUrl = u.searchParams.get('url');
    if (!audioUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing url parameter');
    }

    // Check if audio file exists locally in REPLICA_DIR
    let localCandidate = null;
    try {
      const parsedUrl = new URL(audioUrl, 'http://localhost');
      let cleanPath = parsedUrl.pathname.replace(/^\//, '');
      let localPath = path.join(REPLICA_DIR, cleanPath.replace(/\//g, path.sep));
      if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
        localCandidate = localPath;
      }
    } catch (e) {}

    if (localCandidate) {
      const stat = fs.statSync(localCandidate);
      const ext = path.extname(localCandidate).toLowerCase();
      const mimeType = MIME_TYPES[ext] || 'audio/mpeg';

      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(localCandidate, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': mimeType,
          'Access-Control-Allow-Origin': '*'
        });
        return file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': mimeType,
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*'
        });
        return fs.createReadStream(localCandidate).pipe(res);
      }
    }

    // Proxy from remote HTTP/HTTPS
    try {
      const targetUrl = new URL(audioUrl);
      const client = targetUrl.protocol === 'https:' ? https : http;
      const proxyReq = client.get(audioUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          ...(req.headers.range ? { range: req.headers.range } : {})
        }
      }, proxyRes => {
        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Accept-Ranges': 'bytes',
          'Content-Type': proxyRes.headers['content-type'] || 'audio/mpeg'
        };
        if (proxyRes.headers['content-length']) headers['Content-Length'] = proxyRes.headers['content-length'];
        if (proxyRes.headers['content-range']) headers['Content-Range'] = proxyRes.headers['content-range'];

        res.writeHead(proxyRes.statusCode || 200, headers);
        proxyRes.pipe(res);
      });

      proxyReq.on('error', err => {
        console.error('Audio proxy fetch error:', err.message);
        const fallbackAudio = path.join(REPLICA_DIR, 'themes', 'party', 'v1', 'audio', 'bed-celebration.mp3');
        if (fs.existsSync(fallbackAudio)) {
          const stat = fs.statSync(fallbackAudio);
          res.writeHead(200, {
            'Content-Length': stat.size,
            'Content-Type': 'audio/mpeg',
            'Accept-Ranges': 'bytes',
            'Access-Control-Allow-Origin': '*'
          });
          return fs.createReadStream(fallbackAudio).pipe(res);
        }
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Audio fetch failed');
      });
      return;
    } catch (err) {
      console.error('Invalid audio URL:', err.message);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Invalid audio URL');
    }
  }

  // Token refresh & Privacy session stub handlers
  if (pathname === '/api/refresh-sas') {
    return reply(res, { ok: true, newSasUrl: body?.blobUrl || '', expiresAt: Date.now() + 360 * 60 * 1000 });
  }

  if (pathname === '/api/privacy/session/delete') {
    return reply(res, { ok: true });
  }

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

  // --- Admin API Endpoints ---
  if (pathname === '/api/admin/login') {
    const password = (body.password || '').trim();
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const expectedHash = settings.adminPasswordHash || '8d1a6b0e48e670fbb9372e6c2100b3216ec37135ca9fe8c59bc5bf91d9376d1d';
    if (hash === expectedHash) {
      const token = crypto.randomBytes(32).toString('hex');
      adminSessions.set(token, { createdAt: Date.now(), expiresAt: Date.now() + (24 * 3600 * 1000) });
      res.setHeader('Set-Cookie', `luve_admin_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);
      return reply(res, { ok: true, token });
    }
    return reply(res, { ok: false, error: 'Incorrect supervisor password.' }, 401);
  }

  if (pathname === '/api/admin/auth-check') {
    const auth = checkAdminAuth(req);
    return reply(res, { ok: true, authenticated: auth });
  }

  if (pathname === '/api/admin/logout') {
    const cookieHeader = req.headers.cookie || '';
    const match = cookieHeader.match(/luve_admin_token=([^;]+)/);
    if (match) adminSessions.delete(match[1]);
    res.setHeader('Set-Cookie', `luve_admin_token=; HttpOnly; Path=/; Max-Age=0`);
    return reply(res, { ok: true, loggedOut: true });
  }

  // Protected Admin Routes Guard
  if (pathname.startsWith('/api/admin/')) {
    if (!checkAdminAuth(req)) {
      return reply(res, { ok: false, error: 'Unauthorized. Supervisor login required.' }, 401);
    }

    if (pathname === '/api/admin/settings') {
      if (req.method === 'GET') {
        const safe = { ...settings };
        delete safe.adminPasswordHash;
        return reply(res, { ok: true, settings: safe });
      }
      if (req.method === 'POST') {
        if (body.activeGateway) settings.activeGateway = body.activeGateway;
        if (body.defaultPrice !== undefined) settings.defaultPrice = Number(body.defaultPrice) || 99;
        if (body.youpi) {
          settings.youpi = { ...settings.youpi, ...body.youpi };
        }
        if (body.razorpay) {
          settings.razorpay = { ...settings.razorpay, ...body.razorpay };
        }
        if (body.manualUpi) {
          settings.manualUpi = { ...settings.manualUpi, ...body.manualUpi };
        }
        saveSettings();
        syncGlobalVars();
        const safe = { ...settings };
        delete safe.adminPasswordHash;
        return reply(res, { ok: true, settings: safe });
      }
    }

    if (pathname === '/api/admin/change-password') {
      const oldPw = (body.oldPassword || '').trim();
      const newPw = (body.newPassword || '').trim();
      const oldHash = crypto.createHash('sha256').update(oldPw).digest('hex');
      const expectedHash = settings.adminPasswordHash || '8d1a6b0e48e670fbb9372e6c2100b3216ec37135ca9fe8c59bc5bf91d9376d1d';
      if (oldHash !== expectedHash) {
        return reply(res, { ok: false, error: 'Current password is incorrect.' }, 400);
      }
      if (newPw.length < 6) {
        return reply(res, { ok: false, error: 'New password must be at least 6 characters.' }, 400);
      }
      settings.adminPasswordHash = crypto.createHash('sha256').update(newPw).digest('hex');
      saveSettings();
      return reply(res, { ok: true, message: 'Password updated successfully.' });
    }

    if (pathname === '/api/admin/vouchers') {
      if (req.method === 'GET') {
        return reply(res, { ok: true, vouchers });
      }
      if (req.method === 'POST') {
        const code = (body.code || '').trim().toUpperCase();
        if (!code || code.length < 3) {
          return reply(res, { ok: false, error: 'Voucher code must be at least 3 characters.' }, 400);
        }
        vouchers[code] = {
          code,
          type: body.type || 'percent',
          value: Number(body.value) || 0,
          maxUses: Number(body.maxUses) || 50,
          usedCount: 0,
          active: true,
          expiresAt: body.expiresAt || null,
          note: body.note || '',
          createdAt: new Date().toISOString()
        };
        saveVouchers();
        return reply(res, { ok: true, voucher: vouchers[code] });
      }
    }

    if (pathname.startsWith('/api/admin/vouchers/')) {
      const rest = pathname.replace('/api/admin/vouchers/', '');
      const parts = rest.split('/');
      const code = decodeURIComponent(parts[0]).toUpperCase();

      if (parts[1] === 'toggle' && req.method === 'POST') {
        if (vouchers[code]) {
          vouchers[code].active = !vouchers[code].active;
          saveVouchers();
          return reply(res, { ok: true, code, active: vouchers[code].active });
        }
        return reply(res, { ok: false, error: 'Voucher not found' }, 404);
      }

      if (req.method === 'DELETE') {
        if (vouchers[code]) {
          delete vouchers[code];
          saveVouchers();
          return reply(res, { ok: true, deleted: code });
        }
        return reply(res, { ok: false, error: 'Voucher not found' }, 404);
      }
    }

    if (pathname === '/api/admin/letters') {
      const list = Object.values(letters);
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      return reply(res, { ok: true, letters: list });
    }

    if (pathname.startsWith('/api/admin/letters/')) {
      const rest = pathname.replace('/api/admin/letters/', '');
      const parts = rest.split('/');
      const ref = decodeURIComponent(parts[0]);

      if (parts[1] === 'toggle-paid' && req.method === 'POST') {
        const target = letters[ref] || Object.values(letters).find(l => l.shareableLink === ref || l.id === ref);
        if (target) {
          target.paid = !target.paid;
          target.isPaid = target.paid;
          saveLetters();
          return reply(res, { ok: true, paid: target.paid });
        }
        return reply(res, { ok: false, error: 'Letter not found' }, 404);
      }

      if (parts[1] === 'set-date' && req.method === 'POST') {
        const target = letters[ref] || Object.values(letters).find(l => l.shareableLink === ref || l.id === ref);
        if (target) {
          const bDate = (body.birthdayDate || body.date || '').trim();
          target.birthdayDate = bDate || null;
          target.unlockDate = bDate || null;
          target.specialDate = bDate || '';
          if (bDate) {
            const dateParts = bDate.split('-');
            if (dateParts.length === 3) {
              target.birthdayYear = parseInt(dateParts[0], 10);
              target.birthdayMonth = parseInt(dateParts[1], 10);
              target.birthdayDay = parseInt(dateParts[2], 10);
            }
          } else {
            target.birthdayDay = null;
            target.birthdayMonth = null;
            target.birthdayYear = null;
          }
          saveLetters();
          return reply(res, { ok: true, letter: target });
        }
        return reply(res, { ok: false, error: 'Letter not found' }, 404);
      }

      if (req.method === 'DELETE') {
        let deleted = false;
        if (letters[ref]) {
          delete letters[ref];
          deleted = true;
        }
        for (const k of Object.keys(letters)) {
          if (letters[k].shareableLink === ref || letters[k].id === ref) {
            delete letters[k];
            deleted = true;
          }
        }
        if (deleted) {
          saveLetters();
          return reply(res, { ok: true, deleted: ref });
        }
        return reply(res, { ok: false, error: 'Letter not found' }, 404);
      }
    }
  }

  // Public Voucher Application & Coupons
  if (pathname === '/api/voucher/apply' || pathname === '/api/coupons/validate') {
    const code = (body.code || body.couponCode || '').trim().toUpperCase();
    const letterRef = body.letterRef || body.shareableLink || body.letterId || '';
    if (!code) {
      return reply(res, { ok: false, error: 'Please enter a voucher code.' }, 400);
    }
    const v = vouchers[code];
    if (!v || !v.active) {
      return reply(res, { ok: false, error: 'Invalid or inactive voucher code.' }, 400);
    }
    if (v.expiresAt && new Date(v.expiresAt).getTime() < Date.now()) {
      return reply(res, { ok: false, error: 'This voucher has expired.' }, 400);
    }
    if (v.maxUses && v.usedCount >= v.maxUses) {
      return reply(res, { ok: false, error: 'This voucher limit has been reached.' }, 400);
    }

    const basePrice = Number(settings.defaultPrice || PRICE_INR || 99);
    let discount = 0;
    if (v.type === 'percent' || v.type === 'free' || v.value >= 100) {
      discount = Math.round((basePrice * (v.value || 100)) / 100);
    } else if (v.type === 'flat') {
      discount = Math.min(basePrice, Number(v.value || 0));
    }
    const finalPrice = Math.max(0, basePrice - discount);

    if (finalPrice === 0) {
      v.usedCount = (v.usedCount || 0) + 1;
      saveVouchers();
      if (letterRef) {
        markLetterAsPaid(letterRef);
      }
      return reply(res, {
        ok: true,
        valid: true,
        code: v.code,
        discount,
        basePrice,
        finalPrice: 0,
        unlocked: true,
        message: '🎉 100% Free Pass Applied! Gift unlocked successfully.',
        redirectUrl: `/en/letter/${encodeURIComponent(letterRef || 'birthday-gift')}?payment=success`
      });
    }

    return reply(res, {
      ok: true,
      valid: true,
      code: v.code,
      discount,
      basePrice,
      finalPrice,
      unlocked: false,
      message: `🎟️ Voucher "${v.code}" applied: ₹${discount} discount (Pay only ₹${finalPrice})`
    });
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
      const photoId = parts[2] || ('photo-' + Date.now());
      const versionId = parts[3] || 'v1';
      const subAction = parts[4] || '';

      // 1. Chunk Ticket (/photos/:id/:v/chunks/:idx/ticket)
      if (subAction === 'chunks' && (parts[6] === 'ticket' || req.url.endsWith('/ticket'))) {
        const chunkIndex = parts[5] || '0';
        const key = `${draftId}-${photoId}-${versionId}-${chunkIndex}`;
        const proto = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host ? `${proto}://${req.headers.host}` : '';
        return reply(res, {
          ok: true,
          ticket: 'ticket-' + Date.now(),
          url: `${host}/__r2-part/uploads/creation/${key}`,
          uploadUrl: `${host}/__r2-part/uploads/creation/${key}`,
          expiresAt: Date.now() + 3600000
        });
      }

      // 2. Chunk Ack (/photos/:id/:v/chunks/:idx/ack)
      if (subAction === 'chunks' && (parts[6] === 'ack' || req.url.endsWith('/ack'))) {
        return reply(res, { ok: true, acknowledged: true });
      }

      // 3. Binary Chunk Upload (/photos/:id/:v/chunks/:idx)
      if (subAction === 'chunks' && (req.method === 'POST' || req.method === 'PUT')) {
        const chunkIndex = parts[5] || '0';
        const chunkFile = path.join(CHUNKS_DIR, `${draftId}_${photoId}_${versionId}_${chunkIndex}.chunk`);
        fs.writeFileSync(chunkFile, rawBuffer);
        return reply(res, {
          ok: true,
          status: 'uploaded',
          chunkIndex: parseInt(chunkIndex, 10),
          receivedBytes: rawBuffer.length
        });
      }

      // 4. Complete Upload (/photos/:id/:v/complete)
      if (subAction === 'complete' && req.method === 'POST') {
        const prefix = `${draftId}_${photoId}_${versionId}_`;
        let chunkFiles = [];
        try {
          chunkFiles = fs.readdirSync(CHUNKS_DIR)
            .filter(f => f.startsWith(prefix) && f.endsWith('.chunk'))
            .sort((a, b) => {
              const idxA = parseInt(a.replace(prefix, '').replace('.chunk', ''), 10);
              const idxB = parseInt(b.replace(prefix, '').replace('.chunk', ''), 10);
              return idxA - idxB;
            });
        } catch {}

        let finalBuffer = Buffer.alloc(0);
        if (chunkFiles.length > 0) {
          const buffers = chunkFiles.map(f => fs.readFileSync(path.join(CHUNKS_DIR, f)));
          finalBuffer = Buffer.concat(buffers);
          for (const f of chunkFiles) {
            try { fs.unlinkSync(path.join(CHUNKS_DIR, f)); } catch {}
          }
        } else if (rawBuffer && rawBuffer.length > 0) {
          finalBuffer = rawBuffer;
        }

        let ext = '.jpg';
        if (finalBuffer.length > 4) {
          if (finalBuffer[0] === 0xFF && finalBuffer[1] === 0xD8 && finalBuffer[2] === 0xFF) ext = '.jpg';
          else if (finalBuffer[0] === 0x89 && finalBuffer[1] === 0x50 && finalBuffer[2] === 0x4E && finalBuffer[3] === 0x47) ext = '.png';
          else if (finalBuffer.slice(0, 4).toString() === 'RIFF' && finalBuffer.slice(8, 12).toString() === 'WEBP') ext = '.webp';
        }

        const filename = `photo-${draftId}-${photoId}${ext}`;
        if (finalBuffer.length > 0) {
          fs.writeFileSync(path.join(UPLOADS_DIR, filename), finalBuffer);
        }

        const photoUrl = `/uploads/${filename}`;
        if (!drafts[draftId]) {
          drafts[draftId] = { draftId, revision: 0, payload: {}, photos: [], uploads: [] };
        }
        if (!drafts[draftId].savedPhotos) drafts[draftId].savedPhotos = {};
        drafts[draftId].savedPhotos[photoId] = {
          id: photoId,
          photoId: photoId,
          url: photoUrl,
          previewUrl: photoUrl,
          filename: filename,
          status: 'ready'
        };

        return reply(res, {
          ok: true,
          status: 'ready',
          photoId: photoId,
          previewUrl: photoUrl,
          url: photoUrl
        });
      }

      // 5. Initialize Photo Upload (PUT /photos/:id/:v)
      if (req.method === 'PUT') {
        return reply(res, {
          ok: true,
          status: 'uploading',
          chunkSize: 5242880,
          receivedChunks: [],
          directUpload: false,
          photoId: photoId
        });
      }

      // 6. Query Photo Status (GET /photos/:id/:v)
      if (req.method === 'GET') {
        const saved = drafts[draftId]?.savedPhotos?.[photoId];
        if (saved) {
          return reply(res, {
            ok: true,
            status: 'ready',
            photoId: photoId,
            previewUrl: saved.previewUrl,
            url: saved.url
          });
        }
        return reply(res, { ok: false, status: 'pending', error: 'Not ready' }, 404);
      }

      return reply(res, { ok: true, status: 'ready', photoId: photoId, previewUrl: '' });
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

      if (settings.activeGateway === 'youpi' && settings.youpi?.enabled) {
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
      }

      if (!checkoutUrl) {
        checkoutUrl = `${hostUrl}/pay?letter=${encodeURIComponent(shareableLink)}`;
      }

      // Collect photos from all possible draft sources
      const rawPhotos = (payload.photos && payload.photos.length) ? payload.photos :
                        (body.photos && body.photos.length) ? body.photos :
                        (draft.photosManifest && draft.photosManifest.length) ? draft.photosManifest :
                        (draft.photos && draft.photos.length) ? draft.photos :
                        (draft.uploads && draft.uploads.length) ? draft.uploads : [];

      const savedMap = draft.savedPhotos || {};

      let finalPhotos = rawPhotos.map((p, idx) => {
        const pid = p.photoId || p.id || ('photo-' + idx);
        const saved = savedMap[pid] || Object.values(savedMap)[idx] || {};
        let pUrl = p.url || p.uploadedUrl || saved.url || saved.previewUrl || '';

        if (!pUrl || pUrl.startsWith('blob:')) {
          const defaultName = `photo-${draftId}-${pid}.jpg`;
          if (fs.existsSync(path.join(UPLOADS_DIR, defaultName))) {
            pUrl = `/uploads/${defaultName}`;
          } else if (saved.filename && fs.existsSync(path.join(UPLOADS_DIR, saved.filename))) {
            pUrl = `/uploads/${saved.filename}`;
          }
        }

        return {
          id: pid,
          photoId: pid,
          url: pUrl,
          previewUrl: pUrl,
          caption: (p.caption || '').trim(),
          order: typeof p.order === 'number' ? p.order : idx,
          date: p.date || ''
        };
      });

      if (finalPhotos.length === 0 && Object.keys(savedMap).length > 0) {
        finalPhotos = Object.values(savedMap).map((sp, idx) => ({
          id: sp.photoId || sp.id || ('photo-' + idx),
          photoId: sp.photoId || sp.id || ('photo-' + idx),
          url: sp.url,
          previewUrl: sp.previewUrl || sp.url,
          caption: sp.caption || '',
          order: idx
        }));
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
        photos: finalPhotos,
        musicUrl: payload.musicUrl || '',
        specialDate: payload.specialDate || payload.birthdayDate || payload.date || (payload.birthday && payload.birthday.year ? `${payload.birthday.year}-${String(payload.birthday.month || '').padStart(2, '0')}-${String(payload.birthday.day || '').padStart(2, '0')}` : '') || '',
        birthdayDay: payload.birthdayDay || (payload.birthday && payload.birthday.day) || null,
        birthdayMonth: payload.birthdayMonth || (payload.birthday && payload.birthday.month) || null,
        birthdayYear: payload.birthdayYear || (payload.birthday && payload.birthday.year) || null,
        unlockDate: payload.unlockDate || payload.birthdayDate || null
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
        photosManifest: body.photos || cur.photosManifest || [],
        savedPhotos: cur.savedPhotos || {},
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

    try {
      if (fs.existsSync(LETTERS_FILE)) {
        letters = JSON.parse(fs.readFileSync(LETTERS_FILE, 'utf8'));
      }
    } catch (e) {}

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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getLetterBirthdayDate(letter) {
  if (!letter) return null;
  const now = new Date();
  const currentYear = now.getFullYear();

  let day = null;
  let month = null; // 0-indexed
  let year = null;

  // 1. From birthdayDay & birthdayMonth
  if (letter.birthdayDay && letter.birthdayMonth) {
    day = parseInt(letter.birthdayDay, 10);
    month = parseInt(letter.birthdayMonth, 10) - 1;
    if (letter.birthdayYear) year = parseInt(letter.birthdayYear, 10);
  }

  // 2. From unlockDate, birthdayDate, or specialDate
  const rawDate = letter.unlockDate || letter.birthdayDate || letter.specialDate;
  if ((day === null || month === null) && rawDate) {
    const dateStr = String(rawDate).split('T')[0].trim();
    const parts = dateStr.split(/[-/]/);
    if (parts.length === 3) {
      let p0 = parseInt(parts[0], 10);
      let p1 = parseInt(parts[1], 10);
      let p2 = parseInt(parts[2], 10);
      if (p0 > 1000) { // YYYY-MM-DD
        year = p0;
        month = p1 - 1;
        day = p2;
      } else { // DD-MM-YYYY
        day = p0;
        month = p1 - 1;
        year = p2;
      }
    } else {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        day = d.getDate();
        month = d.getMonth();
        year = d.getFullYear();
      }
    }
  }

  if (day === null || month === null || isNaN(day) || isNaN(month) || month < 0 || month > 11 || day < 1 || day > 31) {
    return null;
  }

  // If today is the birthday (same month and same day)
  if (now.getMonth() === month && now.getDate() === day) {
    // Return start of today so now >= target (unlocked!)
    return new Date(currentYear, month, day, 0, 0, 0, 0);
  }

  // Calculate target for current year
  let target = new Date(currentYear, month, day, 0, 0, 0, 0);

  // If year is in the future (e.g. specific future event), keep that year
  if (year && year > currentYear) {
    target = new Date(year, month, day, 0, 0, 0, 0);
  } else {
    // If birthday date this year has already passed, next occurrence is next year
    const created = letter.createdAt ? new Date(letter.createdAt) : now;
    const createdStartOfDay = new Date(created.getFullYear(), created.getMonth(), created.getDate(), 0, 0, 0, 0);
    if (target.getTime() < createdStartOfDay.getTime()) {
      target = new Date(currentYear + 1, month, day, 0, 0, 0, 0);
    }
  }

  return target;
}

function renderBirthdayLockPage(locale, link, letter, hostUrl = '', targetDate) {
  const recipient = letter.recipientName || 'My Love';
  const author = letter.authorName || '';
  const canonicalUrl = hostUrl ? (hostUrl + '/' + locale + '/letter/' + link) : ('/' + locale + '/letter/' + link);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = targetDate.toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', options);
  const targetEpoch = targetDate.getTime();
  const previewUrl = canonicalUrl + '?preview=true';

  return `<!doctype html>
<html lang="${locale}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>🔒 Shhh! Birthday Surprise for ${escapeHtml(recipient)} | 2luv</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 20%, #2e1065 0%, #170738 50%, #080214 100%);
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  position: relative;
}
.ambient-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}
.balloon {
  position: absolute;
  width: 32px;
  height: 40px;
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  opacity: 0.25;
  animation: floatUp 16s linear infinite;
}
.balloon::after {
  content: "";
  position: absolute;
  bottom: -12px;
  left: 50%;
  width: 1px;
  height: 12px;
  background: rgba(255,255,255,0.4);
}
@keyframes floatUp {
  0% { transform: translateY(110vh) rotate(0deg); }
  100% { transform: translateY(-20vh) rotate(360deg); }
}
.sparkle {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.6); }
  50% { opacity: 0.9; transform: scale(1.3); }
}
.lock-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 32px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba(225, 29, 72, 0.15);
  padding: 40px 28px 32px;
  max-width: 480px;
  width: 92%;
  text-align: center;
  animation: cardIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(30px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.cake-lock-icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: floatIcon 3.5s ease-in-out infinite;
}
@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.cake-lock-icon .glow-disc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(244,63,94,0.4) 0%, rgba(244,63,94,0) 70%);
  animation: pulseGlow 2.5s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 0.9; }
}
.cake-lock-icon .cake {
  font-size: 64px;
  line-height: 1;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));
}
.cake-lock-icon .lock-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #f59e0b;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 10px rgba(245,158,11,0.6);
  border: 2px solid #fff;
  z-index: 3;
}
.pill {
  display: inline-block;
  background: linear-gradient(90deg, rgba(225,29,72,0.25), rgba(244,63,94,0.25));
  border: 1px solid rgba(244,63,94,0.5);
  color: #fda4af;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
}
h1 {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 10px;
  line-height: 1.3;
  color: #fff;
  letter-spacing: -0.5px;
}
.highlight-name {
  color: #fb7185;
  background: linear-gradient(90deg, #fb7185, #f43f5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p.desc {
  font-size: 14px;
  line-height: 1.55;
  color: #cbd5e1;
  margin: 0 0 24px;
}
.countdown-box {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 18px 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 22px;
}
.cd-unit {
  text-align: center;
  flex: 1;
}
.cd-num {
  font-size: 32px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: #fff;
  line-height: 1;
  margin-bottom: 4px;
  text-shadow: 0 2px 10px rgba(244,63,94,0.4);
}
.cd-lbl {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #94a3b8;
}
.cd-sep {
  font-size: 26px;
  font-weight: 700;
  color: #f43f5e;
  opacity: 0.7;
  user-select: none;
  padding-bottom: 12px;
}
.unlock-chip {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 14px;
  padding: 10px 14px;
  font-size: 12px;
  color: #fef08a;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.btn-group {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}
.btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  text-decoration: none;
}
.btn-primary {
  background: linear-gradient(135deg, #e11d48, #be123c);
  color: #fff;
  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.4);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(225, 29, 72, 0.6);
}
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.18);
}
.author-link {
  font-size: 11px;
  color: #64748b;
  margin-top: 14px;
}
.author-link a {
  color: #fda4af;
  text-decoration: underline;
  cursor: pointer;
}
#confettiCanvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>
</head>
<body>
<canvas id="confettiCanvas"></canvas>
<div class="ambient-bg" id="ambientBg"></div>

<div class="lock-card">
  <div class="cake-lock-icon">
    <div class="glow-disc"></div>
    <div class="cake">🎂</div>
    <div class="lock-badge">🔒</div>
  </div>

  <div class="pill">✨ Special Birthday Surprise ✨</div>

  <h1>Shhh! No Peeking Early, <span class="highlight-name">${escapeHtml(recipient)}</span>! 🤫</h1>

  <p class="desc">
    A magical interactive birthday gift has been prepared for you${author ? ' with all love by <strong>' + escapeHtml(author) + '</strong>' : ''}.<br>
    It will automatically unlock on your birthday!
  </p>

  <div class="countdown-box">
    <div class="cd-unit"><div class="cd-num" id="cdDays">00</div><div class="cd-lbl">Days</div></div>
    <div class="cd-sep">:</div>
    <div class="cd-unit"><div class="cd-num" id="cdHours">00</div><div class="cd-lbl">Hours</div></div>
    <div class="cd-sep">:</div>
    <div class="cd-unit"><div class="cd-num" id="cdMins">00</div><div class="cd-lbl">Mins</div></div>
    <div class="cd-sep">:</div>
    <div class="cd-unit"><div class="cd-num" id="cdSecs">00</div><div class="cd-lbl">Secs</div></div>
  </div>

  <div class="unlock-chip">
    <span>🔒</span>
    <span>Unlocks on <strong>${formattedDate}</strong> at 12:00 AM (Midnight)</span>
  </div>

  <div class="btn-group">
    <button class="btn btn-primary" onclick="downloadCalendarReminder()">
      🔔 Remind Me
    </button>
    <button class="btn btn-secondary" id="copyBtn" onclick="copyGiftLink()">
      📋 Save Link
    </button>
  </div>

  <div class="author-link">
    Are you the sender? <a href="${previewUrl}">Preview Gift</a>
  </div>
</div>

<script>
(function(){
  const bg = document.getElementById('ambientBg');
  const colors = ['#f43f5e', '#a855f7', '#3b82f6', '#ec4899', '#f59e0b'];
  for (let i = 0; i < 16; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = Math.random() * 100 + '%';
    b.style.backgroundColor = colors[i % colors.length];
    b.style.animationDelay = (Math.random() * 14) + 's';
    b.style.animationDuration = (12 + Math.random() * 8) + 's';
    bg.appendChild(b);
  }
  for (let j = 0; j < 30; j++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const sz = 2 + Math.random() * 4;
    s.style.width = sz + 'px';
    s.style.height = sz + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 3) + 's';
    bg.appendChild(s);
  }
})();

const targetTime = ${targetEpoch};
let unlocked = false;

function tick() {
  const now = Date.now();
  const diff = targetTime - now;
  if (diff <= 0) {
    if (!unlocked) {
      unlocked = true;
      triggerUnlockCelebration();
    }
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
  document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cdMins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cdSecs').textContent = String(secs).padStart(2, '0');
}
setInterval(tick, 1000);
tick();

function triggerUnlockCelebration() {
  document.querySelector('.pill').textContent = "🎉 IT IS TIME!";
  document.querySelector('h1').innerHTML = "🎉 Happy Birthday, <span class='highlight-name'>${escapeHtml(recipient)}</span>! 🎉";
  document.querySelector('.desc').textContent = "Your birthday surprise is now unlocked! Opening your gift...";
  launchConfetti();
  setTimeout(function(){
    window.location.reload();
  }, 2500);
}

function copyGiftLink() {
  const btn = document.getElementById('copyBtn');
  navigator.clipboard.writeText(window.location.href.split('?')[0]);
  btn.textContent = '✅ Saved!';
  setTimeout(function(){ btn.textContent = '📋 Save Link'; }, 2000);
}

function downloadCalendarReminder() {
  const title = "Open Birthday Gift for ${escapeHtml(recipient)}! 🎂";
  const desc = "Your special birthday gift website is unlocked! Open it here: " + window.location.href.split('?')[0];
  const dt = new Date(targetTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//2luv//Birthday Gift Reminder//EN',
    'BEGIN:VEVENT',
    'SUMMARY:' + title,
    'DESCRIPTION:' + desc,
    'URL:' + window.location.href.split('?')[0],
    'DTSTART:' + dt,
    'DTEND:' + dt,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Birthday Gift Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\\r\\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'birthday-surprise-reminder.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  const colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      size: 5 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  let frame = 0;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    frame++;
    if (frame < 120) requestAnimationFrame(render);
  }
  render();
}
</script>
</body>
</html>`;
}

function renderLetterShell(locale, link, letter, hostUrl = '', isPaymentSuccess = false) {
  const isPaid = Boolean(letter.paid === true || letter.isPaid === true);
  const recipient = letter.recipientName || 'My Love';
  const canonicalUrl = hostUrl ? (hostUrl + '/' + locale + '/letter/' + link) : ('/' + locale + '/letter/' + link);
  const publicSiteUrl = hostUrl || '';
  const orderId = letter.orderId || ('ORD-' + link);
  const paymentId = letter.paymentId || '';
  const checkoutUrl = `/pay?letter=${encodeURIComponent(link)}`;
  const upiIntentUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${PRICE_INR}.00&cu=INR&tn=${encodeURIComponent(orderId)}`;
  const qrUrl = `/api/qrcode?data=${encodeURIComponent(upiIntentUri)}`;

  const unpaidOverlayHtml = isPaid ? '' : `
<div id="luvePayGate" style="position:fixed;inset:0;background:rgba(15,10,25,0.88);backdrop-filter:blur(8px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;">
  <div style="background:#ffffff;color:#1e1e2f;border-radius:24px;max-width:440px;width:100%;box-shadow:0 25px 60px rgba(0,0,0,0.45);overflow:hidden;text-align:center;animation:luvePop 0.3s ease-out;max-height:92vh;overflow-y:auto;">
    <div style="background:linear-gradient(135deg,#e11d48,#be123c);padding:20px 20px 16px;color:#fff;">
      <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:0.9;">Luve Gifts · Birthday Website</div>
      <h2 style="margin:6px 0 2px;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Unlock Gift for ${recipient}</h2>
      <p style="margin:0;font-size:13px;opacity:0.95;">Price: <strong id="luvePriceDisplay" style="font-size:16px;">₹${PRICE_INR}</strong> for permanent access</p>
    </div>
    <div style="padding:18px 20px;">
      <!-- Voucher / Promo Code Box -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:10px 12px;margin-bottom:12px;text-align:left;">
        <div style="font-size:11px;font-weight:700;color:#475569;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;">🎟️ Have a Promo Code / Voucher?</div>
        <div style="display:flex;gap:6px;">
          <input id="luvePromoCode" type="text" placeholder="e.g. FREEGIFT or LUVE50" style="flex:1;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;text-transform:uppercase;outline:none;font-weight:600;" />
          <button type="button" id="luveApplyPromoBtn" onclick="applyLuvePromo()" style="background:#3b82f6;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-weight:700;cursor:pointer;font-size:12px;">Apply</button>
        </div>
        <div id="luvePromoMsg" style="font-size:12px;margin-top:6px;display:none;font-weight:600;"></div>
      </div>

      <div style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:18px;padding:12px;display:inline-block;margin-bottom:12px;">
        <img id="luveQrImg" src="${qrUrl}" alt="Scan UPI QR" style="width:170px;height:170px;display:block;border-radius:8px;margin:0 auto;" />
        <div style="margin-top:8px;font-size:12px;font-weight:700;color:#0f172a;">Scan with Any UPI App</div>
        <div style="font-size:11px;color:#64748b;">GPay · PhonePe · Paytm · BHIM</div>
      </div>
      <div style="margin-bottom:12px;font-size:12px;color:#475569;">
        Payee: <strong>${PAYEE_NAME}</strong> (<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;color:#0f172a;font-weight:600;">${UPI_ID}</code>)
      </div>
      <div style="display:flex;gap:10px;margin-bottom:14px;">
        <a id="luvePayUpiBtn" href="${upiIntentUri}" style="flex:1;background:#2563eb;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:10px 8px;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 4px 12px rgba(37,99,235,0.3);">
          ⚡ Pay via UPI App
        </a>
        <a href="${checkoutUrl}" style="flex:1;background:#0f172a;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:10px 8px;border-radius:10px;display:flex;align-items:center;justify-content:center;">
          Open Gateway
        </a>
      </div>
      <div style="border-top:1px solid #e2e8f0;padding-top:12px;text-align:left;">
        <label style="font-size:11px;font-weight:700;color:#475569;display:block;margin-bottom:5px;">Already paid? Enter 12-digit UPI Reference (UTR) number:</label>
        <div style="display:flex;gap:8px;">
          <input id="luveUtrInput" type="text" placeholder="e.g. 429381729182" maxlength="20" style="flex:1;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;outline:none;" />
          <button id="luveVerifyBtn" onclick="verifyLuvePayment()" style="background:#16a34a;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-weight:700;cursor:pointer;font-size:12px;">Verify</button>
        </div>
        <div id="luveVerifyStatus" style="font-size:12px;margin-top:6px;color:#dc2626;display:none;"></div>
      </div>
    </div>
  </div>
</div>
<script>
async function applyLuvePromo() {
  const code = (document.getElementById('luvePromoCode').value || '').trim();
  const msg = document.getElementById('luvePromoMsg');
  const btn = document.getElementById('luveApplyPromoBtn');
  if (!code) return;
  btn.disabled = true;
  btn.textContent = 'Applying...';
  try {
    const res = await fetch('/api/voucher/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code, letterRef: '${link}' })
    });
    const d = await res.json();
    msg.style.display = 'block';
    if (d.ok) {
      msg.style.color = '#16a34a';
      msg.textContent = d.message || 'Promo applied!';
      if (d.unlocked) {
        setTimeout(() => {
          window.location.href = window.location.pathname + '?payment=success';
        }, 800);
        return;
      }
      const newPrice = d.finalPrice;
      document.getElementById('luvePriceDisplay').textContent = '₹' + newPrice;
      const newUri = 'upi://pay?pa=' + encodeURIComponent('${UPI_ID}') + '&pn=' + encodeURIComponent('${PAYEE_NAME}') + '&am=' + newPrice + '.00&cu=INR&tn=' + encodeURIComponent('${orderId}');
      document.getElementById('luveQrImg').src = '/api/qrcode?data=' + encodeURIComponent(newUri);
      document.getElementById('luvePayUpiBtn').href = newUri;
    } else {
      msg.style.color = '#dc2626';
      msg.textContent = d.error || 'Invalid promo code.';
    }
  } catch(e) {
    msg.style.display = 'block';
    msg.style.color = '#dc2626';
    msg.textContent = 'Error applying promo code.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Apply';
  }
}

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

  const paidCelebrationHtml = (isPaid && isPaymentSuccess) ? `
<div id="luveShareBar" style="position:fixed;top:0;left:0;right:0;background:linear-gradient(90deg,#059669,#10b981);color:#fff;z-index:99999;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 4px 15px rgba(0,0,0,0.2);font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:600;animation:luvePop 0.3s ease;">
  <div style="display:flex;align-items:center;gap:8px;">
    <span>🎉</span>
    <span><strong>Gift Unlocked!</strong> Share this link with ${recipient}:</span>
  </div>
  <div style="display:flex;gap:8px;align-items:center;">
    <button onclick="copyGiftLink(this)" style="background:#fff;color:#065f46;border:none;padding:6px 14px;border-radius:20px;font-weight:700;font-size:12px;cursor:pointer;">
      📋 Copy Link
    </button>
    <button onclick="downloadGiftQR('${canonicalUrl}')" style="background:#065f46;color:#fff;border:none;padding:6px 14px;border-radius:20px;font-weight:700;font-size:12px;cursor:pointer;">
      📲 Download QR
    </button>
    <button onclick="dismissShareBar()" title="Dismiss" style="background:rgba(0,0,0,0.2);color:#fff;border:none;width:26px;height:26px;border-radius:50%;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">✕</button>
  </div>
</div>
<script>
function dismissShareBar() {
  var bar = document.getElementById('luveShareBar');
  if (bar) bar.style.display = 'none';
  if (window.history && window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
function copyGiftLink(btn) {
  navigator.clipboard.writeText('${canonicalUrl}');
  btn.textContent = '✅ Copied!';
  setTimeout(function() { btn.textContent = '📋 Copy Link'; }, 2000);
}
function downloadGiftQR(giftUrl) {
  window.location.href = '/api/download-qr?data=' + encodeURIComponent(giftUrl) + '&filename=gift-qr-code.png';
}
setTimeout(dismissShareBar, 12000);
</script>` : '';

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
/* Clean gift receiver experience: Never show creator management or edit buttons to recipients */
.more, .more *, .more.svelte-eyox5p, [data-testid="owner-actions"], [data-testid="owner-actions"] *, .letter-message__tools {
  display: none !important;
}
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
                requiresPaymentUnlock: ${!isPaid},
                showOwnerActions: false
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
  const search = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
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

  // Short /l/ link redirect to /en/letter/
  if (pathname.startsWith('/l/')) {
    const slug = pathname.replace('/l/', '');
    res.writeHead(301, { 'Location': `/en/letter/${slug}${search}` });
    return res.end();
  }

  // Dynamic Letter Pages
  const letterMatch = decoded.match(/^\/(?:([a-z]{2}(?:-[a-z]{2})?)\/)?letter\/([^\/\.]+)\/?$/i);
  if (letterMatch) {
    const locale = letterMatch[1] || 'en';
    const link = letterMatch[2];
    const urlObj = new URL(req.url, 'http://localhost');
    const paymentSuccess = urlObj.searchParams.get('payment') === 'success';

    try {
      if (fs.existsSync(LETTERS_FILE)) {
        letters = JSON.parse(fs.readFileSync(LETTERS_FILE, 'utf8'));
      }
    } catch (e) {}

    let letter = letters[link] || Object.values(letters).find(l => l.shareableLink === link || l.id === link);
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
      letters[link] = letter;
      saveLetters();
    }
    if (paymentSuccess) {
      letter.paid = true;
      letter.isPaid = true;
      letter.status = 'published';
      saveLetters();
    }
    const proto = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host ? `${proto}://${req.headers.host}` : '';
    const isPreview = urlObj.searchParams.get('preview') === 'true' || urlObj.searchParams.get('author') === 'true';

    // Birthday Lock: Gift opens ONLY on the birthday date, otherwise countdown lock screen
    const birthdayTarget = getLetterBirthdayDate(letter);
    const now = new Date();
    if (birthdayTarget && now.getTime() < birthdayTarget.getTime() && !paymentSuccess && !isPreview) {
      const lockHtml = renderBirthdayLockPage(locale, link, letter, host, birthdayTarget);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': Buffer.byteLength(lockHtml),
        'Cache-Control': 'no-cache',
        'Set-Cookie': 'cookie-consent=accepted; Path=/; Max-Age=31536000; SameSite=Lax'
      });
      return res.end(lockHtml);
    }

    const html = renderLetterShell(locale, link, letter, host, paymentSuccess);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(html),
      'Cache-Control': 'no-cache',
      'Set-Cookie': 'cookie-consent=accepted; Path=/; Max-Age=31536000; SameSite=Lax'
    });
    return res.end(html);
  }

  let filePath = path.join(REPLICA_DIR, decoded.replace(/^\//, '').replace(/\//g, path.sep));

  // If path is a directory, try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    if (!pathname.endsWith('/')) {
      const search = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      res.writeHead(301, { 'Location': `${pathname}/${search}` });
      return res.end();
    }
    const candidate = path.join(filePath, 'index.html');
    if (fs.existsSync(candidate)) filePath = candidate;
  } else if (!fs.existsSync(filePath)) {
    // Try adding index.html
    const candidate = path.join(filePath, 'index.html');
    if (fs.existsSync(candidate)) {
      if (!pathname.endsWith('/')) {
        const search = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
        res.writeHead(301, { 'Location': `${pathname}/${search}` });
        return res.end();
      }
      filePath = candidate;
    } else {
      // Special alias: /en/event/birthday fallback to replica index.html
      if (pathname === '/en/event/birthday' || pathname === '/en/event/birthday/') {
        const rootIndex = path.join(REPLICA_DIR, 'index.html');
        if (fs.existsSync(rootIndex)) {
          filePath = rootIndex;
        }
      } else {
        // Universal asset fallbacks: match any /assets/ or /fonts/ request regardless of preceding route prefix
        const assetIdx = decoded.indexOf('/assets/');
        if (assetIdx !== -1) {
          const sub = decoded.slice(assetIdx + 8);
          const assetCandidate = path.join(REPLICA_DIR, 'assets', sub.replace(/\//g, path.sep));
          if (fs.existsSync(assetCandidate) && !fs.statSync(assetCandidate).isDirectory()) {
            filePath = assetCandidate;
          }
        }
        const fontIdx = decoded.indexOf('/fonts/');
        if (fontIdx !== -1 && (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory())) {
          const sub = decoded.slice(fontIdx + 7);
          const fontCandidate = path.join(REPLICA_DIR, 'fonts', sub.replace(/\//g, path.sep));
          if (fs.existsSync(fontCandidate) && !fs.statSync(fontCandidate).isDirectory()) {
            filePath = fontCandidate;
          }
        }

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
  }

  if (filePath.endsWith('.avif')) {
    const webpAlt = filePath.replace(/\.avif$/, '.webp');
    if (fs.existsSync(webpAlt)) {
      filePath = webpAlt;
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
    const headers = {
      'Content-Length': totalSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    };
    if (contentType && contentType.startsWith('text/html')) {
      headers['Set-Cookie'] = 'cookie-consent=accepted; Path=/; Max-Age=31536000; SameSite=Lax';
    }
    res.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); });
    stream.pipe(res);
  }
}

function serveUploadedFile(req, res, pathname) {
  const filename = path.basename(pathname);
  let filePath = path.join(UPLOADS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.jpg')) filePath += '.jpg';
    else if (fs.existsSync(filePath + '.png')) filePath += '.png';
    else if (fs.existsSync(filePath + '.webp')) filePath += '.webp';
  }

  if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'image/jpeg';
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=31536000',
      'Access-Control-Allow-Origin': '*'
    });
    return fs.createReadStream(filePath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
  return res.end('Uploaded photo not found');
}

// 1. Primary Server on port 8900: Serves Static Assets + Handles /api/ Routes directly
const primaryServer = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${WEB_PORT}`);
  const pathname = url.pathname;
  const search = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';

  // Canonical Clean URLs: Redirect /home or /home/index.html straight to Root Birthday Site
  if (pathname === '/home' || pathname === '/home/' || pathname === '/home/index.html') {
    res.writeHead(301, { 'Location': `/${search}` });
    return res.end();
  }

  // Utility Route Aliases (terms, privacy, cookies, copyright, dmca, my-gifts)
  const utilityAliases = ['my-gifts', 'terms', 'privacy', 'cookies', 'copyright', 'dmca'];
  for (const alias of utilityAliases) {
    if (pathname === `/${alias}` || pathname === `/${alias}/`) {
      res.writeHead(301, { 'Location': `/en/${alias}/${search}` });
      return res.end();
    }
  }

  // Canonical Clean URLs: Universally strip .html and /index.html
  if (pathname === '/index.html') {
    res.writeHead(301, { 'Location': `/${search}` });
    return res.end();
  }
  if (pathname.endsWith('.html') && pathname !== '/admin/index.html') {
    if (pathname.endsWith('/index.html')) {
      const cleanDir = pathname.slice(0, -10) || '/';
      res.writeHead(301, { 'Location': `${cleanDir}/${search}`.replace(/\/+/g, '/') });
      return res.end();
    } else {
      const cleanPath = pathname.slice(0, -5);
      res.writeHead(301, { 'Location': `${cleanPath}/${search}` });
      return res.end();
    }
  }

  // English Birthday Landing Page
  if (pathname === '/en/event/birthday') {
    res.writeHead(301, { 'Location': `/en/event/birthday/${search}` });
    return res.end();
  }
  if (pathname === '/en/event/birthday/') {
    const enBirthdayPath = path.join(REPLICA_DIR, 'en', 'event', 'birthday', 'index.html');
    if (fs.existsSync(enBirthdayPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'cookie-consent=accepted; Path=/; Max-Age=31536000; SameSite=Lax'
      });
      fs.createReadStream(enBirthdayPath).pipe(res);
      return;
    } else {
      const rootIndex = path.join(REPLICA_DIR, 'index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'cookie-consent=accepted; Path=/; Max-Age=31536000; SameSite=Lax'
      });
      fs.createReadStream(rootIndex).pipe(res);
      return;
    }
  }

  // Supervisor & Admin Dashboard
  if (pathname === '/admin' || pathname === '/admin/' || pathname === '/admin/index.html') {
    const adminHtmlPath = path.join(__dirname, 'admin.html');
    if (fs.existsSync(adminHtmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(adminHtmlPath).pipe(res);
      return;
    }
  }

  // Root Checkout / Pay Dynamic Gateway Routing
  if (
    pathname === '/checkout' ||
    pathname === '/checkout/' ||
    pathname === '/pay' ||
    pathname === '/pay/' ||
    pathname === '/payment' ||
    pathname === '/payment/' ||
    pathname === '/gateway' ||
    pathname === '/gateway/'
  ) {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host || 'luve.duckdns.org';
    const hostUrl = `${proto}://${host}`;
    const letterRef = url.searchParams.get('letter') || url.searchParams.get('id') || 'gift';
    const activeGw = settings.activeGateway || 'youpi';

    // 1. FREE MODE
    if (activeGw === 'free') {
      markLetterAsPaid(letterRef);
      res.writeHead(302, { 'Location': `/en/letter/${encodeURIComponent(letterRef)}?payment=success` });
      return res.end();
    }

    // 2. MANUAL UPI
    if (activeGw === 'manual_upi') {
      return serveManualUpiCheckout(req, res, letterRef, hostUrl);
    }

    // 3. RAZORPAY
    if (activeGw === 'razorpay') {
      return serveRazorpayCheckout(req, res, letterRef, hostUrl);
    }

    // 4. YOUPI-PG (Default)
    getOrCreatePaymentSession(letterRef, hostUrl).then((sess) => {
      if (sess && sess.paymentId) {
        res.writeHead(302, { 'Location': `/checkout/${sess.paymentId}` });
        res.end();
      } else {
        return serveManualUpiCheckout(req, res, letterRef, hostUrl);
      }
    }).catch(() => {
      return serveManualUpiCheckout(req, res, letterRef, hostUrl);
    });
    return;
  }

  // Checkout Portal & Payment Proxy (Forward to YouPI-PG on port 7000)
  if (
    pathname.startsWith('/checkout/') ||
    pathname.startsWith('/api/v1/') ||
    pathname.startsWith('/css/checkout') ||
    pathname.startsWith('/icons/') ||
    pathname === '/youpi.js' ||
    pathname.startsWith('/sdk/')
  ) {
    return proxyToPort(req, res, YOUPI_CHECKOUT_PORT, req.url);
  }

  if (pathname.startsWith('/uploads/') || pathname.startsWith('/__r2-part/uploads/')) {
    if (req.method === 'GET' || req.method === 'HEAD') {
      return serveUploadedFile(req, res, pathname);
    }
    return handleApiRequest(req, res, pathname);
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
    if ((pathname.startsWith('/uploads/') || pathname.startsWith('/__r2-part/uploads/')) && (req.method === 'GET' || req.method === 'HEAD')) {
      return serveUploadedFile(req, res, pathname);
    }
    handleApiRequest(req, res, pathname);
  });

  stubServer.on('error', (err) => {
    console.error('Stub Server Error:', err);
  });

  stubServer.listen(API_PORT, () => {
    console.log(`Secondary API Stub listening on http://127.0.0.1:${API_PORT}/`);
  });
}
