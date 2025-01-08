import React from 'react';
import { SUPPORTED_NETWORKS } from '../../types/web3';
import { useWeb3Store } from '../../stores/web3Store';
import Tooltip from '../common/Tooltip';

const NetworkSelector: React.FC = () => {
  const { chainId, switchNetwork } = useWeb3Store();
  
  const currentNetwork = SUPPORTED_NETWORKS.find(n => n.chainId === chainId);

  return (
    <Tooltip content="Select which blockchain network to connect to">
      <select
        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-1 text-sm"
        value={chainId || ''}
        onChange={(e) => switchNetwork(Number(e.target.value))}
      >
        {!currentNetwork && <option value="">Select Network</option>}
        {SUPPORTED_NETWORKS.map((network) => (
          <option key={network.chainId} value={network.chainId}>
            {network.name}
          </option>
        ))}
      </select>
    </Tooltip>
  );
};

export default NetworkSelector;