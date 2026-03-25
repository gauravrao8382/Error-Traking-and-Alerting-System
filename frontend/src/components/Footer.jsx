import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-darker/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">ErrorTrackr</h3>
            <p className="text-gray-400">Catch errors before your users do. Built for modern developers.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#features" className="hover:text-primary">Features</a></li>
              <li><a href="/#pricing" className="hover:text-primary">Pricing</a></li>
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#about" className="hover:text-primary">About</a></li>
              <li><a href="/#contact" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2026 ErrorTrackr. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-primary text-xl"><FiGithub /></a>
            <a href="#" className="text-gray-400 hover:text-primary text-xl"><FiTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-primary text-xl"><FiLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;