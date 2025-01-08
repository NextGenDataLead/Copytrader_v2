import { ethers } from 'ethers';
import { Swap } from '../../types/trader';
import { getProvider } from '../provider';
import { fetchWalletTransactions } from '../etherscan';
import { getMockSwaps } from '../mockData';
import { ENV } from '../../config/env';
import { SwapTransactionProcessor } from './transactionProcessor';

const BLOCKS_PER_DAY = 7200; // ~12 seconds per block
const DAYS_TO_FETCH = 30;

const isSwapTransaction = (input: string): boolean => {
  const swapSignatures = [
    '0x38ed1739', // swapExactTokensForTokens
    '0x7ff36ab5', // swapExactETHForTokens
    '0x18cbafe5', // swapExactTokensForETH
    '0x8803dbee', // swapTokensForExactTokens
    '0xfb3bdb41', // swapETHForExactTokens
    '0x4a25d94a', // swapTokensForExactETH
    '0xb6f9de95', // swapExactTokensForTokensSupportingFeeOnTransferTokens
    '0x791ac947', // swapExactETHForTokensSupportingFeeOnTransferTokens
    '0x5fb6c657', // swapExactTokensForETHSupportingFeeOnTransferTokens
  ];

  return swapSignatures.some(sig => input.startsWith(sig));
};

export async function fetchSwapsForWallet(
  walletAddress: string,
  provider = getProvider()
): Promise<Swap[]> {
  try {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const infuraKey = ENV.INFURA_API_KEY();
    const etherscanKey = ENV.ETHERSCAN_API_KEY();

    if (!infuraKey || !etherscanKey) {
      console.warn('API keys not configured, using mock data');
      return getMockSwaps(walletAddress);
    }

    const currentBlock = await provider.getBlockNumber();
    const startBlock = currentBlock - (DAYS_TO_FETCH * BLOCKS_PER_DAY);
    
    const transactions = await fetchWalletTransactions(
      walletAddress,
      startBlock,
      currentBlock
    );

    const swapTxs = transactions.filter(tx => 
      tx.isError === '0' && isSwapTransaction(tx.input)
    );

    if (swapTxs.length === 0) {
      return [];
    }

    const processor = new SwapTransactionProcessor();
    const swapsPromises = swapTxs.map(async (tx, index) => {
      try {
        const receipt = await provider.getTransactionReceipt(tx.hash);
        if (!receipt) return null;
        return processor.processTransaction(tx, receipt, provider, index);
      } catch (error) {
        console.error(`Error processing transaction ${tx.hash}:`, error);
        return null;
      }
    });

    const swaps = (await Promise.all(swapsPromises)).filter((swap): swap is Swap => swap !== null);
    return swaps;

  } catch (error) {
    console.error('Error fetching swaps:', error);
    return getMockSwaps(walletAddress);
  }
}