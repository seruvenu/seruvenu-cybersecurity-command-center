// Simulated cybersecurity threat event model for the SOC visualization.
// All data is synthetic — for educational/demonstration purposes only.

import * as THREE from 'three';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ThreatStatus = 'DETECTED' | 'ANALYZING' | 'BLOCKED' | 'MITIGATED';
export type RouteState = 'NORMAL' | 'SUSPICIOUS' | 'MALICIOUS' | 'BLOCKED' | 'DEFENDED';

export type AttackType =
  | 'Port Scan'
  | 'Brute Force'
  | 'SQL Injection'
  | 'DDoS'
  | 'Malware'
  | 'Ransomware'
  | 'Credential Attack'
  | 'Data Exfiltration'
  | 'Phishing'
  | 'Botnet Traffic'
  | 'Exploit Attempt';

export type ThreatEvent = {
  id: string;
  source: string;
  destination: string;
  sourceCountry: string;
  destCountry: string;
  attackType: AttackType;
  severity: Severity;
  status: ThreatStatus;
  timestamp: number;
  routeState: RouteState;
  packetId: string;
};

export type CityNode = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  threatCount: number;
  blockedCount: number;
  threatLevel: 'secure' | 'normal' | 'suspicious' | 'critical';
};

export const CITIES: CityNode[] = [
  { name: 'New York', country: 'USA', lat: 40.71, lon: -74.01, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'London', country: 'UK', lat: 51.51, lon: -0.13, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Tokyo', country: 'Japan', lat: 35.68, lon: 139.69, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Frankfurt', country: 'Germany', lat: 50.11, lon: 8.68, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Mumbai', country: 'India', lat: 19.08, lon: 72.88, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Delhi', country: 'India', lat: 28.61, lon: 77.21, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Bengaluru', country: 'India', lat: 12.97, lon: 77.59, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Hyderabad', country: 'India', lat: 17.39, lon: 78.49, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Chennai', country: 'India', lat: 13.08, lon: 80.27, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Singapore', country: 'Singapore', lat: 1.35, lon: 103.82, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Seoul', country: 'South Korea', lat: 37.57, lon: 126.98, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Sydney', country: 'Australia', lat: -33.87, lon: 151.21, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Moscow', country: 'Russia', lat: 55.76, lon: 37.62, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'São Paulo', country: 'Brazil', lat: -23.55, lon: -46.63, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Cairo', country: 'Egypt', lat: 30.04, lon: 31.24, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Dubai', country: 'UAE', lat: 25.20, lon: 55.27, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Toronto', country: 'Canada', lat: 43.65, lon: -79.38, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.37, lon: 4.90, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Los Angeles', country: 'USA', lat: 34.05, lon: -118.24, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Paris', country: 'France', lat: 48.86, lon: 2.35, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Hong Kong', country: 'China', lat: 22.32, lon: 114.17, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
  { name: 'Beijing', country: 'China', lat: 39.90, lon: 116.41, threatCount: 0, blockedCount: 0, threatLevel: 'normal' },
];

const ATTACK_TYPES: AttackType[] = [
  'Port Scan', 'Brute Force', 'SQL Injection', 'DDoS', 'Malware',
  'Ransomware', 'Credential Attack', 'Data Exfiltration', 'Phishing',
  'Botnet Traffic', 'Exploit Attempt',
];

const SEVERITIES: Severity[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const SEVERITY_WEIGHTS = [0.4, 0.3, 0.2, 0.1];

const STATUSES: ThreatStatus[] = ['DETECTED', 'ANALYZING', 'BLOCKED', 'MITIGATED'];

let eventCounter = 0;

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedSeverity(): Severity {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < SEVERITY_WEIGHTS.length; i++) {
    cumulative += SEVERITY_WEIGHTS[i];
    if (r < cumulative) return SEVERITIES[i];
  }
  return 'LOW';
}

function generatePacketId(): string {
  const hex = '0123456789ABCDEF';
  let id = 'PKT-';
  for (let i = 0; i < 4; i++) id += hex[Math.floor(Math.random() * 16)];
  return id;
}

export function severityToRouteState(severity: Severity): RouteState {
  switch (severity) {
    case 'LOW': return 'NORMAL';
    case 'MEDIUM': return 'SUSPICIOUS';
    case 'HIGH':
    case 'CRITICAL': return 'MALICIOUS';
    default: return 'NORMAL';
  }
}

export function severityToColor(severity: Severity): string {
  switch (severity) {
    case 'LOW': return '#22e3ff';
    case 'MEDIUM': return '#ffaa00';
    case 'HIGH': return '#ff5500';
    case 'CRITICAL': return '#ff2222';
    default: return '#22e3ff';
  }
}

export function routeStateToColor(state: RouteState): string {
  switch (state) {
    case 'NORMAL': return '#22e3ff';
    case 'SUSPICIOUS': return '#ffaa00';
    case 'MALICIOUS': return '#ff3333';
    case 'BLOCKED': return '#ff2222';
    case 'DEFENDED': return '#00ff66';
    default: return '#22e3ff';
  }
}

export function threatLevelToColor(level: CityNode['threatLevel']): string {
  switch (level) {
    case 'secure': return '#00ff66';
    case 'normal': return '#22e3ff';
    case 'suspicious': return '#ffaa00';
    case 'critical': return '#ff3333';
    default: return '#22e3ff';
  }
}

export function createThreatEvent(): ThreatEvent {
  const srcIdx = Math.floor(Math.random() * CITIES.length);
  let dstIdx = Math.floor(Math.random() * CITIES.length);
  while (dstIdx === srcIdx) dstIdx = Math.floor(Math.random() * CITIES.length);

  const source = CITIES[srcIdx];
  const destination = CITIES[dstIdx];
  const severity = weightedSeverity();

  eventCounter++;
  return {
    id: `EVT-${eventCounter.toString().padStart(5, '0')}`,
    source: source.name,
    destination: destination.name,
    sourceCountry: source.country,
    destCountry: destination.country,
    attackType: randomChoice(ATTACK_TYPES),
    severity,
    status: randomChoice(STATUSES),
    timestamp: Date.now(),
    routeState: severityToRouteState(severity),
    packetId: generatePacketId(),
  };
}

export function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour12: false });
}

