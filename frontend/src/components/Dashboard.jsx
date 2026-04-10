// ✅ Dashboard.jsx - Spacious Professional Design
// ✅ Larger text, generous spacing, premium look
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiAlertTriangle, FiSettings, FiUser, FiLogOut, 
  FiMenu, FiX, FiActivity, FiTrendingUp, FiClock,
  FiBell, FiSearch, FiChevronRight, FiEdit3, FiSave,
  FiMail, FiPhone, FiBriefcase, FiMapPin, FiCheck,
  FiMonitor, FiFolder, FiPlus, FiArrowLeft, FiTrash2, FiCopy, FiKey
} from 'react-icons/fi';

// ✅ Demo stats
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

// ✅ Demo errors with project field
const DEMO_ERRORS = [
  { id: 1, message: 'TypeError: Cannot read property', project: 'E-Commerce App', time: '2 mins ago', severity: 'Critical' },
  { id: 2, message: 'ReferenceError: x is not defined', project: 'Blog Platform', time: '5 mins ago', severity: 'High' },
  { id: 3, message: 'SyntaxError: Unexpected token', project: 'API Service', time: '12 mins ago', severity: 'Medium' },
  { id: 4, message: 'RangeError: Invalid array length', project: 'Dashboard App', time: '1 hour ago', severity: 'Low' },
  { id: 5, message: 'URIError: Malformed URI', project: 'User Portal', time: '2 hours ago', severity: 'Medium' },
  { id: 6, message: 'TypeError: null is not an object', project: 'E-Commerce App', time: '3 hours ago', severity: 'High' },
  { id: 7, message: 'ReferenceError: process is not defined', project: 'API Service', time: '5 hours ago', severity: 'Critical' },
];

// ✅ Demo Projects Data
const DEMO_PROJECTS = [
  { id: 1, name: 'E-Commerce App', errors: 2, lastError: '2 mins ago', color: 'from-violet-500 to-fuchsia-500' },
  { id: 2, name: 'Blog Platform', errors: 1, lastError: '5 mins ago', color: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'API Service', errors: 2, lastError: '12 mins ago', color: 'from-green-500 to-emerald-500' },
  { id: 4, name: 'Dashboard App', errors: 1, lastError: '1 hour ago', color: 'from-orange-500 to-amber-500' },
  { id: 5, name: 'User Portal', errors: 1, lastError: '2 hours ago', color: 'from-pink-500 to-rose-500' },
];

const SidebarItems = [
  { id: 'overview', icon: FiHome, label: 'Dashboard' },
  { id: 'errors', icon: FiAlertTriangle, label: 'Error Logs' },
  { id: 'analytics', icon: FiTrendingUp, label: 'Analytics' },
  { id: 'profile', icon: FiUser, label: 'My Profile' },
  { id: 'settings', icon: FiSettings, label: 'Settings' },
];

