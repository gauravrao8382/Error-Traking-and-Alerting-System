import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
  email: '',
  otp: '',
  name: '',
  password: '',
  location: '',
  experience: ''
});

  const { signup } = useAuth();
  const navigate = useNavigate();

  // 🔹 Send OTP
  const sendOTP = async() => {
    try {
    if (!formData.email) return alert("Enter email first");
    const res = await axios.post(`${API}/signup`, { email: formData.email });
    alert("OTP sent (demo: 123456)");
    setStep(2);
  } catch (err) {
    alert("Error sending OTP");
  }
};

  // 🔹 Resend OTP
  const resendOTP = () => {
    alert("OTP resent (demo: 123456)");
  };

  // 🔹 Verify OTP
  const verifyOTP = () => {
    if (formData.otp === "123456") {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  // 🔹 Final Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    navigate('/dashboard');
  };

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-2xl">

          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-gray-400 text-center mb-8">Step {step} of 3</p>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
              />
              <button onClick={sendOTP} className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg">
                Send OTP
              </button>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
              />

              <button onClick={verifyOTP} className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg">
                Verify OTP
              </button>

              <p className="text-sm text-center text-gray-400">
                Didn’t receive OTP?{" "}
                <span onClick={resendOTP} className="text-primary cursor-pointer hover:underline">
                  Resend OTP
                </span>
              </p>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Location (City, Country)"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Years of Experience in Development"
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-10 bg-darker border border-white/10 rounded-lg"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg"
              >
                Create Account
              </button>
            </form>
          )}

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>

        </motion.div>
      </div>
    </section>
  );
};

export default Signup;