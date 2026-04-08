// ✅ Dashboard.jsx - 100% Frontend, No Backend Needed
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiAlertTriangle, FiSettings, FiUser, FiLogOut, 
  FiMenu, FiX, FiActivity, FiTrendingUp, FiClock,
  FiBell, FiSearch, FiChevronRight, FiEdit3, FiSave,
  FiMail, FiPhone, FiBriefcase, FiMapPin, FiCheck
} from 'react-icons/fi';

// ✅ HARDCODED DEMO DATA - No backend dependency
const DEFAULT_USER = {
  id: 'demo-123',
  name: 'Demo User',
  email: 'demo@errortrackr.com',
  avatar: 'D',
  role: 'Senior Developer',
  joined: 'Jan 2024',
  phone: '+91 98765 43210',
  company: 'Tech Corp',
  location: 'Mumbai, India',
  bio: 'Frontend developer passionate about building beautiful UIs.',
  timezone: 'Asia/Kolkata'
};

const DEMO_STATS = [
  { 
    icon: FiAlertTriangle, 
    label: 'Total Errors', 
    value: '1,234', 
    change: '+12%', 
    trend: 'up',
    color: 'from-red-500/20 to-red-600/10',
    iconColor: 'text-red-400'
  },
  { 
    icon: FiActivity, 
    label: 'Active Issues', 
    value: '45', 
    change: '-5%', 
    trend: 'down',
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconColor: 'text-yellow-400'
  },
  { 
    icon: FiTrendingUp, 
    label: 'Resolved Today', 
    value: '23', 
    change: '+18%', 
    trend: 'up',
    color: 'from-green-500/20 to-green-600/10',
    iconColor: 'text-green-400'
  },
  { 
    icon: FiClock, 
    label: 'Avg. Resolution', 
    value: '2.4h', 
    change: '-10%', 
    trend: 'down',
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-400'
  },
];

const DEMO_ERRORS = [
  { id: 1, message: 'TypeError: Cannot read property', project: 'E-Commerce App', time: '2 mins ago', severity: 'Critical' },
  { id: 2, message: 'ReferenceError: x is not defined', project: 'Blog Platform', time: '5 mins ago', severity: 'High' },
  { id: 3, message: 'SyntaxError: Unexpected token', project: 'API Service', time: '12 mins ago', severity: 'Medium' },
  { id: 4, message: 'RangeError: Invalid array length', project: 'Dashboard App', time: '1 hour ago', severity: 'Low' },
  { id: 5, message: 'URIError: Malformed URI', project: 'User Portal', time: '2 hours ago', severity: 'Medium' },
];

const SidebarItems = [
  { id: 'overview', icon: FiHome, label: 'Dashboard' },
  { id: 'errors', icon: FiAlertTriangle, label: 'Error Logs' },
  { id: 'analytics', icon: FiTrendingUp, label: 'Analytics' },
  { id: 'profile', icon: FiUser, label: 'My Profile' },
  { id: 'settings', icon: FiSettings, label: 'Settings' },
];

