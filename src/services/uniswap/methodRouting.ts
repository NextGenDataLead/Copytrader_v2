import { ethers } from 'ethers';

// Supported swap method signatures
const SUPPORTED_METHODS = {
  EXACT_TOKENS_FOR_TOKENS: '0x38ed1739',
  EXACT_ETH_FOR_TOKENS: '0x7ff36ab5',
  EXACT_TOKENS_FOR_ETH: '0x18cbafe5',
} as const;

// Method routing map
const METHOD_ROUTING: Record<string, keyof typeof SUPPORTED_METHODS> = {
  // Direct mappings
  '0x38ed1739': 'EXACT_TOKENS_FOR_TOKENS', // swapExactTokensForTokens
  '0x7ff36ab5': 'EXACT_ETH_FOR_TOKENS',    // swapExactETHForTokens
  '0x18cbafe5': 'EXACT_TOKENS_FOR_ETH',    // swapExactTokensForETH

  // Route other methods to their basic equivalents
  '0x8803dbee': 'EXACT_TOKENS_FOR_TOKENS', // swapTokensForExactTokens -> swapExactTokensForTokens
  '0xfb3bdb41': 'EXACT_ETH_FOR_TOKENS',    // swapETHForExactTokens -> swapExactETHForTokens
  '0x4a25d94a': 'EXACT_TOKENS_FOR_ETH',    // swapTokensForExactETH -> swapExactTokensForETH
  
  // Fee-supporting variants
  '0xb6f9de95': 'EXACT_TOKENS_FOR_TOKENS', // swapExactTokensForTokensSupportingFeeOnTransferTokens
  '0x791ac947': 'EXACT_ETH_FOR_TOKENS',    // swapExactETHForTokensSupportingFeeOnTransferTokens
  '0x5fb6c657': 'EXACT_TOKENS_FOR_ETH',    // swapExactTokensForETHSupportingFeeOnTransferTokens
};

export function getRoutedMethod(methodId: string): string {
  const routedMethod = METHOD_ROUTING[methodId];
  if (!routedMethod) {
    throw new Error(`Unsupported swap method: ${methodId}`);
  }
  return SUPPORTED_METHODS[routedMethod];
}

export function isETHSwap(methodId: string): boolean {
  const routedMethod = METHOD_ROUTING[methodId];
  return routedMethod === 'EXACT_ETH_FOR_TOKENS' || routedMethod === 'EXACT_TOKENS_FOR_ETH';
}