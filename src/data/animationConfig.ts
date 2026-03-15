/**
 * @file animationConfig.ts
 * @description Per-element SVG animation configuration objects.
 * Pure data — no logic, no React. Consumed by ElementAnimation organism.
 */

/** Configuration for a single fire layer SVG path */
export interface FireLayerConfig {
  /** SVG path d attribute */
  d: string;
  /** CSS animation-delay value */
  delay: string;
  /** Base opacity */
  opacity: number;
  /** CSS animation-duration value */
  speed: string;
  /** Optional scale transform */
  scale?: number;
  /** Optional fill color override */
  color?: string;
}

/** Configuration for flying ember particles */
export interface EmberConfig {
  /** Number of embers to render */
  count: number;
  /** Minimum delay in seconds */
  minDelay: number;
  /** Maximum delay in seconds */
  maxDelay: number;
  /** Minimum radius */
  minSize: number;
  /** Maximum radius */
  maxSize: number;
  /** CSS animation-duration for rise */
  riseSpeed: string;
}

/** Animation configuration for Tejas (Fire) */
export interface TejasConfig {
  /** Central heat glow ellipse settings */
  coreGlow: {
    opacity: number;
    rx: number;
    ry: number;
  };
  /** Array of animated flame paths */
  flames: FireLayerConfig[];
  /** Flying ember particles */
  embers: EmberConfig;
  /** Sun/Mars planet marker */
  sun: {
    y: number;
    color: string;
  };
  /** Sun ray lines emanating from planet marker */
  sunRays: {
    count: number;
    intensity: number;
    radiusInner: number;
    radiusOuter: number;
  };
  /** Opacity for planet symbol text */
  symbolOpacity: number;
}

/** Animation configuration for Akash (Ether) */
export interface AkashConfig {
  /** Central void glow */
  voidGlow: { opacity: number; radius: number };
  /** Expanding ring series */
  rings: { count: number; intervalDelay: number; strokeWidth: number };
  /** Floating particles */
  particles: { count: number; minSize: number; maxSize: number };
  /** Star-like twinkle points */
  stars: { cx: number; cy: number; size: number; delay: number }[];
  /** Secondary orbital particles (counter-rotating) */
  orbitParticles: { count: number; radius: number };
  /** Saturn planet marker */
  saturn: { opacity: number; ringOpacity: number };
  /** Opacity for planet symbol text */
  symbolOpacity: number;
}

/** Animation configuration for Vayu (Air) */
export interface VayuConfig {
  /** Animated wind current paths */
  windLines: { d: string; delay: string; width: number; opacity: number }[];
  /** Orbiting air particles */
  particles: { count: number; minSize: number; maxSize: number; minSpeed: number; maxSpeed: number };
  /** Dust/debris particles drifting with wind */
  dust: { count: number; minSize: number; maxSize: number };
  /** Gust pulse arcs */
  gusts: { d: string; delay: string; opacity: number }[];
  /** Central air whorl */
  whorl: { opacity: number };
  /** Mercury planet marker */
  mercury: { opacity: number };
  /** Opacity for planet symbol text */
  symbolOpacity: number;
}

/** Animation configuration for Prithvi (Earth) */
export interface PrithviConfig {
  /** Earthen ground band */
  ground: { height: number; opacity: number };
  /** Growing crystal formations */
  crystals: { x: number; h: number; w: number; delay: number }[];
  /** Floating geometric gem shapes */
  gems: { cx: number; cy: number; s: number; d: number }[];
  /** Drifting soil/dust particles */
  soilParticles: { cx: number; cy: number; size: number; delay: number }[];
  /** Floating seeds or leaf shapes */
  seeds: { x: number; y: number; delay: number }[];
  /** Jupiter planet marker */
  jupiter: { opacity: number };
  /** Opacity for planet symbol text */
  symbolOpacity: number;
}

