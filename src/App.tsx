/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode } from 'react';
import LanguageProvider from './i18n/LanguageProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import CaseStudies from './components/CaseStudies';
import HowIWork from './components/HowIWork';
import SystemsBuilt from './components/SystemsBuilt';
import LandingPages from './components/LandingPages';
import ToolsIUse from './components/ToolsIUse';
import HowItWorks from './components/HowItWorks';
import ROICalculator from './components/ROICalculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PageHero from './components/PageHero';
import type { RouteMeta } from './routes';

type Prefill = { service: string; details: string } | undefined;

/** The homepage: the full single-page scroll, unchanged. */
function HomeSections({ onPrefill, prefill }: { onPrefill: (s: string, d: string) => void; prefill: Prefill }) {
  return (
    <>
      <Hero />
      <CaseStudies />
      <HowIWork />
      <SystemsBuilt />
      <LandingPages />
      <ToolsIUse />
      <HowItWorks />
      <ROICalculator onPrefill={onPrefill} />
      <ContactForm prefill={prefill} />
    </>
  );
}

/**
 * A focused sub-page: its own <h1> and intro, the section it is about, then the
 * contact form. Every sub-page ends with the form on purpose — someone arriving
 * from an outreach link has already decided they are interested, and the header
 * CTA must not bounce them back to the homepage to find a way to reply.
 */
function PageBody({ route, onPrefill, prefill }: { route: RouteMeta; onPrefill: (s: string, d: string) => void; prefill: Prefill }) {
  let section: ReactNode = null;

  switch (route.key) {
    case 'automations':
      section = <SystemsBuilt />;
      break;
    case 'websites':
      section = <LandingPages />;
      break;
    case 'work':
      section = <CaseStudies />;
      break;
    case 'roi':
      section = <ROICalculator onPrefill={onPrefill} />;
      break;
    case 'contact':
      // The form below is the whole page.
      break;
    default:
      return null;
  }

  return (
    <>
      <PageHero route={route} />
      {section}
      <ContactForm prefill={prefill} />
    </>
  );
}

export default function App({ route }: { route: RouteMeta }) {
  const [prefill, setPrefill] = useState<Prefill>(undefined);

  const handlePrefill = (service: string, details: string) => {
    setPrefill({ service, details });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-canvas-bg flex flex-col justify-between" id="app-wrapper">
        <Header />

        <main className="flex-1">
          {route.key === 'home' ? (
            <HomeSections onPrefill={handlePrefill} prefill={prefill} />
          ) : (
            <PageBody route={route} onPrefill={handlePrefill} prefill={prefill} />
          )}
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
