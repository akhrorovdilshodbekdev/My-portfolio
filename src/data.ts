import { Project, Tool, FAQItem, WorkStep } from './types';

export const WORK_STEPS: WorkStep[] = [
  {
    number: '01',
    title: 'We Talk',
    description: 'We dive deep into your current workflows, identifying inefficiencies and mapping out a tailored technical strategy aligned with your business goals.',
    iconName: 'MessageSquare'
  },
  {
    number: '02',
    title: 'I Build',
    description: 'I engineer robust, scalable solutions—whether it\'s a high-converting website or a complex n8n automation ecosystem—keeping you updated every step.',
    iconName: 'Layers'
  },
  {
    number: '03',
    title: 'You Grow',
    description: 'We launch. Your business operates with newfound efficiency, freeing up your time to focus on scaling rather than manual tasks.',
    iconName: 'TrendingUp'
  }
];

// Uzbek translations for work steps
export const WORK_STEPS_UZ: WorkStep[] = [
  {
    number: '01',
    title: 'Suhbatlashamiz',
    description: "Sizning joriy ish jarayonlaringizni chuqur o'rganamiz, samarasiz jihatlarni aniqlaymiz va biznes maqsadlaringizga mos texnik strategiyani tuzamiz.",
    iconName: 'MessageSquare'
  },
  {
    number: '02',
    title: 'Men quraman',
    description: "Men mustahkam, kengaytiriladigan yechimlarni yarataman — yuqori konversiyali veb-sayt yoki murakkab n8n avtomatlashtirish ekotizimlari, sizni har bosqichda xabardor qilib boraman.",
    iconName: 'Layers'
  },
  {
    number: '03',
    title: "Siz o'sasiz",
    description: "Ishga tushiramiz. Biznesingiz yangi samaradorlik bilan ishlaydi, vaqtingizni qo'lda bajariladigan vazifalardan ko'ra rivojlanishga e'tibor qaratishga bo'shatadi.",
    iconName: 'TrendingUp'
  }
];

export const AUTOMATION_PROJECTS: Project[] = [
  {
    id: 'auto-1',
    title: 'Real Estate Lead Capture System',
    description: 'n8n workflow for lead capture/qualification.',
    tags: ['n8n', 'OpenAI', 'Telegram API', 'Google Sheets'],
    type: 'automation',
    mockType: 'workflow',
    extendedDescription: 'A complete custom webhook-triggered n8n workflow designed for real estate agencies. Built to run either in the cloud or self-hosted on your own secure private VPS to eliminate monthly subscription limits and ensure 100% data privacy. When a new inquiry hits the website, our workflow runs it through OpenAI for intent analysis, extracts crucial details like budget and property type, saves them directly into Google Sheets, and alerts the agents via Telegram in real-time.',
    features: [
      'Webhook listener for fast, low-latency integration with contact forms.',
      'AI intent analysis & qualification utilizing OpenAI / Gemini model APIs.',
      'Instant notifications dispatched directly to agent groups in Telegram.',
      'Deployable on secure private VPS to eliminate n8n subscription costs.'
    ],
    impact: 'Reduced response time from 4 hours to 45 seconds, resulting in a 2.4x increase in lead qualification rate and preventing prospects from going to competitors.'
  },
  {
    id: 'auto-3',
    title: 'Multi-Channel Booking for Restaurant',
    description: 'Omnichannel booking widget & Telegram bot with knowledge base answers.',
    tags: ['n8n', 'Telegram API', 'Google Calendar', 'Vector DB'],
    type: 'automation',
    mockType: 'flow',
    extendedDescription: 'An omnichannel restaurant assistant that lives on your website widget and Telegram simultaneously. Using a centralized vector knowledge base, the agent seamlessly answers complex customer questions (about menus, dietary restrictions, dress codes, or directions) while handling real-time booking flows synced directly to Google Calendar.',
    features: [
      'RAG-powered knowledge base answering instant FAQs about recipes, menus, and policies.',
      'Conversational booking flow checking real-time tables and logging into Google Sheets.',
      'Intelligent routing of high-value banquet or catering inquiries directly to staff.'
    ],
    impact: 'Consolidated reservation streams across channels, reduced host phone call load by 65%, and answered 100% of ingredient or FAQ questions instantly using a custom knowledge base.'
  },
  {
    id: 'auto-4',
    title: 'AI Appointment Setter for Clinic',
    description: 'Telegram booking agent with Google Calendar sync.',
    tags: ['OpenAI', 'Telegram API', 'Google Calendar', 'Node.js'],
    type: 'automation',
    mockType: 'calendar',
    extendedDescription: 'A highly advanced Telegram booking agent synced with Google Calendar. Patients can add, update, delete, or reschedule appointments dynamically via chat. The agent answers pre-operation questions, calculates treatment or service prices, and features a cron-scheduler for same-day morning reminders to eliminate no-shows.',
    features: [
      'Full CRUD actions (create, update, delete, reschedule) synced with Google Calendar.',
      'Conversational treatment pricing calculator and general FAQ responder.',
      'Active patient-care Q&A trained on clinic guidelines and operation policies.',
      'Same-day morning reminder scheduler dispatching automated Telegram alerts.'
    ],
    impact: 'Automated 160+ monthly patient touchpoints, reducing front-desk scheduling work by 75% and cutting appointment no-show rates to under 2%.'
  }
];