// ✅ MAIN DASHBOARD COMPONENT - Standalone, No Props Required
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // ✅ Load user from localStorage or use default
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('demoUser');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // ✅ Save user to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('demoUser', JSON.stringify(currentUser));
    } catch (e) {
      console.log('LocalStorage not available');
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('demoUser');
    setCurrentUser(DEFAULT_USER);
    alert('👋 Logged out! (Demo Mode)');
  };

  const handleProfileUpdate = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex font-sans">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className={`
          ${sidebarOpen ? 'w-72' : 'w-20'} 
          bg-slate-900/80 backdrop-blur-xl border-r border-white/10 
          fixed md:relative z-40 h-screen transition-all duration-300
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
                <FiAlertTriangle className="text-white text-lg" />
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent whitespace-nowrap">
                    ErrorTrackr
                  </h1>
                  <p className="text-xs text-gray-500">Monitoring Platform</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors hidden md:block flex-shrink-0"
            >
              {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {SidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <item.icon className={`text-lg flex-shrink-0 ${activeTab === item.id ? 'text-violet-400' : ''}`} />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              {activeTab === item.id && sidebarOpen && (
                <FiChevronRight className="ml-auto text-violet-400 flex-shrink-0" size={16} />
              )}
            </motion.button>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold text-white flex-shrink-0">
                {currentUser?.avatar || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{currentUser?.name}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser?.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl 
              text-red-400 hover:bg-red-500/10 hover:text-red-300 
              transition-all duration-200
              ${!sidebarOpen && 'justify-center'}
            `}
          >
            <FiLogOut className="text-lg flex-shrink-0" />
            {sidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors md:hidden"
              >
                <FiMenu size={20} />
              </button>
              
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search errors, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                           text-sm text-white placeholder-gray-500 
                           focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <FiBell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
              </motion.button>
              
              <div className="h-8 w-px bg-white/10" />
              
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-sm">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold text-white shadow-lg flex-shrink-0">
                  {currentUser?.avatar || 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewContent stats={DEMO_STATS} errors={DEMO_ERRORS} key="overview" />
            )}
            {activeTab === 'profile' && (
              <ProfileContent user={currentUser} onUpdate={handleProfileUpdate} key="profile" />
            )}
            {activeTab === 'errors' && <ErrorsContent errors={DEMO_ERRORS} key="errors" />}
            {activeTab === 'settings' && <SettingsContent key="settings" />}
            {activeTab === 'analytics' && <AnalyticsContent key="analytics" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// ✅ Overview Component
const OverviewContent = ({ stats, errors }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-6"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Monitor your application health in real-time</p>
      </div>
      <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
        ● All Systems Operational
      </span>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                   border border-white/10 rounded-2xl p-5 cursor-pointer
                   hover:border-violet-500/30 transition-all"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
          <div className="relative flex items-start justify-between">
            <div className={`p-3 rounded-xl bg-white/10 ${stat.iconColor}`}>
              <stat.icon size={22} />
            </div>
            <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              stat.trend === 'up' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="relative mt-4">
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Errors Table */}
      <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                    border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white">Recent Errors</h3>
          <button className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1">
            View All <FiChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase">Error</th>
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase">Project</th>
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase">Severity</th>
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {errors.map((error) => (
                <tr key={error.id} className="hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="py-4">
                    <p className="text-sm font-medium text-white truncate max-w-xs">{error.message}</p>
                  </td>
                  <td className="py-4 text-sm text-gray-300">{error.project}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      error.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      error.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      error.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {error.severity}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-400">{error.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                    border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-5">Quick Actions</h3>
        <div className="space-y-3">
          {[
            { icon: FiAlertTriangle, label: 'Report Error', color: 'text-red-400', bg: 'bg-red-500/20' },
            { icon: FiActivity, label: 'View Analytics', color: 'text-blue-400', bg: 'bg-blue-500/20' },
            { icon: FiSettings, label: 'Configure Alerts', color: 'text-violet-400', bg: 'bg-violet-500/20' },
          ].map((action, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-4 p-4 rounded-xl 
                       bg-white/5 hover:bg-white/10 border border-white/10 
                       hover:border-violet-500/30 transition-all group"
            >
              <div className={`p-2.5 rounded-lg ${action.bg} ${action.color}`}>
                <action.icon size={18} />
              </div>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {action.label}
              </span>
              <FiChevronRight className="ml-auto text-gray-500 group-hover:text-violet-400 transition-colors" size={16} />
            </button>
          ))}
        </div>

        {/* System Status */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-medium text-gray-400 mb-3">System Status</h4>
          <div className="space-y-3">
            {[
              { label: 'API Server', status: 'Operational', color: 'green' },
              { label: 'Database', status: 'Operational', color: 'green' },
              { label: 'Error Collector', status: 'Degraded', color: 'yellow' },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{service.label}</span>
                <span className={`flex items-center gap-1.5 ${
                  service.color === 'green' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    service.color === 'green' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ✅ Profile Component - Two Column Layout (No Backend)
const ProfileContent = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setShowSuccess(true);
    setIsEditing(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const inputClass = (editable) => `
    w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all
    ${editable ? 'border-white/20 focus:border-violet-500' : 'border-white/10 opacity-70 cursor-not-allowed'}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      {/* Success Toast */}
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-6 z-50 px-4 py-3 bg-green-500/20 border border-green-500/30 
                   rounded-xl text-green-400 flex items-center gap-2"
        >
          <FiCheck size={18} /> Profile updated successfully!
        </motion.div>
      )}

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 backdrop-blur-sm 
                    border border-violet-500/30 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 
                          flex items-center justify-center text-4xl font-bold text-white 
                          shadow-xl shadow-violet-500/30">
              {user?.avatar || 'U'}
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-violet-400 font-medium">{user?.role}</p>
            <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <span className="px-3 py-1.5 bg-white/10 rounded-lg text-sm text-gray-300">
                Member since {user?.joined}
              </span>
              <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                ✨ Pro Plan
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 
                     rounded-xl font-medium text-white hover:shadow-lg transition-all"
          >
            {isEditing ? <FiSave size={18} /> : <FiEdit3 size={18} />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Two Column Layout: Left=Summary, Right=Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Summary Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                        border border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold text-white mb-4">Activity Summary</h4>
            <div className="space-y-4">
              {[
                { label: 'Errors Reported', value: '156' },
                { label: 'Issues Resolved', value: '142' },
                { label: 'Projects', value: '8' },
                { label: 'Team Members', value: '12' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="font-semibold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                        border border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold text-white mb-4">Connected Services</h4>
            <div className="space-y-3">
              {['GitHub', 'GitLab', 'Slack'].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-sm text-gray-300">{service}</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/10 to-white/5 
                                               backdrop-blur-sm border border-white/10 
                                               rounded-2xl p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FiUser size={14} /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FiMail size={14} /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FiPhone size={14} /> Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FiBuilding size={14} /> Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FiMapPin size={14} /> Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <FiEdit3 size={14} /> Bio
              </label>
              <textarea
                rows="4"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                disabled={!isEditing}
                className={`${inputClass(isEditing)} resize-none`}
              />
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ ...user });
                  }}
                  className="px-5 py-2.5 text-gray-400 hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 
                           rounded-xl font-medium text-white hover:shadow-lg transition-all"
                >
                  💾 Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// ✅ Errors Component
const ErrorsContent = ({ errors }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-6xl mx-auto"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Error Logs</h1>
        <p className="text-gray-400 mt-1">Track and manage application errors</p>
      </div>
      <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl 
                       text-white font-medium transition-colors">
        + Report Error
      </button>
    </div>

    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                  border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left">
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase">Error ID</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase">Message</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase">Project</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase">Severity</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase">Time</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {errors.map((error) => (
              <tr key={error.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">#{error.id.toString().padStart(4, '0')}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-white">{error.message}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{error.project}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    error.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    error.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    error.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {error.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{error.time}</td>
                <td className="px-6 py-4">
                  <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

// ✅ Settings Component
const SettingsContent = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    language: 'en'
  });

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-violet-600' : 'bg-gray-600'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Customize your ErrorTrackr experience</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                      border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
          <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
            <div>
              <p className="font-medium text-gray-200">Dark Mode</p>
              <p className="text-sm text-gray-500">Use dark theme across the platform</p>
            </div>
            <ToggleSwitch enabled={settings.darkMode} onChange={(val) => setSettings({...settings, darkMode: val})} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm 
                      border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive error alerts via email' },
              { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get real-time browser notifications' },
              { key: 'weeklyReport', label: 'Weekly Reports', desc: 'Receive weekly summary reports' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                <div>
                  <p className="font-medium text-gray-200">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <ToggleSwitch enabled={settings[item.key]} onChange={(val) => setSettings({...settings, [item.key]: val})} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 
                           rounded-xl font-medium text-white hover:shadow-lg transition-all">
            Save Preferences
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ✅ Analytics Placeholder
const AnalyticsContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-4xl mx-auto text-center py-16"
  >
    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                  flex items-center justify-center">
      <FiTrendingUp className="text-violet-400" size={32} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">Analytics Coming Soon</h3>
    <p className="text-gray-400 max-w-md mx-auto">
      Detailed error trends and performance metrics will be available here.
    </p>
  </motion.div>
);

export default Dashboard;