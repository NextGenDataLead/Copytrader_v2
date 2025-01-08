import { ethers } from 'ethers';

export const normalizeAddress = (address: string): string => {
  try {
    return ethers.getAddress(address);
  } catch {
    return address.toLowerCase();
  }
};