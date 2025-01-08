// Environment configuration
export const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Missing environment variable: ${key}`);
    return ''; // Return empty string instead of throwing
  }
  return value;
};

export const ENV = {
  INFURA_API_KEY: () => getEnvVar('VITE_INFURA_API_KEY'),
  ETHERSCAN_API_KEY: () => getEnvVar('VITE_ETHERSCAN_API_KEY'),
};