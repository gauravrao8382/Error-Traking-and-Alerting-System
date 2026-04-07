import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, FiAlertTriangle, FiSettings, FiUser, FiLogOut, 
  FiMenu, FiX, FiActivity, FiTrendingUp, FiClock 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// ✅ Demo user data (static - no auth)
const DEMO_USER = {
  name: 'Demo User',
  email: 'demo@errortrackr.com',
  avatar: 'D'
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // ✅ Static stats data
  const stats = [
    { icon: FiAlertTriangle, label: 'Total Errors', value: '1,234', change: '+12%', color: 'text-red-500' },
    { icon: FiActivity, label: 'Active Issues', value: '45', change: '-5%', color: 'text-yellow-500' },
    { icon: FiTrendingUp, label: 'Resolved Today', value: '23', change: '+18%', color: 'text-green-500' },
    { icon: FiClock, label: 'Avg. Resolution', value: '2.4h', change: '-10%', color: 'text-blue-500' },
  ];

  // ✅ Static recent errors data
  const recentErrors = [
    { id: 1, message: 'TypeError: Cannot read property', project: 'E-Commerce App', time: '2 mins ago', severity: 'Critical' },
    { id: 2, message: 'ReferenceError: x is not defined', project: 'Blog Platform', time: '5 mins ago', severity: 'High' },
    { id: 3, message: 'SyntaxError: Unexpected token', project: 'API Service', time: '12 mins ago', severity: 'Medium' },
    { id: 4, message: 'RangeError: Invalid array length', project: 'Dashboard App', time: '1 hour ago', severity: 'Low' },
    { id: 5, message: 'URIError: Malformed URI', project: 'User Portal', time: '2 hours ago', severity: 'Medium' },
  ];

  // ✅ Simplified logout - just navigates (no backend call)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  };

  const sidebarItems = [
    { id: 'overview', icon: FiHome, label: 'Overview' },
    { id: 'errors', icon: FiAlertTriangle, label: 'Errors' },
    { id: 'profile', icon: FiUser, label: 'Profile' },
    { id: 'settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-darker flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`${sidebarOpen ? 'w-64' : 'w-20'} glass min-h-screen transition-all duration-300 fixed md:relative z-40`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && <h1 className="text-2xl font-bold gradient-text">ErrorTrackr</h1>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white md:block hidden">
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="text-xl" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
            >
              <FiLogOut className="text-xl" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="glass px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-white">
              <FiMenu className="text-2xl" />
            </button>
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold">
                {DEMO_USER.avatar}
              </div>
              {sidebarOpen && (
                <div>
                  <p className="font-semibold">{DEMO_USER.name}</p>
                  <p className="text-sm text-gray-400">{DEMO_USER.email}</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-6 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`text-3xl ${stat.color}`} />
                      <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Errors Table */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Recent Errors</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="pb-3 text-gray-400">Error Message</th>
                        <th className="pb-3 text-gray-400">Project</th>
                        <th className="pb-3 text-gray-400">Severity</th>
                        <th className="pb-3 text-gray-400">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentErrors.map((error) => (
                        <tr key={error.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4">{error.message}</td>
                          <td className="py-4 text-gray-400">{error.project}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              error.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                              error.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                              error.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-blue-500/20 text-blue-500'
                            }`}>
                              {error.severity}
                            </span>
                          </td>
                          <td className="py-4 text-gray-400">{error.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && <Profile user={DEMO_USER} />}
          {activeTab === 'errors' && <ErrorsList />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

// ✅ Profile Component - Frontend Only
const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    company: 'Tech Corp',
    bio: 'Frontend developer passionate about building beautiful UIs.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Frontend-only: just show success message
    alert('✅ Profile updated successfully! (Demo Mode)');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
      <div className="glass rounded-xl p-8 mb-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold">
            {user?.avatar || 'U'}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">{user?.name}</h2>
            <p className="text-gray-400">{user?.email}</p>
            <p className="text-sm text-primary mt-1">✨ Pro Plan (Demo)</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 bg-darker/50 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              rows="4"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg focus:border-primary focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            💾 Update Profile (Demo)
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// ✅ Errors List - Frontend Placeholder
const ErrorsList = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">🔍 All Errors</h3>
        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <div key={i} className="p-4 bg-darker/50 rounded-lg border border-white/5">
              <p className="font-medium">Sample Error #{i}</p>
              <p className="text-sm text-gray-400">This is a demo error entry. Connect backend to fetch real data.</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ✅ Settings - Frontend Placeholder
const Settings = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">⚙️ Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-darker/50 rounded-lg">
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-darker/50 rounded-lg">
            <span>Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">💡 Settings are frontend-only in demo mode</p>
      </div>
    </motion.div>
  );
};

export default Dashboard;