/** Animation configuration for Apas (Water) */
export interface ApasConfig {
  /** Water pool glow ellipse */
  pool: { opacity: number; rx: number; ry: number };
  /** Expanding ripple rings */
  ripples: { count: number; delayInterval: number };
  /** Flowing wave paths */
  waves: { d: string; delay: string; opacity: number }[];
  /** Falling water drop shapes */
  drops: { cx: number; delay: number }[];
  /** Rising bubbles from pool */
  bubbles: { cx: number; cy: number; r: number; delay: number; duration: number }[];
  /** Surface sparkles / glints */
  sparkles: { x: number; y: number; size: number; delay: number }[];
  /** Venus planet marker */
  venus: { opacity: number; shimmer: boolean };
  /** Opacity for planet symbol text */
  symbolOpacity: number;
}

/** Union of all per-element animation configs */
export interface AnimationConfig {
  Tejas: TejasConfig;
  Akash: AkashConfig;
  Vayu: VayuConfig;
  Prithvi: PrithviConfig;
  Apas: ApasConfig;
}

/**
 * Static animation configuration for all five Tattwa elements.
 * Consumed by ElementAnimation to drive SVG animations.
 */
export const ANIMATION_CONFIG: AnimationConfig = {
  Tejas: {
    coreGlow: {
      opacity: 0.4,
      rx: 45,
      ry: 35,
    },
    flames: [
      // --- RED DOMINANT (S-SHAPED FLAMES) - evenly distributed ---
      { d: 'M 100,85 Q 90,60 100,45 Q 110,30 100,18', delay: '0s', opacity: 0.35, speed: '1.4s' },
      { d: 'M 95,85 Q 105,65 95,50 Q 85,35 95,25', delay: '0.2s', opacity: 0.25, speed: '1.6s', color: '#7c471eff' },
      { d: 'M 105,85 Q 95,65 105,50 Q 115,35 105,25', delay: '0.4s', opacity: 0.25, speed: '1.7s' },
      { d: 'M 90,85 Q 82,65 90,50 Q 98,35 90,30', delay: '0.1s', opacity: 0.22, speed: '1.8s' },
      { d: 'M 110,85 Q 118,65 110,50 Q 102,35 110,30', delay: '0.3s', opacity: 0.22, speed: '1.9s' },
      { d: 'M 85,85 Q 75,70 85,55 Q 95,40 85,35', delay: '0.5s', opacity: 0.2, speed: '2.1s' },
      { d: 'M 115,85 Q 125,70 115,55 Q 105,40 115,35', delay: '0.7s', opacity: 0.2, speed: '2.0s' },
      { d: 'M 80,85 Q 70,75 80,65 Q 90,55 80,45', delay: '0.9s', opacity: 0.18, speed: '2.3s' },
      { d: 'M 120,85 Q 130,75 122,65 Q 112,55 120,45', delay: '1.1s', opacity: 0.18, speed: '2.2s' },
      { d: 'M 88,85 Q 98,70 88,60 Q 78,50 88,40', delay: '0.15s', opacity: 0.24, speed: '1.75s' },
      { d: 'M 112,85 Q 102,70 112,60 Q 122,50 112,40', delay: '0.35s', opacity: 0.24, speed: '1.65s' },
      { d: 'M 103,85 Q 93,65 103,50 Q 113,35 103,22', delay: '0.05s', opacity: 0.28, speed: '1.55s' },
      { d: 'M 97,85 Q 107,65 97,50 Q 87,35 97,22', delay: '0.25s', opacity: 0.28, speed: '1.45s' },
      { d: 'M 75,85 Q 65,75 75,65 Q 85,55 75,50', delay: '0.65s', opacity: 0.2, speed: '2.15s' },
      { d: 'M 125,85 Q 135,75 125,65 Q 115,55 125,50', delay: '0.85s', opacity: 0.2, speed: '2.05s' },
      { d: 'M 92,85 Q 85,70 92,60 Q 99,50 92,42', delay: '0.45s', opacity: 0.25, speed: '1.6s' },
      { d: 'M 108,85 Q 115,70 108,60 Q 101,50 108,42', delay: '1.05s', opacity: 0.2, speed: '2.0s' },
      { d: 'M 100,85 Q 110,70 100,55 Q 90,40 100,32', delay: '0.55s', opacity: 0.3, speed: '1.8s' },
      { d: 'M 96,85 Q 102,70 96,60 Q 90,50 96,40', delay: '0.12s', opacity: 0.22, speed: '1.7s' },
      { d: 'M 104,85 Q 98,70 104,60 Q 110,50 104,40', delay: '0.32s', opacity: 0.22, speed: '1.8s' },
      { d: 'M 91,85 Q 98,75 91,65', delay: '0.42s', opacity: 0.26, speed: '1.5s' },
      { d: 'M 109,85 Q 102,75 109,65', delay: '0.62s', opacity: 0.26, speed: '1.6s' },
      { d: 'M 82,85 Q 75,70 82,55', delay: '0.82s', opacity: 0.18, speed: '2.0s' },
      { d: 'M 118,85 Q 125,70 118,55', delay: '0.02s', opacity: 0.18, speed: '2.1s' },
      { d: 'M 96,85 Q 92,75 96,65', delay: '0.22s', opacity: 0.25, speed: '1.4s' },
      { d: 'M 104,85 Q 108,75 104,65', delay: '0.42s', opacity: 0.15, speed: '2.4s' },
      { d: 'M 78,85 Q 72,75 78,65', delay: '0.52s', opacity: 0.15, speed: '2.5s' },
      { d: 'M 122,85 Q 128,75 122,65', delay: '0.72s', opacity: 0.3, speed: '1.2s' },
      { d: 'M 100,85 Q 95,80 100,75', delay: '0.92s', opacity: 0.3, speed: '1.1s' },
      { d: 'M 100,85 Q 105,80 100,75', delay: '1.2s', opacity: 0.2, speed: '1.9s' },
      // --- YELLOWISH ---
      { d: 'M 98,85 Q 105,65 98,45 Q 91,30 98,22', delay: '0.12s', opacity: 0.15, speed: '1.2s', color: '#ffcc00' },
      { d: 'M 91,85 Q 98,75 91,65 Q 84,55 91,45', delay: '0.22s', opacity: 0.12, speed: '1.3s', color: '#eca012ff' },
      { d: 'M 109,85 Q 102,75 109,65 Q 116,55 109,45', delay: '0.42s', opacity: 0.12, speed: '1.4s', color: '#ffcc00' },
      { d: 'M 96,85 Q 100,75 96,65', delay: '0.32s', opacity: 0.14, speed: '1.1s', color: '#eca012ff' },
      { d: 'M 100,85 Q 105,75 100,65', delay: '0.52s', opacity: 0.15, speed: '1.0s', color: '#ffec00' },
      { d: 'M 94,85 Q 90,75 94,65', delay: '0.18s', opacity: 0.1, speed: '1.35s', color: '#ffcc00' },
      { d: 'M 106,85 Q 110,75 106,65', delay: '0.62s', opacity: 0.1, speed: '1.5s', color: '#eca012ff' },
      { d: 'M 99,85 Q 102,75 99,65', delay: '0.08s', opacity: 0.12, speed: '1.1s', color: '#ffcc00' },
      { d: 'M 101,85 Q 98,75 101,65', delay: '0.38s', opacity: 0.12, speed: '1.2s', color: '#ffec00' },
      { d: 'M 90,85 Q 85,75 90,65', delay: '0.68s', opacity: 0.12, speed: '1.3s', color: '#ffcc00' },
      // --- ORANGE ---
      { d: 'M 94,85 Q 102,65 94,45 Q 86,30 94,22', delay: '0.3s', opacity: 0.22, speed: '1.5s', color: '#ec6912ff' },
      { d: 'M 106,85 Q 98,65 106,45 Q 114,30 106,22', delay: '0.5s', opacity: 0.22, speed: '1.6s', color: '#ec6912ff' },
      { d: 'M 88,85 Q 95,70 88,55', delay: '0.7s', opacity: 0.2, speed: '1.8s', color: '#ec6912ff' },
      { d: 'M 112,85 Q 105,70 112,55', delay: '0.9s', opacity: 0.2, speed: '1.9s', color: '#ec6912ff' },
      { d: 'M 96,85 Q 104,70 96,55', delay: '0.15s', opacity: 0.2, speed: '1.7s', color: '#ec6912ff' },
      { d: 'M 104,85 Q 96,70 104,55', delay: '0.35s', opacity: 0.2, speed: '1.8s', color: '#ec6912ff' },
      { d: 'M 85,85 Q 90,75 85,65', delay: '0.55s', opacity: 0.15, speed: '2.0s', color: '#ec6912ff' },
      { d: 'M 115,85 Q 110,75 115,65', delay: '0.75s', opacity: 0.15, speed: '2.1s', color: '#eca012ff' },
      // --- BLUEISH ---
      { d: 'M 100,85 Q 98,82 100,80 Q 102,78 100,75', delay: '0.02s', opacity: 0.05, speed: '0.9s', color: '#4488ff' },
      { d: 'M 98,85 Q 100,82 98,80', delay: '0.2s', opacity: 0.04, speed: '1.1s', color: '#4488ff' },
      { d: 'M 102,85 Q 100,82 102,80', delay: '0.4s', opacity: 0.04, speed: '1.0s', color: '#4488ff' },
      { d: 'M 100,85 Q 100,83 100,81', delay: '0.6s', opacity: 0.03, speed: '0.8s', color: '#4488ff' },
    ],
    embers: {
      count: 12,
      minDelay: 0,
      maxDelay: 4,
      minSize: 0.8,
      maxSize: 1.6,
      riseSpeed: '0.5s',
    },
    sun: {
      y: 40,
      color: '#ffcc00',
    },
    sunRays: {
      count: 11,
      intensity: 0.35,
      radiusInner: 12,
      radiusOuter: 18,
    },
    symbolOpacity: 0.5,
  },
  Akash: {
    voidGlow: { opacity: 0.3, radius: 55 },
    rings: { count: 8, intervalDelay: 0.9, strokeWidth: 1.2 },
    particles: { count: 16, minSize: 0.6, maxSize: 1.8 },
    stars: [
      { cx: 55, cy: 25, size: 1.2, delay: 0 },
      { cx: 145, cy: 35, size: 0.8, delay: 0.8 },
      { cx: 75, cy: 85, size: 1, delay: 1.6 },
      { cx: 125, cy: 95, size: 1.4, delay: 2.4 },
      { cx: 40, cy: 55, size: 0.6, delay: 3.2 },
      { cx: 160, cy: 65, size: 1.1, delay: 0.4 },
      { cx: 95, cy: 20, size: 0.9, delay: 1.2 },
      { cx: 110, cy: 100, size: 0.7, delay: 2 },
    ],
    orbitParticles: { count: 6, radius: 32 },
    saturn: { opacity: 0.4, ringOpacity: 0.5 },
    symbolOpacity: 0.6,
  },
  Vayu: {
    windLines: [
      { d: 'M -20,25 Q 40,15 100,25 T 220,25', delay: '0s', width: 1.4, opacity: 0.3 },
      { d: 'M -15,45 Q 50,32 115,45 T 215,45', delay: '0.4s', width: 1.0, opacity: 0.28 },
      { d: 'M -10,60 Q 55,48 110,60 T 210,60', delay: '0.8s', width: 1.2, opacity: 0.3 },
      { d: 'M -25,75 Q 45,62 95,75 T 225,75', delay: '1.2s', width: 0.8, opacity: 0.25 },
      { d: 'M -20,90 Q 50,78 120,90 T 220,90', delay: '1.6s', width: 1.0, opacity: 0.22 },
      { d: 'M -5,38 Q 60,28 125,38 T 205,38', delay: '0.2s', width: 0.6, opacity: 0.2 },
      { d: 'M -15,68 Q 40,55 95,68 T 215,68', delay: '1s', width: 0.7, opacity: 0.22 },
      { d: 'M -10,52 Q 48,40 106,52 T 210,52', delay: '0.6s', width: 0.9, opacity: 0.24 },
    ],
    particles: { count: 15, minSize: 0.8, maxSize: 1.6, minSpeed: 3, maxSpeed: 6 },
    dust: { count: 12, minSize: 0.4, maxSize: 1.2 },
    gusts: [
      { d: 'M 10,40 Q 50,28 90,40', delay: '0s', opacity: 0.25 },
      { d: 'M 110,50 Q 150,38 190,50', delay: '0.8s', opacity: 0.22 },
      { d: 'M 30,70 Q 70,58 110,70', delay: '1.6s', opacity: 0.2 },
      { d: 'M 80,35 Q 120,22 160,35', delay: '0.4s', opacity: 0.2 },
      { d: 'M 50,85 Q 90,72 130,85', delay: '1.2s', opacity: 0.18 },
      { d: 'M 20,55 Q 60,42 100,55', delay: '2s', opacity: 0.22 },
    ],
    whorl: { opacity: 0.4 },
    mercury: { opacity: 0.3 },
    symbolOpacity: 0.5,
  },
  Prithvi: {
    ground: { height: 35, opacity: 0.25 },
    crystals: [
      { x: 50, h: 25, w: 7, delay: 0.2 },
      { x: 70, h: 35, w: 9, delay: 0 },
      { x: 92, h: 55, w: 14, delay: 0.5 },
      { x: 115, h: 42, w: 10, delay: 1.1 },
      { x: 135, h: 28, w: 8, delay: 0.7 },
      { x: 155, h: 32, w: 7, delay: 1.4 },
    ],
    gems: [
      { cx: 40, cy: 45, s: 5, d: 0 },
      { cx: 160, cy: 50, s: 6, d: 1.2 },
      { cx: 70, cy: 30, s: 4, d: 2.4 },
      { cx: 130, cy: 35, s: 5, d: 3.6 },
      { cx: 100, cy: 25, s: 3.5, d: 0.8 },
    ],
    soilParticles: [
      { cx: 45, cy: 92, size: 0.8, delay: 0 },
      { cx: 78, cy: 88, size: 1.2, delay: 0.5 },
      { cx: 120, cy: 90, size: 0.6, delay: 1 },
      { cx: 155, cy: 85, size: 1, delay: 1.5 },
      { cx: 65, cy: 94, size: 0.5, delay: 2 },
      { cx: 140, cy: 86, size: 0.9, delay: 2.5 },
    ],
    seeds: [
      { x: 35, y: 40, delay: 0 },
      { x: 165, y: 45, delay: 1.2 },
      { x: 55, y: 25, delay: 2.4 },
      { x: 145, y: 30, delay: 0.6 },
      { x: 90, y: 35, delay: 1.8 },
      { x: 110, y: 28, delay: 3 },
    ],
    jupiter: { opacity: 0.4 },
    symbolOpacity: 0.5,
  },
  Apas: {
    pool: { opacity: 0.15, rx: 70, ry: 25 },
    ripples: { count: 7, delayInterval: 1.1 },
    waves: [
      { d: 'M 20,74 Q 50,68 80,74 T 120,74 T 180,74', delay: '0.13s', opacity: 0.32 },
      { d: 'M 10,78 Q 40,72 70,78 T 110,78 T 150,78 T 190,78', delay: '0.88s', opacity: 0.22 },
      { d: 'M 30,82 Q 60,76 90,82 T 130,82 T 170,82', delay: '1.11s', opacity: 0.19 },
      { d: 'M 0,76 Q 35,70 70,76 T 105,76 T 140,76 T 200,76', delay: '0.34s', opacity: 0.22 },
      { d: 'M 25,80 Q 55,74 85,80 T 115,80 T 175,80', delay: '1.42s', opacity: 0.18 },
      { d: 'M -6,72 Q 28,66 62,72 T 130,72 T 206,72', delay: '0.59s', opacity: 0.21 },
      { d: 'M 6,86 Q 36,80 68,86 T 132,86 T 196,86', delay: '1.29s', opacity: 0.16 },
      { d: 'M -10,90 Q 22,84 54,90 T 118,90 T 210,90', delay: '0.19s', opacity: 0.14 },
      { d: 'M 14,70 Q 44,64 74,70 T 114,70 T 154,70 T 194,70', delay: '1.84s', opacity: 0.2 },
      { d: 'M 18,83 Q 48,77 78,83 T 138,83 T 188,83', delay: '1.04s', opacity: 0.17 },
      { d: 'M 3,75 Q 38,69 73,75 T 108,75 T 193,75', delay: '0.51s', opacity: 0.21 },
      { d: 'M -2,80 Q 32,74 62,80 T 92,80 T 142,80 T 202,80', delay: '1.31s', opacity: 0.16 },
      { d: 'M 27,72 Q 57,67 87,72 T 147,72 T 187,72', delay: '0.27s', opacity: 0.21 },
      { d: 'M -8,88 Q 24,82 56,88 T 96,88 T 176,88 T 208,88', delay: '0.94s', opacity: 0.13 },
      { d: 'M 22,79 Q 52,74 82,79 T 122,79 T 182,79', delay: '1.62s', opacity: 0.23 },
      { d: 'M 11,72 Q 41,66 71,72 T 101,72 T 151,72', delay: '0.38s', opacity: 0.19 },
      { d: 'M -4,85 Q 29,80 62,85 T 95,85 T 128,85 T 206,85', delay: '0.73s', opacity: 0.18 },
      { d: 'M 19,90 Q 47,84 75,90 T 103,90 T 193,90', delay: '1.47s', opacity: 0.15 },
      { d: 'M 9,77 Q 39,71 69,77 T 129,77 T 179,77', delay: '0.57s', opacity: 0.2 },
      { d: 'M -13,92 Q 20,86 53,92 T 86,92 T 165,92 T 210,92', delay: '1.27s', opacity: 0.12 },
    ],
    drops: [
      { cx: 85, delay: 0 }, { cx: 105, delay: 1.2 },
      { cx: 120, delay: 2.4 }, { cx: 75, delay: 3.6 },
      { cx: 110, delay: 0.6 }, { cx: 95, delay: 1.8 }, { cx: 130, delay: 2.8 },
    ],
    bubbles: [
      { cx: 72, cy: 84, r: 1.5, delay: 0, duration: 2.5 },
      { cx: 92, cy: 86, r: 1, delay: 0.7, duration: 3 },
      { cx: 112, cy: 83, r: 2, delay: 1.4, duration: 2.2 },
      { cx: 82, cy: 87, r: 0.8, delay: 2.1, duration: 3.5 },
      { cx: 102, cy: 85, r: 1.2, delay: 0.3, duration: 2.8 },
      { cx: 122, cy: 86, r: 1.4, delay: 1.8, duration: 2.4 },
      { cx: 62, cy: 85, r: 1.1, delay: 2.5, duration: 3.2 },
    ],
    sparkles: [
      { x: 65, y: 70, size: 1, delay: 0 },
      { x: 135, y: 68, size: 1.2, delay: 0.5 },
      { x: 100, y: 66, size: 0.8, delay: 1 },
      { x: 50, y: 72, size: 0.6, delay: 1.5 },
      { x: 150, y: 70, size: 1, delay: 2 },
      { x: 85, y: 69, size: 0.9, delay: 2.5 },
      { x: 115, y: 67, size: 0.7, delay: 0.8 },
    ],
    venus: { opacity: 0.4, shimmer: true },
    symbolOpacity: 0.5,
  },
};
