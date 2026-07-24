import { Monitor } from 'lucide-react';
interface ScreenshotFrameProps {
  title: string;
  subtitle: string;
}

export default function ScreenshotFrame({ title, subtitle }: ScreenshotFrameProps) {
  return (
    <div 
      className="bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden mt-4 relative group/frame"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Mock Window Controls Header */}
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex gap-1.5 items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 font-medium select-none flex items-center gap-1">
          <Monitor className="h-3 w-3" /> automation1.jpg
        </span>
        <div className="w-12" />
      </div>

      {/* Image Display */}
      <div className="w-full">
        <img
          src="/images/automation1.jpg"
          alt={title}
          className="w-full h-auto block"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Caption */}
      <div className="px-5 py-4 bg-white border-t border-slate-100">
          <h5 className="text-sm font-bold text-primary-midnight tracking-tight">
            {title}
          </h5>
        <p className="text-xs text-primary-midnight/60 font-sans leading-relaxed mt-1">
            {subtitle}
          </p>
        </div>
        </div>
  );
}

