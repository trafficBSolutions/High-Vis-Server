const test = require('../models/test');
const transporter = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'highvisibilitydetailing@gmail.com';
const verifyRecaptcha = require('../utils/recap');
const submitReview = async (req, res) => {
    try {
       const {
    name,
    email,
    review,
    rating,
    token
} = req.body; // ✅ include token

const isValid = await verifyRecaptcha(token);

    if (!isValid) {
      return res.status(400).json({ error: 'Failed reCAPTCHA verification' });
    }
        const newReview = await test.create({
            name,
            email,
            review,
            rating
        });
        
    const mailOptions = {
      from: `"Review Bot" <${myEmail}>`,
      to: myEmail,
      subject: `🗣️ New Customer Review Submitted - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
          <h2 style="color: #333;">New Customer Review Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
          <p><strong>Review:</strong><br/>${review}</p>
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
      subject: "✅ Thank you for your review!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #ffffff;">
          <h2 style="color: #4CAF50;">Thank You, ${name}!</h2>
          <p>We really appreciate your feedback. Your review helps us improve and grow.</p>
          <p><strong>Your Rating:</strong> ${'⭐'.repeat(rating)}</p>
          <p><strong>Your Review:</strong><br/>${review}</p>
          <br />
          <p>– High Visibility Detailing Team</p>
        </div>
      `
    };
    await transporter.sendMail(confirmOptions);

    res.status(201).json({ message: 'Review submitted successfully.', review: newReview });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review.' });
  }
};

module.exports = { submitReview };