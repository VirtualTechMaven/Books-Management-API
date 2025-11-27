// config/db.js
const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Prevent Jest from being killed
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      throw err; // Let Jest handle the error
    }
  }
};

module.exports = connectDB;

