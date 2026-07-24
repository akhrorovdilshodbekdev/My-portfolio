import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'uz';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'uz', label: 'UZ' },
];

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let result: any = lang === 'uz' ? uzTranslations : enTranslations;
      for (const k of keys) {
        result = result?.[k];
      }
      return result ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ========== ENGLISH TRANSLATIONS ==========
const enTranslations: Record<string, any> = {
  header: {
    home: 'Home',
    automations: 'Automations',
    websites: 'Websites',
    roiCalculator: 'ROI Calculator',
    tools: 'Tools',
    faq: 'Q&A',
    contact: 'Contact',
    hireMe: 'Hire Me',
  },
  hero: {
    title1: 'I build',
    automations: 'automations',
    and: '&',
    websites: 'websites',
    title2: 'that grow your business.',
    subtitle: 'I bridge the gap between technical execution and strategic business growth, delivering precision-engineered solutions.',
    seeMyWork: 'See My Work',
    letsTalk: "Let's Talk",
    turnaround: 'Typical turnaround: 5-7 days',
    businesses: '15+ businesses automated',
    liveSim: 'LIVE SIMULATION',
    run: 'RUN WORKFLOW',
    running: 'RUNNING...',
    node1: 'Webhook (Lead Received)',
    node2: 'AI Qualifier (Gemini / OpenAI)',
    node3: 'CRM & WhatsApp Notification',
    active: 'ACTIVE',
    aiThinking: 'AI THINKING...',
    qualified: 'QUALIFIED',
    sent: 'SENT',
    scroll: 'Scroll',
  },
  process: {
    badge: 'PROCESS',
    title: 'HOW I WORK',
    subtitle: 'A streamlined, transparent process designed to take your business from bottlenecked to automated.',
  },
  workSteps: {
    step1Title: 'We Talk',
    step1Desc: 'We dive deep into your current workflows, identifying inefficiencies and mapping out a tailored technical strategy aligned with your business goals.',
    step2Title: 'I Build',
    step2Desc: "I engineer robust, scalable solutions—whether it's a high-converting website or a complex n8n automation ecosystem—keeping you updated every step.",
    step3Title: 'You Grow',
    step3Desc: 'We launch. Your business operates with newfound efficiency, freeing up your time to focus on scaling rather than manual tasks.',
  },
  automations: {
    badge: 'AUTOMATIONS & AI',
    title: "Systems I've Built",
    subtitle: 'Lead generation automations, custom AI agents, and chatbots that work 24/7. Click on any system to explore the full details.',
    vpsTitle: 'Self-Hosted VPS Deployments Available',
    vpsDesc: "Bypass expensive SaaS subscription tier limits. I can configure, secure, and deploy a self-hosted automation hub (n8n, CapRover, Coolify) on your own private VPS for unlimited runs and total data sovereignty.",
    overview: 'Overview',
    keyCapabilities: 'Key Capabilities & Integrations',
    businessImpact: 'Business Impact',
    stack: 'Stack:',
    interactivePipeline: 'Interactive Pipeline Playground',
    visualProof: 'Project Visual Proof',
    conversationalPlayground: 'Interactive Conversational Playground',
  },
  gallery: {
    badge: 'DESIGN GALLERY',
    title: "Websites I've Designed",
    subtitle: 'Hero pages of my recent projects. Hover to pause.',
  },
  tools: {
    badge: 'TECH STACK',
    title: 'TOOLS I USE',
    subtitle: 'Modern stack, battle-tested.',
  },
  faq: {
    badge: 'FAQ',
    title: 'HOW IT ALL WORKS',
    subtitle: 'Your questions, answered plainly. No tech fluff.',
  },
  roi: {
    badge: 'ROI CALCULATOR',
    title: 'What Could Automation Save You?',
    subtitle: 'Pick a problem area, adjust the numbers to match your business, and see the real impact in time and money.',
    selectChallenge: 'Select your challenge',
    manualWork: 'Manual Work',
    lostLeads: 'Lost Leads',
    bookings: 'Bookings',
    support: 'Support',
    manualDesc: 'Repetitive tasks eating your team time',
    leadsDesc: 'Visitors not converting into customers',
    bookingsDesc: 'Empty slots and missed appointments',
    supportDesc: 'Repetitive questions draining staff',
    yourSavings: 'YOUR MONTHLY SAVINGS',
    timeSaved: 'Time Saved',
    moneySaved: 'Money Saved',
    hrsMo: 'hrs / mo',
    breakdown: 'BREAKDOWN',
    before: 'Before',
    after: 'After',
    suggestedSolution: 'Suggested solution',
    sendNumbers: 'Send me these numbers',
    prefillNote: 'Pre-fills the contact form with your calculation details',
    manualHours: 'Hours spent on manual tasks per week',
    hourlyRate: 'Hourly staff cost',
    visitors: 'Monthly website visitors',
    conversionRate: 'Current conversion rate',
    avgValue: 'Average customer value',
    appointments: 'Appointments or bookings per month',
    noShow: 'No-show or cancellation rate',
    revenuePerBooking: 'Average revenue per fulfilled booking',
    supportRequests: 'Support requests per week',
    minutesPerRequest: 'Minutes spent per request',
  },
  contact: {
    badge: 'START YOUR PROJECT',
    title: 'Ready to automate?',
    subtitle: "Tell me what you need. I'll review and respond within 24 hours with a plan and a clear quote.",
    name: 'Your Name',
    email: 'Email Address',
    whatNeed: 'What do you need?',
    selectService: 'Select a service...',
    projectDetails: 'Tell me about your project',
    detailsPlaceholder: 'Briefly describe your goals...',
    send: "Send & Let's Talk",
    sending: 'SENDING...',
    noSpam: 'No spam. No pressure. Just a real conversation.',
    successTitle: 'Message Sent Successfully!',
    successText: "Thanks, {name}! I've received your inquiry regarding {service}.",
    submitAnother: 'Submit Another Inquiry',
    backToTop: 'Back to Top',
    fillFields: 'Please fill out all the fields!',
    error: 'Something went wrong. Please try again or reach me directly on Telegram.',
  },
  chat: {
    greeting: "Hi there! 👋 I'm Akhrorov's AI Assistant. Ask me anything about custom automations or web design!",
    suggestions: 'SUGGESTIONS',
    howStart: "How do we get started?",
    howStartAnswer: "We start with a quick 15-minute briefing session or you can fill out the project inquiry form. Once we align, I draft a complete architecture flow and a quote in under 24 hours!",
    turnaround: "What is your turnaround time?",
    turnaroundAnswer: "Most standard landing pages and n8n automations are built, tested, and fully deployed within 5 to 7 business days!",
    sync: "Can you sync with my current tools?",
    syncAnswer: "Yes! I routinely connect workflows to Google Sheets, Slack, Telegram, WhatsApp, Airtable, HubSpot, Zendesk, Stripe, Notion, and customized relational databases.",
    online: 'Online Assistant',
    typing: 'AI agent is typing...',
  },
  footer: {
    tagline: 'Automation & Web Development',
    telegram: 'Telegram',
    copyright: 'Built with care.',
    backToTop: 'Back to Top ↑',
  },
};

