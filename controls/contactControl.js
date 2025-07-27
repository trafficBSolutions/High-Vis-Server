const contact = require('../models/contact');
const transporter = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'highvisibilitydetailing@gmail.com';
const verifyRecaptcha = require('../utils/recap');
const submitContact = async (req, res) => {
    try {
       const {
    name,
    email,
    subject,
    message,
    token
} = req.body; // ✅ include token

const isValid = await verifyRecaptcha(token);

    if (!isValid) {
      return res.status(400).json({ error: 'Failed reCAPTCHA verification' });
    }
        const newContact = await contact.create({
            name,
            email,
            subject,
            message
        });
        
    const mailOptions = {
      from: `"Contact Bot" <${myEmail}>`,
      to: myEmail,
      subject: `🗣️ New Message Submitted - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
          <h2 style="color: #333;">New Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject})</p>
          <p><strong>Message:</strong><br/>${message}</p>
          <hr />
          <p style="font-size: 12px; color: #999;">Submitted via HighVisibilityDetailing.com</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Optional: send confirmation to customer
const confirmOptions = {
  from: `"High Visibility Detailing" <${myEmail}>`,
  to: email,
  subject: "✅ We've received your message!",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #ffffff;">
      <h2 style="color: #4CAF50;">Thank You, ${name}!</h2>
      <p>We’ve received your message and will get back to you as soon as possible.</p>
      <p><strong>Your Subject:</strong> ${subject}</p>
      <p><strong>Your Message:</strong><br/>${message}</p>
      <br />
      <p>– High Visibility Detailing Team</p>
      <p style="font-size: 12px; color: #999;">This is an automated message confirming we received your contact form submission.</p>
    </div>
  `
};

    await transporter.sendMail(confirmOptions);

    res.status(201).json({ message: 'Message submitted successfully.', message: newContact });
  } catch (error) {
    console.error('Error submitting Message:', error);
    res.status(500).json({ error: 'Failed to submit review.' });
  }
};

module.exports = { submitContact };
