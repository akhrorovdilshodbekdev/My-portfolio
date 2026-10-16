import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageProvider';
import type { RouteMeta } from '../routes';
import { ssrInitial } from '../lib/prerender';

/**
 * The <h1> and intro for a sub-page. Each page gets its own, distinct from the
 * homepage <h1> — that difference is what lets Google treat these as separate
 * pages rather than duplicates of the homepage.
 */
export default function PageHero({ route }: { route: RouteMeta }) {
  const { t } = useLanguage();

  return (
    <section className="border-b border-card-border/40 bg-canvas-bg pt-14 pb-10 md:pt-20 md:pb-14">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.p
          initial={ssrInitial({ opacity: 0 })}
          animate={{ opacity: 1 }}
          data-reveal
          className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-ember"
        >
          <a href="/" className="transition-colors hover:text-ember-hover">
            akhrorov.com
          </a>
          <span className="mx-2 text-primary-midnight/30">/</span>
          {route.path.replace(/\//g, '')}
        </motion.p>

        <motion.h1
          initial={ssrInitial({ opacity: 0, y: 12 })}
          animate={{ opacity: 1, y: 0 }}
          data-reveal
          className="text-3xl font-bold leading-[1.12] tracking-tight text-primary-midnight md:text-5xl"
        >
          {t(`pages.${route.key}.title`)}
        </motion.h1>

        <motion.p
          initial={ssrInitial({ opacity: 0, y: 12 })}
          animate={{ opacity: 1, y: 0 }}
          data-reveal
          className="mt-5 max-w-2xl text-base leading-relaxed text-primary-midnight/70 md:text-lg"
        >
          {t(`pages.${route.key}.intro`)}
        </motion.p>
      </div>
    </section>
  );
}
