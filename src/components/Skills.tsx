import {
  Code2,
  Cpu,
  Terminal,
  Network,
  Radar,
  ScanLine,
  Cloud,
  GitBranch,
  Github,
  ShieldCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type Skill = {
  name: string;
  icon: ReactNode;
  level: string;
  color: string;
  url: string;
};

const SKILLS: Skill[] = [
  { name: 'Python', icon: <Code2 className="h-6 w-6" />, level: 'Programming', color: 'neon', url: 'https://www.python.org/' },
  { name: 'Java', icon: <Cpu className="h-6 w-6" />, level: 'Programming', color: 'cyan', url: 'https://www.java.com/' },
  { name: 'C', icon: <Terminal className="h-6 w-6" />, level: 'Programming', color: 'neon', url: 'https://en.cppreference.com/w/c' },
  { name: 'Linux', icon: <Terminal className="h-6 w-6" />, level: 'Systems', color: 'cyan', url: 'https://www.linux.org/' },
  { name: 'Networking', icon: <Network className="h-6 w-6" />, level: 'Infrastructure', color: 'neon', url: 'https://www.cisco.com/c/en/us/solutions/networking.html' },
  { name: 'Nmap', icon: <Radar className="h-6 w-6" />, level: 'Security Tool', color: 'cyan', url: 'https://nmap.org/' },
  { name: 'Wireshark', icon: <ScanLine className="h-6 w-6" />, level: 'Security Tool', color: 'neon', url: 'https://www.wireshark.org/' },
  { name: 'AWS', icon: <Cloud className="h-6 w-6" />, level: 'Cloud', color: 'cyan', url: 'https://aws.amazon.com/' },
  { name: 'Git', icon: <GitBranch className="h-6 w-6" />, level: 'Version Control', color: 'neon', url: 'https://git-scm.com/' },
  { name: 'GitHub', icon: <Github className="h-6 w-6" />, level: 'Version Control', color: 'cyan', url: 'https://github.com/' },
  { name: 'Cybersecurity', icon: <ShieldCheck className="h-6 w-6" />, level: 'Core Domain', color: 'neon', url: 'https://www.cisa.gov/topics/cyber-threats-and-advisories' },
];

const colorMap: Record<string, string> = {
  neon: 'text-neon-400 border-neon-500/30 hover:border-neon-500/60 hover:shadow-glow-neon',
  cyan: 'text-cyan-300 border-cyan-glow/30 hover:border-cyan-glow/60 hover:shadow-glow-cyan',
};

function SkillCard({ skill }: { skill: Skill }) {
  const cardClass = `group glass glass-hover p-6 flex flex-col items-center text-center gap-3 cursor-pointer ${colorMap[skill.color]}`;

  return (
    <a href={skill.url} target="_blank" rel="noopener noreferrer" aria-label={`Learn more about ${skill.name}`} className={cardClass}>
      <span className="transition-transform duration-300 group-hover:scale-110">{skill.icon}</span>
      <div>
        <h3 className="font-display text-base font-semibold text-white">{skill.name}</h3>
        <p className="mt-0.5 font-mono text-[10px] text-slate-500 uppercase tracking-wider">{skill.level}</p>
      </div>
    </a>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          label="// 02 — Skills"
          title="Technical Arsenal"
          description="The tools, languages, and technologies I work with across programming, systems, networking, and security."
          icon={<Cpu className="h-3.5 w-3.5" />}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 60}>
              <SkillCard skill={skill} />
            </Reveal>
          ))}

          <Reveal delay={SKILLS.length * 60}>
            <div className="glass p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[140px]">
              <Terminal className="h-6 w-6 text-neon-400/50" />
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">More in progress</p>
              <span className="font-mono text-xs text-neon-400 animate-blink">_</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}