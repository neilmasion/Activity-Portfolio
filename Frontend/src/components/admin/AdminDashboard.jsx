import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Eye, Mail, TrendingUp, RefreshCw, LogOut, ExternalLink,
  Search, Clock, Trash2, MailCheck, MailOpen, Monitor, Smartphone,
  Activity, X, Send, Copy, Check
} from 'lucide-react';

export const AdminDashboard = ({ token, user, onLogout, onBackToPortfolio }) => {
  const [analytics, setAnalytics] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [testEmailStatus, setTestEmailStatus] = useState(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest' };
      const [aRes, mRes] = await Promise.all([
        fetch(`${apiUrl}/admin/analytics`, { headers }),
        fetch(`${apiUrl}/admin/messages?limit=100`, { headers })
      ]);
      if (aRes.status === 401 || aRes.status === 403) { onLogout(); return; }
      if (aRes.ok) { const d = await aRes.json(); if (d.success) setAnalytics(d.data); }
      if (mRes.ok) { const d = await mRes.json(); if (d.success) setMessages(d.data || []); }
      setLastUpdated(new Date());
    } catch (err) { console.error('Fetch failed:', err); }
    finally { setIsRefreshing(false); }
  };

  useEffect(() => {
    fetchData();
    const handleFocus = () => fetchData();
    window.addEventListener('focus', handleFocus);
    const iv = setInterval(() => fetchData(), 5000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(iv);
    };
  }, [token]);

  const handleToggleStatus = async (id, current) => {
    const next = current === 'unread' ? 'read' : 'unread';
    try {
      const res = await fetch(`${apiUrl}/admin/messages/${id}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ status: next })
      });
      if (res.ok) {
        setMessages(p => p.map(m => m.id === id ? { ...m, status: next } : m));
        if (selectedMessage?.id === id) setSelectedMessage(p => ({ ...p, status: next }));
      }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`${apiUrl}/admin/messages/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (res.ok) {
        setMessages(p => p.filter(m => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        fetchData();
      }
    } catch {}
  };

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    try {
      const res = await fetch(`${apiUrl}/admin/test-email`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest' }
      });
      const data = await res.json();
      if (data.success) {
        const providerName = data.details?.provider === 'resend' ? 'Resend API' : 'SMTP';
        setTestEmailStatus({ type: 'success', message: `Test email sent to neilmasion2@gmail.com via ${providerName}!` });
      } else {
        const diag = data.details?.diagnostics;
        let errMsg = data.details?.reason || data.details?.error || 'Email notification service error.';
        if (diag && !diag.hasResendKey && !diag.passConfigured) {
          errMsg = 'RESEND_API_KEY not found in Vercel. Add RESEND_API_KEY in Vercel Settings and Redeploy.';
        }
        setTestEmailStatus({
          type: 'error',
          message: errMsg
        });
      }
    } catch {
      setTestEmailStatus({ type: 'error', message: 'Could not connect to server.' });
    } finally {
      setIsTestingEmail(false);
      setTimeout(() => setTestEmailStatus(null), 8000);
    }
  };

  const filtered = useMemo(() => {
    return messages.filter(m => {
      if (statusFilter !== 'all' && m.status !== statusFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return [m.name, m.email, m.projectType, m.message].some(f => f && f.toLowerCase().includes(q));
    });
  }, [messages, searchQuery, statusFilter]);

  const o = analytics?.overview || { totalVisits: 0, uniqueVisitors: 0, todayVisits: 0, yesterdayVisits: 0, totalEmails: 0, unreadEmails: 0 };
  const chart = analytics?.dailyChart || [];
  const maxDay = useMemo(() => Math.max(1, ...chart.map(d => d.visits)), [chart]);

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-zinc-100 font-sans selection:bg-brand-purple selection:text-white pb-16">

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[#0B0B0E]/90 backdrop-blur-xl border-b border-[#22222B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white tracking-tight">Admin</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestEmail}
              disabled={isTestingEmail}
              className="px-2.5 py-1.5 bg-[#141418] border border-[#22222B] hover:border-brand-purple/40 text-zinc-400 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
              title="Test real-time delivery to neilmasion2@gmail.com"
            >
              <Send className={`w-3 h-3 text-brand-purple ${isTestingEmail ? 'animate-pulse' : ''}`} />
              <span className="hidden sm:inline">{isTestingEmail ? 'Sending...' : 'Test Email'}</span>
            </button>
            <button onClick={() => fetchData(true)} disabled={isRefreshing} className="p-2 bg-[#141418] border border-[#22222B] hover:border-brand-purple/40 text-zinc-400 hover:text-white text-xs transition-all" title="Refresh">
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-purple' : ''}`} />
            </button>
            <button onClick={onBackToPortfolio} className="px-3 py-1.5 bg-[#141418] border border-[#22222B] text-zinc-400 hover:text-white text-xs font-mono transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button onClick={onLogout} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6 relative z-10">

        {testEmailStatus && (
          <div className={`p-3 text-xs font-mono border ${testEmailStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'} flex items-center justify-between`}>
            <span>{testEmailStatus.message}</span>
            <button onClick={() => setTestEmailStatus(null)} className="text-zinc-500 hover:text-white ml-2">✕</button>
          </div>
        )}

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total Visits', value: o.totalVisits, sub: `${o.uniqueVisitors} unique`, icon: Eye, accent: 'brand-purple' },
            { label: 'Today', value: o.todayVisits, sub: `${o.yesterdayVisits} yesterday`, icon: TrendingUp, accent: 'emerald-400' },
            { label: 'Emails', value: o.totalEmails, sub: o.unreadEmails > 0 ? `${o.unreadEmails} unread` : 'All read', icon: Mail, accent: 'violet-400' },
            { label: 'Unique', value: o.uniqueVisitors, sub: 'All time', icon: Users, accent: 'blue-400' }
          ].map(({ label, value, sub, icon: Icon, accent }) => (
            <div key={label} className="bg-[#141418] border border-[#22222B] p-4 relative overflow-hidden group hover:border-zinc-600 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">{label}</span>
                <Icon className={`w-3.5 h-3.5 text-${accent}`} />
              </div>
              <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
              <span className="text-[11px] font-mono text-zinc-500">{sub}</span>
            </div>
          ))}
        </div>

        {/* 7-Day Chart */}
        {chart.length > 0 && (
          <div className="bg-[#141418] border border-[#22222B] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase">Last 7 Days</span>
              <span className="text-[11px] font-mono text-zinc-500">{lastUpdated.toLocaleTimeString()}</span>
            </div>

            <div className="relative">
              {hoveredDay && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-[#22222B] text-[11px] font-mono px-2.5 py-1 text-white z-20 flex gap-3 pointer-events-none">
                  <span className="text-brand-purple-glow">{hoveredDay.label}</span>
                  <span>{hoveredDay.visits} visits</span>
                </div>
              )}

              <div className="flex items-end gap-1 sm:gap-2 h-32">
                {chart.map((day, i) => {
                  const h = Math.max(6, Math.round((day.visits / maxDay) * 100));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer"
                      onMouseEnter={() => setHoveredDay(day)} onMouseLeave={() => setHoveredDay(null)}>
                      <div style={{ height: `${h}%` }} className="w-full bg-brand-purple/70 hover:bg-brand-purple transition-all" />
                      <span className="text-[9px] font-mono text-zinc-500">{day.label?.split(' ')[1]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Devices + Sources row */}
        {analytics && (Object.keys(analytics.devices || {}).length > 0 || Object.keys(analytics.referrers || {}).length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.keys(analytics.devices || {}).length > 0 && (
              <div className="bg-[#141418] border border-[#22222B] p-4">
                <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-3">Devices</span>
                <div className="space-y-2">
                  {Object.entries(analytics.devices).map(([name, count]) => {
                    const total = Object.values(analytics.devices).reduce((a, b) => a + b, 0) || 1;
                    return (
                      <div key={name} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300">{name}</span>
                        <span className="text-zinc-500">{count} ({Math.round(count / total * 100)}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {Object.keys(analytics.referrers || {}).length > 0 && (
              <div className="bg-[#141418] border border-[#22222B] p-4">
                <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-3">Sources</span>
                <div className="space-y-2">
                  {Object.entries(analytics.referrers).slice(0, 5).map(([name, count]) => (
                    <div key={name} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-300 truncate max-w-[160px]">{name}</span>
                      <span className="text-zinc-500">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tabs: Inbox / Visitors */}
        <div className="bg-[#141418] border border-[#22222B] overflow-hidden">
          <div className="p-4 border-b border-[#22222B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex gap-1">
              {[
                { id: 'inbox', label: `Emails (${messages.length})`, icon: Mail },
                { id: 'visitors', label: 'Visitors', icon: Eye }
              ].map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 transition-all ${
                    activeTab === id ? 'bg-brand-purple text-white' : 'bg-[#0B0B0E] text-zinc-500 border border-[#22222B] hover:text-zinc-300'
                  }`}>
                  <Icon className="w-3 h-3" />{label}
                </button>
              ))}
            </div>

            {activeTab === 'inbox' && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..." className="pl-7 pr-3 py-1.5 bg-[#0B0B0E] border border-[#22222B] text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-purple w-44" />
                </div>
                <div className="flex bg-[#0B0B0E] border border-[#22222B]">
                  {['all', 'unread', 'read'].map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={`px-2 py-1 text-[10px] font-mono capitalize ${statusFilter === s ? 'bg-brand-purple/20 text-brand-purple-glow' : 'text-zinc-500 hover:text-zinc-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Inbox */}
          {activeTab === 'inbox' && (
            <div className="divide-y divide-[#22222B]">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-zinc-600 text-xs font-mono">No emails yet.</div>
              ) : filtered.map(msg => (
                <div key={msg.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.015] transition-colors ${msg.status === 'unread' ? 'bg-brand-purple/[0.03]' : ''}`}>
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${msg.status === 'unread' ? 'bg-amber-500/15 text-amber-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {msg.status === 'unread' ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-white">{msg.name}</span>
                        <span className="text-[11px] text-zinc-500 font-mono">{msg.email}</span>
                        {msg.status === 'unread' && <span className="px-1.5 py-0.5 text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">NEW</span>}
                      </div>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5 line-clamp-1">{msg.message}</p>
                      <span className="text-[10px] text-zinc-600 font-mono">{new Date(msg.receivedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => { setSelectedMessage(msg); if (msg.status === 'unread') handleToggleStatus(msg.id, 'unread'); }}
                      className="px-2.5 py-1 bg-brand-purple text-white text-[11px] font-mono hover:bg-brand-purple-light transition-colors">View</button>
                    <button onClick={() => handleToggleStatus(msg.id, msg.status)} title={msg.status === 'unread' ? 'Mark read' : 'Mark unread'}
                      className="p-1.5 bg-[#0B0B0E] border border-[#22222B] text-zinc-500 hover:text-white transition-colors">
                      <MailCheck className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(msg.id)} className="p-1.5 bg-[#0B0B0E] border border-[#22222B] text-zinc-600 hover:text-rose-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Visitors */}
          {activeTab === 'visitors' && (
            <div className="divide-y divide-[#22222B]">
              {(analytics?.recentVisits || []).length === 0 ? (
                <div className="py-12 text-center text-zinc-600 text-xs font-mono">No visitors recorded yet.</div>
              ) : analytics.recentVisits.map(v => (
                <div key={v.id} className="px-4 py-3 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    {v.device === 'Mobile' ? <Smartphone className="w-3.5 h-3.5 text-zinc-500" /> : <Monitor className="w-3.5 h-3.5 text-zinc-500" />}
                    <span className="text-zinc-300">{v.path}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-500">{v.browser}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-500">{v.referrer}</span>
                  </div>
                  <span className="text-zinc-600">{new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Modal */}
        <AnimatePresence>
          {selectedMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="bg-[#141418] border border-[#22222B] w-full max-w-lg p-5 shadow-2xl relative">
                <button onClick={() => setSelectedMessage(null)} className="absolute top-3 right-3 p-1.5 text-zinc-500 hover:text-white bg-[#0B0B0E] border border-[#22222B] transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="mb-4 pb-3 border-b border-[#22222B]">
                  <h3 className="text-base font-bold text-white">{selectedMessage.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-mono text-zinc-400">{selectedMessage.email}</span>
                    <button onClick={() => copyEmail(selectedMessage.email)} className="p-0.5 text-zinc-500 hover:text-white transition-colors">
                      {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 text-[11px] font-mono">
                  <span className="px-2 py-1 bg-[#0B0B0E] border border-[#22222B] text-zinc-300">{selectedMessage.projectType || 'General'}</span>
                  <span className="px-2 py-1 bg-[#0B0B0E] border border-[#22222B] text-zinc-400">{selectedMessage.budget || 'Undisclosed'}</span>
                </div>

                <div className="p-3 bg-[#0B0B0E] border border-[#22222B] text-sm text-zinc-200 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap mb-4">
                  {selectedMessage.message}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#22222B]">
                  <span className="text-[10px] font-mono text-zinc-600">{new Date(selectedMessage.receivedAt).toLocaleString()}</span>
                  <a href={`mailto:${selectedMessage.email}?subject=Re: Portfolio Inquiry&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                    className="px-3 py-1.5 bg-brand-purple hover:bg-brand-purple-light text-white text-xs font-mono flex items-center gap-1.5 transition-colors">
                    <Send className="w-3 h-3" />Reply
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
