import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Calendar, MapPin } from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const { contactSettings, locationSettings } = useAdminSettings();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-5 sm:bottom-6 left-3 sm:left-6 z-50 flex flex-col items-center gap-2.5 sm:gap-3"
      dir="ltr"
    >
      {/* 1. Scroll To Top Button (Appears when scrolled down) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 text-slate-700 border border-amber-300 shadow-md hover:shadow-lg flex items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
          aria-label="الرجوع للأعلى"
          title="الرجوع للأعلى"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* 2. Official Google Maps Location Button */}
      <a
        href={locationSettings.googleMapsUrl || "https://maps.app.goo.gl/jxPiAGha5uXLm6gX7?g_st=aw"}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-blue-400/50"
        aria-label="موقعنا على خرائط Google"
        title="موقعنا على خرائط Google"
      >
        <MapPin className="w-5 h-5 text-white" />
        {/* Tooltip */}
        <span className="hidden sm:block absolute left-14 bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md font-['Tajawal']">
          موقعنا: احمد التبريد (خرائط Google) 📍
        </span>
      </a>

      {/* 3. Quick Booking Button (احجز صيانة) */}
      <button
        type="button"
        onClick={onOpenBooking}
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-r from-[#ea580c] to-amber-500 hover:from-orange-600 hover:to-amber-400 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border-2 border-amber-300"
        aria-label="احجز فني الصيانة"
        title="احجز موعد صيانة"
      >
        <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
        {/* Tooltip */}
        <span className="hidden sm:block absolute left-15 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md font-['Tajawal']">
          احجز فني الصيانة الآن ⚡
        </span>
      </button>

      {/* 4. Direct Call Button */}
      <a
        href={`tel:${contactSettings.phone}`}
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 border-2 border-amber-400/80 shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="اتصال مباشر"
        title={`اتصال مباشر: ${contactSettings.phoneDisplay}`}
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-pulse" />
        {/* Tooltip */}
        <span className="hidden sm:block absolute left-15 bg-slate-900 text-amber-400 text-xs font-bold py-1 px-3 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md font-mono dir-ltr">
          {contactSettings.phoneDisplay}
        </span>
      </a>

      {/* 5. WhatsApp Floating Button with Notification Badge & Ping Aura */}
      <a
        href={contactSettings.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all"
        aria-label="تواصل واتساب فوري"
        title="تحدث معنا واتساب"
      >
        {/* Breathing animated ping aura */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        
        {/* Online Indicator Badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-700 border-2 border-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
        </span>

        <MessageCircle className="w-7 h-7 fill-white stroke-none drop-shadow-sm" />

        {/* Tooltip */}
        <span className="hidden sm:block absolute left-16 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg font-['Tajawal']">
          تحدث معنا واتساب مباشر 💬
        </span>
      </a>
    </div>
  );
};
