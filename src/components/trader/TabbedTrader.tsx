import React, { useState, useEffect } from 'react';
import { Wallet, ArrowLeftRight } from 'lucide-react';
import WalletManager from './WalletManager';
import { SwapsList } from './SwapsList/index';
import { useTraderStore } from '../../stores/traderStore';
import { useWeb3Store } from '../../stores/web3Store';

type Tab = 'swaps' | 'wallets';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'swaps', label: 'Recent Swaps', icon: <ArrowLeftRight className="w-4 h-4" /> },
  { id: 'wallets', label: 'Tracked Wallets', icon: <Wallet className="w-4 h-4" /> },
];

export const TabbedTrader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('swaps');
  const { updateSwaps, trackedWallets } = useTraderStore();
  const { address } = useWeb3Store();

  useEffect(() => {
    if (address && trackedWallets.length > 0) {
      updateSwaps();
    }
  }, [address, trackedWallets.length]);

  return (
    <div className="space-y-3"> {/* Reduced from space-y-4 */}
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]"> {/* Reduced from min-h-[600px] */}
        {activeTab === 'swaps' ? <SwapsList /> : <WalletManager />}
      </div>
    </div>
  );
};