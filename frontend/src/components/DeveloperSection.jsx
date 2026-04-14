// src/components/DeveloperSection.jsx
import React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';

const DeveloperSection = () => {
    useEffect(() => {
  document.title = "Developer";
}, []);
  // ✅ Replace with your actual photo URL
  const imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Gaurav&backgroundColor=b6e3f4";

  return (
    <section id="developer" className="py-10 sm:py-14 px-4">
      {/* Optional Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Meet the <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Developer</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">The mind behind ErrorTrackr</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 
                     flex flex-col sm:flex-row items-center gap-5 hover:border-violet-500/30 transition-all"
        >
          {/* 👤 Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-0.5">
              <img 
                src={imageUrl} 
                alt="Gaurav Rao" 
                className="w-full h-full rounded-lg bg-slate-900 object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-950 rounded-md flex items-center justify-center border border-white/10">
              <FiCode className="text-violet-400" size={12} />
            </div>
          </div>

          {/* 📝 Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">Gaurav Rao</h3>
            <p className="text-violet-400 font-medium text-sm sm:text-base mt-0.5">Full Stack Developer</p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 mt-3 text-xs sm:text-sm text-gray-400">
              <span className="flex items-center gap-1.5">🎓 GLA University, Mathura</span>
              <span className="flex items-center gap-1.5">📅 Graduating 2027</span>
            </div>

            {/* 🔗 Social Links */}
            <div className="mt-4 flex justify-center sm:justify-start gap-3">
              {[
                { icon: FiGithub, href: "https://github.com/gauravrao8382", label: "GitHub" },
                { icon: FiLinkedin, href: "https://www.linkedin.com/in/gaurav-rao-a121ba274/", label: "LinkedIn" },
                { icon: FiMail, href: "mailto:gauravrao8382@gmail.com", label: "Email" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-violet-500/20 border border-white/10 
                             hover:border-violet-500/30 rounded-lg text-gray-400 hover:text-violet-400 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperSection;