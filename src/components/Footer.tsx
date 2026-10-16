import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { CONTACT_EMAIL, CONTACT_LINKEDIN } from '../constants';
import { ROUTES, type RouteKey } from '../routes';

/** Reuses the header's existing labels rather than adding a parallel set. */
const PAGE_LABEL: Record<RouteKey, string> = {
  home: 'header.work',
  automations: 'header.automations',
  websites: 'header.websites',
  work: 'header.work',
  roi: 'header.roiCalculator',
  contact: 'header.contact',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // From a sub-page there is no #home to scroll to — let the link navigate.
    const target = document.querySelector('#home');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020412] text-white border-t border-white/5 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 pb-10 border-b border-white/5">
          {/* Logo & Subtitle */}
          <div className="text-center md:text-left">
            <a 
              href="/#home" 
              onClick={handleScrollToTop}
              className="text-2xl font-bold tracking-tight text-white block mb-1"
              id="footer-logo"
            >
              akhrorov<span className="text-ember">.com</span>
            </a>
            <p className="text-xs text-white/50 font-mono tracking-wider uppercase">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Site links. This is the one set of real, static internal links that
              appears on every page, so it is what lets a crawler discover the
              sub-pages and relate them to each other. */}
          <nav aria-label="Site pages">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {ROUTES.filter((r) => r.key !== 'home').map((r) => (
                <li key={r.path}>
                  <a
                    href={r.path}
                    className="text-xs font-mono font-medium text-white/55 hover:text-ember transition-colors"
                  >
                    {t(PAGE_LABEL[r.key])}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-2 text-xs font-mono font-medium text-white/60 hover:text-ember transition-colors"
              id="footer-link-email"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{t('footer.email')}</span>
            </a>
            <a
              href={CONTACT_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-xs font-mono font-medium text-white/60 hover:text-ember transition-colors"
              id="footer-link-linkedin"
            >
              <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{t('footer.linkedin')}</span>
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-xs text-white/40 font-mono">
          <p>© {currentYear} akhrorov.com {t('footer.copyright')}</p>
          <a 
            href="/#home" 
            onClick={handleScrollToTop}
            className="hover:text-white transition-colors"
          >
            {t('footer.backToTop')}
          </a>
        </div>
      </div>
    </footer>
  );
}
