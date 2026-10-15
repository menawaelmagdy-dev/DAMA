"use client";

/**
 * Hand-drawn stylised plan of New Sohag + the Rawasin plot.
 * Inlined (not an <img>) so GSAP can draw the roads and pop the buildings.
 */
export default function MapArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 1000"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nileGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c6b66" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1c6b66" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="plotGrad" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#a8703f" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#a8703f" stopOpacity="0.05" />
        </linearGradient>
        <pattern id="gridDots" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="#16130f" opacity="0.14" />
        </pattern>
      </defs>

      {/* dotted base grid */}
      <rect x="0" y="0" width="1600" height="1000" fill="url(#gridDots)" className="map-grid" />

      {/* the Nile, running down the west side */}
      <path
        className="map-nile"
        d="M250 -40 C 320 130, 190 300, 250 470 C 320 660, 170 820, 230 1040 L 70 1040 C 10 830, 150 660, 90 470 C 30 280, 160 140, 95 -40 Z"
        fill="url(#nileGrad)"
        opacity="0.9"
      />

      {/* agricultural / green belt */}
      <g className="map-green" opacity="0.5">
        <path d="M255 60 C 350 190, 250 330, 320 470 C 380 590, 300 700, 360 860" stroke="#47563f" strokeWidth="26" strokeLinecap="round" opacity="0.25" />
        <path d="M330 90 C 420 210, 330 350, 400 480 C 460 590, 390 710, 440 850" stroke="#47563f" strokeWidth="14" strokeLinecap="round" opacity="0.18" />
      </g>

      {/* city blocks of New Sohag */}
      <g className="map-blocks">
        {[
          [520, 150, 190, 120], [740, 150, 150, 120], [920, 150, 210, 120], [1160, 150, 170, 120],
          [520, 300, 150, 110], [700, 300, 200, 110], [930, 300, 140, 110], [1100, 300, 230, 110],
          [560, 640, 170, 100], [760, 640, 200, 100], [990, 640, 160, 100], [1180, 640, 200, 100],
          [560, 790, 200, 100], [790, 790, 150, 100], [970, 790, 200, 100], [1200, 790, 180, 100],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="6"
            stroke="#16130f"
            strokeOpacity="0.18"
            strokeWidth="1.2"
            fill="#16130f"
            fillOpacity="0.03"
          />
        ))}
      </g>

      {/* main road network */}
      <path
        className="map-road"
        d="M-40 520 C 260 470, 460 610, 760 545 C 1060 480, 1290 620, 1640 545"
        stroke="#16130f"
        strokeOpacity="0.5"
        strokeWidth="7"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="map-road"
        d="M900 -40 C 940 200, 1060 330, 1030 545 C 1000 760, 1120 860, 1140 1040"
        stroke="#16130f"
        strokeOpacity="0.42"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="map-road"
        d="M420 1040 C 470 800, 640 700, 830 640"
        stroke="#16130f"
        strokeOpacity="0.3"
        strokeWidth="4"
        strokeDasharray="14 14"
        strokeLinecap="round"
      />

      {/* connectors toward the plot */}
      <path
        className="map-route"
        d="M700 545 C 640 500, 610 470, 596 452"
        stroke="#a8703f"
        strokeWidth="2.5"
        strokeDasharray="8 8"
        pathLength={1}
      />

      {/* the Rawasin plot */}
      <g className="map-plot">
        <rect
          x="470"
          y="380"
          width="300"
          height="215"
          rx="14"
          fill="url(#plotGrad)"
          stroke="#a8703f"
          strokeWidth="2"
          strokeDasharray="10 8"
        />
        {/* internal landscaping */}
        <path
          d="M500 560 C 560 520, 620 560, 690 520 C 720 500, 740 490, 750 470"
          stroke="#47563f"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.35"
        />
        {/* pool */}
        <rect className="map-pool" x="690" y="470" width="58" height="34" rx="6" fill="#1c6b66" fillOpacity="0.5" />
        {/* six buildings */}
        {[
          [505, 405, 74, 44], [592, 405, 74, 44], [679, 405, 74, 44],
          [505, 470, 74, 44], [592, 470, 74, 44], [505, 535, 74, 44],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            className="map-bldg"
            x={x}
            y={y}
            width={w}
            height={h}
            rx="3"
            fill="#16130f"
            fillOpacity="0.62"
          />
        ))}
      </g>

      {/* pin + pulse rings on the plot */}
      <g className="map-pin" transform="translate(620 336)">
        <circle className="map-ping" r="10" fill="#a8703f" fillOpacity="0.18" />
        <circle r="5.5" fill="#a8703f" />
        <circle r="12" stroke="#a8703f" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M0 22 L0 44" stroke="#a8703f" strokeWidth="1.4" strokeDasharray="4 4" />
      </g>

      {/* compass + scale for the plan feel */}
      <g className="map-compass" transform="translate(1420 180)" stroke="#16130f" strokeOpacity="0.35">
        <circle r="46" strokeWidth="1" fill="none" />
        <path d="M0 -34 L8 0 L0 34 L-8 0 Z" fill="#16130f" fillOpacity="0.5" stroke="none" />
        <text x="0" y="-58" textAnchor="middle" fontSize="15" fill="#16130f" fillOpacity="0.45" stroke="none">
          N
        </text>
      </g>
    </svg>
  );
}
