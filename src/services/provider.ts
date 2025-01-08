import { ethers } from 'ethers';
import { ENV } from '../config/env';

export const getProvider = () => {
  return new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${ENV.INFURA_API_KEY()}`
  );
};