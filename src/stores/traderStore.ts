import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { TrackedWallet, Swap, CopyTradeConfig } from '../types/trader';
import { fetchSwapsForWallet } from '../services/swap';
import { useWeb3Store } from './web3Store';
import { normalizeAddress } from '../utils/address';
import { executeCopyTrade as executeSwap } from '../services/uniswap/swapService';
import { getStoredWallets, storeWallets } from '../utils/storage';
import { handleWeb3Error } from '../utils/errors';

interface TraderState {
  trackedWallets: TrackedWallet[];
  recentSwaps: Swap[];
  copyTradeConfig: CopyTradeConfig;
  isLoadingSwaps: boolean;
  
  addWallet: (address: string, label: string) => void;
  removeWallet: (address: string) => void;
  updateSwaps: () => Promise<void>;
  executeCopyTrade: (swapIds: string[], inputAmount: string) => Promise<void>;
}

export const useTraderStore = create<TraderState>((set, get) => ({
  trackedWallets: getStoredWallets(),
  recentSwaps: [],
  copyTradeConfig: {
    inputAmount: '',
    slippage: 0.5,
    selectedSwaps: [],
  },
  isLoadingSwaps: false,

  addWallet: (address: string, label: string) => {
    const normalizedAddress = normalizeAddress(address);
    const { trackedWallets, updateSwaps } = get();
    
    if (trackedWallets.some(w => normalizeAddress(w.address) === normalizedAddress)) {
      toast.error('Wallet already tracked');
      return;
    }

    const updatedWallets = [...trackedWallets, {
      address: normalizedAddress,
      label,
      createdAt: new Date(),
    }];

    set({ trackedWallets: updatedWallets });
    storeWallets(updatedWallets);
    toast.success('Wallet added successfully');
    updateSwaps();
  },

  removeWallet: (address: string) => {
    const normalizedAddress = normalizeAddress(address);
    const updatedWallets = get().trackedWallets.filter(
      w => normalizeAddress(w.address) !== normalizedAddress
    );

    set(state => ({
      trackedWallets: updatedWallets,
      recentSwaps: state.recentSwaps.filter(
        s => normalizeAddress(s.walletAddress) !== normalizedAddress
      ),
    }));

    storeWallets(updatedWallets);
    toast.success('Wallet removed successfully');
  },

  updateSwaps: async () => {
    const { provider } = useWeb3Store.getState();
    const { trackedWallets } = get();

    if (!provider) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      set({ isLoadingSwaps: true });
      
      const swapsPromises = trackedWallets.map(wallet => 
        fetchSwapsForWallet(normalizeAddress(wallet.address), provider)
      );
      
      const swapsArrays = await Promise.all(swapsPromises);
      const allSwaps = swapsArrays.flat();
      
      const sortedSwaps = allSwaps.sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      );
      
      const recentSwaps = sortedSwaps.slice(0, 50);
      set({ recentSwaps });
    } catch (error) {
      console.error('Failed to update swaps:', error);
      toast.error('Failed to update swaps');
    } finally {
      set({ isLoadingSwaps: false });
    }
  },

  executeCopyTrade: async (swapIds: string[], inputAmount: string) => {
    const loadingToast = toast.loading('Preparing transaction...');

    try {
      const { provider, address } = useWeb3Store.getState();
      if (!provider || !address) {
        toast.error('Please connect your wallet first', { id: loadingToast });
        return;
      }

      const swap = get().recentSwaps.find(s => s.id === swapIds[0]);
      if (!swap) {
        toast.error('Swap not found', { id: loadingToast });
        return;
      }

      const signer = await provider.getSigner();
      
      toast.loading('Waiting for confirmation...', { id: loadingToast });
      
      const tx = await executeSwap(
        swap.tokenIn.address,
        swap.tokenOut.address,
        inputAmount,
        get().copyTradeConfig.slippage,
        signer
      );

      toast.loading('Processing transaction...', { id: loadingToast });
      await tx.wait();
      
      toast.success('Trade executed successfully!', { id: loadingToast });
      await get().updateSwaps();
    } catch (error: any) {
      handleWeb3Error(error, 'Swap execution error');
      toast.dismiss(loadingToast);
    }
  },
}));