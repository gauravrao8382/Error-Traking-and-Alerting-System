import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  useEffect(() => {
  document.title = "Home";
}, []);
  return (
    <footer className="bg-slate-900/50 border-t border-white/10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
              ErrorTrackr
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Catch errors before your users do. Built for modern developers.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base sm:text-lg">Product</h4>
            <ul className="space-y-3">
              <li><a href="/#features" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Features</a></li>
              <li><a href="/#pricing" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Changelog</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base sm:text-lg">Company</h4>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">About</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Careers</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base sm:text-lg">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors text-sm sm:text-base">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © 2026 ErrorTrackr. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 sm:gap-5">
            <a href="#" className="text-gray-400 hover:text-violet-400 hover:bg-white/10 p-2 rounded-lg transition-all" aria-label="GitHub">
              <FiGithub className="text-lg sm:text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-400 hover:bg-white/10 p-2 rounded-lg transition-all" aria-label="Twitter">
              <FiTwitter className="text-lg sm:text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-400 hover:bg-white/10 p-2 rounded-lg transition-all" aria-label="LinkedIn">
              <FiLinkedin className="text-lg sm:text-xl" />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;