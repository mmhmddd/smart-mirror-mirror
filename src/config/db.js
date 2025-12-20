const mongoose = require('mongoose');
;
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/SkincareDB');
    console.log('✅ MongoDB Connected Successfully - Skincare DB');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;