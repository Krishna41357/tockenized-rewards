import React, { useState } from "react";

const CreateCourse = ({ walletAddress, addCourse }) => {
  const [completionReward, setCompletionReward] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!walletAddress) {
      setMessage("Wallet not connected!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/courses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creator: walletAddress,
          completionReward: Number(completionReward),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Course created successfully!");
        setCompletionReward("");

        // ✅ Update course list in parent
        addCourse({
          creator: walletAddress,
          completionReward: Number(completionReward),
        });
      } else {
        setMessage(data.message || "Error creating course.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error, try again later.");
    }

    setLoading(false);
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Course</h2>
      <form onSubmit={handleCreateCourse}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Completion Reward (AptosCoins)
          </label>
          <input
            type="number"
            value={completionReward}
            onChange={(e) => setCompletionReward(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-gray-700 font-semibold">{message}</p>
      )}
    </div>
  );
};

export default CreateCourse;
