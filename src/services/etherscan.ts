import axios from 'axios';
import { ENV } from '../config/env';
import { toast } from 'react-hot-toast';
import { normalizeAddress } from '../utils/address';

interface EtherscanTransaction {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  input: string;
  isError: string;
}

interface EtherscanResponse {
  status: string;
  message: string;
  result: EtherscanTransaction[];
}

export const fetchWalletTransactions = async (
  walletAddress: string,
  startBlock: number,
  endBlock: number
): Promise<EtherscanTransaction[]> => {
  const apiKey = ENV.ETHERSCAN_API_KEY();
  if (!apiKey) {
    throw new Error('Etherscan API key not configured');
  }

  const normalizedAddress = normalizeAddress(walletAddress);
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${normalizedAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`;

  try {
    const { data } = await axios.get<EtherscanResponse>(url);

    if (data.status === '0') {
      if (data.message === 'No transactions found') {
        return [];
      }
      throw new Error(data.message || 'Failed to fetch transactions');
    }

    return data.result || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      toast.error(`Etherscan API error: ${message}`);
    }
    console.error('Error fetching transactions:', error);
    throw error;
  }
};