const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: String, required: true }
}, {
  timestamps: true // ← ✅ enable createdAt and updatedAt
});
const Testimonial = mongoose.model("test", testSchema);
module.exports = Testimonial;
