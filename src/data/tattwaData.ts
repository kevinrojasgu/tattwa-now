/**
 * @file tattwaData.ts
 * @description Static Tattwa data records. Contains all constant information
 * about the five elements — colors, planets, properties, and the new chakra,
 * gemstone, and mudra correspondences. No logic; pure data.
 */

import type { TattwaName, TattwaInfo } from '../types';

/** The five Tattwas in their natural sunrise-cycle order */
export const TATTWA_ORDER: readonly TattwaName[] = ['Akash', 'Vayu', 'Tejas', 'Prithvi', 'Apas'] as const;

/** Duration of a single Tattwa period in minutes */
export const TATTWA_DURATION_MIN = 24;

/** Duration of a full 5-Tattwa cycle in minutes */
export const CYCLE_DURATION_MIN = 120; // 5 * 24

/** Duration of a sub-Tattwa period in minutes */
export const SUB_TATTWA_DURATION_MIN = TATTWA_DURATION_MIN / 5; // 4.8 minutes

/**
 * Full Tattwa data record keyed by TattwaName.
 * All string values are in English; use translateValue() for localization.
 */
export const TATTWAS: Record<TattwaName, TattwaInfo> = {
  Akash: {
    name: 'Akash',
    element: 'Ether',
    color: 'Black / Colorless',
    colorHex: '#4a4a5a',
    colorLight: '#6b6b7b',
    colorGradientFrom: '#1a1a2e',
    colorGradientTo: '#2d2d44',
    shape: 'Ear-like (Ovoid)',
    planet: 'Saturn',
    direction: 'Center',
    sense: 'Hearing',
    nature: 'Destructive, meditative',
    taste: 'Bitter',
    symbol: 'H',
    mantra: 'Ham',
    chakra: 'Vishuddha',
    chakraEnglish: 'Throat Chakra',
    gemstone: 'Blue Sapphire & Obsidian',
    mudra: 'Shunya Mudra',
    favorableFor: [
      'Meditation and prayer',
      'Solitude and introspection',
      'Spiritual practices',
    ],
    unfavorableFor: [
      'Starting new ventures',
      'Business dealings',
      'Marriages and unions',
      'Travel',
      'Eating (food tastes bitter)',
    ],
    description:
      'Akash is the principle of dissolution and return to the primordial state. It represents the ether from which all other Tattwas emerge and to which they return. During Akash, one should remain still, meditate, and avoid worldly actions. It is associated with Saturn and the karmic destiny.',
  },
  Vayu: {
    name: 'Vayu',
    element: 'Air',
    color: 'Blue-Green',
    colorHex: '#2d8f6f',
    colorLight: '#3db88e',
    colorGradientFrom: '#0d3b2e',
    colorGradientTo: '#1a6b52',
    shape: 'Sphere',
    planet: 'Mercury',
    direction: 'North',
    sense: 'Touch',
    nature: 'Movement, intellect',
    taste: 'Acid / Sour',
    symbol: 'P',
    mantra: 'Pam',
    chakra: 'Anahata',
    chakraEnglish: 'Heart Chakra',
    gemstone: 'Emerald & Green Tourmaline',
    mudra: 'Vayu Mudra',
    favorableFor: [
      'Intellectual work and study',
      'Walking and physical exercise',
      'Mountain climbing',
      'Quick tasks requiring speed',
      'Oratory and speech',
    ],
    unfavorableFor: [
      'Buying or selling',
      'Making new acquaintances',
      'Marriages',
      'Long-term commitments',
      'Bathing (too cold)',
    ],
    description:
      'Vayu is the first manifestation of life through movement. It governs speed, travel, and intellectual faculties. While favorable for mental work and quick actions, it can bring gossip, lies, and deception. Associated with Mercury, it favors Wednesdays and Mondays.',
  },
  Tejas: {
    name: 'Tejas',
    element: 'Fire',
    color: 'Red',
    colorHex: '#c9302c',
    colorLight: '#e74c3c',
    colorGradientFrom: '#3b0d0d',
    colorGradientTo: '#6b1a1a',
    shape: 'Triangle',
    planet: 'Sun / Mars',
    direction: 'South',
    sense: 'Sight',
    nature: 'Energy, action, expansion',
    taste: 'Very pungent / Hot',
    symbol: 'R',
    mantra: 'Ram',
    chakra: 'Manipura',
    chakraEnglish: 'Solar Plexus Chakra',
    gemstone: 'Ruby & Carnelian',
    mudra: 'Surya Mudra',
    favorableFor: [
      'Military and government work',
      'Actions requiring energy and courage',
      'Cold water bathing (prevents colds)',
      'Overcoming negative illnesses',
      'Tasks involving fire or iron',
    ],
    unfavorableFor: [
      'Avoiding arguments and fights',
      'Starting marriages (brings quarrels)',
      'Travel (risk of accidents)',
      'Delicate negotiations',
    ],
    description:
      'Tejas represents the principle of fire, heat, and light. When vibrating in Tejas, one feels increased energy, confidence, and a desire for action. It can make people aggressive and argumentative. Related to the Sun and Mars, it governs freedom, activity, and great deeds.',
  },
  Prithvi: {
    name: 'Prithvi',
    element: 'Earth',
    color: 'Yellow',
    colorHex: '#d4a017',
    colorLight: '#f1c40f',
    colorGradientFrom: '#3b2e0d',
    colorGradientTo: '#6b520d',
    shape: 'Rhombus (Square)',
    planet: 'Jupiter',
    direction: 'East',
    sense: 'Smell',
    nature: 'Health, justice, joy',
    taste: 'Sweet',
    symbol: 'L',
    mantra: 'Lam',
    chakra: 'Muladhara',
    chakraEnglish: 'Root Chakra',
    gemstone: 'Yellow Sapphire & Citrine',
    mudra: 'Prithvi Mudra',
    favorableFor: [
      'Eating and nourishment',
      'Legal matters and seeking justice',
      'Marriages (brings lasting happiness)',
      'Religious practices and prayer',
      'Starting friendships',
      'Medical treatments',
      'Conferences and gatherings',
    ],
    unfavorableFor: [
      'Very few — Prithvi is the most benevolent Tattwa',
      'Saturdays and Tuesdays during Mars/Saturn hours',
    ],
    description:
      "Prithvi is the Tattwa of joy, health, and justice. It represents cohesion and solidarity. One feels full of well-being and optimism. Equivalent to Jupiter's influence — the \"greater fortune\" in astrology. Marriages celebrated in Prithvi are happy and lasting. Legal matters find just resolution.",
  },
  Apas: {
    name: 'Apas',
    element: 'Water',
    color: 'White / Silver',
    colorHex: '#b0bec5',
    colorLight: '#eceff1',
    colorGradientFrom: '#1a2a3a',
    colorGradientTo: '#3a4a5a',
    shape: 'Crescent Moon',
    planet: 'Venus',
    direction: 'West',
    sense: 'Taste',
    nature: 'Concentration, wealth, art',
    taste: 'Astringent',
    symbol: 'V',
    mantra: 'Vam',
    chakra: 'Svadhisthana',
    chakraEnglish: 'Sacral Chakra',
    gemstone: 'Pearl & Moonstone',
    mudra: 'Varuna Mudra',
    favorableFor: [
      'Commerce and business dealings',
      'Buying jewelry and clothes',
      'Financial speculation and investments',
      'Artistic creation (painting, music)',
      'Sea travel',
      'Acts of charity',
      'Love and romantic matters',
    ],
    unfavorableFor: [
      'Drinking alcohol (leads to excess)',
      'Can promote greed in less developed people',
    ],
    description:
      'Apas is the concentrating principle, opposite to Tejas. It governs wealth, commerce, art, and love. Associated with Venus, it is the Tattwa of the affluent. Money is attracted magnetically during Apas. Highly favorable for artists — it opens intuition and artistic perception. Also governs sexual love and conception.',
  },
};
