// ... (previous imports remain the same)

async function processTransaction(
  tx: any,
  receipt: ethers.TransactionReceipt,
  provider: ethers.Provider,
  index: number
): Promise<Swap | null> {
  try {
    const transferEvents = receipt.logs.filter(log => 
      log.topics[0] === ethers.id('Transfer(address,address,uint256)')
    );

    if (transferEvents.length < 2) {
      return null;
    }

    const [firstTransfer, lastTransfer] = transferEvents;
    const tokenInAddress = firstTransfer.address;
    const tokenOutAddress = lastTransfer.address;

    const [tokenIn, tokenOut] = await Promise.all([
      getTokenInfo(tokenInAddress, provider),
      getTokenInfo(tokenOutAddress, provider),
    ]);

    // Parse transfer amounts using ethers.formatUnits
    const amountIn = ethers.formatUnits(
      firstTransfer.data || firstTransfer.args?.[2] || '0',
      tokenIn.decimals
    );
    const amountOut = ethers.formatUnits(
      lastTransfer.data || lastTransfer.args?.[2] || '0',
      tokenOut.decimals
    );

    tokenIn.amount = amountIn;
    tokenOut.amount = amountOut;

    const [currentRate, executionRate] = [
      await getCurrentRate(tokenInAddress, tokenOutAddress, provider),
      parseFloat(amountOut) / parseFloat(amountIn)
    ];

    return {
      id: `${tx.from}-${tx.hash}-${index}`,
      walletAddress: tx.from,
      tokenIn,
      tokenOut,
      timestamp: new Date(parseInt(tx.timeStamp) * 1000),
      txHash: tx.hash,
      metrics: {
        executionRate,
        currentRate: currentRate || 0,
        liquidityUSD: 0,
      },
      gasUsed: receipt.gasUsed.toString(),
    };
  } catch (error) {
    console.error(`Error processing transaction ${tx.hash}:`, error);
    return null;
  }
}

// ... (rest of the file remains the same)