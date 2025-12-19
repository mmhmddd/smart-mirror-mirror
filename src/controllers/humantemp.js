const HumanTemp = require('../models/humanTemp');

const humanTempController = {
  // POST /api/human-temp - Create new human temperature reading
  createReading: (req, res) => {
    try {
      const { objectTemp, ambientTemp, unit, deviceId } = req.body;

      // Validate required fields
      if (objectTemp === undefined || ambientTemp === undefined) {
        return res.status(400).json({
          success: false,
          message: 'objectTemp and ambientTemp are required'
        });
      }

      const reading = HumanTemp.create({
        objectTemp,
        ambientTemp,
        unit,
        deviceId
      });

      console.log(`✓ Human temp saved: Object ${objectTemp}°${unit || 'C'}, Ambient ${ambientTemp}°${unit || 'C'}`);

      res.status(201).json({
        success: true,
        message: 'Human temperature reading saved',
        data: reading
      });
    } catch (error) {
      console.error('Error creating human temp reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save reading',
        error: error.message
      });
    }
  },

  // GET /api/human-temp - Get all readings
  getAllReadings: (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const readings = HumanTemp.getAll(limit);

      res.json({
        success: true,
        count: readings.length,
        data: readings
      });
    } catch (error) {
      console.error('Error fetching human temp readings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch readings',
        error: error.message
      });
    }
  },

  // GET /api/human-temp/latest - Get latest reading
  getLatestReading: (req, res) => {
    try {
      const reading = HumanTemp.getLatest();

      if (!reading) {
        return res.status(404).json({
          success: false,
          message: 'No readings found'
        });
      }

      res.json({
        success: true,
        data: reading
      });
    } catch (error) {
      console.error('Error fetching latest human temp reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reading',
        error: error.message
      });
    }
  }
};

module.exports = humanTempController;
