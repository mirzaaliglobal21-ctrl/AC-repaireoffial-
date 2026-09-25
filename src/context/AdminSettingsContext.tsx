import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRICING_TIERS as DEFAULT_TIERS, CONTACT_INFO as DEFAULT_CONTACT } from '../data/servicesData';

export interface AdminService {
  id: string;
  title: string;
  subtitle: string;
  category: 'ac' | 'washer' | 'parts';
  price: number; // In SAR
  originalPrice?: number;
  popular?: boolean;
  tag?: string;
  badge?: string;
  priceNote?: string;
}

export interface AdminPackageTier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  popular: boolean;
  features: string[];
  ctaText: string;
}

export interface AdminCalculatorAppliance {
  id: 'split' | 'standing' | 'window' | 'front_washer' | 'top_washer';
  name: string;
  basePrice: number;
}

export interface AdminCalculatorService {
  id: 'repair' | 'clean' | 'gas' | 'full';
  name: string;
  multiplier: number;
  desc: string;
}

export interface AdminHeroSettings {
  startingPrice: number;
  discountPercent: number;
  announcementText: string;
}

export interface AdminLocationSettings {
  latitude: number;
  longitude: number;
  cityName: string;
  districtName: string;
  streetName: string;
  adjacentLandmark1: string;
  adjacentLandmark2: string;
  nearbyLandmark: string;
  customMapImageUrl?: string;
  googleMapsUrl?: string;
}

export const DEFAULT_LOCATION_SETTINGS: AdminLocationSettings = {
  latitude: 21.39170,
  longitude: 39.87593,
  cityName: 'المملكة العربية السعودية، مكة المكرمة',
  districtName: 'حي العزيزية والجامعة (Al Aziziyah & Al Jamiah)',
  streetName: '3801 شارع الشيخ عبدالله بن حميد - المبنى الملاصق لعرين العزيزية (مقر الورشة والمحل) - مكة 24242 7003',
  adjacentLandmark1: 'موقع الورشة والمحل: المبنى المحدد بعلامة الصح (✔) ملاصق ومجاور لعرين العزيزية للشقق المفروشة مباشرة',
  adjacentLandmark2: 'على شارع الشيخ عبدالله بن حميد مباشرة (Abdullah Ibn Hamid)',
  nearbyLandmark: 'المواصلات: أمام محطة وموقف حافلات 6B Bus Stand (HCOI) وقريب من طريق المسجد الحرام',
  customMapImageUrl: '',
  googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.39170,39.87593',
};

export function extractCoordinates(input: string): { lat: number; lng: number } | null {
  if (!input) return null;
  // Match direct lat, lng e.g. "21.391009, 39.877195" or "21.391009 39.877195"
  const plainMatch = input.match(/([-+]?\d{1,2}\.\d+)[,\s]+([-+]?\d{1,3}\.\d+)/);
  if (plainMatch) {
    const lat = parseFloat(plainMatch[1]);
    const lng = parseFloat(plainMatch[2]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { lat, lng };
    }
  }
  // Match @lat,lng in google maps URLs
  const atMatch = input.match(/@([-+]?\d{1,2}\.\d+),([-+]?\d{1,3}\.\d+)/);
  if (atMatch) {
    return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  }
  // Match ?q=lat,lng or &query=lat,lng
  const qMatch = input.match(/[?&](?:q|query)=([-+]?\d{1,2}\.\d+),([-+]?\d{1,3}\.\d+)/);
  if (qMatch) {
    return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
  }
  return null;
}

export interface CustomerBooking {
  id: string;
  name: string;
  phone: string;
  city: string;
  district?: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

interface AdminSettingsContextType {
  // Auth state
  isAdminLoggedIn: boolean;
  isAdminDashboardOpen: boolean;
  isAdminLoginOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;
  setIsAdminLoginOpen: (open: boolean) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Pricing & Location State
  services: AdminService[];
  pricingTiers: AdminPackageTier[];
  calculatorAppliances: AdminCalculatorAppliance[];
  calculatorServices: AdminCalculatorService[];
  heroSettings: AdminHeroSettings;
  contactSettings: typeof DEFAULT_CONTACT;
  locationSettings: AdminLocationSettings;

