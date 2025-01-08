import React from 'react';

export const EmptyState: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      Recent Swaps
    </h2>
    <p className="text-gray-600 dark:text-gray-300 text-center py-4">
      No swaps found. Add a wallet to start tracking trades.
    </p>
  </div>
);