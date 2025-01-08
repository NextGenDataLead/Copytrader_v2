import { create } from 'zustand';
import { BrowserProvider, ethers } from 'ethers';
import { Web3State } from '../types/web3';
import { toast } from 'react-hot-toast';
import { isMetaMaskConnected } from '../utils/metamask';
import { ensureEthereumNetwork } from '../utils/network';

export const useWeb3Store = create<Web3State>((set, get) => ({
  provider: null,
  address: null,
  chainId: null,
  isConnecting: false,
  error: null,

  connect: async () => {
    const state = get();
    if (state.isConnecting) return;

    try {
      set({ isConnecting: true, error: null });

      if (!window.ethereum?.isMetaMask) {
        throw new Error('Please install MetaMask to connect');
      }

      // Ensure we're on Ethereum network
      const isCorrectNetwork = await ensureEthereumNetwork();
      if (!isCorrectNetwork) {
        set({ isConnecting: false });
        return;
      }

      // Check if already connected
      const isConnected = await isMetaMaskConnected();
      if (isConnected && state.address) {
        set({ isConnecting: false });
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask');
      }

      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      window.ethereum.removeAllListeners?.();
      window.ethereum.on('accountsChanged', get().handleAccountsChanged);
      window.ethereum.on('chainChanged', get().handleChainChanged);
      window.ethereum.on('disconnect', get().handleDisconnect);

      set({
        provider,
        address: accounts[0],
        chainId,
        isConnecting: false,
        error: null
      });

    } catch (error: any) {
      console.error('Connection error:', error);
      
      if (error.code === 4001) {
        toast.error('Please approve the connection request');
      } else {
        toast.error(error.message || 'Failed to connect wallet');
      }

      set({ 
        provider: null,
        address: null,
        chainId: null,
        error: error.message,
        isConnecting: false 
      });
    }
  },

  disconnect: () => {
    if (window.ethereum) {
      window.ethereum.removeAllListeners?.();
    }
    
    set({
      provider: null,
      address: null,
      chainId: null,
      error: null,
      isConnecting: false,
    });
  },

  handleAccountsChanged: (accounts: string[]) => {
    if (accounts.length === 0) {
      get().disconnect();
    } else if (accounts[0] !== get().address) {
      set({ address: accounts[0] });
    }
  },

  handleChainChanged: async (chainId: string) => {
    // Ensure we stay on Ethereum network
    await ensureEthereumNetwork();
  },

  handleDisconnect: () => {
    get().disconnect();
  },
}));