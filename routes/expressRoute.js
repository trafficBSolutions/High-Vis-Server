const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { submitExpress } = require('../controls/expressControl');
const fs = require('fs'); // Import the 'fs' module for file system operations

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

// Use bodyParser to parse URL-encoded and JSON data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Define routes under /apply path
router.post('/express-detailing',  submitExpress);

module.exports = router;
