import React from 'react';
import CompanyLinks from './CompanyLinks';
import ContactLinks from './ContactLinks';
import SocialLinks from './SocialLinks';

const Footer = () => (
  <footer className="bg-gray-900 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Logo */}
        <div>
          <img 
            src="https://dappastra.com/images/DappAstra_Cube_With_Logo_Transparent.png" 
            alt="DappAstra" 
            className="h-8"
          />
        </div>

        {/* Company Links */}
        <CompanyLinks />

        {/* Contact Links */}
        <ContactLinks />

        {/* Social Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <SocialLinks />
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} DappAstra. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;