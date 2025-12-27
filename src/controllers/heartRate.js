const HeartRate = require('../models/heartRate');

const heartRateController = {
  // POST /api/heart - Create new heart rate reading (final result)
  createReading: (req, res) => {
    try {
      const { 
        heartRate, 
        systolic, 
        diastolic, 
        validBeats,
        success,
        error,
        fingerDetected, 
        spo2, 
        deviceId,
        measurementDuration,
        sessionId 
      } = req.body;

      // Validate required fields only if success is true
      if (success !== false && (heartRate === undefined || systolic === undefined || diastolic === undefined)) {
        return res.status(400).json({
          success: false,
          message: 'heartRate, systolic, and diastolic are required for successful measurements'
        });
      }

      const reading = HeartRate.create({
        heartRate,
        systolic,
        diastolic,
        validBeats,
        success,
        error,
        fingerDetected,
        spo2,
        deviceId,
        measurementDuration,
        sessionId
      });

      if (success !== false) {
        console.log(`✅ Heart rate saved: ${heartRate} BPM, BP ${systolic}/${diastolic}, Session: ${sessionId}`);
      } else {
        console.log(`❌ Measurement failed: ${error}, Session: ${sessionId}`);
      }

      res.status(201).json({
        success: true,
        message: success !== false ? 'Heart rate reading saved' : 'Measurement error recorded',
        data: reading
      });
    } catch (error) {
      console.error('❌ Error creating heart rate reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save reading',
        error: error.message
      });
    }
  },

  // POST /api/heart/status - Update measurement status in real-time
  updateStatus: (req, res) => {
    try {
      const { state, fingerDetected, progress, sessionId, deviceId } = req.body;

      if (!state) {
        return res.status(400).json({
          success: false,
          message: 'state is required'
        });
      }

      const status = HeartRate.updateStatus({
        state,
        fingerDetected: fingerDetected || false,
        progress: progress || 0,
        sessionId,
        deviceId
      });

      // Log status changes
      const statusEmojis = {
        'idle': '⚪',
        'waiting_finger': '👆',
        'finger_detected': '✅',
        'measuring': '🫀',
        'completed': '✅',
        'error': '❌'
      };
      const emoji = statusEmojis[state] || '📊';
      
      console.log(`${emoji} Status Update: ${state.toUpperCase()} | Finger: ${fingerDetected ? 'YES' : 'NO'} | Progress: ${progress}% | Session: ${sessionId || 'N/A'}`);

      res.status(200).json({
        success: true,
        message: 'Status updated',
        data: status
      });
    } catch (error) {
      console.error('❌ Error updating status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update status',
        error: error.message
      });
    }
  },

  // GET /api/heart/status - Get current measurement status
  getStatus: (req, res) => {
    try {
      const status = HeartRate.getStatus();

      res.json({
        success: true,
        data: status
      });
    } catch (error) {
      console.error('❌ Error fetching status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch status',
        error: error.message
      });
    }
  },

  // POST /api/heart/reset - Reset measurement status
  resetStatus: (req, res) => {
    try {
      const status = HeartRate.resetStatus();

      console.log('🔄 Measurement status reset');

      res.json({
        success: true,
        message: 'Status reset',
        data: status
      });
    } catch (error) {
      console.error('❌ Error resetting status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to reset status',
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
      console.error('❌ Error fetching heart rate readings:', error);
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
      console.error('❌ Error fetching latest heart rate reading:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reading',
        error: error.message
      });
    }
  },

  // GET /api/heart/session/:sessionId - Get reading by session ID
  getBySessionId: (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      
      if (isNaN(sessionId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid session ID'
        });
      }

      const reading = HeartRate.getBySessionId(sessionId);

      if (!reading) {
        return res.status(404).json({
          success: false,
          message: 'Reading not found for this session'
        });
      }

      res.json({
        success: true,
        data: reading
      });
    } catch (error) {
      console.error('❌ Error fetching reading by session ID:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reading',
        error: error.message
      });
    }
  }
};

module.exports = heartRateController;