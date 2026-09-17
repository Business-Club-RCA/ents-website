import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * PILLAR 01: Production Ventures / Zero Fluff
 * Architectural modular isometric blocks, foundation grid, and elevation markers.
 */
export function PillarVenturesIllustration({ className = 'text-neutral-900/[0.15]', size = 160 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background isometric grid lines */}
      <path
        d="M20 140L140 140M20 110L140 110M20 80L140 80M50 150L130 70M80 150L150 80M30 120L110 40"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      {/* Lower isometric base cube */}
      <path
        d="M80 135L40 115V85L80 105V135Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path
        d="M80 135L120 115V85L80 105V135Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.10"
      />
      <path
        d="M80 105L120 85L80 65L40 85L80 105Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.08"
      />

      {/* Upper stacked block (elevating venture) */}
      <path
        d="M95 80L65 65V42L95 57V80Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M95 80L125 65V42L95 57V80Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <path
        d="M95 57L125 42L95 27L65 42L95 57Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.10"
      />

      {/* Blueprint dimension arrows & tick marks */}
      <path d="M135 42V85" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 2" />
      <path d="M130 42H140M130 85H140" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="95" cy="27" r="3" fill="currentColor" />
      <circle cx="80" cy="105" r="2.5" fill="currentColor" />
      
      {/* Corner crosshairs */}
      <path d="M25 25H35M30 20V30" stroke="currentColor" strokeWidth="1.25" />
      <path d="M140 135H150M145 130V140" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/**
 * PILLAR 02: Engineered Discipline / Quantitative Rigor
 * Polar coordinate target, normal distribution probability curve & 1% boundary bounds.
 */
export function PillarDisciplineIllustration({ className = 'text-neutral-900/[0.15]', size = 160 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Concentric radar / calibration rings */}
      <circle cx="80" cy="80" r="65" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r="48" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="80" cy="80" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="80" cy="80" r="12" stroke="currentColor" strokeWidth="1.5" />

      {/* Axis crosshairs */}
      <line x1="10" y1="80" x2="150" y2="80" stroke="currentColor" strokeWidth="1.25" strokeDasharray="4 4" />
      <line x1="80" y1="10" x2="80" y2="150" stroke="currentColor" strokeWidth="1.25" strokeDasharray="4 4" />

      {/* Statistical Gaussian / normal distribution bell curve */}
      <path
        d="M15 130 C45 130, 60 125, 70 80 C75 55, 80 35, 85 35 C90 35, 95 55, 100 80 C110 125, 125 130, 155 130"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* Shaded 1% tail bound */}
      <path
        d="M15 130 C30 130, 40 128, 48 118 V130 H15 Z"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <line x1="48" y1="105" x2="48" y2="135" stroke="currentColor" strokeWidth="1.5" />

      {/* Precision calibration tick markers */}
      <circle cx="80" cy="80" r="3" fill="currentColor" />
      <circle cx="85" cy="35" r="2.5" fill="currentColor" />
      <circle cx="48" cy="118" r="2.5" fill="currentColor" />

      {/* Micro coordinate markers */}
      <path d="M125 35H135M130 30V40" stroke="currentColor" strokeWidth="1.2" />
      <path d="M25 125H35M30 120V130" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * PILLAR 03: The RCA Advantage / Nyabihu Campus Hub
 * High-density network topology, node clusters, and geographic coordinates.
 */
export function PillarNetworkIllustration({ className = 'text-neutral-900/[0.15]', size = 160 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Concentric campus broadcast pulses */}
      <circle cx="95" cy="65" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="95" cy="65" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="95" cy="65" r="62" stroke="currentColor" strokeWidth="0.75" strokeDasharray="5 5" />

      {/* Network interconnect branches */}
      <path
        d="M25 120L55 90L95 65L135 45M55 90L85 125L130 115M95 65L115 105M55 90L40 50L95 65"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Intersecting secondary nodes */}
      <line x1="40" y1="50" x2="80" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="80" y1="30" x2="135" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

      {/* Primary Hub Node (RCA) */}
      <circle cx="95" cy="65" r="7" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.14" />
      <circle cx="95" cy="65" r="3" fill="currentColor" />

      {/* Satellite Node Hubs */}
      <circle cx="55" cy="90" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="55" cy="90" r="2" fill="currentColor" />

      <circle cx="135" cy="45" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="135" cy="45" r="2" fill="currentColor" />

      <circle cx="85" cy="125" r="4" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
      <circle cx="130" cy="115" r="3.5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
      <circle cx="40" cy="50" r="3.5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
      <circle cx="25" cy="120" r="3" fill="currentColor" />
      <circle cx="115" cy="105" r="2.5" fill="currentColor" />

      {/* Coordinate & technical marks */}
      <path d="M125 135H145M135 125V145" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * TWO DEDICATED DISCIPLINES - CARD 1: Business Handlers (Ventures & Operations)
 * Venture lifecycle roadmap, milestone nodes, pro-forma trajectory curve, and unit economics histogram.
 */
export function BusinessTrackIllustration({ className = 'text-neutral-900/[0.14]', size = 260 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background coordinate grid lines */}
      <line x1="20" y1="190" x2="240" y2="190" stroke="currentColor" strokeWidth="1.25" />
      <line x1="20" y1="145" x2="240" y2="145" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
      <line x1="20" y1="100" x2="240" y2="100" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
      <line x1="20" y1="55" x2="240" y2="55" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />

      {/* Vertical milestone markers */}
      <line x1="50" y1="35" x2="50" y2="190" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="110" y1="35" x2="110" y2="190" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="170" y1="35" x2="170" y2="190" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="230" y1="35" x2="230" y2="190" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* Ascending venture trajectory (pro-forma growth) */}
      <path
        d="M30 175 C65 170, 90 155, 120 120 C150 85, 180 65, 235 40"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      {/* Gradient fill under trajectory curve */}
      <path
        d="M30 175 C65 170, 90 155, 120 120 C150 85, 180 65, 235 40 V190 H30 Z"
        fill="currentColor"
        fillOpacity="0.06"
      />

      {/* Milestone milestone nodes */}
      <g>
        <circle cx="50" cy="168" r="5.5" stroke="currentColor" strokeWidth="1.75" fill="white" />
        <circle cx="50" cy="168" r="2.5" fill="currentColor" />
      </g>
      <g>
        <circle cx="110" cy="132" r="5.5" stroke="currentColor" strokeWidth="1.75" fill="white" />
        <circle cx="110" cy="132" r="2.5" fill="currentColor" />
      </g>
      <g>
        <circle cx="170" cy="78" r="5.5" stroke="currentColor" strokeWidth="1.75" fill="white" />
        <circle cx="170" cy="78" r="2.5" fill="currentColor" />
      </g>
      <g>
        <circle cx="235" cy="40" r="6.5" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="235" cy="40" r="3" fill="currentColor" />
      </g>

      {/* Unit Economics Histogram Bars in background */}
      <rect x="75" y="150" width="12" height="40" rx="2" fill="currentColor" fillOpacity="0.12" />
      <rect x="95" y="140" width="12" height="50" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="135" y="110" width="12" height="80" rx="2" fill="currentColor" fillOpacity="0.14" />
      <rect x="155" y="95" width="12" height="95" rx="2" fill="currentColor" fillOpacity="0.18" />
      <rect x="195" y="70" width="12" height="120" rx="2" fill="currentColor" fillOpacity="0.16" />
      <rect x="215" y="55" width="12" height="135" rx="2" fill="currentColor" fillOpacity="0.22" />

      {/* Mini venture canvas quadrant at top right */}
      <rect x="165" y="15" width="65" height="35" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="197" y1="15" x2="197" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="165" y1="32" x2="230" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

/**
 * TWO DEDICATED DISCIPLINES - CARD 2: Traders (Markets & Quant)
 * Institutional candlestick chart, Bollinger channel envelope, and order book depth bands.
 */
export function TradersTrackIllustration({ className = 'text-neutral-900/[0.14]', size = 260 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Horizontal Fibonacci / Order Book Price levels */}
      <line x1="20" y1="40" x2="240" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="20" y1="80" x2="240" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="20" y1="120" x2="240" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="20" y1="160" x2="240" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="20" y1="195" x2="240" y2="195" stroke="currentColor" strokeWidth="1.25" />

      {/* Volatility Channel / Bollinger Band upper & lower envelope */}
      <path
        d="M25 110 C60 100, 90 70, 130 65 C170 60, 200 45, 235 30"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <path
        d="M25 150 C60 140, 90 120, 130 115 C170 110, 200 95, 235 80"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      {/* Channel shading */}
      <path
        d="M25 110 C60 100, 90 70, 130 65 C170 60, 200 45, 235 30 L235 80 C200 95, 170 110, 130 115 C90 120, 60 140, 25 150 Z"
        fill="currentColor"
        fillOpacity="0.06"
      />

      {/* Candlestick 1 (Bearish) */}
      <line x1="45" y1="115" x2="45" y2="148" stroke="currentColor" strokeWidth="1.25" />
      <rect x="41" y="122" width="8" height="18" rx="1.5" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.2" />

      {/* Candlestick 2 (Bullish) */}
      <line x1="68" y1="102" x2="68" y2="138" stroke="currentColor" strokeWidth="1.25" />
      <rect x="64" y="108" width="8" height="22" rx="1.5" fill="white" stroke="currentColor" strokeWidth="1.4" />

      {/* Candlestick 3 (Bullish extension) */}
      <line x1="91" y1="85" x2="91" y2="124" stroke="currentColor" strokeWidth="1.25" />
      <rect x="87" y="92" width="8" height="20" rx="1.5" fill="white" stroke="currentColor" strokeWidth="1.4" />

      {/* Candlestick 4 (Small consolidation pull-back) */}
      <line x1="114" y1="80" x2="114" y2="112" stroke="currentColor" strokeWidth="1.25" />
      <rect x="110" y="86" width="8" height="14" rx="1.5" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.2" />

      {/* Candlestick 5 (Liquidity sweep & reversal wick) */}
      <line x1="137" y1="68" x2="137" y2="108" stroke="currentColor" strokeWidth="1.25" />
      <rect x="133" y="78" width="8" height="18" rx="1.5" fill="white" stroke="currentColor" strokeWidth="1.4" />

      {/* Candlestick 6 (Strong expansion bar) */}
      <line x1="160" y1="52" x2="160" y2="92" stroke="currentColor" strokeWidth="1.25" />
      <rect x="156" y="58" width="8" height="26" rx="1.5" fill="white" stroke="currentColor" strokeWidth="1.4" />

      {/* Candlestick 7 (Doji / High-tight consolidation) */}
      <line x1="183" y1="42" x2="183" y2="76" stroke="currentColor" strokeWidth="1.25" />
      <rect x="179" y="54" width="8" height="8" rx="1.5" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.2" />

      {/* Candlestick 8 (Breakout candle) */}
      <line x1="206" y1="28" x2="206" y2="65" stroke="currentColor" strokeWidth="1.25" />
      <rect x="202" y="34" width="8" height="24" rx="1.5" fill="white" stroke="currentColor" strokeWidth="1.5" />

      {/* Volume profile histogram at bottom */}
      <rect x="41" y="178" width="8" height="17" rx="1.5" fill="currentColor" fillOpacity="0.14" />
      <rect x="64" y="170" width="8" height="25" rx="1.5" fill="currentColor" fillOpacity="0.18" />
      <rect x="87" y="162" width="8" height="33" rx="1.5" fill="currentColor" fillOpacity="0.22" />
      <rect x="110" y="180" width="8" height="15" rx="1.5" fill="currentColor" fillOpacity="0.12" />
      <rect x="133" y="168" width="8" height="27" rx="1.5" fill="currentColor" fillOpacity="0.18" />
      <rect x="156" y="152" width="8" height="43" rx="1.5" fill="currentColor" fillOpacity="0.26" />
      <rect x="179" y="172" width="8" height="23" rx="1.5" fill="currentColor" fillOpacity="0.16" />
      <rect x="202" y="148" width="8" height="47" rx="1.5" fill="currentColor" fillOpacity="0.30" />
    </svg>
  );
}

