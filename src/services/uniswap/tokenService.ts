import { ethers } from 'ethers';

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
];

export async function approveToken(
  tokenAddress: string,
  spenderAddress: string,
  amount: bigint,
  signer: ethers.Signer
): Promise<void> {
  try {
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const signerAddress = await signer.getAddress();
    
    // Check current allowance
    const currentAllowance = await token.allowance(signerAddress, spenderAddress);
    
    // Only approve if needed
    if (currentAllowance < amount) {
      const tx = await token.approve(spenderAddress, amount);
      await tx.wait();
    }
  } catch (error) {
    console.error('Token approval error:', error);
    throw new Error('Failed to approve token');
  }
}