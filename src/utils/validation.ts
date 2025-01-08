import { ethers } from 'ethers';

export const isValidEVMAddress = (address: string): boolean => {
  try {
    // Check if the address is a valid EVM address using ethers.js
    const parsedAddress = ethers.getAddress(address);
    return parsedAddress === address;
  } catch {
    return false;
  }
};