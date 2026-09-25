import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Phone, 
  Clock, 
  Building2, 
  Bus, 
  MessageCircle, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Layers, 
  Star, 
  Compass, 
  CheckCircle2, 
  Globe2,
  Wrench,
  Store
} from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';
import { useAdminSettings } from '../context/AdminSettingsContext';
import aziziyaSatelliteMap from '../assets/images/aziziya_satellite_map_1790306147408.jpg';

interface LocationMapSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ onOpenBooking }) => {
  const { locationSettings } = useAdminSettings();
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // View mode: 'satellite' is default to match user's screenshot
  const [mapMode, setMapMode] = useState<'satellite' | 'roadmap' | 'satellite_photo'>('satellite');

  // Exact coordinates of the marked shop building (with the green tick ✔ on Ibn Humaid St, directly adjacent to Areen Al Aziziyah)
  const lat = locationSettings.latitude || 21.39170;
  const lng = locationSettings.longitude || 39.87593;

  // Real shop title & identity matching user's green tick mark
  const locationNameAr = "مقر وورشة الصيانة الميدانية (المبنى المحدد ✔)";
  const locationName = "Al-Saqr AC & Washer Repair Workshop (Marked Building ✔)";
  const locationNameUrdu = "ورکشاپ اور دکان - ایئر کنڈیشنر اور واشنگ مشین مرمت (ٹک والی عمارت ✔)";

  // Embed URLs centered with a live pin directly on the marked shop building
  // 1. Satellite view (t=k) with close-up zoom (z=19)
  const satelliteEmbedSrc = `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=19&output=embed`;
  
