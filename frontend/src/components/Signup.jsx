import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API = "http://localhost:5000";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    password: '',
    location: '',
    experience: ''
  });

  const navigate = useNavigate();

  // 🔹 Send OTP
  const sendOTP = async () => {
    try {
      if (!formData.email) {
        return alert("Please enter email");
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(formData.email)) {
        return alert("Enter valid email");
      }
      setSending(true);
      const res = await axios.post(`${API}/send-otp`, { email: formData.email });
      alert(res.data.message);
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    } finally {
      setSending(false);
    }
  };

  // 🔹 Resend OTP
  const resendOTP = async () => {
    setSending(true);
    await axios.post(`${API}/send-otp`, { email: formData.email });
    alert("OTP resent");
    setSending(false);
  };

  // 🔹 Verify OTP
  const verifyOTP = async () => {
    try {
      setVerifying(true);
      const res = await axios.post(`${API}/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });
      alert(res.data.message);
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifying(false);
    }
  };

  // 🔹 Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/complete-signup`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Account created successfully ✅");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center bg-slate-950">
      <div className="max-w-md mx-auto w-full">
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
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                />
              </div>
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
                  placeholder="• • • • • •"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  maxLength={6}
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
                <span
                  onClick={resendOTP}
                  className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium transition-colors"
                >
                  Resend OTP
                </span>
              </p>
            </div>
          )}

          {/* STEP 3: Profile Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                <input
                  type="number"
                  placeholder="2"
                  min="0"
                  max="50"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all text-base sm:text-lg"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Sign In Link */}
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