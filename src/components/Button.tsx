import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'neon' | 'cyan' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<Variant, string> = {
  neon:
    'bg-neon-500/10 text-neon-300 border border-neon-500/40 hover:bg-neon-500/20 hover:border-neon-500/70 hover:shadow-glow-neon hover:text-neon-200',
  cyan:
    'bg-cyan-glow/10 text-cyan-300 border border-cyan-glow/40 hover:bg-cyan-glow/20 hover:border-cyan-glow/70 hover:shadow-glow-cyan hover:text-cyan-200',
  ghost:
    'bg-white/[0.03] text-slate-300 border border-white/10 hover:border-white/25 hover:bg-white/[0.06] hover:text-white',
};

export default function Button({ children, variant = 'neon', icon, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-mono text-sm font-medium tracking-wide transition-all duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
      )}
    </button>
  );
}
