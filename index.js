const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');
// Create Express app
const app = express();
app.set('trust proxy', 1);
// ✅ Security Middleware
app.use(helmet()); // Adds secure HTTP headers
app.use(compression()); // GZIP compression
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key]);
      }
    }
  }
  next();
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const allowedOrigins = [
  'https://www.highvisibilitydetailing.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Database Connected');
    // Optionally call removeDuplicates here
  })
  .catch((err) => console.error('❌ Database Not Connected', err));

// ✅ Routes
app.use('/', require('./routes/testRoute'));
app.use('/', require('./routes/contactRoute'));
app.use('/', require('./routes/serviceRoute'));

// ✅ Start Server
const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => console.log(`🚀 Server running on port ${port}`));



