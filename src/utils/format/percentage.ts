export const formatPercentage = (value: number): string => {
  const absValue = Math.abs(value);
  
  if (absValue >= 1000) {
    return `${(absValue / 1000).toFixed(1)}K%`;
  }
  
  return `${value.toFixed(1)}%`;
};