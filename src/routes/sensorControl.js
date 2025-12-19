const express = require('express');
const router = express.Router();

// Store sensor states
let sensorStates = {
  dht22: false,
  mlx90614: false,
  mq135: false,
  max30105: false
};

// GET current sensor states
router.get('/status', (req, res) => {
  res.json({
    success: true,
    sensors: sensorStates
  });
});

// POST to enable/disable specific sensor
router.post('/sensor/:sensorName', (req, res) => {
  const { sensorName } = req.params;
  const { enabled } = req.body;

  const validSensors = ['dht22', 'mlx90614', 'mq135', 'max30105'];
  
  if (!validSensors.includes(sensorName)) {
    return res.status(400).json({
      success: false,
      message: `Invalid sensor name. Valid: ${validSensors.join(', ')}`
    });
  }

  if (enabled === undefined) {
    return res.status(400).json({
      success: false,
      message: 'enabled field is required (true/false)'
    });
  }

  sensorStates[sensorName] = enabled;

  res.json({
    success: true,
    message: `${sensorName} ${enabled ? 'enabled' : 'disabled'}`,
    sensors: sensorStates
  });
});

// POST to enable all sensors
router.post('/enable-all', (req, res) => {
  sensorStates = {
    dht22: true,
    mlx90614: true,
    mq135: true,
    max30105: true
  };

  res.json({
    success: true,
    message: 'All sensors enabled',
    sensors: sensorStates
  });
});

// POST to disable all sensors
router.post('/disable-all', (req, res) => {
  sensorStates = {
    dht22: false,
    mlx90614: false,
    mq135: false,
    max30105: false
  };

  res.json({
    success: true,
    message: 'All sensors disabled',
    sensors: sensorStates
  });
});

module.exports = router;
