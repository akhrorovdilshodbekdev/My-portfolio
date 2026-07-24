import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../i18n/LanguageProvider';

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
        { value: 'Workflow Automation (n8n / Make)', label: 'Maxsus ish jarayoni avtomatlashtirish (n8n / Make)' },
        { value: 'AI Agent & Chatbot Build', label: 'AI Chatbot / Maxsus Agent' },
        { value: 'Landing Page & Website Development', label: 'Landing Page / Veb-sayt yaratish' },
        { value: 'Complete Custom Full-Stack Project', label: 'To\'liq Full-Stack loyiha' },
      ]
    : [
        { value: '', label: 'Select a service...' },
        { value: 'Workflow Automation (n8n / Make)', label: 'Custom Workflow Automation (n8n / Make)' },
        { value: 'AI Agent & Chatbot Build', label: 'AI Chatbot / Custom Agent Deployment' },
        { value: 'Landing Page & Website Development', label: 'Landing Page / Full Website Build' },
        { value: 'Complete Custom Full-Stack Project', label: 'SaaS Waitlist / Custom Web Application' },
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

      </div>
    </section>
  );
}
