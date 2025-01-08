import { ethers } from 'ethers';
import { UNISWAP_V2_FACTORY, UNISWAP_V2_FACTORY_ABI, UNISWAP_V2_PAIR_ABI } from './constants';
import { getTokenInfo } from '../tokenService';

const rateCache: Record<string, { rate: number; timestamp: number; pairAddress: string }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function formatReserve(reserve: bigint, decimals: number): number {
  try {
    return Number(ethers.formatUnits(reserve, decimals));
  } catch (error) {
    console.error('Error formatting reserve:', error);
    return 0;
  }
}

export async function getCurrentRate(
  tokenInAddress: string,
  tokenOutAddress: string,
  provider: ethers.Provider
): Promise<{ rate: number; pairAddress: string }> {
  try {
    const normalizedInAddress = tokenInAddress.toLowerCase();
    const normalizedOutAddress = tokenOutAddress.toLowerCase();
    const cacheKey = `${normalizedInAddress}-${normalizedOutAddress}`;
    const now = Date.now();
    
    if (rateCache[cacheKey] && (now - rateCache[cacheKey].timestamp) < CACHE_DURATION) {
      return {
        rate: rateCache[cacheKey].rate,
        pairAddress: rateCache[cacheKey].pairAddress
      };
    }

    const factory = new ethers.Contract(
      UNISWAP_V2_FACTORY,
      UNISWAP_V2_FACTORY_ABI,
      provider
    );
    const pairAddress = await factory.getPair(normalizedInAddress, normalizedOutAddress);
    
    if (pairAddress === ethers.ZeroAddress) {
      return { rate: 0, pairAddress: ethers.ZeroAddress };
    }

    const pair = new ethers.Contract(pairAddress, UNISWAP_V2_PAIR_ABI, provider);
    const [token0, token1, reserves] = await Promise.all([
      pair.token0(),
      pair.token1(),
      pair.getReserves(),
    ]);

    const [tokenIn, tokenOut] = await Promise.all([
      getTokenInfo(normalizedInAddress, provider),
      getTokenInfo(normalizedOutAddress, provider),
    ]);

    const isToken0 = normalizedInAddress.toLowerCase() === token0.toLowerCase();
    const [reserveIn, reserveOut] = isToken0 
      ? [reserves[0], reserves[1]]
      : [reserves[1], reserves[0]];

    const adjustedReserveIn = formatReserve(reserveIn, tokenIn.decimals);
    const adjustedReserveOut = formatReserve(reserveOut, tokenOut.decimals);
    
    if (adjustedReserveIn === 0) return { rate: 0, pairAddress };

    // Calculate rate as tokenOut/tokenIn
    const rate = adjustedReserveOut / adjustedReserveIn;
    rateCache[cacheKey] = { rate, pairAddress, timestamp: now };
    
    return { rate, pairAddress };
  } catch (error) {
    console.error('Error fetching current rate:', error);
    return { rate: 0, pairAddress: ethers.ZeroAddress };
  }
}