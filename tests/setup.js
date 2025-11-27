const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI_TEST);
    } catch (err) {
      console.error("Test DB connection error:", err);
      throw err;
    }
  },

  closeDatabase: async () => {
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    } catch (err) {
      console.error("Error closing test DB:", err);
      throw err;
    }
  },

  clearDatabase: async () => {
    try {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
    } catch (err) {
      console.error("Error clearing test DB:", err);
      throw err;
    }
  }
};
