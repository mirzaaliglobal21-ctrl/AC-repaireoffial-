import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const { contactSettings } = useAdminSettings();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons at Bottom Left */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col items-center gap-3">
        
        {/* Scroll To Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/95 text-amber-600 border border-amber-300 shadow-lg flex items-center justify-center hover:bg-amber-50 transition-all hover:scale-110 cursor-pointer"
            aria-label="الرجوع للأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Floating Button with Notification Pulse */}
        <a
          href={contactSettings.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
          aria-label="تواصل واتساب مباشر"
        >
          {/* Notification Ping Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
            1
          </span>
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          <MessageCircle className="w-7 h-7 fill-current" />
          
          {/* Tooltip on hover */}
          <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            تحدث مع المهندس واتساب
          </span>
        </a>

        {/* Direct Call Floating Button */}
        <a
          href={`tel:${contactSettings.phone}`}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-[#ea580c] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-amber-300"
          aria-label="اتصال مباشر"
        >
          <Phone className="w-6 h-6 animate-pulse" />
        </a>

      </div>
    </>
  );
};
