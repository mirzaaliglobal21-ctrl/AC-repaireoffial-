import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar, Menu, X, Sparkles, Wrench, Shield, CheckCircle2, Lock, Settings } from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { 
    isAdminLoggedIn, 
    setIsAdminDashboardOpen, 
    setIsAdminLoginOpen,
    contactSettings 
  } = useAdminSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'الخدمات والأسعار', href: '#ac-services' },
    { name: 'فرع مكة (العزيزية)', href: '#makkah-map' },
    { name: 'حاسبة التكلفة', href: '#calculator' },
    { name: 'تتبع طلبك', href: '#booking' },
    { name: 'المناطق المغطاة', href: '#coverage' },
    { name: 'آراء العملاء', href: '#testimonials' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-amber-200/80 py-2.5'
          : 'bg-transparent border-b-0 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Right: Brand Logo matching screenshot */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-slate-950 fill-amber-300" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                    الصقر الذهبي
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-700 font-bold mt-1">
                  <span>لصيانة التكييف والغسالات المنزلية</span>
                  <Wrench className="w-3 h-3 text-amber-600 inline" />
                </div>
              </div>
            </a>

            {/* Approved Badge */}
            <div className="hidden sm:inline-flex items-center gap-1 bg-[#ea580c] text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-sm">
              <Shield className="w-3.5 h-3.5 fill-white/20" />
              <span>معتمد بالمملكة</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links matching screenshot */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs xl:text-sm font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50/80 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Left: Action Buttons matching screenshot */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick WhatsApp Button */}
            <a
              href={contactSettings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] border border-[#86efac] px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all hover:scale-105 shadow-sm"
            >
              <div className="relative flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] mr-1 animate-pulse" />
                <MessageCircle className="w-4 h-4 fill-[#15803d]" />
              </div>
              <span className="whitespace-nowrap hidden sm:inline">واتساب فوري</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 bg-gradient-to-b from-[#f59e0b] to-[#ea580c] hover:from-[#fbbf24] hover:to-[#f97316] text-slate-950 font-black px-3.5 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span className="whitespace-nowrap">احجز صيانة</span>
            </button>

            {/* Smart Admin Button (Visible on all screens) */}
            <button
              onClick={handleAdminClick}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-black transition-all cursor-pointer border shadow-sm ${
                isAdminLoggedIn
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 border-emerald-400 shadow-emerald-500/20 ring-2 ring-emerald-400/30'
                  : 'bg-slate-950 hover:bg-slate-900 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:scale-105 active:scale-95 shadow-amber-500/10'
              }`}
              title={isAdminLoggedIn ? 'لوحة تحكم الإدارة (تعديل الأسعار)' : 'تسجيل دخول الإدارة (Admin)'}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAdminLoggedIn ? 'bg-emerald-300' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isAdminLoggedIn ? 'bg-slate-950' : 'bg-amber-400'}`}></span>
              </span>
              {isAdminLoggedIn ? (
                <>
                  <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                  <span className="hidden sm:inline">لوحة الإدارة</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin</span>
                </>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-600 focus:outline-none cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200 animate-fadeIn">
            
            {/* Mobile Admin Trigger Card */}
            <div className="mb-3 pb-3 border-b border-slate-100">
              <button
                onClick={handleAdminClick}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-900 to-amber-950 text-white font-black text-xs shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>لوحة تحكم الإدارة (تعديل الأسعار)</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {isAdminLoggedIn ? 'مسجل دخول' : 'دخول الإدارة'}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-right">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-xs font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <a href={`tel:${contactSettings.phone}`} className="flex items-center gap-1.5 font-bold text-amber-700">
                <Phone className="w-4 h-4" />
                <span>{contactSettings.phoneDisplay}</span>
              </a>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                متاح الآن 24/7
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
