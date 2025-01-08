import React from 'react';
import { Github, Linkedin, Twitter, CircleUser } from 'lucide-react';
import Tooltip from '../../common/Tooltip';

const SocialLinks = () => (
  <div className="flex space-x-4">
    <Tooltip content="Follow us on LinkedIn">
      <a href="https://linkedin.com/company/dappastra" className="text-gray-300 hover:text-white transition-colors">
        <Linkedin className="w-6 h-6" />
      </a>
    </Tooltip>
    
    <Tooltip content="Follow us on Twitter">
      <a href="https://twitter.com/DappAstra" className="text-gray-300 hover:text-white transition-colors">
        <Twitter className="w-6 h-6" />
      </a>
    </Tooltip>
    
    <Tooltip content="Check out our GitHub">
      <a href="https://github.com/DappAstra" className="text-gray-300 hover:text-white transition-colors">
        <Github className="w-6 h-6" />
      </a>
    </Tooltip>
    
    <Tooltip content="Join our Reddit community">
      <a href="https://www.reddit.com/user/DappAstra/" className="text-gray-300 hover:text-white transition-colors">
        <CircleUser className="w-6 h-6" />
      </a>
    </Tooltip>
  </div>
);

export default SocialLinks;