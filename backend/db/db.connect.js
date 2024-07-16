require("dotenv").config({ path: "D:/meetupapp/backend/.env" });
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URL;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);
    if (connection) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

module.exports = { initializeDatabase };
