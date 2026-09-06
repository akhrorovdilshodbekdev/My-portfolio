import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ExternalLink, Lock, ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { REAL_PROJECTS, REAL_PROJECTS_UZ } from '../data';
import { useLanguage } from '../i18n/LanguageProvider';
import type { MouseEvent } from 'react';
import type { RealProject } from '../types';

export default function CaseStudies() {
  const { t, lang } = useLanguage();
  const projects = lang === 'uz' ? REAL_PROJECTS_UZ : REAL_PROJECTS;

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="work" className="py-20 md:py-28 bg-[#faf8ff] border-t border-card-border/30">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('work.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-primary-midnight mb-4">
            {t('work.title')}
          </h3>
          <p className="text-base md:text-lg text-primary-midnight/70 font-sans leading-relaxed">
            {t('work.subtitle')}
          </p>
        </div>

        {/* Real project proof cards */}
        <div className="space-y-8">
          {projects.map((project, idx) => {
            const imageOnLeft = idx % 2 === 0;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-card-border bg-white shadow-sm overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Visual */}
                  {project.screens && project.screens.length > 0 ? (
                    <div className={`h-full ${imageOnLeft ? 'md:order-1' : 'md:order-2'}`}>
                      <ScreenshotGallery
                        screens={project.screens}
                        note={project.imageTag}
                      />
                    </div>
                  ) : project.image ? (
                    <div className={`flex items-center justify-center bg-slate-50 p-6 md:p-10 ${imageOnLeft ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-card-border bg-white shadow-sm">
                        <img
                          src={project.image}
                          alt={project.imageAlt ?? project.title}
                          loading="lazy"
                          className="block h-auto w-full object-contain"
                        />
                        {project.imageTag && (
                          <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#020412]/85 text-white/90 text-[10px] font-mono tracking-wider backdrop-blur-sm">
                            <Lock className="h-3 w-3 text-ember" />
                            {project.imageTag}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* Content */}
                  <div className={`p-6 md:p-10 flex flex-col justify-center ${imageOnLeft ? 'md:order-2' : 'md:order-1'}`}>
                    <span className="inline-flex items-center self-start gap-1.5 text-[10px] font-bold font-mono tracking-widest uppercase text-ember bg-ember/5 border border-ember/15 px-2.5 py-1 rounded">
                      {project.eyebrow}
                    </span>

                    <h4 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-primary-midnight mt-4">
                      {project.title}
                    </h4>

                    <p className="text-sm md:text-[15px] text-primary-midnight/70 font-sans leading-relaxed mt-3">
                      {project.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-primary-midnight/85 font-sans">
                          <CheckCircle2 className="h-4 w-4 text-[#10b981] mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-100 border border-slate-200/60 text-primary-midnight/70 px-2.5 py-0.5 text-[11px] font-mono font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-7">
                      {project.links.map((link, lIdx) => {
                        const isExternal = link.external;
                        const btnClasses = isExternal
                          ? lIdx === 0
                            ? 'bg-primary-midnight hover:bg-slate-900 text-white'
                            : 'border border-primary-midnight/20 hover:border-primary-midnight/40 text-primary-midnight'
                          : 'bg-ember hover:bg-ember-hover text-white';
                        return (
                          <a
                            key={lIdx}
                            href={link.href}
                            onClick={(e) => handleAnchorClick(e, link.href)}
                            {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                            className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer ${btnClasses}`}
                          >
                            <span>{link.label}</span>
                            {isExternal ? (
                              <ExternalLink className="h-4 w-4" />
                            ) : (
                              <ArrowRight className="h-4 w-4" />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Store-style phone screenshot row (Google Play look). Each frame is clickable
 * and opens a full-screen lightbox with prev/next arrows and keyboard support.
 */
function ScreenshotGallery({ screens, note }: { screens: NonNullable<RealProject['screens']>; note?: string }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = active !== null;
  const current = active !== null ? screens[active] : null;

  const step = (dir: number) =>
    setActive((a) => (a === null ? a : (a + dir + screens.length) % screens.length));

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#f6f1ff] via-white to-[#f7f3ff] px-6 py-10 md:px-10">
        <div className="w-full max-w-md">
          <div className="flex items-end gap-3 md:gap-4">
            {screens.map((screen, i) => (
              <button
                key={screen.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={screen.alt}
                title={screen.alt}
                className="group relative min-w-0 flex-1 cursor-zoom-in focus:outline-none"
              >
                <span className="relative block w-full overflow-hidden rounded-[1.2rem] bg-[#020412] p-1 md:p-1.5 shadow-md ring-1 ring-black/5 transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-ember">
                  <span className="block aspect-[9/20] w-full overflow-hidden rounded-[0.8rem] bg-slate-100">
                    <img
                      src={screen.src}
                      alt={screen.alt}
                      loading="lazy"
                      className="block h-full w-full object-cover object-top"
                    />
                  </span>
                  {/* hover affordance */}
                  <span className="pointer-events-none absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#020412]/80 text-white/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" />
                  </span>
                </span>
                {screen.caption && (
                  <span className="mt-2 block px-1 text-center text-[10px] md:text-[11px] font-medium leading-tight text-primary-midnight/60 font-sans">
                    {screen.caption}
                  </span>
                )}
              </button>
            ))}
          </div>

          {note && (
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[10px] md:text-[11px] font-mono tracking-wide text-primary-midnight/50">
              <Lock className="h-3 w-3 text-ember" />
              {note}
            </p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && current && (
          <motion.div
            key="screenshot-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            onClick={() => setActive(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#020412]/90 backdrop-blur-sm" />

            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label={t('work.close')}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev / Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label={t('work.prev')}
              className="absolute left-2 md:left-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label={t('work.next')}
              className="absolute right-2 md:right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Enlarged screenshot */}
            <figure
              key={active}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.96, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="overflow-hidden rounded-[1.5rem] bg-[#020412] p-1.5 shadow-2xl ring-1 ring-white/10"
              >
                <img
                  src={current.src}
                  alt={current.alt}
                  className="block max-h-[62vh] md:max-h-[72vh] w-auto rounded-[1.1rem]"
                />
              </motion.div>
              {current.caption && (
                <figcaption className="mt-4 text-center text-sm text-white/80 font-sans max-w-md">
                  {current.caption}
                </figcaption>
              )}
              <p className="mt-2 text-xs font-mono text-white/40">
                {(active !== null ? active + 1 : 1)} / {screens.length}
              </p>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
