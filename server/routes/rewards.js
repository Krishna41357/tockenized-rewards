const express = require("express");
const Reward = require("../models/Reward");
const Course = require("../models/Course");
const router = express.Router();

// Claim reward
router.post("/claim", async (req, res) => {
  try {
    const { student, courseId } = req.body;

    if (!student || !courseId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if reward is already claimed
    const existingReward = await Reward.findOne({ student, courseId });
    if (existingReward) {
      return res.status(400).json({ message: "Reward already claimed!" });
    }

    const newReward = new Reward({ student, courseId, rewardClaimed: true });
    await newReward.save();

    res.json({ message: "Reward Claimed!", reward: newReward });
  } catch (error) {
    console.error("Error claiming reward:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
