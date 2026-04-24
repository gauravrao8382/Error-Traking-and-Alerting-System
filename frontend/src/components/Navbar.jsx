import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="text-3xl font-bold gradient-text">
=======
        {/* ✅ Responsive Height & Layout */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* ✅ LOGO - Click to scroll to top */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent cursor-pointer"
          >
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
            ErrorTrackr
          </Link>

          {/* DESKTOP LINKS */}
<<<<<<< HEAD
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-300 hover:text-primary">Features</a>
            <a href="/#about" className="text-gray-300 hover:text-primary">About</a>
            <a href="/#pricing" className="text-gray-300 hover:text-primary">Pricing</a>
            <a href="/#contact" className="text-gray-300 hover:text-primary">Contact</a>
          </div>

          {/* LOGIN / SIGNUP BUTTONS */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all">
=======
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="/#features" className="text-gray-300 hover:text-violet-400 transition-colors text-sm lg:text-base">Features</a>
            <a href="/#about" className="text-gray-300 hover:text-violet-400 transition-colors text-sm lg:text-base">About</a>
            <a href="/#pricing" className="text-gray-300 hover:text-violet-400 transition-colors text-sm lg:text-base">Pricing</a>
            <a href="/#contact" className="text-gray-300 hover:text-violet-400 transition-colors text-sm lg:text-base">Contact</a>
            <a href="/#developer" className="text-gray-300 hover:text-violet-400 transition-colors text-sm lg:text-base">Developer</a>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Link to="/login" className="px-4 py-2 lg:px-6 border border-violet-500/50 text-violet-400 rounded-xl hover:bg-violet-500/10 hover:text-violet-300 transition-all font-medium text-sm lg:text-base">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 lg:px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all font-medium text-sm lg:text-base text-white">
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
              Sign Up
            </Link>
          </div>

<<<<<<< HEAD
          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-white">
            {isOpen ? <FiX /> : <FiMenu />}
=======
          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <motion.div
<<<<<<< HEAD
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 pb-6"
          >
            <div className="flex flex-col space-y-3">
              <a href="/#features" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">Features</a>
              <a href="/#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">About</a>
              <a href="/#pricing" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">Pricing</a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary">Contact</a>

              <Link to="/login" onClick={() => setIsOpen(false)} className="px-6 py-2 border-2 border-primary text-primary rounded-lg text-center">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-center">
                Sign Up
              </Link>
=======
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-1">
              <a href="/#features" onClick={() => setIsOpen(false)} className="py-3 px-4 text-gray-300 hover:text-violet-400 hover:bg-white/5 rounded-xl transition-all text-base font-medium">Features</a>
              <a href="/#about" onClick={() => setIsOpen(false)} className="py-3 px-4 text-gray-300 hover:text-violet-400 hover:bg-white/5 rounded-xl transition-all text-base font-medium">About</a>
              <a href="/#pricing" onClick={() => setIsOpen(false)} className="py-3 px-4 text-gray-300 hover:text-violet-400 hover:bg-white/5 rounded-xl transition-all text-base font-medium">Pricing</a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="py-3 px-4 text-gray-300 hover:text-violet-400 hover:bg-white/5 rounded-xl transition-all text-base font-medium">Contact</a>
              <a href="/#developer" onClick={() => setIsOpen(false)} className="py-3 px-4 text-gray-300 hover:text-violet-400 hover:bg-white/5 rounded-xl transition-all text-base font-medium">Developer</a>

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col space-y-3">
                <Link to="/login" onClick={() => setIsOpen(false)} className="py-3 px-4 border border-violet-500/50 text-violet-400 rounded-xl text-center hover:bg-violet-500/10 transition-all font-medium text-base">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-center hover:shadow-lg hover:shadow-violet-500/25 transition-all font-medium text-base text-white">
                  Sign Up
                </Link>
              </div>
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;