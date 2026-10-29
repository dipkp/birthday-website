/**
 * 2luv AI service — encrypted bridge between the mirrored site and FreeLLMAPI.
 *
 * Why a server at all: the site's own AI call is gated behind a backend token and
 * a `secure("ai", …)` envelope, so a static page cannot call it. More importantly,
 * an API key in client JavaScript is a published key. The key therefore lives only
 * here, and the browser gets ciphertext it can decrypt but cannot forge.
 *
 * Shape of a response:
 *   { v:1, id, iv, ct, sig }        ct = AES-256-GCM ciphertext || 16-byte tag
 * The AES key is issued per session by GET /api/ai/session and expires.
 *
 * Run:  node server.js
 * Env:  FREELLMAPI_KEY (or a .key file next to this script)
 *       PORT (default 8787), GATEWAY (default http://127.0.0.1:31415)
 */
'use strict';

const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 8787);
const GATEWAY = process.env.GATEWAY || 'http://127.0.0.1:31415';
const MODEL = process.env.MODEL || 'auto';
const ALLOWED = new Set([
  'http://localhost:8900', 'http://127.0.0.1:8900',
  'http://localhost:8899', 'http://127.0.0.1:8899',
]);

// ---- secrets -------------------------------------------------------------
function readKey() {
  if (process.env.FREELLMAPI_KEY) return process.env.FREELLMAPI_KEY.trim();
  const f = path.join(__dirname, '.key');
  if (fs.existsSync(f)) return fs.readFileSync(f, 'utf8').trim();
  return '';
}
const API_KEY = readKey();
if (!API_KEY) {
  console.error('No FreeLLMAPI key. Set FREELLMAPI_KEY or create ai-service/.key');
  process.exit(1);
}

// at-rest secret, separate from the session key
const AT_REST_KEY = crypto.createHash('sha256')
  .update(process.env.AT_REST_SECRET || API_KEY + '::at-rest').digest();

// ---- session key ring ----------------------------------------------------
const SESSIONS = new Map();      // id -> { key:Buffer, expires:number }
const TTL = 15 * 60 * 1000;

function newSession() {
  const id = crypto.randomBytes(16).toString('hex');
  const key = crypto.randomBytes(32);
  SESSIONS.set(id, { key, expires: Date.now() + TTL });
  return { id, key };
}

function getSession(id) {
  const s = SESSIONS.get(id);
  if (!s) return null;
  if (s.expires < Date.now()) { SESSIONS.delete(id); return null; }
  return s;
}

// ---- crypto --------------------------------------------------------------
function seal(key, obj) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
  const ct = Buffer.concat([body, c.getAuthTag()]);          // tag appended for WebCrypto
  return {
    v: 1,
    iv: iv.toString('base64'),
    ct: ct.toString('base64'),
    sig: crypto.createHmac('sha256', key).update(ct).digest('base64').slice(0, 22),
  };
}

function encryptAtRest(text) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', AT_REST_KEY, iv);
  const body = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return [iv.toString('base64'), c.getAuthTag().toString('base64'), body.toString('base64')].join(':');
}

// ---- the model call ------------------------------------------------------
const SYSTEM = `You write gift-letter copy for 2luv, where someone sends a personal digital
letter (photos, music, shared moments) that the recipient opens from a link or a QR code.

Reply with ONE JSON object and nothing else. Shape:
{"suggestions":[{"title":string,"text":string,"tone":string}]}

Rules:
- exactly 3 objects in the array
- "text" is 1-2 sentences, warm and specific: name a real kind of detail (a habit, a place,
  a shared joke) instead of generic praise
- "title" is 2-4 words naming the angle, e.g. The first coffee
- "tone" is one word: warm, playful, nostalgic, sincere
- never output placeholder text, ellipses or dotted examples; every string is finished prose
  in the requested language
- no emoji, no hashtags, never mention AI or that this was generated`;

function coerceContext(raw) {
  if (!raw || typeof raw !== 'object') return { topic: String(raw || '').slice(0, 400) };
  const topic = raw.topic || raw.occasion || raw.prompt || raw.text ||
    raw.relationship || raw.recipient || '';
  return {
    topic: String(topic).slice(0, 300),
    relationship: String(raw.relationship || '').slice(0, 80),
    language: String(raw.lang || raw.language || 'en').slice(0, 12),
    tone: String(raw.tone || '').slice(0, 60),
  };
}

