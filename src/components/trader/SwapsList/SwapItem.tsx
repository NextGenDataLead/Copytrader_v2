import React from 'react';
import { Swap } from '../../../types/trader';
import { formatAmount } from '../../../utils/format';
import { SwapHeader } from './SwapHeader';
import { SwapMetrics } from './SwapMetrics';
import { CopyTradeInput } from './CopyTradeInput';
import { useTraderStore } from '../../../stores/traderStore';
import { normalizeAddress } from '../../../utils/address';
import AddToMetaMaskButton from '../../common/AddToMetaMaskButton';

interface SwapItemProps {
  swap: Swap;
}

export const SwapItem: React.FC<SwapItemProps> = ({ swap }) => {
  const { trackedWallets } = useTraderStore();
  const walletInfo = trackedWallets.find(
    w => normalizeAddress(w.address) === normalizeAddress(swap.walletAddress)
  );

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3 max-w-2xl mx-auto">
      <SwapHeader 
        timestamp={swap.timestamp}
        txHash={swap.txHash}
        walletLabel={walletInfo?.label || 'Unknown Wallet'}
        walletAddress={swap.walletAddress}
        poolAddress={swap.metrics.poolAddress}
      />

      {/* Swap Details */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-gray-500 dark:text-gray-400">From</div>
            {/* <AddToMetaMaskButton
              tokenAddress={swap.tokenIn.address}
              symbol={swap.tokenIn.symbol}
              decimals={swap.tokenIn.decimals}
            /> */}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-medium text-gray-900 dark:text-white">
              {formatAmount(swap.tokenIn.amount)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {swap.tokenIn.symbol}
            </span>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-gray-500 dark:text-gray-400">To</div>
            {/* <AddToMetaMaskButton
              tokenAddress={swap.tokenOut.address}
              symbol={swap.tokenOut.symbol}
              decimals={swap.tokenOut.decimals}
            /> */}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-medium text-gray-900 dark:text-white">
              {formatAmount(swap.tokenOut.amount)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {swap.tokenOut.symbol}
            </span>
          </div>
        </div>
      </div>

      <SwapMetrics 
        metrics={swap.metrics}
        inSymbol={swap.tokenIn.symbol}
        outSymbol={swap.tokenOut.symbol}
      />

      <CopyTradeInput swapId={swap.id} tokenIn={swap.tokenIn} />
    </div>
  );
};