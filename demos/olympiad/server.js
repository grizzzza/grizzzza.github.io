const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers (relaxed CSP for inline styles/scripts and external images)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
    },
  },
}));

// Gzip compression
app.use(compression());

// Cache static assets
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  etag: true,
}));

// Parse JSON for contact form
app.use(express.json());

// ---------- API ----------

// Contact / subscribe endpoint
app.post('/api/subscribe', (req, res) => {
  const { email, name, message } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Укажите корректный email' });
  }

  // In production — save to DB / send to mailing service
  console.log(`[Subscribe] ${name || 'Аноним'} — ${email}${message ? ' | ' + message : ''}`);
  res.json({ success: true, message: 'Спасибо! Мы свяжемся с вами.' });
});

// Stats endpoint (could be dynamic in production)
app.get('/api/stats', (_req, res) => {
  res.json({
    participants: 6_000_000,
    countries: 112,
    olympiads: 450,
    winners: 48_000,
  });
});

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`\n  🏆  Olympiad Site running at http://localhost:${PORT}\n`);
});
