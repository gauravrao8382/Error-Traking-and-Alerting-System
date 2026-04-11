import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiUser, FiBriefcase, FiBook, FiMapPin, FiCalendar, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { successToast, errorToast } from "../utils/Toast";

const API = "http://localhost:5000";

// ✅ Reusable Input Component (Outside main component)
const InputField = ({ label, icon: Icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />}
      <input
        {...props}
        className={`w-full px-4 ${Icon ? 'pl-11' : ''} py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all`}
      />
    </div>
  </div>
)

const Signup = ({ setUser }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);


  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    password: '',
    userType: 'student',
    college: '',
    course: '',
    company: '',
    experience: '',
    address: ''
  });

  const navigate = useNavigate();

  const sendOTP = async () => {
    try {
      if (!formData.email) {
        showToast("Please enter email", "error");
        return;
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(formData.email)) {
        showToast("Enter valid email", "error");
        return;
      }
      
      setSending(true);
      const res = await axios.post(`${API}/send-otp`, { email: formData.email });
      successToast(res.data.message || "OTP sent successfully");
      setStep(2);
    } catch (err) {
      errorToast(err.response?.data?.message || "Error sending OTP");
    } finally {
      setSending(false);
    }
  };

  const resendOTP = async () => {
    setSending(true);
    try {
      await axios.post(`${API}/send-otp`, { email: formData.email });
      successToast("OTP resent successfully");
    } catch (err) {
      errorToast(err.response?.data?.message || "Error resending OTP");
    } finally {
      setSending(false);
    }
  };

  const verifyOTP = async () => {
    try {
      if (!formData.otp || formData.otp.length !== 4) {
        errorToast("Enter valid 4-digit OTP");
        return;
      }
      setVerifying(true);
      const res = await axios.post(`${API}/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });
      successToast(res.data.message || "OTP verified!");
      setStep(3);
    } catch (err) {
      errorToast(err.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.userType === 'student' && (!formData.college)) {
      errorToast("Please fill College");
      return;
    }
    if (formData.userType === 'employee' && (!formData.company || !formData.experience)) {
      errorToast("Please fill Company and Experience");
      return;
    }
    if (!formData.address) {
      errorToast("Please enter your address");
      return;
    }

    try {
      const res = await axios.post(`${API}/complete-signup`, formData);
      successToast("🎉 Account created successfully!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      errorToast(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center bg-slate-950">

      <div className="max-w-lg mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm sm:text-base">Step <span className="text-violet-400 font-semibold">{step}</span> of 3</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' 
                    : 'bg-white/10 text-gray-500 border border-white/10'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-8 sm:w-12 h-0.5 mx-1 ${step > s ? 'bg-violet-500' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          {/* STEP 1: Email */}
          {step === 1 && (
            <div className="space-y-5 sm:space-y-6">
              <InputField
                label="Email Address"
                icon={FiUser}
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <button
                onClick={sendOTP}
                disabled={sending}
                className={`w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white transition-all text-base sm:text-lg ${
                  sending ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:shadow-violet-500/25"
                }`}
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending OTP...
                  </span>
                ) : "Send OTP"}
              </button>
            </div>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Enter OTP</label>
                <input
                  type="text"
                  placeholder="• • • •"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  maxLength={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all text-center tracking-widest text-lg"
                />
              </div>
              <button
                onClick={verifyOTP}
                disabled={verifying}
                className={`w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white transition-all text-base sm:text-lg ${
                  verifying ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:shadow-violet-500/25"
                }`}
              >
                {verifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Verifying...
                  </span>
                ) : "Verify OTP"}
              </button>
              <p className="text-sm text-center text-gray-400">
                Didn't receive OTP?{' '}
                <span onClick={resendOTP} className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium transition-colors">
                  Resend OTP
                </span>
              </p>
            </div>
          )}

          {/* STEP 3: Profile Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <InputField
                label="Full Name"
                icon={FiUser}
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">I am a...</label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-slate-900/50 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'student' })}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      formData.userType === 'student'
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FiBook size={18} /> Student
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'employee' })}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      formData.userType === 'employee'
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FiBriefcase size={18} /> Professional
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {formData.userType === 'student' ? (
                  <motion.div
                    key="student"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <InputField
                      label="College / University Name"
                      icon={FiBook}
                      type="text"
                      placeholder="e.g., IIT Delhi, MIT..."
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      required
                    />
                    <InputField
                      label="Course / Degree"
                      type="text"
                      placeholder="e.g., B.Tech CSE, MBA..."
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      required
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="employee"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <InputField
                      label="Company Name"
                      icon={FiBriefcase}
                      type="text"
                      placeholder="e.g., Google, TCS, Startup..."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                      <input
                        type="number"
                        placeholder="e.g., 2.5"
                        min="0"
                        max="50"
                        step="0.5"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiMapPin className="inline mr-1" size={14} /> Address
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter your complete address..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all text-base sm:text-lg mt-2"
              >
                🚀 Create Account
              </button>
            </form>
          )}

          <p className="text-center text-gray-400 mt-6 sm:mt-8 text-sm sm:text-base">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;