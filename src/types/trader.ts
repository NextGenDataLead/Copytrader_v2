export interface SwapMetrics {
  executionRate: number;
  currentRate: number;
  liquidityUSD: number;
  poolAddress?: string;
  volume24h?: number;
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: Date;
  priceChanges?: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
}