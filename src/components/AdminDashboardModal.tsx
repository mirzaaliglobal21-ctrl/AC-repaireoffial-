import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  LogOut, 
  DollarSign, 
  Package, 
  Calculator, 
  Tag, 
  CalendarDays, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageCircle, 
  Wrench, 
  Layers, 
  ShieldCheck, 
  Search,
  Sparkles,
  ExternalLink,
  Trash2,
  Filter,
  MapPin,
  Upload,
  Camera,
  Link2
} from 'lucide-react';
import { 
  useAdminSettings, 
  AdminService, 
  AdminPackageTier, 
  AdminCalculatorAppliance, 
  AdminCalculatorService, 
  AdminHeroSettings,
  AdminLocationSettings,
  extractCoordinates
} from '../context/AdminSettingsContext';

export const AdminDashboardModal: React.FC = () => {
  const { 
    isAdminDashboardOpen, 
    setIsAdminDashboardOpen, 
    logoutAdmin,
    services,
    pricingTiers,
    calculatorAppliances,
    calculatorServices,
    heroSettings,
    contactSettings,
    locationSettings,
    saveAllSettings,
    resetToDefaults,
    bookings,
    updateBookingStatus,
    deleteBooking
  } = useAdminSettings();

  const [activeTab, setActiveTab] = useState<'services' | 'tiers' | 'calculator' | 'hero' | 'location' | 'bookings'>('services');

  // Local draft state for editing before saving
  const [draftServices, setDraftServices] = useState<AdminService[]>(services);
  const [draftTiers, setDraftTiers] = useState<AdminPackageTier[]>(pricingTiers);
  const [draftAppliances, setDraftAppliances] = useState<AdminCalculatorAppliance[]>(calculatorAppliances);
  const [draftCalcServices, setDraftCalcServices] = useState<AdminCalculatorService[]>(calculatorServices);
  const [draftHero, setDraftHero] = useState<AdminHeroSettings>(heroSettings);
  const [draftContact, setDraftContact] = useState(contactSettings);
  const [draftLocation, setDraftLocation] = useState<AdminLocationSettings>(locationSettings);
  const [locationInputUrl, setLocationInputUrl] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchBookingQuery, setSearchBookingQuery] = useState('');
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');

  // Keep drafts synced when modal opens
  React.useEffect(() => {
    if (isAdminDashboardOpen) {
      setDraftServices(services);
      setDraftTiers(pricingTiers);
      setDraftAppliances(calculatorAppliances);
      setDraftCalcServices(calculatorServices);
      setDraftHero(heroSettings);
      setDraftContact(contactSettings);
      setDraftLocation(locationSettings);
    }
  }, [isAdminDashboardOpen, services, pricingTiers, calculatorAppliances, calculatorServices, heroSettings, contactSettings, locationSettings]);

  if (!isAdminDashboardOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveAll = () => {
    saveAllSettings({
      services: draftServices,
      pricingTiers: draftTiers,
      calculatorAppliances: draftAppliances,
      calculatorServices: draftCalcServices,
      heroSettings: draftHero,
      contactSettings: draftContact,
      locationSettings: draftLocation,
    });
    showToast('تم حفظ جميع الأسعار والموقع والإعدادات بنجاح وتحديث الموقع فورياً! 🎉');
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من استعادة كافة الأسعار الأصلية الافتراضية؟')) {
      resetToDefaults();
      showToast('تمت استعادة كافة الأسعار والإعدادات الافتراضية بنجاح.');
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchBookingQuery.toLowerCase()) ||
      b.phone.includes(searchBookingQuery) ||
      b.city.toLowerCase().includes(searchBookingQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchBookingQuery.toLowerCase());
    
    const matchesStatus = bookingFilterStatus === 'all' || b.status === bookingFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn" dir="rtl">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-amber-300 flex flex-col overflow-hidden text-right">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 px-4 sm:px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-white">لوحة تحكم وتعديل الأسعار</h2>
                <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  متصل كمسؤول معتمد
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300">
                يمكنك تغيير أسعار أي خدمة أو باقة أو حاسبة، وحفظها فوراً لتظهر للعملاء في الموقع
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات فوراً</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              title="استعادة الأسعار الافتراضية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">استعادة الأصلية</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/40 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
              title="تسجيل الخروج"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">خروج</span>
            </button>

            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-emerald-500 text-slate-950 px-4 py-2.5 text-xs sm:text-sm font-black flex items-center justify-between shadow-md animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-slate-950/70 hover:text-slate-950">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-slate-100 border-b border-slate-200 overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-300 font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Wrench className="w-4 h-4 text-amber-600" />
            <span>أسعار الخدمات الرئيسية ({draftServices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tiers')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'tiers'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-300 font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Package className="w-4 h-4 text-amber-600" />
            <span>باقات الصيانة والاشتراكات ({draftTiers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-300 font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>أسعار حاسبة التكلفة ({draftAppliances.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-300 font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Tag className="w-4 h-4 text-amber-600" />
            <span>العروض والبنر والتواصل</span>
          </button>

          <button
            onClick={() => setActiveTab('location')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'location'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-300 font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>موقع الخريطة وGPS (العزيزية)</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-300 font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <CalendarDays className="w-4 h-4 text-amber-600" />
            <span>طلبات الحجز المباشرة ({bookings.length})</span>
            {bookings.some(b => b.status === 'new') && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#faf9f6]">
          
          {/* ================= TAB 1: SERVICES PRICING ================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950">
                  <p className="font-black">تعديل أسعار الخدمات الفردية المعروضة في قسم الخدمات:</p>
                  <p className="text-slate-600 text-xs mt-1">
                    قم بتغيير السعر الفعلي وسعر الخصم قبل الشطب. سيتم تحديث البطاقات فوراً بعد الضغط على زر "حفظ التعديلات".
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {draftServices.map((service, idx) => (
                  <div 
                    key={service.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all space-y-4"
                  >
                    {/* Header with Title and Category */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-700 font-mono font-black text-xs flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">{service.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-1">{service.subtitle}</p>
                      </div>

                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        {service.category === 'ac' ? 'مكيفات' : service.category === 'washer' ? 'غسالات' : 'قطع غيار'}
                      </span>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          السعر المخفض (ر.س) 💰
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={service.price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setDraftServices(prev => prev.map(s => s.id === service.id ? { ...s, price: val } : s));
                            }}
                            className="w-full px-3 py-2 bg-amber-50/50 rounded-xl border border-amber-300 font-black text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                          />
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">ر.س</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          السعر السابق المشطوب (ر.س)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={service.originalPrice || ''}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setDraftServices(prev => prev.map(s => s.id === service.id ? { ...s, originalPrice: val } : s));
                            }}
                            placeholder="مثلاً 150"
                            className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                          />
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">ر.س</span>
                        </div>
                      </div>
                    </div>

                    {/* Tag and Note */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">شارة التميز (Badge)</label>
                        <input
                          type="text"
                          value={service.badge || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftServices(prev => prev.map(s => s.id === service.id ? { ...s, badge: val } : s));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">ملاحظة السعر</label>
                        <input
                          type="text"
                          value={service.priceNote || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftServices(prev => prev.map(s => s.id === service.id ? { ...s, priceNote: val } : s));
                          }}
                          placeholder="مثلاً: شامل الفحص"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 2: PACKAGES & TIERS PRICING ================= */}
          {activeTab === 'tiers' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <Package className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950">
                  <p className="font-black">تعديل أسعار باقات الصيانة الشاملة (قسم الباقات):</p>
                  <p className="text-slate-600 text-xs mt-1">
                    يمكنك تغيير سعر الباقة الفعلي والسعر قبل الخصم وتعديل عنوان الباقة أو مميزاتها.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {draftTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`bg-white rounded-3xl p-6 border transition-all space-y-4 ${
                      tier.popular
                        ? 'border-2 border-amber-400 shadow-xl ring-2 ring-amber-100'
                        : 'border-slate-200 shadow-sm hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black px-3 py-1 rounded-full ${
                        tier.popular ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {tier.id.toUpperCase()}
                      </span>
                      {tier.popular && (
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          الباقة الأكثر طلباً
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">اسم الباقة</label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraftTiers(prev => prev.map(t => t.id === tier.id ? { ...t, name: val } : t));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1">
                          السعر بعد الخصم 🏷️
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={tier.price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setDraftTiers(prev => prev.map(t => t.id === tier.id ? { ...t, price: val } : t));
                            }}
                            className="w-full px-3 py-2 bg-amber-50 rounded-xl border-2 border-amber-400 font-black text-base text-slate-950 outline-none"
                          />
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">ر.س</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          السعر الأصلي المشطوب
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={tier.originalPrice}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setDraftTiers(prev => prev.map(t => t.id === tier.id ? { ...t, originalPrice: val } : t));
                            }}
                            className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 outline-none"
                          />
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ر.س</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <label className="block text-xs font-bold text-slate-600 mb-1">نص زر الحجز (CTA)</label>
                      <input
                        type="text"
                        value={tier.ctaText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraftTiers(prev => prev.map(t => t.id === tier.id ? { ...t, ctaText: val } : t));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
                      />
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-700 block mb-1">الميزات المشمولة:</span>
                      <ul className="text-[11px] text-slate-600 space-y-1 pr-3 list-disc">
                        {tier.features.slice(0, 4).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 3: CALCULATOR PRICING ================= */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <Calculator className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950">
                  <p className="font-black">تعديل أسعار ومعاملات حاسبة التكلفة التقديرية الفورية:</p>
                  <p className="text-slate-600 text-xs mt-1">
                    عندما يقوم العميل باختيار نوع الجهاز والخدمة في الحاسبة، يتم ضرب السعر الأساسي للجهاز في معامل نوع الخدمة.
                  </p>
                </div>
              </div>

              {/* Appliances Base Prices */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>1. الأسعار الأساسية للأجهزة (Base Price لكل جهاز)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {draftAppliances.map((app) => (
                    <div key={app.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                      <span className="text-xs font-black text-slate-800">{app.name}</span>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          value={app.basePrice}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setDraftAppliances(prev => prev.map(a => a.id === app.id ? { ...a, basePrice: val } : a));
                          }}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 font-black text-sm text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ر.س</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Multipliers */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>2. معاملات أنواع الخدمة (Service Multipliers)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {draftCalcServices.map((svc) => (
                    <div key={svc.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">{svc.name}</span>
                        <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          معامل الضرب: x{svc.multiplier}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{svc.desc}</p>
                      
                      <div className="pt-1">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          معامل السعر (Multiplier)
                        </label>
                        <input
                          type="number"
                          step="0.05"
                          min="0.5"
                          value={svc.multiplier}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setDraftCalcServices(prev => prev.map(s => s.id === svc.id ? { ...s, multiplier: val } : s));
                          }}
                          className="w-full px-3 py-1.5 bg-white rounded-xl border border-slate-300 font-mono font-bold text-sm text-slate-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 4: HERO & CONTACT SETTINGS ================= */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <Tag className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950">
                  <p className="font-black">تعديل أسعار البنر والصفحة الأولى ومعلومات الاتصال:</p>
                  <p className="text-slate-600 text-xs mt-1">
                    هنا يمكنك تحديد السعر الذي يبدأ منه الفحص في واجهة الموقع (Hero)، ونسبة الخصم، ونص البنر العلوي، ورقم الهاتف والواتساب.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Hero Pricing Box */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                    أسعار العرض الترويجي في واجهة الموقع
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      سعر البداية في واجهة الموقع (تبدأ من ... ريال) 💰
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={draftHero.startingPrice}
                        onChange={(e) => setDraftHero({ ...draftHero, startingPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-amber-50 rounded-xl border-2 border-amber-400 font-black text-base text-slate-950 outline-none"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">ر.س</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">يظهر في الهيرو ومقدمة الموقع "تبدأ من 79 ريال"</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      نسبة الخصم المعروضة (%) 🏷️
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={draftHero.discountPercent}
                        onChange={(e) => setDraftHero({ ...draftHero, discountPercent: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-300 font-black text-base text-slate-900 outline-none"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      نص الشريط الإعلاني العلوي (Top Banner Text)
                    </label>
                    <textarea
                      rows={2}
                      value={draftHero.announcementText}
                      onChange={(e) => setDraftHero({ ...draftHero, announcementText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                {/* Contact Numbers Box */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                    أرقام التواصل والواتساب المعتمدة
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم الاتصال المباشر (Phone Display) 📞
                    </label>
                    <input
                      type="text"
                      value={draftContact.phoneDisplay}
                      onChange={(e) => setDraftContact({ ...draftContact, phone: e.target.value, phoneDisplay: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      العنوان الميداني الرئيسي
                    </label>
                    <input
                      type="text"
                      value={draftContact.address}
                      onChange={(e) => setDraftContact({ ...draftContact, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>ربط تلقائي بالواتساب</span>
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      عند تعديل رقم الهاتف، يتم تحديث روابط الاتصال وأزرار واتساب المباشرة تلقائياً.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 5: LOCATION & GPS (AL AZIZIYAH) ================= */}
          {activeTab === 'location' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">
                    إدارة موقع الفرع والخريطة وصورة الأقمار الصناعية (حي العزيزية - مكة المكرمة)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    يمكنك هنا تعديل إحداثيات GPS الدقيقة، ولصق رابط Google Maps، أو رفع لقطة شاشة حقيقية لخريطتك لتظهر لجميع العملاء كصورة الموقع المعتمدة.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Panel 1: Map Screenshot & Photo Upload */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-600" />
                      <span>صورة الخريطة المعتمدة للموقع</span>
                    </h4>
                    {draftLocation.customMapImageUrl && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        صورة مخصصة نشطة ✓
                      </span>
                    )}
                  </div>

                  {/* Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-video flex items-center justify-center">
                    {draftLocation.customMapImageUrl ? (
                      <img 
                        src={draftLocation.customMapImageUrl} 
                        alt="صورة الخريطة المخصصة" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 text-slate-400">
                        <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-80" />
                        <p className="text-xs font-bold text-slate-300">يتم حالياً استخدام صورة الأقمار الصناعية الافتراضية</p>
                        <p className="text-[11px] text-slate-500 mt-1">ارفع لقطة شاشة (Screenshot) لخريطتك لاستبدالها فوراً</p>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      رفع لقطة شاشة من الهاتف (من الواتساب أو Google Maps):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const b64 = ev.target?.result as string;
                            if (b64) {
                              setDraftLocation({ ...draftLocation, customMapImageUrl: b64 });
                              showToast('تم تحميل صورة الخريطة بنجاح! اضغط حفظ التغييرات بالأعلى لاعتمادها.');
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-xs text-slate-500 file:mr-0 file:ml-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer"
                    />

                    {draftLocation.customMapImageUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setDraftLocation({ ...draftLocation, customMapImageUrl: '' });
                          showToast('تمت استعادة صورة القمر الصناعي الافتراضية.');
                        }}
                        className="text-xs text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer"
                      >
                        إلغاء الصورة المخصصة والعودة للافتراضية
                      </button>
                    )}
                  </div>
                </div>

                {/* Panel 2: Coordinates & Google Maps Link */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-emerald-600" />
                    <span>إحداثيات GPS ورابط الخريطة</span>
                  </h4>

                  {/* Fast URL input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      لصق رابط Google Maps (يقوم باستخراج الإحداثيات تلقائياً):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={locationInputUrl}
                        onChange={(e) => setLocationInputUrl(e.target.value)}
                        placeholder="https://maps.app.goo.gl/... أو 21.391009, 39.877195"
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!locationInputUrl.trim()) return;
                          const coords = extractCoordinates(locationInputUrl.trim());
                          if (coords) {
                            setDraftLocation({
                              ...draftLocation,
                              latitude: coords.lat,
                              longitude: coords.lng,
                              googleMapsUrl: locationInputUrl.startsWith('http') ? locationInputUrl : `https://maps.google.com/?q=${coords.lat},${coords.lng}`
                            });
                            showToast(`تم استخراج الإحداثيات: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
                          } else {
                            showToast('تعذر استخراج الإحداثيات. يرجى إدخالها يدوياً.');
                          }
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shrink-0 cursor-pointer"
                      >
                        تطبيق
                      </button>
                    </div>
                  </div>

                  {/* Latitude & Longitude inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        خط العرض (Latitude)
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={draftLocation.latitude}
                        onChange={(e) => setDraftLocation({ ...draftLocation, latitude: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        خط الطول (Longitude)
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={draftLocation.longitude}
                        onChange={(e) => setDraftLocation({ ...draftLocation, longitude: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold"
                      />
                    </div>
                  </div>

                  {/* Street & Landmarks */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      اسم الشارع والحي:
                    </label>
                    <input
                      type="text"
                      value={draftLocation.streetName}
                      onChange={(e) => setDraftLocation({ ...draftLocation, streetName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      المعلم المجاور 1 (مثلاً: بجوار عرين العزيزية للشقق المفروشة):
                    </label>
                    <input
                      type="text"
                      value={draftLocation.adjacentLandmark1}
                      onChange={(e) => setDraftLocation({ ...draftLocation, adjacentLandmark1: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      المعلم المجاور 2 (مثلاً: أمام موقف حافلات 6B Bus Stand):
                    </label>
                    <input
                      type="text"
                      value={draftLocation.adjacentLandmark2}
                      onChange={(e) => setDraftLocation({ ...draftLocation, adjacentLandmark2: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  {/* Test link button */}
                  <a
                    href={`https://maps.google.com/?q=${draftLocation.latitude},${draftLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-bold hover:underline pt-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>اختبار الموقع على خرائط Google الآن ↗</span>
                  </a>

                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 6: BOOKINGS MANAGEMENT ================= */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              
              {/* Header and filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، رقم الجوال، الحي، أو نوع الخدمة..."
                    value={searchBookingQuery}
                    onChange={(e) => setSearchBookingQuery(e.target.value)}
                    className="w-full text-xs font-medium text-slate-800 outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={bookingFilterStatus}
                    onChange={(e) => setBookingFilterStatus(e.target.value)}
                    className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 outline-none"
                  >
                    <option value="all">كل الحالات ({bookings.length})</option>
                    <option value="new">جديدة (New)</option>
                    <option value="in_progress">قيد المعالجة (In Progress)</option>
                    <option value="completed">تم الإنجاز (Completed)</option>
                    <option value="cancelled">ملغية (Cancelled)</option>
                  </select>
                </div>
              </div>

              {/* Bookings List */}
              {filteredBookings.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                  <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 font-bold text-sm">لا توجد طلبات تطابق بحثك حالياً</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {b.id}
                            </span>
                            <h4 className="text-sm font-black text-slate-900">{b.name}</h4>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-1">
                            {b.city} {b.district ? `(${b.district})` : ''}
                          </p>
                        </div>

                        {/* Status Select */}
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-xl border outline-none cursor-pointer ${
                            b.status === 'new'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : b.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : b.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          <option value="new">جديد ⏳</option>
                          <option value="in_progress">قيد المعالجة 🔧</option>
                          <option value="completed">تم الإنجاز ✅</option>
                          <option value="cancelled">ملغي ❌</option>
                        </select>
                      </div>

                      {/* Service Details */}
                      <div className="text-xs space-y-1 text-slate-700">
                        <p><span className="font-bold text-slate-500">الخدمة:</span> {b.service}</p>
                        <p><span className="font-bold text-slate-500">الموعد:</span> {b.date} - {b.timeSlot}</p>
                        {b.notes && (
                          <p className="bg-slate-50 p-2 rounded-lg text-slate-600 border border-slate-100 mt-1">
                            <span className="font-bold">ملاحظات:</span> {b.notes}
                          </p>
                        )}
                        <p className="text-[10px] text-slate-400">تاريخ الطلب: {b.createdAt}</p>
                      </div>

                      {/* Quick Contact & Delete Buttons */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${b.phone}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
                          >
                            <Phone className="w-3 h-3 text-amber-600" />
                            <span>اتصال: {b.phone}</span>
                          </a>

                          <a
                            href={`https://wa.me/966${b.phone.replace(/^0/, '')}?text=${encodeURIComponent(`السلام عليكم أستاذ ${b.name}، بخصوص طلب الصيانة رقم ${b.id} لخدمة ${b.service}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-600" />
                            <span>واتساب</span>
                          </a>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنت متأكد من حذف الطلب ${b.id}؟`)) {
                              deleteBooking(b.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="حذف الطلب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Bar with Save Buttons */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>يتم حفظ وتطبيق التعديلات محلياً وفورياً على كامل المتصفح.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              إغلاق اللوحة
            </button>

            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ جميع التعديلات فوراً</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
