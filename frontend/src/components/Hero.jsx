import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-2 glass rounded-full mb-6">
            <span className="text-sm text-primary">🚀 New: AI-Powered Error Analysis</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-6">
            Catch Errors Before<br /><span className="gradient-text">Your Users Do</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Real-time error tracking for modern developers. Get instant alerts, detailed stack traces, and resolve issues faster.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2">
              Start Free Trial <FiArrowRight />
            </Link>
            <button className="px-8 py-4 glass rounded-lg font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <FiPlay /> View Demo
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-20 glass rounded-2xl p-4 animate-float">
          <div className="bg-darker rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Recent Errors</h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-white/20 rounded w-3/4"></div>
                          <div className="h-2 bg-white/10 rounded w-1/2 mt-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-lg p-4 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Errors Over Time</h3>
                  <div className="h-40 flex items-end justify-between gap-2">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t" style={{ height: `${h}%` }}></div>
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