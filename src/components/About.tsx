import { User, GraduationCap, ShieldCheck, Terminal, Code2, Network } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const PROFILE_STATS = [
  { icon: <GraduationCap className="h-5 w-5" />, label: 'Field', value: 'Cyber Security' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Focus', value: 'Network Security' },
  { icon: <Terminal className="h-5 w-5" />, label: 'Approach', value: 'Hands-on Labs' },
];

const INTERESTS = [
  { icon: <Network className="h-4 w-4" />, label: 'Network Analysis' },
  { icon: <ShieldCheck className="h-4 w-4" />, label: 'Threat Detection' },
  { icon: <Code2 className="h-4 w-4" />, label: 'Security Scripting' },
  { icon: <Terminal className="h-4 w-4" />, label: 'Linux Systems' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          label="// 01 — About"
          title="About Me"
          icon={<User className="h-3.5 w-3.5" />}
        />

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Profile card */}
          <Reveal className="lg:col-span-2">
            <div className="glass glass-hover p-8 h-full flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-neon-500/20 blur-2xl animate-pulse-glow" />
                <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-neon-500/20 via-base-700 to-cyan-glow/20 border border-neon-500/30 flex items-center justify-center">
                  <span className="font-display text-5xl font-bold text-neon-400 text-glow-neon">V</span>
                </div>
                {/* Status dot */}
                <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-neon-500 border-2 border-base-900 shadow-glow-neon" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white">Venu</h3>
              <p className="mt-1 font-mono text-sm text-neon-400">Cyber Security Student</p>

              <div className="mt-6 w-full space-y-3">
                {PROFILE_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <span className="text-neon-400">{stat.icon}</span>
                    <span className="font-mono text-xs text-slate-500 uppercase tracking-wider flex-1 text-left">
                      {stat.label}
                    </span>
                    <span className="font-mono text-sm text-slate-200">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Introduction */}
          <Reveal className="lg:col-span-3" delay={100}>
            <div className="glass p-8 md:p-10 h-full">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-neon-500/60" />
                <span className="ml-3 font-mono text-xs text-slate-500">about_venu.md</span>
              </div>

              <div className="space-y-5 text-slate-300 leading-relaxed">
                <p className="text-lg">
                  I'm <span className="text-neon-400 font-medium">Venu</span>, a student
                  specializing in <span className="text-cyan-300 font-medium">Cyber Security</span>.
                  My academic journey is focused on understanding how networks operate, how
                  attackers think, and how systems can be defended.
                </p>
                <p>
                  I spend my time working through hands-on labs — scanning networks, capturing and
                  analyzing traffic, hardening Linux systems, and building security tooling with
                  Python. I'm driven by the challenge of turning theory into practical skills that
                  solve real security problems.
                </p>
                <p>
                  This portfolio is my command center: a space to track my projects, document lab
                  work, and showcase the skills I'm developing as I grow in the field of
                  cybersecurity.
                </p>
              </div>

              {/* Interests */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <p className="font-mono text-xs text-slate-500 uppercase tracking-[0.15em] mb-4">
                  Areas of Interest
                </p>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-slate-300 hover:border-neon-500/30 hover:text-neon-300 transition-colors"
                    >
                      <span className="text-neon-400">{item.icon}</span>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
