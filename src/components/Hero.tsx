import { motion } from 'motion/react';
import { Terminal, Play, CheckCircle2, ArrowRight, Zap, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';

export default function Hero() {
  const [isRunning, setIsRunning] = useState(false);
  const [runStep, setRunStep] = useState(0);
  const { t } = useLanguage();

  const triggerWorkflow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setRunStep(1);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer1 = setTimeout(() => setRunStep(2), 1500);
    const timer2 = setTimeout(() => {
      setRunStep(3);
      setIsRunning(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isRunning]);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
        mass: 0.8
      }
    }
  };

  return (
    <section id="home" className="relative min-h-dvh md:min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-12 md:py-20 lg:py-28 bg-canvas-bg">
      {/* Decorative floating gradient blurs in background */}
      <motion.div 
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-ember/5 rounded-full blur-[120px] pointer-events-none hidden md:block" 
      />
      <motion.div 
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-primary-midnight/5 rounded-full blur-[80px] pointer-events-none hidden md:block" 
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content with Stagger Layout */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Title / Main pitch */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-midnight leading-[1.1] mb-6 font-sans text-left"
              id="hero-heading"
            >
              {t('hero.title1')} <span className="text-ember relative inline-block">
                {t('hero.automations')}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 h-[3px] bg-ember/30 rounded"
                />
              </span> {t('hero.and')} <span className="relative inline-block">
                {t('hero.websites')}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 h-[3px] bg-primary-midnight/20 rounded"
                />
              </span> {t('hero.title2')}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-midnight/70 font-sans leading-relaxed mb-8 max-w-xl text-left"
              id="hero-subheading"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => handleScrollTo('#automations')}
                className="group flex items-center gap-2 rounded-md bg-primary-midnight hover:bg-slate-900 text-white px-6 py-3.5 text-base font-semibold transition-all duration-200 shadow-sm cursor-pointer"
                id="hero-see-work"
              >
                {t('hero.seeMyWork')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => handleScrollTo('#contact')}
                className="rounded-md border border-primary-midnight/20 hover:border-primary-midnight/40 text-primary-midnight px-6 py-3.5 text-base font-semibold transition-all duration-200 cursor-pointer"
                id="hero-lets-talk"
              >
                {t('hero.letsTalk')}
              </button>
            </motion.div>

            {/* Key stats labels */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 md:gap-8 border-t border-card-border/40 pt-8"
            >
              <div className="flex items-center gap-2.5 text-sm font-medium text-primary-midnight/80">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ember/10 text-ember">
                  <Zap className="h-4 w-4 fill-current" />
                </span>
                <span>{t('hero.turnaround')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-primary-midnight/80">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#10b981]/10 text-[#10b981]">
                  <Award className="h-4 w-4" />
                </span>
                <span>{t('hero.businesses')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Interactive Code / Workflow Terminal */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.4 }}
              className="w-full max-w-md bg-[#0a0c16] rounded-xl overflow-hidden shadow-2xl border border-white/5 relative"
              id="hero-terminal"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#020409]/60 border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-white/40 tracking-wider">
                  <Terminal className="h-3 w-3" />
                  <span>workflow.json</span>
                </div>
                <div className="w-12" /> {/* spacing spacer */}
              </div>

              {/* Code Panel / Animation Stage */}
              <div className="p-5 font-mono text-[12px] text-white/80 overflow-y-auto leading-relaxed relative min-h-[360px] flex flex-col justify-between">
                
                {/* Simulated Flow Node Animation Overlay */}
                <div className="space-y-4 mb-4">
                  <div className="flex items-center justify-between text-[11px] text-white/40 border-b border-white/5 pb-2">
                    <span>{t('hero.liveSim')}</span>
                    <button 
                      onClick={triggerWorkflow}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded bg-ember/15 text-ember hover:bg-ember/25 transition-all text-[11px] font-bold tracking-wider ${isRunning ? 'animate-pulse' : ''}`}
                    >
                      <Play className="h-3 w-3 fill-current" />
                      {isRunning ? t('hero.running') : t('hero.run')}
                    </button>
                  </div>

                  {/* Flow Graphic Node Visuals */}
                  <div className="grid grid-cols-1 gap-3 py-2">
                    
                    {/* Node 1 */}
                    <div className={`flex items-center justify-between p-3 rounded-lg border bg-[#0d1127] transition-all duration-300 ${
                      runStep >= 1 ? 'border-ember text-white shadow-[0_0_15px_rgba(223,101,19,0.15)]' : 'border-white/5 text-white/60'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${runStep >= 1 ? 'bg-ember animate-ping' : 'bg-white/20'}`} />
                        <div>
                          <p className="font-semibold text-xs">{t('hero.node1')}</p>
                          <p className="text-[10px] text-white/40">endpoint: /lead-capture</p>
                        </div>
                      </div>
                      {runStep >= 1 && <span className="text-[10px] font-bold text-ember">{t('hero.active')}</span>}
                    </div>

                    {/* Connecting Arrow */}
                    <div className="flex justify-center -my-1 h-3 relative">
                      <div className="w-[1.5px] h-full bg-white/10" />
                      {isRunning && (
                        <motion.div 
                          className="absolute w-1.5 h-1.5 rounded-full bg-ember"
                          initial={{ y: -6 }}
                          animate={{ y: 6 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        />
                      )}
                    </div>

                    {/* Node 2 */}
                    <div className={`flex items-center justify-between p-3 rounded-lg border bg-[#0d1127] transition-all duration-300 ${
                      runStep >= 2 ? 'border-ember text-white shadow-[0_0_15px_rgba(223,101,19,0.15)]' : 'border-white/5 text-white/60'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${runStep >= 2 ? 'bg-ember animate-ping' : 'bg-white/20'}`} />
                        <div>
                          <p className="font-semibold text-xs">{t('hero.node2')}</p>
                          <p className="text-[10px] text-white/40">system: analyze_lead_intent</p>
                        </div>
                      </div>
                      {runStep === 2 && <span className="text-[10px] font-bold text-ember">{t('hero.aiThinking')}</span>}
                      {runStep > 2 && <span className="text-[10px] font-bold text-[#10b981]">{t('hero.qualified')}</span>}
                    </div>

                    {/* Connecting Arrow */}
                    <div className="flex justify-center -my-1 h-3 relative">
                      <div className="w-[1.5px] h-full bg-white/10" />
                      {isRunning && runStep >= 2 && (
                        <motion.div 
                          className="absolute w-1.5 h-1.5 rounded-full bg-ember"
                          initial={{ y: -6 }}
                          animate={{ y: 6 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        />
                      )}
                    </div>

                    {/* Node 3 */}
                    <div className={`flex items-center justify-between p-3 rounded-lg border bg-[#0d1127] transition-all duration-300 ${
                      runStep >= 3 ? 'border-[#10b981] text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/5 text-white/60'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${runStep >= 3 ? 'bg-[#10b981]' : 'bg-white/20'}`} />
                        <div>
                          <p className="font-semibold text-xs">{t('hero.node3')}</p>
                          <p className="text-[10px] text-white/40">action: push_and_notify_client</p>
                        </div>
                      </div>
                      {runStep >= 3 ? (
                        <div className="flex items-center gap-1 text-[10px] text-[#10b981] font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{t('hero.sent')}</span>
                        </div>
                      ) : null}
                    </div>

                  </div>
                </div>

                {/* Simulated JSON file display at the bottom */}
                <pre className="text-[11px] text-white/40 leading-[1.3] pt-2 border-t border-white/5">
                  <code>
                    {`{
  "webhook": { "status": "listening", "path": "lead-capture" },
  "ai_agent": { "model": "gemini-2.5-pro", "intent": "book" },
  "output": [ "hubspot_crm", "whatsapp_api_notify" ],
  "execution_time_ms": ${runStep === 3 ? '420' : 'null'}
}`}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary-midnight">{t('hero.scroll')}</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-6 rounded-full bg-primary-midnight/30 flex justify-center pt-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-primary-midnight" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
