import type { ReactNode } from 'react';

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function SectionHeading({ label, title, description, icon }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-5">
        {icon}
        <span className="font-mono text-xs tracking-[0.2em] text-neon-400 uppercase">{label}</span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-neon-500/50" />
        <span className="h-2 w-2 rounded-full bg-neon-500 shadow-glow-neon" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-neon-500/50" />
      </div>
    </div>
  );
}
