import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="pt-26 pb-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
            <span className="text-sm text-violet-400 font-medium">🚀 New: AI-Powered Error Analysis</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Catch Errors Before<br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Your Users Do</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Real-time error tracking for modern developers. Get instant alerts, detailed stack traces, and resolve issues faster.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-lg text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all flex items-center justify-center gap-2">
              Start Free Trial <FiArrowRight />
            </Link>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl font-semibold text-lg text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <FiPlay /> View Demo
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8 }} 
          className="mt-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-float"
        >
          <div className="bg-slate-900/80 rounded-xl overflow-hidden border border-white/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Card: Recent Errors */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-4 text-white">Recent Errors</h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-white/20 rounded w-3/4"></div>
                          <div className="h-2 bg-white/10 rounded w-1/2 mt-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Card: Chart */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 text-white">Errors Over Time</h3>
                  <div className="h-40 flex items-end justify-between gap-2">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-violet-500 to-fuchsia-500 rounded-t-md opacity-80 hover:opacity-100 transition-opacity" 
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;