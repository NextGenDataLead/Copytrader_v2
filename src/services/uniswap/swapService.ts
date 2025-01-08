import { ethers } from 'ethers';
import { handleWeb3Error } from '../../utils/errors';
import { UNISWAP_V2_ROUTER, UNISWAP_V2_ROUTER_ABI } from './constants';
import { approveToken } from './tokenService';

async function calculateMinimumOutput(
  router: ethers.Contract,
  amountIn: bigint,
  path: string[],
  slippagePercentage: number
): Promise<bigint> {
  try {
    const amounts = await router.getAmountsOut(amountIn, path);
    const expectedOut = amounts[amounts.length - 1];
    const slippageFactor = 1 - (slippagePercentage / 100);
    return BigInt(Math.floor(Number(expectedOut.toString()) * slippageFactor));
  } catch (error) {
    console.error('Error calculating minimum output:', error);
    throw new Error('Failed to calculate minimum output amount');
  }
}

export async function executeCopyTrade(
  tokenInAddress: string,
  tokenOutAddress: string,
  amount: string,
  slippage: number,
  signer: ethers.Signer
): Promise<ethers.TransactionResponse> {
  try {
    const router = new ethers.Contract(UNISWAP_V2_ROUTER, UNISWAP_V2_ROUTER_ABI, signer);
    const signerAddress = await signer.getAddress();
    const WETH = await router.WETH();

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      throw new Error('Invalid input amount');
    }

    const isETHIn = tokenInAddress.toLowerCase() === WETH.toLowerCase();
    const isETHOut = tokenOutAddress.toLowerCase() === WETH.toLowerCase();
    const amountIn = ethers.parseUnits(amount, 18); // Using 18 decimals for ETH
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
    const path = [tokenInAddress, tokenOutAddress];
    const amountOutMin = await calculateMinimumOutput(router, amountIn, path, slippage);

    const txOptions = { 
      gasLimit: 300000,
      value: isETHIn ? amountIn : 0n
    };

    if (isETHIn) {
      return await router.swapExactETHForTokens(
        amountOutMin,
        path,
        signerAddress,
        deadline,
        txOptions
      );
    } else if (isETHOut) {
      await approveToken(tokenInAddress, UNISWAP_V2_ROUTER, amountIn, signer);
      return await router.swapExactTokensForETH(
        amountIn,
        amountOutMin,
        path,
        signerAddress,
        deadline,
        txOptions
      );
    } else {
      await approveToken(tokenInAddress, UNISWAP_V2_ROUTER, amountIn, signer);
      return await router.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        path,
        signerAddress,
        deadline,
        txOptions
      );
    }
  } catch (error: any) {
    handleWeb3Error(error, 'Swap execution error');
    throw error;
  }
}