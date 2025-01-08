import { toast } from 'react-hot-toast';

export async function addTokenToMetaMask(
  tokenAddress: string, 
  symbol: string, 
  decimals: number
): Promise<boolean> {
  try {
    if (!window.ethereum?.isMetaMask) {
      throw new Error('MetaMask is not installed');
    }

    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: symbol,
          decimals: decimals,
          // Optional image URL can be added here if needed
        },
      },
    });

    if (wasAdded) {
      toast.success(`${symbol} token added to MetaMask`);
      return true;
    }
    return false;
  } catch (error: any) {
    if (error.code === 4001) {
      // User rejected the request
      return false;
    }
    console.error('Error adding token to MetaMask:', error);
    toast.error(error.message || 'Failed to add token to MetaMask');
    return false;
  }
}

export async function isMetaMaskConnected(): Promise<boolean> {
  try {
    if (!window.ethereum?.isMetaMask) return false;
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return Array.isArray(accounts) && accounts.length > 0;
  } catch {
    return false;
  }
}