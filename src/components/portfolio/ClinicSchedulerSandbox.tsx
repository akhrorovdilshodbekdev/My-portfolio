import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Send, Loader2, RefreshCw, Trash2, CalendarClock, DollarSign, Bell, Shield } from 'lucide-react';

interface Message {
  sender: 'patient' | 'assistant' | 'system';
  text: string;
  time: string;
}

export default function ClinicSchedulerSandbox() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: 'Hello! I am your Smart Care Clinic Booking Agent 🏥. Powered by Telegram & Google Calendar API.\n\nI can schedule, reschedule, cancel appointments, quote prices, and answer questions. What can I do for you today?', time: '10:00 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [calendarLogs, setCalendarLogs] = useState<string[]>([
    'Telegram Webhook Listening: SECURE TLS/SSL',
    'Google Calendar OAuth 2.0 status: CONNECTED',
    'Cron Engine Status: ACTIVE (Reminders cron scheduled for 08:00 AM daily)'
  ]);
  const [activeBooking, setActiveBooking] = useState<{service: string; date: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addCalendarLog = (msg: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCalendarLogs(prev => [`[${timeStr}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || loading) return;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: 'patient', text: textToSend, time: timeStr };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    addCalendarLog(`Telegram API: Recieved update_id event payload with text: "${textToSend}"`);

    // Process chat response state machine
    setTimeout(() => {
      setLoading(false);
      const respTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const lower = textToSend.toLowerCase();

      // Feature 1: Pricing Calculations
      if (lower.includes('price') || lower.includes('how much') || lower.includes('cost')) {
        let priceText = 'Our services:\n🦷 Dental Cleaning: $80\n💎 Teeth Whitening: $200\n🩺 Consultation: $50\n\nWould you like me to calculate a custom quote for combined services?';
        let calculated = 0;
        let servicesDetected: string[] = [];
        
        if (lower.includes('cleaning') || lower.includes('clean')) {
          calculated += 80;
          servicesDetected.push('Dental Cleaning ($80)');
        }
        if (lower.includes('whitening') || lower.includes('white')) {
          calculated += 200;
          servicesDetected.push('Teeth Whitening ($200)');
        }
        if (lower.includes('consult')) {
          calculated += 50;
          servicesDetected.push('Initial Consultation ($50)');
        }

        if (calculated > 0) {
          priceText = `💳 Custom Price Calculation:\n${servicesDetected.map(s => `• ${s}`).join('\n')}\n\n💵 Total estimated cost: $${calculated} USD.\nWould you like to reserve a slot for these treatments?`;
        }
        
        addCalendarLog('Dynamic Price Calculator: Parsing treatment tokens & returning estimate');
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: priceText,
          time: respTime
        }]);
      } 
      // Feature 2: Booking slots / Add
      else if (lower.includes('book') || lower.includes('schedule') || lower.includes('reserve') || lower.includes('tuesday')) {
        addCalendarLog('Google Calendar API: Querying free/busy schedules...');
        const serviceName = lower.includes('cleaning') ? 'Dental Cleaning' : 'Clinic Checkup';
        setActiveBooking({ service: serviceName, date: 'Tuesday at 10:00 AM' });
        
        addCalendarLog('Google Calendar API: INSERT draft_event -> Tuesday 10:00 AM');
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: `✅ Google Calendar Synced!\n\nI have scheduled your ${serviceName} for Tuesday at 10:00 AM. \n\n(Event ID: gcal_9028_tues). You can reschedule, cancel, or ask anything anytime.`,
          time: respTime
        }]);
      } 
      // Feature 3: Rescheduling / Update
      else if (lower.includes('reschedule') || lower.includes('move') || lower.includes('change') || lower.includes('thursday')) {
        if (!activeBooking) {
          addCalendarLog('Google Calendar API: Active event not found, checking match by patient ID');
        }
        addCalendarLog('Google Calendar API: UPDATE event_id gcal_9028_tues -> Thursday at 3:00 PM');
        setActiveBooking({ service: 'Dental Cleaning', date: 'Thursday at 3:00 PM' });
        
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: `🔄 Reschedule Successful!\n\nYour appointment has been successfully updated on Google Calendar to Thursday at 3:00 PM.\n\nOur system logs have been fully synchronized.`,
          time: respTime
        }]);
      } 
      // Feature 4: Cancellation / Delete
      else if (lower.includes('cancel') || lower.includes('delete') || lower.includes('remove')) {
        addCalendarLog('Google Calendar API: DELETE event_id gcal_9028_tues');
        setActiveBooking(null);
        
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: '❌ Booking Cancelled.\n\nI have successfully deleted your appointment from the Google Calendar database. Let me know if you need to schedule a new one in the future!',
          time: respTime
        }]);
      } 
      // Feature 5: FAQ & Pre-care Question
      else if (lower.includes('pre-care') || lower.includes('extraction') || lower.includes('precaution') || lower.includes('prepare')) {
        addCalendarLog('Knowledge Base: Querying clinical guidelines database...');
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: '🩺 Pre-Appointment Guidelines:\n1. Fast for at least 6 hours if receiving sedation.\n2. Avoid caffeine or blood thinners (like aspirin) 24 hours prior.\n3. Arrive 10 minutes early to check-in.\n\nIs there any other medical precaution you would like to know?',
          time: respTime
        }]);
      }
      // Fallback
      else {
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: "I didn't quite catch that. Try clicking one of the sandbox quick chips below to test Google Calendar sync, price calculations, or pre-care guidelines!",
          time: respTime
        }]);
      }
    }, 1000);
  };

  // Feature 6: Simulate cron-trigger morning reminder
  const triggerMorningReminder = () => {
    addCalendarLog('Cron Trigger: Initiating Daily 08:00 AM Patient Reminders batch job...');
    addCalendarLog('Database: 1 active reservation found for patient today');
    
    setTimeout(() => {
      const respTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      addCalendarLog('Telegram API: Dispatched custom message template to patient chat ID');
      
      setMessages(prev => [...prev, {
        sender: 'system',
        text: '🔔 [AUTOMATED MORNING REMINDER]\n"Hi! This is a reminder that your Dental Cleaning is scheduled for TODAY. We look forward to seeing you. Please reply /reschedule if you need to change this."',
        time: respTime
      }]);
    }, 500);
  };

  const handleReset = () => {
    setMessages([
      { sender: 'assistant', text: 'Hello! I am your Smart Care Clinic Booking Agent 🏥. Powered by Telegram & Google Calendar API.\n\nI can schedule, reschedule, cancel appointments, quote prices, and answer questions. What can I do for you today?', time: '10:00 AM' }
    ]);
    setActiveBooking(null);
    setCalendarLogs([
      'Container recycled.',
      'Telegram Webhook Listening: SECURE TLS/SSL',
      'Google Calendar OAuth 2.0 status: CONNECTED',
      'Cron Engine Status: ACTIVE'
    ]);
  };

  return (
    <div 
      className="bg-[#0b0f19] text-white rounded-xl border border-white/10 overflow-hidden shadow-2xl mt-4"
      onClick={(e) => e.stopPropagation()} // Stop expand collapse bubbling
    >
      {/* Sandbox Header */}
      <div className="bg-[#111625] px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs font-mono">
        <span className="text-ember font-bold">
          TELEGRAM AI APPOINTMENT AGENT
        </span>
        <span className="text-white/40">GCal & Cron Reminder Simulator</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">

        {/* Left: Chat interface */}
        <div className="md:col-span-7 p-4 md:p-6 bg-[#090d16] flex flex-col h-[380px] md:h-[400px] justify-between border-b md:border-b-0 md:border-r border-white/5">
          {/* Header */}
          <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                TG
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">Clinic Booking Bot</p>
                <p className="text-[9px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" /> Online (Synced to Calendar)
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

          {/* Chat scroll content */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 scrollbar-thin"
          >
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex flex-col ${
                  msg.sender === 'patient' 
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
                  <div className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'patient' 
                      ? 'bg-ember text-white rounded-tr-none text-left' 
                      : 'bg-white/5 border border-white/10 text-white/95 rounded-tl-none text-left'
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[8px] text-white/30 block mt-1 text-right">{msg.time}</span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 rounded-tl-none flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-ember" />
                  <span className="text-[10px] text-white/40 font-mono">AI agent is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Inputs & Quick Replies */}
          <div className="space-y-2">
            {/* Quick reply suggestion chips */}
            <div className="flex flex-wrap gap-1.5 justify-start">
              <button
                onClick={() => handleSendMessage('Book dental cleaning checkup for Tuesday')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Calendar className="h-3 w-3 text-ember" /> Book Tuesday
              </button>
              
              <button
                onClick={() => handleSendMessage('Reschedule my booking to Thursday at 3 PM')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <CalendarClock className="h-3 w-3 text-emerald-400" /> Reschedule
              </button>

              <button
                onClick={() => handleSendMessage('Can I cancel my slot?')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="h-3 w-3 text-red-400" /> Cancel Slot
              </button>

              <button
                onClick={() => handleSendMessage('How much is dental cleaning and teeth whitening?')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <DollarSign className="h-3 w-3 text-amber-400" /> Quotes & Prices
              </button>

              <button
                onClick={() => handleSendMessage('What is the pre-care for dental extraction?')}
                className="bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Shield className="h-3 w-3 text-blue-400" /> Pre-care FAQ
              </button>

              <button
                onClick={triggerMorningReminder}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-[10px] text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Bell className="h-3 w-3 text-amber-400 animate-bounce" /> Trigger Same-Day Reminder
              </button>
            </div>

            {/* Manual Text field Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} 
              className="flex gap-1.5"
            >
              <input
                type="text"
                placeholder="Ask about rescheduling, prices, medical pre-care..."
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

        {/* Right: GCal integration logs panel */}
        <div className="hidden md:flex md:col-span-5 p-4 bg-[#080b13] flex-col justify-between font-mono text-[10px] border-t md:border-t-0 md:border-l border-white/10 text-white/70">
          <div className="space-y-3 flex-1 overflow-hidden">
            <div className="flex items-center justify-between text-white/30 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> CALENDAR & AGENT CRONS
              </span>
              <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/50">SERVER ACTIVE</span>
            </div>
            
            <div className="space-y-2 h-60 lg:h-64 overflow-y-auto pr-1 text-left">
              {calendarLogs.map((log, lIdx) => (
                <div key={lIdx} className={lIdx === 0 ? 'text-amber-400 font-bold' : 'text-white/50'}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between text-[9px] text-white/30">
            <span>Telegram Bot Webhook</span>
            <span>API Online</span>
          </div>
        </div>

      </div>
    </div>
  );
}
