import { MessageSquare, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { WORK_STEPS, WORK_STEPS_UZ } from '../data';
import { useLanguage } from '../i18n/LanguageProvider';

export default function HowIWork() {
  const { t, lang } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="h-6 w-6 text-primary-midnight" />;
      case 'Layers':
        return <Layers className="h-6 w-6 text-primary-midnight" />;
      case 'TrendingUp':
        return <TrendingUp className="h-6 w-6 text-primary-midnight" />;
      default:
        return <MessageSquare className="h-6 w-6 text-primary-midnight" />;
    }
  };

  const workSteps = lang === 'uz' ? WORK_STEPS_UZ : WORK_STEPS;
  return (
    <section id="process" className="py-20 md:py-28 bg-canvas-bg border-t border-card-border/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('process.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-primary-midnight mb-4">
            {t('process.title')}
          </h3>
          <p className="text-base md:text-lg text-primary-midnight/70 font-sans leading-relaxed">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {workSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(2, 4, 18, 0.05)' }}
              className="relative overflow-hidden rounded-xl bg-white border border-card-border p-8 lg:p-10 flex flex-col justify-between group min-h-[300px]"
              id={`process-card-${step.number}`}
            >
              <div>
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 border border-slate-200/50 group-hover:bg-ember/10 group-hover:text-ember transition-colors duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {getIcon(step.iconName)}
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold font-sans tracking-tight text-primary-midnight mb-3">
                  {step.title}
                </h4>
                <p className="text-sm lg:text-base text-primary-midnight/75 font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Big background watermarked step number */}
              <div className="absolute right-4 bottom-2 text-[100px] lg:text-[120px] font-bold font-sans tracking-tight text-[#020412]/[0.03] select-none pointer-events-none group-hover:text-ember/[0.04] transition-colors duration-300 leading-none">
                {step.number}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

