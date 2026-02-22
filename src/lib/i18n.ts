export type Lang = 'en' | 'es';

export interface Translations {
  // App
  appTitle: string;
  appSubtitle: string;
  loading: string;
  footer: string;
  switchLang: string;

  // LocationPicker
  detecting: string;
  autoDetect: string;
  searchCities: string;
  noCitiesFound: string;

  // TattwaCard
  currentTattwa: string;
  remaining: string;
  planet: string;
  direction: string;
  sense: string;
  mantra: string;
  cycleStartedSunrise: string;
  cycle: string;

  // SubTattwa
  subTattwa: string;

  // TattwaReference
  tattwaReference: string;
  active: string;
  color: string;
  shape: string;
  taste: string;
  symbol: string;
  favorableFor: string;
  unfavorableFor: string;

  // TimeNavigator
  live: string;
  viewingPast: string;
  now: string;
  close: string;
  pickDate: string;
  viewingTattwaFor: string;
  returnToNow: string;
  selectDateTime: string;
  yesterdaySunrise: string;
  tomorrowSunrise: string;
  stepByPeriod: string;

  // MoonPhase
  moonAndBreathing: string;
  illuminated: string;
  dayLunarCycle: string; // use {day} placeholder
  balanced: string;
  leftNostril: string;
  rightNostril: string;
  nadi: string;
  dawn: string;
  sunrise: string;
  sunset: string;
  dusk: string;

  // Date locale for toLocaleDateString / toLocaleTimeString
  dateLocale: string;
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    appTitle: 'Tattwa Now',
    appSubtitle: 'The Vibrations of the Ether',
    loading: 'Calculating vibrations...',
    footer: 'Based on "El Tatwametro" by Dr. Arnold Krumm-Heller (Maestro Huiracocha)',
    switchLang: 'ES',

    detecting: 'Detecting...',
    autoDetect: 'Auto-detect my location',
    searchCities: 'Search cities...',
    noCitiesFound: 'No cities found',

    currentTattwa: 'Current Tattwa',
    remaining: 'remaining',
    planet: 'Planet',
    direction: 'Direction',
    sense: 'Sense',
    mantra: 'Mantra',
    cycleStartedSunrise: 'Cycle started at sunrise:',
    cycle: 'Cycle #',

    subTattwa: 'Sub-Tattwa',

    tattwaReference: 'Tattwa Reference',
    active: 'ACTIVE',
    color: 'Color',
    shape: 'Shape',
    taste: 'Taste',
    symbol: 'Symbol',
    favorableFor: 'Favorable for',
    unfavorableFor: 'Unfavorable for',

    live: 'Live',
    viewingPast: 'Viewing past',
    now: 'Now',
    close: 'Close',
    pickDate: 'Pick date',
    viewingTattwaFor: 'Viewing Tattwa for',
    returnToNow: 'return to now',
    selectDateTime: 'Select date & time',
    yesterdaySunrise: 'Yesterday sunrise',
    tomorrowSunrise: 'Tomorrow sunrise',
    stepByPeriod: 'Step by Tattwa period:',

    moonAndBreathing: 'Moon & Breathing',
    illuminated: '% illuminated',
    dayLunarCycle: 'Day {day} of lunar cycle',
    balanced: 'Balanced (transition)',
    leftNostril: 'Left nostril dominant',
    rightNostril: 'Right nostril dominant',
    nadi: 'Nadi',
    dawn: 'Dawn',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    dusk: 'Dusk',

