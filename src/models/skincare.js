let skincareData = [];
const MAX_RECORDS = 1000;

const Skincare = {
  create: (data) => {
    const record = {
      id: Date.now(),
      skinTemp: data.skinTemp,
      ambientTemp: data.ambientTemp,
      humidity: data.humidity,
      recommendation: data.recommendation || null,
      timestamp: new Date().toISOString(),
      deviceId: data.deviceId || 'ESP32-S3-001'
    };
    
    skincareData.unshift(record);
    if (skincareData.length > MAX_RECORDS) {
      skincareData = skincareData.slice(0, MAX_RECORDS);
    }
    
    return record;
  },

  getAll: (limit = 50) => {
    return skincareData.slice(0, limit);
  },

  getLatest: () => {
    return skincareData[0] || null;
  },

  getByTimeRange: (startTime, endTime) => {
    return skincareData.filter(record => {
      const timestamp = new Date(record.timestamp).getTime();
      return timestamp >= startTime && timestamp <= endTime;
    });
  },

  clear: () => {
    const count = skincareData.length;
    skincareData = [];
    return count;
  }
};

module.exports = Skincare;