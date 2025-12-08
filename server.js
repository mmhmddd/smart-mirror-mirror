const express = require('express');
const cors = require('cors');

const gasRoutes = require('./src/routes/gasDetection');
const heartRateRoutes = require('./src/routes/heartRate');
const humanTempRoutes = require('./src/routes/humanTemp');
const roomTempRoutes = require('./src/routes/roomTemp');
const skinCareRoutes = require('./src/routes/skincare');

const app = express();
app.use(cors());
app.use(express.json());

// Register all routes
app.use('/api/gas', gasRoutes);
app.use('/api/heart', heartRateRoutes);
app.use('/api/human-temp', humanTempRoutes);
app.use('/api/room-temp', roomTempRoutes);
app.use('/api/skincare', skinCareRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
