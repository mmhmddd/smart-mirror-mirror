const { getGasData } = require('../models/gasDetection');

exports.getGas = async (req, res) => {
  const result = await getGasData();
  res.json(result);
};
