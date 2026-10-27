/**
 * Lumi6 — Backend Server & Secure AI Gateway
 * Zero third-party runtime dependencies. Uses native Node.js http, https, fs, path.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Simple .env.local / .env file reader
function loadEnv() {
  const envPaths = ['.env.local', '.env'];
  for (const p of envPaths) {
    const full = path.join(__dirname, p);
    if (fs.existsSync(full)) {
      try {
        const content = fs.readFileSync(full, 'utf8');
        content.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const idx = trimmed.indexOf('=');
            if (idx > 0) {
              const k = trimmed.substring(0, idx).trim();
              const v = trimmed.substring(idx + 1).trim();
              if (!process.env[k]) {
                process.env[k] = v;
              }
            }
          }
        });
      } catch (e) {}
    }
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.LUMI6_AI_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

// Deterministic Concept Catalog & Fallback Data
const FALLBACK_CATALOG = {
  shadows: {
    id: 'shadows',
    title: 'Shadows & Light Travel',
    initialPrompt: "Why does a shadow change size when an object moves?",
    predictionQuestion: "What do you think will happen to the shadow if we move the light source closer to the object?",
    predictionOptions: [
      "The shadow will get bigger on the wall",
      "The shadow will shrink and get smaller",
      "The shadow will stay the exact same size"
    ],
    scientificFact: "Light travels in straight rays. When an opaque object blocks light, it creates a shadow. Bringing the light closer to the object causes the object to block a wider cone of spreading rays, casting a larger shadow on the wall behind.",
    realWorldAnalogy: "When you walk past a streetlight at night: far away, your shadow stretches long ahead of you. Right under the bulb, your shadow pools small at your feet!",
    visualActivity: 'shadow_distance'
  },
  prisms: {
    id: 'prisms',
    title: 'Prisms & Rainbow Colors',
    initialPrompt: "How does a clear glass prism create a rainbow from white sunlight?",
    predictionQuestion: "What do you think white sunlight is really made of before it touches the glass?",
    predictionOptions: [
      "White light is already a mixture of all the colors together",
      "The glass paints the light using special dyes inside",
      "White light only contains red and blue"
    ],
    scientificFact: "White sunlight is actually a mixture of all visible colors blended together! In glass, light slows down and refracts (bends). Because each color has a different wavelength, each bends at a slightly different angle: red bends least, violet bends most!",
    realWorldAnalogy: "After a rainstorm, millions of raindrops act like tiny prisms, bending sunlight into a giant sky rainbow!",
    visualActivity: 'prism_rainbow'
  }
};

// PII Scrubber
function scrubPII(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]')
    .replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[phone]')
    .replace(/\b\d+\s+([a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]+)\s(Street|St|Avenue|Ave|Road|Rd|Drive|Dr)\b/gi, '[address]');
}

// In-Memory Rate Limiter (30 req / min per IP)
const ipRateMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRateMap.get(ip) || { count: 0, resetAt: now + 60000 };
  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + 60000;
  } else {
    entry.count++;
  }
  ipRateMap.set(ip, entry);
  return entry.count > 30;
}

// Generate Deterministic Response
function getDeterministicResponse(query, conceptKey, prediction) {
  const norm = (query || '').toLowerCase();
  let key = conceptKey;
  if (!key || !FALLBACK_CATALOG[key]) {
    key = norm.includes('prism') || norm.includes('rainbow') || norm.includes('color') ? 'prisms' : 'shadows';
  }
  const concept = FALLBACK_CATALOG[key];

  if (norm.includes('explain') || norm.includes('tell me') || norm.includes('answer')) {
    return {
      intent: 'explain_fully',
      message: `${concept.scientificFact}\n\n💡 Real-world wonder: ${concept.realWorldAnalogy}`,
      suggestedAction: 'experiment',
      requiresPrediction: false,
      visualActivity: concept.visualActivity,
      conceptKey: key,
      provider: 'deterministic_offline',
      timestamp: Date.now()
    };
  }

  if (prediction) {
    return {
      intent: 'start_experiment',
      message: `Fabulous prediction: "${prediction}"! Now test it in the workshop below. Move the slider and watch what happens to the visual!`,
      suggestedAction: 'experiment',
      requiresPrediction: false,
      visualActivity: concept.visualActivity,
      conceptKey: key,
      provider: 'deterministic_offline',
      timestamp: Date.now()
    };
  }

  return {
    intent: 'think_first',
    message: `${concept.initialPrompt}\n\n${concept.predictionQuestion}`,
    suggestedAction: 'predict',
    requiresPrediction: true,
    predictionOptions: concept.predictionOptions,
    visualActivity: concept.visualActivity,
    conceptKey: key,
    provider: 'deterministic_offline',
    timestamp: Date.now()
  };
}

// Call Google Gemini REST API
function callGeminiAPI(query, conceptKey, history, model = GEMINI_MODEL) {
  return new Promise((resolve, reject) => {
    if (!GEMINI_API_KEY) {
      return reject(new Error('No API key configured'));
    }

    const cleanQuery = scrubPII(query);
    const systemPrompt = `You are Lumi, an encouraging thinking partner for kids aged 8-12. Ask 1 question at a time. Encourage predictions. Use visualActivity: "shadow_distance" | "prism_rainbow" | "none". Output JSON: {"intent": "think_first"|"explain_fully", "message": "...", "suggestedAction": "predict"|"experiment", "requiresPrediction": true|false, "predictionOptions": ["opt1","opt2"]|null, "visualActivity": "shadow_distance"|"prism_rainbow"|"none", "conceptKey": "shadows"|"prisms"}`;

    const bodyPayload = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemPrompt },
            { text: JSON.stringify({ query: cleanQuery, concept: conceptKey || 'general' }) }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3,
        maxOutputTokens: 600
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyPayload),
        'x-goog-api-key': GEMINI_API_KEY
      },
      timeout: 6000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Gemini HTTP ${res.statusCode}`));
        }
        try {
          const parsed = JSON.parse(data);
          const rawText = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          const jsonResult = JSON.parse(rawText);
          jsonResult.provider = 'gemini';
          jsonResult.timestamp = Date.now();
          resolve(jsonResult);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Gemini API timeout'));
    });

    req.on('error', reject);
    req.write(bodyPayload);
    req.end();
  });
}

// MIME Types for Static File Serving
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// HTTP Request Handler
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const clientIp = req.socket.remoteAddress || 'unknown';

  // Set Security & CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API 1: Health Check
  if (req.method === 'GET' && parsedUrl.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'Lumi6 Learning Platform',
      provider: GEMINI_API_KEY ? 'gemini' : 'deterministic_offline',
      model: GEMINI_MODEL,
      liveAiEnabled: Boolean(GEMINI_API_KEY),
      timestamp: Date.now()
    }));
    return;
  }

  // API 2: Inquiry Dispatcher
  if (req.method === 'POST' && parsedUrl.pathname === '/api/inquiry') {
    if (isRateLimited(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Too many requests. Please take a breath and try again!' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 16384) {
        req.destroy(); // Reject payloads > 16KB
      }
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const query = payload.query || '';
        const conceptKey = payload.conceptKey || 'shadows';
        const prediction = payload.prediction || null;

        // Try Live AI if key is configured, else fallback
        if (GEMINI_API_KEY) {
          try {
            const aiResult = await callGeminiAPI(query, conceptKey, payload.history);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(aiResult));
            return;
          } catch (apiErr) {
            console.warn('[Lumi6 AI Gateway] AI error/timeout, using deterministic fallback:', apiErr.message);
          }
        }

        // Deterministic Fallback
        const fallback = getDeterministicResponse(query, conceptKey, prediction);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(fallback));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request format' }));
      }
    });
    return;
  }

  // STATIC FILE SERVING
  let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log('==================================================');
    console.log(`   Lumi6 Server running on http://localhost:${PORT}`);
    console.log(`   Mode: ${GEMINI_API_KEY ? `LIVE AI ENABLED (Google Gemini, model: ${GEMINI_MODEL})` : 'OFFLINE DETERMINISTIC (No API key detected)'}`);
    console.log('==================================================');
  });
}

module.exports = { server, scrubPII, isRateLimited, getDeterministicResponse, callGeminiAPI, GEMINI_MODEL };
