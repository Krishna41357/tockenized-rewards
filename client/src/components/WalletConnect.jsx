import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const WalletConnect = () => {
  const { connect, account, disconnect, connected } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    console.log("Checking wallet availability...");
    
    if (!window.aptos) {
      console.error("No Aptos wallet found!");
      alert("No Aptos wallet found! Install Petra Wallet.");
      setLoading(false);
      return;
    }
  
    try {
      console.log("Attempting to connect...");
      await connect("Petra"); // Force connect to Petra wallet
      console.log("Connected successfully!");
    } catch (error) {
      console.error("Connection failed:", error);
    }
    setLoading(false);
  };
  

  return (
    <div className="p-6 bg-white shadow-md rounded-lg text-center">
      {connected ? (
        <div>
          <p className="text-green-500 text-lg">Connected</p>
          <p className="text-gray-700">Address: {account?.address?.toString()}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