    dateLocale: 'en-US',
  },
  es: {
    appTitle: 'Tattwa Ahora',
    appSubtitle: 'Las Vibraciones del Éter',
    loading: 'Calculando vibraciones...',
    footer: 'Basado en "El Tatwámetro" del Dr. Arnold Krumm-Heller (Maestro Huiracocha)',
    switchLang: 'EN',

    detecting: 'Detectando...',
    autoDetect: 'Detectar mi ubicación',
    searchCities: 'Buscar ciudades...',
    noCitiesFound: 'No se encontraron ciudades',

    currentTattwa: 'Tattwa Actual',
    remaining: 'restante',
    planet: 'Planeta',
    direction: 'Dirección',
    sense: 'Sentido',
    mantra: 'Mantra',
    cycleStartedSunrise: 'Ciclo iniciado al amanecer:',
    cycle: 'Ciclo #',

    subTattwa: 'Sub-Tattwa',

    tattwaReference: 'Referencia Tattwa',
    active: 'ACTIVO',
    color: 'Color',
    shape: 'Forma',
    taste: 'Sabor',
    symbol: 'Símbolo',
    favorableFor: 'Favorable para',
    unfavorableFor: 'Desfavorable para',

    live: 'En vivo',
    viewingPast: 'Viendo pasado',
    now: 'Ahora',
    close: 'Cerrar',
    pickDate: 'Elegir fecha',
    viewingTattwaFor: 'Viendo Tattwa para',
    returnToNow: 'volver al ahora',
    selectDateTime: 'Seleccionar fecha y hora',
    yesterdaySunrise: 'Amanecer de ayer',
    tomorrowSunrise: 'Amanecer de mañana',
    stepByPeriod: 'Paso por período Tattwa:',

    moonAndBreathing: 'Luna y Respiración',
    illuminated: '% iluminada',
    dayLunarCycle: 'Día {day} del ciclo lunar',
    balanced: 'Equilibrado (transición)',
    leftNostril: 'Narina izquierda dominante',
    rightNostril: 'Narina derecha dominante',
    nadi: 'Nadi',
    dawn: 'Amanecer',
    sunrise: 'Salida del sol',
    sunset: 'Puesta del sol',
    dusk: 'Crepúsculo',

    dateLocale: 'es-ES',
  },
};

// Maps English tattwa property values to Spanish equivalents
const VALUE_TRANSLATIONS_ES: Record<string, string> = {
  // Elements
  Ether: 'Éter',
  Air: 'Aire',
  Fire: 'Fuego',
  Earth: 'Tierra',
  Water: 'Agua',
  // Directions
  Center: 'Centro',
  North: 'Norte',
  South: 'Sur',
  East: 'Este',
  West: 'Oeste',
  // Senses
  Hearing: 'Oído',
  Touch: 'Tacto',
  Sight: 'Vista',
  Smell: 'Olfato',
  Taste: 'Gusto',
  // Planets
  Saturn: 'Saturno',
  Mercury: 'Mercurio',
  'Sun / Mars': 'Sol / Marte',
  Jupiter: 'Júpiter',
  Venus: 'Venus',
  // Nature
  'Destructive, meditative': 'Destructivo, meditativo',
  'Movement, intellect': 'Movimiento, intelecto',
  'Energy, action, expansion': 'Energía, acción, expansión',
  'Health, justice, joy': 'Salud, justicia, alegría',
  'Concentration, wealth, art': 'Concentración, riqueza, arte',
  // Tastes
  Bitter: 'Amargo',
  'Acid / Sour': 'Ácido / Agrio',
  'Very pungent / Hot': 'Muy picante / Caliente',
  Sweet: 'Dulce',
  Astringent: 'Astringente',
  // Shapes
  'Ear-like (Ovoid)': 'Ovoide (Oreja)',
  Sphere: 'Esfera',
  Triangle: 'Triángulo',
  'Rhombus (Square)': 'Rombo (Cuadrado)',
  'Crescent Moon': 'Media Luna',
  // Colors
  'Black / Colorless': 'Negro / Sin color',
  'Blue-Green': 'Azul-Verde',
  Red: 'Rojo',
  Yellow: 'Amarillo',
  'White / Silver': 'Blanco / Plateado',
};

/** Translate a tattwa property value if a Spanish equivalent exists */
export function translateValue(value: string, lang: Lang): string {
  if (lang === 'es') return VALUE_TRANSLATIONS_ES[value] ?? value;
  return value;
}

// Spanish translations for tattwa descriptions and favorable/unfavorable lists
export const TATTWA_TEXT_ES: Record<
  string,
  { description: string; favorableFor: string[]; unfavorableFor: string[] }