/**
 * ABOUT US - TENET 01: Code as Capital
 * Code syntax brackets, terminal console chassis, binary data flow, and capital growth vector.
 */
export function TenetCodeIllustration({ className = 'text-neutral-900/[0.18]', size = 180 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Mini terminal window chassis */}
      <rect
        x="35"
        y="25"
        width="135"
        height="100"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.04"
      />
      <line x1="35" y1="48" x2="170" y2="48" stroke="currentColor" strokeWidth="1.25" />
      {/* Window buttons */}
      <circle cx="48" cy="36" r="2.5" fill="currentColor" />
      <circle cx="58" cy="36" r="2.5" fill="currentColor" />
      <circle cx="68" cy="36" r="2.5" fill="currentColor" />

      {/* Terminal prompt cursor '>_ fn run()' */}
      <path
        d="M48 64L58 72L48 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="64" y1="80" x2="78" y2="80" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />

      {/* Code syntax brackets { ... } */}
      <path
        d="M102 60 C92 60, 88 66, 88 74 C88 80, 84 83, 78 85 C84 87, 88 90, 88 96 C88 104, 92 110, 102 110"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M128 60 C138 60, 142 66, 142 74 C142 80, 146 83, 152 85 C146 87, 142 90, 142 96 C142 104, 138 110, 128 110"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Code statements lines */}
      <line x1="98" y1="75" x2="132" y2="75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="98" y1="85" x2="124" y2="85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="98" y1="95" x2="136" y2="95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />

      {/* Ascending algorithmic capital trajectory (Code -> Capital) */}
      <path
        d="M15 160L55 145L95 152L145 110L165 85"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Shaded area under trajectory */}
      <path
        d="M15 160L55 145L95 152L145 110L165 85 V165 H15 Z"
        fill="currentColor"
        fillOpacity="0.06"
      />

      {/* Nodes on capital trajectory */}
      <circle cx="55" cy="145" r="4" stroke="currentColor" strokeWidth="1.5" fill="white" />
      <circle cx="55" cy="145" r="2" fill="currentColor" />

      <circle cx="95" cy="152" r="4" stroke="currentColor" strokeWidth="1.5" fill="white" />
      <circle cx="95" cy="152" r="2" fill="currentColor" />

      <circle cx="145" cy="110" r="4.5" stroke="currentColor" strokeWidth="1.75" fill="white" />
      <circle cx="145" cy="110" r="2.5" fill="currentColor" />

      <circle cx="165" cy="85" r="5.5" stroke="currentColor" strokeWidth="2" fill="currentColor" />

      {/* Matrix binary coordinates */}
      <circle cx="25" cy="95" r="1.5" fill="currentColor" />
      <circle cx="35" cy="115" r="1.5" fill="currentColor" />
      <circle cx="20" cy="135" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * ABOUT US - TENET 02: 1% Risk Boundary
 * Radial shield / risk boundary dial with strict 1% cutoff lines and Gaussian curve.
 */
