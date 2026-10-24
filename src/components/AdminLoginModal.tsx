import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginOpen, setIsAdminLoginOpen, loginAdmin } = useAdminSettings();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAdminLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }

    const success = loginAdmin(password.trim());
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
      }, 500);
    } else {
      setError('Incorrect password! Please try again');
    }
  };

  const handleClose = () => {
    setError('');
    setPassword('');
    setIsAdminLoginOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn" dir="ltr">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-amber-300 overflow-hidden text-left font-sans"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-black text-white">Admin Portal Login</h3>
          <p className="text-xs text-amber-200/80 mt-1 font-medium">
            Manage & update all service rates, packages, GPS location & bookings
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Security Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-slate-700">
            <KeyRound className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-slate-600 text-xs leading-relaxed">
              Enter your secret administrator password to access the control center.
            </p>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter secret password"
                autoFocus
                className="w-full px-4 py-3 text-center tracking-widest font-mono text-base sm:text-lg rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal placeholder:font-sans placeholder:text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showPassword ? 'Hide' : 'Show'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 animate-shake">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Verified! Opening Admin Dashboard...</span>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Login to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
