import React from 'react';

const CompanyLinks = () => (
  <div className="flex flex-col space-y-2">
    <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
    <a href="https://dappastra.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">DappAstra HQ</a>
    <a href="https://dappastra.com/services" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Services</a>
    <a href="https://dappastra.com/portfolio" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
  </div>
);

export default CompanyLinks;