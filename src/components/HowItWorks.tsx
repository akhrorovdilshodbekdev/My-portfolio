import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS, FAQ_ITEMS_UZ } from '../data';
import { useLanguage } from '../i18n/LanguageProvider';

export default function HowItWorks() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t, lang } = useLanguage();

  const faqItems = lang === 'uz' ? FAQ_ITEMS_UZ : FAQ_ITEMS;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#faf8ff] border-t border-card-border/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('faq.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-primary-midnight mb-4">
            {t('faq.title')}
          </h3>
          <p className="text-base text-primary-midnight/70 font-sans max-w-md mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-card-border bg-white rounded-lg overflow-hidden transition-all duration-200"
                id={`faq-item-${idx}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors duration-200 cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${idx}`}
                >
                  <span className="text-sm md:text-base font-bold text-primary-midnight font-sans">
                    {item.question}
                  </span>
                  <span className="ml-4 shrink-0 p-1 rounded-full bg-slate-100 text-primary-midnight/50">
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-ember" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-primary-midnight/75 font-sans leading-relaxed border-t border-card-border/30 bg-slate-50/20">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
