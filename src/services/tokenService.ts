import { ethers } from 'ethers';
import { TokenInfo } from '../types/trader';

const ERC20_ABI = [
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
];

const TOKEN_CACHE: Record<string, TokenInfo> = {};

export async function getTokenInfo(
  tokenAddress: string,
  provider: ethers.Provider
): Promise<TokenInfo> {
  try {
    // Return cached token info if available
    if (TOKEN_CACHE[tokenAddress]) {
      return TOKEN_CACHE[tokenAddress];
    }

    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    const [symbol, decimals] = await Promise.all([
      contract.symbol().catch(() => 'UNKNOWN'),
      contract.decimals().catch(() => 18),
    ]);

    const tokenInfo: TokenInfo = {
      address: tokenAddress,
      symbol,
      amount: '0',
      decimals,
    };

    // Cache the token info
    TOKEN_CACHE[tokenAddress] = tokenInfo;
    return tokenInfo;
  } catch (error) {
    console.warn(`Failed to fetch token info for ${tokenAddress}:`, error);
    return {
      address: tokenAddress,
      symbol: 'UNKNOWN',
      amount: '0',
      decimals: 18,
    };
  }
}