import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import {
  FlaskConical,
  Activity,
  Shield,
  Server,
  Router,
  Database,
  Terminal,
  Search,
  Radio,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Network,
  Zap,
  Crosshair,
  Wifi,
  HardDrive,
  Cpu,
  Play,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type ScanResult = {
  port: number;
  service: string;
  status: string;
  risk: string;
};

type Packet = {
  protocol: string;
  source: string;
  destination: string;
  port: number;
  status: string;
};

type Threat = {
  time: string;
  event: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
};

const commands = [
  'help',
  'ip a',
  'ip addr',
  'ifconfig',
  'ipconfig',
  'nmap',
  'nmap -sV demo.local',
  'ping demo.local',
  'netstat',
  'ss -tuln',
  'whoami',
  'hostname',
  'uname -a',
  'ps',
  'ls',
  'pwd',
  'clear',
];

const scanResults: ScanResult[] = [
  { port: 22, service: 'SSH', status: 'OPEN', risk: 'MEDIUM' },
  { port: 80, service: 'HTTP', status: 'OPEN', risk: 'LOW' },
  { port: 443, service: 'HTTPS', status: 'OPEN', risk: 'LOW' },
  { port: 3306, service: 'MySQL', status: 'FILTERED', risk: 'HIGH' },
];

const initialPackets: Packet[] = [
  {
    protocol: 'TCP',
    source: '192.168.1.42',
    destination: '192.168.1.20',
    port: 443,
    status: 'ALLOWED',
  },
  {
    protocol: 'UDP',
    source: '192.168.1.15',
    destination: '192.168.1.1',
    port: 53,
    status: 'ALLOWED',
  },
  {
    protocol: 'TCP',
    source: '192.168.1.66',
    destination: '192.168.1.20',
    port: 22,
    status: 'BLOCKED',
  },
  {
    protocol: 'ICMP',
    source: '192.168.1.20',
    destination: '192.168.1.42',
    port: 0,
    status: 'ALLOWED',
  },
];

const initialThreats: Threat[] = [
  {
    time: '18:31:04',
    event: 'Firewall rule triggered',
    severity: 'LOW',
  },
  {
    time: '18:30:41',
    event: 'Suspicious login detected',
    severity: 'MEDIUM',
  },
  {
    time: '18:29:16',
    event: 'Port scan detected',
    severity: 'HIGH',
  },
  {
    time: '18:27:52',
    event: 'Malware signature blocked',
    severity: 'CRITICAL',
  },
];

const randomPacket = (): Packet => {
  const protocols = ['TCP', 'UDP', 'ICMP'];
  const statuses = ['ALLOWED', 'ALLOWED', 'BLOCKED'];

  return {
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    source: `192.168.1.${Math.floor(Math.random() * 80) + 1}`,
    destination: `192.168.1.${Math.floor(Math.random() * 80) + 1}`,
    port: [22, 53, 80, 443, 3306][Math.floor(Math.random() * 5)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
};

const timeNow = () =>
  new Date().toLocaleTimeString([], {
    hour12: false,
  });

// Collapse repeated whitespace and trim, so extra spaces/typos in spacing
// don't fall through to "Command not found".
const normalizeCommand = (value: string) =>
  value.trim().replace(/\s+/g, ' ').toLowerCase();

export default function CyberLab() {
  const [target, setTarget] = useState('demo.local');
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const [packets, setPackets] = useState<Packet[]>(initialPackets);
  const [threats] = useState<Threat[]>(initialThreats);

  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [terminalLines, setTerminalLines] = useState<string[]>([
    '╔══════════════════════════════════════════════╗',
    '║        CYBER LAB TERMINAL v2.0              ║',
    '║        SECURITY SIMULATION CORE              ║',
    '╚══════════════════════════════════════════════╝',
    '',
    '[+] Initializing secure simulation...',
    '[+] Network interface: ONLINE',
    '[+] Defensive systems: ACTIVE',
    '[+] Threat monitor: ACTIVE',
    '',
    'Type "help" to view available commands.',
    '',
  ]);

  const [terminalBusy, setTerminalBusy] = useState(false);
  const [attackSimulation, setAttackSimulation] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [stats, setStats] = useState({
    nodes: 7,
    packets: 142,
    blocked: 38,
    score: 94,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPackets((current) => [randomPacket(), ...current].slice(0, 6));

      setStats((current) => ({
        ...current,
        packets: Math.floor(120 + Math.random() * 70),
        blocked: Math.floor(30 + Math.random() * 20),
        score: Math.floor(90 + Math.random() * 9),
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const runScan = () => {
    if (scanning) return;

    setScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 1800);
  };

  const addTerminalLines = (lines: string[]) => {
    setTerminalLines((current) => [...current, ...lines]);
  };

  const executeCommand = async (customCommand?: string) => {
    const input = normalizeCommand(customCommand ?? command);

    if (!input || terminalBusy) return;

    if (input === 'clear') {
      setTerminalLines([]);
      setCommand('');
      return;
    }

    setTerminalBusy(true);
    setSuggestions([]);

    setHistory((current) => {
      const next = [...current, input];
      return next.slice(-30);
    });

    setHistoryIndex(-1);

    addTerminalLines([
      `┌──(venu㉿cyber-lab)-[~]`,
      `└─$ ${input}`,
    ]);

    setCommand('');

    await new Promise((resolve) => setTimeout(resolve, 350));

    let output: string[] = [];

    switch (input) {
      case 'help':
        output = [
          '',
          'AVAILABLE COMMANDS',
          '────────────────────────────────────────',
          ' help                 Show this help',
          ' ip a                 Network interfaces',
          ' ip addr              Network interfaces',
          ' ifconfig             Interface information',
          ' ipconfig             Windows-style network info',
          ' nmap                 Simulated port scan',
          ' nmap -sV demo.local Service detection scan',
          ' ping demo.local      Simulated connectivity test',
          ' netstat              Network connections',
          ' ss -tuln             Listening ports',
          ' whoami               Current user',
          ' hostname             System hostname',
          ' uname -a             System information',
          ' ps                   Running processes',
          ' ls                   List files',
          ' pwd                  Current directory',
          ' clear                Clear terminal',
          '',
          'TIP: Use ↑ / ↓ for command history.',
        ];
        break;

      case 'ip a':
      case 'ip addr':
      case 'ifconfig':
      case 'ipconfig':
        output = [
          '',
          'NETWORK INTERFACE INFORMATION',
          '────────────────────────────────────────',
          '',
          'eth0:',
          '  state      : UP',
          '  inet       : 192.168.1.42/24',
          '  gateway    : 192.168.1.1',
          '  broadcast  : 192.168.1.255',
          '  mac        : 00:1A:2B:3C:4D:5E',
          '',
          'wlan0:',
          '  state      : UP',
          '  inet       : 192.168.1.43/24',
          '  signal     : 87%',
          '',
          '[✓] Network simulation active',
        ];
        break;

      case 'nmap':
        output = [
          '',
          'Starting Nmap 7.95 (SIMULATION MODE)',
          'Scanning demo.local [192.168.1.20]',
          '',
          'PORT      STATE       SERVICE',
          '22/tcp    open        ssh',
          '80/tcp    open        http',
          '443/tcp   open        https',
          '3306/tcp  filtered    mysql',
          '',
          'Host is up.',
          '4 ports analyzed.',
          '',
          '[SIMULATION] No real network traffic generated.',
        ];
        break;

      case 'nmap -sv demo.local':
        output = [
          '',
          'Starting service detection...',
          '',
          'PORT      STATE       SERVICE       VERSION',
          '22/tcp    open        ssh           OpenSSH 9.x',
          '80/tcp    open        http          nginx',
          '443/tcp   open        https         nginx',
          '3306/tcp  filtered    mysql         MySQL',
          '',
          'OS guess: Linux server',
          'Latency: 0.024s',
          '',
          '[✓] Scan simulation completed.',
          '[!] No real target contacted.',
        ];
        break;

      case 'ping demo.local':
        output = [
          '',
          'PING demo.local (192.168.1.20)',
          '',
          '64 bytes from 192.168.1.20: icmp_seq=1 ttl=64 time=12.4 ms',
          '64 bytes from 192.168.1.20: icmp_seq=2 ttl=64 time=10.8 ms',
          '64 bytes from 192.168.1.20: icmp_seq=3 ttl=64 time=11.2 ms',
          '',
          '--- demo.local ping statistics ---',
          '3 packets transmitted, 3 received, 0% packet loss',
        ];
        break;

      case 'netstat':
      case 'ss -tuln':
        output = [
          '',
          'ACTIVE CONNECTIONS',
          '────────────────────────────────────────',
          'tcp   LISTEN   0.0.0.0:22      ssh',
          'tcp   LISTEN   0.0.0.0:80      nginx',
          'tcp   LISTEN   0.0.0.0:443     https',
          'tcp   LISTEN   127.0.0.1:3306  mysql',
          '',
          '[✓] Connection table generated.',
        ];
        break;

      case 'whoami':
        output = [
          '',
          'venu',
          'role: security researcher',
          'access: laboratory',
        ];
        break;

      case 'hostname':
        output = [
          '',
          'cyber-command-center',
        ];
        break;

      case 'uname -a':
        output = [
          '',
          'Linux cyber-command-center 6.8.0-cyber',
          '#1 SMP PREEMPT x86_64 GNU/Linux',
        ];
        break;

      case 'ps':
        output = [
          '',
          'PID     PROCESS',
          '101     network-monitor',
          '142     firewall-engine',
          '207     packet-analyzer',
          '311     threat-detection',
          '404     cyber-lab-ui',
        ];
        break;

      case 'ls':
        output = [
          '',
          'drwxr-xr-x  labs/',
          'drwxr-xr-x  network/',
          'drwxr-xr-x  reports/',
          '-rw-r--r--  README.md',
          '-rw-r--r--  security.log',
        ];
        break;

      case 'pwd':
        output = [
          '',
          '/home/venu/cyber-lab',
        ];
        break;

      default:
        output = [
          '',
          `Command not found: ${input}`,
          'Type "help" for available commands.',
        ];
    }

    await new Promise((resolve) => setTimeout(resolve, 250));

    addTerminalLines(output);
    setTerminalBusy(false);

    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInput = (value: string) => {
    setCommand(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = commands
      .filter((item) => item.startsWith(value.toLowerCase()))
      .slice(0, 5);

    setSuggestions(filtered);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (history.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setCommand('');
      } else {
        setHistoryIndex(nextIndex);
        setCommand(history[nextIndex]);
      }

      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();

      if (suggestions.length > 0) {
        setCommand(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const runAttackSimulation = () => {
    setAttackSimulation(true);

    addTerminalLines([
      '',
      '[ATTACK PATH SIMULATION]',
      'Attacker',
      '   ↓',
      'Firewall',
      '   ↓',
      'Router',
      '   ↓',
      'Web Server',
      '   ↓',
      'Database',
      '',
      '[!] Threat detected',
      '[✓] Firewall blocked malicious request',
      '[✓] Database remains protected',
      '',
    ]);

    setTimeout(() => {
      setAttackSimulation(false);
    }, 3000);
  };

  return (
    <section id="lab" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-neon-500/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          label="// 04 — Cyber Lab"
          title="Cyber Lab"
          description="Interactive cybersecurity simulations for exploring networks, threats, packets and defensive monitoring."
          icon={<FlaskConical className="h-3.5 w-3.5" />}
        />

        {/* STATS */}
        <Reveal>
          <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<Network />} label="Active Nodes" value={stats.nodes} />
            <StatCard icon={<Activity />} label="Packets/sec" value={stats.packets} />
            <StatCard icon={<Shield />} label="Threats Blocked" value={stats.blocked} />
            <StatCard icon={<CheckCircle2 />} label="Security Score" value={stats.score} suffix="%" />
          </div>
        </Reveal>

        {/* SCANNER */}
        <Reveal>
          <div className="glass gradient-border p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-neon-400" />
                  <h3 className="font-display text-xl font-bold text-white">
                    NETWORK SCANNER
                  </h3>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Safe simulated reconnaissance environment
                </p>
              </div>

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-300 font-mono text-[10px] uppercase">
                <Radio className="h-3 w-3" />
                Simulation
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-white outline-none focus:border-neon-500/50"
                placeholder="demo.local"
              />

              <button
                onClick={runScan}
                disabled={scanning}
                className="px-6 py-3 rounded-lg bg-neon-500/10 border border-neon-500/40 text-neon-400 font-mono text-xs uppercase tracking-wider hover:bg-neon-500/20 transition disabled:opacity-50"
              >
                {scanning ? 'Scanning...' : 'Run Scan'}
              </button>
            </div>

            {scanning && (
              <div className="mt-6">
                <div className="flex justify-between text-[10px] font-mono uppercase text-slate-500 mb-2">
                  <span>Analyzing {target}</span>
                  <span className="text-neon-400 animate-pulse">
                    Processing
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-neon-700 via-neon-500 to-cyan-glow animate-pulse" />
                </div>
              </div>
            )}

            {scanComplete && !scanning && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4 text-neon-400 font-mono text-xs uppercase">
                  <CheckCircle2 className="h-4 w-4" />
                  Scan completed — {target}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] uppercase font-mono text-slate-500">
                        <th className="py-3">Port</th>
                        <th className="py-3">Service</th>
                        <th className="py-3">Status</th>
                        <th className="py-3">Risk</th>
                      </tr>
                    </thead>

                    <tbody>
                      {scanResults.map((result) => (
                        <tr
                          key={result.port}
                          className="border-b border-white/5 text-xs font-mono"
                        >
                          <td className="py-3 text-white">
                            {result.port}/tcp
                          </td>
                          <td className="py-3 text-slate-400">
                            {result.service}
                          </td>
                          <td className="py-3 text-neon-400">
                            {result.status}
                          </td>
                          <td className="py-3">
                            <RiskBadge risk={result.risk} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* TOPOLOGY */}
        <Reveal>
          <div className="glass gradient-border p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Network className="h-5 w-5 text-cyan-300" />
              <h3 className="font-display text-xl font-bold text-white">
                LIVE NETWORK TOPOLOGY
              </h3>
            </div>

            <p className="text-sm text-slate-500 mb-8">
              Watch simulated traffic move through the security architecture.
            </p>

            <div className="relative min-h-[360px] rounded-xl bg-black/20 border border-white/5 overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-20" />

              <div className="absolute left-[20%] right-[20%] top-1/2 h-px bg-gradient-to-r from-red-500/20 via-neon-400/70 to-neon-500/20" />

              <div className="absolute left-1/2 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-cyan-400/20 via-cyan-300/70 to-cyan-400/20" />

              <TopologyNode
                icon={<Crosshair />}
                label="ATTACKER"
                position="left-[8%] top-[40%]"
                danger
              />

              <TopologyNode
                icon={<Shield />}
                label="FIREWALL"
                position="left-1/2 top-[8%] -translate-x-1/2"
              />

              <TopologyNode
                icon={<Router />}
                label="ROUTER"
                position="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              <TopologyNode
                icon={<Server />}
                label="WEB SERVER"
                position="right-[8%] top-[40%]"
              />

              <TopologyNode
                icon={<Database />}
                label="DATABASE"
                position="left-1/2 bottom-[8%] -translate-x-1/2"
              />

              <div className="absolute left-[30%] top-[48%] h-2 w-2 rounded-full bg-neon-400 shadow-glow-neon animate-ping" />

              <div
                className="absolute left-[65%] top-[48%] h-2 w-2 rounded-full bg-cyan-300 shadow-glow-neon animate-ping"
                style={{ animationDelay: '800ms' }}
              />
            </div>

            <button
              onClick={runAttackSimulation}
              disabled={attackSimulation}
              className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-400 font-mono text-xs uppercase hover:bg-red-500/20 transition disabled:opacity-50"
            >
              <Zap className="h-4 w-4" />
              {attackSimulation
                ? 'Attack Path Simulation Running...'
                : 'Run Attack Path Simulation'}
            </button>
          </div>
        </Reveal>

        {/* PACKETS + THREATS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Reveal>
            <div className="glass gradient-border p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-5 w-5 text-neon-400" />
                <h3 className="font-display text-lg font-bold text-white">
                  PACKET MONITOR
                </h3>
              </div>

              <div className="space-y-2">
                {packets.map((packet, index) => (
                  <div
                    key={`${packet.source}-${packet.port}-${index}`}
                    className="grid grid-cols-5 gap-2 items-center px-3 py-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-[9px]"
                  >
                    <span className="text-cyan-300">{packet.protocol}</span>
                    <span className="text-slate-500 truncate">
                      {packet.source}
                    </span>
                    <span className="text-slate-500 truncate">
                      {packet.destination}
                    </span>
                    <span className="text-white">{packet.port}</span>
                    <span
                      className={
                        packet.status === 'BLOCKED'
                          ? 'text-red-400'
                          : 'text-neon-400'
                      }
                    >
                      {packet.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass gradient-border p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <h3 className="font-display text-lg font-bold text-white">
                  THREAT MONITOR
                </h3>
              </div>

              <div className="space-y-3">
                {threats.map((threat, index) => (
                  <div
                    key={`${threat.time}-${index}`}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-slate-300 truncate">
                        {threat.event}
                      </div>

                      <div className="text-[9px] text-slate-600 font-mono mt-1">
                        {threat.time}
                      </div>
                    </div>

                    <ThreatBadge severity={threat.severity} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* TERMINAL */}
        <Reveal>
          <div className="glass gradient-border overflow-visible mb-8">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-3">
                <Terminal className="h-4 w-4 text-neon-400" />

                <span className="font-mono text-xs text-white">
                  CYBER-LAB TERMINAL
                </span>

                <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] text-slate-600 font-mono">
                  <Wifi className="h-3 w-3" />
                  SIMULATED
                </span>
              </div>

              <button
                onClick={() => setTerminalLines([])}
                className="p-2 rounded-md text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition"
                title="Clear terminal"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div
              className="p-5 bg-black/40 min-h-[390px] max-h-[500px] overflow-y-auto cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="space-y-1 font-mono text-xs">
                {terminalLines.map((line, index) => (
                  <div
                    key={index}
                    className={
                      line.startsWith('┌') ||
                      line.startsWith('└') ||
                      line.startsWith('>') ||
                      line.startsWith('[+')
                        ? 'text-neon-400'
                        : line.includes('[!]') || line.includes('CRITICAL')
                          ? 'text-red-400'
                          : line.includes('[✓]')
                            ? 'text-cyan-300'
                            : 'text-slate-500'
                    }
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>

              <div className="relative flex items-center gap-2 mt-4">
                <ChevronRight className="h-3.5 w-3.5 text-neon-400 shrink-0" />

                <span className="text-neon-400 font-mono text-xs whitespace-nowrap">
                  venu@cyber-lab:~$
                </span>

                <input
                  ref={inputRef}
                  value={command}
                  disabled={terminalBusy}
                  onChange={(e) => handleInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-w-0 bg-transparent outline-none font-mono text-xs text-white caret-neon-400"
                  placeholder={terminalBusy ? 'processing...' : 'type a command...'}
                  autoComplete="off"
                  spellCheck={false}
                />

                {terminalBusy && (
                  <span className="text-neon-400 animate-pulse text-xs">
                    ●
                  </span>
                )}

                {suggestions.length > 0 && (
                  <div className="absolute left-0 bottom-full mb-2 w-full max-w-md rounded-lg border border-white/10 bg-[#07100d] shadow-2xl overflow-hidden">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setCommand(suggestion);
                          setSuggestions([]);
                          inputRef.current?.focus();
                        }}
                        className="block w-full text-left px-4 py-2 font-mono text-xs text-slate-400 hover:text-neon-400 hover:bg-neon-500/5 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                {[
                  'help',
                  'ip a',
                  'nmap -sV demo.local',
                  'ping demo.local',
                  'ss -tuln',
                  'whoami',
                ].map((quickCommand) => (
                  <button
                    key={quickCommand}
                    onClick={() => executeCommand(quickCommand)}
                    disabled={terminalBusy}
                    className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/10 text-[9px] font-mono text-slate-500 hover:text-neon-400 hover:border-neon-500/30 transition disabled:opacity-40"
                  >
                    {quickCommand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center font-mono text-[10px] uppercase tracking-wider text-slate-600">
          <Lock className="h-3.5 w-3.5" />

          Simulation environment — all network activity shown is synthetic and
          for educational demonstration only.
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix = '',
}: {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="glass gradient-border p-5 hover:border-neon-500/30 transition">
      <div className="flex items-center justify-between">
        <div className="text-neon-400">{icon}</div>

        <span className="h-2 w-2 rounded-full bg-neon-400 animate-pulse shadow-glow-neon" />
      </div>

      <div className="mt-4">
        <div className="font-display text-2xl font-bold text-white">
          {value}
          {suffix}
        </div>

        <div className="mt-1 text-[9px] font-mono uppercase tracking-wider text-slate-500">
          {label}
        </div>
      </div>
    </div>
  );
}

function TopologyNode({
  icon,
  label,
  position,
  danger = false,
}: {
  icon: ReactNode;
  label: string;
  position: string;
  danger?: boolean;
}) {
  return (
    <div className={`absolute ${position} flex flex-col items-center`}>
      <div
        className={`relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl border backdrop-blur-sm transition hover:scale-110 ${
          danger
            ? 'border-red-400/40 bg-red-500/10 text-red-400'
            : 'border-neon-400/30 bg-neon-500/10 text-neon-400'
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-current opacity-10 blur-xl" />

        <div className="relative">{icon}</div>
      </div>

      <span className="mt-2 whitespace-nowrap font-mono text-[8px] uppercase tracking-wider text-slate-500">
        {label}
      </span>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const classes =
    risk === 'HIGH'
      ? 'text-red-400 bg-red-500/10 border-red-400/20'
      : risk === 'MEDIUM'
        ? 'text-yellow-400 bg-yellow-500/10 border-yellow-400/20'
        : 'text-neon-400 bg-neon-500/10 border-neon-400/20';

  return (
    <span
      className={`inline-flex px-2 py-1 rounded border text-[8px] ${classes}`}
    >
      {risk}
    </span>
  );
}

function ThreatBadge({ severity }: { severity: Threat['severity'] }) {
  const classes =
    severity === 'CRITICAL'
      ? 'text-red-400 bg-red-500/10 border-red-400/20'
      : severity === 'HIGH'
        ? 'text-orange-400 bg-orange-500/10 border-orange-400/20'
        : severity === 'MEDIUM'
          ? 'text-yellow-400 bg-yellow-500/10 border-yellow-400/20'
          : 'text-neon-400 bg-neon-500/10 border-neon-400/20';

  return (
    <span
      className={`shrink-0 px-2 py-1 rounded border text-[8px] font-mono ${classes}`}
    >
      {severity}
    </span>
  );
}