  // Updaters
  updateServicePrice: (id: string, newPrice: number, newOriginalPrice?: number) => void;
  updateTierPrice: (id: string, price: number, originalPrice: number) => void;
  updateCalculatorAppliancePrice: (id: AdminCalculatorAppliance['id'], basePrice: number) => void;
  updateCalculatorServiceMultiplier: (id: AdminCalculatorService['id'], multiplier: number) => void;
  updateHeroSettings: (settings: Partial<AdminHeroSettings>) => void;
  updateContactSettings: (settings: Partial<typeof DEFAULT_CONTACT>) => void;
  updateLocationSettings: (settings: Partial<AdminLocationSettings>) => void;

  // Actions
  saveAllSettings: (customData?: {
    services?: AdminService[];
    pricingTiers?: AdminPackageTier[];
    calculatorAppliances?: AdminCalculatorAppliance[];
    calculatorServices?: AdminCalculatorService[];
    heroSettings?: AdminHeroSettings;
    contactSettings?: typeof DEFAULT_CONTACT;
    locationSettings?: AdminLocationSettings;
  }) => void;
  resetToDefaults: () => void;

  // Bookings
  bookings: CustomerBooking[];
  addBooking: (booking: Omit<CustomerBooking, 'id' | 'createdAt' | 'status'>) => CustomerBooking;
  updateBookingStatus: (id: string, status: CustomerBooking['status']) => void;
  deleteBooking: (id: string) => void;
}

const DEFAULT_SERVICES: AdminService[] = [
  {
    id: 'ac-repair',
    category: 'ac',
    title: 'صيانة وإصلاح أعطال المكيفات المتقدمة',
    subtitle: 'سبليت، دولابي، كاسيت ومركزي',
    price: 99,
    originalPrice: 150,
    popular: true,
    tag: 'الأكثر طلباً بالصيف',
    badge: 'فحص إلكتروني كمبيوتري',
    priceNote: 'شامل الفحص والتشخيص الفوري',
  },
  {
    id: 'ac-clean-gas',
    category: 'ac',
    title: 'غسيل هيدروليكي عميق وشحن فريون أصلي',
    subtitle: 'تنظيف كيميائي آمن مع غطاء حماية الأثاث',
    price: 129,
    originalPrice: 190,
    popular: false,
    tag: 'استعادة التبريد الثلجي',
    badge: 'فريون أمريكي R410A / R22',
    priceNote: 'شامل العزل والتعقيم وضمان الرائحة',
  },
  {
    id: 'washer-repair',
    category: 'washer',
    title: 'صيانة وإصلاح الغسالات الأتوماتيك وفوق أتوماتيك',
    subtitle: 'معالجة رموز الأعطال وتسريب المياه وصوت الاهتزاز',
    price: 120,
    originalPrice: 180,
    popular: true,
    tag: 'إصلاح منزلي فوري',
    badge: 'مهندسون متخصصون للغسالات',
    priceNote: 'كشف دقيق مع استبدال القطع الفوري',
  },
  {
    id: 'washer-clean',
    category: 'washer',
    title: 'تنظيف وتعقيم حلة ومجاري الغسالات',
    subtitle: 'إزالة التكلسات والروائح الكريهة ورواسب الصابون',
    price: 110,
    originalPrice: 160,
    popular: false,
    tag: 'حماية ملابس العائلة',
    badge: 'تعقيم طبي آمن',
    priceNote: 'شامل مواد إزالة الصدأ والترسبات',
  },
  {
    id: 'spare-parts',
    category: 'parts',
    title: 'قطع غيار أصلية 100% معتمدة مع الضمان',
    subtitle: 'كمبروسرات، كروت إلكترونية، مواتير، مواسير نحاس مولر',
    price: 79,
    originalPrice: 120,
    popular: false,
    tag: 'ضمان وكالة رسمي',
    badge: 'شهادة أصالة معتمدة',
    priceNote: 'يبدأ من 79 ر.س حسب نوع القطعة',
  },
];

const DEFAULT_CALCULATOR_APPLIANCES: AdminCalculatorAppliance[] = [
  { id: 'split', name: 'مكيف سبليت جداري', basePrice: 120 },
  { id: 'standing', name: 'مكيف دولابي / كاسيت', basePrice: 180 },
  { id: 'window', name: 'مكيف شباك', basePrice: 90 },
  { id: 'front_washer', name: 'غسالة فتحة أمامية', basePrice: 130 },
  { id: 'top_washer', name: 'غسالة فتحة علوية', basePrice: 110 },
];

const DEFAULT_CALCULATOR_SERVICES: AdminCalculatorService[] = [
  { id: 'repair', name: 'فحص وتشخيص العطل', multiplier: 1.0, desc: 'فحص إلكتروني كمبيوتري للأعطال وكشف التسريب' },
  { id: 'clean', name: 'غسيل هيدروليكي عميق', multiplier: 1.25, desc: 'غسيل بضغط المياه وحماية الأثاث وتعقيم شامل' },
  { id: 'gas', name: 'تعبئة وشحن فريون أصلي', multiplier: 1.5, desc: 'شحن فريون أمريكي R410A / R22 بضغط المصنع' },
  { id: 'full', name: 'الباقة الشاملة (غسيل + فحص + فريون)', multiplier: 1.9, desc: 'صيانة كاملة وغسيل عميق وزيادة الفريون مع الضمان الذهبي' },
];

const DEFAULT_HERO_SETTINGS: AdminHeroSettings = {
  startingPrice: 79,
  discountPercent: 35,
  announcementText: 'عروض الصيف الكبرى: خصم 35% على كافة خدمات المكيفات والغسالات بمكة المكرمة والمملكة 🇸🇦',
};

const INITIAL_DEMO_BOOKINGS: CustomerBooking[] = [
  {
    id: 'SA-849201',
    name: 'عبدالله بن تركي الحربي',
    phone: '0551234567',
    city: 'مكة المكرمة (العزيزية)',
    district: 'حي العزيزية - شارع حميد',
    service: 'غسيل هيدروليكي عميق وشحن فريون أصلي',
    date: '2026-09-24',
    timeSlot: 'خلال 30 دقيقة (طوارئ)',
    notes: 'المكيف في غرفة المعيشة يقطر ماء وتبريده ضعيف',
    status: 'new',
    createdAt: '2026-09-24 12:15',
  },
  {
    id: 'SA-738192',
    name: 'سارة خالد الدوسري',
    phone: '0509876543',
    city: 'الرياض',
    district: 'حي النرجس',
    service: 'صيانة وإصلاح الغسالات الأتوماتيك',
    date: '2026-09-24',
    timeSlot: 'اليوم مساءً (4:00 - 8:00)',
    notes: 'غسالة ال جي كود خطأ OE وصوت رجيج عند التنشيف',
    status: 'in_progress',
    createdAt: '2026-09-24 10:40',
  },
  {
    id: 'SA-629104',
    name: 'م. فهد القرشي',
    phone: '0563456789',
    city: 'مكة المكرمة (العزيزية)',
    district: 'حي العوالي',
    service: 'الباقة الذهبية الملكية (الأكثر طلباً)',
    date: '2026-09-23',
    timeSlot: 'صباحاً',
    notes: 'تمت الصيانة والتعبئة واستلام شهادة الضمان 3 أشهر',
    status: 'completed',
    createdAt: '2026-09-23 09:20',
  },
];

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

export const AdminSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('al_saqr_admin_authenticated') === 'true';
  });
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Pricing & Configuration states
  const [services, setServices] = useState<AdminService[]>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_services');
      return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  });

  const [pricingTiers, setPricingTiers] = useState<AdminPackageTier[]>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_pricing_tiers');
      return saved ? JSON.parse(saved) : DEFAULT_TIERS;
    } catch {
      return DEFAULT_TIERS;
    }
  });

  const [calculatorAppliances, setCalculatorAppliances] = useState<AdminCalculatorAppliance[]>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_calc_appliances');
      return saved ? JSON.parse(saved) : DEFAULT_CALCULATOR_APPLIANCES;
    } catch {
      return DEFAULT_CALCULATOR_APPLIANCES;
    }
  });

  const [calculatorServices, setCalculatorServices] = useState<AdminCalculatorService[]>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_calc_services');
      return saved ? JSON.parse(saved) : DEFAULT_CALCULATOR_SERVICES;
    } catch {
      return DEFAULT_CALCULATOR_SERVICES;
    }
  });

  const [heroSettings, setHeroSettings] = useState<AdminHeroSettings>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_hero_settings');
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SETTINGS;
    } catch {
      return DEFAULT_HERO_SETTINGS;
    }
  });

  const [contactSettings, setContactSettings] = useState<typeof DEFAULT_CONTACT>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_contact_settings');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT;
    } catch {
      return DEFAULT_CONTACT;
    }
  });

  const [locationSettings, setLocationSettings] = useState<AdminLocationSettings>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_location_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If old hotel coordinates or previous test coordinates were stored, auto-upgrade to the user's green-ticked building
        if (!parsed.latitude || Math.abs(parsed.latitude - 21.3917258) < 0.0001 || Math.abs(parsed.latitude - 21.39148) < 0.0001) {
          return DEFAULT_LOCATION_SETTINGS;
        }
        return { ...DEFAULT_LOCATION_SETTINGS, ...parsed };
      }
      return DEFAULT_LOCATION_SETTINGS;
    } catch {
      return DEFAULT_LOCATION_SETTINGS;
    }
  });

  const [bookings, setBookings] = useState<CustomerBooking[]>(() => {
    try {
      const saved = localStorage.getItem('al_saqr_bookings');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  // Password verification - strictly '123444' as requested by the user
  const loginAdmin = (password: string): boolean => {
    if (password === '123444') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('al_saqr_admin_authenticated', 'true');
      setIsAdminLoginOpen(false);
      setIsAdminDashboardOpen(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('al_saqr_admin_authenticated');
    setIsAdminDashboardOpen(false);
  };

  const updateServicePrice = (id: string, newPrice: number, newOriginalPrice?: number) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              price: newPrice,
              originalPrice: newOriginalPrice !== undefined ? newOriginalPrice : s.originalPrice,
            }
          : s
      )
    );
  };

  const updateTierPrice = (id: string, price: number, originalPrice: number) => {
    setPricingTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, price, originalPrice } : t))
    );
  };

  const updateCalculatorAppliancePrice = (id: AdminCalculatorAppliance['id'], basePrice: number) => {
    setCalculatorAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, basePrice } : a))
    );
  };

  const updateCalculatorServiceMultiplier = (id: AdminCalculatorService['id'], multiplier: number) => {
    setCalculatorServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, multiplier } : s))
    );
  };

  const updateHeroSettings = (settings: Partial<AdminHeroSettings>) => {
    setHeroSettings((prev) => ({ ...prev, ...settings }));
  };

  const updateContactSettings = (settings: Partial<typeof DEFAULT_CONTACT>) => {
    setContactSettings((prev) => ({ ...prev, ...settings }));
  };

  const updateLocationSettings = (settings: Partial<AdminLocationSettings>) => {
    setLocationSettings((prev) => {
      const updated = { ...prev, ...settings };
      try {
        localStorage.setItem('al_saqr_location_settings', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save location settings', e);
      }
      return updated;
    });
  };

  const saveAllSettings = (customData?: {
    services?: AdminService[];
    pricingTiers?: AdminPackageTier[];
    calculatorAppliances?: AdminCalculatorAppliance[];
    calculatorServices?: AdminCalculatorService[];
    heroSettings?: AdminHeroSettings;
    contactSettings?: typeof DEFAULT_CONTACT;
    locationSettings?: AdminLocationSettings;
  }) => {
    const finalServices = customData?.services || services;
    const finalTiers = customData?.pricingTiers || pricingTiers;
    const finalAppliances = customData?.calculatorAppliances || calculatorAppliances;
    const finalCalcServices = customData?.calculatorServices || calculatorServices;
    const finalHero = customData?.heroSettings || heroSettings;
    const finalContact = customData?.contactSettings || contactSettings;
    const finalLocation = customData?.locationSettings || locationSettings;

    localStorage.setItem('al_saqr_services', JSON.stringify(finalServices));
    localStorage.setItem('al_saqr_pricing_tiers', JSON.stringify(finalTiers));
    localStorage.setItem('al_saqr_calc_appliances', JSON.stringify(finalAppliances));
    localStorage.setItem('al_saqr_calc_services', JSON.stringify(finalCalcServices));
    localStorage.setItem('al_saqr_hero_settings', JSON.stringify(finalHero));
    localStorage.setItem('al_saqr_contact_settings', JSON.stringify(finalContact));
    localStorage.setItem('al_saqr_location_settings', JSON.stringify(finalLocation));

    if (customData?.services) setServices(customData.services);
    if (customData?.pricingTiers) setPricingTiers(customData.pricingTiers);
    if (customData?.calculatorAppliances) setCalculatorAppliances(customData.calculatorAppliances);
    if (customData?.calculatorServices) setCalculatorServices(customData.calculatorServices);
    if (customData?.heroSettings) setHeroSettings(customData.heroSettings);
    if (customData?.contactSettings) setContactSettings(customData.contactSettings);
    if (customData?.locationSettings) setLocationSettings(customData.locationSettings);
  };

  const resetToDefaults = () => {
    setServices(DEFAULT_SERVICES);
    setPricingTiers(DEFAULT_TIERS);
    setCalculatorAppliances(DEFAULT_CALCULATOR_APPLIANCES);
    setCalculatorServices(DEFAULT_CALCULATOR_SERVICES);
    setHeroSettings(DEFAULT_HERO_SETTINGS);
    setContactSettings(DEFAULT_CONTACT);
    setLocationSettings(DEFAULT_LOCATION_SETTINGS);

    localStorage.removeItem('al_saqr_services');
    localStorage.removeItem('al_saqr_pricing_tiers');
    localStorage.removeItem('al_saqr_calc_appliances');
    localStorage.removeItem('al_saqr_calc_services');
    localStorage.removeItem('al_saqr_hero_settings');
    localStorage.removeItem('al_saqr_contact_settings');
    localStorage.removeItem('al_saqr_location_settings');
  };

  const addBooking = (newBookingData: Omit<CustomerBooking, 'id' | 'createdAt' | 'status'>): CustomerBooking => {
    const newBooking: CustomerBooking = {
      ...newBookingData,
      id: `SA-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'new',
      createdAt: new Date().toLocaleString('ar-SA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('al_saqr_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save booking to localStorage', e);
    }
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: CustomerBooking['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    try {
      localStorage.setItem('al_saqr_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update booking status', e);
    }
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    try {
      localStorage.setItem('al_saqr_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete booking', e);
    }
  };

  return (
    <AdminSettingsContext.Provider
      value={{
        isAdminLoggedIn,
        isAdminDashboardOpen,
        isAdminLoginOpen,
        setIsAdminDashboardOpen,
        setIsAdminLoginOpen,
        loginAdmin,
        logoutAdmin,

        services,
        pricingTiers,
        calculatorAppliances,
        calculatorServices,
        heroSettings,
        contactSettings,
        locationSettings,

        updateServicePrice,
        updateTierPrice,
        updateCalculatorAppliancePrice,
        updateCalculatorServiceMultiplier,
        updateHeroSettings,
        updateContactSettings,
        updateLocationSettings,

        saveAllSettings,
        resetToDefaults,

        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
      }}
    >
      {children}
    </AdminSettingsContext.Provider>
  );
};

export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (!context) {
    throw new Error('useAdminSettings must be used within an AdminSettingsProvider');
  }
  return context;
};
