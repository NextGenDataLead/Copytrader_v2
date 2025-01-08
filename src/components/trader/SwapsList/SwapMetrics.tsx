import React from 'react';
import { SwapMetrics as SwapMetricsType } from '../../../types/trader';
import { PriceChange } from './PriceChange';
import { PoolStats } from './PoolStats';

interface SwapMetricsProps {
  metrics: SwapMetricsType;
  inSymbol: string;
  outSymbol: string;
}

export const SwapMetrics: React.FC<SwapMetricsProps> = ({ 
  metrics,
  inSymbol,
  outSymbol 
}) => {
  // Calculate inverse rates for display (outToken/inToken)
  const executionRateDisplay = 1 / metrics.executionRate;
  const currentRateDisplay = 1 / metrics.currentRate;

  // Calculate percentage change
  const rateChange = metrics.currentRate > 0 && metrics.executionRate > 0
    ? ((currentRateDisplay - executionRateDisplay) / executionRateDisplay) * 100
    : 0;

  return (
    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
      <div className="flex justify-end mb-2">
        <PriceChange rateChange={rateChange} />
      </div>
      <PoolStats 
        liquidityUSD={metrics.liquidityUSD}
        volume24h={metrics.volume24h}
        fdv={metrics.fdv}
        marketCap={metrics.marketCap}
        pairCreatedAt={metrics.pairCreatedAt}
        priceChanges={metrics.priceChanges}
      />
    </div>
  );
};