// Uzbek translations for automation projects
export const AUTOMATION_PROJECTS_UZ: Project[] = [
  {
    id: 'auto-1',
    title: "Ko'chmas mulk lead yig'ish tizimi",
    description: 'n8n ish jarayoni lead yig\'ish/saralash uchun.',
    tags: ['n8n', 'OpenAI', 'Telegram API', 'Google Sheets'],
    type: 'automation',
    mockType: 'workflow',
    extendedDescription: "Ko'chmas mulk agentliklari uchun maxsus webhook orqali ishga tushiriladigan n8n ish jarayoni. Bulutda yoki o'zingizning shaxsiy VPSingizda ishlashga mo'ljallangan bo'lib, oylik obuna cheklovlarini yo'q qiladi va 100% ma'lumot maxfiyligini ta'minlaydi. Yangi so'rov veb-saytga kelganda, ish jarayoni uni OpenAI orqali tahlil qiladi, muhim ma'lumotlarni (byudjet, mulk turi) ajratib oladi, Google Sheets ga saqlaydi va agentlarni Telegram orqali real vaqtda xabardor qiladi.",
    features: [
      "Kontakt formalar bilan tezkor integratsiya uchun Webhook tinglovchisi.",
      'OpenAI / Gemini modellari yordamida AI niyat tahlili va saralash.',
      "Telegram guruhlariga to'g'ridan-to'g'ri jo'natiladigan tezkor bildirishnomalar.",
      "n8n obuna xarajatlarini yo'q qilish uchun xavfsiz shaxsiy VPS ga joylashtirish."
    ],
    impact: "Javob vaqtini 4 soatdan 45 soniyagacha qisqartirdi, lead saralash darajasini 2.4 barobarga oshirdi va mijozlarning raqobatchilarga ketishining oldini oldi."
  },
  {
    id: 'auto-3',
    title: 'Restoran uchun ko\'p kanalli bron qilish',
    description: 'Bilimlar bazasiga ega omnichannel bron vidjeti va Telegram boti.',
    tags: ['n8n', 'Telegram API', 'Google Calendar', 'Vector DB'],
    type: 'automation',
    mockType: 'flow',
    extendedDescription: "Veb-sayt vidjeti va Telegram orqali bir vaqtning o'zida ishlaydigan restoran yordamchisi. Markazlashtirilgan vektor bilimlar bazasidan foydalanib, mijozlarning murakkab savollariga (menyu, parhez cheklovlari, kiyinish qoidalari) javob beradi va Google Calendar bilan sinxronlangan real vaqtda bron qilish jarayonini boshqaradi.",
    features: [
      "Retseptlar, menyu va siyosatlar haqida tezkor FAQ uchun RAG-quvvatli bilimlar bazasi.",
      "Real vaqt jadvallarini tekshiruvchi va Google Sheets ga ma'lumotlarni yozuvchi suhbat bron qilish jarayoni.",
      "Yuqori qiymatli banket yoki tadbirlar uchun so'rovlarni xodimlarga aqlli yo'naltirish."
    ],
    impact: "Kanal bo'ylab bron oqimlarini birlashtirdi, telefon qo'ng'iroqlari yukini 65% ga kamaytirdi va ingredient yoki FAQ savollariga 100% tezkor javob berdi."
  },
  {
    id: 'auto-4',
    title: 'Klinika uchun AI uchrashuv tayinlagich',
    description: 'Google Calendar sinxronizatsiyasi bilan Telegram bron agenti.',
    tags: ['OpenAI', 'Telegram API', 'Google Calendar', 'Node.js'],
    type: 'automation',
    mockType: 'calendar',
    extendedDescription: "Google Calendar bilan sinxronlangan ilg'or Telegram bron agenti. Bemorlar chat orqali uchrashuvlarni qo'shishi, yangilashi, o'chirishi yoki boshqa vaqtga ko'chirishi mumkin. Agent operatsiyadan oldingi savollarga javob beradi, davolash narxlarini hisoblaydi va kelmasliklarni bartaraf etish uchun ertalabki eslatmalarni yuboradi.",
    features: [
      "Google Calendar bilan sinxronlangan to'liq CRUD amallari (yaratish, yangilash, o'chirish, ko'chirish).",
      "Suhbatdosh davolash narxlari kalkulyatori va umumiy FAQ javob beruvchi.",
      "Klinika ko'rsatmalari bo'yicha o'qitilgan faol bemor parvarishi savol-javob tizimi.",
      "Avtomatik Telegram eslatmalarini yuboruvchi kundalik ertalabki eslatma rejalashtiruvchisi."
    ],
    impact: "Oylik 160+ bemor bilan aloqa nuqtasini avtomatlashtirdi, qabulxona ishini 75% ga qisqartirdi va kelmaslik darajasini 2% dan pastga tushirdi."
  }
];

