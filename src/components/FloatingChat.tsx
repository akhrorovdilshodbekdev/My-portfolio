import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, Sparkles, User, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

// Simulated bot responses for free-text input
function simulateResponse(input: string, lang: string): string {
  const lower = input.toLowerCase();
  
  const responses: Record<string, { en: string; uz: string }> = {
    pricing: {
      en: "Pricing depends on the scope. A standard n8n workflow automation starts around $500–$1,200. A landing page starts at $400. Want me to quote your specific project? Just fill out the contact form below!",
      uz: "Narx loyiha hajmiga bog'liq. Standart n8n avtomatlashtirish $500–$1,200 dan boshlanadi. Landing page $400 dan boshlanadi. Maxsus loyihangiz uchun narx kerakmi? Quyidagi kontakt formani to'ldiring!"
    },
    website: {
      en: "I build high-converting landing pages using modern HTML/CSS, JavaScript, and React. Full build takes 5–7 days. Check the 'Websites I've Designed' gallery above!",
      uz: "Men zamonaviy HTML/CSS, JavaScript va React yordamida yuqori konversiyali landing pagelar yarataman. To'liq qurilish 5-7 kun davom etadi. Yuqoridagi 'Men ishlab chiqqan veb-saytlar' galereyasini ko'ring!"
    },
    automation: {
      en: "I build custom n8n automation workflows, AI agents, and chatbots. From lead capture to appointment booking — I can automate almost any repetitive business task. Which area of your business needs automation?",
      uz: "Men maxsus n8n avtomatlashtirish ish jarayonlari, AI agentlar va chatbotlarni yarataman. Lead yig'ishdan tortib uchrashuv bron qilishgacha — deyarli har qanday takroriy biznes vazifasini avtomatlashtira olaman. Biznesingizning qaysi sohasi avtomatlashtirishga muhtoj?"
    },
    contact: {
      en: "You can reach me directly on Telegram: @akhrorov_dilshodbek. Or fill out the contact form at the bottom of this page — I'll respond within 24 hours with a plan.",
      uz: "Menga Telegram orqali bog'lanishingiz mumkin: @akhrorov_dilshodbek. Yoki sahifaning pastki qismidagi kontakt formani to'ldiring — men 24 soat ichida reja bilan javob beraman."
    },
    hello: {
      en: "Hey there! 👋 I'm Akhrorov's AI assistant. Need help with custom automations, AI chatbots, or a new website? Pick a suggestion below or ask me anything!",
      uz: "Assalomu alaykum! 👋 Men Akhrorovning AI yordamchisiman. Maxsus avtomatlashtirish, AI chatbotlar yoki yangi veb-sayt kerakmi? Quyidagi takliflardan birini tanlang yoki istalgan savolni bering!"
    },
    cost: {
      en: "Each project is custom-quoted based on your needs, but here's a rough guide:\n\n• n8n Workflow: $500–$2,000\n• AI Chatbot: $800–$2,500\n• Landing Page: $400–$1,500\n• Full Web App: $2,000–$8,000+\n\nWant an exact quote? Hit the contact form!",
      uz: "Har bir loyiha ehtiyojlaringizga qarab narxlanadi, biroq taxminiy narxlar:\n\n• n8n Ish jarayoni: $500–$2,000\n• AI Chatbot: $800–$2,500\n• Landing Page: $400–$1,500\n• To'liq Veb-ilova: $2,000–$8,000+\n\nAniq narx kerakmi? Kontakt formani to'ldiring!"
    },
    timeline: {
      en: "Most standard projects (automation workflows & landing pages) are built, tested, and live within 5–7 business days. More complex AI agents may take 10–14 days.",
      uz: "Oddiy loyihalar (avtomatlashtirish va landing pagelar) 5-7 ish kuni ichida quriladi, sinovdan o'tkaziladi va ishga tushiriladi. Murakkab AI agentlar 10-14 kun olishi mumkin."
    },
    tech: {
      en: "My core stack: n8n, OpenAI/Gemini APIs, React, Tailwind CSS, Node.js, Supabase, Google APIs, and Telegram/WhatsApp integrations. All automation workflows can be self-hosted on a private VPS.",
      uz: "Asosiy texnologiyalarim: n8n, OpenAI/Gemini API, React, Tailwind CSS, Node.js, Supabase, Google API va Telegram/WhatsApp integratsiyalari. Barcha avtomatlashtirish ish jarayonlari shaxsiy VPS da joylashtirilishi mumkin."
    }
  };

  // Intent matching
  if (lower.includes('narx') || lower.includes('qancha') || lower.includes('narhi') || lower.includes('pric') || lower.includes('cost') || lower.includes('how much') || lower.includes('qiymat')) {
    return lang === 'uz' ? responses.pricing.uz : responses.pricing.en;
  }
  if (lower.includes('veb') || lower.includes('sayt') || lower.includes('website') || lower.includes('site') || lower.includes('landing')) {
    return lang === 'uz' ? responses.website.uz : responses.website.en;
  }
  if (lower.includes('avtomat') || lower.includes('automation') || lower.includes('workflow') || lower.includes('bot')) {
    return lang === 'uz' ? responses.automation.uz : responses.automation.en;
  }
  if (lower.includes('telegram') || lower.includes('bog') || lower.includes('aloqa') || lower.includes('contact') || lower.includes('reach')) {
    return lang === 'uz' ? responses.contact.uz : responses.contact.en;
  }
  if (lower.includes('assalom') || lower.includes('salom') || lower.includes('hello') || lower.includes('hi ') || lower.includes('hey') || lower.includes('hola')) {
    return lang === 'uz' ? responses.hello.uz : responses.hello.en;
  }
  if (lower.includes('necha') || lower.includes('muddat') || lower.includes('kun') || lower.includes('time') || lower.includes('long') || lower.includes('week')) {
    return lang === 'uz' ? responses.timeline.uz : responses.timeline.en;
  }
  if (lower.includes('tech') || lower.includes('texno') || lower.includes('stack') || lower.includes('tool') || lower.includes('n8n') || lower.includes('react')) {
    return lang === 'uz' ? responses.tech.uz : responses.tech.en;
  }
  
  // Default fallback
  if (lang === 'uz') {
    return "Yaxshi savol! Menga quyidagilar haqida so'rashingiz mumkin:\n\n• Avtomatlashtirish va AI chatbotlar\n• Veb-sayt yaratish va landing pagelar\n• Narxlar va muddatlar\n• Texnologiyalar va integratsiyalar\n\nYoki aniqroq savol bering!";
  }
  return "Great question! You can ask me about:\n\n• Custom automations & AI chatbots\n• Website development & landing pages\n• Pricing & turnaround times\n• Tech stack & integrations\n\nOr feel free to be more specific!";
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: t('chat.greeting')
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    { text: t('chat.howStart'), answer: t('chat.howStartAnswer') },
    { text: t('chat.turnaround'), answer: t('chat.turnaroundAnswer') },
    { text: t('chat.sync'), answer: t('chat.syncAnswer') },
  ];

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const msg: ChatMessage = {
      id: `msg-${sender}-${Date.now()}`,
      sender,
      text
    };
    setMessages(prev => [...prev, msg]);
  };

  const handleQuickReply = (text: string, answer: string) => {
    addMessage(text, 'user');
    setIsTyping(true);

    setTimeout(() => {
      addMessage(answer, 'bot');
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleSendText = () => {
    const text = inputText.trim();
    if (!text) return;

    addMessage(text, 'user');
    setInputText('');

    // Show typing indicator while we simulate
    setIsTyping(true);
    setTimeout(() => {
      const answer = simulateResponse(text, lang);
      addMessage(answer, 'bot');
      setIsTyping(false);
    }, 1000 + Math.random() * 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 w-[340px] sm:w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            id="floating-chat-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#020412] to-[#11142d] text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-ember/20 border-2 border-ember/30 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-ember" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-none flex items-center gap-1">
                    <span>Akhrorov AI</span>
                    <Sparkles className="h-3 w-3 text-ember fill-current" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                    {t('chat.online')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-all cursor-pointer"
                id="close-chat-widget"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-slate-50 to-white space-y-3.5 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-sm' 
                        : 'bg-gradient-to-br from-ember to-amber-500 text-white shadow-sm'
                    }`}>
                      {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div className={`p-3 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-[#020412] to-[#1a1d35] text-white rounded-tr-none shadow-sm' 
                        : 'bg-white text-slate-800 border border-slate-200/70 shadow-sm rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2 max-w-[88%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-ember to-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="bg-white border border-slate-200 p-3 rounded-xl rounded-tl-none flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies + Input */}
            <div className="shrink-0 border-t border-slate-200/60">
              {/* Quick reply chips (only show when not too many messages) */}
              {messages.length <= 2 && (
                <div className="px-3 pt-3 pb-1.5 space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block text-left">{t('chat.suggestions')}</span>
                  <div className="flex flex-col gap-1.5">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply.text}
                        onClick={() => handleQuickReply(reply.text, reply.answer)}
                        className="w-full text-left bg-slate-100 hover:bg-ember/10 hover:text-ember border border-slate-200/50 text-slate-700 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text input area */}
              <div className="p-3 flex items-center gap-2 bg-white">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={lang === 'uz' ? "Savolingizni yozing..." : "Type your question..."}
                  className="flex-1 bg-slate-100 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-ember/40 focus:bg-white transition-all"
                />
                <button
                  onClick={handleSendText}
                  disabled={!inputText.trim()}
                  className="w-9 h-9 bg-ember hover:bg-amber-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Contact prompt */}
              <div className="px-3 pb-3">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 hover:text-ember transition-colors w-full"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>{lang === 'uz' ? "To'liq kontakt formasiga o'tish" : "Go to full contact form"}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat bubble button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-ember hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl cursor-pointer transition-colors relative"
        aria-label="Toggle AI Chatbot"
        id="toggle-chat-widget-button"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 fill-current" />
            {/* Notification dot */}
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" />
          </>
        )}
      </motion.button>
    </div>
  );
}
