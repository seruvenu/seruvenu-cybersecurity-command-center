import { ArrowRight, FlaskConical, Terminal } from 'lucide-react';
import Button from './Button';
import CyberGlobe from './3d/CyberGlobe';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Radial fade mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-900/50 via-transparent to-base-900" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid lg:grid-cols-[42fr_58fr] gap-8 lg:gap-6 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass mb-6 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-500" />
              </span>
              <span className="font-mono text-xs tracking-[0.15em] text-slate-300">
                SYSTEM ONLINE — SECURE CONNECTION
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight animate-fade-up"
              style={{ animationDelay: '100ms', maxWidth: 520 }}
            >
              CYBERSECURITY
              <br />
              <span className="text-glow-neon text-neon-400">COMMAND</span>{' '}
              <span className="text-glow-cyan text-cyan-300">CENTER</span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 font-mono text-sm md:text-base text-slate-400 tracking-wide animate-fade-up"
              style={{ animationDelay: '200ms', maxWidth: 480 }}
            >
              Explore networks. Analyze threats. Secure systems.
            </p>

            {/* Buttons */}
            <div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <Button
                variant="neon"
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                EXPLORE PROJECTS
              </Button>
              <Button
                variant="cyan"
                icon={<FlaskConical className="h-4 w-4" />}
                onClick={() => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ENTER CYBER LAB
              </Button>
            </div>

            {/* Terminal-style info line */}
            <div
              className="mt-10 flex items-center justify-center lg:justify-start gap-2 font-mono text-xs text-slate-500 animate-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              <Terminal className="h-3.5 w-3.5 text-neon-500/60" />
              <span>
                <span className="text-neon-400">venu@sec</span>:<span className="text-cyan-400">~</span>$
                <span className="text-slate-300"> whoami</span>
                <span className="ml-1 text-neon-400 animate-blink">_</span>
              </span>
            </div>
          </div>

          {/* Right — Large Interactive 3D Globe */}
          <div className="order-1 lg:order-2 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <CyberGlobe />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-neon-500/50 to-transparent" />
      </div>
    </section>
  );
}
