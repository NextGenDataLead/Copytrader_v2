export const formatAmount = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0';
  
  if (num === 0) return '0';
  if (num < 0.0001) return '<0.0001';
  if (num > 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num > 1000) return `${(num / 1000).toFixed(2)}K`;
  
  // For numbers between 0.0001 and 1, show more decimals
  if (num < 1) return num.toPrecision(4);
  
  return num.toFixed(4);
};

export const formatRate = (rate: number): string => {
  if (!rate || isNaN(rate)) return '0';
  
  // Handle very small rates
  if (rate < 0.000001) return rate.toExponential(2);
  // Handle very large rates
  if (rate > 1000000) return `${(rate / 1000000).toFixed(2)}M`;
  // Handle medium rates
  if (rate > 1000) return `${(rate / 1000).toFixed(2)}K`;
  // Handle small rates
  if (rate < 1) return rate.toPrecision(4);
  // Handle normal rates
  return rate.toFixed(4);
};

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(amount);
};