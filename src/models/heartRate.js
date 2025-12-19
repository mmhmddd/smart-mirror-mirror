let heartRateData = [];
const MAX_RECORDS = 1000;

const HeartRate = {
  create: (data) => {
    const record = {
      id: Date.now(),
      heartRate: data.heartRate,
      systolic: data.systolic,
      diastolic: data.diastolic,
      fingerDetected: data.fingerDetected,
      spo2: data.spo2 || null,
      timestamp: new Date().toISOString(),
      deviceId: data.deviceId || 'ESP32-S3-001'
    };
    
    heartRateData.unshift(record);
    if (heartRateData.length > MAX_RECORDS) {
      heartRateData = heartRateData.slice(0, MAX_RECORDS);
    }
    
    return record;
  },

  getAll: (limit = 50) => {
    return heartRateData.slice(0, limit);
  },

  getLatest: () => {
    return heartRateData[0] || null;
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
    return count;
  }
};

module.exports = HeartRate;
