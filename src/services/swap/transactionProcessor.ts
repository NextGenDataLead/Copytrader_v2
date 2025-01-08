import { ethers } from 'ethers';
import { TokenInfo, Swap } from '../../types/trader';
import { getTokenInfo } from '../tokenService';
import { getCurrentRate } from '../uniswap/rateService';
import { fetchPairInfo } from '../dexscreener/api';
import { TransactionProcessor } from './types';

export class SwapTransactionProcessor implements TransactionProcessor {
  async processTransaction(
    tx: any,
    receipt: ethers.TransactionReceipt,
    provider: ethers.Provider,
    index: number
  ): Promise<Swap | null> {
    try {
      const transferEvents = receipt.logs.filter(log => 
        log.topics[0] === ethers.id('Transfer(address,address,uint256)')
      );

      if (transferEvents.length < 2) {
        return null;
      }

      const firstTransfer = transferEvents[0];
      const lastTransfer = transferEvents[transferEvents.length - 1];

      const tokenInAddress = firstTransfer.address;
      const tokenOutAddress = lastTransfer.address;

      const [tokenIn, tokenOut] = await Promise.all([
        getTokenInfo(tokenInAddress, provider),
        getTokenInfo(tokenOutAddress, provider),
      ]);

      // Convert BigInt to string before formatting
      const amountInBigInt = BigInt(firstTransfer.data || firstTransfer.args?.[2] || '0');
      const amountOutBigInt = BigInt(lastTransfer.data || lastTransfer.args?.[2] || '0');

      const amountIn = ethers.formatUnits(amountInBigInt.toString(), tokenIn.decimals);
      const amountOut = ethers.formatUnits(amountOutBigInt.toString(), tokenOut.decimals);

      const updatedTokenIn: TokenInfo = { ...tokenIn, amount: amountIn };
      const updatedTokenOut: TokenInfo = { ...tokenOut, amount: amountOut };

      const { rate: currentRate, pairAddress } = await getCurrentRate(
        tokenInAddress, 
        tokenOutAddress, 
        provider
      );

      const executionRate = parseFloat(amountOut) / parseFloat(amountIn);

      const pairInfo = pairAddress && pairAddress !== ethers.ZeroAddress ? 
        await fetchPairInfo('ethereum', pairAddress) : null;

      return {
        id: `${tx.from}-${tx.hash}-${index}`,
        walletAddress: tx.from,
        tokenIn: updatedTokenIn,
        tokenOut: updatedTokenOut,
        timestamp: new Date(parseInt(tx.timeStamp) * 1000),
        txHash: tx.hash,
        metrics: {
          executionRate,
          currentRate: currentRate || 0,
          liquidityUSD: pairInfo?.liquidity?.usd || 0,
          volume24h: pairInfo?.volume?.h24,
          fdv: pairInfo?.fdv,
          marketCap: pairInfo?.marketCap,
          pairCreatedAt: pairInfo?.pairCreatedAt ? 
            new Date(pairInfo.pairCreatedAt) : undefined,
          priceChanges: pairInfo?.priceChange,
          poolAddress: pairAddress,
        },
        gasUsed: receipt.gasUsed.toString(),
      };
    } catch (error) {
      console.error(`Error processing transaction ${tx.hash}:`, error);
      return null;
    }
  }
}