import React from 'react';
import { Clock } from 'lucide-react';
import Tooltip from '../../common/Tooltip';
import { formatPercentage } from '../../../utils/format/percentage';

interface PriceChangesProps {
  changes: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
}

export const PriceChanges: React.FC<PriceChangesProps> = ({ changes }) => {
  const timeframes = [
    { key: 'm5', label: '5m', value: changes.m5 },
    { key: 'h1', label: '1h', value: changes.h1 },
    { key: 'h6', label: '6h', value: changes.h6 },
    { key: 'h24', label: '24h', value: changes.h24 },
  ];

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-gray-400" />
      <div className="flex gap-2">
        {timeframes.map(({ key, label, value }) => (
          <Tooltip key={key} content={`Price change in the last ${label}`}>
            <div className="px-3 py-1.5 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                {label}
              </div>
              <div className={`text-sm font-medium ${
                value > 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {value > 0 ? '+' : ''}{formatPercentage(value)}
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};