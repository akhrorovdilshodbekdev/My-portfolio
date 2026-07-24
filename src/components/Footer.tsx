import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#home');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#020412] text-white border-t border-white/5 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 pb-10 border-b border-white/5">
          {/* Logo & Subtitle */}
          <div className="text-center md:text-left">
            <a 
              href="#home" 
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

          {/* Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://t.me/akhrorov_dilshodbek"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-xs font-mono font-medium text-white/60 hover:text-ember transition-colors"
              id="footer-link-telegram"
            >
              <Send className="h-4 w-4 rotate-[-25deg] group-hover:scale-110 transition-transform" />
              <span>{t('footer.telegram')}</span>
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-xs text-white/40 font-mono">
          <p>© {currentYear} Akhrorov.com {t('footer.copyright')}</p>
          <a 
            href="#home" 
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
