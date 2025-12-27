const GasDetection = require('../models/gasDetection');

const gasDetectionController = {
  // POST /api/gas - Create new gas reading
  createReading: (req, res) => {
    try {
      const { 
        rawValue, 
        voltage,
        resistance,
        co2_ppm, 
        co2_percentage,
        co2_status,
        smoke_level,
        smoke_status,
        aqi_score,
        overall_quality,
        deviceId 
      } = req.body;

      // Validate required fields
      if (rawValue === undefined) {
        return res.status(400).json({
          success: false,
          message: 'rawValue is required'
        });
      }

      const reading = GasDetection.create({
        rawValue,
        voltage,
        resistance,
        co2_ppm,
        co2_percentage,
        co2_status,
        smoke_level,
        smoke_status,
        aqi_score,
        overall_quality,
        deviceId
      });

      console.log(`✓ Gas reading saved: CO₂=${co2_ppm}ppm, Smoke=${smoke_level}%, AQI=${aqi_score} (${overall_quality})`);

      res.status(201).json({
        success: true,
        message: 'Gas reading saved',
        data: reading
      });
    } catch (error) {
      console.error('Error creating gas reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save reading',
        error: error.message
      });
    }
  },

  // GET /api/gas - Get all readings
  getAllReadings: (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const readings = GasDetection.getAll(limit);

      res.json({
        success: true,
        count: readings.length,
        data: readings
      });
    } catch (error) {
      console.error('Error fetching gas readings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch readings',
        error: error.message
      });
    }
  },

  // GET /api/gas/latest - Get latest reading
  getLatestReading: (req, res) => {
    try {
      const reading = GasDetection.getLatest();

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
      console.error('Error fetching latest gas reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reading',
        error: error.message
      });
    }
  }
};

module.exports = gasDetectionController;
