import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Globe2, 
  RotateCcw, 
  Sparkles, 
  Plus, 
  Minus, 
  Crosshair 
} from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

declare global {
  interface Window {
    L?: any;
  }
}

interface LocationMapSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = () => {
  const { locationSettings } = useAdminSettings();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // View mode:
  // 'google_satellite': Live Google Hybrid Satellite tiles (Identical satellite imagery + real-time pan/zoom)
  // 'exact_photo_view': 1:1 identical to user screenshot with interactive zoom & pan
  // 'google_street': Live Google Vector Street Map
  const [mapMode, setMapMode] = useState<'google_satellite' | 'exact_photo_view' | 'google_street'>('google_satellite');
  const [leafletReady, setLeafletReady] = useState(false);

  // Exact coordinates matching Plus Code 9VRG+M9 (7GHX9VRG+M9): 21.39163, 39.87588
  const lat = locationSettings.latitude || 21.39163;
  const lng = locationSettings.longitude || 39.87588;

  // Real shop title & identity matching user's Google Maps screenshot & listing
  const locationNameAr = "احمد التبريد صيانة و التكيف";
  const plusCodeStr = locationSettings.plusCode || "9VRG+M9 Makkah Saudi Arabia";

  // Official direct Google Maps short link provided by user
  const officialMapsUrl = locationSettings.googleMapsUrl || "https://maps.app.goo.gl/jxPiAGha5uXLm6gX7?g_st=aw";

  // Address details matching official Google Maps record
  const addressLineArabic = locationSettings.streetName || "شارع الشيخ عبدالله بن حميد، حي العزيزية، مكة المكرمة 24242";
  const landmarkBuilding = locationSettings.adjacentLandmark1 || "بجوار فندق سنابل الذهبي (Snabel Golden Hotel) وعمارة نجيبة";
  const landmarkAdjacent = locationSettings.adjacentLandmark2 || "بالقرب من موقف باص 6B Bus Stand HC وبقالة العزيزية وبقالة فايزة";
  const landmarkTransit = locationSettings.nearbyLandmark || "الرمز الدقيق: 9VRG+M9 مكة المكرمة | مبنى 270 الحج ومطحنة الدقيق 2";

