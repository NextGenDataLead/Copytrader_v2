import React from 'react';
import { Wallet } from 'lucide-react';
import { useWeb3Store } from '../../stores/web3Store';
import Tooltip from '../common/Tooltip';

const WalletConnect: React.FC = () => {
  const { address, isConnecting, connect, disconnect } = useWeb3Store();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnecting) {
    return (
      <Tooltip content="Connecting to your Web3 wallet...">
        <button
          disabled
          className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-lg"
        >
          <span>Connecting...</span>
        </button>
      </Tooltip>
    );
  }

  if (address) {
    return (
      <Tooltip content="Click to disconnect your wallet">
        <button
          onClick={disconnect}
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <span>{formatAddress(address)}</span>
        </button>
      </Tooltip>
    );
  }

  return (
    <Tooltip content="Connect your Web3 wallet to interact with the blockchain">
      <button
        onClick={connect}
        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        <Wallet className="h-5 w-5" />
        <span>Connect Wallet</span>
      </button>
    </Tooltip>
  );
};

export default WalletConnect;