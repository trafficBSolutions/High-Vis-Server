const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,                // 465 = implicit TLS
  auth: {
    user: process.env.EMAIL_USER,   // your full Gmail address
    pass: process.env.EMAIL_PASS,   // 16-char Google App Password
  },
  pool: true,
  maxConnections: 3,
  maxMessages: 50,
  connectionTimeout: 20_000,   // 20s
  socketTimeout: 30_000,       // 30s
  logger: true,
  debug: true,
});
module.exports = transporter;