> = {
  Akash: {
    description:
      'Akash es el principio de disolución y regreso al estado primordial. Representa el éter del que emergen todos los demás Tattwas y al que regresan. Durante Akash, uno debe permanecer quieto, meditar y evitar las acciones mundanas. Está asociado con Saturno y el destino kármico.',
    favorableFor: ['Meditación y oración', 'Soledad e introspección', 'Prácticas espirituales'],
    unfavorableFor: [
      'Iniciar nuevos proyectos',
      'Negocios',
      'Matrimonios y uniones',
      'Viajes',
      'Comer (la comida sabe amarga)',
    ],
  },
  Vayu: {
    description:
      'Vayu es la primera manifestación de la vida a través del movimiento. Rige la velocidad, los viajes y las facultades intelectuales. Aunque es favorable para el trabajo mental y las acciones rápidas, puede traer rumores, mentiras y engaños. Asociado con Mercurio, favorece los miércoles y lunes.',
    favorableFor: [
      'Trabajo intelectual y estudio',
      'Caminar y ejercicio físico',
      'Montañismo',
      'Tareas rápidas que requieren velocidad',
      'Oratoria y discurso',
    ],
    unfavorableFor: [
      'Comprar o vender',
      'Hacer nuevas amistades',
      'Matrimonios',
      'Compromisos a largo plazo',
      'Bañarse (demasiado frío)',
    ],
  },
  Tejas: {
    description:
      'Tejas representa el principio del fuego, el calor y la luz. Cuando vibra en Tejas, uno siente mayor energía, confianza y deseo de acción. Puede volver a las personas agresivas y argumentativas. Relacionado con el Sol y Marte, rige la libertad, la actividad y las grandes obras.',
    favorableFor: [
      'Trabajo militar y gubernamental',
      'Acciones que requieren energía y valentía',
      'Baño en agua fría (previene resfriados)',
      'Superar enfermedades negativas',
      'Tareas relacionadas con el fuego o el hierro',
    ],
    unfavorableFor: [
      'Evitar discusiones y peleas',
      'Iniciar matrimonios (trae riñas)',
      'Viajes (riesgo de accidentes)',
      'Negociaciones delicadas',
    ],
  },
  Prithvi: {
    description:
      'Prithvi es el Tattwa de la alegría, la salud y la justicia. Representa la cohesión y la solidaridad. Uno se siente lleno de bienestar y optimismo. Equivalente a la influencia de Júpiter — la "gran fortuna" en astrología. Los matrimonios celebrados en Prithvi son felices y duraderos. Los asuntos legales encuentran una resolución justa.',
    favorableFor: [
      'Comer y nutrirse',
      'Asuntos legales y búsqueda de justicia',
      'Matrimonios (trae felicidad duradera)',
      'Prácticas religiosas y oración',
      'Iniciar amistades',
      'Tratamientos médicos',
      'Conferencias y reuniones',
    ],
    unfavorableFor: [
      'Muy pocos — Prithvi es el Tattwa más benevolente',
      'Sábados y martes en horas de Marte/Saturno',
    ],
  },
  Apas: {
    description:
      'Apas es el principio concentrador, opuesto a Tejas. Rige la riqueza, el comercio, el arte y el amor. Asociado con Venus, es el Tattwa de los prósperos. El dinero se atrae magnéticamente durante Apas. Muy favorable para artistas: abre la intuición y la percepción artística. También rige el amor sexual y la concepción.',
    favorableFor: [
      'Comercio y negocios',
      'Comprar joyas y ropa',
      'Especulación financiera e inversiones',
      'Creación artística (pintura, música)',
      'Viajes por mar',
      'Actos de caridad',
      'Asuntos amorosos y románticos',
    ],
    unfavorableFor: [
      'Beber alcohol (lleva al exceso)',
      'Puede promover la codicia en personas poco desarrolladas',
    ],
  },
};

/** Detect preferred language from browser, with localStorage override */
export function detectBrowserLang(): Lang {
  const saved = localStorage.getItem('tattwa-lang') as Lang | null;
  if (saved === 'en' || saved === 'es') return saved;

  const langs: readonly string[] = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const l of langs) {
    if (l.toLowerCase().startsWith('es')) return 'es';
  }
  return 'en';
}
