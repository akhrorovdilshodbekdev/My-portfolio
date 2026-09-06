import { Project, Tool, FAQItem, WorkStep, RealProject } from './types';

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
    mockType: 'workflow',
    extendedDescription: 'A complete custom webhook-triggered n8n workflow designed for real estate agencies. Built to run either in the cloud or self-hosted on your own secure private VPS to eliminate monthly subscription limits and ensure 100% data privacy. When a new inquiry hits the website, our workflow runs it through OpenAI for intent analysis, extracts crucial details like budget and property type, saves them directly into Google Sheets, and alerts the agents via Telegram in real-time.',
    features: [
      'Webhook listener for fast, low-latency integration with contact forms.',
      'AI intent analysis & qualification utilizing OpenAI / Gemini model APIs.',
      'Instant notifications dispatched directly to agent groups in Telegram.',
      'Deployable on secure private VPS to eliminate n8n subscription costs.'
    ],
    impact: 'In real estate, the first agent to respond usually wins the deal. This workflow catches every website inquiry the moment it lands — AI instantly qualifies the buyer, logs them to your CRM or sheet, and alerts your agents on Telegram in seconds. Run the live demo above and watch it happen.'
  },
  {
    id: 'auto-3',
    title: 'Multi-Channel Booking for Restaurant',
    description: 'Omnichannel booking widget & Telegram bot with knowledge base answers.',
    tags: ['n8n', 'Telegram API', 'Google Calendar', 'Vector DB'],
    mockType: 'flow',
    extendedDescription: 'An omnichannel restaurant assistant that lives on your website widget and Telegram simultaneously. Using a centralized vector knowledge base, the agent seamlessly answers complex customer questions (about menus, dietary restrictions, dress codes, or directions) while handling real-time booking flows synced directly to Google Calendar.',
    features: [
      'RAG-powered knowledge base answering instant FAQs about recipes, menus, and policies.',
      'Conversational booking flow checking real-time tables and logging into Google Sheets.',
      'Intelligent routing of high-value banquet or catering inquiries directly to staff.'
    ],
    impact: "A host's phone never stops — the same table booked through three channels, the same allergen question on repeat. This assistant answers menu and FAQ questions instantly in chat and funnels every booking request from your website widget and Telegram into one calendar your staff can actually manage."
  },
  {
    id: 'auto-4',
    title: 'AI Appointment Setter for Clinic',
    description: 'Telegram booking agent with Google Calendar sync.',
    tags: ['OpenAI', 'Telegram API', 'Google Calendar', 'Node.js'],
    mockType: 'calendar',
    extendedDescription: 'A highly advanced Telegram booking agent synced with Google Calendar. Patients can add, update, delete, or reschedule appointments dynamically via chat. The agent answers pre-operation questions, calculates treatment or service prices, and features a cron-scheduler for same-day morning reminders to eliminate no-shows.',
    features: [
      'Full CRUD actions (create, update, delete, reschedule) synced with Google Calendar.',
      'Conversational treatment pricing calculator and general FAQ responder.',
      'Active patient-care Q&A trained on clinic guidelines and operation policies.',
      'Same-day morning reminder scheduler dispatching automated Telegram alerts.'
    ],
    impact: "Most no-shows aren't rudeness — they're forgotten appointments. This agent lets patients book, reschedule, and cancel over chat, quotes treatment prices instantly, and sends an automatic reminder the morning of each visit, so your front desk stops playing phone tag."
  }
];

