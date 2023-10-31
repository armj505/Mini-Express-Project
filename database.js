// Install Mongo DB
const mongoose = require("mongoose");
require("dotenv").config();

// Connect Mongo DB using Mongo URL
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_URL);
    console.log("CONNECTED TO THE DATABASE");
  } catch (error) {
    console.log("NOT CONNECTED");
  }
};

// Export the function to the main app
module.exports = mongoDB;
