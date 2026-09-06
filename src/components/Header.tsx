import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageProvider';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t('header.work'), href: '#work' },
    { label: t('header.automations'), href: '#automations' },
    { label: t('header.websites'), href: '#websites' },
    { label: t('header.roiCalculator'), href: '#roi' },
    { label: t('header.faq'), href: '#faq' },
    { label: t('header.contact'), href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'uz' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border/40 bg-canvas-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleScroll(e, '#home')} 
          className="text-xl font-bold tracking-tight text-primary-midnight"
          id="nav-logo"
        >
          akhrorov<span className="text-ember">.com</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-sm font-medium text-primary-midnight/70 transition-colors hover:text-ember"
              id={`nav-${item.href.replace('#', '')}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop right side: Language toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-primary-midnight/60 hover:text-ember transition-colors cursor-pointer px-2 py-1 rounded border border-transparent hover:border-card-border"
            id="lang-toggle"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{lang === 'en' ? 'UZ' : 'EN'}</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="rounded-md bg-ember hover:bg-ember-hover text-white px-5 py-2 text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow"
            id="nav-hire-me"
          >
            {t('header.hireMe')}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden rounded-md p-2 text-primary-midnight/80 hover:bg-slate-100 transition-colors focus:outline-none relative h-10 w-10 flex items-center justify-center overflow-hidden"
          aria-label="Toggle Menu"
          id="nav-toggle"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: isOpen ? -90 : 90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: isOpen ? 90 : -90, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute"
            >
              {isOpen ? <X className="h-5.5 w-5.5 text-ember" /> : <Menu className="h-5.5 w-5.5" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Drawer — absolute overlay, so opening/closing does NOT reflow the page below */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl px-6 py-5 shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="block text-base font-medium text-primary-midnight/80 py-1 transition-colors hover:text-ember"
                  id={`mobile-nav-${item.href.replace('#', '')}`}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-base font-medium text-primary-midnight/80 py-1 transition-colors hover:text-ember"
              >
                <Globe className="h-4 w-4" />
                <span>{lang === 'en' ? "O'zbekcha" : 'English'}</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="mt-2 block w-full text-center rounded-lg bg-ember hover:bg-ember-hover text-white px-5 py-3 text-sm font-semibold transition-all duration-200 shadow-sm"
                id="mobile-nav-hire-me"
              >
                {t('header.hireMe')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
