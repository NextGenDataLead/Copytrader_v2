import React from 'react';
import { ReactNode } from 'react';

interface RoadmapItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  status: 'upcoming' | 'development' | 'planned';
  quarter: string;
  position: 'left' | 'right';
}

export const RoadmapItem: React.FC<RoadmapItemProps> = ({
  icon,
  title,
  description,
  status,
  quarter,
  position
}) => {
  const statusColors = {
    upcoming: 'bg-yellow-500',
    development: 'bg-green-500',
    planned: 'bg-blue-500'
  };

  return (
    <div className={`flex ${position === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="w-1/2 px-8">
        <div className={`
          bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg
          transform transition-all duration-300 hover:scale-105
          ${position === 'right' ? 'ml-8' : 'mr-8'}
        `}>
          <div className="flex items-center mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full mr-4">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <div className="flex items-center mt-1 space-x-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {quarter}
                </span>
                <div className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[status]}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
      <div className="w-1/2" />
    </div>
  );
};