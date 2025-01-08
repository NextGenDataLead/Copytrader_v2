import React from 'react';
import { TrendingUp } from 'lucide-react';
import Tooltip from '../../common/Tooltip';

interface PriceChangeProps {
  rateChange: number;
}

export const PriceChange: React.FC<PriceChangeProps> = ({ rateChange }) => {
  const isPositive = rateChange > 0;
  const formattedChange = Math.abs(rateChange) >= 1000 
    ? `${(Math.abs(rateChange) / 1000).toFixed(1)}K` 
    : Math.abs(rateChange).toFixed(1);

  return (
    <Tooltip content="Price change since swap execution">
      <div className="flex items-center space-x-1">
        <span className={`text-sm font-medium ${
          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          ({isPositive ? '+' : ''}{formattedChange}%)
        </span>
        <TrendingUp 
          className={`w-4 h-4 ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          } ${!isPositive ? 'transform rotate-180' : ''}`} 
        />
      </div>
    </Tooltip>
  );
};