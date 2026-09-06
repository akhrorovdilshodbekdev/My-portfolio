/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

export default function App() {
  const [prefill, setPrefill] = useState<{ service: string; details: string } | undefined>(undefined);

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
        <Hero />
        <CaseStudies />
        <HowIWork />
        <SystemsBuilt />
        <LandingPages />
        <ToolsIUse />
        <HowItWorks />
        <ROICalculator onPrefill={handlePrefill} />
        <ContactForm prefill={prefill} />
      </main>

      <Footer />
    </div>
    </LanguageProvider>
  );
}

