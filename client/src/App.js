import React from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import HomePage from "./components/HomePage";
import CreateCourse from "./components/CreateCourse";
import ClaimReward from "./components/ClaimReward";

const App = () => {
  return (
    <AptosWalletAdapterProvider>
      <HomePage />
      <CreateCourse/>
      <ClaimReward/>
    </AptosWalletAdapterProvider>
  );
};

export default App;
    
