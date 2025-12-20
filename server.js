const express = require('express');
const cors = require('cors');
const os = require('os');

const connectDB = require('./src/config/db');

const gasRoutes = require('./src/routes/gasDetection');
const heartRateRoutes = require('./src/routes/heartRate');
const humanTempRoutes = require('./src/routes/humanTemp');
const roomTempRoutes = require('./src/routes/roomTemp');
const skinCareRoutes = require('./src/routes/skincare');
const sensorControlRoutes = require('./src/routes/sensorControl');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced logging middleware with colors and details
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  
  // Color codes for different methods
  const methodColors = {
    'GET': '\x1b[32m',    // Green
    'POST': '\x1b[34m',   // Blue
    'PUT': '\x1b[33m',    // Yellow
    'DELETE': '\x1b[31m'  // Red
  };
  const reset = '\x1b[0m';
  const color = methodColors[method] || reset;
  
  console.log(`${color}${timestamp} - ${method}${reset} ${path} from ${req.ip}`);
  
  // Log request body for POST requests (but not too verbose)
  if (method === 'POST' && req.body && Object.keys(req.body).length > 0) {
    console.log('  📦 Request Body:', JSON.stringify(req.body, null, 2));
  }
  
  next();
});

// Connect to MongoDB
connectDB();

// Register all routes
app.use('/api/gas', gasRoutes);
app.use('/api/heart', heartRateRoutes);
app.use('/api/human-temp', humanTempRoutes);
app.use('/api/room-temp', roomTempRoutes);
app.use('/api/skincare', skinCareRoutes);
app.use('/api/control', sensorControlRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ESP32 Sensor API Server & Smart Mirror Skin Care API Running 🪞',
    version: '1.0.0',
    uptime: process.uptime(),
    endpoints: {
      gasDetection: '/api/gas',
      heartRate: '/api/heart',
      humanTemp: '/api/human-temp',
      roomTemp: '/api/room-temp',
      skincareAnalyze: 'POST /api/skincare/analyze',
      skincareStatus: 'GET /api/skincare/status',
      control: '/api/control'
    }
  });
});


// Error handling
app.use((err, req, res, next) => {
  console.error('\x1b[31m❌ Error:\x1b[0m', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  console.log('\x1b[33m⚠️  404 Not Found:\x1b[0m', req.method, req.path);
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

// Enhanced IP detection - prioritize mobile hotspot
function getAllIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && !alias.internal) {
        ips.push({
          name: devName,
          address: alias.address,
          isMobileHotspot: alias.address.startsWith('192.168.137.')
        });
      }
    }
  }
  return ips;
}

function getPreferredIP() {
  const ips = getAllIPs();
  
  // Prioritize mobile hotspot (192.168.137.x)
  const hotspot = ips.find(ip => ip.isMobileHotspot);
  if (hotspot) return hotspot.address;
  
  // Otherwise return first available IP
  return ips[0]?.address || 'localhost';
}

// ⚡⚡⚡ Main fix here ⚡⚡⚡
// Instead of app.listen(PORT, '192.168.137.1', ...)
// Use '0.0.0.0' to listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {  
  const allIPs = getAllIPs();
  const preferredIP = getPreferredIP();
  
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║        ESP32 Sensor API Server Started                   ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  
  console.log(`\n✓ Server running on:`);
  console.log(`  - Local:   http://localhost:${PORT}`);
  console.log(`  - All IPs: http://0.0.0.0:${PORT} (listening on ALL network interfaces)`);
  
  // Show all available IPs
  console.log(`\n📡 Available Network Interfaces:`);
  allIPs.forEach(ip => {
    const indicator = ip.isMobileHotspot ? '🔥 HOTSPOT' : '  WiFi';
    const recommended = ip.address === preferredIP ? ' ← USE THIS FOR ESP32' : '';
    console.log(`  ${indicator}: http://${ip.address}:${PORT}${recommended}`);
  });
  
  console.log(`\n📝 Recommended IP for ESP32: ${preferredIP}`);
  
  console.log(`\n🎯 Available Endpoints:`);
  console.log(`  POST   /api/room-temp       - Room temperature data (DHT22)`);
  console.log(`  GET    /api/room-temp       - Get all room temp readings`);
  console.log(`  GET    /api/room-temp/latest - Get latest reading`);
  console.log(``);
  console.log(`  POST   /api/human-temp      - Human temperature data (MLX90614)`);
  console.log(`  GET    /api/human-temp/latest - Get latest reading`);
  console.log(``);
  console.log(`  POST   /api/gas             - Gas detection data (MQ135)`);
  console.log(`  GET    /api/gas/latest      - Get latest reading`);
  console.log(``);
  console.log(`  POST   /api/heart           - Heart rate data (MAX30105)`);
  console.log(`  GET    /api/heart/latest    - Get latest reading`);
  console.log(``);
  console.log(`  POST   /api/skincare        - Skincare data`);
  console.log(`  GET    /api/skincare/latest - Get latest reading`);
  console.log(``);
  console.log(`  GET    /api/control/status  - Get sensor enable/disable status`);
  console.log(`  POST   /api/control/enable-all   - Enable all sensors`);
  console.log(`  POST   /api/control/disable-all  - Disable all sensors`);
  console.log(`  POST   /api/control/sensor/:name - Enable/disable specific sensor`);
  console.log(`         Example: POST /api/control/sensor/dht22`);
  console.log(`         Body: {"enabled": true}`);
  
  console.log(`\n🎮 Control Individual Sensors:`);
  console.log(`  - dht22    (Room Temperature & Humidity)`);
  console.log(`  - mlx90614 (Human/Skin Temperature)`);
  console.log(`  - mq135    (Air Quality/Gas Detection)`);
  console.log(`  - max30105 (Heart Rate & Blood Pressure)`);
  
  console.log(`\n⏰ Waiting for ESP32 connection...`);
  console.log(`   (ESP32 checks every 5s, sends data every 10s)\n`);
  console.log('─'.repeat(60) + '\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Server shutting down gracefully...');
  process.exit(0);
});