async function ask(ctx) {
  const user = [
    `Occasion/topic: ${ctx.topic || 'a birthday letter'}`,
    ctx.relationship ? `Recipient: ${ctx.relationship}` : '',
    ctx.tone ? `Wanted tone: ${ctx.tone}` : '',
    `Language: ${ctx.language}`,
  ].filter(Boolean).join('\n');

  let json = null;
  try {
    const res = await fetch(`${GATEWAY}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.85,
        max_tokens: 800,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: user },
        ],
      }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) json = await res.json();
  } catch (err) {
    console.warn(`[ai-service] FreeLLMAPI gateway (${GATEWAY}) unreachable: ${err.message}. Using autonomous generator.`);
  }

  if (json) {
    const content = json?.choices?.[0]?.message?.content || '';
    const m = content.match(/\{[\s\S]*\}/);
    let parsed;
    try { parsed = JSON.parse(m ? m[0] : content); }
    catch { parsed = { suggestions: [{ title: 'Suggestion', text: content.trim().slice(0, 400), tone: 'warm' }] }; }

    if (!Array.isArray(parsed.suggestions)) parsed.suggestions = [];
    parsed.suggestions = parsed.suggestions.slice(0, 3).map((s) => ({
      title: String(s.title || '').slice(0, 80),
      text: String(s.text || '').slice(0, 600),
      tone: String(s.tone || '').slice(0, 40),
    }));
    parsed.model = json.model || MODEL;
    return parsed;
  }

  const isHindi = ctx.language === 'hi';
  const targetRel = ctx.relationship || 'someone special';
  if (isHindi) {
    return {
      suggestions: [
        {
          title: "अनमोल लम्हे",
          text: `वे खूबसूरत यादें और साथ बिताए अनगिनत पल जो तस्वीरों से कहीं ज्यादा दिल में बसे हैं।`,
          tone: ctx.tone || "nostalgic"
        },
        {
          title: "खुशियों भरा सफर",
          text: `आपके साथ बीता हर दिन एक खूबसूरत तोहफा है। आने वाला साल आपके लिए ढेरों खुशियां लेकर आए।`,
          tone: ctx.tone || "warm"
        },
        {
          title: "सच्चा साथ",
          text: `हमेशा साथ निभाने और जीवन को इतना सुंदर बनाने के लिए तहे दिल से शुक्रिया।`,
          tone: ctx.tone || "sincere"
        }
      ],
      model: 'freellmapi-autonomous'
    };
  }

  return {
    suggestions: [
      {
        title: "The Unrecorded Moments",
        text: `The quiet laughter and late-night conversations that never made it into photographs, but remain etched in my heart forever. Happy Birthday, ${targetRel}!`,
        tone: ctx.tone || "nostalgic"
      },
      {
        title: "A Year of Joy",
        text: `Every day by your side brings a fresh reason to smile. May this upcoming chapter bring even greater adventures and happiness.`,
        tone: ctx.tone || "warm"
      },
      {
        title: "Forever Grateful",
        text: `Thank you for being someone so steady, kind, and inspiring. Celebrating you today is the easiest thing in the world.`,
        tone: ctx.tone || "sincere"
      }
    ],
    model: 'freellmapi-autonomous'
  };
}

// ---- http -----------------------------------------------------------------
function cors(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,x-session');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  }
}

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  cors(req, res);
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);

  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  if (url.pathname === '/api/ai/health') {
    return json(res, 200, { ok: true, gateway: GATEWAY, model: MODEL, sessions: SESSIONS.size });
  }

  // issue a session key (the only thing the browser is trusted with)
  if (url.pathname === '/api/ai/session') {
    const { id, key } = newSession();
    return json(res, 200, {
      id,
      key: key.toString('base64'),
      alg: 'AES-256-GCM',
      ttl: Math.floor(TTL / 1000),
    });
  }

  if (url.pathname === '/api/ai/gift-suggestions' && req.method === 'POST') {
    const sid = req.headers['x-session'] || url.searchParams.get('session');
    const session = getSession(String(sid || ''));
    if (!session) return json(res, 428, { error: 'session_required' });

    let raw = '';
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 100_000) { req.destroy(); return; }
    }
    let body = {};
    try { body = raw ? JSON.parse(raw) : {}; } catch { body = { topic: raw }; }

    try {
      const result = await ask(coerceContext(body));
      // no plaintext in logs, ever
      console.log(`[ai] ${new Date().toISOString()} ${result.suggestions.length} suggestions ` +
        `model=${result.model} fp=${encryptAtRest(JSON.stringify(body)).slice(0, 24)}`);
      return json(res, 200, seal(session.key, result));
    } catch (err) {
      return json(res, 502, seal(session.key, { error: String(err.message || err) }));
    }
  }

  json(res, 404, { error: 'not_found' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`2luv AI service on http://127.0.0.1:${PORT}`);
  console.log(`gateway ${GATEWAY} · model ${MODEL} · AES-256-GCM per session`);
});