// Uzbek translations for automation projects
export const AUTOMATION_PROJECTS_UZ: Project[] = [
  {
    id: 'auto-1',
    title: "Ko'chmas mulk lead yig'ish tizimi",
    description: 'n8n ish jarayoni lead yig\'ish/saralash uchun.',
    tags: ['n8n', 'OpenAI', 'Telegram API', 'Google Sheets'],
    mockType: 'workflow',
    extendedDescription: "Ko'chmas mulk agentliklari uchun maxsus webhook orqali ishga tushiriladigan n8n ish jarayoni. Bulutda yoki o'zingizning shaxsiy VPSingizda ishlashga mo'ljallangan bo'lib, oylik obuna cheklovlarini yo'q qiladi va 100% ma'lumot maxfiyligini ta'minlaydi. Yangi so'rov veb-saytga kelganda, ish jarayoni uni OpenAI orqali tahlil qiladi, muhim ma'lumotlarni (byudjet, mulk turi) ajratib oladi, Google Sheets ga saqlaydi va agentlarni Telegram orqali real vaqtda xabardor qiladi.",
    features: [
      "Kontakt formalar bilan tezkor integratsiya uchun Webhook tinglovchisi.",
      'OpenAI / Gemini modellari yordamida AI niyat tahlili va saralash.',
      "Telegram guruhlariga to'g'ridan-to'g'ri jo'natiladigan tezkor bildirishnomalar.",
      "n8n obuna xarajatlarini yo'q qilish uchun xavfsiz shaxsiy VPS ga joylashtirish."
    ],
    impact: "Ko'chmas mulkda birinchi bo'lib javob bergan agent odatda mijozni qo'lga kiritadi. Bu ish jarayoni veb-saytdagi har bir so'rovni paydo bo'lishi bilan qabul qiladi — AI uni darhol saralaydi, CRM yoki jadvalingizga yozadi va agentlarni soniyalar ichida Telegram orqali ogohlantiradi. Yuqoridagi jonli demoda sinab ko'ring."
  },
  {
    id: 'auto-3',
    title: 'Restoran uchun ko\'p kanalli bron qilish',
    description: 'Bilimlar bazasiga ega omnichannel bron vidjeti va Telegram boti.',
    tags: ['n8n', 'Telegram API', 'Google Calendar', 'Vector DB'],
    mockType: 'flow',
    extendedDescription: "Veb-sayt vidjeti va Telegram orqali bir vaqtning o'zida ishlaydigan restoran yordamchisi. Markazlashtirilgan vektor bilimlar bazasidan foydalanib, mijozlarning murakkab savollariga (menyu, parhez cheklovlari, kiyinish qoidalari) javob beradi va Google Calendar bilan sinxronlangan real vaqtda bron qilish jarayonini boshqaradi.",
    features: [
      "Retseptlar, menyu va siyosatlar haqida tezkor FAQ uchun RAG-quvvatli bilimlar bazasi.",
      "Real vaqt jadvallarini tekshiruvchi va Google Sheets ga ma'lumotlarni yozuvchi suhbat bron qilish jarayoni.",
      "Yuqori qiymatli banket yoki tadbirlar uchun so'rovlarni xodimlarga aqlli yo'naltirish."
    ],
    impact: "Qabulxona telefoni tinmay jiringlaydi — bitta stol uch kanal orqali band qilinadi, bir xil allergen savollari takrorlanadi. Bu yordamchi menyu va FAQ savollariga chatda darhol javob beradi hamda veb-sayt vidjeti va Telegram orqali kelgan barcha bron so'rovlarini xodimlar boshqara oladigan bitta kalendarga jamlaydi."
  },
  {
    id: 'auto-4',
    title: 'Klinika uchun AI uchrashuv tayinlagich',
    description: 'Google Calendar sinxronizatsiyasi bilan Telegram bron agenti.',
    tags: ['OpenAI', 'Telegram API', 'Google Calendar', 'Node.js'],
    mockType: 'calendar',
    extendedDescription: "Google Calendar bilan sinxronlangan ilg'or Telegram bron agenti. Bemorlar chat orqali uchrashuvlarni qo'shishi, yangilashi, o'chirishi yoki boshqa vaqtga ko'chirishi mumkin. Agent operatsiyadan oldingi savollarga javob beradi, davolash narxlarini hisoblaydi va kelmasliklarni bartaraf etish uchun ertalabki eslatmalarni yuboradi.",
    features: [
      "Google Calendar bilan sinxronlangan to'liq CRUD amallari (yaratish, yangilash, o'chirish, ko'chirish).",
      "Suhbatdosh davolash narxlari kalkulyatori va umumiy FAQ javob beruvchi.",
      "Klinika ko'rsatmalari bo'yicha o'qitilgan faol bemor parvarishi savol-javob tizimi.",
      "Avtomatik Telegram eslatmalarini yuboruvchi kundalik ertalabki eslatma rejalashtiruvchisi."
    ],
    impact: "Ko'pchilik kelmasliklar — beadablik emas, shunchaki unutilgan uchrashuvlar. Bu agent bemorlarga chat orqali bron qilish, vaqtini o'zgartirish va bekor qilish imkonini beradi, davolash narxlarini darhol aytadi va har bir tashrif kuni ertalab avtomatik eslatma yuboradi — qabulxonangiz telefon bilan o'ynashni to'xtatadi."
  }
];

