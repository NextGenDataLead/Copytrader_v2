import { ethers } from 'ethers';
import { TokenInfo, Swap } from '../../types/trader';

export interface TransactionProcessor {
  processTransaction: (
    tx: any,
    receipt: ethers.TransactionReceipt,
    provider: ethers.Provider,
    index: number
  ) => Promise<Swap | null>;
}

export interface SwapTransaction {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  input: string;
  isError: string;
}