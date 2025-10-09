const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,               // STARTTLS upgrade
  requireTLS: true,
  family: 4,                   // force IPv4 at the socket level
  auth: {
    user: process.env.EMAIL_USER,   // full Gmail/Workspace address
    pass: process.env.EMAIL_PASS,   // 16-char App Password
  },
  // Turn OFF pooling while you debug handshakes
  pool: false,
  keepAlive: false,

  // Be a bit more patient on PaaS
  connectionTimeout: 60_000,   // time to establish TCP + greet
  greetingTimeout: 30_000,     // time waiting for server greeting
  socketTimeout: 60_000,       // idle socket timeout during send

  // TLS hints for saner handshakes
  tls: {
    servername: 'smtp.gmail.com', // SNI
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },

  logger: true,
  debug: true,
});

module.exports = transporter;