// ============================================================
// REAL, IN-PRODUCTION WORK — the "client-chargeable" proof.
// Facts come from the client (Ideal Edu Centre) and from the real
// app behavior — do not present anything here as more than it is.
// ============================================================
const EDU_NAME = 'Ideal Edu Centre';
const EDU_WEBSITE_URL = 'https://idealeducentre.netlify.app/';
// The mobile app is PRIVATE — the client asked for an internal-only management app,
// so it is NOT on any app store and gets no public link. The card shows app screenshots
// instead, under an honest "shown with permission" tag. Screenshots must contain no real
// student/parent data and the client must have approved public display.
export const ASSISTANT_IMAGE = '/images/aiassistant.jpg'; // the 56-node graph screenshot the user supplied
export const ASSISTANT_NAME = 'Scribe AI';

export const REAL_PROJECTS: RealProject[] = [
  {
    id: 'edu',
    eyebrow: 'CLIENT PROJECT · WEBSITE + MOBILE APP',
    title: EDU_NAME,
    summary:
      "A public website for Ideal Edu Centre, plus a private management app the center runs on every day — the admin side handles the money and the big picture, while each teacher runs their own groups and classes.",
    bullets: [
      'Admin: log payments, manage and reschedule groups, and see income reports by student',
      'Deleted students are never lost — they move to a separate list and can be restored in one tap if they come back',
      'Teachers: create groups, add or move students between them, and log attendance',
    ],
    tech: ['Admin + Teacher roles', 'Attendance', 'Payments & reports', 'Student restore'],
    imageTag: "Client's private app — shown with permission",
    screens: [
      {
        src: '/images/edu-app-1.png.jpg',
        alt: 'Admin overview screen of the Ideal Edu Centre app',
        caption: 'Admin — the whole center at a glance',
      },
      {
        src: '/images/edu-app-2.png.jpg',
        alt: 'Teacher portal home screen of the Ideal Edu Centre app',
        caption: 'Teacher portal — manage your own groups',
      },
      {
        src: '/images/edu-app-3.png.jpg',
        alt: 'Students section of the Ideal Edu Centre app showing groups and student counts',
        caption: 'Students — every group and its student count',
      },
    ],
    links: [{ label: 'Visit the website', href: EDU_WEBSITE_URL, external: true }],
  },
  {
    id: 'assistant',
    eyebrow: 'AI PRODUCT · SELF-HOSTED',
    title: `${ASSISTANT_NAME} — 56-node AI assistant`,
    summary:
      "Scribe AI is a real, working AI assistant. Talk to it by voice or text — it schedules events, drafts emails, runs research, and turns PDFs into clean summaries. It keeps its own memory in PostgreSQL, searches a Qdrant vector store, and runs self-hosted in Docker, so a business's data stays on its own infrastructure.",
    bullets: [
      'Voice and text conversations',
      'Schedules events, drafts emails, and researches topics',
      'Reads PDFs and produces clean summaries',
      'Self-hosted in Docker — deploy it for your business, your data stays yours',
    ],
    tech: ['56-node agent', 'Voice + Text', 'PostgreSQL', 'Qdrant', 'Docker'],
    image: ASSISTANT_IMAGE,
    imageAlt: 'Architecture graph of the 56-node Scribe AI assistant',
    links: [{ label: 'Build one for your business', href: '#contact', external: false }],
  },
];

