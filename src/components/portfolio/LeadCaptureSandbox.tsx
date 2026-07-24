import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, CheckCircle2, MessageSquare, Database, Bot, Send, ShieldAlert, Loader2 } from 'lucide-react';

export default function LeadCaptureSandbox() {
  const [address, setAddress] = useState('124 Luxury Parkway, Austin TX');
  const [budget, setBudget] = useState('850,000');
  const [step, setStep] = useState<number>(0); // 0: Idle, 1: Webhook, 2: AI Parsing, 3: Sheets DB, 4: Telegram, 5: Finished
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev]);
  };

  const startWorkflow = () => {
    if (!address || !budget) return;
    setLoading(true);
    setStep(1);
    setLogs([]);
    addLog('n8n: Webhook listener active. Ingesting incoming JSON body...');

    // STEP 1 -> Webhook ingestion
    setTimeout(() => {
      setStep(2);
      addLog('n8n: Event captured. Payload -> { source: "Webhook", type: "buyer_lead" }');
      addLog('AI Agent: Initiating LLM Lead Scorer using GPT-4o-mini...');
      
      // STEP 2 -> AI Evaluation
      setTimeout(() => {
        setStep(3);
        addLog('AI Agent: Lead scored! Value: High (9.2/10). Reason: Verified budget & active timeline.');
        addLog('Database: Creating secure row entry in PostgreSQL client...');

        // STEP 3 -> Database record
        setTimeout(() => {
          setStep(4);
          addLog('Database: Row committed. ID: lead_90841. Response code: 201 CREATED');
          addLog('n8n Router: Routing lead notification to agent Telegram Channel...');

          // STEP 4 -> Telegram broadcast
          setTimeout(() => {
            setStep(5);
            setLoading(false);
            addLog('Telegram API: Payload successfully broadcasted to group #8401.');
            addLog('System: Workflow qualified successfully. Retaining state: IDLE.');
          }, 1200);
        }, 1000);
      }, 1200);
    }, 800);
  };

  const handleReset = () => {
    setStep(0);
    setLogs([]);
    setLoading(false);
  };

  return (
    <div 
      className="bg-[#0b0f19] text-white rounded-xl border border-white/10 overflow-hidden shadow-2xl mt-4"
      onClick={(e) => e.stopPropagation()} // Stop expand collapse bubbling
    >
      {/* Sandbox Header */}
      <div className="bg-[#111625] px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs font-mono">
        <span className="text-ember font-bold flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ember animate-pulse" />
          n8n PIPELINE WORKFLOW RUNNER
        </span>
        <span className="text-white/40">Real Estate Lead Capture</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Input & Flow Visualizer */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6 bg-[#0e1322] border-b lg:border-b-0 lg:border-r border-white/5">
          {step === 0 ? (
            <div className="space-y-4 text-left">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold font-mono tracking-wider uppercase text-ember bg-ember/10 px-2 py-0.5 rounded">
                🤖 Workflow Trigger
              </span>
              <h5 className="text-base font-bold font-sans">Simulate New Lead Submission</h5>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Fill out the buyer criteria below to simulate a real-time lead ingestion. Watch the AI classify, save, and alert your agency team instantly.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-white/40 uppercase">Property Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-ember"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-white/40 uppercase">Max Budget ($)</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-ember"
                  />
                </div>
              </div>

              <button
                onClick={startWorkflow}
                className="w-full bg-ember hover:bg-amber-600 text-white font-bold py-2.5 rounded text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Trigger Ingestion Workflow</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-ember">LIVE WORKFLOW GRAPH</span>
                {step === 5 && (
                  <button onClick={handleReset} className="text-[10px] text-white/50 hover:text-white underline cursor-pointer">
                    Run Another Test
                  </button>
                )}
              </div>

              {/* Steps pipeline visualizer */}
              <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
                
                {/* Horizontal progress guide line */}
                <div className="absolute top-[18px] left-3 right-3 h-[2px] bg-white/5 hidden sm:block pointer-events-none" />

                {/* Node 1: Webhook */}
                <div className="flex sm:flex-col items-center gap-2.5 z-10 w-full sm:w-20">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    step >= 1 ? 'bg-ember text-white border-ember' : 'bg-[#111625] text-white/40 border-white/10'
                  }`}>
                    1
                  </div>
                  <div className="text-left sm:text-center leading-tight">
                    <p className="text-[10px] font-bold">n8n Ingest</p>
                    <p className="text-[8px] text-white/40">Webhook</p>
                  </div>
                </div>

                {/* Node 2: AI Parser */}
                <div className="flex sm:flex-col items-center gap-2.5 z-10 w-full sm:w-24">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    step >= 2 ? 'bg-ember text-white border-ember' : 'bg-[#111625] text-white/40 border-white/10'
                  } ${step === 2 ? 'animate-pulse' : ''}`}>
                    2
                  </div>
                  <div className="text-left sm:text-center leading-tight">
                    <p className="text-[10px] font-bold">GPT Qualifier</p>
                    <p className="text-[8px] text-white/40">Analysis</p>
                  </div>
                </div>

                {/* Node 3: PostgreSQL */}
                <div className="flex sm:flex-col items-center gap-2.5 z-10 w-full sm:w-20">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    step >= 3 ? 'bg-ember text-white border-ember' : 'bg-[#111625] text-white/40 border-white/10'
                  } ${step === 3 ? 'animate-pulse' : ''}`}>
                    3
                  </div>
                  <div className="text-left sm:text-center leading-tight">
                    <p className="text-[10px] font-bold">Sheets DB</p>
                    <p className="text-[8px] text-white/40">PostgreSQL</p>
                  </div>
                </div>

                {/* Node 4: Telegram */}
                <div className="flex sm:flex-col items-center gap-2.5 z-10 w-full sm:w-20">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    step >= 4 ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-[#111625] text-white/40 border-white/10'
                  } ${step === 4 ? 'animate-pulse' : ''}`}>
                    4
                  </div>
                  <div className="text-left sm:text-center leading-tight">
                    <p className="text-[10px] font-bold">Telegram</p>
                    <p className="text-[8px] text-white/40">Agent Alert</p>
                  </div>
                </div>

              </div>

              {/* Step context detail callouts */}
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4 text-xs space-y-1 bg-[#111625]/50">
                {step === 1 && <p className="text-white/80">📥 Ingesting payload from API endpoint `/api/leads/webhook`. Listening for body fields...</p>}
                {step === 2 && <p className="text-white/80">🧠 AI Model is analyzing criteria: budget <span className="text-ember">${budget}</span> for <span className="text-ember">{address}</span>. Parsing eligibility index...</p>}
                {step === 3 && <p className="text-white/80">💾 Securing lead profiles inside central PostgreSQL database table `buyer_registry`. Committing transaction...</p>}
                {step === 4 && <p className="text-white/80">📲 n8n router is packaging and formatting message blocks to dispatch to team chat container via Telegram Webhook...</p>}
                {step === 5 && (
                  <div className="space-y-2">
                    <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> Pipeline execution completed successfully!
                    </p>
                    <div className="p-3 bg-white/[0.01] rounded border border-white/5 text-[10px] font-mono text-white/60 space-y-1">
                      <p><span className="text-white/30">Lead Score:</span> 9.2/10 (Elite buyer)</p>
                      <p><span className="text-white/30">Action Taken:</span> Logged to CRM + Telegram notification dispatched.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Terminal Log activity */}
        <div className="lg:col-span-5 p-4 bg-[#080b13] flex flex-col justify-between font-mono text-[10px] border-t lg:border-t-0 lg:border-l border-white/10 text-white/70">
          <div className="space-y-3 flex-1 overflow-hidden">
            <div className="flex items-center justify-between text-white/30 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" /> CORE ENGINE LOG
              </span>
              <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/50">SYSTEM STACK</span>
            </div>
            
            <div className="space-y-2 h-44 lg:h-52 overflow-y-auto pr-1 text-left">
              {logs.length === 0 ? (
                <div className="text-white/30 italic">No operations recorded. Click "Trigger Ingestion" on the left...</div>
              ) : (
                logs.map((log, lIdx) => (
                  <div key={lIdx} className={lIdx === 0 ? 'text-ember font-bold' : 'text-white/50'}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between text-[9px] text-white/30">
            <span>n8n Core Agent</span>
            <span>Version v2.10</span>
          </div>
        </div>

      </div>
    </div>
  );
}
