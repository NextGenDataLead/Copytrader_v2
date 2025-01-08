import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useTraderStore } from '../../stores/traderStore';
import { isValidEVMAddress } from '../../utils/validation';
import Tooltip from '../common/Tooltip';

const WalletManager: React.FC = () => {
  const { trackedWallets, addWallet, removeWallet } = useTraderStore();
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setNewAddress(address);
    
    if (address && !isValidEVMAddress(address)) {
      setAddressError('Please enter a valid EVM address');
    } else {
      setAddressError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEVMAddress(newAddress)) {
      setAddressError('Please enter a valid EVM address');
      return;
    }
    if (newAddress && newLabel) {
      addWallet(newAddress, newLabel);
      setNewAddress('');
      setNewLabel('');
      setAddressError('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Tracked Wallets
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <Tooltip content="Enter the Ethereum address you want to track">
            <input
              type="text"
              value={newAddress}
              onChange={handleAddressChange}
              placeholder="Wallet Address (0x...)"
              className={`w-full px-4 py-2 rounded-md border ${
                addressError 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
          </Tooltip>
          {addressError && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {addressError}
            </p>
          )}
        </div>
        <div>
          <Tooltip content="Add a memorable label for this wallet">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Wallet Label"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </Tooltip>
        </div>
        <Tooltip content="Add this wallet to your tracking list">
          <button
            type="submit"
            disabled={!newAddress || !newLabel || !!addressError}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Wallet</span>
          </button>
        </Tooltip>
      </form>

      <div className="space-y-2">
        {trackedWallets.map((wallet) => (
          <div
            key={wallet.address}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{wallet.label}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.address}</p>
            </div>
            <Tooltip content="Remove this wallet from tracking">
              <button
                onClick={() => removeWallet(wallet.address)}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletManager;