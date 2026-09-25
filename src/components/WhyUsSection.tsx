import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Award, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  HeartHandshake, 
  FileText, 
  Wrench,
  BadgeCheck 
} from 'lucide-react';
import teamImg from '../assets/images/saudi_service_team_1790246843619.jpg';

interface WhyUsSectionProps {
  onOpenBooking: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: Users,
      title: 'كوادر هندسية وفنية معتمدة',
      description: 'فريق عمل من الفنيين المدربين وذوي الخبرة الطويلة في التعامل مع أدق الأجهزة والتكنولوجيا الذكية لكافة الماركات العالمية.',
    },
    {
      icon: ShieldCheck,
      title: 'ضمان ذهبي مكتوب وفاتورة رسمية',
      description: 'نلتزم بتقديم فاتورة ضريبية رسمية وضمان موثق يمتد حتى 6 أشهر يشمل الصيانة وقطع الغيار دون أي مماطلة.',
    },
    {
      icon: Clock,
      title: 'احترام تام للوقت والمواعيد',
      description: 'نظام حجز إلكتروني ذكي يحدد وقت وصول الفني بدقة ويوفر خاصية التتبع المباشر للسيارة المجهزة حتى باب منزلك.',
    },
    {
      icon: HeartHandshake,
      title: 'نظافة المنزل وحماية الأثاث 100%',
      description: 'فنيونا مزودون بأغطية أحذية واقية ومظلات عزل هيدروليكية تضمن بقاء الجدران والأرضيات والسجاد نظيفاً تماماً.',
    },
    {
      icon: Award,
      title: 'قطع غيار وكالة 100% أصلية',
      description: 'لا نستخدم القطع المقلدة أو التجارية نهائياً، مع توفير شهادة ضمان أصلية لكل قطعة يتم استبدالها في جهازك.',
    },
    {
      icon: FileText,
      title: 'أسعار شفافة بدون تكاليف خفية',
      description: 'يتم فحص الجهاز وإعلامك بالتكلفة الإجمالية بدقة قبل البدء في أي عمل، ولك حرية الموافقة دون أي التزام.',
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-24 relative bg-[#fcfbfa] overflow-hidden border-b border-amber-100">
      {/* Glow elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <BadgeCheck className="w-4 h-4 text-amber-600" />
            <span>معايير احترافية لا نساوم عليها</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            لماذا يختارنا أكثر من{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              15,000 عميل سنويـاً؟
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            نجمع بين كفاءة المهندسين وسرعة الاستجابة وأمانة التسعير لتقديم تجربة خدمة منزلية ترقى لتطلعاتكم.
          </p>
        </div>

        {/* Team Showcase & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* AI Generated Team Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-white group">
              <img
                src={teamImg}
                alt="فريق المهندسين والفنيين المعتمدين لصيانة التكييف والأجهزة بالمملكة"
                className="w-full h-[400px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating team badge */}
              <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md border border-amber-300 p-4 rounded-2xl text-right shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">فريق ميداني معتمد ومفحوص</h4>
                    <p className="text-xs text-amber-700 font-bold mt-0.5">زي رسمي موحد وهوية معتمدة عند الزيارة</p>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg font-black">
                    سعودة وكفاءات
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars 6-box Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-md text-right space-y-2.5 hover:border-amber-400 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