export const WEB_PROJECTS: Project[] = [
  {
    id: 'web-1',
    title: 'Restaurant Landing Page',
    description: 'Full visual landing page for an Italian restaurant with online reservation, menu showcase, and Google Maps integration.',
    tags: ['HTML/CSS', 'JavaScript', 'Lead Gen'],
    type: 'web',
    mockType: 'restaurant',
    extendedDescription: 'A high-conversion landing page built for an authentic Italian restaurant. The design highlights artisan food photos, features a live interactive online reservation form, displays a dynamic menu catalog, and embeds Google Maps for seamless location finding.',
    features: [
      'Fully responsive menu showcase with categorization (pasta, pizza, drinks).',
      'Custom online table booking widget notifying owners instantly via email.',
      'Optimized load speeds with image-lazy-loading and responsive layouts.',
      'Google Maps API integration for direct directions routing.'
    ],
    impact: 'Generated 430+ online reservation bookings in the first month of launch, driving a noticeable lift in weekend table turns.'
  },
  {
    id: 'web-3',
    title: 'Website for Gym',
    description: 'Professional gym website with program showcase, transformation galleries, and booking integration.',
    tags: ['HTML/CSS', 'Calendly API'],
    type: 'web',
    mockType: 'fitness',
    extendedDescription: 'A professional, high-impact website built for a fitness gym. Features interactive transformation sliders, program cards with clear pricing, high-converting copy, and an embedded booking calendar for consultation calls.',
    features: [
      'Interactive before/after transformation image sliders.',
      'Gym program cards with benefit pillars and pricing tiers.',
      'Seamless booking calendar integration for trial sessions.',
      'Performance-tuned layout scoring 98+ on Lighthouse SEO metrics.'
    ],
    impact: 'Helped the gym sign 14 premium coaching clients in the first 3 weeks by turning Instagram traffic into pre-scheduled calendar calls.'
  },
  {
    id: 'web-travel',
    title: 'Travel & Destinations',
    description: 'Beautiful travel landing page with destination showcase, itinerary builder, and booking flow.',
    tags: ['HTML/CSS', 'JavaScript'],
    type: 'web',
    mockType: 'travel',
    extendedDescription: 'A visually immersive travel landing page designed to inspire wanderlust. Features stunning destination galleries, an interactive trip planner, and a streamlined inquiry form for custom travel packages.',
    features: [
      'Responsive destination showcase with high-quality imagery.',
      'Interactive trip builder allowing users to customize packages.',
      'Seamless inquiry-to-booking form with email notifications.',
      'Mobile-first design with smooth scroll animations.'
    ],
    impact: 'Drove 85+ qualified travel inquiries in the first month with a clean, trust-building design that reduced bounce rate by 40%.'
  }
];

