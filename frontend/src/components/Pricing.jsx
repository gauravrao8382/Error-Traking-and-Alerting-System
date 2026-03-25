import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: 'Free', features: ['1,000 errors/month', '1 Project', 'Email Alerts', '7-day Data Retention', 'Community Support'] },
    { name: 'Pro', price: '₹999/mo', popular: true, features: ['50,000 errors/month', '10 Projects', 'Slack + Discord Alerts', '30-day Data Retention', 'Priority Support', 'Team Collaboration'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited errors', 'Unlimited Projects', 'Custom Integrations', '1-year Data Retention', '24/7 Phone Support', 'SLA Guarantee'] },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Choose the plan that fits your needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`glass p-8 rounded-xl ${plan.popular ? 'border-primary bg-primary/10' : ''}`}>
              {plan.popular && <div className="text-primary text-sm font-semibold mb-2">MOST POPULAR</div>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold gradient-text mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400"><FiCheck className="text-primary" /> {feature}</li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}>
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