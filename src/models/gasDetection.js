let gasData = [];
const MAX_RECORDS = 1000;

const GasDetection = {
  create: (data) => {
    const record = {
      id: Date.now(),
      rawValue: data.rawValue,
      quality: data.quality,
      ppm: data.ppm || null,
      timestamp: new Date().toISOString(),
      deviceId: data.deviceId || 'ESP32-S3-001'
    };
    
    gasData.unshift(record);
    if (gasData.length > MAX_RECORDS) {
      gasData = gasData.slice(0, MAX_RECORDS);
    }
    
    return record;
  },

  getAll: (limit = 50) => {
    return gasData.slice(0, limit);
  },

  getLatest: () => {
    return gasData[0] || null;
  },

  getByTimeRange: (startTime, endTime) => {
    return gasData.filter(record => {
      const timestamp = new Date(record.timestamp).getTime();
      return timestamp >= startTime && timestamp <= endTime;
    });
  },

  clear: () => {
    const count = gasData.length;
    gasData = [];
    return count;
  }
};

module.exports = GasDetection;

