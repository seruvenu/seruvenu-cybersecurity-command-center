import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const CERTIFICATIONS = [
  {
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    description: 'Cloud computing fundamentals, AWS services, security and architecture.',
    url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
  },
  {
    name: 'Cybersecurity',
    issuer: 'Cybersecurity Fundamentals',
    description: 'Fundamentals of cybersecurity, threats, vulnerabilities and protection.',
    url: 'https://www.cisa.gov/topics/cybersecurity-best-practices',
  },
  {
    name: 'Linux',
    issuer: 'Linux',
    description: 'Linux fundamentals, command line, system administration and security.',
    url: 'https://www.linux.org/',
  },
  {
    name: 'Networking',
    issuer: 'Cisco',
    description: 'Networking fundamentals, protocols, infrastructure and security.',
    url: 'https://www.cisco.com/site/us/en/learn/topics/networking/what-is-computer-networking.html',
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neon-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <SectionHeading
            label="// 03 — Certifications"
            title="Certifications"
            description="Continuous learning and professional development in cloud, networking and cybersecurity."
            icon={<Award className="h-3.5 w-3.5" />}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {CERTIFICATIONS.map((cert, index) => (
            <Reveal key={cert.name} delay={index * 100}>
              <button
                type="button"
                onClick={() =>
                  window.open(cert.url, '_blank', 'noopener,noreferrer')
                }
                className="group w-full text-left relative overflow-hidden rounded-2xl border border-neon-500/20 bg-base-900/60 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon-500/60 hover:shadow-[0_0_30px_rgba(0,255,100,0.12)]"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-xl border border-neon-500/30 bg-neon-500/10 flex items-center justify-center group-hover:border-neon-500/70 group-hover:bg-neon-500/20 transition-all">
                    <Award className="w-7 h-7 text-neon-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-mono text-lg font-bold text-white group-hover:text-neon-400 transition-colors">
                          {cert.name}
                        </h3>

                        <p className="mt-1 font-mono text-xs text-cyan-400">
                          {cert.issuer}
                        </p>
                      </div>

                      <ExternalLink className="w-5 h-5 shrink-0 text-slate-500 group-hover:text-neon-400 transition-colors" />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                      {cert.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-mono text-slate-500 group-hover:text-neon-400 transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                      VIEW CERTIFICATION
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}