  // Exact Google Maps Satellite screenshot provided by user
  const exactSatellitePic = locationSettings.customMapImageUrl || "/assets/aistudio/Screenshot_2026-10-20_164009_5f389119.png";

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Exact pic viewer zoom & pan state
  const [picZoom, setPicZoom] = useState(1);
  const [picPan, setPicPan] = useState({ x: 0, y: 0 });
  const [isDraggingPic, setIsDraggingPic] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Detect Leaflet availability
  useEffect(() => {
    if (typeof window !== 'undefined' && window.L) {
      setLeafletReady(true);
      return;
    }
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.L) {
        setLeafletReady(true);
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Initialize and update Leaflet Map with Google Maps Tiles
  useEffect(() => {
    if (!leafletReady || !mapContainerRef.current || !window.L) return;
    if (mapMode === 'exact_photo_view') return;

    const L = window.L;

    // Initialize map if not yet created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 18.5,
        minZoom: 14,
        maxZoom: 21,
        zoomControl: false, // We render custom Google-style zoom buttons
        attributionControl: false
      });

      mapInstanceRef.current = map;

      // Custom Google Maps Red Pin identical to official Google Maps app
      const googlePinIcon = L.divIcon({
        className: 'google-maps-pin-marker',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;" title="احمد التبريد صيانة و التكيف (اضغط للفتح في خرائط Google)">
            <!-- Pulsing radar ring on building -->
            <div style="position: absolute; bottom: 0; width: 34px; height: 34px; border-radius: 50%; background: rgba(239, 68, 68, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; transform: translateY(50%); pointer-events: none;"></div>

            <!-- Authentic Google Maps Red Droplet Pin -->
            <svg width="34" height="46" viewBox="0 0 384 512" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 6px 12px rgba(0,0,0,0.6));">
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z" fill="#EA4335"/>
              <path d="M192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" fill="#B31412"/>
              <circle cx="192" cy="192" r="64" fill="#FFFFFF"/>
            </svg>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([lat, lng], { icon: googlePinIcon }).addTo(map);
      markerRef.current = marker;

      // Click on pin opens Google Maps directly without any blocking popup banner
      marker.on('click', () => {
        window.open(officialMapsUrl, '_blank', 'noopener,noreferrer');
      });
    }

    const map = mapInstanceRef.current;

    // Switch Tile Layer: Google Satellite Hybrid ('lyrs=y') vs Google Vector Roads ('lyrs=m')
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (mapMode === 'google_street') {
      // Google Street Vector Tiles
      tileLayerRef.current = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=ar', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: 'Google Maps'
      }).addTo(map);
    } else {
      // Google Hybrid Satellite Tiles ('lyrs=y' combines high-resolution satellite imagery + road & place overlays)
      tileLayerRef.current = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=ar', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: 'Google Satellite'
      }).addTo(map);
    }

    // Refresh map size
    setTimeout(() => {
      map.invalidateSize();
      map.setView([lat, lng], 18.5);
    }, 150);

  }, [leafletReady, mapMode, lat, lng, addressLineArabic, plusCodeStr, officialMapsUrl]);

  // Recenter Google Map to red pin
  const handleRecenter = () => {
    if (mapMode === 'exact_photo_view') {
      setPicZoom(1);
      setPicPan({ x: 0, y: 0 });
      return;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 18.5, { animate: true });
    }
  };

  const handleZoomIn = () => {
    if (mapMode === 'exact_photo_view') {
      setPicZoom(prev => Math.min(prev + 0.3, 3));
      return;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapMode === 'exact_photo_view') {
      setPicZoom(prev => Math.max(prev - 0.3, 0.8));
      return;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  // Exact Pic Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mapMode !== 'exact_photo_view') return;
    setIsDraggingPic(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: picPan.x,
      panY: picPan.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPic || mapMode !== 'exact_photo_view') return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPicPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy
    });
  };

  const handleMouseUp = () => {
    setIsDraggingPic(false);
  };

  return (
    <section 
      id="location" 
      className="pt-6 pb-12 sm:pt-8 sm:pb-16 bg-gradient-to-b from-[#fcfbfa] via-[#fffdfa] to-[#f8f6f0] border-b border-amber-100/90 relative overflow-hidden" 
      dir="rtl"
    >
      {/* Anchor for existing links & navbar */}
      <span id="makkah-map" className="sr-only" aria-hidden="true" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-red-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 font-['Tajawal',sans-serif]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-black mb-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <MapPin className="w-4 h-4 text-red-600" />
            <span>الموقع الحي على خرائط Google Satellite • نفس موقع الصورة بالتمام 📍</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            {locationNameAr}
          </h2>
          <p className="text-sm sm:text-base text-amber-800 font-bold mt-1">
            {addressLineArabic} • Plus Code: <span className="font-mono text-blue-700 font-black">{plusCodeStr}</span>
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            موقع ورشتنا الحي في مكة المكرمة بالقمر الصناعي (بجوار فندق سنابل وموقف باص 6B وعمارة نجيبة ومبنى 270 الحج). خريطة تفاعلية حية كاملة مثل تطبيق Google Maps تماماً.
          </p>
        </div>

        {/* Map Card Container (Styled like Google Maps interface) */}
        <div className={`bg-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-slate-800 overflow-hidden transition-all ${
          isFullscreen ? 'fixed inset-2 sm:inset-6 z-50 flex flex-col shadow-2xl border-2 border-amber-500' : ''
        }`}>
          
          {/* Authentic Google Maps Floating Search Bar Header */}
          <div className="p-3 sm:p-4 bg-slate-900/95 backdrop-blur-md text-white flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800 z-20">
            
            {/* Search query box with Google Maps style */}
            <div className="flex items-center gap-2.5 min-w-0 bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-700/80 shadow-inner flex-1 max-w-md">
              <div className="w-7 h-7 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <MapPin className="w-4 h-4 text-red-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black text-white truncate">
                    احمد التبريد صيانة و التكيف
                  </span>
                  <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                    نشط 🟢
                  </span>
                </div>
                <p className="text-[10px] text-amber-300 font-medium truncate">
                  مكة المكرمة • Plus Code: {plusCodeStr}
                </p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 mr-auto sm:mr-0 shrink-0 flex-wrap">
              
              {/* 1. Google Satellite Mode (Same as user's screenshot, Live) */}
              <button
                type="button"
                onClick={() => setMapMode('google_satellite')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  mapMode === 'google_satellite'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/30 ring-2 ring-red-400/50'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                title="عرض قمر صناعي حي من Google Maps (نفس صورة الإحداثيات)"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>قمر صناعي Google 🛰️</span>
              </button>

              {/* 2. Exact Snapshot View ('نفس الصورة 100%') */}
              <button
                type="button"
                onClick={() => setMapMode('exact_photo_view')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  mapMode === 'exact_photo_view'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/30 ring-2 ring-amber-300/50'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                title="عرض صورة الخريطة الأصلية بالكامل مع كل المعالم"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>الصورة الأصلية تماماً 📷</span>
              </button>

              {/* 3. Google Streets Mode */}
              <button
                type="button"
                onClick={() => setMapMode('google_street')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  mapMode === 'google_street'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400/50'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                title="عرض خريطة الشوارع من Google"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>شوارع Google</span>
              </button>

              {/* 4. Fullscreen Button */}
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

          {/* Interactive Map Viewport Box */}
          <div 
            className="relative w-full bg-[#1e232a] overflow-hidden min-h-[420px] sm:min-h-[500px] h-[440px] sm:h-[540px] lg:h-[580px] select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            
            {/* VIEW 1: Live Interactive Google Map (Satellite or Streets) */}
            <div 
              ref={mapContainerRef}
              className={`w-full h-full z-0 transition-opacity duration-300 ${mapMode === 'exact_photo_view' ? 'hidden' : 'block'}`}
              style={{ minHeight: '100%', background: '#111827' }}
            />

            {/* VIEW 2: Exact High-Res Google Maps Satellite Capture with interactive zoom & pan */}
            {mapMode === 'exact_photo_view' && (
              <div 
                className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 cursor-grab active:cursor-grabbing"
              >
                <div 
                  className="relative transition-transform duration-100 ease-out flex items-center justify-center"
                  style={{
                    transform: `translate(${picPan.x}px, ${picPan.y}px) scale(${picZoom})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <img 
                    src={exactSatellitePic} 
                    alt="خريطة القمر الصناعي الحقيقية - احمد التبريد صيانة و التكيف"
                    className="max-w-none w-[520px] sm:w-[620px] md:w-[700px] h-auto rounded-xl shadow-2xl pointer-events-none"
                    draggable={false}
                  />

                  {/* Pulsing Highlight on the Red Pin in the Exact Screenshot */}
                  <div 
                    className="absolute w-12 h-12 rounded-full border-2 border-red-500 bg-red-500/30 animate-ping pointer-events-none"
                    style={{ top: '38%', left: '37%' }}
                  />
                </div>

                {/* Instruction badge */}
                <div className="absolute top-3 inset-x-3 flex justify-between items-center pointer-events-none z-10">
                  <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 border border-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg">
                    صورة القمر الصناعي المطابقة تماماً (اسحب للتحريك • استخدم + و - للتكبير)
                  </span>
                  <button
                    type="button"
                    onClick={() => { setPicZoom(1); setPicPan({ x: 0, y: 0 }); }}
                    className="pointer-events-auto bg-slate-800/90 hover:bg-slate-700 text-white text-xs px-2.5 py-1.5 rounded-xl border border-slate-600 shadow-md font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3 text-amber-400" />
                    <span>إعادة ضبط</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom-Left Layers Switcher Box (Identical to Google Maps App) */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={() => setMapMode(mapMode === 'google_satellite' ? 'google_street' : 'google_satellite')}
                className="group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/90 backdrop-blur-md border-2 border-white/90 shadow-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="تبديل طبقات الخريطة (قمر صناعي / شوارع)"
              >
                <img 
                  src={mapMode === 'google_satellite' ? 'https://mt1.google.com/vt/lyrs=m&x=78684&y=56877&z=17' : 'https://mt1.google.com/vt/lyrs=y&x=78684&y=56877&z=17'} 
                  alt="Layers"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
                <div className="relative z-10 flex flex-col items-center text-white drop-shadow-md">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span className="text-[10px] font-black mt-0.5 tracking-tight">
                    {mapMode === 'google_satellite' ? 'شوارع' : 'قمر صناعي'}
                  </span>
                </div>
              </button>
            </div>

            {/* Bottom-Right Google Maps Controls (+ / - / Recenter / Pegman) */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-2 pointer-events-auto">
              
              {/* Recenter / My Location Compass Button */}
              <button
                type="button"
                onClick={handleRecenter}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/95 hover:bg-white text-slate-800 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border border-slate-200"
                title="التركيز على موقع الورشة (احمد التبريد)"
              >
                <Crosshair className="w-5 h-5 text-blue-600" />
              </button>

              {/* Zoom Controls Container */}
              <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden divide-y divide-slate-200">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-slate-800 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
                  title="تكبير الخريطة (Zoom In)"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-slate-800 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
                  title="تصغير الخريطة (Zoom Out)"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>

              {/* Google Maps External Launch Button */}
              <a
                href={officialMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border border-amber-300"
                title="فتح في خرائط Google مباشرة"
              >
                <Navigation className="w-5 h-5 fill-slate-950" />
              </a>

            </div>

            {/* Bottom-Center Google Logo Watermark & Direct Navigation Bar */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-16 sm:inset-x-28 flex flex-col items-center justify-end z-20 pointer-events-none px-1">
              <a
                href={officialMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-[11px] sm:text-sm font-black shadow-2xl hover:scale-105 active:scale-95 transition-all border border-blue-400/40 text-center"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
                <span>الاتجاهات في Google Maps 📍</span>
                <ExternalLink className="w-3 h-3 opacity-80 shrink-0 hidden sm:inline" />
              </a>
              <div className="mt-0.5 text-[9px] sm:text-[11px] font-bold text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Google Maps Satellite • أحمد التبريد
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
