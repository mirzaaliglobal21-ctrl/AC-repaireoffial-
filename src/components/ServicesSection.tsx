import React, { useState } from 'react';
import { 
  Wind, 
  Wrench, 
  Droplet, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Zap, 
  CheckCircle2, 
  ThermometerSnowflake, 
  Cpu, 
  Layers, 
  Clock 
} from 'lucide-react';

import acRepairImg from '../assets/images/ac_repair_detail_1790246768936.jpg';
import acCleaningImg from '../assets/images/ac_cleaning_gas_1790246783418.jpg';
import washerRepairImg from '../assets/images/washer_repair_tech_1790246799569.jpg';
import washerCleanImg from '../assets/images/washer_clean_drum_1790246815497.jpg';
import sparePartsImg from '../assets/images/spare_parts_tools_1790246828017.jpg';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const { services: adminServices } = useAdminSettings();
  const [activeTab, setActiveTab] = useState<'all' | 'ac' | 'washer' | 'parts'>('all');

  const staticServices = [
    {
      id: 'ac-repair',
      category: 'ac' as const,
      title: 'صيانة وإصلاح أعطال المكيفات المتقدمة',
      subtitle: 'سبليت، دولابي، كاسيت ومركزي',
      image: acRepairImg,
      badge: 'فحص إلكتروني كمبيوتري',
      description: 'تشخيص دقيق لكافة أعطال التكييف بأحدث أجهزة الفحص الرقمية. إصلاح مشاكل ضعف التبريد، تساقط المياه داخل الغرفة، صدور أصوات غير طبيعية، واحتراق كروت التحكم الإلكترونية.',
      specs: [
        { label: 'وقت الفحص', value: '25 دقيقة' },
        { label: 'الضمان', value: '3 - 6 أشهر معتمد' },
        { label: 'التوافق', value: 'كافة الماركات العالمية' },
      ],
      features: [
        'كشف إلكتروني على كرت الانفرتر والكمبروسر',
        'معالجة انسداد مواسير الصرف والتنقيط',
        'ضبط وصيانة مروحة دفع الهواء والمحرك',
        'فحص الحساسات ودرجات الحرارة الرقمية'
      ],
      defaultPrice: 99,
      popular: true,
      tag: 'الأكثر طلباً بالصيف'
    },
    {
      id: 'ac-clean-gas',
      category: 'ac' as const,
      title: 'غسيل هيدروليكي عميق وشحن فريون أصلي',
      subtitle: 'تنظيف كيميائي آمن مع غطاء حماية الأثاث',
      image: acCleaningImg,
      badge: 'فريون أمريكي R410A / R22',
      description: 'تنظيف وغسيل مضغوط للوحدات الداخلية والخارجية لإزالة الأتربة والعفن واستعادة 100% من كفاءة التبريد مع تعقيم بالبخار وحماية الجدران والأثاث بكيس عزل محكم.',
      specs: [
        { label: 'نوع الفريون', value: 'أمريكي R410A نقي' },
        { label: 'حماية الأثاث', value: '100% عزل هيدروليكي' },
        { label: 'توفير الكهرباء', value: 'يصل حتى 35%' },
      ],
      features: [
        'غسيل المبخر الداخلي بضغط مياه وتفكيك الفلاتر',
        'تنظيف المكثف الخارجي وإزالة العوالق الصحراوية',
        'قياس وموازنة ضغط الفريون بأحدث ساعات الضغط',
        'تعقيم مضاد للبكتيريا والروائح الكريهة'
      ],
      defaultPrice: 129,
      popular: false,
      tag: 'استعادة التبريد الثلجي'
    },
    {
      id: 'washer-repair',
      category: 'washer' as const,
      title: 'صيانة وإصلاح الغسالات الأتوماتيك وفوق أتوماتيك',
      subtitle: 'معالجة رموز الأعطال وتسريب المياه وصوت الاهتزاز',
      image: washerRepairImg,
      badge: 'مهندسون متخصصون للغسالات',
      description: 'إصلاح جميع مشاكل غسالات الملابس الأتوماتيك (LG, Samsung, Daewoo, Whirlpool, Bosch). حل مشاكل عدم تصريف المياه، عدم الدوران، صوت رجيج عالي، وتوقف برامج الغسيل الذكية.',
      specs: [
        { label: 'سرعة الإصلاح', value: 'في نفس الزيارة' },
        { label: 'قطع الغيار', value: 'أصلية بالضمان' },
        { label: 'الفحص', value: 'كمبيوتر شامل' },
      ],
      features: [
        'تغيير مساعدات الحلة ورمان البلي الأصلي',
        'إصلاح طلمبة طرد المياه وصمامات السحب',
        'صيانة لوحات التحكم والدوائر الكهربائية',
        'حل مشاكل قفل الباب والمفاتيح الذكية'
      ],
      defaultPrice: 120,
      popular: true,
      tag: 'إصلاح منزلي فوري'
    },
    {
      id: 'washer-clean',
      category: 'washer' as const,
      title: 'تنظيف وتعقيم حلة ومجاري الغسالات',
      subtitle: 'إزالة التكلسات والروائح الكريهة ورواسب الصابون',
      image: washerCleanImg,
      badge: 'تعقيم طبي آمن',
      description: 'تنظيف شامل لحلة الغسالة الإستانلس ستيل ومجاري التصريف والكاوتشوك المطاطي بمواد إزالة الرواسب الكلسية والشحوم المترسبة. حماية ملابس العائلة من الروائح والحساسية.',
      specs: [
        { label: 'النتيجة', value: 'حلة لامعة كأنها جديدة' },
        { label: 'المواد', value: 'آمنة على أنسجة الملابس' },
        { label: 'مدة الخدمة', value: '45 دقيقة' },
      ],
      features: [
        'تطهير الكاوتش الداخلي وإزالة الفطريات السوداء',
        'تسليك وتنظيف فلاتر الوبر ورواسب المساحيق',
        'تنظيف درج الصابون وموزع المعطر',
        'دورة تعقيم ساخنة لإطالة عمر محرك الغسالة'
      ],
      defaultPrice: 110,
      popular: false,
      tag: 'حماية ملابس العائلة'
    },
    {
      id: 'spare-parts',
      category: 'parts' as const,
      title: 'قطع غيار أصلية 100% معتمدة مع الضمان',
      subtitle: 'كمبروسرات، كروت إلكترونية، مواتير، مواسير نحاس مولر',
      image: sparePartsImg,
      badge: 'شهادة أصالة معتمدة',
      description: 'نمتلك مخازن متكاملة من قطع الغيار الأصلية المباشرة من الوكلاء لكافة العلامات التجارية (LG, Samsung, Midea, Gree, Daikin, Carrier). لا نستخدم قطع تجارية أو مقلدة نهائياً.',
      specs: [
        { label: 'المنشأ', value: 'وكالات أصلية معتمدة' },
        { label: 'الضمان', value: 'سنة كاملة على قطع الغيار' },
        { label: 'التركيب', value: 'بأيدي مهندسين مختصين' },
      ],
      features: [
        'كمبروسرات روتاري وانفرتر أصلية ومضمونة',
        'كروت تحكم وتشغيل إلكترونية مبرمجة ومطابقة',
        'مواسير نحاس مولر أمريكي عالي النقاء',
        'صمامات تمدد، كابستورات، وطلمبات تفريغ معتمدة'
      ],
      defaultPrice: 79,
      popular: false,
      tag: 'ضمان وكالة رسمي'
    }
  ];

  // Merge static metadata with live admin price updates
  const services = staticServices.map((staticS) => {
    const adminMatch = adminServices.find((a) => a.id === staticS.id);
    const price = adminMatch ? adminMatch.price : staticS.defaultPrice;
    const originalPrice = adminMatch ? adminMatch.originalPrice : undefined;
    const badge = adminMatch?.badge || staticS.badge;
    const priceNote = adminMatch?.priceNote;

    return {
      ...staticS,
      badge,
      price,
      originalPrice,
      priceNote,
    };
  });

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <section id="ac-services" className="py-20 lg:py-24 relative bg-[#f8f7f5] overflow-hidden border-b border-amber-100">
      {/* Glow background elements */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>خدماتنا المتخصصة بأعلى معايير الجودة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            حلول شاملة وموثوقة لـ{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              المكيفات والغسالات
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            فريق من الكوادر الفنية المعتمدة وأحدث أدوات الفحص الرقمية لضمان عمل أجهزتك بأعلى كفاءة.
          </p>

          {/* Navigation Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#ea580c] to-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 shadow-sm'
              }`}
            >
              جميع الخدمات المتاحة
            </button>
            <button
              onClick={() => setActiveTab('ac')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'ac'
                  ? 'bg-gradient-to-r from-[#ea580c] to-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 shadow-sm'
              }`}
            >
              صيانة وغسيل المكيفات ❄️
            </button>
            <button
              onClick={() => setActiveTab('washer')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'washer'
                  ? 'bg-gradient-to-r from-[#ea580c] to-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 shadow-sm'
              }`}
            >
              إصلاح وتعقيم الغسالات 🧺
            </button>
            <button
              onClick={() => setActiveTab('parts')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'parts'
                  ? 'bg-gradient-to-r from-[#ea580c] to-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 shadow-sm'
              }`}
            >
              قطع الغيار الأصلية ⚙️
            </button>
          </div>
        </div>

        {/* Services List / Cards */}
        <div className="space-y-12">
          {filteredServices.map((service, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-amber-200/80 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 transition-all hover:border-amber-400"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Photo Column with AI Image */}
                  <div className={`lg:col-span-6 relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-amber-300 shadow-md group">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-[280px] sm:h-[350px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Top Floating Tag */}
                      <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md border border-amber-400/80 text-amber-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{service.badge}</span>
                      </div>

                      {/* Tag pill */}
                      {service.popular && (
                        <div className="absolute bottom-3.5 right-3.5 bg-[#ea580c] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                          {service.tag}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text Details Column */}
                  <div className={`lg:col-span-6 space-y-5 text-right ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    
                    <div className="space-y-1.5">
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-amber-700">
                        {service.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200">
                      {service.specs.map((spec, i) => (
                        <div key={i} className="text-center p-2 rounded-xl bg-amber-50/50 border border-amber-200/50">
                          <span className="block text-[11px] text-slate-500 font-bold">{spec.label}</span>
                          <span className="block text-xs sm:text-sm font-black text-slate-900 mt-0.5">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bullet Features */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-bold">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price & Action Row */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block font-bold">السعر المعتمد:</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-black text-[#ea580c]">
                            {service.price} ر.س
                          </span>
                          {service.originalPrice && (
                            <span className="text-sm text-slate-400 line-through font-bold">
                              {service.originalPrice} ر.س
                            </span>
                          )}
                        </div>
                        {service.priceNote && (
                          <span className="text-[11px] text-amber-700 font-bold block mt-0.5">{service.priceNote}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenBooking(service.title)}
                          className="bg-gradient-to-r from-[#ea580c] to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
                        >
                          احجز هذه الخدمة الآن
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
