import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className="gradient-text">Touch</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Have questions? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="glass p-6 rounded-xl flex items-center gap-4">
              <FiMail className="text-3xl text-primary" />
              <div><h3 className="font-semibold">Email</h3><p className="text-gray-400">support@errortrackr.com</p></div>
            </div>
            <div className="glass p-6 rounded-xl flex items-center gap-4">
              <FiMessageSquare className="text-3xl text-primary" />
              <div><h3 className="font-semibold">Live Chat</h3><p className="text-gray-400">Available 24/7</p></div>
            </div>
            <div className="glass p-6 rounded-xl flex items-center gap-4">
              <FiMapPin className="text-3xl text-primary" />
              <div><h3 className="font-semibold">Office</h3><p className="text-gray-400">Tech Park, Bangalore, India</p></div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg focus:border-primary focus:outline-none" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg focus:border-primary focus:outline-none" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea required rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg focus:border-primary focus:outline-none" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all">Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;