export const REAL_PROJECTS_UZ: RealProject[] = [
  {
    id: 'edu',
    eyebrow: 'MIJOZ LOYIHASI · VEB-SAYT + MOBIL ILOVA',
    title: EDU_NAME,
    summary:
      "Ideal Edu Centre uchun ochiq veb-sayt va markaz har kuni ishlaydigan maxfiy boshqaruv ilovasi. Admin qismida pul tushumlari va katta manzara, har bir o'qituvchi esa o'z guruhlari va mashg'ulotlarini ilova orqali yuritadi.",
    bullets: [
      "Admin: to'lovlarni qayd etish, guruhlarni boshqarish va qayta rejalashtirish, o'quvchi bo'yicha tushum hisobotlari",
      "O'chirilgan o'quvchi yo'qolmaydi — alohida ro'yxatda saqlanadi va qaytsa, bir bosishda tiklanadi",
      "O'qituvchi: guruh yaratish, o'quvchilarni qo'shish yoki ko'chirish va davomatni belgilash",
    ],
    tech: ["Admin + O'qituvchi", 'Davomat', "To'lovlar va hisobotlar", "O'quvchini tiklash"],
    imageTag: "Mijozning maxfiy ilovasi — ruxsat bilan ko'rsatilmoqda",
    screens: [
      {
        src: '/images/edu-app-1.png.jpg',
        alt: "Ideal Edu Centre ilovasining admin ko'rinishdagi bosh ekrani",
        caption: 'Admin — butun markaz bir qarashda',
      },
      {
        src: '/images/edu-app-2.png.jpg',
        alt: "Ideal Edu Centre ilovasining o'qituvchi paneldagi bosh ekrani",
        caption: "O'qituvchi paneli — o'z guruhlaringizni boshqaring",
      },
      {
        src: '/images/edu-app-3.png.jpg',
        alt: "Ideal Edu Centre ilovasining guruhlar va o'quvchilar soni ko'rinadigan bo'limi",
        caption: 'O\'quvchilar — har bir guruh va uning o\'quvchilar soni',
      },
    ],
    links: [{ label: 'Veb-saytni ko\'rish', href: EDU_WEBSITE_URL, external: true }],
  },
  {
    id: 'assistant',
    eyebrow: "AI MAHSULOT · O'Z SERVERIDA",
    title: `${ASSISTANT_NAME} — 56 tugunli AI yordamchi`,
    summary:
      "Scribe AI — haqiqiy, ishlayotgan AI yordamchi. Unga ovoz yoki matn orqali gapiring — u tadbirlarni rejalashtiradi, elektron xatlar yozadi, ma'lumot qidiradi va PDFlarni aniq xulosaga aylantiradi. Xotirasini PostgreSQLda saqlaydi, Qdrant vektor bazasidan qidiradi va Dockerda o'z serverida ishlaydi — shuning uchun biznes ma'lumotlari o'z infratuzilmasida qoladi.",
    bullets: [
      'Ovozli va matnli muloqot',
      "Tadbirlarni rejalashtiradi, xat yozadi va ma'lumot qidiradi",
      "PDFlarni o'qib, aniq xulosa chiqaradi",
      "Dockerda o'z serverida ishlaydi — biznesingiz uchun joylashtiring, ma'lumotlaringiz sizda qoladi",
    ],
    tech: ['56 tugunli agent', 'Ovoz + Matn', 'PostgreSQL', 'Qdrant', 'Docker'],
    image: ASSISTANT_IMAGE,
    imageAlt: "56 tugunli Scribe AI yordamchisining arxitektura grafigi",
    links: [{ label: 'Biznesingiz uchun ham quraman', href: '#contact', external: false }],
  },
];

