const Skincare = require('../models/skincare');

const skincareController = {
  // POST /api/skincare - Create new skincare reading
  createReading: (req, res) => {
    try {
      const { skinTemp, ambientTemp, humidity, recommendation, deviceId } = req.body;

      // Validate required fields
      if (skinTemp === undefined || ambientTemp === undefined || humidity === undefined) {
        return res.status(400).json({
          success: false,
          message: 'skinTemp, ambientTemp, and humidity are required'
        });
      }

      const reading = Skincare.create({
        skinTemp,
        ambientTemp,
        humidity,
        recommendation,
        deviceId
      });

      console.log(`✓ Skincare data saved: Skin ${skinTemp}°C, Humidity ${humidity}%`);

      res.status(201).json({
        success: true,
        message: 'Skincare reading saved',
        data: reading
      });
    } catch (error) {
      console.error('Error creating skincare reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save reading',
        error: error.message
      });
    }
  },

  // GET /api/skincare - Get all readings
  getAllReadings: (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const readings = Skincare.getAll(limit);

      res.json({
        success: true,
        count: readings.length,
        data: readings
      });
    } catch (error) {
      console.error('Error fetching skincare readings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch readings',
        error: error.message
      });
    }
  },

  // GET /api/skincare/latest - Get latest reading
  getLatestReading: (req, res) => {
    try {
      const reading = Skincare.getLatest();

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
      console.error('Error fetching latest skincare reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reading',
        error: error.message
      });
    }
  }
};

module.exports = skincareController;