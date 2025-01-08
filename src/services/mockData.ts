import { Swap } from '../types/trader';

export const getMockSwaps = (walletAddress: string): Swap[] => {
  const now = new Date();
  return [
    {
      id: `${walletAddress}-mock-1`,
      walletAddress,
      tokenIn: {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        symbol: 'ETH',
        amount: '1.5',
        decimals: 18,
      },
      tokenOut: {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        symbol: 'USDC',
        amount: '3000',
        decimals: 6,
      },
      timestamp: new Date(now.getTime() - 3600000), // 1 hour ago
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      metrics: {
        executionRate: 2000,
        currentRate: 2100,
        liquidityUSD: 5000000,
      },
      gasUsed: '150000',
    },
    {
      id: `${walletAddress}-mock-2`,
      walletAddress,
      tokenIn: {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        symbol: 'USDC',
        amount: '1000',
        decimals: 6,
      },
      tokenOut: {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        symbol: 'WBTC',
        amount: '0.05',
        decimals: 8,
      },
      timestamp: new Date(now.getTime() - 7200000), // 2 hours ago
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      metrics: {
        executionRate: 20000,
        currentRate: 19500,
        liquidityUSD: 3000000,
      },
      gasUsed: '180000',
    },
  ];
};