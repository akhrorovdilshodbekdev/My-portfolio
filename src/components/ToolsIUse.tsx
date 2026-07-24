import { motion } from 'motion/react';
import { TOOLS } from '../data';
import { 
  Workflow, BrainCircuit, Sparkles, MessageSquareText, 
  Bot, Layout, Code2, Atom, Paintbrush, PenTool, Database, Globe 
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

export default function ToolsIUse() {
  const { t } = useLanguage();

  const getToolIcon = (iconName: string) => {
    const iconClass = "h-6 w-6 text-ember group-hover:scale-110 transition-transform duration-300";
    switch (iconName) {
      case 'Workflow':
        return <Workflow className={iconClass} />;
      case 'BrainCircuit':
        return <BrainCircuit className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'MessageSquareText':
        return <MessageSquareText className={iconClass} />;
      case 'Bot':
        return <Bot className={iconClass} />;
      case 'Layout':
        return <Layout className={iconClass} />;
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'Atom':
        return <Atom className={iconClass} />;
      case 'Paintbrush':
        return <Paintbrush className={iconClass} />;
      case 'PenTool':
        return <PenTool className={iconClass} />;
      case 'Database':
        return <Database className={iconClass} />;
      case 'Globe':
        return <Globe className={iconClass} />;
      default:
        return <Code2 className={iconClass} />;
    }
  };

  return (
    <section id="tools" className="py-20 md:py-28 bg-[#0a0c16] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('tools.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-white mb-4">
            {t('tools.title')}
          </h3>
          <p className="text-base text-white/60 font-sans max-w-md mx-auto">
            {t('tools.subtitle')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {TOOLS.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ 
                y: -3, 
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(223, 101, 19, 0.4)'
              }}
              className="group flex flex-col justify-between p-6 bg-white/[0.01] border border-white/5 rounded-xl transition-colors duration-300 text-center items-center min-h-[140px]"
              id={`tool-card-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-ember/15 transition-colors duration-300">
                {getToolIcon(tool.iconName)}
              </div>

              {/* Tool Identity */}
              <div>
                <h4 className="text-sm font-bold tracking-tight text-white mb-1">
                  {tool.name}
                </h4>
                <p className="text-[10px] font-mono tracking-wider uppercase text-white/40">
                  {tool.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
