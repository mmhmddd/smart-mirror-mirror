const axios = require('axios');
const ESP32_IP = "http://192.168.1.60"; // Example

exports.getGasData = async () => {
  try {
    const res = await axios.get(`${ESP32_IP}/gas`);
    return res.data;
  } catch (error) {
    return { error: true, message: "ESP32 unreachable", details: error.message };
  }
};
