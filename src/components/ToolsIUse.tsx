import { TOOLS } from '../data';
import { PenTool, Code2 } from 'lucide-react';
import { BRAND_LOGOS } from './tools/brandLogos';
import { useLanguage } from '../i18n/LanguageProvider';

const TILE = 'mx-2.5 md:mx-3 shrink-0';

/** Single brand mark (or the HTML5+CSS3 composite / generic fallback). */
function BrandMark({ brand }: { brand: string }) {
  if (brand === 'generic') {
    return <PenTool className="h-6 w-6 text-ember" strokeWidth={1.7} aria-hidden="true" />;
  }
  if (brand === 'htmlcss') {
    const h = BRAND_LOGOS.html5;
    const c = BRAND_LOGOS.css3;
    return (
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="19" height="19" fill={h.hex} role="img" aria-label={h.title}>
          <path d={h.path} />
        </svg>
        <svg viewBox="0 0 24 24" width="19" height="19" fill={c.hex} role="img" aria-label={c.title}>
          <path d={c.path} />
        </svg>
      </span>
    );
  }
  const logo = BRAND_LOGOS[brand];
  if (!logo) return <Code2 className="h-6 w-6 text-ember" aria-hidden="true" />;
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill={logo.hex} role="img" aria-label={logo.title}>
      <title>{logo.title}</title>
      <path d={logo.path} />
    </svg>
  );
}

function ToolTile({
  tool,
  index,
  key,
}: {
  tool: (typeof TOOLS)[number];
  index?: number;
  /** Absent @types/react, TS doesn't special-case `key`; declare it so JSX accepts it. */
  key?: string;
}) {
  // Brand-tinted tile backdrop (generic gets the ember theme tint instead)
  const single = tool.brand !== 'generic' && tool.brand !== 'htmlcss' ? BRAND_LOGOS[tool.brand] : null;
  const tileStyle = single
    ? { backgroundColor: `${single.hex}26` }
    : tool.brand === 'htmlcss'
    ? { backgroundColor: 'rgba(255,255,255,0.05)' }
    : { backgroundColor: 'rgba(223, 101, 19, 0.12)' };

  return (
    <div
      className={TILE}
      {...(index !== undefined ? { id: `tool-card-${tool.name.toLowerCase().replace(/[\s/]+/g, '-')}` } : {})}
    >
      <div className="group/tool w-40 sm:w-48 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] px-4 py-6 flex flex-col items-center gap-4 text-center transition-colors duration-300">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/tool:scale-110"
          style={tileStyle}
        >
          <BrandMark brand={tool.brand} />
        </div>
        <div>
          <h4 className="text-sm font-bold tracking-tight text-white">{tool.name}</h4>
          <p className="text-[10px] font-mono tracking-wider uppercase text-white/40 mt-1">{tool.category}</p>
        </div>
      </div>
    </div>
  );
}

export default function ToolsIUse() {
  const { t } = useLanguage();

  return (
    <section
      id="tools"
      className="py-20 md:py-28 bg-[#0a0c16] text-white border-t border-white/5 relative overflow-hidden"
    >
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
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
      </div>

      {/* Infinite brand marquee — full-bleed, pauses on hover, fades at the edges */}
      <div className="relative marquee marquee-strip overflow-hidden z-10" aria-label="Tools I use">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-28 bg-gradient-to-r from-[#0a0c16] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-28 bg-gradient-to-l from-[#0a0c16] to-transparent z-10" />

        <div className="marquee-track flex w-max py-2">
          <div className="flex">
            {TOOLS.map((tool, idx) => (
              <ToolTile key={tool.name} tool={tool} index={idx} />
            ))}
          </div>
          {/* Duplicate for the seamless loop — hidden from screen readers */}
          <div className="flex" aria-hidden="true">
            {TOOLS.map(tool => (
              <ToolTile key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-8 text-center text-[10px] font-mono uppercase tracking-widest text-white/25">
        Hover to pause
      </p>
    </section>
  );
}
