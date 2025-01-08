import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingState: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-center">
    <Loader className="w-6 h-6 animate-spin text-gray-500 dark:text-gray-400" />
    <span className="ml-2 text-gray-600 dark:text-gray-300">Loading swaps...</span>
  </div>
);