// src/pages/NotFound.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

const NotFound = () => {
    useEffect(() => {
  document.title = "Not Found";
}, []);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.warn(`⚠️ 404: Route not found - ${location.pathname}`);
  }, [location.pathname]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* ✅ Full Screen Centered Container */}
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 z-50">
        
        {/* ✅ Centered Content Card - Max width + Perfect Centering */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto text-center"
        >
          {/* 🔺 Floating Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <div className="relative inline-block">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 rounded-full blur-2xl opacity-50" />
              
              {/* Icon Box */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FiAlertTriangle className="text-violet-400" size={32} />
              </div>
            </div>
          </motion.div>

          {/* 🔢 404 Number - Responsive Font */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent leading-none mb-3"
          >
            404
          </motion.h1>

          {/* 📝 Title */}
          <motion.h2 
            variants={itemVariants}
            className="text-lg sm:text-xl font-semibold text-white mb-2 px-2"
          >
            Page Not Found
          </motion.h2>

          {/* 📄 Description - Responsive Text */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-sm sm:text-base mb-6 px-4 leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          {/* 🔍 Show attempted path (only if not home) */}
          {location.pathname !== '/' && (
            <motion.div 
              variants={itemVariants}
              className="mb-6 px-4"
            >
              <code className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-500 font-mono break-all">
                {location.pathname}
              </code>
            </motion.div>
          )}

          {/* 🎯 Action Buttons - Responsive Stack */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4"
          >
            {/* Primary: Go Home */}
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white text-sm sm:text-base hover:shadow-lg hover:shadow-violet-500/25 transition-all active:scale-95"
            >
              <FiHome size={18} />
              Go to Dashboard
            </button>

            {/* Secondary: Go Back */}
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-gray-300 text-sm sm:text-base hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              <FiArrowLeft size={18} />
              Go Back
            </button>
          </motion.div>

          {/* ✨ Decorative Dots - Centered */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex justify-center gap-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-violet-500/40"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.25
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ✅ Optional: Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl" />
      </div>
    </>
  );
};

export default NotFound;