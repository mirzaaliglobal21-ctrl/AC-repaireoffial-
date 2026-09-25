import React from 'react';
import { Phone, MessageCircle, AlertCircle, Clock, Zap, MapPin, ShieldAlert, Sparkles } from 'lucide-react';
import emergencyImg from '../assets/images/emergency_247_service_1790246860658.jpg';
import { CONTACT_INFO } from '../data/servicesData';

interface EmergencySectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="emergency" className="py-20 lg:py-24 relative overflow-hidden bg-[#fffdfa] border-b border-amber-100">
      {/* Background Soft Amber Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual AI Image Column */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative group">
              {/* Outer Golden Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-400 to-[#ea580c] rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500" />
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-white">
                <img
                  src={emergencyImg}
                  alt="خدمة طوارئ صيانة التكييف والغسالات 24 ساعة في السعودية"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                {/* Emergency Live Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow-lg border border-red-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span>طوارئ 24 ساعة مباشر</span>
                </div>

                {/* Night City Alert Pill */}
                <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md border border-amber-300 p-4 rounded-2xl flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">متوسط وقت الوصول الآن</p>
                      <p className="text-sm font-extrabold text-[#ea580c]">أقل من 40 دقيقة داخل الرياض وجدة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                    <span>متاح الآن</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-6 space-y-6 text-right order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold shadow-sm">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>فريق التدخل السريع للحالات الطارئة 24/7</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              تعطل المكيف فجأة في{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-amber-600">
                حرارة الصيف؟
              </span>{' '}
              <br />
              فنيونا بجوارك خلال دقائق!
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              ندرك جيداً صعوبة قضاء ساعة واحدة في الصيف السعودي دون تكييف بارد، أو تراكم الغسيل عند تعطل الغسالة فجأة. خصصنا أسطولاً متنقلاً مجهزاً بقطع الغيار واسطوانات الفريون لخدمتك في أي وقت ليلاً أو نهاراً.
            </p>

            {/* Quick Emergency Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">استجابة فائقة السرعة</h4>
                  <p className="text-xs text-slate-500">تحرك فوري من أقرب نقطة لك</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">جاهزية على مدار الساعة</h4>
                  <p className="text-xs text-slate-500">مناوبات ليلية وأيام العطل الرسمية</p>
                </div>
              </div>
            </div>

            {/* Emergency CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-orange-500 to-[#ea580c] hover:opacity-95 text-white font-black px-7 py-3.5 rounded-2xl text-sm sm:text-base shadow-xl shadow-red-500/20 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <span>اتصال طوارئ فوري: {CONTACT_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={() => onOpenBooking('طوارئ 24 ساعة - صيانة فورية')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold border border-slate-300 px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>طلب حجز عاجل</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
