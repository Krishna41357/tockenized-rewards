import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { APTOS_NODE_URL, MODULE_ADDRESS } from "../config";

const ClaimReward = () => {
  const { account, signAndSubmitTransaction } = useWallet();

  const claimReward = async () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const transaction = {
        arguments: [], // Use own address
        function: `${MODULE_ADDRESS}::CourseRewards::claim_course_completion_reward`,
        type: "entry_function_payload",
        type_arguments: [],
      };

      const response = await signAndSubmitTransaction(transaction);
      alert(`Reward Claimed! Txn: ${response.hash}`);
      

    } catch (error) {
      console.error("Error claiming reward:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Claim Course Reward</h2>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={claimReward}
      >
        Claim Reward
      </button>
    </div>
  );
};

export default ClaimReward;
