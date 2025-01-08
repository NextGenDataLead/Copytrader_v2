import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { useTraderStore } from '../../../stores/traderStore';
import { TokenInfo } from '../../../types/trader';
import Tooltip from '../../common/Tooltip';

interface CopyTradeInputProps {
  swapId: string;
  tokenIn: TokenInfo;
}

export const CopyTradeInput: React.FC<CopyTradeInputProps> = ({ swapId, tokenIn }) => {
  const [inputAmount, setInputAmount] = useState('');
  const { executeCopyTrade } = useTraderStore();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or valid numbers with up to 6 decimal places
    if (value === '' || /^\d*\.?\d{0,6}$/.test(value)) {
      setInputAmount(value);
    }
  };

  const handleExecuteTrade = async () => {
    if (!inputAmount || isNaN(Number(inputAmount))) {
      return;
    }
    await executeCopyTrade([swapId], inputAmount);
    setInputAmount('');
  };

  return (
    <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <Tooltip content={`Enter the amount of ${tokenIn.symbol} you want to trade (up to 6 decimal places)`}>
            <input
              type="text"
              inputMode="decimal"
              value={inputAmount}
              onChange={handleAmountChange}
              placeholder={`Amount in ${tokenIn.symbol}`}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-600/20 transition-all duration-200"
            />
          </Tooltip>
        </div>
        <Tooltip content={`Execute this trade with ${inputAmount || 'your specified'} ${tokenIn.symbol}`}>
          <button
            onClick={handleExecuteTrade}
            disabled={!inputAmount || isNaN(Number(inputAmount))}
            className="flex items-center px-6 py-2.5 space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Execute Trade</span>
          </button>
        </Tooltip>
      </div>
      <p className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
        Execute this trade with your specified amount and settings
      </p>
    </div>
  );
};

export default CopyTradeInput;