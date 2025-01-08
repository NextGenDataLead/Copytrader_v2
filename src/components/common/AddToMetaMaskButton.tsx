import React from 'react';
import { addTokenToMetaMask } from '../../utils/metamask';
import Tooltip from './Tooltip';
import MetaMaskLogo from '../icons/MetaMaskLogo';
import { useWeb3Store } from '../../stores/web3Store';

interface AddToMetaMaskButtonProps {
  tokenAddress: string;
  symbol: string;
  decimals: number;
}

const AddToMetaMaskButton: React.FC<AddToMetaMaskButtonProps> = ({
  tokenAddress,
  symbol,
  decimals,
}) => {
  const { address } = useWeb3Store();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }
    await addTokenToMetaMask(tokenAddress, symbol, decimals);
  };

  return (
    <Tooltip content={`Add ${symbol} to MetaMask`}>
      <button
        onClick={handleClick}
        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <MetaMaskLogo className="w-4 h-4" />
      </button>
    </Tooltip>
  );
};

export default AddToMetaMaskButton;