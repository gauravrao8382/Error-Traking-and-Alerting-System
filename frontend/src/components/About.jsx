import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-darker/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built by Developers,<br /><span className="gradient-text">For Developers</span></h2>
            <p className="text-gray-400 text-lg mb-6">We understand the pain of debugging in production. ErrorTrackr helps teams catch, understand, and fix errors before they impact users.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"></div><span>10,000+ Developers Trust Us</span></div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"></div><span>99.9% Uptime SLA</span></div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"></div><span>24/7 Support Available</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass p-8 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 glass rounded-xl"><div className="text-4xl font-bold gradient-text mb-2">10M+</div><div className="text-gray-400">Errors Tracked</div></div>
              <div className="text-center p-6 glass rounded-xl"><div className="text-4xl font-bold gradient-text mb-2">5K+</div><div className="text-gray-400">Happy Customers</div></div>
              <div className="text-center p-6 glass rounded-xl"><div className="text-4xl font-bold gradient-text mb-2">99%</div><div className="text-gray-400">Satisfaction Rate</div></div>
              <div className="text-center p-6 glass rounded-xl"><div className="text-4xl font-bold gradient-text mb-2">24/7</div><div className="text-gray-400">Support</div></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;