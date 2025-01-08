import React from 'react';
import { useTraderStore } from '../../../stores/traderStore';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
import { SwapItem } from './SwapItem';

export const SwapsList: React.FC = () => {
  const { recentSwaps, isLoadingSwaps } = useTraderStore();

  if (isLoadingSwaps) {
    return <LoadingState />;
  }

  if (recentSwaps.length === 0) {
    return <EmptyState />;
  }

  const sortedSwaps = [...recentSwaps].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="space-y-4">
      {sortedSwaps.map((swap) => (
        <SwapItem key={swap.id} swap={swap} />
      ))}
    </div>
  );
};