export const TOOLS: Tool[] = [
  { name: 'n8n', category: 'Automation', brand: 'n8n' },
  { name: 'Claude API', category: 'Development', brand: 'claude' },
  { name: 'OpenAI API', category: 'AI', brand: 'openai' },
  { name: 'HTML/CSS', category: 'Frontend', brand: 'htmlcss' },
  { name: 'JavaScript', category: 'Frontend', brand: 'javascript' },
  { name: 'React', category: 'Frontend', brand: 'react' },
  { name: 'Tailwind CSS', category: 'Frontend', brand: 'tailwind' },
  { name: 'Stitch', category: 'Design', brand: 'generic' },
  { name: 'Supabase Postgres', category: 'Database', brand: 'supabase' },
  { name: 'Google Console API', category: 'Integration', brand: 'googleCloud' }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What do you actually build?',
    answer: 'Three things — and I often combine them. (1) Websites: fast landing pages and full multi-page sites, delivered with the domain, hosting, and SEO set up for you as one done-for-you package. (2) Native mobile apps for Android. (3) AI automation: assistants and workflows that capture leads, take bookings, and answer support 24/7. Many projects are one of these; the strongest ones pair a website with an AI assistant on top.'
  },
  {
    question: 'I run a local business and don\'t have a website yet. Where do I start?',
    answer: 'Start with the full package. I register your domain, set up hosting, build the site, and take care of the SEO basics so Google can actually find you — one person, one fixed price, nothing for you to configure. You don\'t need to bring a domain, hosting, or written copy; I use what you already have (logo, photos, phone number) and write the rest from a short call.'
  },
  {
    question: 'How fast can I go live?',
    answer: 'A landing page or marketing website is typically live within 5–7 days of approval, and most workflow automations land in the same window. A native mobile app takes longer — there\'s more to build and test — so I put an exact timeline in your written proposal before we start. No guessing.'
  },
  {
    question: 'How does the lead-capture automation actually work?',
    answer: 'I place a smart widget or bot where your customers already are — on your website, Telegram, or WhatsApp. When a visitor interacts with it, the AI asks a few qualifying questions, captures the details, saves them to your CRM, spreadsheet, or Notion, and pings you in under a second. No lead slips through.'
  },
  {
    question: 'What can the AI assistant handle on its own?',
    answer: 'The routine stuff: answering FAQs, booking and rescheduling appointments, quoting prices, and checking order or account status. When a request genuinely needs a human, it gathers the contact details and hands off with full context — so your team is never re-asking the same questions.'
  },
  {
    question: 'I don\'t use a CRM. Will this still work?',
    answer: 'Yes. If you have a CRM we connect to it; if not, leads can land in Google Sheets, Notion, Slack, or as clean Telegram/WhatsApp alerts. I build around the tools you already use — not the other way around.'
  },
  {
    question: 'What does it cost?',
    answer: 'It depends on scope, so I give a fixed quote — never hourly surprises. A single landing page is the most affordable option; a custom mobile app or a website-plus-AI project is a bigger investment. The fastest way to get a real number is to send your goal through the contact form — you\'ll get a concrete plan and price within 24 hours.'
  },
  {
    question: 'Can everything run on my own private server?',
    answer: 'Yes — that\'s a specialty. Automations and AI assistants can run self-hosted on a private VPS (n8n, CapRover/Coolify, or Docker), which keeps your data on your own infrastructure and removes per-run SaaS limits. Websites are usually fine on managed hosting; when privacy or volume matters, we go self-hosted.'
  },
  {
    question: 'What happens after launch?',
    answer: 'Every project includes 30 days of hands-on support after we go live. After that, most clients choose a small monthly care plan for updates, tweaks, and backups — or I train your team to make simple changes themselves. Nothing disappears the day we launch.'
  },
  {
    question: 'Can you build for my specific industry?',
    answer: 'Yes. The live demos on this page cover real estate, clinics, and restaurants, and an education centre is a current client — I built its website and its internal management app. If your business repeats a daily digital task or needs more customers online, the same approach applies. Not sure where you fit? Tell me what you do and I\'ll point you to the right starting point.'
  }
];

