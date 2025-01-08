import { toast } from 'react-hot-toast';

const ETHEREUM_CHAIN_ID = '0x1'; // Mainnet

export async function ensureEthereumNetwork(): Promise<boolean> {
  if (!window.ethereum?.isMetaMask) {
    toast.error('Please install MetaMask to continue');
    return false;
  }

  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    if (chainId !== ETHEREUM_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ETHEREUM_CHAIN_ID }],
        });
        return true;
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          toast.error('Please add Ethereum network to MetaMask');
        } else if (switchError.code === 4001) {
          toast.error('Please switch to Ethereum network');
        } else {
          toast.error('Failed to switch network');
        }
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Network check error:', error);
    return false;
  }
}