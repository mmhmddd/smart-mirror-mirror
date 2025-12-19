const RoomTemp = require('../models/roomTemp');

const roomTempController = {
  // POST /api/room-temp - Create new room temperature reading
  createReading: (req, res) => {
    try {
      const { temperature, humidity, unit, deviceId } = req.body;

      // Validate required fields
      if (temperature === undefined || humidity === undefined) {
        return res.status(400).json({
          success: false,
          message: 'temperature and humidity are required'
        });
      }

      const reading = RoomTemp.create({
        temperature,
        humidity,
        unit,
        deviceId
      });

      console.log(`✓ Room temp saved: ${temperature}°${unit || 'C'}, ${humidity}%`);

      res.status(201).json({
        success: true,
        message: 'Room temperature reading saved',
        data: reading
      });
    } catch (error) {
      console.error('Error creating room temp reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save reading',
        error: error.message
      });
    }
  },

  // GET /api/room-temp - Get all readings
  getAllReadings: (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const readings = RoomTemp.getAll(limit);

      res.json({
        success: true,
        count: readings.length,
        data: readings
      });
    } catch (error) {
      console.error('Error fetching room temp readings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch readings',
        error: error.message
      });
    }
  },

  // GET /api/room-temp/latest - Get latest reading
  getLatestReading: (req, res) => {
    try {
      const reading = RoomTemp.getLatest();

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
      console.error('Error fetching latest room temp reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reading',
        error: error.message
      });
    }
  }
};

module.exports = roomTempController;
