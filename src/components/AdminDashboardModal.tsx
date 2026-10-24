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
    showToast('All settings, prices, and location saved successfully! Platform updated live. 🎉');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restore all original default settings and prices?')) {
      resetToDefaults();
      showToast('All default settings and prices have been restored successfully.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn" dir="ltr">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-amber-300 flex flex-col overflow-hidden text-left font-sans">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 px-4 sm:px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-white">Admin Control Center</h2>
                <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Authorized Admin Connected
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Live control over service prices, maintenance packages, cost calculator & workshop location
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
              <span>Save Changes</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              title="Restore default settings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/40 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
              title="Logout from admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
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

        {/* Tab Navigation Navigation Bar */}
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
            <span>Services Pricing ({draftServices.length})</span>
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
            <span>Packages & Tiers ({draftTiers.length})</span>
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
            <span>Cost Calculator ({draftAppliances.length})</span>
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
            <span>Hero & Contact Info</span>
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
            <span>GPS & Location Settings</span>
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
            <span>Customer Bookings ({bookings.length})</span>
          </button>

        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {/* ================= TAB 1: SERVICES PRICING ================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950">
                  <p className="font-black">Live Pricing Management:</p>
                  <p className="text-slate-600 text-xs mt-1">
                    Edit discounted prices, original crossed-out prices, promotional badges, and price notes. Changes reflect instantly across all pages and booking cards.
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
                        {service.category === 'ac' ? 'AC Units' : service.category === 'washer' ? 'Washers' : 'Spare Parts'}
                      </span>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Discounted Price (SAR) 💰
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
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">SAR</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Original Price (SAR)
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
                            placeholder="e.g. 150"
                            className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">SAR</span>
                        </div>
                      </div>
                    </div>

                    {/* Tag and Note */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Badge Tag</label>
                        <input
                          type="text"
                          value={service.badge || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftServices(prev => prev.map(s => s.id === service.id ? { ...s, badge: val } : s));
                          }}
                          placeholder="e.g. Most Popular"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Price Note</label>
                        <input
                          type="text"
                          value={service.priceNote || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftServices(prev => prev.map(s => s.id === service.id ? { ...s, priceNote: val } : s));
                          }}
                          placeholder="e.g. Includes Inspection"
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
                  <p className="font-black">Comprehensive Maintenance Packages:</p>
                  <p className="text-slate-600 text-xs mt-1">
                    Update package rates, crossed-out original prices, titles, billing periods, and highlight popular tiers.
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
                          Most Requested
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Package Name</label>
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

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Current Price 💰
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
                            className="w-full px-3 py-2 bg-amber-50/50 rounded-xl border border-amber-300 font-black text-sm text-slate-900 focus:ring-2 focus:ring-amber-500"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">SAR</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Original Price
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={tier.originalPrice || ''}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setDraftTiers(prev => prev.map(t => t.id === tier.id ? { ...t, originalPrice: val } : t));
                            }}
                            placeholder="e.g. 299"
                            className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-300 font-bold text-sm text-slate-900"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">SAR</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Package Subtitle / Target</label>
                      <input
                        type="text"
                        value={tier.subtitle}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraftTiers(prev => prev.map(t => t.id === tier.id ? { ...t, subtitle: val } : t));
                        }}
                        placeholder="e.g. Best for Villas or Small Apartments"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Button CTA Text</label>
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
                      <span className="text-xs font-bold text-slate-700 block mb-1">Included Features:</span>
                      <ul className="text-[11px] text-slate-600 space-y-1 pl-3 list-disc">
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
                  <p className="font-black">Instant Cost Calculator Rates:</p>
                  <p className="text-slate-600 text-xs mt-1">
                    When customers pick an appliance and service type in the calculator, the base price is multiplied by the service multiplier.
                  </p>
                </div>
              </div>

              {/* Appliances Base Prices */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>1. Appliance Base Prices (SAR per appliance)</span>
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
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">SAR</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Multipliers */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>2. Service Multipliers</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {draftCalcServices.map((svc) => (
                    <div key={svc.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">{svc.name}</span>
                        <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          Multiplier: x{svc.multiplier}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{svc.desc}</p>
                      
                      <div className="pt-1">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Price Multiplier
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
                  <p className="font-black">Homepage Banner & Contact Details:</p>
                  <p className="text-slate-600 text-xs mt-1">
                    Set the starting promotional price on the homepage hero, discount percentage, top banner text, and official phone/WhatsApp numbers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Hero Pricing Box */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                    Homepage Promotional Rates
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Starting Price on Homepage (Starting from ... SAR) 💰
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={draftHero.startingPrice}
                        onChange={(e) => setDraftHero({ ...draftHero, startingPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-amber-50 rounded-xl border-2 border-amber-400 font-black text-base text-slate-950 outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">SAR</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Displays on hero as "Starting from 79 SAR"</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Displayed Discount Percentage (%) 🏷️
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={draftHero.discountPercent}
                        onChange={(e) => setDraftHero({ ...draftHero, discountPercent: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-black text-base text-slate-900 outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Top Announcement Ribbon Text 📢
                    </label>
                    <input
                      type="text"
                      value={draftHero.announcementText}
                      onChange={(e) => setDraftHero({ ...draftHero, announcementText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                {/* Contact Settings */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                    Official Contact Channels
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Phone Number (Display) 📞
                    </label>
                    <input
                      type="text"
                      value={draftContact.phoneDisplay}
                      onChange={(e) => setDraftContact({ ...draftContact, phone: e.target.value, phoneDisplay: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Workshop Primary Address
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
                      <span>Automatic WhatsApp & Call Sync</span>
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      Updating the phone number automatically refreshes all floating call and WhatsApp buttons across the entire website.
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
                    Workshop GPS Location & Map Controls (Al-Aziziyah, Makkah)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Update precise GPS coordinates, paste any Google Maps URL, or upload a custom aerial screenshot to display on the live map.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Panel 1: Map Screenshot & Photo Upload */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-600" />
                      <span>Workshop Aerial Photo / Screenshot</span>
                    </h4>
                    {draftLocation.customMapImageUrl && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Custom Active ✓
                      </span>
                    )}
                  </div>

                  {/* Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-video flex items-center justify-center">
                    {draftLocation.customMapImageUrl ? (
                      <img 
                        src={draftLocation.customMapImageUrl} 
                        alt="Custom Map Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 text-slate-400">
                        <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-80" />
                        <p className="text-xs font-bold text-slate-300">Using default Google Maps satellite aerial image</p>
                        <p className="text-[11px] text-slate-500 mt-1">Upload a mobile screenshot to customize it</p>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Upload Mobile Screenshot (from WhatsApp or Google Maps):
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
                              showToast('Map screenshot uploaded successfully! Click Save Changes to apply.');
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer"
                    />

                    {draftLocation.customMapImageUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setDraftLocation({ ...draftLocation, customMapImageUrl: '' });
                          showToast('Reverted to default satellite map image.');
                        }}
                        className="text-xs text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer"
                      >
                        Reset to default aerial imagery
                      </button>
                    )}
                  </div>
                </div>

                {/* Panel 2: Coordinates & Google Maps Link */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-emerald-600" />
                    <span>GPS Coordinates & Google Maps URL</span>
                  </h4>

                  {/* Fast URL input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Paste Google Maps URL or Coordinates:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={locationInputUrl}
                        onChange={(e) => setLocationInputUrl(e.target.value)}
                        placeholder="https://maps.app.goo.gl/... or 21.39163, 39.87588"
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!locationInputUrl.trim()) return;
                          const trimmed = locationInputUrl.trim();
                          const coords = extractCoordinates(trimmed);
                          if (coords) {
                            setDraftLocation({
                              ...draftLocation,
                              latitude: coords.lat,
                              longitude: coords.lng,
                              googleMapsUrl: trimmed.startsWith('http') ? trimmed : `https://maps.google.com/?q=${coords.lat},${coords.lng}`
                            });
                            showToast(`Extracted coordinates: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
                          } else if (trimmed.startsWith('http')) {
                            setDraftLocation({
                              ...draftLocation,
                              googleMapsUrl: trimmed
                            });
                            showToast('Google Maps URL saved successfully.');
                          } else {
                            showToast('Could not extract coordinates. Please enter them manually below.');
                          }
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shrink-0 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Latitude & Longitude inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Latitude
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
                        Longitude
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
                      Street & District Name:
                    </label>
                    <input
                      type="text"
                      value={draftLocation.streetName}
                      onChange={(e) => setDraftLocation({ ...draftLocation, streetName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Landmark 1:
                      </label>
                      <input
                        type="text"
                        value={draftLocation.adjacentLandmark1}
                        onChange={(e) => setDraftLocation({ ...draftLocation, adjacentLandmark1: e.target.value })}
                        placeholder="e.g. Next to Snabel Golden Hotel"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Secondary Landmark 2:
                      </label>
                      <input
                        type="text"
                        value={draftLocation.adjacentLandmark2}
                        onChange={(e) => setDraftLocation({ ...draftLocation, adjacentLandmark2: e.target.value })}
                        placeholder="e.g. Near 6B Bus Stand HC"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Google Maps Plus Code:
                    </label>
                    <input
                      type="text"
                      value={draftLocation.plusCode || ''}
                      onChange={(e) => setDraftLocation({ ...draftLocation, plusCode: e.target.value })}
                      placeholder="e.g. 9VRG+M9 Makkah Saudi Arabia"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Google Maps URL:
                    </label>
                    <input
                      type="text"
                      value={draftLocation.googleMapsUrl || ''}
                      onChange={(e) => setDraftLocation({ ...draftLocation, googleMapsUrl: e.target.value })}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                    />
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 6: CUSTOMER BOOKINGS ================= */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-amber-600" />
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">Customer Bookings & Inquiries</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Track appointments, customer requests, contact directly via phone or WhatsApp, and manage service status.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-900 text-amber-300 font-black px-3 py-1 rounded-xl">
                    Total: {bookings.length}
                  </span>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchBookingQuery}
                    onChange={(e) => setSearchBookingQuery(e.target.value)}
                    placeholder="Search by customer name, phone, city or service..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={bookingFilterStatus}
                    onChange={(e) => setBookingFilterStatus(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 outline-none bg-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New / Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Bookings List */}
              {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-700">No bookings found matching your search</p>
                  <p className="text-xs text-slate-400 mt-1">New customer bookings from the website form will appear here automatically</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBookings.map((b) => (
                    <div 
                      key={b.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                          <div>
                            <h4 className="text-sm font-black text-slate-900">{b.name}</h4>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{b.createdAt}</p>
                          </div>
                          
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                            className={`text-[11px] font-black px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                              b.status === 'completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                              b.status === 'in_progress' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                              b.status === 'cancelled' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                              'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="new">New / Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="space-y-1.5 pt-2 text-xs">
                          <p className="text-slate-700">
                            <span className="font-bold text-slate-500">Service: </span>
                            <span className="font-black text-amber-700">{b.service}</span>
                          </p>
                          <p className="text-slate-700">
                            <span className="font-bold text-slate-500">City / District: </span>
                            <span>{b.city}</span>
                          </p>
                          <p className="text-slate-700">
                            <span className="font-bold text-slate-500">Preferred Date: </span>
                            <span className="font-mono">{b.date} {b.timeSlot ? `(${b.timeSlot})` : ''}</span>
                          </p>
                          {b.notes && (
                            <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                              "{b.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Direct Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${b.phone}`}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                            title={`Call ${b.phone}`}
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/966${b.phone.replace(/^0+/, '')}?text=${encodeURIComponent(`Hello ${b.name}, we received your booking for ${b.service}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                            title={`WhatsApp ${b.phone}`}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete booking for ${b.name}?`)) {
                              deleteBooking(b.id);
                              showToast('Booking deleted successfully.');
                            }
                          }}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