// ✅ MAIN DASHBOARD COMPONENT
const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('errortrackr_projects');
      return saved ? JSON.parse(saved) : DEMO_PROJECTS;
    } catch {
      return DEMO_PROJECTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('errortrackr_projects', JSON.stringify(projects));
    } catch (e) {
      console.log('LocalStorage not available');
    }
  }, [projects]);
  
  const currentUser = user || {
    id: 'guest-000',
    name: 'Guest User',
    email: 'guest@errortrackr.com',
    avatar: 'G',
    role: 'Viewer',
    joined: 'Just now',
    phone: '',
    company: '',
    location: '',
    bio: '',
    timezone: 'Asia/Kolkata'
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    alert('👋 Logged out successfully!');
  };

  const handleProfileUpdate = (updatedData) => {
    if (setUser) {
      setUser(prev => prev ? { ...prev, ...updatedData } : updatedData);
    }
    return true;
  };

  const handleCreateProject = (newProject) => {
    const project = {
      id: Date.now(),
      name: newProject.name,
      errors: 0,
      lastError: 'Just now',
      color: newProject.color || 'from-violet-500 to-fuchsia-500'
    };
    setProjects(prev => [...prev, project]);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? All associated errors will be hidden.')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex font-sans h-screen overflow-hidden">
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ Sidebar - LARGER */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className={`
          ${sidebarOpen ? 'w-72' : 'w-20'} 
          bg-slate-900/80 backdrop-blur-xl border-r border-white/10 
          fixed md:relative z-40 h-screen transition-all duration-300
          flex flex-col overflow-hidden
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
                <FiAlertTriangle className="text-white text-lg" />
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent whitespace-nowrap">
                    ErrorTrackr
                  </h1>
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
        <nav className="flex-1 p-3 space-y-1.5 overflow-hidden">
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
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <item.icon className={`text-lg flex-shrink-0 ${activeTab === item.id ? 'text-violet-400' : ''}`} />
              {sidebarOpen && <span className="font-medium whitespace-nowrap text-sm">{item.label}</span>}
              {activeTab === item.id && sidebarOpen && (
                <FiChevronRight className="ml-auto text-violet-400 flex-shrink-0" size={16} />
              )}
            </motion.button>
          ))}
        </nav>
       

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2.5 flex-shrink-0">
          {sidebarOpen && currentUser?.name && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold text-white text-sm flex-shrink-0">
                {currentUser?.avatar || currentUser?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate text-white">{currentUser?.name}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser?.role || 'Member'}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl 
              text-red-400 hover:bg-red-500/10 hover:text-red-300 
              transition-all duration-200 text-sm
              ${!sidebarOpen && 'justify-center'}
            `}
          >
            <FiLogOut className="text-lg flex-shrink-0" />
            {sidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* ✅ Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* ✅ Header - LARGER */}
        <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-5 sm:px-7 py-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4 sm:gap-5">
            <div className="flex items-center gap-4 flex-1 max-w-lg">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors md:hidden"
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
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-sm text-white placeholder-gray-500 
                           focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <FiBell size={20} />
                <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900" />
              </motion.button>
              
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-sm text-white">{currentUser?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{currentUser?.email || 'user@example.com'}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold text-white text-sm shadow-lg flex-shrink-0">
                  {currentUser?.avatar || currentUser?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ✅ Page Content - ONLY THIS SCROLLS */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7 scroll-smooth">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewContent stats={DEMO_STATS} errors={DEMO_ERRORS} key="overview" />
            )}
            {activeTab === 'profile' && (
              <ProfileContent user={currentUser} onUpdate={handleProfileUpdate} key="profile" />
            )}
            {activeTab === 'errors' && (
              <ErrorsContent 
                user={currentUser}
                errors={DEMO_ERRORS} 
                projects={projects}
                onCreateProject={handleCreateProject}
                onDeleteProject={handleDeleteProject}
                key="errors" 
              />
            )}
            {activeTab === 'settings' && <SettingsContent user={currentUser} key="settings" />}
            {activeTab === 'analytics' && <AnalyticsContent key="analytics" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// ✅ Overview Component - SPACIOUS & PROFESSIONAL
const OverviewContent = ({ stats, errors }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -25 }}
    className="space-y-6 sm:space-y-8"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">Monitor your application health in real-time</p>
      </div>
      <span className="px-3.5 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium self-start sm:self-auto">
        ● All Systems Operational
      </span>
    </div>

    {/* ✅ Stats Grid - LARGER */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4 }}
          className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-violet-500/30 transition-all"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
          <div className="relative flex items-start justify-between">
            <div className={`p-3 rounded-xl bg-white/10 ${stat.iconColor}`}>
              <stat.icon size={22} />
            </div>
            <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
              stat.trend === 'up' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="relative mt-4">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1.5">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-7">
      {/* Recent Errors Table */}
      <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base sm:text-lg font-semibold text-white">Recent Errors</h3>
          <button className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1">
            View All <FiChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-4 text-xs font-medium text-gray-400 uppercase">Error</th>
                <th className="pb-4 text-xs font-medium text-gray-400 uppercase hidden sm:table-cell">Project</th>
                <th className="pb-4 text-xs font-medium text-gray-400 uppercase">Severity</th>
                <th className="pb-4 text-xs font-medium text-gray-400 uppercase hidden sm:table-cell">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {errors.slice(0, 5).map((error) => (
                <tr key={error.id} className="hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="py-4">
                    <p className="text-sm font-medium text-white truncate max-w-[150px] sm:max-w-[220px]">{error.message}</p>
                  </td>
                  <td className="py-4 text-sm text-gray-300 hidden sm:table-cell">{error.project}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      error.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      error.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      error.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {error.severity}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-400 hidden sm:table-cell">{error.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions & System Status */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-5">Quick Actions</h3>
        <div className="space-y-3">
          {[
            { icon: FiAlertTriangle, label: 'Report Error', color: 'text-red-400', bg: 'bg-red-500/20' },
            { icon: FiActivity, label: 'View Analytics', color: 'text-blue-400', bg: 'bg-blue-500/20' },
            { icon: FiSettings, label: 'Configure Alerts', color: 'text-violet-400', bg: 'bg-violet-500/20' },
          ].map((action, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 transition-all group"
            >
              <div className={`p-2.5 rounded-xl ${action.bg} ${action.color}`}>
                <action.icon size={18} />
              </div>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {action.label}
              </span>
              <FiChevronRight className="ml-auto text-gray-500 group-hover:text-violet-400 transition-colors" size={16} />
            </button>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-white/10">
          <h4 className="text-xs font-medium text-gray-400 mb-4">System Status</h4>
          <div className="space-y-4">
            {[
              { label: 'API Server', status: 'Operational', color: 'green' },
              { label: 'Database', status: 'Operational', color: 'green' },
              { label: 'Error Collector', status: 'Degraded', color: 'yellow' },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{service.label}</span>
                <span className={`flex items-center gap-2 ${service.color === 'green' ? 'text-green-400' : 'text-yellow-400'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${service.color === 'green' ? 'bg-green-400' : 'bg-yellow-400'}`} />
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

// ✅ Profile Component - SPACIOUS
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
    w-full px-5 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all text-base
    ${editable ? 'border-white/20 focus:border-violet-500' : 'border-white/10 opacity-70 cursor-not-allowed'}
  `;

  const avatarInitial = user?.avatar || user?.name?.[0]?.toUpperCase() || 'U';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      className="max-w-6xl mx-auto"
    >
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 right-5 sm:right-7 z-50 px-5 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-2.5 text-base"
        >
          <FiCheck size={18} /> Profile updated successfully!
        </motion.div>
      )}

      {/* Profile Header */}
      <div className="bg-violet-600/20 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-5 sm:p-7 mb-5 sm:mb-7">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-xl shadow-violet-500/30">
              {avatarInitial}
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">{user?.name || 'User Name'}</h2>
            <p className="text-violet-400 font-medium text-base">{user?.role || 'Member'}</p>
            <p className="text-gray-400 text-sm mt-2">{user?.email || 'user@example.com'}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <span className="px-3.5 py-1.5 bg-white/10 rounded-xl text-sm text-gray-300">
                Member since {user?.joined || '2024'}
              </span>
              <span className="px-3.5 py-1.5 bg-green-500/20 text-green-400 rounded-xl text-sm font-medium">
                ✨ Pro Plan
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white hover:shadow-lg transition-all text-base"
          >
            {isEditing ? <FiSave size={18} /> : <FiEdit3 size={18} />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-7">
        {/* Sidebar Stats */}
        <div className="lg:col-span-1 space-y-5 sm:space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6">
            <h4 className="font-semibold text-white mb-4 text-base">Activity Summary</h4>
            <div className="space-y-4">
              {[
                { label: 'Errors Reported', value: '156' },
                { label: 'Issues Resolved', value: '142' },
                { label: 'Projects', value: '8' },
                { label: 'Team Members', value: '12' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="font-semibold text-white text-base">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6">
            <h4 className="font-semibold text-white mb-4 text-base">Connected Services</h4>
            <div className="space-y-3">
              {['GitHub', 'GitLab', 'Slack'].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl">
                  <span className="text-sm text-gray-300">{service}</span>
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-sm font-medium text-gray-300">
                  <FiUser size={16} /> Full Name
                </label>
                <input type="text" value={formData?.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-sm font-medium text-gray-300">
                  <FiMail size={16} /> Email Address
                </label>
                <input type="email" value={formData?.email || ''} disabled className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed text-base" />
              </div>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-sm font-medium text-gray-300">
                  <FiPhone size={16} /> Phone Number
                </label>
                <input type="tel" value={formData?.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-sm font-medium text-gray-300">
                  <FiBriefcase size={16} /> Company
                </label>
                <input type="text" value={formData?.company || ''} onChange={(e) => setFormData({...formData, company: e.target.value})} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div className="space-y-2.5 sm:col-span-2">
                <label className="flex items-center gap-2.5 text-sm font-medium text-gray-300">
                  <FiMapPin size={16} /> Location
                </label>
                <input type="text" value={formData?.location || ''} onChange={(e) => setFormData({...formData, location: e.target.value})} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 text-sm font-medium text-gray-300">
                <FiEdit3 size={16} /> Bio
              </label>
              <textarea rows="4" value={formData?.bio || ''} onChange={(e) => setFormData({...formData, bio: e.target.value})} disabled={!isEditing} className={`${inputClass(isEditing)} resize-none`} />
            </div>
            {isEditing && (
              <div className="flex justify-end gap-4 pt-5 border-t border-white/10">
                <button type="button" onClick={() => { setIsEditing(false); setFormData({ ...user }); }} className="px-5 py-2.5 text-gray-400 hover:text-white font-medium transition-colors text-base">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white hover:shadow-lg transition-all text-base">💾 Save Changes</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// ✅ Errors Component - SPACIOUS

const ErrorsContent = ({ user }) => {
  // 📦 Internal State with LocalStorage Persistence (Dummy Data Removed)
  const [projects, setProjects] = useState([]);

  const [errors, setErrors] = useState([]);

  const [resolvedErrors, setResolvedErrors] = useState(() => {
    try {
      const saved = localStorage.getItem('errortrackr_resolved');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('from-violet-500 to-fuchsia-500');

  // 💾 Sync State to LocalStorage
  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://localhost:5000/projects/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Fetched Projects:", res.data); // 🔥 DEBUG

      setProjects(res.data); // ✅ IMPORTANT

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchProjects();
}, []);

  useEffect(()=>{
    const fetchErrors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/geterrors/${selectedProject._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched Errors:", res.data);
        setErrors(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }}
      fetchErrors();
},[user._id,projects,selectedProject]);

  useEffect(() => { localStorage.setItem('errortrackr_resolved', JSON.stringify(resolvedErrors)); }, [resolvedErrors]);

  const colorOptions = [
    'from-violet-500 to-fuchsia-500', 'from-blue-500 to-cyan-500', 
    'from-green-500 to-emerald-500', 'from-orange-500 to-amber-500', 
    'from-pink-500 to-rose-500', 'from-purple-500 to-indigo-500'
  ];

  const projectFilteredErrors = selectedProject 
    ? errors.filter(e => e.project === selectedProject.name) 
    : errors;
  
  const toggleResolve = (errorId) => 
    setResolvedErrors(prev => prev.includes(errorId) ? prev.filter(id => id !== errorId) : [...prev, errorId]);
  
  const isResolved = (errorId) => resolvedErrors.includes(errorId);

  // ✅ Create Project

const handleCreateProject = async (e) => {
  e.preventDefault();

  if (!newProjectName.trim()) return;

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("http://localhost:5000/createproject", {
      name: newProjectName.trim(),
      color: newProjectColor,
      userId: user._id,
    },
    {
        headers: {
          Authorization: `Bearer ${token}` // 🔥 IMPORTANT
        }
      }
  );

    // ✅ backend se jo project aaya usko state me add karo
    setProjects(prev => [...prev, res.data]);

    // reset form
    setNewProjectName('');
    setShowCreateModal(false);

  } catch (error) {
    console.error("Project create error:", error);
  }
};

  // 🗑️ Delete Project & Associated Errors

const handleDeleteProject = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    const targetProject = projects.find(p => p._id === projectId);
    if (!targetProject){
      console.log("Project not found for deletion:", projectId);
      return;
    }
    await axios.delete(`http://localhost:5000/delete/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // ✅ Update UI after success
    setProjects(prev => prev.filter(p => p._id !== projectId));
    setErrors(prev => prev.filter(e => e.project !== targetProject.name));

    if (selectedProject?._id === projectId) {
      setSelectedProject(null);
    }

  } catch (error) {
    console.error("Delete Error:", error);
    alert("Failed to delete project");
  }
};

  // 🟢 Resolve All in Selected Project
  const handleResolveAll = () => {
    if (!selectedProject) return;
    const ids = errors.filter(e => e.project === selectedProject.name).map(e => e.id);
    setResolvedErrors(prev => [...new Set([...prev, ...ids])]);
  };

  const totalErrors = projectFilteredErrors.length;
  const resolvedCount = projectFilteredErrors.filter(e => isResolved(e.id)).length;
  const activeCount = totalErrors - resolvedCount;

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} className="max-w-7xl mx-auto">
      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white">Create New Project</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-5">
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-gray-300">Project Name</label>
                <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} placeholder="e.g., Mobile App, API Service..." className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-base" required />
              </div>
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-gray-300">Color Theme</label>
                <div className="flex gap-2.5 flex-wrap">
                  {colorOptions.map((color, i) => (
                    <button key={i} type="button" onClick={() => setNewProjectColor(color)} className={`w-9 h-9 rounded-xl bg-gradient-to-r ${color} transition-all ${newProjectColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'opacity-70 hover:opacity-100'}`} />
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white hover:shadow-lg transition-all text-base">✨ Create Project</button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          {selectedProject && (
            <button onClick={() => setSelectedProject(null)} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
              <FiArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{selectedProject ? `${selectedProject.name} - Errors` : 'Error Logs'}</h1>
            
            <p className="text-gray-400 mt-2 text-sm">{selectedProject ? `${activeCount} active • ${resolvedCount} resolved` : `${projects.length} projects • ${errors.length} total errors`}</p>
          </div>
        </div>
        {!selectedProject && (
          <button onClick={() => setShowCreateModal(true)} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors flex items-center gap-2.5 text-base">
            <FiPlus size={18} /> Create Project
          </button>
        )}
        {selectedProject && (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6 p-4 sm:p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
    
    {/* Left Side: Icon + Label */}
    <div className="flex items-center gap-3 min-w-0">
      <div className="p-2.5 rounded-xl bg-violet-500/20 text-violet-400 flex-shrink-0">
        <FiKey size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">API Key</p>
        <p className="text-xs text-gray-400 truncate">Project: {selectedProject.name}</p>
      </div>
    </div>

    {/* Right Side: Input + Copy Button */}
    <div className="flex items-center gap-2.5 w-full sm:w-auto">
      <input
        type="text"
        value={selectedProject.apiKey || 'Not generated yet'}
        readOnly
        className="flex-1 sm:w-64 px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl 
                   text-sm text-violet-300 font-mono focus:outline-none focus:border-violet-500/50"
      />
      <button
        onClick={() => {
          if (selectedProject.apiKey) {
            navigator.clipboard.writeText(selectedProject.apiKey);
            alert('✅ API Key copied!');
          }
        }}
        className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl 
                   text-white text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        <FiCopy size={16} /> Copy
      </button>
    </div>

  </div>
)}
      </div>

      {/* Stats */}
      {selectedProject && (
          <div className="grid grid-cols-3 gap-4 mb-5 sm:mb-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4.5 text-center">
          <p className="text-xl font-bold text-white">{errors.length}</p>
          <p className="text-sm text-gray-400 mt-1">Total</p>
        </div>
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4.5 text-center">
          <p className="text-xl font-bold text-red-400">{activeCount}</p>
          <p className="text-sm text-gray-400 mt-1">Active</p>
        </div>
        <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4.5 text-center">
          <p className="text-xl font-bold text-green-400">{resolvedCount}</p>
          <p className="text-sm text-gray-400 mt-1">Resolved</p>
        </div>
      </div>
        )}
      

      {/* Projects Grid */}
      {!selectedProject && projects.length > 0 && (
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Your Projects</h3>
            <span className="text-sm text-gray-500">{projects.length} projects</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {projects.map((project) => {
              const projectErrors = errors.filter(e => e.project === project.name);
              const projectResolved = projectErrors.filter(e => isResolved(e.id)).length;
              const projectActive = projectErrors.length - projectResolved;
              return (
                <motion.button key={project._id} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedProject(project)} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4.5 text-left hover:border-violet-500/30 transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
                    <span className="font-medium text-white text-sm truncate">{project.name}</span>
                  </div>
                </motion.button>
              );
            })}
            <button onClick={() => setShowCreateModal(true)} className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-4.5 text-gray-400 hover:text-white hover:border-violet-500/50 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2.5 min-h-[85px]">
              <FiPlus size={20} />
              <span className="text-sm">Add Project</span>
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedProject && projects.length === 0 && (
        <div className="text-center py-10 sm:py-12 bg-white/5 rounded-2xl border border-white/10 mb-5 sm:mb-6">
          <FiFolder className="mx-auto text-gray-600 mb-4" size={32} />
          <h3 className="text-lg font-medium text-white mb-2">No Projects Yet</h3>
          <p className="text-gray-400 text-sm mb-5">Create your first project to start tracking errors</p>
          <button onClick={() => setShowCreateModal(true)} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors text-base">✨ Create Project</button>
        </div>
      )}

      {/* Errors Table */}
      {selectedProject && (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead className="bg-white/5">
          <tr className="text-left">
            <th className="px-5 sm:px-6 py-4 text-xs font-medium text-gray-400 uppercase">Error ID</th>
            <th className="px-5 sm:px-6 py-4 text-xs font-medium text-gray-400 uppercase">Message</th>
            <th className="px-5 sm:px-6 py-4 text-xs font-medium text-gray-400 uppercase hidden md:table-cell">Source / Location</th>
            <th className="px-5 sm:px-6 py-4 text-xs font-medium text-gray-400 uppercase">Severity</th>
            <th className="px-5 sm:px-6 py-4 text-xs font-medium text-gray-400 uppercase hidden sm:table-cell">Created At</th>
            <th className="px-5 sm:px-6 py-4 text-xs font-medium text-gray-400 uppercase">Status</th>
            <th className="px-5 sm:px-6 py-4 text-xs font-medium text-gray-400 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {errors.length > 0 ? (
            errors.map((error) => {
              const resolved = isResolved(error._id); // ✅ MongoDB uses _id
              return (
                <tr key={error._id} className={`transition-colors ${resolved ? 'opacity-60 bg-green-500/5' : 'hover:bg-white/5'}`}>
                  {/* Error ID: Last 6 chars of ObjectId for readability */}
                  <td className="px-5 sm:px-6 py-4 text-sm text-gray-400 font-mono">
                    #{error._id.toString().slice(-6).toUpperCase()}
                  </td>

                  {/* Message */}
                  <td className="px-5 sm:px-6 py-4">
                    <p className={`text-sm font-medium ${resolved ? 'text-gray-500 line-through' : 'text-white'} whitespace-normal break-words max-w-md`}>
                      {error.message}
                    </p>
                  </td>

                  {/* Source & Location (from schema) */}
                  <td className="px-5 sm:px-6 py-4 hidden md:table-cell">
                    {error.source ? (
                      <span className="text-sm text-gray-400 font-mono">
                        {error.source}:{error.lineno}{error.colno ? `:${error.colno}` : ''}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-600">-</span>
                    )}
                  </td>

                  {/* Severity */}
                  <td className="px-5 sm:px-6 py-4">
                    <span className={`px-3.5 py-1.5 rounded-full text-xs font-medium ${
                      error.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      error.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      error.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    } ${resolved ? 'opacity-50' : ''}`}>
                      {error.severity}
                    </span>
                  </td>

                  {/* Time: uses Mongoose timestamps */}
                  <td className="px-5 sm:px-6 py-4 text-sm text-gray-400 hidden sm:table-cell">
                    {new Date(error.createdAt).toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-5 sm:px-6 py-4">
                    {resolved ? (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 flex items-center gap-1.5 w-fit">
                        <FiCheck size={14} /> Resolved
                      </span>
                    ) : (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">Active</span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="px-5 sm:px-6 py-4">
                    <button 
                      onClick={() => toggleResolve(error._id)} 
                      className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                        resolved ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'
                      }`}
                    >
                      {resolved ? <><FiEdit3 size={14} /> Reopen</> : <><FiCheck size={14} /> Resolve</>}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              {/* colSpan matches header count (7 columns) */}
              <td colSpan={7} className="px-5 sm:px-6 py-10 text-center">
                <div className="flex flex-col items-center gap-4">
                  <FiFolder className="text-gray-600" size={28} />
                  <p className="text-gray-400 text-sm">No errors found for this project</p>
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="text-sm text-violet-400 hover:text-violet-300 font-medium"
                  >
                    View all projects
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

      {/* Project Actions */}
      {selectedProject && (
        <div className="mt-4 flex justify-end gap-4">
          <button onClick={handleResolveAll} className="px-4.5 py-2.5 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-xl transition-colors flex items-center gap-2.5 text-sm">
            <FiCheck size={16} /> Resolve All
          </button>
          <button onClick={() => handleDeleteProject(selectedProject._id)} className="px-4.5 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors flex items-center gap-2.5 text-sm">
            <FiTrash2 size={16} /> Delete Project
          </button>
        </div>
      )}
    </motion.div>
  );
};


// ✅ Settings Component - SPACIOUS
const SettingsContent = ({ user }) => {
  const [activeSecurityTab, setActiveSecurityTab] = useState('change-password');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState(user?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [devices, setDevices] = useState([
    { id: 1, name: 'Chrome on Windows', location: user?.location || 'India', lastActive: 'Now', current: true },
    { id: 2, name: 'Safari on iPhone', location: 'Delhi, India', lastActive: '2 hours ago', current: false },
    { id: 3, name: 'Firefox on macOS', location: 'Bangalore, India', lastActive: '1 day ago', current: false },
  ]);

  const handleChangePassword = (e) => {
    e.preventDefault(); setPasswordError(''); setPasswordSuccess('');
    if (newPass.length < 8) { setPasswordError('Password must be at least 8 characters'); return; }
    if (newPass !== confirmPass) { setPasswordError('Passwords do not match'); return; }
    setPasswordSuccess('✅ Password changed successfully!'); setCurrentPassword(''); setNewPass(''); setConfirmPass('');
    setTimeout(() => setPasswordSuccess(''), 3000);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (forgotStep === 1) setForgotStep(2);
    else if (forgotStep === 2) { if (otp === '123456') setForgotStep(3); else alert('❌ Invalid OTP. Try: 123456'); }
    else if (forgotStep === 3) { if (newPassword === confirmPassword && newPassword.length >= 8) { alert('✅ Password reset successfully!'); setShowForgotPassword(false); setForgotStep(1); setForgotEmail(user?.email || ''); setOtp(''); setNewPassword(''); setConfirmPassword(''); } else alert('❌ Passwords must match and be at least 8 characters'); }
  };

  const handleRevokeDevice = (deviceId) => { setDevices(devices.filter(d => d.id !== deviceId)); alert('✅ Device logged out successfully'); };
  const handleRevokeAll = () => { setDevices(devices.filter(d => d.current)); alert('✅ All other devices logged out successfully'); };

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} className="max-w-2xl mx-auto">
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-semibold text-white">{forgotStep === 1 ? 'Forgot Password' : forgotStep === 2 ? 'Enter OTP' : 'Set New Password'}</h3><button onClick={() => setShowForgotPassword(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button></div>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
              {forgotStep === 1 && (<>
                <p className="text-sm text-gray-400">Enter your email to receive a reset OTP</p>
                <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="your@email.com" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-base" required />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white hover:shadow-lg transition-all text-base">Send OTP</button>
              </>)}
              {forgotStep === 2 && (<>
                <p className="text-sm text-gray-400">Enter the 6-digit OTP sent to <span className="text-violet-400">{forgotEmail}</span></p>
                <p className="text-xs text-gray-500">Demo OTP: <span className="text-green-400 font-mono">123456</span></p>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="123456" maxLength={6} className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-center tracking-widest text-lg" required />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white hover:shadow-lg transition-all text-base">Verify OTP</button>
              </>)}
              {forgotStep === 3 && (<>
                <p className="text-sm text-gray-400">Create your new password</p>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (min 8 chars)" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-base" required />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-base" required />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-medium text-white hover:shadow-lg transition-all text-base">Reset Password</button>
              </>)}
            </form>
          </motion.div>
        </div>
      )}
      <div className="mb-5"><h1 className="text-xl sm:text-2xl font-bold text-white">Security Settings</h1><p className="text-gray-400 mt-2 text-base">Manage your account security</p></div>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-semibold text-white">🔐 Account Security</h3><button onClick={() => setShowForgotPassword(true)} className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1.5">Forgot Password? <FiChevronRight size={16} /></button></div>
        <div className="flex gap-2.5 mb-5 border-b border-white/10 pb-4 overflow-x-auto">
          {[{ id: 'change-password', label: 'Change Password' }, { id: 'devices', label: 'Device Logins' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveSecurityTab(tab.id)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeSecurityTab === tab.id ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{tab.label}</button>
          ))}
        </div>
        {activeSecurityTab === 'change-password' && (
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div className="space-y-2.5"><label className="text-sm font-medium text-gray-300">Current Password</label><input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all text-base" placeholder="••••••••" required /></div>
            <div className="space-y-2.5"><label className="text-sm font-medium text-gray-300">New Password</label><input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all text-base" placeholder="Min. 8 characters" required /></div>
            <div className="space-y-2.5"><label className="text-sm font-medium text-gray-300">Confirm New Password</label><input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all text-base" placeholder="••••••••" required /></div>
            {passwordError && <p className="text-sm text-red-400 flex items-center gap-2"><FiAlertTriangle size={16} /> {passwordError}</p>}
            {passwordSuccess && <p className="text-sm text-green-400 flex items-center gap-2"><FiCheck size={16} /> {passwordSuccess}</p>}
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all text-base">💾 Update Password</button>
          </form>
        )}
        {activeSecurityTab === 'devices' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between"><p className="text-sm text-gray-400">Manage your active sessions</p><button onClick={handleRevokeAll} className="text-sm text-red-400 hover:text-red-300 font-medium flex items-center gap-2">Logout All Devices <FiLogOut size={16} /></button></div>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${device.current ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}><FiMonitor size={18} /></div>
                    <div><p className="font-medium text-white text-sm">{device.name}</p><p className="text-xs text-gray-500">{device.location} • {device.lastActive}</p>{device.current && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs mt-1.5"><FiCheck size={12} /> Current Session</span>}</div>
                  </div>
                  {!device.current && <button onClick={() => handleRevokeDevice(device.id)} className="px-3.5 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">Revoke</button>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ✅ Analytics Placeholder - SPACIOUS
const AnalyticsContent = () => (
  <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} className="max-w-4xl mx-auto text-center py-16 sm:py-20">
    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center"><FiTrendingUp className="text-violet-400" size={26} /></div>
    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">Analytics Coming Soon</h3>
    <p className="text-gray-400 text-base max-w-md mx-auto">Detailed error trends and performance metrics will be available here.</p>
  </motion.div>
);

export default Dashboard;