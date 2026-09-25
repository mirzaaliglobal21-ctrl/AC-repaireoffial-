import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/servicesData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 relative bg-[#fcfbfa] overflow-hidden border-b border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>إجابات واضحة لراحتكم</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            الأسئلة الشائعة حول{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-amber-500 to-[#d97706]">
              خدمات الصيانة والضمان
            </span>
          </h2>

          <p className="text-slate-600 text-base">
            كل ما تود معرفته عن سرعة الوصول، أنواع الفريون، حماية الأثاث، وضمان قطع الغيار.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden transition-all text-right"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-black text-slate-900 hover:text-amber-700 transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 text-amber-700 border border-amber-200">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
