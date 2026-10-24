import React, { useState } from 'react';
import { Calculator, Check, ArrowLeft, Sparkles, Tag, ShieldCheck, Info } from 'lucide-react';
import { useAdminSettings } from '../context/AdminSettingsContext';

interface PricingCalculatorProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenBooking }) => {
  const { calculatorAppliances: appliances, calculatorServices: serviceOptions } = useAdminSettings();
  const [appliance, setAppliance] = useState<'split' | 'standing' | 'window' | 'front_washer' | 'top_washer'>('split');
  const [serviceType, setServiceType] = useState<'clean' | 'repair' | 'gas' | 'full'>('full');
  const [quantity, setQuantity] = useState<number>(2);

  // Calculate pricing
  const currentAppliance = appliances.find(a => a.id === appliance) || appliances[0];
  const currentService = serviceOptions.find(s => s.id === serviceType) || serviceOptions[0];

  const baseUnitCost = Math.round(currentAppliance.basePrice * currentService.multiplier);
  const rawTotal = baseUnitCost * quantity;

  // Bulk Discount
  let discountPercent = 0;
  if (quantity >= 4) {
    discountPercent = 20;
  } else if (quantity >= 2) {
    discountPercent = 10;
  }

  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = rawTotal - discountAmount;

  const handleBookEstimate = () => {
    const serviceSummary = `${currentAppliance.name} - ${currentService.name} (عدد ${quantity} أجهزة) - إجمالي تقديري ${finalTotal} ر.س`;
    onOpenBooking(serviceSummary);
  };

  return (
    <section id="calculator" className="py-20 lg:py-24 relative bg-[#f8f7f5] overflow-hidden border-b border-amber-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>حاسبة الأسعار التقديرية الفورية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            احسب تكلفة صيانة أجهزتك{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              بكل شفافية ووضوح
            </span>
          </h2>

          <p className="text-slate-600 text-base">
            اختر نوع جهازك والخدمة المطلوبة لمعرفة التكلفة التقديرية والخصومات الفورية للكميات.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-2xl text-right">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Options Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Appliance Type */}
              <div className="space-y-2.5">
                <label className="text-sm font-black text-slate-900 block">
                  1. اختر نوع الجهاز المنزلي:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {appliances.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAppliance(item.id as any)}
                      className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center border cursor-pointer ${
                        appliance === item.id
                          ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-orange-500/20'
                          : 'bg-white text-slate-700 hover:bg-amber-50 border-slate-200'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Service Type */}
              <div className="space-y-2.5">
                <label className="text-sm font-black text-slate-900 block">
                  2. نوع الخدمة المطلوبة:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setServiceType(opt.id as any)}
                      className={`p-3.5 rounded-2xl text-right transition-all border cursor-pointer ${
                        serviceType === opt.id
                          ? 'bg-amber-50 text-slate-950 border-amber-400 ring-2 ring-amber-400/40'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="block text-xs sm:text-sm font-black text-slate-900">{opt.name}</span>
                      <span className="block text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Quantity */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-black text-slate-900">
                    3. عدد الأجهزة المطلوب صيانتها:
                  </label>
                  <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                    {quantity >= 4 ? 'خصم 20% مفعل 🎉' : quantity >= 2 ? 'خصم 10% مفعل 🎁' : 'أضف جهازاً واحصل على خصم 10%'}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuantity(num)}
                      className={`py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all border cursor-pointer ${
                        quantity === num
                          ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-orange-500/20'
                          : 'bg-white text-slate-700 hover:bg-amber-50 border-slate-200'
                      }`}
                    >
                      <span className="font-mono text-sm sm:text-base">{num}</span>
                      <span className="text-[10px] sm:text-xs block sm:inline font-bold sm:mr-1">
                        {num === 1 ? 'جهاز' : 'أجهزة'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Total / Quote Summary Column */}
            <div className="lg:col-span-5 bg-[#fffdfa] rounded-2xl p-6 border-2 border-amber-400/80 shadow-lg space-y-6">
              
              <div className="border-b border-amber-200 pb-4">
                <span className="text-xs text-amber-800 font-bold block mb-1">ملخص التسعير الفوري:</span>
                <h4 className="text-lg font-black text-slate-900">{currentAppliance.name}</h4>
                <p className="text-xs text-slate-500">{currentService.name}</p>
              </div>

              {/* Cost Calculation lines */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>سعر صيانة الجهاز الواحد:</span>
                  <span className="font-bold text-slate-900">{baseUnitCost} ر.س</span>
                </div>
                
                <div className="flex items-center justify-between text-slate-600">
                  <span>إجمالي عدد {quantity} أجهزة:</span>
                  <span className="font-bold text-slate-900">{rawTotal} ر.س</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                    <span className="flex items-center gap-1 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>خصم الكميات ({discountPercent}%):</span>
                    </span>
                    <span className="font-black">-{discountAmount} ر.س</span>
                  </div>
                )}

                <div className="pt-4 border-t border-amber-200 flex items-baseline justify-between">
                  <span className="text-base font-black text-slate-900">المجموع التقديري:</span>
                  <div className="text-left">
                    <span className="text-3xl font-black text-[#ea580c]">{finalTotal}</span>
                    <span className="text-xs text-slate-500 font-bold mr-1">ريال سعودي</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-amber-50 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
                  * السعر تقديري شامل الفحص والضمان، السعر النهائي يتم اعتماده بعد المعاينة الميدانية من الفني وبموافقتك التامة قبل العمل.
                </div>
              </div>

              {/* Direct Booking Button with calculated quote */}
              <button
                onClick={handleBookEstimate}
                className="w-full bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#ea580c] hover:opacity-95 text-white font-black py-3.5 rounded-2xl text-sm shadow-xl shadow-orange-500/20 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>احجز بهذا التقدير ({finalTotal} ر.س)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
