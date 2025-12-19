let roomTempData = [];
const MAX_RECORDS = 1000;

const RoomTemp = {
  create: (data) => {
    const record = {
      id: Date.now(),
      temperature: data.temperature,
      humidity: data.humidity,
      unit: data.unit || 'C',
      timestamp: new Date().toISOString(),
      deviceId: data.deviceId || 'ESP32-S3-001'
    };
    
    roomTempData.unshift(record);
    if (roomTempData.length > MAX_RECORDS) {
      roomTempData = roomTempData.slice(0, MAX_RECORDS);
    }
    
    return record;
  },

  getAll: (limit = 50) => {
    return roomTempData.slice(0, limit);
  },

  getLatest: () => {
    return roomTempData[0] || null;
  },

  getByTimeRange: (startTime, endTime) => {
    return roomTempData.filter(record => {
      const timestamp = new Date(record.timestamp).getTime();
      return timestamp >= startTime && timestamp <= endTime;
    });
  },

  clear: () => {
    const count = roomTempData.length;
    roomTempData = [];
    return count;
  }
};

module.exports = RoomTemp;
