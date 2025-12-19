const express = require('express');
const router = express.Router();
const controller = require('../controllers/skincare'); // Fix: lowercase 's'

router.post('/', controller.createReading);
router.get('/', controller.getAllReadings);
router.get('/latest', controller.getLatestReading);

module.exports = router;