// Uzbek translations for web projects
export const WEB_PROJECTS_UZ: Project[] = [
  {
    id: 'web-1',
    title: 'Restoran Landing Page',
    description: "Onlayn bron qilish, menyu namoyishi va Google Maps integratsiyasi bilan italyan restorani uchun to'liq vizual landing page.",
    tags: ['HTML/CSS', 'JavaScript', 'Lead Gen'],
    type: 'web',
    mockType: 'restaurant',
    extendedDescription: "Haqiqiy italyan restorani uchun yuqori konversiyali landing page. Dizayn hunarmand taomlar fotosuratlarini, jonli interaktiv onlayn bron qilish formasini, dinamik menyu katalogini va joylashuvni topish uchun Google Maps integratsiyasini o'z ichiga oladi.",
    features: [
      "Kategoriyalash bilan to'liq moslashuvchan menyu namoyishi (pasta, pizza, ichimliklar).",
      "Egasi uchun elektron pochta orqali tezkor xabarlar yuboradigan maxsus onlayn stol bron qilish vidjeti.",
      "Rasmlarni kechiktirib yuklash va moslashuvchan dizayn bilan tezlashtirilgan yuklash tezligi.",
      "To'g'ridan-to'g'ri yo'nalishlar uchun Google Maps API integratsiyasi."
    ],
    impact: "Birinchi oyda 430+ onlayn bron qilishni yaratdi va dam olish kunlari stol aylanishlarini sezilarli darajada oshirdi."
  },
  {
    id: 'web-3',
    title: 'Sport zal uchun veb-sayt',
    description: "Dastur namoyishi, transformatsiya galereyalari va bron integratsiyasi bilan professional sport zali veb-sayti.",
    tags: ['HTML/CSS', 'Calendly API'],
    type: 'web',
    mockType: 'fitness',
    extendedDescription: "Fitness sport zali uchun professional, yuqori ta'sirli veb-sayt. Interaktiv oldin/keyin slayderlari, aniq narxlash bilan dastur kartalari, yuqori konversiyali matn va maslahat qo'ng'iroqlari uchun o'rnatilgan bron kalendarini o'z ichiga oladi.",
    features: [
      "Interaktiv oldin/keyin transformatsiya slayderlari.",
      "Foyda ustunlari va narx darajalari bilan sport zal dasturlari kartalari.",
      "Sinov sessiyalari uchun uzluksiz bron kalendar integratsiyasi.",
      "Lighthouse SEO ko'rsatkichlarida 98+ ballga ega optimallashtirilgan dizayn."
    ],
    impact: "Instagram trafigini oldindan rejalashtirilgan kalendar qo'ng'iroqlariga aylantirib, sport zaliga dastlabki 3 haftada 14 ta premium murabbiylik mijozini imzolashga yordam berdi."
  },
  {
    id: 'web-travel',
    title: 'Sayohat va yo\'nalishlar',
    description: "Yo'nalishlar namoyishi, marshrut yaratuvchi va bron qilish bilan chiroyli sayohat landing page.",
    tags: ['HTML/CSS', 'JavaScript'],
    type: 'web',
    mockType: 'travel',
    extendedDescription: "Sayohat ishtiyoqini uyg'otish uchun vizual jozibali landing page. Ajoyib yo'nalish galereyalari, interaktiv sayohat rejalashtiruvchisi va maxsus sayohat paketlari uchun soddalashtirilgan so'rov formasini o'z ichiga oladi.",
    features: [
      "Yuqori sifatli tasvirlar bilan moslashuvchan yo'nalish namoyishi.",
      "Foydalanuvchilarga paketlarni sozlash imkonini beruvchi interaktiv sayohat yaratuvchi.",
      "Elektron pochta bildirishnomalari bilan uzluksiz so'rovdan-bronga forma.",
      "Silliq skroll animatsiyalari bilan mobil-birinchi dizayn."
    ],
    impact: "Birinchi oyda 85+ malakali sayohat so'rovlarini jalb qildi va ishonchni mustahkamlovchi dizayn bilan chiqish ko'rsatkichini 40% ga kamaytirdi."
  }
];

