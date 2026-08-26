import { useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ----------------------------- Types ----------------------------- */

interface NodeData {
  device: string;
  ip: string;
  status: string;
  ports: string;
  type: string;
}

interface NetNode {
  id: number;
  pos: THREE.Vector3;
  connections: number[];
  data: NodeData;
  phase: number;
}

interface Packet {
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: THREE.Color;
}

/* --------------------------- Data factory ------------------------- */

const DEVICES = [
  { device: 'Web Server', type: 'Server' },
  { device: 'Firewall', type: 'Network' },
  { device: 'Database', type: 'Storage' },
  { device: 'Router', type: 'Network' },
  { device: 'DNS Server', type: 'Server' },
  { device: 'Load Balancer', type: 'Network' },
  { device: 'API Gateway', type: 'Server' },
  { device: 'Auth Service', type: 'Service' },
  { device: 'Mail Server', type: 'Server' },
  { device: 'Proxy Node', type: 'Network' },
  { device: 'IDS Sensor', type: 'Security' },
  { device: 'Backup Node', type: 'Storage' },
  { device: 'VPN Gateway', type: 'Security' },
  { device: 'App Server', type: 'Server' },
];

function randomIp() {
  const o = () => Math.floor(Math.random() * 254) + 1;
  return `192.168.${o()}.${o()}`;
}

const STATUSES = ['SECURE', 'ONLINE', 'MONITORING', 'ENCRYPTED'];

function makeNodes(count: number, radius: number): NetNode[] {
  const nodes: NetNode[] = [];
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution for even spread
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const pos = new THREE.Vector3(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
    );
    const dev = DEVICES[i % DEVICES.length];
    nodes.push({
      id: i,
      pos,
      connections: [],
      data: {
        device: dev.device,
        ip: randomIp(),
        status: STATUSES[i % STATUSES.length],
        ports: '22, 80, 443',
        type: dev.type,
      },
      phase: Math.random() * Math.PI * 2,
    });
  }
  // Connect each node to 2-4 nearby nodes
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((n, j) => ({ j, d: nodes[i].pos.distanceTo(n.pos) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d);
    const k = 2 + Math.floor(Math.random() * 3);
    nodes[i].connections = dists.slice(0, k).map((x) => x.j);
  }
  return nodes;
}

/* ----------------------- Curved connection line ------------------- */

function curveBetween(a: THREE.Vector3, b: THREE.Vector3, radius: number) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const len = mid.length();
  mid.normalize().multiplyScalar(len * 1.25); // bow outward
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return curve;
}

/* --------------------------- Globe group -------------------------- */

const GLOBE_RADIUS = 1.4;

