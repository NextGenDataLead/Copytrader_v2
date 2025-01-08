import { TrackedWallet } from '../types/trader';

const STORAGE_KEYS = {
  TRACKED_WALLETS: 'tracked_wallets',
} as const;

export function getStoredWallets(): TrackedWallet[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRACKED_WALLETS);
    if (!stored) return [];
    
    const wallets = JSON.parse(stored);
    // Convert stored date strings back to Date objects
    return wallets.map((wallet: any) => ({
      ...wallet,
      createdAt: new Date(wallet.createdAt),
    }));
  } catch (error) {
    console.error('Error loading stored wallets:', error);
    return [];
  }
}

export function storeWallets(wallets: TrackedWallet[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TRACKED_WALLETS, JSON.stringify(wallets));
  } catch (error) {
    console.error('Error storing wallets:', error);
  }
}