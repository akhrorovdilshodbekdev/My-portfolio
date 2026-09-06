import { motion } from 'motion/react';
import { ArrowRight, Zap, Award, Globe, Smartphone, Bot, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

export default function Hero() {
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pillars = [
    { icon: Globe, title: t('hero.p1t'), desc: t('hero.p1d'), target: '#websites' },
    { icon: Smartphone, title: t('hero.p2t'), desc: t('hero.p2d'), target: '#work' },
    { icon: Bot, title: t('hero.p3t'), desc: t('hero.p3d'), target: '#automations' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
        mass: 0.8
      }
    }
  };

  return (
    <section id="home" className="relative min-h-dvh md:min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-12 md:py-20 lg:py-28 bg-canvas-bg">
      {/* Decorative floating gradient blurs in background */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-ember/5 rounded-full blur-[120px] pointer-events-none hidden md:block"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-primary-midnight/5 rounded-full blur-[80px] pointer-events-none hidden md:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Content with Stagger Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Title / Main pitch */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-midnight leading-[1.1] mb-6 font-sans text-left"
              id="hero-heading"
            >
              {t('hero.pre')}{' '}
              <span className="text-ember relative inline-block">
                {t('hero.accent')}
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 h-[3px] bg-ember/30 rounded"
                />
              </span>{' '}
              {t('hero.post')}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-midnight/70 font-sans leading-relaxed mb-8 max-w-xl text-left"
              id="hero-subheading"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => handleScrollTo('#work')}
                className="group flex items-center gap-2 rounded-md bg-primary-midnight hover:bg-slate-900 text-white px-6 py-3.5 text-base font-semibold transition-all duration-200 shadow-sm cursor-pointer"
                id="hero-see-work"
              >
                {t('hero.seeMyWork')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleScrollTo('#contact')}
                className="rounded-md border border-primary-midnight/20 hover:border-primary-midnight/40 text-primary-midnight px-6 py-3.5 text-base font-semibold transition-all duration-200 cursor-pointer"
                id="hero-lets-talk"
              >
                {t('hero.letsTalk')}
              </button>
            </motion.div>

            {/* Key stats labels */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 md:gap-8 border-t border-card-border/40 pt-8"
            >
              <div className="flex items-center gap-2.5 text-sm font-medium text-primary-midnight/80">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ember/10 text-ember">
                  <Zap className="h-4 w-4 fill-current" />
                </span>
                <span>{t('hero.turnaround')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-primary-midnight/80">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#10b981]/10 text-[#10b981]">
                  <Award className="h-4 w-4" />
                </span>
                <span>{t('hero.businesses')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Three-pillar service card */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.4 }}
              className="w-full max-w-md bg-[#0a0c16] rounded-xl overflow-hidden shadow-2xl border border-white/5 relative"
              id="hero-services"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#020409]/60 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-ember/60" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 tracking-wider">
                  <span>akhrorov.studio</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Body */}
              <div className="p-5 md:p-6">
                <p className="text-[11px] font-mono tracking-widest text-ember font-bold mb-4">
                  {t('hero.pillarsTitle')}
                </p>

                <div className="space-y-2.5">
                  {pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <button
                        key={pillar.title}
                        onClick={() => handleScrollTo(pillar.target)}
                        className="group w-full flex items-start gap-3.5 text-left p-3.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-ember/40 hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
                      >
                        <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-ember/15 text-ember group-hover:bg-ember group-hover:text-white transition-colors duration-200">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-white font-sans">{pillar.title}</span>
                          <span className="block text-xs text-white/45 font-sans leading-relaxed mt-0.5">{pillar.desc}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-white/25 group-hover:text-ember group-hover:translate-x-0.5 transition-all duration-200 mt-1 shrink-0" />
                      </button>
                    );
                  })}
                </div>

                <p className="mt-5 pt-4 border-t border-white/5 text-[11px] md:text-xs text-white/40 font-sans leading-relaxed">
                  {t('hero.founderNote')}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
