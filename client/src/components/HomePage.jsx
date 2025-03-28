import React, { useEffect, useState } from "react";
import { BACKEND_API } from "../config";
import WalletConnect from "./WalletConnect";

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!BACKEND_API) {
      console.error("Backend API URL is not set");
      return;
    }
  
    fetch(`${BACKEND_API}/courses`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then(setCourses)
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Tokenized Rewards</h1>
      <WalletConnect />

      <h2 className="mt-8 text-2xl font-semibold">Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id} className="p-2 bg-white shadow-md mt-2">
            {course.creator} - {course.completionReward} AptosCoins
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
