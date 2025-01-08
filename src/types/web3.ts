import { BrowserProvider } from 'ethers';

export interface Web3State {
  provider: BrowserProvider | null;
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const ETHEREUM_CHAIN_ID = 1; // Mainnet