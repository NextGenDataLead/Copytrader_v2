import React from 'react';
import { TabbedTrader } from '../trader/TabbedTrader';

export const Hero: React.FC = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            DappAstra Copy Trader
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track and copy trades from successful traders. Add wallets to monitor
            and easily replicate their successful trading strategies.
            <br /><br />
            Currently only implemented for Uniswap V2
          </p>
        </div>

        <TabbedTrader />
      </div>
    </div>
  );
};

export default Hero;