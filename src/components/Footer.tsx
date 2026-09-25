import React from 'react';
import { Award, Phone, MessageCircle, Mail, MapPin, ShieldCheck, Heart, Sparkles, Wrench, Lock } from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const { contactSettings, isAdminLoggedIn, setIsAdminDashboardOpen, setIsAdminLoginOpen } = useAdminSettings();

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };
  return (
    <footer className="bg-[#1e293b] pt-16 pb-16 text-slate-300 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Sparkles className="w-6 h-6 text-slate-950 fill-amber-300" />
              </div>
              <div>
                <span className="text-xl font-black text-white">
                  الصقر <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">الذهبي</span>
                </span>
                <span className="block text-[11px] text-amber-300 font-bold">
                  صيانة التكييف والأجهزة المنزلية المعتمدة بالمملكة 🇸🇦
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-medium">
              الوجهة الأولى والموثوقة في المملكة العربية السعودية لصيانة وغسيل المكيفات وإصلاح الغسالات المنزلية بقطع غيار أصلية وضمان رسمي معتمد حتى 6 أشهر.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2 font-medium">
              <p>السجل التجاري (CR): <span className="font-mono text-amber-300 font-bold">{contactSettings.crNumber}</span></p>
              <p>الرقم الضريبي (VAT): <span className="font-mono text-amber-300 font-bold">{contactSettings.vatNumber}</span></p>
              <p>{contactSettings.address}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-amber-400 pr-2">روابط سريعة</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">الصفحة الرئيسية</a></li>
              <li><a href="#ac-services" className="hover:text-amber-400 transition-colors">صيانة وغسيل المكيفات</a></li>
              <li><a href="#washer-services" className="hover:text-amber-400 transition-colors">إصلاح الغسالات الأتوماتيك</a></li>
              <li><a href="#spare-parts" className="hover:text-amber-400 transition-colors">قطع الغيار الأصلية</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">حاسبة الأسعار الفورية</a></li>
              <li><a href="#coverage" className="hover:text-amber-400 transition-colors">تغطية المدن والأحياء</a></li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-amber-400 pr-2">الضمان والمسؤول</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><span className="text-slate-300">ضمان الصيانة 6 أشهر</span></li>
              <li><span className="text-slate-300">طوارئ 24 ساعة جاهزة</span></li>
              <li><span className="text-slate-300">فريون أمريكي R410A أصلي</span></li>
              <li><span className="text-slate-300">حماية الأثاث أثناء الغسيل</span></li>
              <li className="pt-2">
                <button
                  onClick={handleAdminClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 text-xs font-black transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>دخول الإدارة (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white border-r-2 border-amber-400 pr-2">تواصل معنا الآن</h4>
            <div className="space-y-2">
              <a
                href={`tel:${contactSettings.phone}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-amber-400 text-xs font-bold text-white transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>اتصال مباشر: {contactSettings.phoneDisplay}</span>
              </a>

              <a
                href={contactSettings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-[#25D366] text-xs font-bold text-white transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>دعم العملاء واتساب 24/7</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                احجز فني صيانة لمنزلك
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Badges & Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400">طرق الدفع المقبولة:</span>
            <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-slate-200 font-bold">مدى Mada</span>
            <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-slate-200 font-bold">Apple Pay</span>
            <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-slate-200 font-bold">Visa / Master</span>
            <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-slate-200 font-bold">نقد بعد الخدمة</span>
          </div>

          <div className="text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} الصقر الذهبي لصيانة التكييف والغسالات بالمملكة. جميع الحقوق محفوظة.
          </div>
        </div>

      </div>
    </footer>
  );
};
