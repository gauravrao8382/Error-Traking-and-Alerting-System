// ✅ Dashboard.jsx - FIXED SIDEBAR (Responsive + Collapse Logic)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiAlertTriangle, FiSettings, FiUser, FiLogOut, 
  FiMenu, FiX, FiActivity, FiTrendingUp, FiClock,
  FiBell, FiSearch, FiChevronRight, FiEdit3, FiSave,
  FiMail, FiPhone, FiBriefcase, FiMapPin, FiCheck,
  FiMonitor, FiFolder, FiPlus, FiArrowLeft, FiTrash2, FiCopy, FiKey,FiBook
} from 'react-icons/fi';
import { successToast, errorToast } from "../utils/Toast";


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
  
  // ✅ Separate states for Mobile vs Desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false);      // Mobile: Sidebar open/close
  const [isCollapsed, setIsCollapsed] = useState(false);         // Desktop: Sidebar collapsed/expanded
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(user);

  // ✅ Handle window resize to reset mobile state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false); // Close mobile menu if switched to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    successToast("Logged out successfully!");
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex font-sans h-screen overflow-hidden">
      
      {/* ✅ Mobile Overlay (Z-Index 40) */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ✅ Sidebar - Dual Logic (Mobile Slide / Desktop Collapse) */}
      <motion.aside
        // Mobile: Slide in/out based on isMobileOpen
        // Desktop: Always visible, width changes based on isCollapsed
        initial={false}
        animate={{ 
          x: isMobileOpen ? 0 : (window.innerWidth < 768 ? -280 : 0),
          width: isCollapsed ? '80px' : '280px'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed md:relative z-50 h-full 
          bg-slate-900/95 backdrop-blur-xl border-r border-white/10 
          flex flex-col overflow-hidden
          ${!isCollapsed ? 'w-72' : 'w-20'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo Area */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex-shrink-0 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
              <FiAlertTriangle className="text-white text-lg" />
            </div>
            {/* Text only shows when NOT collapsed AND on desktop (or mobile open) */}
            <motion.h1 
              initial={{ opacity: 0 }} 
              animate={{ opacity: !isCollapsed ? 1 : 0 }} 
              className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent whitespace-nowrap"
            >
              ErrorTrackr
            </motion.h1>
          </div>
          
          {/* Close Button (Mobile Only) */}
          <button 
            onClick={() => setIsMobileOpen(false)} 
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {SidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setIsMobileOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <item.icon className={`text-lg flex-shrink-0 ${activeTab === item.id ? 'text-violet-400' : ''}`} />
              
              {/* Label with collapse animation */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: !isCollapsed ? 1 : 0 }}
                className="font-medium text-sm whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
              
              {activeTab === item.id && !isCollapsed && (
                <FiChevronRight className="ml-auto text-violet-400 flex-shrink-0" size={16} />
              )}
            </motion.button>
          ))}
        </nav>
       
        {/* User & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3 flex-shrink-0">
          {/* User Info - Collapsible */}
          <motion.div 
            animate={{ opacity: !isCollapsed ? 1 : 0 }}
            className={`flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5 overflow-hidden ${isCollapsed ? 'hidden' : 'flex'}`}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold text-white text-xs flex-shrink-0">
              {currentUser?.avatar || currentUser?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-white">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser?.role || 'Member'}</p>
            </div>
          </motion.div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3.5 py-3 rounded-xl 
              text-red-400 hover:bg-red-500/10 hover:text-red-300 
              transition-all duration-200 text-sm justify-center md:justify-start
            `}
          >
            <FiLogOut className="text-lg flex-shrink-0" />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: !isCollapsed ? 1 : 0 }}
              className="font-medium whitespace-nowrap overflow-hidden"
            >
              Logout
            </motion.span>
          </button>
        </div>
      </motion.aside>

      {/* ✅ Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        
        {/* ✅ Header - Responsive */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              {/* ✅ Hamburger Menu - Only for Mobile to Open Sidebar */}
              <button 
                onClick={() => setIsMobileOpen(true)} 
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors md:hidden"
              >
                <FiMenu size={22} />
              </button>

              {/* ✅ Collapse Toggle - Only for Desktop */}
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
              </button>
              
              {/* Search */}
              <div className="relative flex-1 max-w-md hidden sm:block">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search errors, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                           text-sm text-white placeholder-gray-500 
                           focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <FiBell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
              </motion.button>
              
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden xs:block">
                  <p className="font-semibold text-sm text-white leading-tight">{currentUser?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 leading-tight truncate max-w-[100px]">{currentUser?.email}</p>
                </div>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold text-white text-sm shadow-lg flex-shrink-0 cursor-pointer"
                onClick={() => setActiveTab("profile")}>
                  {currentUser?.avatar || currentUser?.name?.[0]?.toUpperCase() || 'U'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ✅ Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewContent user={currentUser} setActiveTab={setActiveTab} key="overview" />
            )}
            {activeTab === 'profile' && (
              <ProfileContent user={currentUser} setUser={setUser} key="profile" />
            )}
            {activeTab === 'errors' && (
              <ErrorsContent user={currentUser} key="errors" />
            )}
            {activeTab === 'settings' && <SettingsContent user={currentUser} key="settings" />}
            {activeTab === 'analytics' && <AnalyticsContent key="analytics" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// ✅ Overview Content (Same as before, just ensuring imports are correct)
const OverviewContent = ({user, setActiveTab}) => {
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
      if (!user?._id) return; 
      const fetchErrors = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/getUserErrors/${user._id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setErrors(res.data);
          } catch (err) { console.error("Fetch error:", err); }
        };
        fetchErrors();
      }, [user?._id]); 

    const stats = [
      { icon: FiAlertTriangle, label: 'Total Errors', value: errors.length, change: '+12%', trend: 'up', color: 'from-red-500/20 to-red-600/10', iconColor: 'text-red-400' },
      { icon: FiActivity, label: 'Active Issues', value: errors.filter(e => e.status === "Active").length, change: '-5%', trend: 'down', color: 'from-yellow-500/20 to-yellow-600/10', iconColor: 'text-yellow-400' },
      { icon: FiTrendingUp, label: 'Resolved', value: errors.filter(e => e.status === "Resolved").length, change: '+18%', trend: 'up', color: 'from-green-500/20 to-green-600/10', iconColor: 'text-green-400' },
      { icon: FiClock, label: 'Avg. Resolution', value: '1.3h', change: '-10%', trend: 'down', color: 'from-blue-500/20 to-blue-600/10', iconColor: 'text-blue-400' },
    ];

  return (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -25 }}
    className="space-y-5 sm:space-y-6"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1 text-sm">Monitor your application health</p>
      </div>
      <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs sm:text-sm font-medium self-start sm:self-auto">
        ● Operational
      </span>
    </div>

    {/* ✅ Stats Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -3 }}
          className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 cursor-pointer hover:border-violet-500/30 transition-all"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
          <div className="relative flex items-start justify-between">
            <div className={`p-2.5 rounded-lg sm:rounded-xl bg-white/10 ${stat.iconColor}`}>
              <stat.icon size={20} />
            </div>
            <span className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${
              stat.trend === 'up' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="relative mt-3 sm:mt-4">
            <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-[11px] sm:text-sm mt-1">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Recent Errors Table */}
      <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">Recent Errors</h3>
          <button onClick={() => setActiveTab('errors')} className="text-xs sm:text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1">
            View All <FiChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase">Error</th>
                <th className="pb-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase hidden sm:table-cell">Project</th>
                <th className="pb-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase">Severity</th>
                <th className="pb-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase hidden xs:table-cell">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {errors.slice(0, 5).map((error) => (
                <tr key={error.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-2">
                    <p className="text-xs sm:text-sm font-medium text-white truncate max-w-[120px] sm:max-w-none">{error.message}</p>
                  </td>
                  <td className="py-3 text-xs sm:text-sm text-gray-300 hidden sm:table-cell">{error.project}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                      error.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      error.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      error.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {error.severity}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-gray-400 hidden xs:table-cell">{new Date(error.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
        <h3 className="text-base font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-2.5">
          {[
            { icon: FiAlertTriangle, label: 'Report Error', color: 'text-red-400', bg: 'bg-red-500/20' },
            { icon: FiActivity, label: 'View Analytics', color: 'text-blue-400', bg: 'bg-blue-500/20' },
            { icon: FiSettings, label: 'Configure Alerts', color: 'text-violet-400', bg: 'bg-violet-500/20' },
          ].map((action, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 transition-all group"
            >
              <div className={`p-2 rounded-lg ${action.bg} ${action.color}`}>
                <action.icon size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {action.label}
              </span>
              <FiChevronRight className="ml-auto text-gray-500 group-hover:text-violet-400 transition-colors" size={14} />
            </button>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/10">
          <h4 className="text-xs font-medium text-gray-400 mb-3">System Status</h4>
          <div className="space-y-3">
            {[
              { label: 'API Server', status: 'Operational', color: 'green' },
              { label: 'Database', status: 'Operational', color: 'green' },
              { label: 'Error Collector', status: 'Degraded', color: 'yellow' },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-gray-300">{service.label}</span>
                <span className={`flex items-center gap-1.5 ${service.color === 'green' ? 'text-green-400' : 'text-yellow-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${service.color === 'green' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);};

// ✅ Profile Component - SCHEMA MATCHED + Responsive
const ProfileContent = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Helper: Get Member Since Year from createdAt
  const getMemberSinceYear = () => {
    if (!user?.createdAt) return 'N/A';
    const date = new Date(user.createdAt);
    return isNaN(date.getTime()) ? 'N/A' : date.getFullYear().toString();
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.userType === 'student' && !formData.college) {
        return alert("Please fill College name");
      }
      if (formData.userType === 'employee' && (!formData.company || !formData.experience)) {
        return alert("Please fill Company and Experience");
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(
          `http://localhost:5000/update-profile/${user._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setShowSuccess(true);
        setIsEditing(false);
        successToast("Profile updated successfully!");
        setTimeout(() => setShowSuccess(false), 3000);

      } catch (err) {
        console.error(err);
        errorToast(err.response?.data?.message || "Update failed");
      }
    };

  const inputClass = (editable) => `
    w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all text-sm sm:text-base
    ${editable ? 'border-white/20 focus:border-violet-500' : 'border-white/10 opacity-70 cursor-not-allowed'}
  `;

  const avatarInitial = user?.avatar || user?.name?.[0]?.toUpperCase() || 'U';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      className="max-w-5xl mx-auto"
    >
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 left-4 sm:left-auto sm:w-auto z-50 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-2 text-sm"
        >
          <FiCheck size={16} /> Profile updated!
        </motion.div>
      )}

      {/* Profile Header */}
      <div className="bg-violet-600/20 backdrop-blur-sm border border-violet-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg">
              {avatarInitial}
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-white">{user?.name || 'User Name'}</h2>
            <p className="text-violet-400 font-medium text-sm capitalize">{user?.userType || 'Member'}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{user?.email || 'user@example.com'}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              {/* ✅ Dynamic Member Since from createdAt */}
              <span className="px-3 py-1 bg-white/10 rounded-lg text-xs text-gray-300">
                Member since {getMemberSinceYear()}
              </span>
              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                user?.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {user?.isVerified ? '✅ Verified' : '⏳ Pending'}
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              if (isEditing) {
                handleSubmit(e); // ✅ SAVE CLICK
              } else {
                setIsEditing(true); // ✅ EDIT CLICK
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white text-sm"
          >
            {isEditing ? <FiSave size={16} /> : <FiEdit3 size={16} />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sidebar Stats */}
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-3 text-sm">Profile Info</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">User Type</span>
                <span className="font-semibold text-white text-sm capitalize">{user?.userType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">Status</span>
                <span className={`text-sm ${user?.isVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                  {user?.isVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">Joined</span>
                <span className="font-semibold text-white text-sm">{getMemberSinceYear()}</span>
              </div>
            </div>
          </div>

          {/* Schema-based Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-3 text-sm">
              {user?.userType === 'student' ? 'Education' : 'Work'}
            </h4>
            <div className="space-y-3">
              {user?.userType === 'student' ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">College</span>
                    <span className="font-semibold text-white text-sm text-right truncate max-w-[120px]">
                      {user?.college || '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Course</span>
                    <span className="font-semibold text-white text-sm text-right truncate max-w-[120px]">
                      {user?.course || '-'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Company</span>
                    <span className="font-semibold text-white text-sm text-right truncate max-w-[120px]">
                      {user?.company || '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Experience</span>
                    <span className="font-semibold text-white text-sm">
                      {user?.experience ? `${user.experience} yrs` : '-'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <FiUser size={14} /> Full Name
              </label>
              <input 
                type="text" 
                value={formData?.name || ''} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                disabled={!isEditing} 
                className={inputClass(isEditing)} 
                placeholder="Your name" 
              />
            </div>
            
            {/* Email (Read-only) */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <FiMail size={14} /> Email Address
              </label>
              <input 
                type="email" 
                value={formData?.email || ''} 
                disabled 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed text-sm" 
              />
            </div>

            {/* ✅ User Type Toggle */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <FiBriefcase size={14} /> I am a...
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => isEditing && setFormData({ ...formData, userType: 'student', company: '', experience: '' })}
                  disabled={!isEditing}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all border ${
                    formData.userType === 'student'
                      ? 'bg-violet-600/20 border-violet-500/30 text-violet-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FiUser size={14} /> Student
                </button>
                <button
                  type="button"
                  onClick={() => isEditing && setFormData({ ...formData, userType: 'employee', college: '', course: '' })}
                  disabled={!isEditing}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all border ${
                    formData.userType === 'employee'
                      ? 'bg-violet-600/20 border-violet-500/30 text-violet-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FiBriefcase size={14} /> Professional
                </button>
              </div>
            </div>

            {/* ✅ Conditional Fields with Animation */}
            <AnimatePresence mode="wait">
              {formData.userType === 'student' ? (
                /* 👉 STUDENT FIELDS */
                <motion.div
                  key="student"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                      <FiUser size={14} /> College / University
                    </label>
                    <input 
                      type="text" 
                      value={formData?.college || ''} 
                      onChange={(e) => setFormData({...formData, college: e.target.value})} 
                      disabled={!isEditing} 
                      className={inputClass(isEditing)} 
                      placeholder="e.g., IIT Delhi, MIT..." 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                      <FiBook size={14} /> Course / Degree
                    </label>
                    <input 
                      type="text" 
                      value={formData?.course || ''} 
                      onChange={(e) => setFormData({...formData, course: e.target.value})} 
                      disabled={!isEditing} 
                      className={inputClass(isEditing)} 
                      placeholder="e.g., B.Tech CSE, MBA..." 
                    />
                  </div>
                </motion.div>
              ) : (
                /* 👉 EMPLOYEE FIELDS */
                <motion.div
                  key="employee"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                      <FiBriefcase size={14} /> Company Name
                    </label>
                    <input 
                      type="text" 
                      value={formData?.company || ''} 
                      onChange={(e) => setFormData({...formData, company: e.target.value})} 
                      disabled={!isEditing} 
                      className={inputClass(isEditing)} 
                      placeholder="e.g., Google, TCS, Startup..." 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                      <FiClock size={14} /> Years of Experience
                    </label>
                    <input 
                      type="number" 
                      min="0" 
                      max="50" 
                      step="0.5"
                      value={formData?.experience || ''} 
                      onChange={(e) => setFormData({...formData, experience: e.target.value})} 
                      disabled={!isEditing} 
                      className={inputClass(isEditing)} 
                      placeholder="e.g., 2.5" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <FiMapPin size={14} /> Address
              </label>
              <textarea 
                rows="3" 
                value={formData?.address || ''} 
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
                disabled={!isEditing} 
                className={`${inputClass(isEditing)} resize-none`} 
                placeholder="Enter your complete address..." 
              />
            </div>
            
            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(false); setFormData({ ...user }); }} 
                  className="px-4 py-2 text-gray-400 hover:text-white text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white text-sm flex items-center gap-2"
                >
                  <FiSave size={14} /> Save Changes
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
const ErrorsContent = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('from-violet-500 to-fuchsia-500');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/projects/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch (err) { console.error("Fetch error:", err); }
    };
    if(user?._id) fetchProjects();
  }, [user]);

  useEffect(() => {
    if(!selectedProject?._id) return;
    const fetchErrors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/geterrors/${selectedProject._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setErrors(res.data);
      } catch (err) { console.error("Fetch error:", err); }
    };
    fetchErrors();
  }, [selectedProject]);

  const toggleResolve = async (errorId) => {
    try {
      const error = errors.find(e => e._id === errorId);
      if (!error) return;
      const newStatus = error.status === "Resolved" ? "Active" : "Resolved";
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/resolve-error/${errorId}`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` }});
      setErrors(prevErrors => prevErrors.map(err => err._id === errorId ? { ...err, status: newStatus } : err));
    } catch (error) { console.error("Toggle error:", error); }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/createproject", {
        name: newProjectName.trim(), color: newProjectColor, userId: user._id,
      }, { headers: { Authorization: `Bearer ${token}` }});
      setProjects(prev => [...prev, res.data]);
      setNewProjectName(''); setShowCreateModal(false);
      successToast("Project created successfully!");
    } catch (error) {
      errorToast("Failed to create project.");
      console.error("Create error:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if(!confirm("Delete this project?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/delete/${projectId}`, { headers: { Authorization: `Bearer ${token}` }});
      setProjects(prev => prev.filter(p => p._id !== projectId));
      if (selectedProject?._id === projectId) setSelectedProject(null);
      successToast("Project deleted successfully!");
    } catch (error) {
      errorToast("Failed to delete project.");
      console.error("Delete error:", error);
    }
  };

  const colorOptions = ['from-violet-500 to-fuchsia-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-amber-500'];

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} className="max-w-7xl mx-auto">
      
      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-white/10 rounded-2xl p-5 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">New Project</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-300 mb-1.5 block">Name</label>
                <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} placeholder="Project name" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm" required />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-300 mb-2 block">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((color, i) => (
                    <button key={i} type="button" onClick={() => setNewProjectColor(color)} className={`w-8 h-8 rounded-lg bg-gradient-to-r ${color} transition-all ${newProjectColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'opacity-70'}`} />
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white text-sm">Create</button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {selectedProject && (
            <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400">
              <FiArrowLeft size={18} />
            </button>
          )}
          <h1 className="text-lg sm:text-xl font-bold text-white">{selectedProject ? selectedProject.name : 'Error Logs'}</h1>
        </div>
        {!selectedProject ? (
          <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium text-sm flex items-center gap-2">
            <FiPlus size={16} /> New Project
          </button>
        ) : selectedProject?.apiKey && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input type="text" value={selectedProject.apiKey} readOnly className="flex-1 sm:w-48 px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-xs text-violet-300 font-mono focus:outline-none" />
            <button onClick={() => { navigator.clipboard.writeText(selectedProject.apiKey); alert('✅ Copied!'); }} className="px-3 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-white text-xs font-medium whitespace-nowrap">Copy</button>
          </div>
        )}
      </div>

      {/* Stats */}
      {selectedProject && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-white">{errors.filter(e => e.projectId === selectedProject._id).length}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Total</p>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-red-400">{errors.filter(e => e.projectId === selectedProject._id && e.status !== "Resolved").length}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Active</p>
          </div>
          <div className="bg-green-500/20 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-green-400">{errors.filter(e => e.projectId === selectedProject._id && e.status === "Resolved").length}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Resolved</p>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {!selectedProject && projects.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {projects.map((project) => (
              <motion.button key={project._id} whileTap={{ scale: 0.98 }} onClick={() => setSelectedProject(project)} className="group bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:border-violet-500/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${project.color}`} />
                  <span className="font-medium text-white text-sm truncate">{project.name}</span>
                </div>
              </motion.button>
            ))}
            <button onClick={() => setShowCreateModal(true)} className="bg-white/5 border border-dashed border-white/20 rounded-xl p-4 text-gray-400 hover:text-white hover:border-violet-500/50 transition-all flex flex-col items-center justify-center gap-2">
              <FiPlus size={18} />
              <span className="text-xs">Add</span>
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedProject && projects.length === 0 && (
        <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10 mb-4">
          <FiFolder className="mx-auto text-gray-600 mb-3" size={28} />
          <h3 className="text-base font-medium text-white mb-1">No Projects</h3>
          <p className="text-gray-400 text-xs mb-4">Create a project to start tracking</p>
          <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium text-sm">✨ Create Project</button>
        </div>
      )}

      {/* ✅ Responsive Table */}
      {selectedProject && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-white/5">
                <tr className="text-left">
                  <th className="px-4 py-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase">ID</th>
                  <th className="px-4 py-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase">Message</th>
                  <th className="px-4 py-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase hidden md:table-cell">Source</th>
                  <th className="px-4 py-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase">Severity</th>
                  <th className="px-4 py-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase hidden sm:table-cell">Date</th>
                  <th className="px-4 py-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-[10px] sm:text-xs font-medium text-gray-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {errors.length > 0 ? errors.map((error) => {
                  const resolved = error.status === "Resolved";
                  return (
                    <tr key={error._id} className={`transition-colors ${resolved ? 'opacity-60' : 'hover:bg-white/5'}`}>
                      <td className="px-4 py-3 text-xs text-gray-400 font-mono">#{error._id.toString().slice(-6).toUpperCase()}</td>
                      <td className="px-4 py-3">
                        <p className={`text-xs sm:text-sm font-medium ${resolved ? 'text-gray-500 line-through' : 'text-white'} break-words max-w-[150px] sm:max-w-none`}>{error.message}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {error.source ? <span className="text-xs text-gray-400 font-mono">{error.source}:{error.lineno}</span> : <span className="text-xs text-gray-600">-</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                          error.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          error.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          error.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>{error.severity}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">{new Date(error.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        {resolved ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-green-500/20 text-green-400 flex items-center gap-1 w-fit"><FiCheck size={12} /> Resolved</span>
                        ) : <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-red-500/20 text-red-400">Active</span>}
                      </td>
                      <td className="px-4 py-3">
                        {resolved ? (
                          <span className="text-xs text-green-400 flex items-center gap-1"><FiCheck size={14} /> Done</span>
                        ) : (
                          <button onClick={() => toggleResolve(error._id)} className="text-xs font-medium text-green-400 hover:text-green-300 flex items-center gap-1">
                            <FiCheck size={14} /> Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">No errors found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Actions */}
      {selectedProject && (
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={() => handleDeleteProject(selectedProject._id)} className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2 text-sm">
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};

// ✅ Settings Component
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

  const handleChangePassword = (e) => {
    e.preventDefault(); setPasswordError(''); setPasswordSuccess('');
    if (newPass.length < 8) { setPasswordError('Min 8 characters'); return; }
    if (newPass !== confirmPass) { setPasswordError('Passwords do not match'); return; }
    setPasswordSuccess('✅ Updated!'); setCurrentPassword(''); setNewPass(''); setConfirmPass('');
    setTimeout(() => setPasswordSuccess(''), 3000);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (forgotStep === 1) setForgotStep(2);
    else if (forgotStep === 2) { if (otp === '123456') setForgotStep(3); else alert('❌ Invalid OTP'); }
    else if (forgotStep === 3) { if (newPassword === confirmPassword && newPassword.length >= 8) { alert('✅ Reset!'); setShowForgotPassword(false); setForgotStep(1); setOtp(''); setNewPassword(''); setConfirmPassword(''); } else alert('❌ Invalid'); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} className="max-w-2xl mx-auto">
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-white/10 rounded-2xl p-5 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">{forgotStep === 1 ? 'Reset Password' : forgotStep === 2 ? 'Enter OTP' : 'New Password'}</h3>
              <button onClick={() => setShowForgotPassword(false)} className="text-gray-400 hover:text-white"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              {forgotStep === 1 && (<>
                <p className="text-sm text-gray-400">Enter email for OTP</p>
                <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="email@example.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm" required />
                <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white text-sm">Send OTP</button>
              </>)}
              {forgotStep === 2 && (<>
                <p className="text-sm text-gray-400">OTP sent to <span className="text-violet-400">{forgotEmail}</span></p>
                <p className="text-xs text-gray-500">Demo: <span className="text-green-400 font-mono">123456</span></p>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="123456" maxLength={6} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-center tracking-widest text-sm" required />
                <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white text-sm">Verify</button>
              </>)}
              {forgotStep === 3 && (<>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm" required />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm" required />
                <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-medium text-white text-sm">Reset</button>
              </>)}
            </form>
          </motion.div>
        </div>
      )}
      
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1 text-sm">Manage account</p>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">🔐 Security</h3>
          <button onClick={() => setShowForgotPassword(true)} className="text-sm text-violet-400 hover:text-violet-300">Forgot Password?</button>
        </div>
        
        <div className="flex gap-2 mb-4 border-b border-white/10 pb-3 overflow-x-auto">
          {[{ id: 'change-password', label: 'Password' }, { id: 'devices', label: 'Sessions' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveSecurityTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeSecurityTab === tab.id ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{tab.label}</button>
          ))}
        </div>
        
        {activeSecurityTab === 'change-password' && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300">Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm" placeholder="••••••••" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300">New Password</label>
              <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm" placeholder="Min 8 chars" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300">Confirm</label>
              <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm" placeholder="••••••••" required />
            </div>
            {passwordError && <p className="text-xs text-red-400">{passwordError}</p>}
            {passwordSuccess && <p className="text-xs text-green-400">{passwordSuccess}</p>}
            <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white text-sm">Update</button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

// ✅ Analytics Placeholder
const AnalyticsContent = () => (
  <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} className="max-w-md mx-auto text-center py-12">
    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center"><FiTrendingUp className="text-violet-400" size={24} /></div>
    <h3 className="text-lg font-semibold text-white mb-2">Analytics Soon</h3>
    <p className="text-gray-400 text-sm">Detailed trends coming soon.</p>
  </motion.div>
);

export default Dashboard;