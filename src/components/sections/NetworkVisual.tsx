"use client";

// Stylised, non-cartographic network visualization: an abstract landmass
// silhouette with pulsing nodes and connecting routes. Intentionally
// abstract rather than a literal map, since no real station coordinates are
// available to plot — see the "no fabricated station counts" content rule.

const nodes = [
  { x: 210, y: 90 },
  { x: 150, y: 160 },
  { x: 260, y: 150 },
  { x: 120, y: 250 },
  { x: 220, y: 260 },
  { x: 300, y: 240 },
  { x: 170, y: 350 },
  { x: 250, y: 380 },
];

const routes: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [3, 6],
  [4, 6],
  [4, 7],
  [5, 7],
  [6, 7],
];

export default function NetworkVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 380 460" className={className} role="img" aria-label="Abstract Friction Charge network visualization">
      <defs>
        <radialGradient id="landmass" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#12202b" />
          <stop offset="100%" stopColor="#0a1319" />
        </radialGradient>
        <linearGradient id="routeLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9ee04a" />
          <stop offset="100%" stopColor="#2ebd59" />
        </linearGradient>
      </defs>

      <path
        d="M190 20 C260 20 300 60 310 110 C325 150 350 190 330 240 C345 280 320 330 280 350 C270 400 220 440 180 430 C130 445 90 400 100 350 C60 330 55 270 80 230 C60 180 80 120 120 90 C130 50 160 20 190 20 Z"
        fill="url(#landmass)"
        stroke="#1e2f3b"
        strokeWidth="1"
      />

      <g strokeLinecap="round">
        {routes.map(([a, b], i) => (
          <line
            key={i}
            data-draw-line
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#routeLine)"
            strokeWidth="1.4"
            opacity="0.55"
          />
        ))}
      </g>

      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="10" fill="#45f58c" opacity="0.12">
            <animate attributeName="r" values="8;16;8" dur="3.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="3.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="3.5" fill="#9ee04a" />
        </g>
      ))}
    </svg>
  );
}
