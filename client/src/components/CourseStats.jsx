import React, { useEffect, useState } from "react";
import { Aptos } from "@aptos-labs/ts-sdk";
import { APTOS_NODE_URL, MODULE_ADDRESS } from "../config";

const CourseStats = () => {
  const [enrolled, setEnrolled] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        console.log("📡 Fetching enrolled courses...");

        const aptosClient = new Aptos({ nodeUrl: APTOS_NODE_URL });
        
        // ✅ Explicitly checking if function exists
        const functionPath = `${MODULE_ADDRESS}::CourseRewards::get_course_enrolled`;
        console.log("🛠 Calling Function:", functionPath);

        const response = await aptosClient.view({
          function: functionPath,
          type_arguments: [],
          arguments: [], 
        });
        

        console.log("🔍 Raw Response:", response);
        window.latestResponse = response; // Debugging support

        if (!response || response.length === 0) {
          console.warn("⚠️ No data returned. Setting enrolled to 0.");
          setEnrolled(0);
        } else {
          setEnrolled(response[0] ?? 0); // Prevent undefined
        }
      } catch (err) {
        console.error("❌ Error fetching enrolled count:", err);
        setError("Failed to load enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Stats</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Total Enrolled: {enrolled !== null ? enrolled : "No data"}</p>
      )}
    </div>
  );
};

export default CourseStats;
