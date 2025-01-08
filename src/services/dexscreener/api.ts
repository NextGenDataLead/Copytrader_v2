import axios from 'axios';
import { DexScreenerResponse } from './types';
import { RateLimiter } from '../../utils/rateLimiter';

const rateLimiter = new RateLimiter();

export async function fetchPairInfo(chainId: string, pairAddress: string) {
  return rateLimiter.enqueue(async () => {
    try {
      const { data } = await axios.get<DexScreenerResponse>(
        `https://api.dexscreener.com/latest/dex/pairs/${chainId}/${pairAddress}`
      );
      
      return data.pair || (data.pairs && data.pairs[0]);
    } catch (error) {
      console.error('Error fetching DEX Screener data:', error);
      return null;
    }
  });
}