export function getTopAttackType(events: ThreatEvent[]): string {
  if (events.length === 0) return 'None';
  const counts: Record<string, number> = {};
  for (const e of events) {
    counts[e.attackType] = (counts[e.attackType] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export function getRiskLevel(events: ThreatEvent[]): 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'CRITICAL' {
  if (events.length === 0) return 'LOW';
  const critical = events.filter(e => e.severity === 'CRITICAL').length;
  const high = events.filter(e => e.severity === 'HIGH').length;
  if (critical >= 2) return 'CRITICAL';
  if (critical >= 1 || high >= 3) return 'HIGH';
  if (high >= 1) return 'ELEVATED';
  if (events.length > 3) return 'GUARDED';
  return 'LOW';
}

export function riskLevelColor(level: 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'CRITICAL'): string {
  switch (level) {
    case 'LOW': return '#00ff66';
    case 'GUARDED': return '#22e3ff';
    case 'ELEVATED': return '#ffaa00';
    case 'HIGH': return '#ff5500';
    case 'CRITICAL': return '#ff2222';
    default: return '#22e3ff';
  }
}

// Convert lat/lon to 3D sphere position
export function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

// Convert a 3D sphere position back to lat/lon
export function vec3ToLatLon(v: THREE.Vector3, radius: number): { lat: number; lon: number } {
  const r = radius || v.length();
  const lat = 90 - (Math.acos(v.y / r) * 180 / Math.PI);
  const lon = ((Math.atan2(v.z, -v.x) * 180 / Math.PI) - 180 + 360) % 360 - 180;
  return { lat, lon };
}

// Create a curved arc between two points on a sphere
export function createArcCurve(
  start: [number, number, number],
  end: [number, number, number],
  heightFactor: number = 0.4
): THREE.CatmullRomCurve3 {
  const startV = new THREE.Vector3(...start);
  const endV = new THREE.Vector3(...end);
  const mid = new THREE.Vector3().addVectors(startV, endV).multiplyScalar(0.5);
  const dist = startV.distanceTo(endV);
  mid.normalize().multiplyScalar(startV.length() + dist * heightFactor);
  return new THREE.CatmullRomCurve3([startV, mid, endV]);
}

// Simulated country intelligence data
export type CountryInfo = {
  name: string;
  riskLevel: 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  activeThreats: number;
  blocked: number;
  topThreat: string;
  cities: string[];
};

export function getCountryInfo(countryName: string): CountryInfo {
  const citiesInCountry = CITIES.filter(c => c.country === countryName).map(c => c.name);
  const threatCount = Math.floor(5 + Math.random() * 40);
  const blocked = Math.floor(50 + Math.random() * 200);
  const attackTypes = ATTACK_TYPES;
  const topThreat = attackTypes[Math.floor(Math.random() * attackTypes.length)];
  const riskLevels: CountryInfo['riskLevel'][] = ['LOW', 'GUARDED', 'ELEVATED', 'HIGH'];
  const riskLevel = riskLevels[Math.min(3, Math.floor(threatCount / 10))];

  return {
    name: countryName,
    riskLevel,
    activeThreats: threatCount,
    blocked,
    topThreat,
    cities: citiesInCountry.length > 0 ? citiesInCountry : ['Unknown'],
  };
}
