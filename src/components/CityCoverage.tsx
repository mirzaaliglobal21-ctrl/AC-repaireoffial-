import React, { useState } from 'react';
import { MapPin, Clock, Users, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SAUDI_CITIES } from '../data/servicesData';

interface CityCoverageProps {
  onOpenBooking: (cityName?: string) => void;
}

export const CityCoverage: React.FC<CityCoverageProps> = ({ onOpenBooking }) => {
  const [selectedCity, setSelectedCity] = useState(SAUDI_CITIES[0]);

  return (
    <section id="coverage" className="py-20 lg:py-24 relative bg-[#f8f7f5] overflow-hidden border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>تغطية جغرافية شاملة لمدن المملكة 🇸🇦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            سيارات صيانة مجهزة في{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              جميع أحياء مدينتك
            </span>
          </h2>

          <p className="text-slate-600 text-base">
            تنتشر فرقنا المتنقلة المزودة بأحدث أجهزة الفحص وقطع الغيار في كافة المدن الرئيسية لضمان سرعة الوصول لمنزلك.
          </p>

          {/* City Selection Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {SAUDI_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCity.name === city.name
                    ? 'bg-gradient-to-r from-[#ea580c] to-amber-500 text-white shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 shadow-sm'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected City Detail Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* City Info */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    خدمات الصيانة المنزلية في {selectedCity.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-bold">تغطية لكافة المخططات والأحياء السكنية والشركات</p>
                </div>
              </div>

              {/* Status & Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>متوسط زمن الوصول</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">{selectedCity.responseTime}</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>جاهزية الفرق الميدانية</span>
                  </div>
                  <span className="text-lg font-black text-emerald-700">{selectedCity.teamsCount} سيارة مجهزة</span>
                </div>
              </div>

              {/* Covered Districts List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500">أبرز الأحياء المشمولة بالتغطية الفورية:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCity.districts.map((district, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold"
                    >
                      {district}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenBooking(`حجز صيانة في ${selectedCity.name}`)}
                className="bg-gradient-to-r from-[#ea580c] to-amber-500 hover:opacity-95 text-white font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2"
              >
                <span>طلب فني صيانة في {selectedCity.name} الآن</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Coverage Trust Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 space-y-4 text-right">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>مميزات الخدمة في {selectedCity.name}</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>وصول سريع خلال 30 إلى 45 دقيقة للأحياء المركزية</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>سيارات مجهزة بأحدث أجهزة قياس الفريون وقطع الغيار</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>دفع إلكتروني فوري (مدى / Apple Pay) بعد إتمام الصيانة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>فاتورة ضريبية رسمية وضمان موثق حتى 6 أشهر</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
