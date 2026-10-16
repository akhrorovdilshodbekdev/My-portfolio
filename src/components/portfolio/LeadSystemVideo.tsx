import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { LEAD_DEMO_VIDEO, LEAD_DEMO_POSTER, LEAD_DEMO_POINTS, LEAD_DEMO_POINTS_UZ } from '../../data';

/**
 * Flagship walkthrough for the Automated Lead Response System.
 *
 * The <video> is not mounted until the poster is clicked, so the 19MB file
 * costs a visitor nothing until they ask for it — only the poster is fetched.
 */
export default function LeadSystemVideo() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const points = lang === 'uz' ? LEAD_DEMO_POINTS_UZ : LEAD_DEMO_POINTS;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-card-border bg-[#020412] shadow-lg">
        {/* Poster — the only thing fetched until someone presses play */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={t('automations.demoCta')}
          className="group relative block w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember"
        >
          {/* On phones the 2.21:1 canvas collapses to a thin strip, so crop it to a
              conventional thumbnail ratio; from sm up it shows at its natural one. */}
          <span className="relative block aspect-[16/9] overflow-hidden sm:aspect-[1441/652]">
            <img
              src={LEAD_DEMO_POSTER}
              alt={t('automations.demoTitle')}
              width={1441}
              height={652}
              loading="lazy"
              decoding="async"
              className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
            />
          </span>

          {/* Tints the n8n canvas towards the site palette, lightening on hover */}
          <span className="pointer-events-none absolute inset-0 bg-[#020412]/40 transition-colors duration-300 group-hover:bg-[#020412]/25" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020412] via-[#020412]/60 to-transparent" />

          {/* Runtime badge */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-[#020412]/80 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-white/90 backdrop-blur-sm md:right-5 md:top-5 md:text-xs">
            {t('automations.demoDuration')}
          </span>

          {/* Play affordance */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember text-white shadow-[0_8px_30px_rgba(223,101,19,0.45)] transition-transform duration-300 group-hover:scale-110 md:h-[72px] md:w-[72px]">
              <Play className="h-6 w-6 translate-x-0.5 fill-current md:h-7 md:w-7" />
            </span>
          </span>
        </button>

        {/* Copy */}
        <div className="p-6 md:p-8">
          <span className="inline-flex items-center gap-1.5 rounded border border-ember/25 bg-ember/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ember">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            {t('automations.demoBadge')}
          </span>

          <h4 className="mt-4 text-xl font-bold tracking-tight text-white md:text-2xl">
            {t('automations.demoTitle')}
          </h4>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-[15px]">
            {t('automations.demoLead')}
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-white/85">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10b981]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-md bg-ember px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-ember-hover"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>{t('automations.demoCta')}</span>
          </button>

          <p className="mt-4 flex items-start gap-1.5 font-mono text-[10px] tracking-wide text-white/40 md:text-[11px]">
            <Lock className="mt-px h-3 w-3 shrink-0 text-ember" />
            <span>{t('automations.demoNote')}</span>
          </p>
        </div>
      </div>

      {/* Lightbox — the video source is only attached once opened */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lead-demo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t('automations.demoTitle')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-[#020412]/95 backdrop-blur-sm" />

            <button
              ref={closeRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t('work.close')}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.97, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl"
            >
              <video
                src={LEAD_DEMO_VIDEO}
                poster={LEAD_DEMO_POSTER}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full rounded-xl bg-black object-cover shadow-2xl ring-1 ring-white/10"
              />
              <p className="mt-3 text-center text-xs text-white/50">{t('automations.demoTitle')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
