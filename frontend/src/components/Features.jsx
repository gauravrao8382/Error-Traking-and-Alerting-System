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
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose <span className="gradient-text">ErrorTrackr</span>?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to monitor and fix errors</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass p-8 rounded-xl hover:border-primary/50 transition-all hover:-translate-y-2">
              <feature.icon className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;