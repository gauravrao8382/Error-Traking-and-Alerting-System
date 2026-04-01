import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API = "http://localhost:5000"; // change if needed

const Signup = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Loading states
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

  const { signup } = useAuth();
  const navigate = useNavigate();

  // 🔹 Send OTP
  const sendOTP = async () => {
  try {
    if (!formData.email) {
      return alert("Please enter email");
    }

    // simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return alert("Enter valid email");
    }

    setSending(true);

    const res = await axios.post(`${API}/send-otp`, {
      email: formData.email,
    });

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

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
              />

              <button
                onClick={sendOTP}
                disabled={sending}
                className={`w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary 
                ${sending ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {sending ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
              />

              <button
                onClick={verifyOTP}
                disabled={verifying}
                className={`w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary 
                ${verifying ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {verifying ? "Verifying..." : "Verify OTP"}
              </button>

              <p className="text-sm text-center text-gray-400">
                Didn’t receive OTP?{" "}
                <span
                  onClick={resendOTP}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Resend OTP
                </span>
              </p>
            </div>
          )}

          {/* STEP 3 */}
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
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-white/10 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Years of Experience"
                value={formData.experience}
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