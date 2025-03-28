const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  creator: String, // Wallet Address
  completionReward: Number, // Reward in AptosCoins
  totalEnrolled: Number
});

module.exports = mongoose.model("Course", CourseSchema);
