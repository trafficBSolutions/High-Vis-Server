const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type" String
    },
    services: {
        type: [String],
        required: true
    },
    notes: {
        type: String
    }
});
const service = mongoose.model('service', serviceSchema);
module.exports = service
