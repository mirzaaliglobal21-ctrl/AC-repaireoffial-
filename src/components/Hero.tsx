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
    <section id="hero" className="relative bg-[#fcfbfa] -mt-[76px] pt-24 pb-8 sm:pb-12 overflow-hidden border-b border-amber-100/70">
      
      {/* Background Photo with Wall-Mounted AC, Technician Man, and Makkah Aziziyah Map */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Mobile View: Vertical Portrait framed specifically for smartphone screens - clearly visible background */}
        <img
          src={heroBgMobile}
          alt="فني صيانة مع مكيف سبليت جداري وخريطة مكة العزيزية - شاشة الجوال"
          referrerPolicy="no-referrer"
          className="block sm:hidden w-full h-full object-cover object-top opacity-85"
        />
        {/* Desktop View: Wide Landscape photography - fully vibrant background */}
        <img
          src={heroBgWorkers}
          alt="فني صيانة محترف مع مكيف جداري وخريطة مكة المكرمة العزيزية"
          referrerPolicy="no-referrer"
          className="hidden sm:block w-full h-full object-cover object-center opacity-90"
        />
        {/* Balanced light gradient overlay so the technician background is clearly visible while text is crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-[#fcfbfa]/90" />
      </div>

      {/* Subtle Warm Background Glow & Pattern */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-orange-200/25 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column (Desktop): Image Card with all floating badges */}
          <div className="order-2 lg:order-1 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              
              {/* Main Framed Card with Amber/Golden Border */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border-2 sm:border-[3px] border-amber-400 bg-white p-2 sm:p-2.5 shadow-2xl shadow-amber-500/15 overflow-hidden">
                
                {/* Photo of the technician with AC and Washing Machine */}
                <div className="relative rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden aspect-[4/4.2] sm:aspect-[4/4.6] bg-slate-100">
                  <img
                    src={techImage}
                    alt="فني صيانة المكيفات والغسالات المعتمد"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    loading="eager"
                  />

                  {/* Gradient Vignette at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/30 pointer-events-none" />

                  {/* 1. TOP OVERLAY: Left & Right Badges (Responsive side-by-side) */}
                  <div className="absolute top-2.5 sm:top-3.5 inset-x-2.5 sm:inset-x-3.5 flex items-center justify-between gap-1.5 sm:gap-2 z-20">
                    
                    {/* Top Left: Double Pill */}
                    <div className="flex items-center gap-1 bg-[#1e293b]/95 backdrop-blur-md p-0.5 sm:p-1 rounded-full border border-slate-700/80 shadow-lg">
                      <div className="flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                        <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>فني معتمد</span>
                      </div>
                      <div className="hidden xs:flex items-center gap-1 text-white text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5">
                        <Home className="w-3 h-3 text-amber-400" />
                        <span>بالمنزل</span>
                      </div>
                    </div>

                    {/* Top Right: Rating Pill */}
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md border border-amber-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-black text-slate-800 whitespace-nowrap">
                        <span className="hidden sm:inline">4.9 / 5 (+4,800 عميل)</span>
                        <span className="sm:hidden">4.9 ★ (+4.8k)</span>
                      </span>
                    </div>

                  </div>

                  {/* 2. FLOATING ACTION WIDGETS OVERLAY (Lower Section) */}
                  <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3 space-y-1.5 sm:space-y-2 z-20">
                    
                    {/* Floating Buttons: WhatsApp, Call, Book */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {/* Green WhatsApp Pill */}
                      <a
                        href={contactSettings.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center gap-1 bg-[#10b981] hover:bg-[#059669] text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black shadow-lg transition-transform hover:scale-105"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>واتساب فوري</span>
                      </a>

                      {/* Dark Call Pill */}
                      <a
                        href={`tel:${contactSettings.phone}`}
                        className="flex items-center gap-1 bg-[#0f172a] hover:bg-slate-800 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold border border-slate-700 shadow-lg"
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span className="font-mono dir-ltr">{contactSettings.phoneDisplay}</span>
                      </a>

                      {/* Golden Book Pill */}
                      <button
                        onClick={() => onOpenBooking()}
                        className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>احجز</span>
                      </button>
                    </div>

                    {/* Dark Warranty & Tax Invoice Bar */}
                    <div className="bg-[#0f172a]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between gap-2 sm:gap-3 text-right">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-xs font-black text-amber-400 leading-tight">ضمان ذهبي معتمد</p>
                          <p className="text-[9px] sm:text-[10px] text-slate-300">فاتورة رسمية ورقمية مع كل طلب</p>
                        </div>
                      </div>
                      <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                        100% موثوق
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom Floating Bar spanning outside bottom */}
              <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-2">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#ea580c] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black shadow-lg shadow-orange-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  <span>فنيون معتمدون بفحص شامل</span>
                </div>
                
                <button
                  onClick={handleAdminAction}
                  className="inline-flex items-center gap-1.5 bg-[#1e293b] hover:bg-[#334155] text-slate-200 px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-bold border border-slate-700 shadow-md transition-colors cursor-pointer"
                  title="فتح لوحة التحكم الإدارية لتعديل الأسعار"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>لوحة الإدارة (Admin)</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Hero Text Content */}
          <div className="order-1 lg:order-2 lg:col-span-7 space-y-4 sm:space-y-6 text-right">
            
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2.5">
              
              {/* Badge 1: فنيو الصيانة الميدانية في خدمتك الآن */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-slate-900 text-[11px] sm:text-sm font-bold shadow-sm">
                <span>👷‍♂️ فنيو الصيانة الميدانية في خدمتك 🇸🇦</span>
              </div>

              {/* Badge 2: موقعنا والخريطة - مكة المكرمة شارع ابن حميد */}
              <a 
                href="#location"
                className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 border border-emerald-400 text-[11px] sm:text-sm font-black shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
                title="عرض موقع الورشة والمحل على الخريطة مباشرة: احمد التبريد صيانة و التكييف"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
                <span>موقعنا (Location) 📍 احمد التبريد</span>
              </a>

              {/* Badge 3: معتمد من وزارة التجارة */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-[#fef3c7] border border-amber-400/80 text-amber-900 text-[11px] sm:text-sm font-black shadow-sm">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>معتمد رسمياً</span>
              </div>

            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.3] tracking-tight">
                <span>صيانة احترافية وفورية لـ</span>
                <br />
                <span className="relative inline-block my-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
                    المكيفات والغسالات
                  </span>
                  {/* Yellowish accent underline highlighter bar */}
                  <span className="absolute bottom-1 right-0 left-0 h-2.5 sm:h-3 bg-amber-300/40 -z-10 rounded-full" />
                </span>
                <br />
                <span>بمنزلك مع ضمان معتمد</span>
              </h1>
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-800 font-semibold leading-relaxed max-w-2xl">
              لا داعي للقلق بعد اليوم من حرارة الصيف أو تعطل الغسالة. نوفر لك نخبة من أفضل الفنيين المعتمدين في{' '}
              <span className="text-amber-700 font-black">مكة المكرمة - حي العزيزية وكافة أحياء مكة</span>{' '}
              مع فحص دقيق بأحدث الأجهزة وقطع غيار أصلية 100% بأسعار تبدأ من{' '}
              <span className="inline-block border border-amber-400 bg-amber-50 text-amber-800 font-black px-2 py-0.5 rounded-lg shadow-sm mx-1">
                {heroSettings.startingPrice} ريال
              </span>{' '}
              فقط.
            </p>


            {/* Trust Mini Features */}
            <div className="pt-3 sm:pt-4 grid grid-cols-3 gap-2 sm:gap-3 text-center sm:text-right border-t border-slate-200/80">
              <div className="p-1.5 sm:p-2">
                <p className="text-sm sm:text-lg font-black text-slate-900">45 دقيقة</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold">وقت الوصول</p>
              </div>
              <div className="p-1.5 sm:p-2 border-r border-slate-200">
                <p className="text-sm sm:text-lg font-black text-[#ea580c]">6 أشهر</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold">ضمان ذهبي</p>
              </div>
              <div className="p-1.5 sm:p-2 border-r border-slate-200">
                <p className="text-sm sm:text-lg font-black text-emerald-600">100%</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold">قطع أصلية</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
