import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiLock, FiEye, FiEyeOff, FiX, FiArrowLeft, 
  FiSend, FiCheck, FiRefreshCw, FiKey 
} from 'react-icons/fi';
import axios from 'axios';
import { successToast, errorToast } from '../utils/Toast';

const Login = ({ setUser }) => {
  useEffect(() => {
  document.title = "Login";
}, []);
  const API = "https://gregarious-amazement-production-179e.up.railway.app";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [forgotEmail, setForgotEmail] = useState('');
  
  // 🔢 4-Digit OTP
  const [otp, setOtp] = useState(['', '', '', '']);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();
  
  // 🔢 4 refs for OTP inputs
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Login Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      successToast(res.data.message || "Login successful!");
      setUser(res.data.user);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      errorToast(err.response?.data?.message || "Login failed");
    }
  };

  // Step 1: Send OTP to Email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      errorToast("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/send-otp`, { email: forgotEmail });
      setTimer(30); // 30 seconds cooldown
      successToast(res.data.message || "OTP sent to your email!");
      setForgotStep(2);
    } catch (err) {
      errorToast(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (timer > 0) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/send-otp`, { email: forgotEmail });
      setTimer(30);
      successToast(res.data.message || "New OTP sent!");
    } catch (err) {
      errorToast(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP Timer Countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 🔢 OTP Input Handlers (4-digit)
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Step 2: Verify OTP (4-digit)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      errorToast("Please enter complete 4-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/verify-otp`, {
        email: forgotEmail,
        otp: otpString
      });
      successToast(res.data.message || "OTP verified!");
      setForgotStep(3);
    } catch (err) {
      errorToast(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      errorToast("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      errorToast("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.patch(`${API}/reset-password`, {
        email: forgotEmail,
        newPassword: newPassword
      });
      successToast(res.data.message || "Password reset successfully!");
      
      // Reset & Close
      setTimeout(() => {
        setShowForgotModal(false);
        resetForgotForm();
      }, 1000);
    } catch (err) {
      errorToast(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // Reset Forgot Form
  const resetForgotForm = () => {
    setForgotStep(1);
    setForgotEmail('');
    setOtp(['', '', '', '']); // 🔢 Reset to 4 digits
    setNewPassword('');
    setConfirmPassword('');
    setTimer(0);
  };

  // Close Modal Handler
  const handleCloseModal = () => {
    setShowForgotModal(false);
    resetForgotForm();
  };

  return (
    <>
      {/* Main Login Form */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center bg-slate-950">
        <div className="max-w-md mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-sm sm:text-base">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-11 pr-12 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                    placeholder="••••••••"
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

              {/* Remember + Forgot */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-slate-900/50 text-violet-500 focus:ring-violet-500/50 focus:ring-2" />
                  <span className="text-gray-400 select-none">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all text-base sm:text-lg"
              >
                Sign In
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 mt-6 sm:mt-8 text-sm sm:text-base">
              Don't have an account?{' '}
              <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Forgot Password Modal - 3 Step Flow */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
              >
                <FiX size={20} />
              </button>

              {/* Progress Steps */}
              <div className="flex justify-center mb-6 gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      forgotStep >= step 
                        ? 'w-8 bg-violet-500' 
                        : 'w-4 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                
                {/* STEP 1: Enter Email */}
                {forgotStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiMail className="text-violet-400" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Forgot Password?</h3>
                      <p className="text-gray-400 text-sm">Enter your email to receive a verification code</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
                    >
                      <FiArrowLeft size={16} />
                      Back to login
                    </button>

                    <form onSubmit={handleSendOTP} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type="email"
                            required
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                            placeholder="your@email.com"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <FiSend size={18} />
                        )}
                        {loading ? 'Sending...' : 'Send OTP'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 2: Enter 4-Digit OTP */}
                {forgotStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiKey className="text-violet-400" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Verify OTP</h3>
                      <p className="text-gray-400 text-sm">
                        Enter the 4-digit code sent to <span className="text-white">{forgotEmail}</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
                    >
                      <FiArrowLeft size={16} />
                      Change email
                    </button>

                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                      {/* 🔢 4 OTP Inputs */}
                      <div className="flex justify-center gap-3 sm:gap-4">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={otpRefs[index]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                            disabled={loading}
                          />
                        ))}
                      </div>

                      {/* Resend OTP */}
                      <div className="text-center">
                        <span className="text-gray-400 text-sm">Didn't receive code? </span>
                        {timer > 0 ? (
                          <span className="text-violet-400 text-sm font-medium">Resend in {timer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={loading}
                            className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors flex items-center gap-1 mx-auto"
                          >
                            <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                            Resend OTP
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <FiCheck size={18} />
                        )}
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: New Password */}
                {forgotStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiLock className="text-green-400" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Create New Password</h3>
                      <p className="text-gray-400 text-sm">Your new password must be different from previous ones</p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-5">
                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <div className="relative">
                          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-11 pr-12 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                            placeholder="••••••••"
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                          >
                            {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <div className="relative">
                          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-11 pr-12 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                            placeholder="••••••••"
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                          >
                            {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                        </div>
                        {confirmPassword && newPassword !== confirmPassword && (
                          <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                        )}
                        {confirmPassword && newPassword === confirmPassword && (
                          <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                            <FiCheck size={12} /> Passwords match
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <FiCheck size={18} />
                        )}
                        {loading ? 'Resetting...' : 'Reset Password'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;