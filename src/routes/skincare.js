const express = require('express');
const router = express.Router();
const skinCareController = require('../controllers/skinCareController');

router.post('/analyze', skinCareController.analyzeSkin);
router.get('/status', (req, res) => {
  res.json({ success: true, message: 'Skin Care API is active 🪞' });
});

module.exports = router;