// ========== UZBEK TRANSLATIONS ==========
const uzTranslations: Record<string, any> = {
  header: {
    home: 'Bosh sahifa',
    automations: 'Avtomatlashtirish',
    websites: 'Veb-saytlar',
    roiCalculator: 'ROI Kalkulyator',
    tools: 'Asboblar',
    faq: "Savol-Javob",
    contact: "Bog'lanish",
    hireMe: "Men bilan ishlang",
  },
  hero: {
    title1: 'Men',
    automations: 'avtomatlashtirish',
    and: 'va',
    websites: 'veb-saytlar',
    title2: "yarataman, biznesingizni birgalikda rivojlantiramiz.",
    subtitle: "Men texnik ijro va strategik biznes o'sishi o'rtasidagi bo'shliqni to'ldirib, aniq muhandislik yechimlarini yetkazib beraman.",
    seeMyWork: "Ishlarimni ko'ring",
    letsTalk: "Suhbatlashamiz",
    turnaround: 'Muddati: 5-7 kun',
    businesses: '15+ biznes avtomatlashtirilgan',
    liveSim: 'JONLI SIMULYATSIYA',
    run: 'ISHGA TUSHIRISH',
    running: 'ISHLAYAPDI...',
    node1: 'Vebxuk (Lead qabul qilindi)',
    node2: "AI Kvalifikator (Gemini / OpenAI)",
    node3: 'CRM va WhatsApp bildirishnoma',
    active: 'FAOL',
    aiThinking: "AI O'YLAYAPDI...",
    qualified: 'SARALANDI',
    sent: 'YUBORILDI',
    scroll: 'Pastga',
  },
  process: {
    badge: 'JARAYON',
    title: "QANDAY ISHLAYMAN",
    subtitle: "Biznesingizni tiqilinchdan avtomatlashtirishga olib boradigan soddalashtirilgan va shaffof jarayon.",
  },
  workSteps: {
    step1Title: "Suhbatlashamiz",
    step1Desc: "Sizning joriy ish jarayonlaringizni chuqur o'rganamiz, samarasiz jihatlarni aniqlaymiz va biznes maqsadlaringizga mos texnik strategiyani tuzamiz.",
    step2Title: 'Men quraman',
    step2Desc: "Men mustahkam, kengaytiriladigan yechimlarni yarataman — yuqori konversiyali veb-sayt yoki murakkab n8n avtomatlashtirish ekotizimlari, sizni har bosqichda xabardor qilib boraman.",
    step3Title: "Siz o'sasiz",
    step3Desc: "Ishga tushiramiz. Biznesingiz yangi samaradorlik bilan ishlaydi, vaqtingizni qo'lda bajariladigan vazifalardan ko'ra rivojlanishga e'tibor qaratishga bo'shatadi.",
  },
  automations: {
    badge: 'AVTOMATLASHTIRISH & AI',
    title: "Men qurgan tizimlar",
    subtitle: "24/7 ishlaydigan lead avtomatlashtirishlar, shaxsiy AI agentlar va chatbotlar. Batafsil ma'lumot uchun har qanday tizimni bosing.",
    vpsTitle: "Shaxsiy VPS da joylashtirish mumkin",
    vpsDesc: "Qimmat SaaS obuna cheklovlaridan quting. Men sizning shaxsiy VPSingizda (n8n, CapRover, Coolify) avtomatlashtirish markazini sozlash, himoyalash va joylashtirishni amalga oshiraman.",
    overview: "Umumiy ma'lumot",
    keyCapabilities: 'Asosiy imkoniyatlar va integratsiyalar',
    businessImpact: "Biznesga ta'siri",
    stack: 'Texnologiyalar:',
    interactivePipeline: 'Interaktiv quvur liniyasi',
    visualProof: 'Loyiha vizual isboti',
    conversationalPlayground: "Interaktiv suhbat maydonchasi",
  },
  gallery: {
    badge: 'DIZAYN GALEREYASI',
    title: "Men ishlab chiqqan veb-saytlar",
    subtitle: "Oxirgi loyihalarimning asosiy sahifalari. To'xtatish uchun sichqonchani olib keling.",
  },
  tools: {
    badge: 'TEXNOLOGIYALAR',
    title: 'ASBOBLARIM',
    subtitle: "Zamonaviy to'plam, sinovdan o'tgan.",
  },
  faq: {
    badge: "SAVOL-JAVOB",
    title: "HAMMASI QANDAY ISHLAYDI",
    subtitle: "Savollaringizga oddiy javoblar. Texnik gaplar yo'q.",
  },
  roi: {
    badge: 'ROI KALKULYATOR',
    title: 'Avtomatlashtirish sizga qancha tejaydi?',
    subtitle: "Muammo sohasini tanlang, raqamlarni biznesingizga moslang va vaqt va puldagi real ta'sirni ko'ring.",
    selectChallenge: "Muammoingizni tanlang",
    manualWork: "Qo'l mehnati",
    lostLeads: "Yo'qotilgan leadlar",
    bookings: 'Bronlar',
    support: "Qo'llab-quvvatlash",
    manualDesc: "Jamoangiz vaqtini oladigan takroriy vazifalar",
    leadsDesc: "Mijozga aylanmaydigan tashrif buyuruvchilar",
    bookingsDesc: "Bo'sh vaqtlar va o'tkazib yuborilgan uchrashuvlar",
    supportDesc: "Xodimlarni charchatadigan takroriy savollar",
    yourSavings: "OYLIK TEJAMINGIZ",
    timeSaved: 'Vaqt tejamkori',
    moneySaved: 'Pul tejamkori',
    hrsMo: 'soat / oy',
    breakdown: 'TAHLIL',
    before: 'Oldin',
    after: 'Keyin',
    suggestedSolution: 'Tavsiya etilgan yechim',
    sendNumbers: "Menga bu raqamlarni yubor",
    prefillNote: "Kontakt formani hisob-kitob ma'lumotlari bilan to'ldiradi",
    manualHours: "Haftalik qo'l mehnatiga sarflangan soatlar",
    hourlyRate: "Soatlik xodim narxi",
    visitors: "Oylik veb-sayt tashrif buyuruvchilari",
    conversionRate: 'Joriy konversiya darajasi',
    avgValue: "O'rtacha mijoz qiymati",
    appointments: 'Oylik uchrashuvlar yoki bronlar',
    noShow: "Kelmaslik yoki bekor qilish darajasi",
    revenuePerBooking: "Har bir bajarilgan brondan o'rtacha daromad",
    supportRequests: "Haftalik so'rovlar soni",
    minutesPerRequest: "Har bir so'rovga sarflangan daqiqalar",
  },
  contact: {
    badge: "LOYIHANGIZNI BOSHLANG",
    title: 'Avtomatlashtirishga tayyormisiz?',
    subtitle: "Menga nima kerakligini ayting. Men 24 soat ichida reja va aniq narx bilan javob beraman.",
    name: 'Ismingiz',
    email: 'Email manzilingiz',
    whatNeed: 'Sizga nima kerak?',
    selectService: 'Xizmatni tanlang...',
    projectDetails: "Loyihangiz haqida ma'lumot bering",
    detailsPlaceholder: "Maqsadlaringizni qisqacha tavsiflang...",
    send: "Yuborish va suhbatlashamiz",
    sending: 'YUBORILMOQDA...',
    noSpam: "Spam yo'q. Bosim yo'q. Faqat haqiqiy suhbat.",
    successTitle: "Xabar muvaffaqiyatli yuborildi!",
    successText: "Rahmat, {name}! Men {service} bo'yicha so'rovingizni oldim.",
    submitAnother: "Boshqa so'rov yuborish",
    backToTop: 'Boshiga qaytish',
    fillFields: "Iltimos, barcha maydonlarni to'ldiring!",
    error: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki Telegram orqali bog'laning.",
  },
  chat: {
    greeting: "Assalomu alaykum! 👋 Men Akhrorovning AI yordamchisiman. Avtomatlashtirish yoki veb-dizayn haqida istalgan savolni berishingiz mumkin!",
    suggestions: 'TAKLIFLAR',
    howStart: "Qanday boshlaymiz?",
    howStartAnswer: "Biz 15 daqiqalik tezkor brifing bilan boshlaymiz yoki siz loyiha so'rovnomasini to'ldirishingiz mumkin. Maqsadlarni aniqlagach, 24 soat ichida to'liq arxitektura va narxni taqdim etaman!",
    turnaround: "Yetkazib berish muddati qancha?",
    turnaroundAnswer: "Oddiy landing page va n8n avtomatlashtirishlari 5-7 ish kuni ichida quriladi, sinovdan o'tkaziladi va to'liq ishga tushiriladi!",
    sync: "Mening vositalarim bilan sinxronlash mumkinmi?",
    syncAnswer: "Ha! Men Google Sheets, Slack, Telegram, WhatsApp, Airtable, HubSpot, Zendesk, Stripe, Notion va maxsus ma'lumotlar bazalariga ulanishlarni muntazam ravishda amalga oshiraman.",
    online: 'Onlayn yordamchi',
    typing: 'AI yozmoqda...',
  },
  footer: {
    tagline: 'Avtomatlashtirish va Veb-ishlanma',
    telegram: 'Telegram',
    copyright: "G'amxo'rlik bilan yaratilgan.",
    backToTop: 'Boshiga ↑',
  },
};
