import { ShieldCheck, Heart } from 'lucide-react';

const NAV_LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'lab', label: 'CYBER LAB' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Footer() {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-500/10 border border-neon-500/40">
              <ShieldCheck className="h-4 w-4 text-neon-400" />
            </span>
            <span className="font-display text-sm font-bold text-white tracking-wider">
              VENU<span className="text-neon-400">.SEC</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="font-mono text-[11px] tracking-wider text-slate-500 hover:text-neon-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Venu — Cybersecurity Command Center
          </p>
          <p className="font-mono text-xs text-slate-600 flex items-center gap-1.5">
            Built with <Heart className="h-3 w-3 text-neon-500/60" /> for a secure future
          </p>
        </div>
      </div>
    </footer>
  );
}
