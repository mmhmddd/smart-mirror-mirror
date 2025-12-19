const HeartRate = require('../models/heartRate');

const heartRateController = {
  // POST /api/heart - Create new heart rate reading
  createReading: (req, res) => {
    try {
      const { heartRate, systolic, diastolic, fingerDetected, spo2, deviceId } = req.body;

      // Validate required fields
      if (heartRate === undefined || systolic === undefined || diastolic === undefined) {
        return res.status(400).json({
          success: false,
          message: 'heartRate, systolic, and diastolic are required'
        });
      }

      const reading = HeartRate.create({
        heartRate,
        systolic,
        diastolic,
        fingerDetected,
        spo2,
        deviceId
      });

      console.log(`✓ Heart rate saved: ${heartRate} BPM, BP ${systolic}/${diastolic}`);

      res.status(201).json({
        success: true,
        message: 'Heart rate reading saved',
        data: reading
      });
    } catch (error) {
      console.error('Error creating heart rate reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save reading',
        error: error.message
      });
    }
  },

  // GET /api/heart - Get all readings
  getAllReadings: (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const readings = HeartRate.getAll(limit);

      res.json({
        success: true,
        count: readings.length,
        data: readings
      });
    } catch (error) {
      console.error('Error fetching heart rate readings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch readings',
        error: error.message
      });
    }
  },

  // GET /api/heart/latest - Get latest reading
  getLatestReading: (req, res) => {
    try {
      const reading = HeartRate.getLatest();

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
      console.error('Error fetching latest heart rate reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reading',
        error: error.message
      });
    }
  }
};

module.exports = heartRateController;
