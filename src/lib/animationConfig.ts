
export interface FireLayerConfig {
    d: string;
    delay: string;
    opacity: number;
    speed: string;
    scale?: number;
    color?: string;
}

export interface EmberConfig {
    count: number;
    minDelay: number;
    maxDelay: number;
    minSize: number;
    maxSize: number;
    riseSpeed: string;
}

export interface TejasConfig {
    coreGlow: {
        opacity: number;
        rx: number;
        ry: number;
    };
    flames: FireLayerConfig[];
    embers: EmberConfig;
    sun: {
        y: number;
        color: string;
    };
    sunRays: {
        count: number;
        intensity: number;
        radiusInner: number;
        radiusOuter: number;
    };
    symbolOpacity: number;
}

export interface AkashConfig {
    voidGlow: { opacity: number; radius: number };
    rings: { count: number; intervalDelay: number; strokeWidth: number };
    particles: { count: number; minSize: number; maxSize: number };
    saturn: { opacity: number; ringOpacity: number };
    symbolOpacity: number;
}

export interface VayuConfig {
    windLines: { d: string; delay: string; width: number; opacity: number }[];
    particles: { count: number; minSize: number; maxSize: number; minSpeed: number; maxSpeed: number };
    whorl: { opacity: number };
    mercury: { opacity: number };
    symbolOpacity: number;
}

export interface PrithviConfig {
    ground: { height: number; opacity: number };
    crystals: { x: number; h: number; w: number; delay: number }[];
    gems: { cx: number; cy: number; s: number; d: number }[];
    jupiter: { opacity: number };
    symbolOpacity: number;
}

export interface ApasConfig {
    pool: { opacity: number; rx: number; ry: number };
    ripples: { count: number; delayInterval: number };
    waves: { d: string; delay: string; opacity: number }[];
    drops: { cx: number; delay: number }[];
    venus: { opacity: number; shimmer: boolean };
    symbolOpacity: number;
}

export interface AnimationConfig {
    Tejas: TejasConfig;
    Akash: AkashConfig;
    Vayu: VayuConfig;
    Prithvi: PrithviConfig;
    Apas: ApasConfig;
}

export const ANIMATION_CONFIG: AnimationConfig = {
    Tejas: {
        coreGlow: {
            opacity: 0.4,
            rx: 45,
            ry: 35,
        },
        flames: [
            // --- RED DOMINANT (S-SHAPED FLAMES) - evenly distributed ---
            { d: 'M 100,85 Q 90,60 100,45 Q 110,30 100,18', delay: '0s', opacity: 0.35, speed: '1.4s' }, // MAIN CENTER
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

            // --- YELLOWISH (S-SHAPED Accents) ---
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

            // --- ORANGE (S-SHAPED Accents) ---
            { d: 'M 94,85 Q 102,65 94,45 Q 86,30 94,22', delay: '0.3s', opacity: 0.22, speed: '1.5s', color: '#ec6912ff' },
            { d: 'M 106,85 Q 98,65 106,45 Q 114,30 106,22', delay: '0.5s', opacity: 0.22, speed: '1.6s', color: '#ec6912ff' },
            { d: 'M 88,85 Q 95,70 88,55', delay: '0.7s', opacity: 0.2, speed: '1.8s', color: '#ec6912ff' },
            { d: 'M 112,85 Q 105,70 112,55', delay: '0.9s', opacity: 0.2, speed: '1.9s', color: '#ec6912ff' },
            { d: 'M 96,85 Q 104,70 96,55', delay: '0.15s', opacity: 0.2, speed: '1.7s', color: '#ec6912ff' },
            { d: 'M 104,85 Q 96,70 104,55', delay: '0.35s', opacity: 0.2, speed: '1.8s', color: '#ec6912ff' },
            { d: 'M 85,85 Q 90,75 85,65', delay: '0.55s', opacity: 0.15, speed: '2.0s', color: '#ec6912ff' },
            { d: 'M 115,85 Q 110,75 115,65', delay: '0.75s', opacity: 0.15, speed: '2.1s', color: '#eca012ff' },

            // --- BLUEISH (Base Flickers) ---
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
        rings: { count: 6, intervalDelay: 1.2, strokeWidth: 1.2 },
        particles: { count: 12, minSize: 0.6, maxSize: 1.8 },
        saturn: { opacity: 0.4, ringOpacity: 0.5 },
        symbolOpacity: 0.6,
    },
    Vayu: {
        windLines: [
            { d: 'M 10,35 Q 60,20 110,35 T 190,35', delay: '0s', width: 1.2, opacity: 0.25 },
            { d: 'M 0,50 Q 50,35 100,50 T 200,50', delay: '0.6s', width: 0.8, opacity: 0.22 },
            { d: 'M 20,65 Q 70,50 120,65 T 180,65', delay: '1.2s', width: 1.0, opacity: 0.25 },
            { d: 'M -10,80 Q 40,65 90,80 T 210,80', delay: '1.8s', width: 0.6, opacity: 0.2 },
        ],
        particles: { count: 15, minSize: 0.8, maxSize: 1.6, minSpeed: 3, maxSpeed: 6 },
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
        jupiter: { opacity: 0.4 },
        symbolOpacity: 0.5,
    },
    Apas: {
        pool: { opacity: 0.15, rx: 70, ry: 25 },
        ripples: { count: 5, delayInterval: 1.5 },
        waves: [
            { d: 'M 20,75 Q 40,65 60,75 T 100,75 T 140,75 T 180,75', delay: '0s', opacity: 0.3 },
            { d: 'M 30,82 Q 50,72 70,82 T 110,82 T 150,82 T 190,82', delay: '0.8s', opacity: 0.2 },
            { d: 'M 10,88 Q 30,78 50,88 T 90,88 T 130,88 T 170,88', delay: '1.6s', opacity: 0.15 },
        ],
        drops: [
            { cx: 85, delay: 0 }, { cx: 105, delay: 1.2 },
            { cx: 120, delay: 2.4 }, { cx: 75, delay: 3.6 },
            { cx: 110, delay: 0.6 },
        ],
        venus: { opacity: 0.4, shimmer: true },
        symbolOpacity: 0.5,
    },
};