// Uzbek translations for FAQ
export const FAQ_ITEMS_UZ: FAQItem[] = [
  {
    question: "Aslida nima qurib berasiz?",
    answer: "Uch yo'nalish — va ko'pincha ularni birlashtiraman. (1) Veb-saytlar: tezkor landing pagelar va to'liq ko'p sahifali saytlar; domen, xosting va SEO hammasi tayyor holda — bitta to'liq xizmat sifatida. (2) Android uchun mobil ilovalar. (3) AI avtomatlashtirish: leadlarni yig'adigan, bronlarni qabul qiladigan va 24/7 qo'llab-quvvatlashga javob beradigan yordamchilar va ish jarayonlari. Ko'p loyihalar shulardan biri; eng kuchlilari veb-saytni AI yordamchi bilan birlashtiradi."
  },
  {
    question: "Veb-saytim yo'q, mahalliy biznesman. Qayerdan boshlashim kerak?",
    answer: "To'liq paketdan boshlang. Men domeningizni ro'yxatdan o'tkazaman, xostingni sozlayman, saytni quraman va SEO asoslarini (Google sizni topishi uchun) o'rnataman — bitta odam, bitta qat'iy narx, sizga hech narsa sozlash shart emas. Domen, xosting yoki tayyor matn olib kelishingiz shart emas; bor narsalaringizdan (logo, suratlar, telefon raqam) foydalanaman, qolganini qisqa suhbat asosida yozaman."
  },
  {
    question: "Qanchalik tez ishga tushaman?",
    answer: "Landing page yoki marketing veb-sayti odatda tasdiqlanganidan keyin 5-7 kun ichida ishga tushadi, aksariyat ish jarayonlari avtomatlashtirish ham xuddi shu muddatda. Mobil ilova ko'proq vaqt oladi — qurish va sinash ko'proq — shuning uchun boshlashdan oldin yozma taklifingizga aniq muddatni kiritaman. Taxmin yo'q."
  },
  {
    question: "Lead yig'ish avtomatlashtirishi aslida qanday ishlaydi?",
    answer: "Mijozlaringiz turgan joyga — veb-saytingizga, Telegram yoki WhatsAppga aqlli vidjet yoki bot o'rnataman. Tashrif buyuruvchi u bilan gaplashganda, AI bir nechta saralovchi savol beradi, ma'lumotlarni oladi, CRM, jadval yoki Notionga saqlaydi va sizga bir soniya ichida xabar yuboradi. Hech qanday lead boy bermaysiz."
  },
  {
    question: "AI yordamchi mensiz nimani bajara oladi?",
    answer: "Odatiy ishlarni: tez-tez so'raladigan savollarga javob berish, uchrashuvlarni bron qilish va ko'chirish, narxlarni aytish, buyurtma yoki hisob holatini tekshirish. Agar so'rov haqiqatan odamni talab qilsa, u kontakt ma'lumotlarini to'playdi va to'liq kontekst bilan jamoangizga uzatadi — jamoangiz bir xil savollarni qayta so'rashiga to'g'ri kelmaydi."
  },
  {
    question: "CRM ishlatmayman. Bu baribir ishlaydimi?",
    answer: "Ha. CRMingiz bo'lsa — unga ulanamiz; bo'lmasa, leadlar Google Sheets, Notion, Slack yoki toza Telegram/WhatsApp xabarlari ko'rinishida kelishi mumkin. Men siz foydalanayotgan vositalarga mos quraman — aksincha emas."
  },
  {
    question: "Narxi qancha?",
    answer: "Hajmga bog'liq, shuning uchun qat'iy narx beraman — hech qanday kutilmagan soatlik to'lov yo'q. Bitta landing page eng arzon variant; maxsus mobil ilova yoki veb-sayt + AI loyihasi kattaroq sarmoya. Haqiqiy raqam olishning eng tez yo'li — kontakt forma orqali maqsadingizni yuborish; 24 soat ichida aniq reja va narx olasiz."
  },
  {
    question: "Hammasi o'zimning shaxsiy serverimda ishlay oladimi?",
    answer: "Ha — bu mening ixtisosim. Avtomatlashtirish va AI yordamchilar shaxsiy VPSda (n8n, CapRover/Coolify yoki Docker) ishlashi mumkin — bu ma'lumotlaringiz o'z infratuzilmangizda qolishini ta'minlaydi va SaaS limitlarini yo'q qiladi. Veb-saytlar odatda boshqariladigan xostingda yaxshi; maxfiylik yoki hajm muhim bo'lsa, o'z serveringizga o'tamiz."
  },
  {
    question: "Ishga tushgandan keyin nima bo'ladi?",
    answer: "Har bir loyiha ishga tushgandan keyin 30 kunlik jonli qo'llab-quvvatlashni o'z ichiga oladi. Shundan so'ng ko'pchilik mijozlar yangilanishlar, sozlashlar va zaxira nusxalar uchun kichik oylik parvarish rejasini tanlaydi — yoki jamoangizni oddiy o'zgarishlarni o'zi qilishga o'rgataman. Ishga tushgan kunimizda hammasi yo'qolib ketmaydi."
  },
  {
    question: "Mening soham uchun qura olasizmi?",
    answer: "Ha. Bu sahifadagi jonli demolar ko'chmas mulk, klinika va restoranni qamrab oladi, ta'lim markazi esa hozirgi mijozim — uning veb-saytini va ichki boshqaruv ilovasini qurdim. Agar biznesingiz har kuni raqamli vazifani takrorlasa yoki onlayn mijozlarga muhtoj bo'lsa, xuddi shu yondashuv ishlaydi. Qayerga mos kelishingizga ishonchingiz komil bo'lmasa, nima qilishingizni ayting — men to'g'ri boshlanish nuqtasini ko'rsataman."
  }
];
