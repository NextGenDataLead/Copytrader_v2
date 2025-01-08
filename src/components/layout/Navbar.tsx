import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import WalletConnect from '../web3/WalletConnect';
import { useWeb3Store } from '../../stores/web3Store';
import Tooltip from '../common/Tooltip';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { address } = useWeb3Store();

  const scrollToRoadmap = (e: React.MouseEvent) => {
    e.preventDefault();
    const roadmapElement = document.getElementById('roadmap');
    if (roadmapElement) {
      roadmapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <img 
              src="https://dappastra.com/images/DappAstra_Cube_With_Logo_Transparent.png" 
              alt="Logo" 
              className="h-8 mr-2"
            />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Copy Trader
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              href="https://dappastra.com" 
              tooltip="Visit DappAstra"
            >
              DappAstra HQ
            </NavLink>
            <NavLink 
              href="#roadmap" 
              tooltip="View our product roadmap"
              external={false}
              onClick={scrollToRoadmap}
            >
              Roadmap
            </NavLink>
            <NavLink 
              href="https://dappastra.com/contact" 
              tooltip="Get in touch with us"
            >
              Contact
            </NavLink>
          </div>

          {/* Web3 Controls */}
          <div className="flex items-center space-x-4">
            <WalletConnect />
            
            {/* Theme Toggle */}
            <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component with tooltip
interface NavLinkProps {
  href: string;
  tooltip: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  tooltip,
  children,
  external = true,
  onClick
}) => (
  <Tooltip content={tooltip}>
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
    >
      {children}
    </a>
  </Tooltip>
);

export default Navbar;