export function TenetRiskIllustration({ className = 'text-neutral-900/[0.18]', size = 180 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer risk boundary concentric calibration rings */}
      <circle cx="90" cy="90" r="74" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="90" cy="90" r="56" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="90" cy="90" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

      {/* Calibrated dial ticks */}
      <line x1="90" y1="20" x2="90" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="160" y1="90" x2="146" y2="90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="90" y1="160" x2="90" y2="146" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="90" x2="34" y2="90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Secondary 45-degree ticks */}
      <line x1="40" y1="40" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="140" y1="40" x2="130" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="140" x2="50" y2="130" stroke="currentColor" strokeWidth="1.5" />
      <line x1="140" y1="140" x2="130" y2="130" stroke="currentColor" strokeWidth="1.5" />

      {/* 1% Protected Boundary Sector / Shield Wedge */}
      <path
        d="M90 90L46 46 A56 56 0 0 1 90 34 Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="1.75"
      />

      {/* Strict 1% Stop-Loss Boundary Pointer / Hard Limit Line */}
      <line x1="90" y1="90" x2="44" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="44" cy="44" r="4.5" fill="currentColor" />

      {/* Gaussian normal distribution curve */}
      <path
        d="M25 140 C55 140, 70 132, 80 100 C85 80, 90 65, 95 80 C100 100, 110 132, 145 140"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* 1% tail bound shaded slice */}
      <path
        d="M25 140 C42 140, 52 136, 58 126 V140 H25 Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <line x1="58" y1="115" x2="58" y2="145" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 2" />

      {/* Center Pivot Dial */}
      <circle cx="90" cy="90" r="9" stroke="currentColor" strokeWidth="1.5" fill="white" />
      <circle cx="90" cy="90" r="4" fill="currentColor" />
    </svg>
  );
}

