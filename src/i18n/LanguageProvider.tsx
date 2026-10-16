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
    work: 'Work',
    automations: 'Automations',
    websites: 'Websites',
    roiCalculator: 'ROI Calculator',
    faq: 'Q&A',
    contact: 'Contact',
    hireMe: 'Hire Me',
  },
  hero: {
    subtitle: 'A founder-led studio for growing businesses. I design, build, and launch high-converting websites, native mobile apps, and AI automation — so you answer faster, book more, and never lose a lead.',
    seeMyWork: 'See My Work',
    letsTalk: "Let's Talk",
    turnaround: 'Typical turnaround: 5-7 days',
    businesses: 'You work directly with the builder',
    pre: 'Websites, mobile apps &',
    accent: 'AI automation',
    post: 'for growing businesses.',
    pillarsTitle: 'WHAT I BUILD',
    p1t: 'Websites & SEO',
    p1d: 'Sites that turn visitors into customers',
    p2t: 'Mobile apps',
    p2d: 'Native apps your customers keep on their phone',
    p3t: 'AI automation',
    p3d: '24/7 assistants for leads, bookings & support',
    founderNote: 'A founder-led studio — every project is designed and built by me directly. No account managers, no hand-offs.',
  },
  process: {
    badge: 'PROCESS',
    title: 'HOW I WORK',
    subtitle: 'A streamlined, transparent process designed to take your business from bottlenecked to automated.',
  },
  automations: {
    badge: 'AUTOMATIONS & AI',
    title: "Systems I've Built",
    subtitle: 'Lead generation automations, custom AI agents, and chatbots that work 24/7. Open any card to run its live interactive demo and see the system in action.',
    vpsTitle: 'Self-Hosted VPS Deployments Available',
    vpsDesc: "Bypass expensive SaaS subscription tier limits. I can configure, secure, and deploy a self-hosted automation hub (n8n, CapRover, Coolify) on your own private VPS for unlimited runs and total data sovereignty.",
    overview: 'Overview',
    keyCapabilities: 'Key Capabilities & Integrations',
    businessImpact: 'How it helps your business',
    stack: 'Stack:',
    omnichannelPlayground: 'Interactive Omnichannel Playground',
    conversationalPlayground: 'Interactive Conversational Playground',
    demoBadge: 'LIVE DEMO',
    demoTitle: 'Automated Lead Response System',
    demoLead: 'Watch a real lead go from a form submission to an approved reply — the entire system running end to end.',
    demoCta: 'Watch the 90-second demo',
    demoNote: 'Self-hosted on a private server — your data, your rules, no per-lead fees.',
    demoDuration: '1:39',
  },
  work: {
    badge: 'REAL WORK',
    title: 'Built & running',
    subtitle: 'Not mockups — real products in use today.',
    prev: 'Previous',
    next: 'Next',
    close: 'Close',
  },
  gallery: {
    badge: 'DESIGN GALLERY',
    title: 'Website Design Concepts',
    subtitle: 'Concept hero pages for a restaurant, a gym, and a travel brand. Hover to pause.',
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
    title: "Let's build your project",
    subtitle: "Tell me what you need — a website, a mobile app, or an AI assistant. I'll review and respond within 24 hours with a plan and a clear quote.",
    name: 'Your Name',
    email: 'Email Address',
    whatNeed: 'What do you need?',
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
    direct: 'Prefer to talk directly?',
  },
  // Headline + intro for each standalone page (see src/routes.ts). Deliberately
  // different from the homepage sections' headings — distinct <h1>s per URL are
  // what stop these reading as duplicates of the homepage.
  pages: {
    automations: {
      title: 'AI automation that answers, books and qualifies for you',
      intro:
        'I build n8n workflows and AI assistants that capture every lead, reply in seconds and book appointments while you sleep — running on your own server, with no per-lead fees.',
    },
    websites: {
      title: 'Websites that turn visitors into customers',
      intro:
        'A fast, modern site delivered as one done-for-you package: I register the domain, set up hosting, write the copy and handle the SEO, so you go live in 5–7 days without configuring anything.',
    },
    work: {
      title: 'Built and running',
      intro:
        'Not mockups. These are real products in use today — a public website and a private management app an education centre runs on every day, plus a self-hosted 56-node AI assistant.',
    },
    roi: {
      title: 'What could automation save you?',
      intro:
        'Pick the problem that costs you most — manual work, lost leads, no-shows or repeated support questions — and see the hours and money you would get back.',
    },
    contact: {
      title: "Let's build your project",
      intro:
        'Tell me what you need and I will come back within 24 hours with a plan and a fixed quote. No hourly surprises and no account managers — you work directly with me.',
    },
  },
  footer: {
    tagline: 'Automation & Web Development',
    email: 'Email',
    linkedin: 'LinkedIn',
    copyright: 'Built with care.',
    backToTop: 'Back to Top ↑',
  },
};

