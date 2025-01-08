import React from 'react';
import { formatUSD } from '../../../utils/format/currency';
import { formatDate } from '../../../utils/format/date';
import { PriceChanges } from './PriceChanges';
import Tooltip from '../../common/Tooltip';

interface PoolStatsProps {
  liquidityUSD: number;
  volume24h?: number;
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: Date;
  priceChanges?: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
}

export const PoolStats: React.FC<PoolStatsProps> = ({
  liquidityUSD,
  volume24h,
  fdv,
  marketCap,
  pairCreatedAt,
  priceChanges,
}) => {
  return (
    <div className="space-y-3">
      {priceChanges && (
        <PriceChanges changes={priceChanges} />
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
        <Tooltip content="Total value locked in the liquidity pool">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Liquidity</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {formatUSD(liquidityUSD)}
            </p>
          </div>
        </Tooltip>

        <Tooltip content="24-hour trading volume">
          <div>
            <p className="text-gray-500 dark:text-gray-400">24h Volume</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {volume24h ? formatUSD(volume24h) : '...'}
            </p>
          </div>
        </Tooltip>

        <Tooltip content="Fully Diluted Valuation">
          <div>
            <p className="text-gray-500 dark:text-gray-400">FDV</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {fdv ? formatUSD(fdv) : '...'}
            </p>
          </div>
        </Tooltip>

        <Tooltip content="Market Capitalization">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {marketCap ? formatUSD(marketCap) : '...'}
            </p>
          </div>
        </Tooltip>

        <Tooltip content="When this trading pair was created">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Pair Created</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {pairCreatedAt ? formatDate(pairCreatedAt) : '...'}
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};