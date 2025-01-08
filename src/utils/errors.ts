import { toast } from 'react-hot-toast';

export interface Web3Error extends Error {
  code?: number;
  reason?: string;
  action?: string;
}

export function handleWeb3Error(error: Web3Error, context: string = ''): void {
  console.error(`${context}:`, error);

  // User rejected transaction
  if (error.code === 4001 || error.code === 'ACTION_REJECTED') {
    toast.error('Transaction cancelled');
    return;
  }

  // Insufficient funds
  if (error.code === 'INSUFFICIENT_FUNDS') {
    toast.error('Insufficient funds for transaction');
    return;
  }

  // Gas estimation failed
  if (error.reason?.includes('UNPREDICTABLE_GAS_LIMIT')) {
    toast.error('Failed to estimate gas. The transaction may fail.');
    return;
  }

  // Network related errors
  if (error.reason?.includes('network')) {
    toast.error('Network error. Please try again.');
    return;
  }

  // Fallback error message
  toast.error(error.reason || error.message || 'Transaction failed');
}