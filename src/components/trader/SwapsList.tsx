import React from 'react';
import { ExternalLink, Copy, Loader } from 'lucide-react';
import { useTraderStore } from '../../stores/traderStore';
import { formatDate } from '../../utils/date';
import { formatAmount } from '../../utils/format';
import Tooltip from '../common/Tooltip';

const SwapsList: React.FC = () => {
  const { recentSwaps, isLoadingSwaps } = useTraderStore();

  if (isLoadingSwaps) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin text-gray-500 dark:text-gray-400" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading swaps...</span>
      </div>
    );
  }

  if (recentSwaps.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Swaps
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center py-8">
          No swaps found. Add a wallet to start tracking trades.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Recent Swaps
      </h2>

      <div className="space-y-4">
        {recentSwaps.map((swap) => (
          <div
            key={swap.id}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(swap.timestamp)}
              </span>
              <Tooltip content="View transaction on blockchain explorer">
                <a
                  href={`https://etherscan.io/tx/${swap.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">From</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatAmount(swap.tokenIn.amount)} {swap.tokenIn.symbol}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">To</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatAmount(swap.tokenOut.amount)} {swap.tokenOut.symbol}
                </p>
              </div>
            </div>

            <Tooltip content="Copy this trade with your settings">
              <button className="w-full mt-2 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                <Copy className="w-4 h-4" />
                <span>Copy Trade</span>
              </button>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};