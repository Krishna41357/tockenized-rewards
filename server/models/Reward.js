const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
  student: String, // Wallet Address
  courseId: String, // Reference to Course
  rewardClaimed: Boolean
});

module.exports = mongoose.model("Reward", RewardSchema);
