import React from 'react';
import { Check, ShieldCheck, Sparkles, Flame } from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface PricingPackagesProps {
  onOpenBooking: (packageName: string) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onOpenBooking }) => {
  const { pricingTiers } = useAdminSettings();

  return (
    <section id="pricing" className="py-20 lg:py-24 relative bg-[#fcfbfa] overflow-hidden border-b border-amber-100">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-200/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>باقات صيانة موحدة ومعتمدة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            باقات تناسب احتياج كل{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              منزل وفيلا سعودية
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            وفر مع باقات الصيانة الشاملة، شاملة الفحص الدقيق والتعقيم والتعبئة بضمان رسمي وفاتورة ضريبية.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const savings = tier.originalPrice > tier.price ? tier.originalPrice - tier.price : 0;
            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative text-right ${
                  tier.popular
                    ? 'bg-white border-2 border-amber-400 shadow-2xl shadow-amber-500/15 scale-105 z-10 ring-4 ring-amber-100'
                    : 'bg-white border border-slate-200 hover:border-amber-400 shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 inset-x-0 mx-auto w-max bg-gradient-to-r from-[#ea580c] to-amber-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>الأكثر اختياراً في المملكة</span>
                  </div>
                )}

                <div>
                  <div className="border-b border-slate-200 pb-5 mb-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-slate-900">{tier.name}</h3>
                      {savings > 0 && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300">
                          وفّر {savings} ر.س
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-bold">{tier.subtitle}</p>

                    <div className="pt-3 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-[#ea580c]">{tier.price}</span>
                      <span className="text-xs text-slate-500 font-bold">ريال سعودي</span>
                      {tier.originalPrice > tier.price && (
                        <span className="text-sm text-slate-400 line-through font-bold mr-1">
                          {tier.originalPrice} ر.س
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 pb-6 text-xs sm:text-sm text-slate-700 font-bold">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onOpenBooking(`باقة: ${tier.name}`)}
                  className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#ea580c] to-amber-500 hover:opacity-95 text-white shadow-amber-500/20 hover:scale-102'
                      : 'bg-slate-100 hover:bg-amber-100 text-slate-900 border border-slate-300'
                  }`}
                >
                  {tier.ctaText || 'اختر هذه الباقة'}
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
