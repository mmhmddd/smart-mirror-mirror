const express = require('express');
const router = express.Router();
const controller = require('../controllers/heartRate'); // تأكد من الاسم صح

// نتائج القياس النهائية
router.post('/', controller.createReading);
router.get('/', controller.getAllReadings);
router.get('/latest', controller.getLatestReading);
router.get('/session/:sessionId', controller.getBySessionId);

// Live Status Tracking (مهم جدًا للـ real-time)
router.post('/status', controller.updateStatus);
router.get('/status', controller.getStatus);
router.post('/reset', controller.resetStatus);

module.exports = router;