import React from 'react';

const ContactLinks = () => (
  <div className="flex flex-col space-y-2">
    <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
    <a href="https://dappastra.notion.site/16cb2ca320a780c0903ae295795b6e5f?pvs=105" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Need Developer?</a>
    <a href="https://dappastra.com/developer-network" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Join as Developer</a>
    <a 
      href="mailto:no-reply@dappastra.com?subject=General%20Inquiry" 
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-white transition-colors"
    >
      General Inquiries
    </a>
  </div>
);

export default ContactLinks;