/**
 * ABOUT US - TENET 03: Peer Governance
 * Tripartite student network, interlocking consensus rings, and peer governing nodes.
 */
export function TenetGovernanceIllustration({ className = 'text-neutral-900/[0.18]', size = 180 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Consensus equilibrium rings */}
      <circle cx="90" cy="90" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="90" cy="90" r="70" stroke="currentColor" strokeWidth="0.75" strokeDasharray="5 5" />

      {/* Tripartite council triangle links */}
      <polygon
        points="90,30 145,125 35,125"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.05"
      />

      {/* Cross links to central nexus */}
      <line x1="90" y1="30" x2="90" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="145" y1="125" x2="90" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="35" y1="125" x2="90" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Primary Governing Nodes (The 3 Peer Branches) */}
      <g>
        <circle cx="90" cy="30" r="9" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="90" cy="30" r="4.5" fill="currentColor" />
      </g>
      <g>
        <circle cx="145" cy="125" r="9" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="145" cy="125" r="4.5" fill="currentColor" />
      </g>
      <g>
        <circle cx="35" cy="125" r="9" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="35" cy="125" r="4.5" fill="currentColor" />
      </g>

      {/* Central Nexus node */}
      <circle cx="90" cy="90" r="6" stroke="currentColor" strokeWidth="1.75" fill="white" />
      <circle cx="90" cy="90" r="2.5" fill="currentColor" />

      {/* Outer Peer Dots (The Student Body Network) */}
      <circle cx="90" cy="145" r="3" fill="currentColor" />
      <circle cx="45" cy="65" r="3" fill="currentColor" />
      <circle cx="135" cy="65" r="3" fill="currentColor" />
      <circle cx="115" cy="155" r="2.5" fill="currentColor" />
      <circle cx="65" cy="155" r="2.5" fill="currentColor" />
      <line x1="45" y1="65" x2="35" y2="125" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="135" y1="65" x2="145" y2="125" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}
