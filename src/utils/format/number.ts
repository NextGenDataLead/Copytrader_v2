export const formatAmount = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0';
  
  if (num === 0) return '0';
  if (num < 0.0001) return '<0.0001';
  if (num > 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num > 1000) return `${(num / 1000).toFixed(2)}K`;
  
  if (num < 1) return num.toPrecision(4);
  return num.toFixed(4);
};

export const formatRate = (rate: number): string => {
  if (!rate || isNaN(rate)) return '0';
  
  if (rate < 0.000001) return rate.toExponential(2);
  if (rate > 1000000) return `${(rate / 1000000).toFixed(2)}M`;
  if (rate > 1000) return `${(rate / 1000).toFixed(2)}K`;
  if (rate < 1) return rate.toPrecision(4);
  return rate.toFixed(4);
};