  // 2. Normal Roadmap view with pin
  const roadmapEmbedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=18&output=embed`;

  // Direct URLs
  const getDirectionsUrl = locationSettings.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const directMapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

  // Exact Address details
  const addressLineArabic = locationSettings.streetName || "3801 شارع الشيخ عبدالله بن حميد - المبنى الملاصق لعرين العزيزية (مقر الورشة والمحل) - مكة المكرمة 24242 7003";
  const addressLineEnglish = "3801 Sheikh Abdullah Ibn Humaid St, Al Jamiah / Al Aziziyah, Makkah 24242 7003 (Marked Building ✔)";
  const landmarkBuilding = locationSettings.adjacentLandmark1 || "الموقع الفعلي: المبنى المحدد بعلامة الصح (✔) ملاصق ومجاور لعرين العزيزية مباشرة";
  const landmarkAdjacent = locationSettings.adjacentLandmark2 || "على شارع الشيخ عبدالله بن حميد مباشرة (Abdullah Ibn Hamid)";
  const landmarkTransit = locationSettings.nearbyLandmark || "المواصلات: أمام محطة وموقف حافلات 6B Bus Stand (HCOI) وقريب من طريق المسجد الحرام";
  const shortAddress = "المبنى المحدد (✔) بشارع ابن حميد - ملاصق لعرين العزيزية";

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `📍 موقع ورشة ومحل صيانة المكيفات والغسالات (Our Actual Shop Location / ہماری اصلی دکان کی لوکیشن):\n${locationNameAr}\nالمعلم: بجوار مطحنة الدقيق وعرين العزيزية\nالإحداثيات: ${lat.toFixed(5)}, ${lng.toFixed(5)}\nالعنوان: ${addressLineArabic}\nخرائط Google:\n${directMapsUrl}\nرابط الاتجاهات المباشر:\n${getDirectionsUrl}`
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${locationNameAr}\n${addressLineArabic}\nالإحداثيات: ${lat.toFixed(5)}, ${lng.toFixed(5)}\n${directMapsUrl}\nالاتجاهات: ${getDirectionsUrl}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section 
      id="location" 
      className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-6 lg:pb-16 bg-gradient-to-b from-[#fcfbfa] via-[#fffdfa] to-[#f8f6f0] border-b border-amber-100/90 relative overflow-hidden" 
      dir="rtl"
    >
      {/* Anchor for existing links & navbar */}
      <span id="makkah-map" className="sr-only" aria-hidden="true" />

      {/* Ambient background glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-['Tajawal',sans-serif]">
        
        {/* Section Header: Titled "Our Location" / "ہماری لوکیشن" */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black mb-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <MapPin className="w-4 h-4 text-red-600" />
            <span>موقعنا الفعلي في مكة المكرمة • Our Shop Location • ہماری اصلی دکان 📍</span>
          </div>

          {/* Main Title matching user requirements */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            Our Location / <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600">ہماری لوکیشن</span>
            <span className="block text-base sm:text-xl lg:text-2xl text-slate-700 font-bold mt-1">
              (مقر الورشة والمحل: المبنى المحدد بعلامة الصح ✔ الملاصق لعرين العزيزية)
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            موقع ورشة ومحل الصيانة الفعلي بحي العزيزية في مكة المكرمة (المبنى المحدد بعلامة الصح ✔ الملاصق مباشرة لعرين العزيزية للشقق المفروشة على شارع ابن حميد). تفضل بزيارتنا أو اطلب خدمة الصيانة الميدانية الفورية.
          </p>
        </div>

        {/* Map Card Container (Responsive, ~400px height, rounded corners, subtle shadow) */}
        <div className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-900/10 border border-amber-200/90 overflow-hidden transition-all ${
          isFullscreen ? 'fixed inset-2 sm:inset-6 z-50 flex flex-col shadow-2xl border-2 border-amber-500' : ''
        }`}>
          
          {/* Card Top Bar with Google Maps Style Search & View Controls */}
          <div className="p-3 sm:p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            
            {/* Google Maps Search Bar / Header representation */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-sm">
                <Store className="w-5 h-5 text-red-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-white truncate">
                    {locationNameAr}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    المحل الفعلي المحدد
                  </span>
                </div>
                <p className="text-[11px] text-amber-300/90 font-medium truncate dir-ltr text-right">
                  {lat.toFixed(5)}, {lng.toFixed(5)} • {locationName}
                </p>
              </div>
            </div>

            {/* View Selector Controls matching user request & screenshot */}
            <div className="flex items-center gap-1.5 mr-auto sm:mr-0">
              
              {/* Satellite Mode */}
              <button
                type="button"
                onClick={() => setMapMode('satellite')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  mapMode === 'satellite'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                title="عرض القمر الصناعي التفاعلي المباشر"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>🛰️ قمر صناعي (مباشر)</span>
              </button>

              {/* Standard Road Map Mode */}
              <button
                type="button"
                onClick={() => setMapMode('roadmap')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  mapMode === 'roadmap'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                title="عرض خريطة الشوارع"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">خريطة الطرق</span>
                <span className="sm:hidden">طرق</span>
              </button>

              {/* Aerial Photo with Building Marker */}
              <button
                type="button"
                onClick={() => setMapMode('satellite_photo')}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  mapMode === 'satellite_photo'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title="صورة جوية بانورامية للمبنى المحدد"
              >
                <span>صورة جوية محددة</span>
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 shrink-0"
                title={isFullscreen ? 'تصغير الشاشة' : 'تكبير الشاشة كاملة'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

            </div>

          </div>

          {/* Interactive Google Map Responsive Viewport (~400px height, full width) */}
          <div className="relative w-full bg-slate-900 overflow-hidden min-h-[380px] h-[400px] sm:h-[430px] lg:h-[460px]">
            
            {/* Embedded Interactive Google Map */}
            {mapMode === 'satellite' ? (
              <iframe
                title="مقر وورشة الصيانة - المبنى المحدد، مكة المكرمة - خرائط Google (قمر صناعي)"
                src={satelliteEmbedSrc}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : mapMode === 'roadmap' ? (
              <iframe
                title="Al-Saqr Repair Workshop - Marked Building - Google Map"
                src={roadmapEmbedSrc}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              /* High-Res Satellite Aerial Photo with Target Locator */
              <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={aziziyaSatelliteMap}
                  alt="موقع الورشة والمحل الفعلي - تصوير الأقمار الصناعية"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Target Locator on the marked building */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-52 h-28 rounded-2xl border-4 border-[#22c55e] bg-[#22c55e]/20 shadow-[0_0_40px_rgba(34,197,94,0.8)] animate-pulse flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-xl">
                      <Check className="w-6 h-6 stroke-[3] text-white" />
                    </div>
                    <span className="mt-1 px-3 py-1 rounded-md bg-slate-950/95 border border-emerald-400 text-[11px] font-black text-emerald-300 whitespace-nowrap shadow-lg">
                      المبنى المحدد بعلامة الصح ✔ (المحل والورشة) 📍
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Live Place Tag in Top Corner (Matches Google Maps Mobile UI) */}
            <div className="absolute top-3 right-3 z-10 bg-slate-900/90 backdrop-blur-md border border-amber-400/80 px-3.5 py-2.5 rounded-2xl shadow-2xl max-w-[290px] sm:max-w-[340px] text-right pointer-events-none">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-extrabold">{locationNameAr}</span>
              </div>
              <p className="text-slate-300 text-[11px] font-medium leading-tight">
                {shortAddress}
              </p>
              <div className="flex items-center justify-between gap-1.5 mt-1.5 pt-1.5 border-t border-slate-700/80 text-[10px] text-amber-300 font-bold">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="text-white mr-1">4.9</span>
                </div>
                <span className="text-emerald-400 font-mono dir-ltr">{lat.toFixed(5)}, {lng.toFixed(5)}</span>
              </div>
            </div>

            {/* Quick Action Floating Pill at Bottom of Map */}
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
              <a
                href={getDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-lg shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>الاتجاهات إلى المحل</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700 hover:scale-105 transition-all"
              >
                <span>خرائط Google</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

          </div>

          {/* Section Below the Map: Authentic Google Place Sheet & Action Buttons */}
          <div className="p-5 sm:p-7 lg:p-8 bg-gradient-to-b from-white via-[#fffdfa] to-[#fffefb] border-t border-amber-100">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              {/* Left Column: Place Details & Address */}
              <div className="space-y-4 max-w-2xl">
                
                {/* Place Header: Title, Category & Ratings */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-black">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>مقر ومحل الصيانة الميداني المعتمد</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-bold">
                      <Wrench className="w-3 h-3 text-blue-600" />
                      <span>ورشة صيانة مكيفات وغسالات معتمدة</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>استجابة سريعة (20 - 30 دقيقة)</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {locationNameAr}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-1 text-amber-600 font-black">
                      <span className="text-sm">4.9</span>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-slate-500 font-bold">(تقييم معتمد)</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="font-bold text-slate-700">{locationNameUrdu}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-sans dir-ltr text-slate-500">{locationName}</span>
                  </div>
                </div>

                {/* Detailed Address Box */}
                <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-2.5">
                  <div className="flex items-start gap-3 text-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 fill-red-600 text-white" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-extrabold text-slate-900 text-sm sm:text-base leading-relaxed">
                        {addressLineArabic}
                      </p>
                      <p className="text-xs text-slate-600 font-sans dir-ltr text-right">
                        {addressLineEnglish}
                      </p>
                    </div>
                  </div>

                  {/* Landmarks and Transit Points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-amber-200/70 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-amber-100">
                      <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{landmarkBuilding}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-amber-100">
                      <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{landmarkAdjacent}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-amber-100 sm:col-span-2">
                      <Bus className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{landmarkTransit}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Action Buttons (Prominent "Get Directions" button + Call + WhatsApp) */}
              <div className="flex flex-col gap-3 shrink-0 lg:w-80">
                
                {/* 1. REQUIRED: Prominent "Get Directions" Button Linking to the exact URL */}
                <a
                  href={getDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-center group cursor-pointer"
                >
                  <Navigation className="w-5 h-5 shrink-0 group-hover:rotate-12 transition-transform" />
                  <span>Get Directions / احصل على الاتجاهات</span>
                  <ExternalLink className="w-4 h-4 opacity-80 shrink-0" />
                </a>

                {/* 2. Secondary Row: Copy Address & WhatsApp Share */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/50 text-slate-800 text-xs font-bold transition-all shadow-sm cursor-pointer"
                    title="نسخ العنوان ورابط الموقع إلى الحافظة"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-black">تم النسخ ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>نسخ العنوان</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black shadow-sm shadow-[#25D366]/20 transition-all text-center"
                    title="مشاركة الموقع الدقيق عبر الواتساب"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>مشاركة واتساب</span>
                  </a>
                </div>

                {/* 3. Direct Phone Call Button */}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm text-center"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>اتصال مباشر: {CONTACT_INFO.phoneDisplay}</span>
                </a>

                {/* 4. Book Technician Button */}
                <button
                  type="button"
                  onClick={() => onOpenBooking('صيانة في مكة المكرمة - العزيزية (شارع ابن حميد - الورشة الرئيسية)')}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-amber-300 hover:border-amber-400 bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-black text-xs transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>طلب فني لمنطقتك في العزيزية</span>
                </button>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
