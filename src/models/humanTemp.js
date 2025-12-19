let humanTempData = [];
const MAX_RECORDS = 1000;

const HumanTemp = {
  create: (data) => {
    const record = {
      id: Date.now(),
      objectTemp: data.objectTemp,
      ambientTemp: data.ambientTemp,
      unit: data.unit || 'C',
      timestamp: new Date().toISOString(),
      deviceId: data.deviceId || 'ESP32-S3-001'
    };
    
    humanTempData.unshift(record);
    if (humanTempData.length > MAX_RECORDS) {
      humanTempData = humanTempData.slice(0, MAX_RECORDS);
    }
    
    return record;
  },

  getAll: (limit = 50) => {
    return humanTempData.slice(0, limit);
  },

  getLatest: () => {
    return humanTempData[0] || null;
  },

  getByTimeRange: (startTime, endTime) => {
    return humanTempData.filter(record => {
      const timestamp = new Date(record.timestamp).getTime();
      return timestamp >= startTime && timestamp <= endTime;
    });
  },

  clear: () => {
    const count = humanTempData.length;
    humanTempData = [];
    return count;
  }
};

module.exports = HumanTemp;