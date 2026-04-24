import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { useEffect } from 'react';

const Pricing = () => {
  useEffect(() => {
  document.title = "Pricing";
}, []);
  const plans = [
    { name: 'Starter', price: 'Free', features: ['1,000 errors/month', '1 Project', 'Email Alerts', '7-day Data Retention', 'Community Support'] },
    { name: 'Pro', price: '₹999/mo', popular: true, features: ['50,000 errors/month', '10 Projects', 'Slack + Discord Alerts', '30-day Data Retention', 'Priority Support', 'Team Collaboration'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited errors', 'Unlimited Projects', 'Custom Integrations', '1-year Data Retention', '24/7 Phone Support', 'SLA Guarantee'] },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white leading-tight">
            Simple, Transparent <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 ${
                plan.popular
                  ? 'border-violet-500/50 bg-violet-500/10 ring-1 ring-violet-500/30'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="text-violet-400 text-sm font-semibold mb-2 tracking-wide">
                  ⭐ MOST POPULAR
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
                {plan.price}
              </div>
              
              <ul className="space-y-3 sm:space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <FiCheck className="text-violet-400 text-xs" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 sm:py-4 rounded-xl font-semibold transition-all text-base sm:text-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-lg hover:shadow-violet-500/25'
                    : 'border-2 border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-500'
                }`}
              >
                {plan.price === 'Free' ? 'Get Started' : plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Pricing;