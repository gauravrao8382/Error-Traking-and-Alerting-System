import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  useEffect(() => {
  document.title = "Contact";
}, []);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white leading-tight">
            Get In <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Info Cards */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 sm:space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6 rounded-xl flex items-start sm:items-center gap-4 hover:border-violet-500/30 transition-colors">
              <div className="p-3 bg-violet-500/20 rounded-lg text-violet-400 flex-shrink-0">
                <FiMail className="text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base sm:text-lg">Email</h3>
                <p className="text-gray-400 text-sm sm:text-base">support@errortrackr.com</p>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6 rounded-xl flex items-start sm:items-center gap-4 hover:border-violet-500/30 transition-colors">
              <div className="p-3 bg-violet-500/20 rounded-lg text-violet-400 flex-shrink-0">
                <FiMessageSquare className="text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base sm:text-lg">Live Chat</h3>
                <p className="text-gray-400 text-sm sm:text-base">Available 24/7</p>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6 rounded-xl flex items-start sm:items-center gap-4 hover:border-violet-500/30 transition-colors">
              <div className="p-3 bg-violet-500/20 rounded-lg text-violet-400 flex-shrink-0">
                <FiMapPin className="text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base sm:text-lg">Office</h3>
                <p className="text-gray-400 text-sm sm:text-base">Tech Park, Bangalore, India</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            onSubmit={handleSubmit} 
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl space-y-5 sm:space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all" 
                placeholder="Your name" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all" 
                placeholder="your@email.com" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea 
                required 
                rows="5" 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all resize-none" 
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all text-base sm:text-lg"
            >
              Send Message
            </button>
          </motion.form>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;