import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  FileCheck, 
  X 
} from 'lucide-react';
import luxuryBg from '../assets/images/luxury_home_bg_1790246875878.jpg';
import { SAUDI_CITIES } from '../data/servicesData';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface BookingSectionProps {
  preselectedService?: string;
  onClearPreselected?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ 
  preselectedService,
  onClearPreselected 
}) => {
  const { addBooking, contactSettings } = useAdminSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'مكة المكرمة (العزيزية)',
    district: '',
    service: preselectedService || 'صيانة وإصلاح المكيفات (سبليت/مركزي)',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'خلال 30 دقيقة (طوارئ سريعة)',
    notes: '',
  });

  const [submittedBooking, setSubmittedBooking] = useState<{
    id: string;
    name: string;
    phone: string;
    city: string;
    service: string;
    timeSlot: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    setTimeout(() => {
      const created = addBooking({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        district: formData.district,
        service: formData.service,
        date: formData.date,
        timeSlot: formData.timeSlot,
        notes: formData.notes,
      });

      setSubmittedBooking({
        id: created.id,
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        service: formData.service,
        timeSlot: formData.timeSlot,
      });
      setLoading(false);
    }, 400);
  };

  const handleSendWhatsApp = () => {
    if (!submittedBooking) return;
    const msg = `السلام عليكم ورحمة الله، قمت بحجز طلب صيانة جديد عبر الموقع:
*رقم الحجز:* ${submittedBooking.id}
*الاسم:* ${submittedBooking.name}
*الجوال:* ${submittedBooking.phone}
*المدينة:* ${submittedBooking.city}
*الخدمة المطلوبة:* ${submittedBooking.service}
*الموعد المفضل:* ${submittedBooking.timeSlot}

أرجو تأكيد موعد وصول الفني، شكراً لكم.`;

    const phoneClean = contactSettings.phone.replace(/^0/, '');
    window.open(`https://wa.me/966${phoneClean}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="booking" className="py-20 lg:py-28 relative overflow-hidden bg-[#fcfbfa] border-b border-amber-100">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>حجز فني صيانة لمنزلك في 60 ثانية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            احجز موعد الصيانة{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              بكل سهولة وأمان
            </span>
          </h2>

          <p className="text-slate-600 text-base">
            املأ بياناتك وسيصلك تأكيد فوري عبر رسالة واتساب مع تتبع مباشر لموقع سيارة الصيانة.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400 shadow-2xl relative text-right">
          
          {preselectedService && (
            <div className="mb-6 p-3.5 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between text-xs sm:text-sm text-amber-900 font-bold">
              <span>تم اختيار الخدمة مسبقاً: {preselectedService}</span>
              {onClearPreselected && (
                <button
                  onClick={onClearPreselected}
                  className="text-slate-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {!submittedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-600" />
                    <span>الاسم الكريم:</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عبد الله بن محمد"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>رقم الجوال (واتساب):</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>المدينة:</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold"
                  >
                    {SAUDI_CITIES.map((c) => (
                      <option key={c.name} value={c.name} className="text-slate-900 bg-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>الحي والشارع:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: حي النرجس / الياسمين"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>الخدمة المطلوبة:</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold"
                  >
                    <option value="صيانة وإصلاح المكيفات (سبليت/مركزي)">صيانة وإصلاح المكيفات (سبليت/مركزي)</option>
                    <option value="غسيل هيدروليكي عميق وشحن فريون">غسيل هيدروليكي عميق وشحن فريون</option>
                    <option value="صيانة وإصلاح الغسالات الأتوماتيك">صيانة وإصلاح الغسالات الأتوماتيك</option>
                    <option value="تنظيف وتعقيم حلة الغسالة">تنظيف وتعقيم حلة الغسالة</option>
                    <option value="طلب قطع غيار أصلية">طلب قطع غيار أصلية</option>
                    <option value="الباقة الشاملة للمكيفات والغسالات">الباقة الشاملة للمكيفات والغسالات</option>
                  </select>
                </div>

                {/* Time slot */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>الموعد المفضل للزيارة:</span>
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold"
                  >
                    <option value="خلال 45 دقيقة (طوارئ سريعة)">خلال 45 دقيقة (طوارئ سريعة)</option>
                    <option value="صباحاً (9:00 ص - 1:00 م)">صباحاً (9:00 ص - 1:00 م)</option>
                    <option value="عصراً (2:00 م - 6:00 م)">عصراً (2:00 م - 6:00 م)</option>
                    <option value="مساءً (6:00 م - 11:00 م)">مساءً (6:00 م - 11:00 م)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-black text-slate-900">
                  وصف العطل أو ملاحظات إضافية (اختياري):
                </label>
                <textarea
                  rows={2}
                  placeholder="مثال: المكيف يخرج هواء حار فقط، أو الغسالة تصدر صوتاً مرتفعاً عند التنشيف..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#ea580c] hover:opacity-95 text-white font-black text-base shadow-xl shadow-orange-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>جاري تأكيد حجز الموعد...</span>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>تأكيد الحجز الفوري وإرسال الفني</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-bold pt-2">
                <span>🛡️ ضمان صيانة 6 أشهر</span>
                <span>•</span>
                <span>🧾 فاتورة رسمية معتمدة</span>
                <span>•</span>
                <span>💳 دفع بعد الرضاء التام</span>
              </div>

            </form>
          ) : (
            /* Success confirmation card */
            <div className="space-y-6 text-center animate-fadeIn py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">تم استلام طلبك بنجاح!</h3>
                <p className="text-sm text-slate-600">
                  فريق الصيانة الميدانية في مدينة <span className="font-bold text-amber-700">{submittedBooking.city}</span> يقوم بتجهيز السيارة الآن.
                </p>
              </div>

              {/* Summary box */}
              <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200 text-right space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1 border-b border-amber-200/60">
                  <span className="text-slate-600 font-bold">رقم الحجز المرجعي:</span>
                  <span className="font-mono font-black text-amber-800 text-base">{submittedBooking.id}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-amber-200/60">
                  <span className="text-slate-600 font-bold">صاحب الطلب:</span>
                  <span className="font-bold text-slate-900">{submittedBooking.name}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-amber-200/60">
                  <span className="text-slate-600 font-bold">الخدمة:</span>
                  <span className="font-bold text-slate-900">{submittedBooking.service}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-bold">وقت الوصول المفضل:</span>
                  <span className="font-bold text-[#ea580c]">{submittedBooking.timeSlot}</span>
                </div>
              </div>

              {/* Send details directly via WhatsApp */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>تأكيد الموعد عبر واتساب الآن</span>
                </button>

                <button
                  onClick={() => setSubmittedBooking(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold underline"
                >
                  حجز طلب جديد آخر
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
