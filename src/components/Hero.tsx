import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Home, 
  UserCheck, 
  Shield, 
  Sparkles,
  Settings,
  MapPin,
  Lock
} from 'lucide-react';
import techImage from '../assets/images/hero_tech_screenshot_1790247316998.jpg';
import heroBgWorkers from '../assets/images/hero_aziziya_makkah_desktop_1790257187000.jpg';
import heroBgMobile from '../assets/images/hero_aziziya_makkah_mobile_1790257203284.jpg';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { 
    heroSettings, 
    contactSettings, 
    isAdminLoggedIn, 
    setIsAdminDashboardOpen, 
    setIsAdminLoginOpen 
  } = useAdminSettings();

  const handleAdminAction = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };
  return (
    <section id="hero" className="relative bg-[#fcfbfa] -mt-[76px] pt-24 pb-5 sm:pb-7 lg:pb-8 overflow-hidden border-b border-amber-100/70">
      
      {/* Background Photo with Wall-Mounted AC, Technician Man, and Makkah Aziziyah Map */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Mobile View: Vertical Portrait framed specifically for smartphone screens with AC, technician man and Makkah Aziziyah map */}
        <img
          src={heroBgMobile}
          alt="فني صيانة مع مكيف سبليت جداري وخريطة مكة العزيزية - شاشة الجوال"
          referrerPolicy="no-referrer"
          className="block sm:hidden w-full h-full object-cover object-top opacity-90"
        />
        {/* Desktop View: Wide Landscape photography */}
        <img
          src={heroBgWorkers}
          alt="فني صيانة محترف مع مكيف جداري وخريطة مكة المكرمة العزيزية"
          referrerPolicy="no-referrer"
          className="hidden sm:block w-full h-full object-cover object-center opacity-90"
        />
        {/* Subtle gradient at the bottom edge to blend cleanly into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbfa] via-white/10 to-transparent" />
      </div>

      {/* Subtle Warm Background Glow & Pattern */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* Left Column (Desktop): Image Card with all floating badges matching the screenshot */}
          <div className="order-2 lg:order-1 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              
              {/* Main Framed Card with Amber/Golden Border */}
              <div className="relative rounded-[2.5rem] border-[3px] border-amber-400 bg-white p-2.5 shadow-2xl shadow-amber-500/15 overflow-hidden">
                
                {/* Photo of the technician with AC and Washing Machine */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/4.4] sm:aspect-[4/4.6] bg-slate-100">
                  <img
                    src={techImage}
                    alt="فني صيانة المكيفات والغسالات المعتمد"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    loading="eager"
                  />

                  {/* Gradient Vignette at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

                  {/* 1. TOP OVERLAY: Left & Right Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-20">
                    
                    {/* Top Left: Double Pill (فني الصيانة + صيانة بالمنزل) */}
                    <div className="flex items-center gap-1 bg-[#1e293b]/95 backdrop-blur-md p-1 rounded-full border border-slate-700/80 shadow-lg">
                      <div className="flex items-center gap-1 bg-amber-500 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>فني الصيانة</span>
                      </div>
                      <div className="flex items-center gap-1 text-white text-[11px] font-bold px-2 py-1">
                        <Home className="w-3.5 h-3.5 text-amber-400" />
                        <span>صيانة بالمنزل</span>
                      </div>
                    </div>

                    {/* Top Right: Rating Pill (4.9 / 5 تقييم حقيقي) */}
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-amber-300 px-3 py-1.5 rounded-full shadow-lg">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-black text-slate-800 whitespace-nowrap">
                        4.9 / 5 تقييم حقيقي (+4,800 عميل)
                      </span>
                    </div>

                  </div>

                  {/* 2. FLOATING ACTION WIDGETS OVERLAY (Lower Section) */}
                  <div className="absolute bottom-3 inset-x-3 space-y-2 z-20">
                    
                    {/* Floating Buttons: WhatsApp, Call, Book */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Green WhatsApp Pill */}
                      <a
                        href={contactSettings.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-white px-3.5 py-2 rounded-full text-xs font-black shadow-lg transition-transform hover:scale-105"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping absolute -top-0.5 -right-0.5" />
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>واتساب الصيانة</span>
                      </a>

                      {/* Dark Call Pill */}
                      <a
                        href={`tel:${contactSettings.phone}`}
                        className="flex items-center gap-1.5 bg-[#0f172a] hover:bg-slate-800 text-white px-3.5 py-2 rounded-full text-xs font-bold border border-slate-700 shadow-lg"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono">{contactSettings.phoneDisplay}</span>
                      </a>

                      {/* Golden Book Pill */}
                      <button
                        onClick={() => onOpenBooking()}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-3.5 py-2 rounded-full text-xs font-black shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>احجز صيانة</span>
                      </button>
                    </div>

                    {/* Dark Warranty & Tax Invoice Bar */}
                    <div className="bg-[#0f172a]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-2.5 flex items-center justify-between gap-3 text-right">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-amber-400 leading-tight">ضمان ذهبي معتمد</p>
                          <p className="text-[10px] text-slate-300">فاتورة ضريبية رسمية ورقمية مع كل طلب</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                        100% موثوق
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom Floating Bar spanning outside bottom */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="inline-flex items-center gap-2 bg-[#ea580c] text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-black shadow-lg shadow-orange-500/30">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>فنيون معتمدون بفحص شامل</span>
                </div>
                
                <button
                  onClick={handleAdminAction}
                  className="inline-flex items-center gap-1.5 bg-[#1e293b] hover:bg-[#334155] text-slate-200 px-3 py-2 rounded-2xl text-xs font-bold border border-slate-700 shadow-md transition-colors cursor-pointer"
                  title="فتح لوحة التحكم الإدارية لتعديل الأسعار"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>لوحة الإدارة (Admin)</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Hero Text Content */}
          <div className="order-1 lg:order-2 lg:col-span-7 space-y-6 text-right">
            
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center justify-start gap-2.5">
              
              {/* Badge 1: فنيو الصيانة الميدانية في خدمتك الآن */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-slate-900 text-xs sm:text-sm font-bold shadow-sm">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-black">
                  👷‍♂️
                </div>
                <span>فنيو الصيانة الميدانية في خدمتك الآن 🇸🇦</span>
              </div>

              {/* Badge 2: مكة المكرمة - حي العزيزية */}
              <a 
                href="#location"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/90 hover:bg-emerald-200 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-black shadow-sm transition-all hover:scale-105"
                title="عرض موقعنا التفاعلي على الخريطة مباشرة أدناه"
              >
                <MapPin className="w-4 h-4 text-emerald-600 animate-bounce" />
                <span>مكة المكرمة - العزيزية 📍 (الخريطة بالأسفل ↓)</span>
              </a>

              {/* Badge 3: معتمد من وزارة التجارة */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef3c7] border border-amber-400/80 text-amber-900 text-xs sm:text-sm font-black shadow-sm">
                <Award className="w-4 h-4 text-amber-700" />
                <span>معتمد من وزارة التجارة</span>
              </div>

            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.25] tracking-tight">
                <span>صيانة احترافية وفورية لـ</span>
                <br />
                <span className="relative inline-block my-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
                    المكيفات والغسالات
                  </span>
                  {/* Yellowish accent underline highlighter bar */}
                  <span className="absolute bottom-1 right-0 left-0 h-3 bg-amber-300/40 -z-10 rounded-full" />
                </span>
                <br />
                <span>بمنزلك مع ضمان معتمد</span>
              </h1>
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed max-w-2xl">
              لا داعي للقلق بعد اليوم من حرارة الصيف أو تعطل الغسالة. نوفر لك نخبة من أفضل الفنيين المعتمدين في{' '}
              <span className="text-amber-700 font-black">مكة المكرمة - حي العزيزية وكافة أحياء مكة</span>{' '}
              مع فحص دقيق بأحدث الأجهزة وقطع غيار أصلية 100% بأسعار شفافة تبدأ من{' '}
              <span className="inline-block border border-amber-400 bg-amber-50 text-amber-800 font-black px-2.5 py-0.5 rounded-lg shadow-sm mx-1">
                {heroSettings.startingPrice} ريال
              </span>{' '}
              فقط.
            </p>

            {/* Direct Action Buttons matching hero style */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#ea580c] hover:opacity-95 text-white font-black px-7 py-3.5 rounded-2xl text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>احجز فني الصيانة الآن</span>
              </button>

              <a
                href={contactSettings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-bold px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تحدث معنا واتساب</span>
              </a>

              <a
                href={`tel:${contactSettings.phone}`}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-300 px-5 py-3.5 rounded-2xl text-sm sm:text-base shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>اتصال مباشر: {contactSettings.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust Mini Features */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-3 text-center sm:text-right border-t border-slate-200/80">
              <div className="p-2">
                <p className="text-base sm:text-lg font-black text-slate-900">45 دقيقة</p>
                <p className="text-xs text-slate-500 font-bold">متوسط وقت الوصول</p>
              </div>
              <div className="p-2 border-r border-slate-200">
                <p className="text-base sm:text-lg font-black text-[#ea580c]">6 أشهر</p>
                <p className="text-xs text-slate-500 font-bold">ضمان ذهبي شامل</p>
              </div>
              <div className="p-2 border-r border-slate-200">
                <p className="text-base sm:text-lg font-black text-emerald-600">100%</p>
                <p className="text-xs text-slate-500 font-bold">قطع غيار وكالة أصلية</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
