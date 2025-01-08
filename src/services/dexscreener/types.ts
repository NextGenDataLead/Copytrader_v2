export interface DexScreenerPair {
  chainId: string;
  pairAddress: string;
  baseToken: {
    symbol: string;
    address: string;
  };
  quoteToken: {
    symbol: string;
    address: string;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  volume: {
    h24: number;
  };
  liquidity: {
    usd: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

export interface DexScreenerResponse {
  pair?: DexScreenerPair;
  pairs?: DexScreenerPair[];
}