import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/servicesData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-24 relative bg-[#f8f7f5] overflow-hidden border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <Star className="w-4 h-4 fill-current text-amber-500" />
            <span>تجارب حقيقية وموثقة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            ماذا يقول عملاؤنا في{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              المملكة العربية السعودية؟
            </span>
          </h2>

          <p className="text-slate-600 text-base">
            فخورون بثقة آلاف العائلات والمنشآت التي تعتمد علينا يومياً لصيانة منازلهم.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-amber-200/80 shadow-md text-right relative group hover:border-amber-400 hover:shadow-xl transition-all"
            >
              <Quote className="w-10 h-10 text-amber-200 absolute top-6 left-6 pointer-events-none group-hover:text-amber-300 transition-colors" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-black text-slate-900">{review.name}</h4>
                    {review.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-amber-800 font-bold mt-0.5">{review.city}</p>
                  <p className="text-[11px] text-slate-500">{review.service}</p>
                </div>
                <span className="text-[11px] text-slate-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {review.date}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Google / Local Rating Trust Banner */}
        <div className="mt-14 max-w-2xl mx-auto bg-white border border-amber-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-center sm:text-right shadow-md">
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 font-black text-lg">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 font-bold mt-0.5">تقييم ممتاز استناداً لأكثر من 4,800 مراجعة</p>
            </div>
          </div>
          <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl font-bold mx-auto sm:mx-0">
            نسبة رضاء العملاء 99.4% ✨
          </span>
        </div>

      </div>
    </section>
  );
};
