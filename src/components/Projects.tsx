import {
  FolderGit2,
  Radar,
  Network,
  ScanLine,
  Terminal,
  Cloud,
  Trophy,
  Github,
  ExternalLink,
  Lock,
} from 'lucide-react';
import type { ReactNode } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type Project = {
  title: string;
  description: string;
  icon: ReactNode;
  tags: string[];
  accent: string;
};

const PROJECTS: Project[] = [
  {
    title: 'Network Security Scanner',
    description:
      'A Python-based tool that scans networks for open ports, identifies running services, and flags potential security risks.',
    icon: <Radar className="h-6 w-6" />,
    tags: ['Python', 'Nmap', 'Networking'],
    accent: 'neon',
  },
  {
    title: 'Nmap Network Discovery Lab',
    description:
      'A documented lab exercise exploring host discovery, port scanning techniques, and OS fingerprinting using Nmap across test environments.',
    icon: <Network className="h-6 w-6" />,
    tags: ['Nmap', 'Linux', 'Recon'],
    accent: 'cyan',
  },
  {
    title: 'Wireshark Network Analysis',
    description:
      'Capture and inspection of live network traffic to identify protocols, detect anomalies, and understand packet-level communication.',
    icon: <ScanLine className="h-6 w-6" />,
    tags: ['Wireshark', 'Networking', 'Analysis'],
    accent: 'neon',
  },
  {
    title: 'Linux Security Lab',
    description:
      'Hands-on practice with Linux hardening — user permissions, firewall configuration, SSH security, and system auditing.',
    icon: <Terminal className="h-6 w-6" />,
    tags: ['Linux', 'Hardening', 'Bash'],
    accent: 'cyan',
  },
  {
    title: 'AWS Cloud Project',
    description:
      'Cloud infrastructure deployment on AWS — configuring compute resources, security groups, and network access controls.',
    icon: <Cloud className="h-6 w-6" />,
    tags: ['AWS', 'Cloud', 'IAM'],
    accent: 'neon',
  },
  {
    title: 'Cybersecurity Hackathon Project',
    description:
      'A collaborative security challenge project built during a hackathon — applying threat analysis and defensive techniques under time constraints.',
    icon: <Trophy className="h-6 w-6" />,
    tags: ['Team', 'CTF', 'Defense'],
    accent: 'cyan',
  },
];

const accentMap: Record<string, { ring: string; text: string; glow: string }> = {
  neon: {
    ring: 'group-hover:border-neon-500/40',
    text: 'text-neon-400',
    glow: 'group-hover:shadow-glow-neon',
  },
  cyan: {
    ring: 'group-hover:border-cyan-glow/40',
    text: 'text-cyan-300',
    glow: 'group-hover:shadow-glow-cyan',
  },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          label="// 03 — Projects"
          title="Project Portfolio"
          description="Hands-on security work spanning network scanning, traffic analysis, system hardening, and cloud infrastructure."
          icon={<FolderGit2 className="h-3.5 w-3.5" />}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => {
            const a = accentMap[project.accent];
            return (
              <Reveal key={project.title} delay={(i % 3) * 80}>
                <div
                  className={`group glass ${a.ring} ${a.glow} p-6 h-full flex flex-col transition-all duration-300`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] ${a.text} transition-transform duration-300 group-hover:scale-110`}>
                      {project.icon}
                    </span>
                    <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title + description */}
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-grow">{project.description}</p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] font-mono text-[10px] text-slate-400 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 pt-5 border-t border-white/[0.06] flex gap-3">
                    <button
                      disabled
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-slate-500 cursor-not-allowed"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                      <Lock className="h-3 w-3 ml-auto opacity-50" />
                    </button>
                    <button
                      disabled
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-slate-500 cursor-not-allowed"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Demo
                      <Lock className="h-3 w-3 ml-auto opacity-50" />
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
