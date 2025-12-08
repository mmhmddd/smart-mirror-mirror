const express = require('express');
const router = express.Router();

const { getGas } = require('../controllers/gasDetection');

router.get('/', getGas);

module.exports = router;
