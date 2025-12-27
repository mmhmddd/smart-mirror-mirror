let heartRateData = [];
let currentMeasurementStatus = {
  state: 'idle', // 'idle', 'waiting_finger', 'measuring', 'completed', 'error'
  fingerDetected: false,
  progress: 0,
  timestamp: null,
  sessionId: null
};

const MAX_RECORDS = 1000;

const HeartRate = {
  // Store measurement result
  create: (data) => {
    const record = {
      id: Date.now(),
      heartRate: data.heartRate || 0,
      systolic: data.systolic || 0,
      diastolic: data.diastolic || 0,
      validBeats: data.validBeats || 0,
      success: data.success !== undefined ? data.success : true,
      error: data.error || null,
      fingerDetected: data.fingerDetected,
      spo2: data.spo2 || null,
      timestamp: new Date().toISOString(),
      deviceId: data.deviceId || 'ESP32-S3-001',
      measurementDuration: data.measurementDuration || 15,
      sessionId: data.sessionId || Date.now()
    };
    
    heartRateData.unshift(record);
    if (heartRateData.length > MAX_RECORDS) {
      heartRateData = heartRateData.slice(0, MAX_RECORDS);
    }
    
    // Update status to completed or error
    currentMeasurementStatus = {
      state: record.success ? 'completed' : 'error',
      fingerDetected: false,
      progress: 100,
      timestamp: record.timestamp,
      sessionId: record.sessionId,
      lastReading: record
    };
    
    return record;
  },

  // Update measurement status (called by ESP32 during measurement)
  updateStatus: (status) => {
    currentMeasurementStatus = {
      ...currentMeasurementStatus,
      ...status,
      timestamp: new Date().toISOString()
    };
    return currentMeasurementStatus;
  },

  // Get current measurement status
  getStatus: () => {
    return currentMeasurementStatus;
  },

  // Reset status (when measurement starts or sensor disabled)
  resetStatus: () => {
    currentMeasurementStatus = {
      state: 'idle',
      fingerDetected: false,
      progress: 0,
      timestamp: new Date().toISOString(),
      sessionId: null
    };
    return currentMeasurementStatus;
  },

  getAll: (limit = 50) => {
    return heartRateData.slice(0, limit);
  },

  getLatest: () => {
    return heartRateData[0] || null;
  },

  getBySessionId: (sessionId) => {
    return heartRateData.find(record => record.sessionId === sessionId) || null;
  },

  getByTimeRange: (startTime, endTime) => {
    return heartRateData.filter(record => {
      const timestamp = new Date(record.timestamp).getTime();
      return timestamp >= startTime && timestamp <= endTime;
    });
  },

  clear: () => {
    const count = heartRateData.length;
    heartRateData = [];
    currentMeasurementStatus = {
      state: 'idle',
      fingerDetected: false,
      progress: 0,
      timestamp: null,
      sessionId: null
    };
    return count;
  }
};

module.exports = HeartRate;