const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(501).json({ message: 'Heart rate route not implemented yet' });
});

module.exports = router;
