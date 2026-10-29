// Round-trip test: session -> encrypted suggestions -> decrypt in Node.
const crypto = require('crypto');

const BASE = 'http://127.0.0.1:8787';

(async () => {
  const h = await (await fetch(`${BASE}/api/ai/health`)).json();
  console.log('health:', JSON.stringify(h));

  const s = await (await fetch(`${BASE}/api/ai/session`)).json();
  console.log('session:', { id: s.id.slice(0, 12) + '…', alg: s.alg, ttl: s.ttl });

  const t0 = Date.now();
  const res = await fetch(`${BASE}/api/ai/gift-suggestions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-session': s.id },
    body: JSON.stringify({ topic: 'birthday letter for my best friend', relationship: 'best friend', language: 'en' }),
  });
  const env = await res.json();
  console.log('response status:', res.status, 'in', Date.now() - t0, 'ms');
  console.log('envelope keys:', Object.keys(env), 'ct bytes:', Buffer.from(env.ct, 'base64').length);

  const key = Buffer.from(s.key, 'base64');
  const iv = Buffer.from(env.iv, 'base64');
  const ct = Buffer.from(env.ct, 'base64');
  const tag = ct.subarray(ct.length - 16);
  const body = ct.subarray(0, ct.length - 16);
  const d = crypto.createDecipheriv('aes-256-gcm', key, iv);
  d.setAuthTag(tag);
  const plain = Buffer.concat([d.update(body), d.final()]).toString('utf8');
  console.log('\nDECRYPTED:\n' + plain);

  // tamper test: flip one byte, decryption must fail
  const bad = Buffer.from(ct);
  bad[5] ^= 0xff;
  const d2 = crypto.createDecipheriv('aes-256-gcm', key, iv);
  d2.setAuthTag(bad.subarray(bad.length - 16));
  try {
    Buffer.concat([d2.update(bad.subarray(0, bad.length - 16)), d2.final()]);
    console.log('\ntamper: NOT detected (bad)');
  } catch (e) {
    console.log('\ntamper: rejected ✓ (' + e.code + ')');
  }
})();
