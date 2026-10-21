import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { Loader2 } from 'lucide-react';

const ADMIN_TOKEN_KEY = 'nm_portfolio_admin_token';
const ADMIN_USER_KEY = 'nm_portfolio_admin_user';

export const AdminPortal = ({ onBackToPortfolio }) => {
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem(ADMIN_USER_KEY) || localStorage.getItem(ADMIN_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isVerifying, setIsVerifying] = useState(Boolean(token));

  // Verify stored token on initial mount
  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api';
        const res = await fetch(`${apiUrl}/admin/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
          } else {
            handleLogout();
          }
        } else {
          handleLogout();
        }
      } catch {
        // If server is temporarily unreachable, allow retaining session or fail gracefully
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleLoginSuccess = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    try {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, newToken);
      sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    try {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      sessionStorage.removeItem(ADMIN_USER_KEY);
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#0B0B0E] flex flex-col items-center justify-center text-zinc-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-purple" />
        <span className="text-xs font-mono uppercase tracking-widest">Verifying Admin Session...</span>
      </div>
    );
  }

  if (token) {
    return (
      <AdminDashboard
        token={token}
        user={user}
        onLogout={handleLogout}
        onBackToPortfolio={onBackToPortfolio}
      />
    );
  }

  return (
    <AdminLogin
      onLoginSuccess={handleLoginSuccess}
      onBackToPortfolio={onBackToPortfolio}
    />
  );
};

export default AdminPortal;
