const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// Fetch all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().lean();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new course
router.post("/create", async (req, res) => {
  try {
    const { creator, completionReward } = req.body;

    if (!creator || !completionReward || completionReward <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const newCourse = new Course({ creator, completionReward, totalEnrolled: 0 });
    await newCourse.save();

    res.json({ message: "Course created!", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
  
