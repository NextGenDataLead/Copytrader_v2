import React from 'react';
import { Rocket } from 'lucide-react';

export const RoadmapHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-4">
        <Rocket className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Product Roadmap
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Our vision for the future of DappAstra Copy Trader. We're constantly evolving
        to bring you the best trading experience.
      </p>
    </div>
  );
};