import React from 'react';
import { ExternalLink, Wallet, Droplets } from 'lucide-react';
import { formatDate } from '../../../utils/format/date';
import Tooltip from '../../common/Tooltip';

interface SwapHeaderProps {
  timestamp: Date;
  txHash: string;
  walletLabel: string;
  walletAddress: string;
  poolAddress?: string;
}

export const SwapHeader: React.FC<SwapHeaderProps> = ({ 
  timestamp, 
  txHash, 
  walletLabel,
  walletAddress,
  poolAddress 
}) => (
  <div className="flex items-start justify-between">
    <div className="flex flex-col gap-4">
      <Tooltip content="When this trade was executed">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(timestamp)}
        </span>
      </Tooltip>
      <Tooltip content="View wallet details on Etherscan">
        <a
          href={`https://etherscan.io/address/${walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>{walletLabel}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </Tooltip>
    </div>
    <div className="flex items-center space-x-3">
      {poolAddress && poolAddress !== '0x0000000000000000000000000000000000000000' && (
        <Tooltip content="View detailed pool analytics on DexScreener">
          <a
            href={`https://dexscreener.com/ethereum/${poolAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            <Droplets className="w-4 h-4" />
            <span>Pool on DexScreener</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Tooltip>
      )}
      <Tooltip content="View transaction details on Etherscan">
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          <span>Transaction</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </Tooltip>
    </div>
  </div>
);