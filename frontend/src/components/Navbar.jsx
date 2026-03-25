import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout handled in Dashboard
    navigate('/');
  };

  return (
    <nav className="fixed w-full top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-bold gradient-text">
            ErrorTrackr
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-300 hover:text-primary transition-colors">Features</a>
            <a href="/#about" className="text-gray-300 hover:text-primary transition-colors">About</a>
            <a href="/#pricing" className="text-gray-300 hover:text-primary transition-colors">Pricing</a>
            <a href="/#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                  Login
                </Link>
                <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-white">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden py-4 pb-6">
            <div className="flex flex-col space-y-3">
              <a href="/#features" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">Features</a>
              <a href="/#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">About</a>
              <a href="/#pricing" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">Pricing</a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">Contact</a>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-6 py-2 border-2 border-primary text-primary rounded-lg text-center">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="px-6 py-2 border-2 border-primary text-primary rounded-lg text-center">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;