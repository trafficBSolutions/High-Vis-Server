const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { submitReview } = require('../controls/testControl');
const Testimonial = require('../models/test');
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);
router.get('/testimonials/latest', async (req, res) => {
  try {
    const latestTestimonials = await Testimonial.find({})
      .sort({ createdAt: -1 }) 
      .limit(3); // ✅ already limited
    res.json(latestTestimonials);
  } catch (error) {
    console.error('Error fetching latest testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials.' });
  }
});
// Use bodyParser to parse URL-encoded and JSON data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/testimonials', submitReview);

module.exports = router;