function GlobeGroup({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const dragRef = useRef<{ active: boolean; x: number; y: number }>({
    active: false,
    x: 0,
    y: 0,
  });
  const rotRef = useRef({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const autoRotRef = useRef(0);

  const nodeCount = isMobile ? 18 : 26;
  const particleCount = isMobile ? 120 : 280;

  const nodes = useMemo(() => makeNodes(nodeCount, GLOBE_RADIUS), [nodeCount]);

  const connections = useMemo(() => {
    const conns: { from: number; to: number; curve: THREE.QuadraticBezierCurve3 }[] = [];
    const seen = new Set<string>();
    nodes.forEach((n) => {
      n.connections.forEach((j) => {
        const key = [Math.min(n.id, j), Math.max(n.id, j)].join('-');
        if (seen.has(key)) return;
        seen.add(key);
        conns.push({
          from: n.id,
          to: j,
          curve: curveBetween(n.pos, nodes[j].pos, GLOBE_RADIUS),
        });
      });
    });
    return conns;
  }, [nodes]);

  const packets = useMemo<Packet[]>(() => {
    const pkts: Packet[] = [];
    const num = Math.min(connections.length, isMobile ? 8 : 16);
    for (let i = 0; i < num; i++) {
      const c = connections[i % connections.length];
      pkts.push({
        from: c.from,
        to: c.to,
        progress: Math.random(),
        speed: 0.2 + Math.random() * 0.4,
        color: new THREE.Color(Math.random() > 0.5 ? '#39ff14' : '#00e5ff'),
      });
    }
    return pkts;
  }, [connections, isMobile]);

  // Geometry for connection lines
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    connections.forEach((c) => {
      const pts = c.curve.getPoints(24);
      pts.forEach((p) => positions.push(p.x, p.y, p.z));
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [connections]);

  // Particle field around globe
  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = GLOBE_RADIUS * (1.6 + Math.random() * 1.4);
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [particleCount]);

  // Wireframe sphere geometry
  const wireGeo = useMemo(() => new THREE.SphereGeometry(GLOBE_RADIUS, 32, 24), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    autoRotRef.current += delta * 0.12;
    // Smoothly approach target rotation from drag
    rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.08;
    rotRef.current.y += (targetRotRef.current.y - rotRef.current.y) * 0.08;

    groupRef.current.rotation.y = autoRotRef.current + rotRef.current.y;
    groupRef.current.rotation.x = rotRef.current.x * 0.5;

    // Subtle parallax from pointer
    const px = (state.pointer.x * 0.15);
    const py = (state.pointer.y * 0.15);
    groupRef.current.position.x += (px - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (-py - groupRef.current.position.y) * 0.05;
  });

  // Drag handlers (pointer on canvas)
  const onPointerDown = (e: any) => {
    dragRef.current = { active: true, x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: any) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;
    targetRotRef.current.y += dx * 0.005;
    targetRotRef.current.x += dy * 0.005;
  };
  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  return (
    <>
      <group
        ref={groupRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
      >
        {/* Earth-textured sphere */}
        <EarthSphere />

        {/* Subtle wireframe overlay for the "command center" tech feel */}
        <mesh geometry={wireGeo}>
          <meshBasicMaterial
            color="#39ff14"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>

        {/* Atmosphere glow */}
        <mesh scale={1.08}>
          <sphereGeometry args={[GLOBE_RADIUS, 32, 24]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.04}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Connection lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#1a8a6b" transparent opacity={0.35} />
        </lineSegments>

        {/* Data packets */}
        {packets.map((p, i) => {
          const curve = connections.find(
            (c) => c.from === p.from && c.to === p.to,
          )?.curve;
          if (!curve) return null;
          return (
            <Packet key={i} packet={p} curve={curve} />
          );
        })}

        {/* Network nodes */}
        {nodes.map((n) => (
          <NetNodeMesh
            key={n.id}
            node={n}
            hovered={hovered === n.id}
            onHover={(h) => setHovered(h ? n.id : null)}
            onSelect={() => setSelected(selected === n.id ? null : n.id)}
          />
        ))}

        {/* Surrounding particles */}
        <points geometry={particleGeometry}>
          <pointsMaterial
            size={0.018}
            color="#39ff14"
            transparent
            opacity={0.5}
            sizeAttenuation
          />
        </points>
      </group>

      {/* Outer rotating rings (not affected by drag) */}
      <Rings />

      {/* Hover tooltip */}
      {hovered !== null && (
        <Html position={nodes[hovered].pos} center distanceFactor={6} zIndexRange={[10, 0]}>
          <div
            className="pointer-events-none select-none whitespace-nowrap rounded-md border border-neon-500/50 bg-base-900/90 px-3 py-2 font-mono text-[10px] leading-relaxed text-neon-300 shadow-glow-neon backdrop-blur-sm"
            style={{ boxShadow: '0 0 12px rgba(57,255,20,0.35)' }}
          >
            <div className="text-neon-400">NODE ONLINE</div>
            <div className="text-slate-300">IP: {nodes[hovered].data.ip}</div>
            <div className="text-cyan-300">STATUS: {nodes[hovered].data.status}</div>
          </div>
        </Html>
      )}

      {/* Click info panel */}
      {selected !== null && (
        <Html position={[0, isMobile ? -2.2 : -2.4, 0]} center distanceFactor={8} zIndexRange={[20, 0]}>
          <div
            className="pointer-events-auto w-52 rounded-lg border border-cyan-glow/60 bg-base-900/95 p-4 font-mono text-[11px] text-slate-200 shadow-glow-cyan backdrop-blur-md"
            style={{ boxShadow: '0 0 20px rgba(0,229,255,0.3)' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-cyan-300 tracking-widest">NODE INFO</span>
              <button
                className="text-slate-500 hover:text-neon-400"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
            <Row label="DEVICE" value={nodes[selected].data.device} />
            <Row label="IP ADDR" value={nodes[selected].data.ip} />
            <Row label="STATUS" value={nodes[selected].data.status} valueClass="text-neon-400" />
            <Row label="TYPE" value={nodes[selected].data.type} />
            <Row label="PORTS" value={nodes[selected].data.ports} />
          </div>
        </Html>
      )}
    </>
  );
}

function Row({ label, value, valueClass = 'text-slate-200' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between gap-3 py-0.5">
      <span className="text-slate-500">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

/* --------------------------- Packet ------------------------------- */

function Packet({ packet, curve }: { packet: Packet; curve: THREE.QuadraticBezierCurve3 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    packet.progress += delta * packet.speed;
    if (packet.progress > 1) packet.progress = 0;
    const p = curve.getPoint(packet.progress);
    ref.current.position.copy(p);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={packet.color} />
    </mesh>
  );
}

/* --------------------------- Net node ----------------------------- */

function NetNodeMesh({
  node,
  hovered,
  onHover,
  onSelect,
}: {
  node: NetNode;
  hovered: boolean;
  onHover: (h: boolean) => void;
  onSelect: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 0.6 + Math.sin(t * 1.5 + node.phase) * 0.4;
    if (ref.current) {
      const s = hovered ? 1.6 : 1 + pulse * 0.25;
      ref.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const s = hovered ? 2.4 : 1.4 + pulse * 0.3;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={node.pos}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#39ff14" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial
          color={hovered ? '#00e5ff' : '#39ff14'}
          transparent
          opacity={hovered ? 0.35 : 0.18}
        />
      </mesh>
    </group>
  );
}

/* --------------------------- Earth sphere -------------------------- */

function EarthSphere() {
  const [earthMap, bumpMap] = useTexture([
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_normal_2048.jpg',
  ]);

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshStandardMaterial
        map={earthMap}
        bumpMap={bumpMap}
        bumpScale={0.02}
        roughness={0.6}
        metalness={0.1}
        emissive="#0a1a33"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

/* --------------------------- Rings -------------------------------- */

function Rings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.15;
    if (r2.current) r2.current.rotation.x += delta * 0.1;
    if (r2.current) r2.current.rotation.y += delta * 0.08;
    if (r3.current) r3.current.rotation.z -= delta * 0.06;
    if (r3.current) r3.current.rotation.x += delta * 0.04;
  });

  return (
    <group>
      <mesh ref={r1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[GLOBE_RADIUS * 1.35, 0.004, 8, 80]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.3} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[GLOBE_RADIUS * 1.55, 0.003, 8, 80]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.22} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 4, 0, Math.PI / 3]}>
        <torusGeometry args={[GLOBE_RADIUS * 1.75, 0.002, 8, 80]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* --------------------------- Canvas ------------------------------- */

export default function CyberGlobe() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="aspect-square w-full max-w-md mx-auto">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 2, 3]} intensity={1.2} color="#39ff14" />
          <pointLight position={[-3, -2, 2]} intensity={0.8} color="#00e5ff" />
          <GlobeGroup isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}