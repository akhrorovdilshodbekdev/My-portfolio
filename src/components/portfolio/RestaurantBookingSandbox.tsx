import { useState, useRef, useEffect } from 'react';
import { Calendar, CalendarClock, Database, Loader2, Monitor, RefreshCw, Send, Smartphone, Sparkles, Trash2, Users, UtensilsCrossed } from 'lucide-react';

type Channel = 'widget' | 'telegram';

interface Message {
  sender: 'guest' | 'assistant' | 'system';
  text: string;
  time: string;
  channel?: Channel;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function prettyDay(lower: string): string | null {
  const day = DAYS.find(d => lower.includes(d));
  if (!day) return null;
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export default function RestaurantBookingSandbox() {
  const [channel, setChannel] = useState<Channel>('widget');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Hi! I\'m the Table Assistant 🍽️ — I run on your website widget AND in Telegram, answering from one shared knowledge base and booking into one calendar.\n\nTry me: check diets & allergens, book a table, or pass a large-party request to the events host.',
      time: '10:00 AM',
      channel: 'widget',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'Vector DB: menu + policies indexed (RAG ready)',
    'Google Calendar OAuth 2.0 status: CONNECTED',
    'n8n Router: omnichannel listeners ACTIVE (widget + Telegram)',
  ]);
  const [activeBooking, setActiveBooking] = useState<{ party: number; day: string; time: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${now()}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const say = (sender: Message['sender'], text: string, ch: Channel | undefined = channel) => {
    setMessages(prev => [...prev, { sender, text, time: now(), channel: ch }]);
  };

  const switchChannel = (next: Channel) => {
    if (next === channel) return;
    setChannel(next);
    say(
      'system',
      next === 'telegram'
        ? '🔁 Switched to Telegram — same assistant, same memory. The conversation stays in sync.'
        : '🔁 Back on the website widget — the assistant remembers everything from Telegram.'
    );
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    say('guest', textToSend);
    setInputText('');
    setLoading(true);
    addLog(`${channel === 'telegram' ? 'Telegram API' : 'Website Widget'}: message received → "${textToSend}"`);

    setTimeout(() => {
      setLoading(false);
      const lower = textToSend.toLowerCase();
      const day = prettyDay(lower);
      const partyMatch = textToSend.match(/(\d+)/);
      const party = partyMatch ? Math.min(Math.max(parseInt(partyMatch[1], 10), 1), 12) : 4;
      const isBigParty = party >= 8;

      // 1) Booking management: reschedule / cancel
      if (/(reschedule|reschedule my|move|change my booking|cancel|delete|remove)/.test(lower)) {
        if (!activeBooking) {
          addLog('Calendar API: no active booking on this conversation');
          say(
            'assistant',
            'I don\'t see an active table booking in this conversation yet — try "Book a table for 4 on Friday" first, then I can reschedule or cancel it for you.'
          );
          return;
        }
        if (/cancel|delete|remove/.test(lower)) {
          const bid = `tbl_${Math.floor(1000 + Math.random() * 9000)}`;
          addLog(`Calendar API: DELETE event ${bid} (${activeBooking.day}, party of ${activeBooking.party})`);
          setActiveBooking(null);
          say('assistant', '❌ Booking cancelled.\n\nI\'ve removed the table from the calendar and freed the slot. Let me know if you\'d like to book a new one!');
          return;
        }
        const newDay = day ?? 'Saturday';
        const newTime = '8:00 PM';
        const bid = `tbl_${Math.floor(1000 + Math.random() * 9000)}`;
        addLog(`Calendar API: UPDATE event → ${newDay} ${newTime} (party of ${activeBooking.party})`);
        setActiveBooking({ party: activeBooking.party, day: newDay, time: newTime });
        say('assistant', `🔄 Reschedule successful!\n\nYour table for ${activeBooking.party} has moved to ${newDay} at ${newTime} — the calendar and waitlist sheet are fully synced.`);
        return;
      }

      // 2) High-value routing: banquet / catering / large parties go to the events host
      if (/(banquet|catering|private event|wedding|corporate|birthday party|event for|group of)/.test(lower) || (isBigParty && /(book|reserve|table)/.test(lower))) {
        addLog('n8n Router: high-value intent detected (banquet/catering)');
        addLog('CRM: lead logged → events team queue · follow-up < 1 hour');
        say(
          'assistant',
          '🎉 Happy to help with the group!\n\nLarge-party and private-event requests go straight to our events host — I\'ve passed your details over, and they\'ll confirm availability within the hour. I\'m still here if you need anything else.'
        );
        return;
      }

      // 3) New table booking
      if (/(book|reserve|table|tonight|slot)/.test(lower)) {
        const bookDay = day ?? 'Saturday';
        const time = '7:30 PM';
        const bid = `tbl_${Math.floor(1000 + Math.random() * 9000)}`;
        addLog(`Calendar API: free/busy check → ${bookDay} ${time} · table for ${party}`);
        addLog(`Calendar API: INSERT event ${bid} (party of ${party})`);
        addLog('Sheets DB: row committed → reservations_log');
        setActiveBooking({ party, day: bookDay, time });
        say(
          'assistant',
          `✅ Table booked on Google Calendar.\n\nI\'ve reserved a table for ${party} on ${bookDay} at ${time}.\n• Booking ID: ${bid}\n• Synced to your staff calendar + waitlist sheet\n\nReply "reschedule" or "cancel" anytime to manage it.`
        );
        return;
      }

      // 4) RAG knowledge-base answers
      if (/(vegan|vegetarian|plant-based)/.test(lower)) {
        addLog('Vector DB: query "vegan dishes" → top hit menu_veg.md (0.94)');
        say(
          'assistant',
          '🌱 Plenty of vegan-friendly plates here:\n\n• Starters: roasted beet salad, tomato tartare\n• Mains: wild-mushroom risotto, cauliflower steak\n• Desserts: lemon sorbet, dark-chocolate mousse\n\nWant me to check any specific dish for allergens?'
        );
        return;
      }
      if (/(gluten|allergen|allergy|dietary|nut)/.test(lower)) {
        addLog('Vector DB: query "gluten & allergen policy" → top hit kitchen_allergens.md (0.91)');
        say(
          'assistant',
          '🌾 The kitchen is allergen-aware but not a dedicated gluten-free facility.\n\nSafest bets: grilled salmon, steak, burrata and most salads. Tell me any dish and I\'ll flag gluten, nuts, or dairy in it for you.'
        );
        return;
      }
      if (/(dress code|dress)/.test(lower)) {
        addLog('Vector DB: query "dress code" → top hit policies.md (0.97)');
        say('assistant', '👔 Smart-casual dress code — jackets optional and always welcome. No sportswear after 7:00 PM.');
        return;
      }
      if (/(hour|open|close|closing|kitchen until|when are you)/.test(lower)) {
        addLog('Vector DB: query "opening hours" → top hit location.md (0.96)');
        say('assistant', '🕗 Kitchen hours: Tuesday–Sunday, 12:00–23:00 (last seating 21:30). We\'re closed on Mondays.');
        return;
      }
      if (/(direction|location|address|parking|where are)/.test(lower)) {
        addLog('Vector DB: query "location & parking" → top hit location.md (0.93)');
        say('assistant', '📍 We\'re on the main street corner, across from the park. Valet from 6 PM, plus two public garages within a block.');
        return;
      }
      if (/(kid|child|family|high ?chair)/.test(lower)) {
        addLog('Vector DB: query "families & kids" → top hit policies.md (0.9)');
        say('assistant', '👶 Kids are welcome until 8:00 PM — high chairs and a half-portion kids menu are available. Just mention it when booking.');
        return;
      }

      // Fallback
      addLog('Intent: unclear → suggesting quick actions');
      say('assistant', 'I didn\'t quite catch that. Try one of the quick options below — I can check the menu for diets & allergens, book a table, or pass a large party to the events host.');
    }, 900);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'assistant',
        text: 'Hi! I\'m the Table Assistant 🍽️ — I run on your website widget AND in Telegram, answering from one shared knowledge base and booking into one calendar.\n\nTry me: check diets & allergens, book a table, or pass a large-party request to the events host.',
        time: '10:00 AM',
        channel: 'widget',
      },
    ]);
    setActiveBooking(null);
    setChannel('widget');
    setLogs([
      'Container recycled.',
      'Vector DB: menu + policies indexed (RAG ready)',
      'Google Calendar OAuth 2.0 status: CONNECTED',
      'n8n Router: omnichannel listeners ACTIVE (widget + Telegram)',
    ]);
  };

  const channelBtn = (value: Channel, label: string, Icon: any, activeCls: string) => (
    <button
      onClick={() => switchChannel(value)}
      className={`flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded transition-colors cursor-pointer border ${
        channel === value ? activeCls : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'
      }`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );

  return (
    <div
      className="bg-[#0b0f19] text-white rounded-xl border border-white/10 overflow-hidden shadow-2xl mt-4"
      onClick={(e) => e.stopPropagation()} // Stop expand collapse bubbling
    >
      {/* Sandbox Header */}
      <div className="bg-[#111625] px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs font-mono">
        <span className="text-ember font-bold">
          OMNICHANNEL RESTAURANT ASSISTANT
        </span>
        <span className="text-white/40">Menu RAG &amp; Table Booking Simulator</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left: Chat interface */}
        <div className="md:col-span-7 p-4 md:p-6 bg-[#090d16] flex flex-col h-[420px] md:h-[440px] justify-between border-b md:border-b-0 md:border-r border-white/5">
          {/* Bot header + channel switch */}
          <div className="space-y-2">
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember">
                  <UtensilsCrossed className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">Table Assistant</p>
                  <p className="text-[9px] text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" /> Online · One brain, both channels
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-white/30 hover:text-white transition-colors duration-200"
                title="Reset Chat"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Omnichannel selector */}
            <div className="flex items-center gap-1.5">
              {channelBtn('widget', 'Website', Monitor, 'bg-ember text-white border-ember')}
              {channelBtn('telegram', 'Telegram', Smartphone, 'bg-[#229ED9] text-white border-[#229ED9]')}
              <span className="ml-auto text-[8px] font-mono uppercase tracking-wider text-white/25">
                One assistant · synced
              </span>
            </div>
          </div>

          {/* Chat scroll content */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto my-3 space-y-3 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === 'guest'
                    ? 'items-end'
                    : msg.sender === 'system'
                    ? 'items-center w-full'
                    : 'items-start'
                }`}
              >
                {msg.sender === 'system' ? (
                  <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] rounded-lg px-3.5 py-2.5 max-w-[90%] text-center">
                    <p className="whitespace-pre-line leading-relaxed font-sans font-medium">{msg.text}</p>
                    <span className="text-[8px] text-amber-500/50 block mt-1">{msg.time}</span>
                  </div>
                ) : (
                  <div className="max-w-[85%]">
                    {msg.sender === 'guest' && (
                      <p className="text-[8px] font-mono uppercase tracking-wider text-white/25 mb-0.5 text-right">
                        {msg.channel === 'telegram' ? 'via Telegram' : 'via Website widget'}
                      </p>
                    )}
                    <div
                      className={`rounded-lg px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                        msg.sender === 'guest'
                          ? 'bg-ember text-white rounded-tr-none text-left'
                          : 'bg-white/5 border border-white/10 text-white/95 rounded-tl-none text-left'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-white/30 block mt-1 text-right">{msg.time}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 rounded-tl-none flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-ember" />
                  <span className="text-[10px] text-white/40 font-mono">Assistant is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Inputs & Quick Replies */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5 justify-start">
              <button
                onClick={() => handleSendMessage('What vegan options do you have?')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="h-3 w-3 text-ember" /> Vegan menu
              </button>
              <button
                onClick={() => handleSendMessage('Book a table for 4 on Friday')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Calendar className="h-3 w-3 text-ember" /> Book Friday · table for 4
              </button>
              <button
                onClick={() => handleSendMessage('Reschedule my booking to Saturday')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <CalendarClock className="h-3 w-3 text-emerald-400" /> Reschedule
              </button>
              <button
                onClick={() => handleSendMessage('Can I cancel my table?')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="h-3 w-3 text-red-400" /> Cancel slot
              </button>
              <button
                onClick={() => handleSendMessage('We want to book a private event for 20 people')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Users className="h-3 w-3 text-blue-400" /> Private event (20)
              </button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
              className="flex gap-1.5"
            >
              <input
                type="text"
                placeholder="Ask about menus, diets, or book a table..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-ember"
              />
              <button
                type="submit"
                className="bg-ember hover:bg-amber-600 text-white p-2 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: RAG + Booking log panel */}
        <div className="hidden md:flex md:col-span-5 p-4 bg-[#080b13] flex-col justify-between font-mono text-[10px] border-t md:border-t-0 md:border-l border-white/10 text-white/70">
          <div className="space-y-3 flex-1 overflow-hidden">
            <div className="flex items-center justify-between text-white/30 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" /> KNOWLEDGE &amp; BOOKING LOG
              </span>
              <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/50">RAG + GCal ACTIVE</span>
            </div>

            <div className="space-y-2 h-64 lg:h-72 overflow-y-auto pr-1 text-left">
              {logs.map((log, lIdx) => (
                <div key={lIdx} className={lIdx === 0 ? 'text-ember font-bold' : 'text-white/50'}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between text-[9px] text-white/30">
            <span>n8n + Vector DB</span>
            <span>Omnichannel Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
