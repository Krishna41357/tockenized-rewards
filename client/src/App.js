import React, { useState, useEffect } from 'react';
import { AptosClient } from 'aptos';

function App() {
  const [wallet, setWallet] = useState(null);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [completionReward, setCompletionReward] = useState(100);
  const [courseCreatorAddress, setCourseCreatorAddress] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';
  const MODULE_ADDRESS = '0xc8a52a71eb01c6b890bd0c7043a423d1e0beeffb41add865dc296ff0008c8982';
  const MODULE_NAME = 'Reward';

  useEffect(() => {
    const initClient = async () => {
      try {
        const aptosClient = new AptosClient(NODE_URL);
        setClient(aptosClient);
      } catch (error) {
        setStatusMessage(`Error initializing client: ${error.message}`);
      }
    };
    initClient();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.aptos) {
        setStatusMessage('Petra Wallet extension not found! Please install it.');
        return;
      }
      await window.aptos.connect();
      const account = await window.aptos.account();
      setWallet({
        address: `0x${account.address.replace(/^0x/, '')}`,
        publicKey: account.publicKey
      });
      setIsConnected(true);
      setStatusMessage(`Connected: ${wallet.address}`);
    } catch (error) {
      setStatusMessage(`Error connecting wallet: ${error.message}`);
    }
  };

  const createCourse = async () => {
    if (!isConnected || !client) {
      setStatusMessage('Please connect your wallet first');
      return;
    }
    try {
      setStatusMessage('Creating course...');
      const payload = {
        type: 'entry_function_payload',
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::create_course`,
        type_arguments: [],
        arguments: [completionReward]
      };
      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setCourseCreatorAddress(wallet.address);
      setStatusMessage(`Course created successfully! TX: ${response.hash}`);
    } catch (error) {
      setStatusMessage(`Error creating course: ${error.message}`);
    }
  };

  const enrollInCourse = async () => {
    if (!isConnected || !client) {
      setStatusMessage('Please connect your wallet first');
      return;
    }
    try {
      setStatusMessage('Enrolling in course...');
      const payload = {
        type: 'entry_function_payload',
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::enroll`,
        type_arguments: [],
        arguments: [wallet.address]
      };
      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setIsEnrolled(true);
      setEnrolledCount(enrolledCount + 1);
      setStatusMessage(`Enrolled successfully! TX: ${response.hash}`);
    } catch (error) {
      setStatusMessage(`Error enrolling in course: ${error.message}`);
    }
  };

  const requestReward = async () => {
    if (!isConnected || !client || !courseCreatorAddress) {
      setStatusMessage('Invalid course creator address or wallet not connected');
      return;
    }
    try {
      setStatusMessage('Requesting reward...');
      const payload = {
        type: 'entry_function_payload',
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::request_course_completion_reward`,
        type_arguments: [],
        arguments: [courseCreatorAddress]
      };
      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setStatusMessage(`Reward request submitted! TX: ${response.hash}`);
    } catch (error) {
      setStatusMessage(`Error requesting reward: ${error.message}`);
    }
  };

  const approveReward = async () => {
    if (!isConnected || !client || !studentAddress) {
      setStatusMessage('Invalid student address or wallet not connected');
      return;
    }
    try {
      setStatusMessage('Approving reward transfer...');
      const payload = {
        type: 'entry_function_payload',
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::approve_and_transfer_reward`,
        type_arguments: [],
        arguments: [studentAddress]
      };
      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setStatusMessage(`Reward approved and sent! TX: ${response.hash}`);
    } catch (error) {
      setStatusMessage(`Error approving reward: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Aptos Course Rewards Platform</h1>
      {!isConnected ? (
        <button onClick={connectWallet} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg">Connect Wallet</button>
      ) : (
        <p>Connected: {wallet.address}</p>
      )}
      <button onClick={createCourse} className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg">Create Course</button>
      <button onClick={enrollInCourse} className="mt-4 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-lg">Enroll</button>
      <button onClick={requestReward} className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg">Request Reward</button>
      <input type="text" placeholder="Enter student address" onChange={(e) => setStudentAddress(`0x${e.target.value.replace(/^0x/, '')}`)} className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none" />
      <button onClick={approveReward} className="mt-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg">Approve Reward</button>
    </div>
  );
}
export default App;