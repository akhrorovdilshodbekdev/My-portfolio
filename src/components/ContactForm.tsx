import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../i18n/LanguageProvider';
import { CONTACT_WHATSAPP, CONTACT_TELEGRAM } from '../constants';

interface ContactFormProps {
  prefill?: {
    service: string;
    details: string;
  };
}

export default function ContactForm({ prefill }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, lang } = useLanguage();

  // Update service options when language changes
  const serviceOptions = lang === 'uz'
    ? [
        { value: '', label: 'Xizmatni tanlang...' },
        { value: 'Website + Mobile App Development', label: 'Veb-sayt + Mobil ilova' },
        { value: 'Mobile App Development', label: 'Shaxsiy mobil ilova (Android)' },
        { value: 'AI Assistant / Automation Build', label: 'AI Yordamchi / Avtomatlashtirish' },
        { value: 'Workflow Automation (n8n / Make)', label: 'Maxsus ish jarayoni avtomatlashtirish (n8n / Make)' },
        { value: 'AI Agent & Chatbot Build', label: 'AI Chatbot / Maxsus Agent' },
        { value: 'Landing Page & Website Development', label: 'Landing Page / Veb-sayt yaratish' },
      ]
    : [
        { value: '', label: 'Select a service...' },
        { value: 'Website + Mobile App Development', label: 'Website + Mobile App' },
        { value: 'Mobile App Development', label: 'Custom Mobile App (Android)' },
        { value: 'AI Assistant / Automation Build', label: 'AI Assistant / Automation' },
        { value: 'Workflow Automation (n8n / Make)', label: 'Custom Workflow Automation (n8n / Make)' },
        { value: 'AI Agent & Chatbot Build', label: 'AI Chatbot / Custom Agent Deployment' },
        { value: 'Landing Page & Website Development', label: 'Landing Page / Full Website Build' },
      ];

  useEffect(() => {
    if (prefill) {
      setFormData(prev => ({
        ...prev,
        service: prefill.service || prev.service,
        details: prefill.details || prev.details
      }));
    }
  }, [prefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service || !formData.details) {
      alert(t('contact.fillFields'));
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS environment variables. Check your .env file.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          service: formData.service,
          details: formData.details,
        },
        publicKey
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      alert(t('contact.error'));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', service: '', details: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0c0e1a] text-white border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-ember/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('contact.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-white mb-4">
            {t('contact.title')}
          </h3>
          <p className="text-sm md:text-base text-white/60 font-sans max-w-md mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-md">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                id="form-ready-to-automate"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="name-input" className="text-xs font-semibold text-white/70 font-mono tracking-wider">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name-input"
                      placeholder={lang === 'uz' ? 'Ismingiz' : 'John Doe'}
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.03] border-b border-white/10 text-white placeholder-white/20 py-3 focus:outline-none focus:border-ember transition-colors text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="email-input" className="text-xs font-semibold text-white/70 font-mono tracking-wider">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border-b border-white/10 text-white placeholder-white/20 py-3 focus:outline-none focus:border-ember transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="service-select" className="text-xs font-semibold text-white/70 font-mono tracking-wider">
                    {t('contact.whatNeed')}
                  </label>
                  <select
                    id="service-select"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#0c0e1a]/80 border-b border-white/10 text-white/80 py-3 focus:outline-none focus:border-ember transition-colors text-sm appearance-none cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="details-textarea" className="text-xs font-semibold text-white/70 font-mono tracking-wider">
                    {t('contact.projectDetails')}
                  </label>
                  <textarea
                    id="details-textarea"
                    rows={4}
                    placeholder={t('contact.detailsPlaceholder')}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-white/20 p-3 focus:outline-none focus:border-ember transition-colors text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-ember hover:bg-amber-600 text-white py-4 font-bold tracking-wide transition-all duration-200 cursor-pointer text-sm shadow-[0_4px_20px_rgba(223,101,19,0.15)] active:scale-[0.98] disabled:opacity-50"
                    id="submit-contact-button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.send')}</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-white/40 font-sans tracking-wide text-center">
                  {t('contact.noSpam')}
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-6"
                id="contact-success-msg"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-bold font-sans">{t('contact.successTitle')}</h4>
                  <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    {t('contact.successText').replace('{name}', formData.name).replace('{service}', formData.service)}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={resetForm}
                    className="rounded-md border border-white/10 hover:border-white/20 px-5 py-2.5 text-xs font-semibold text-white/80 transition-all cursor-pointer"
                  >
                    {t('contact.submitAnother')}
                  </button>
                  <a
                    href="#home"
                    className="flex items-center justify-center gap-1.5 rounded-md bg-ember hover:bg-amber-600 px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md cursor-pointer"
                  >
                    <span>{t('contact.backToTop')}</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Prefer to talk directly? */}
        <div className="mt-10 text-center">
          <p className="text-sm text-white/50 font-sans mb-4">{t('contact.direct')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 hover:border-white/25 text-white px-5 py-2.5 text-sm font-semibold transition-all duration-200"
              id="contact-direct-whatsapp"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href={CONTACT_TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-white/[0.05] border border-white/10 hover:border-white/25 text-white px-5 py-2.5 text-sm font-semibold transition-all duration-200"
              id="contact-direct-telegram"
            >
              <Send className="h-4 w-4 rotate-[-25deg]" />
              <span>Telegram</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