export const TOOLS: Tool[] = [
  { name: 'n8n', category: 'Automation', iconName: 'Workflow' },
  { name: 'Claude API', category: 'Development', iconName: 'BrainCircuit' },
  { name: 'OpenAI API', category: 'AI', iconName: 'Sparkles' },
  { name: 'Voiceflow', category: 'Chatbots', iconName: 'MessageSquareText' },
  { name: 'Botpress', category: 'Chatbots', iconName: 'Bot' },
  { name: 'HTML/CSS', category: 'Frontend', iconName: 'Layout' },
  { name: 'JavaScript', category: 'Frontend', iconName: 'Code2' },
  { name: 'React', category: 'Frontend', iconName: 'Atom' },
  { name: 'Tailwind CSS', category: 'Frontend', iconName: 'Paintbrush' },
  { name: 'Stitch', category: 'Design', iconName: 'PenTool' },
  { name: 'Supabase Postgres', category: 'Database', iconName: 'Database' },
  { name: 'Google Console API', category: 'Integration', iconName: 'Globe' }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does the lead generation automation actually work?',
    answer: 'It\'s simple. I place a smart widget on your website — similar to the chat bubble you see on this page. When a visitor interacts with it, the AI qualifies them as a lead, captures their details, and saves everything to your CRM or spreadsheet. You get a notification on Telegram, WhatsApp, or email in under a second. No leads slip through.'
  },
  {
    question: 'What can the AI chatbot handle without me?',
    answer: 'It can handle up to 80% of routine client inquiries like checking order status, booking appointments, responding to FAQs, and retrieving account details. If a request is too complex, it seamlessly gathers the contact info and hands it off to your human team.'
  },
  {
    question: 'I don\'t use a fancy CRM. Will this still work?',
    answer: 'Absolutely! While CRM integrations are clean, we can sync your leads directly with Google Sheets, Airtable, Notion, Slack, or send them as clean, real-time alerts to your Telegram/WhatsApp chat. We build to fit your current setup.'
  },
  {
    question: 'How fast do I see results?',
    answer: 'Most automations and landing pages are built and live within 5 to 7 days. Once launched, lead notification streams, automated calendar bookings, and database entries operate in real-time instantly.'
  },
  {
    question: 'What if I need changes later?',
    answer: 'I design with adaptability in mind and provide 30 days of post-launch hyper-support. After that, we can set up a lightweight monthly care plan or train your team on how to tweak simple rules.'
  },
  {
    question: 'Can you deploy automations on a self-hosted private VPS?',
    answer: 'Absolutely! I specialize in setting up self-hosted instances of n8n, CapRover, or Coolify on private Virtual Private Servers (VPS) like DigitalOcean or Hetzner. This gives you 100% data privacy, unlimited monthly workflow runs, and saves hundreds of dollars in SaaS subscription fees by bypassing cloud pricing limits.'
  },
  {
    question: 'Can this work for my specific industry?',
    answer: 'Yes. I have built workflows for e-commerce, real estate agencies, clinical practices, coaching, SaaS waitlists, and local services. If your business repeats a digital task daily, we can automate it.'
  }
];

