import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Built by Developers,<br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">For Developers</span>
            </h1>

            
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              We understand the pain of debugging in production. ErrorTrackr helps teams catch, understand, and fix errors before they impact users.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0"></div>
                <span>10,000+ Developers Trust Us</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0"></div>
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0"></div>
                <span>24/7 Support Available</span>
              </div>
            </div>
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-violet-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1 sm:mb-2">10M+</div>
                <div className="text-gray-400 text-sm sm:text-base">Errors Tracked</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-violet-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1 sm:mb-2">5K+</div>
                <div className="text-gray-400 text-sm sm:text-base">Happy Customers</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-violet-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1 sm:mb-2">99%</div>
                <div className="text-gray-400 text-sm sm:text-base">Satisfaction Rate</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-violet-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1 sm:mb-2">24/7</div>
                <div className="text-gray-400 text-sm sm:text-base">Support</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