// ========== UZBEK TRANSLATIONS ==========
const uzTranslations: Record<string, any> = {
  header: {
    work: 'Ishlar',
    automations: 'Avtomatlashtirish',
    websites: 'Veb-saytlar',
    roiCalculator: 'ROI Kalkulyator',
    faq: "Savol-Javob",
    contact: "Bog'lanish",
    hireMe: "Men bilan ishlang",
  },
  hero: {
    subtitle: "O'sib borayotgan bizneslar uchun asoschisi yetakchilik qiladigan studiya. Men yuqori konversiyali veb-saytlar, mobil ilovalar va AI avtomatlashtirishni loyihalab, quraman va ishga tushiraman — siz tezroq javob berasiz, ko'proq bron olasiz va hech qachon lead yo'qotmaysiz.",
    seeMyWork: "Ishlarimni ko'ring",
    letsTalk: "Suhbatlashamiz",
    turnaround: 'Muddati: 5-7 kun',
    businesses: "To'g'ridan-to'g'ri ishlab chiquvchi bilan ishlaysiz",
    pre: 'Veb-saytlar, mobil ilovalar va',
    accent: 'AI avtomatlashtirish',
    post: "biznesingizni o'stirish uchun.",
    pillarsTitle: 'Nima quraman',
    p1t: 'Veb-saytlar va SEO',
    p1d: 'Tashrif buyuruvchilarni mijozga aylantiradigan saytlar',
    p2t: 'Mobil ilovalar',
    p2d: 'Mijozlaringiz telefonda saqlaydigan ilovalar',
    p3t: 'AI avtomatlashtirish',
    p3d: 'Leadlar, bronlar va qo\'llab-quvvatlash uchun 24/7 yordamchilar',
    founderNote: "Asoschisi yetakchilik qiladigan studiya — har bir loyiha shaxsan men tomonimdan loyihalanadi va quriladi. Hech qanday oraliq bo'g'in yo'q.",
  },
  process: {
    badge: 'JARAYON',
    title: "QANDAY ISHLAYMAN",
    subtitle: "Biznesingizni tiqilinchdan avtomatlashtirishga olib boradigan soddalashtirilgan va shaffof jarayon.",
  },
  automations: {
    badge: 'AVTOMATLASHTIRISH & AI',
    title: "Men qurgan tizimlar",
    subtitle: "24/7 ishlaydigan lead avtomatlashtirishlar, shaxsiy AI agentlar va chatbotlar. Batafsil ma'lumot uchun istalgan kartani ochib, jonli interaktiv demoda tizimni ko'ring.",
    vpsTitle: "Shaxsiy VPS da joylashtirish mumkin",
    vpsDesc: "Qimmat SaaS obuna cheklovlaridan quting. Men sizning shaxsiy VPSingizda (n8n, CapRover, Coolify) avtomatlashtirish markazini sozlash, himoyalash va joylashtirishni amalga oshiraman.",
    overview: "Umumiy ma'lumot",
    keyCapabilities: 'Asosiy imkoniyatlar va integratsiyalar',
    businessImpact: "Sizning biznesingizga qanday yordam beradi",
    stack: 'Texnologiyalar:',
    omnichannelPlayground: 'Interaktiv omnikanal maydonchasi',
    conversationalPlayground: "Interaktiv suhbat maydonchasi",
    demoBadge: 'JONLI DEMO',
    demoTitle: 'Avtomatik lead javob tizimi',
    demoLead: "Haqiqiy leadning formani to'ldirishidan tasdiqlangan javobgacha bo'lgan yo'lini ko'ring — butun tizim boshidan oxirigacha ishlaydi.",
    demoCta: "90 soniyalik demoni ko'rish",
    demoNote: "Shaxsiy serverda joylashtirilgan — ma'lumotlaringiz o'zingizda qoladi, har bir lead uchun to'lov yo'q.",
    demoDuration: '1:39',
  },
  work: {
    badge: 'HAQIQIY ISHLAR',
    title: 'Qurilgan va ishlamoqda',
    subtitle: 'Maket emas — bugun amalda ishlatilayotgan mahsulotlar.',
    prev: 'Oldingi',
    next: 'Keyingi',
    close: 'Yopish',
  },
  gallery: {
    badge: 'DIZAYN GALEREYASI',
    title: "Veb-sayt dizayn kontseptlari",
    subtitle: "Dizayn kontseptlari: restoran, sport zali va sayohat brendi uchun asosiy sahifalar. To'xtatish uchun sichqonchani olib keling.",
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
    title: "Loyihangizni quraylik",
    subtitle: "Menga nima kerakligini ayting — veb-sayt, mobil ilova yoki AI yordamchi. Men 24 soat ichida reja va aniq narx bilan javob beraman.",
    name: 'Ismingiz',
    email: 'Email manzilingiz',
    whatNeed: 'Sizga nima kerak?',
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
    direct: "To'g'ridan-to'g'ri yozishni xohlaysizmi?",
  },
  pages: {
    automations: {
      title: "Siz uchun javob beradigan, bron qiladigan va saralaydigan AI avtomatlashtirish",
      intro:
        "Men har bir leadni ushlab oladigan, soniyalar ichida javob beradigan va siz uxlayotganda uchrashuvlarni bron qiladigan n8n ish jarayonlari va AI yordamchilarni quraman — o'z serveringizda ishlaydi, har bir lead uchun to'lov yo'q.",
    },
    websites: {
      title: 'Tashrif buyuruvchilarni mijozga aylantiradigan veb-saytlar',
      intro:
        "Bitta tayyor paket sifatida tezkor va zamonaviy sayt: domenni ro'yxatdan o'tkazaman, xostingni sozlayman, matnlarni yozaman va SEOni o'zim bajaraman — siz 5-7 kun ichida hech narsa sozlamasdan ishga tushasiz.",
    },
    work: {
      title: 'Qurilgan va ishlamoqda',
      intro:
        "Maket emas. Bular bugun amalda ishlatilayotgan haqiqiy mahsulotlar — ta'lim markazi har kuni ishlatadigan ochiq veb-sayt va maxfiy boshqaruv ilovasi hamda o'z serverida joylashgan 56 tugunli AI yordamchi.",
    },
    roi: {
      title: 'Avtomatlashtirish sizga qancha tejaydi?',
      intro:
        "Sizga eng qimmatga tushadigan muammoni tanlang — qo'l mehnati, yo'qotilgan leadlar, kelmasliklar yoki takroriy savollar — va qancha vaqt va pul qaytishingizni ko'ring.",
    },
    contact: {
      title: 'Loyihangizni quraylik',
      intro:
        "Menga nima kerakligini ayting — 24 soat ichida reja va aniq narx bilan javob beraman. Kutilmagan soatlik to'lovlar va akkaunt menejerlari yo'q — bevosita men bilan ishlaysiz.",
    },
  },
  footer: {
    tagline: 'Avtomatlashtirish va Veb-ishlanma',
    email: 'Email',
    linkedin: 'LinkedIn',
    copyright: "G'amxo'rlik bilan yaratilgan.",
    backToTop: 'Boshiga ↑',
  },
};
