import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';

const HEROES = [
  { src: '/images/opt-restaurant1.jpg', label: 'Restaurant', project: 'Restaurant' },
  { src: '/images/opt-gym1.jpg', label: 'Gym', project: 'Gym' },
  { src: '/images/opt-travel1.jpg', label: 'Travel', project: 'Travel' },
];

export default function LandingPages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % HEROES.length);
      }, 3500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const goTo = (idx: number) => {
    setCurrentIndex(idx);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section id="websites" className="py-20 md:py-28 bg-white border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('gallery.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-primary-midnight mb-3">
            {t('gallery.title')}
          </h3>
          <p className="text-base text-primary-midnight/70 font-sans leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Slideshow - all images stacked, just crossfade */}
        <div
          className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-slate-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            {HEROES.map((hero, idx) => (
              <motion.img
                key={idx}
                src={hero.src}
                alt={hero.label}
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: idx === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            ))}

            {/* Label overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
              <span className="inline-block text-[11px] font-mono font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded">
                {HEROES[currentIndex].project}
              </span>
            </div>

            {/* Dots */}
            <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 flex items-center gap-2">
              {HEROES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-ember w-6 h-2'
                      : 'bg-white/50 hover:bg-white/70 w-2 h-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

