import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';

export const AdminLogin = ({ onLoginSuccess, onBackToPortfolio }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password) {
      setErrorMessage('Please enter your username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          username: username.trim(),
          password
        })
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        onLoginSuccess(data.token, data.user);
      } else {
        setErrorMessage(data.message || 'Invalid username or password.');
      }
    } catch {
      setErrorMessage('Unable to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-zinc-100 flex flex-col items-center justify-center p-4 relative selection:bg-brand-purple selection:text-white">
      {/* Background ambient subtle glow */}
      <div className="absolute w-72 h-72 bg-brand-purple/10 blur-[100px] pointer-events-none" />

      {/* Top back button */}
      <button
        type="button"
        onClick={onBackToPortfolio}
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Portfolio</span>
      </button>

      {/* Minimal Login Card - Sharp edges (no border radius) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm bg-[#141418] border border-[#22222B] p-6 sm:p-7 shadow-xl relative z-10"
      >
        <div className="text-center mb-6">
          <h1 className="text-lg font-semibold text-white">Admin</h1>
        </div>

        {errorMessage && (
          <div className="mb-4 p-2.5 bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222B] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-purple transition-colors"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-3.5 py-2.5 pr-10 bg-[#0B0B0E] border border-[#22222B] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-purple transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 bg-brand-purple hover:bg-brand-purple-light disabled:opacity-50 text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