// Uzbek translations for FAQ
export const FAQ_ITEMS_UZ: FAQItem[] = [
  {
    question: "Lead avtomatlashtirish aslida qanday ishlaydi?",
    answer: "Bu juda oddiy. Men veb-saytingizga aqlli vidjet o'rnataman — bu sahifadagi chat qarshisiga o'xshash. Tashrif buyuruvchi u bilan muloqotga kirishganda, AI ularni lead sifatida saralaydi, ma'lumotlarini oladi va hamma narsani CRM yoki jadvalingizga saqlaydi. Siz Telegram, WhatsApp yoki elektron pochta orqali bir soniya ichida bildirishnoma olasiz. Hech qanday lead yo'qolmaydi."
  },
  {
    question: 'AI chatbot mensiz nimani bajara oladi?',
    answer: "U buyurtma holatini tekshirish, uchrashuvlarni bron qilish, tez-tez so'raladigan savollarga javob berish va hisob ma'lumotlarini olish kabi 80% gacha odatiy mijoz so'rovlarini bajara oladi. Agar so'rov juda murakkab bo'lsa, u kontakt ma'lumotlarini to'playdi va sizning jamoangizga uzatadi."
  },
  {
    question: "Men murakkab CRM ishlatmayman. Bu baribir ishlaydimi?",
    answer: "Albatta! CRM integratsiyalari toza bo'lsa-da, biz leadlaringizni to'g'ridan-to'g'ri Google Sheets, Airtable, Notion, Slack bilan sinxronlashimiz yoki ularni Telegram/WhatsApp chatingizga real vaqtda xabarlar sifatida yuborishimiz mumkin. Biz sizning mavjud tizimingizga moslashamiz."
  },
  {
    question: "Natijalarni qanchalik tez ko'raman?",
    answer: "Aksariyat avtomatlashtirish va landing pagelar 5-7 kun ichida quriladi va ishga tushiriladi. Ishga tushirilgandan so'ng, lead bildirishnomalari, avtomatik kalendar bronlari va ma'lumotlar bazasi yozuvlari real vaqtda ishlaydi."
  },
  {
    question: "Keyinchalik o'zgartirishlar kerak bo'lsa-chi?",
    answer: "Men moslashuvchanlikni hisobga olgan holda dizayn yarataman va ishga tushirilgandan keyin 30 kunlik yuqori darajadagi qo'llab-quvvatlashni ta'minlayman. Shundan so'ng, engil oylik parvarish rejasini o'rnatishimiz yoki jamoangizni oddiy qoidalarni o'zgartirishga o'rgatishimiz mumkin."
  },
  {
    question: "Avtomatlashtirishlarni shaxsiy VPS ga joylashtira olasizmi?",
    answer: "Albatta! Men DigitalOcean yoki Hetzner kabi shaxsiy Virtual Xususiy Serverlarda n8n, CapRover yoki Coolify ni o'rnatishga ixtisoslashganman. Bu sizga 100% ma'lumot maxfiyligi, cheksiz oylik ish jarayonlari va bulut narx cheklovlarini chetlab o'tib, SaaS obuna to'lovlarida yuzlab dollarlarni tejash imkonini beradi."
  },
  {
    question: "Bu mening soham uchun ishlaydimi?",
    answer: "Ha. Men elektron tijorat, ko'chmas mulk agentliklari, klinik amaliyotlar, kouching, SaaS kutish ro'yxatlari va mahalliy xizmatlar uchun ish jarayonlarini yaratganman. Agar biznesingiz har kuni raqamli vazifani takrorlasa, biz uni avtomatlashtira olamiz."
  }
];
