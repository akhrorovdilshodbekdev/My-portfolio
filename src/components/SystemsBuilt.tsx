import { motion, AnimatePresence } from 'motion/react';
import { AUTOMATION_PROJECTS, AUTOMATION_PROJECTS_UZ } from '../data';
import { ChevronDown, CheckCircle2, Zap, Calendar, Workflow, Layers, Settings, Server } from 'lucide-react';
import { useState } from 'react';
import LeadCaptureSandbox from './portfolio/LeadCaptureSandbox';
import ClinicSchedulerSandbox from './portfolio/ClinicSchedulerSandbox';
import RestaurantBookingSandbox from './portfolio/RestaurantBookingSandbox';
import { useLanguage } from '../i18n/LanguageProvider';

export default function SystemsBuilt() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t, lang } = useLanguage();

  const projects = lang === 'uz' ? AUTOMATION_PROJECTS_UZ : AUTOMATION_PROJECTS;

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Get a category icon based on mockType for visual interest inside the card
  const getCategoryIcon = (mockType: string) => {
    const iconClass = "h-5 w-5 text-ember";
    switch (mockType) {
      case 'workflow':
        return <Workflow className={iconClass} />;
      case 'flow':
        return <Settings className={iconClass} />;
      case 'calendar':
        return <Calendar className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <section id="automations" className="py-20 md:py-28 bg-[#faf8ff] border-t border-card-border/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('automations.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-primary-midnight mb-4">
            {t('automations.title')}
          </h3>
          <p className="text-base md:text-lg text-primary-midnight/70 font-sans leading-relaxed">
            {t('automations.subtitle')}
          </p>

          {/* Self-Hosted Private VPS Banner */}
          <div className="mt-6 p-4 rounded-xl border border-slate-200/80 bg-white shadow-sm flex items-start gap-3.5 max-w-xl">
            <div className="p-2.5 bg-ember/10 text-ember rounded-lg shrink-0">
              <Server className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold font-mono text-primary-midnight uppercase tracking-wider">
                {t('automations.vpsTitle')}
              </h4>
              <p className="text-xs text-primary-midnight/75 font-sans mt-1 leading-relaxed">
                {t('automations.vpsDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Project Cards Stack / Grid */}
        <div className="space-y-6 max-w-5xl">
          {projects.map((project, idx) => {
            const isExpanded = expandedId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => toggleExpand(project.id)}
                className={`group cursor-pointer rounded-xl bg-white border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'border-ember shadow-md bg-white' 
                    : 'border-card-border hover:border-primary-midnight/30 hover:shadow-sm'
                }`}
                id={`auto-project-card-${project.id}`}
              >
                {/* Main Card Summary View (Header) */}
                <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
                  <div className="flex items-start gap-4">
                    {/* Visual Anchor Indicator Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                      isExpanded 
                        ? 'bg-ember/10 border-ember/20 text-ember' 
                        : 'bg-slate-100 border-slate-200 text-primary-midnight/70 group-hover:bg-ember/5 group-hover:border-ember/10 group-hover:text-ember'
                    }`}>
                      {getCategoryIcon(project.mockType)}
                    </div>

                    <div>
                      {/* Project Title */}
                      <h4 className={`text-lg md:text-xl font-bold font-sans tracking-tight transition-colors duration-200 ${
                        isExpanded ? 'text-ember' : 'text-primary-midnight group-hover:text-ember'
                      }`}>
                        {project.title}
                      </h4>
                      {/* Short summary description */}
                      <p className="text-sm text-primary-midnight/70 font-sans mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Right side controls: Tags & Expand Button */}
                  <div className="flex flex-wrap items-center sm:justify-end gap-3 self-start sm:self-center">
                    {/* Tech tags - hidden on extremely narrow screens, visible elsewhere */}
                    <div className="hidden md:flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 text-primary-midnight/70 border border-slate-200/50 px-2.5 py-0.5 text-[10px] font-mono font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive state trigger icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                      isExpanded 
                        ? 'bg-ember text-white border-ember rotate-180' 
                        : 'bg-slate-50 text-primary-midnight/50 border-slate-200 group-hover:text-primary-midnight'
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Smooth Dropdown Expandable Details Area */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-slate-100"
                    >
                      <div className="p-6 md:p-8 bg-slate-50/50 space-y-6">
                        
                        {/* Extended summary paragraph */}
                        <div>
                          <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-primary-midnight/50 mb-2">
                            {t('automations.overview')}
                          </h5>
                          <p className="text-sm text-primary-midnight/80 font-sans leading-relaxed">
                            {project.extendedDescription}
                          </p>
                        </div>

                        {/* Bulleted list of Key Features */}
                        {project.features && project.features.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-primary-midnight/50 mb-3">
                              {t('automations.keyCapabilities')}
                            </h5>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {project.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2.5 text-sm text-primary-midnight/85 font-sans">
                                  <CheckCircle2 className="h-4 w-4 text-[#10b981] mt-0.5 shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Business Impact callout frame */}
                        {project.impact && (
                          <div className="rounded-lg bg-ember/[0.03] border border-ember/15 p-4 flex items-start gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ember/10 text-ember shrink-0">
                              <Zap className="h-4 w-4 fill-current" />
                            </span>
                            <div>
                              <h6 className="text-xs font-bold font-mono uppercase tracking-wider text-ember leading-none mb-1">
                                {t('automations.businessImpact')}
                              </h6>
                              <p className="text-sm font-sans font-medium text-primary-midnight/90">
                                {project.impact}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Interactive Sandbox Demos & Visual Proofs */}
                        {project.id === 'auto-1' && (
                          <div className="pt-2">
                            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-primary-midnight/50 mb-3">
                              {t('automations.interactivePipeline')}
                            </h5>
                            <LeadCaptureSandbox />
                          </div>
                        )}

                        {project.id === 'auto-3' && (
                          <div className="pt-2">
                            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-primary-midnight/50 mb-3">
                              {t('automations.omnichannelPlayground')}
                            </h5>
                            <RestaurantBookingSandbox />
                          </div>
                        )}

                        {project.id === 'auto-4' && (
                          <div className="pt-2">
                            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-primary-midnight/50 mb-3">
                              {t('automations.conversationalPlayground')}
                            </h5>
                            <ClinicSchedulerSandbox />
                          </div>
                        )}

                        {/* Complete tags catalog footer */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/40">
                          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary-midnight/40 self-center mr-2">
                            {t('automations.stack')}
                          </span>
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 text-primary-midnight/80 border border-slate-200/50 px-3 py-1 text-xs font-mono font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
