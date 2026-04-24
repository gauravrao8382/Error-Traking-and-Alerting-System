import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Developer from './components/DeveloperSection';
import About from './components/About';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import NotFound from './components/NotFound';


function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
        } else {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }

      } catch (err) {
        handleLogout();
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Router>
      <div className="min-h-screen text-gray-800">
        <Routes>

          {/* HOME */}
          <Route path="/" element={!user ? (
            <>
              <Navbar />
              <Hero />
              <Features />
              <Developer />
              <About />
              <Contact />
              <Pricing />
              <Footer />
            </>
          ) : <Navigate to="/dashboard" />} />

          {/* LOGIN */}
          <Route path="/login" element={!user ? (
            <>
              <Navbar />
              <Login setUser={setUser} />
              <Footer />
            </>
          ) : <Navigate to="/dashboard" />} />

          {/* SIGNUP */}
          <Route path="/signup" element={!user ? (
            <>
              <Navbar />
              <Signup setUser={setUser} />
              <Footer />
            </>
          ) : <Navigate to="/dashboard" />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={user ? (
            <Dashboard setUser={setUser} user={user} />
          ) : <Navigate to="/login" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;