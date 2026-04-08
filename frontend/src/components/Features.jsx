import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiLayers, FiBarChart, FiShield, FiGlobe, FiUsers } from 'react-icons/fi';

const Features = () => {
  const features = [
    { icon: FiZap, title: 'Real-time Alerts', desc: 'Get instant notifications via Email, Slack, or Discord.' },
    { icon: FiLayers, title: 'Smart Grouping', desc: 'Similar errors automatically grouped together.' },
    { icon: FiBarChart, title: 'Detailed Analytics', desc: 'Track error trends with beautiful charts.' },
    { icon: FiShield, title: 'Secure & Private', desc: 'Your data is encrypted and secure.' },
    { icon: FiGlobe, title: 'Multi-Platform', desc: 'Support for JS, Python, Node.js, React, Vue.' },
    { icon: FiUsers, title: 'Team Collaboration', desc: 'Assign errors and track progress together.' },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white leading-tight">
            Why Choose <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">ErrorTrackr</span>?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Everything you need to monitor and fix errors
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }} 
              className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              {/* Icon with background */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-violet-500/30 transition-colors">
                <feature.icon className="text-2xl sm:text-3xl text-violet-400" />
              </div>
              
              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Features;