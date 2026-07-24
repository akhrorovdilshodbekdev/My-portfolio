import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Users, Flame, Share2, Plus, ArrowRight, Loader2, Database, Terminal } from 'lucide-react';

export default function WaitlistSandbox() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [queuePosition, setQueuePosition] = useState(1240);
  const [referrals, setReferrals] = useState(0);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'System: Waiting for webhook payload...',
    'Database: Postgres pool status: IDLE'
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 7)]);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addLog('Error: Invalid email validation payload received.');
      return;
    }

    setLoading(true);
    addLog(`POST /api/waitlist - Ingesting payload { email: "${email}" }`);

    setTimeout(() => {
      setLoading(false);
      setJoined(true);
      const startingPosition = Math.floor(Math.random() * 400) + 1400;
      setQueuePosition(startingPosition);
      addLog(`Database: User row created successfully with index ${startingPosition}`);
      addLog('n8n Workflow: Email autoresponder triggered successfully.');
      addLog(`Telegram Bot: Alert sent -> New Lead from ${email.split('@')[0]}`);
    }, 1000);
  };

  const simulateReferral = () => {
    setReferrals(prev => prev + 1);
    const jump = Math.floor(Math.random() * 120) + 80;
    
    addLog('WEBHOOK RECEIVED: referral_signup_event from webhook listener');
    addLog('Database: Updating referrer relational status...');
    
    setQueuePosition(prev => {
      const nextPos = Math.max(1, prev - jump);
      addLog(`Database: Rank upgraded! Moved from #${prev} to #${nextPos} (jumped ${jump} places)`);
      return nextPos;
    });

    addLog('System: Sent referral progress notification via SES.');
  };

  const handleReset = () => {
    setEmail('');
    setJoined(false);
    setReferrals(0);
    setQueuePosition(1240);
    setLogs([
      'System: Container recycled. Waiting for webhook payload...',
      'Database: Postgres pool status: IDLE'
    ]);
  };

  return (
    <div 
      className="bg-[#0b0f19] text-white rounded-xl border border-white/10 overflow-hidden shadow-2xl mt-4"
      onClick={(e) => e.stopPropagation()} // Stop click bubbling up to expand card
    >
      {/* Sandbox Header */}
      <div className="bg-[#111625] px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs font-mono">
        <span className="text-amber-400 font-bold flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          LIVE INTERACTIVE SANDBOX
        </span>
        <span className="text-white/40">SaaS Waitlist Simulator</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side: Dynamic App View */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 bg-[#0e1322]">
          <AnimatePresence mode="wait">
            {!joined ? (
              <motion.div
                key="signup-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-5"
              >
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold font-mono tracking-wider uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    ⚡ Waitlist Live Preview
                  </span>
                  <h4 className="text-xl font-bold font-sans tracking-tight">Join the Cloud Engine Beta</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    Get premium hosting access and free database credits. Join 1,240+ devs who already secured their spot.
                  </p>
                </div>

                <form onSubmit={handleJoin} className="space-y-3">
                  <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none placeholder-white/25 text-white"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <>
                          <span>Ingest</span>
                          <Send className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-white/40 text-center font-mono">
                    ✓ Validated by Supabase auth constraints
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Visual Rank Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center space-y-4 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-1 relative z-10">
                    <p className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">YOUR QUEUE POSITION</p>
                    <motion.h5 
                      key={queuePosition}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-extrabold font-sans text-white tracking-tight"
                    >
                      #{queuePosition}
                    </motion.h5>
                    <p className="text-[11px] text-white/50">out of 2,410 registrants</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-left relative z-10">
                    <div className="p-2.5 bg-white/[0.01] rounded border border-white/5">
                      <p className="text-[9px] text-white/40 uppercase font-mono font-bold">Referrals</p>
                      <p className="text-base font-bold text-white mt-0.5">{referrals}</p>
                    </div>
                    <div className="p-2.5 bg-white/[0.01] rounded border border-white/5">
                      <p className="text-[9px] text-white/40 uppercase font-mono font-bold">Queue Reward</p>
                      <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                        <Flame className="h-3 w-3 fill-current" /> Fast Pass
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Referral Simulator */}
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-sans">
                      <Share2 className="h-3.5 w-3.5" /> Referral Engine Demo
                    </span>
                    <span className="text-[10px] text-amber-400/80 font-mono font-semibold">Live Simulation</span>
                  </div>
                  <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                    Normally, users share their custom link. Click below to simulate friend signups and watch your rank jump!
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={simulateReferral}
                      className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold py-2.5 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Simulate Friend Signup
                    </button>
                    <button
                      onClick={handleReset}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold px-3 py-2.5 rounded transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Log / Database Stream (Simulating backend pipeline) */}
        <div className="lg:col-span-5 p-4 bg-[#080b13] flex flex-col justify-between font-mono text-[10px] border-t lg:border-t-0 lg:border-l border-white/10 text-white/70">
          <div className="space-y-3 flex-1 overflow-hidden">
            <div className="flex items-center justify-between text-white/30 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1">
                <Terminal className="h-3 w-3" /> PIPELINE ACTIVITY LOG
              </span>
              <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/50">POSTGRES DB</span>
            </div>
            
            {/* Live streaming list */}
            <div className="space-y-2 h-44 lg:h-52 overflow-y-auto pr-1">
              {logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`leading-relaxed text-[10px] truncate ${
                    index === 0 ? 'text-amber-400 font-bold' : 'text-white/60'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between text-[9px] text-white/30">
            <span className="flex items-center gap-1">
              <Database className="h-2.5 w-2.5" /> supabase-pool-01
            </span>
            <span>API v1.2</span>
          </div>
        </div>

      </div>
    </div>
  );
}
