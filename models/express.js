const mongoose = require('mongoose');
const expressSchema = new mongoose.Schema ({
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
    jobDate: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
});
const express = mongoose.model("express", expressSchema);
module.exports = express;