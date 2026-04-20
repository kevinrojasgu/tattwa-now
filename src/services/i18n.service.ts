/**
 * @file i18n.service.ts
 * @description Internationalization service. Contains all UI string translations,
 * extended Tattwa text (EN + ES), value translation map, and language detection.
 * No React dependencies.
 */

import type { Lang, Translations, TattwaExtendedText } from '../types';

/**
 * All UI string translations keyed by language code.
 */
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
    chakra: 'Chakra',
    bodyParts: 'Body Areas',
    gemstone: 'Gemstone',
    mudra: 'Mudra',
    bestDays: 'Best Days',
    emotionalState: 'Emotional State',
    breathingNote: 'Breathing Note',
    tattwaMetro: 'Tattwa Meter',
    fullView: 'Full view',

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
    chakra: 'Chakra',
    bodyParts: 'Áreas Corporales',
    gemstone: 'Piedra',
    mudra: 'Mudra',
    bestDays: 'Mejores Días',
    emotionalState: 'Estado Emocional',
    breathingNote: 'Nota Respiratoria',
    tattwaMetro: 'Tattwámetro',
    fullView: 'Vista completa',

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

/** English translation map for Tattwa property values */
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

/**
 * Translate a single Tattwa property value to the target language.
 * Returns the original value if no translation is found.
 *
 * @param value - The English property value to translate
 * @param lang - Target language code
 * @returns Translated string, or original if no translation exists
 */
export function translateValue(value: string, lang: Lang): string {
  if (lang === 'es') return VALUE_TRANSLATIONS_ES[value] ?? value;
  return value;
}

/**
 * English extended text for all five Tattwas.
 * Used in TattwaReference expanded view.
 */
export const TATTWA_TEXT_EN: Record<string, TattwaExtendedText> = {
  Akash: {
    description:
      'Akash is the primordial void from which all creation emerges and to which it ultimately returns. As the first and most subtle of the five Tattwas, it represents the infinite space that pervades all existence. This is the Tattwa of dissolution — of ego, of form, of desire. Associated with Saturn, the great teacher of karma, Akash dissolves all boundaries and invites surrender. During this period, the ego loosens its grip and the soul touches eternity. The wise practitioner rests, meditates, and allows the cosmic order to reveal itself. Even food loses its flavor during Akash — the body too is asked to fast from worldly engagement.',
    favorableFor: [
      'Deep meditation and silent prayer',
      'Samadhi and trance states',
      'Fasting and purification',
      'Solitary introspection',
      'Karma yoga and spiritual surrender',
      'Listening to sacred music or mantras',
      'Astral work and lucid dreaming',
      'Healing through non-action',
    ],
    unfavorableFor: [
      'Starting any new project or venture',
      'Business negotiations or commerce',
      'Marriages, partnerships, or new alliances',
      'Long-distance travel',
      'Eating (food tastes bitter, digestion weak)',
      'Physical exercise or exertion',
      'Making important decisions',
      'Seeking worldly pleasures',
    ],
    bodyParts: ['Throat', 'Ears', 'Vocal cords', 'Thyroid gland', 'Upper respiratory tract'],
    bestDays: ['Saturday (Saturn\'s day)'],
    emotionalState:
      'Detachment, dissolution of desires, melancholy, deep introspection, acceptance, surrender',
    breathingNote:
      'During Akash, breath flows through neither nostril predominantly — Sushumna (central channel) is active. This is the most spiritual breathing state and indicates a threshold moment.',
  },
  Vayu: {
    description:
      'Vayu is the first tangible manifestation of life — movement itself given form. It is the Tattwa of wind, nerve impulse, and electrical thought. Quick as lightning, unstable as the wind, Vayu governs everything that moves: the nervous system, speech, locomotion, and mental agility. Ruled by Mercury, the messenger of the gods, Vayu people become brilliant conversationalists, fast thinkers, and swift movers. However, this same quickness makes Vayu treacherous for lasting commitments — words spoken during Vayu may be clever but lack depth.',
    favorableFor: [
      'Intellectual study and academic work',
      'Writing, journalism, and communication',
      'Speed-dependent physical activities',
      'Mountain hiking and nature walks',
      'Public speaking and oratory',
      'Short journeys and local travel',
      'Learning new skills quickly',
      'Meditation on breath (pranayama)',
    ],
    unfavorableFor: [
      'Commercial transactions and buying/selling',
      'Beginning new friendships or partnerships',
      'Marriage ceremonies',
      'Long-term contracts and binding agreements',
      'Cold baths (risk of catching cold)',
      'Building foundations for permanent structures',
    ],
    bodyParts: ['Lungs', 'Skin and sense of touch', 'Nervous system', 'Hands and arms', 'Large intestine'],
    bestDays: ['Wednesday (Mercury\'s day)', 'Monday (Moon day)'],
    emotionalState:
      'Mental restlessness, intellectual excitement, quick wit, potential anxiety, desire for movement and novelty',
    breathingNote:
      'Vayu often coincides with activation of the right nostril (Pingala/Solar nadi). Mental energy peaks. Good time for analytical and mathematical thought.',
  },
  Tejas: {
    description:
      'Tejas is the fire that animates the cosmos — the principle of light, heat, and transformation. Where Akash dissolves and Vayu moves, Tejas acts. It is the Tattwa of willpower, courage, ambition, and the burning desire to achieve. Governed jointly by the Sun (vital force, authority) and Mars (war, iron, action), Tejas makes one feel invincible. The body temperature rises, digestion becomes powerful, the voice grows stronger, and the will sharpens. Great deeds require great fire — but fire without wisdom burns the house it warms.',
    favorableFor: [
      'Military, police, and governmental work',
      'Physical training and competitive sports',
      'Overcoming illness (cold and damp conditions)',
      'Cold water immersion (strengthens immune response)',
      'Tasks requiring iron, fire, or forge work',
      'Surgery and medical procedures',
      'Confronting enemies or overcoming obstacles',
      'Leadership and executive decisions',
    ],
    unfavorableFor: [
      'Diplomatic negotiations and peace-making',
      'Marriage and romantic initiation',
      'Creative and artistic endeavors (too aggressive)',
      'Long-distance water travel',
      'Making new alliances requiring trust',
      'Financial speculation (excessive risk)',
    ],
    bodyParts: [
      'Liver and gallbladder',
      'Eyes and sight',
      'Stomach and digestive fire (Agni)',
      'Adrenal glands',
      'Blood and cardiovascular system',
    ],
    bestDays: ['Sunday (Sun\'s day)', 'Tuesday (Mars\' day)'],
    emotionalState:
      'Courage, ambition, passion, potential anger and aggression, desire for conquest and victory',
    breathingNote:
      'Tejas strongly activates the right nostril (Pingala/Solar nadi). Body temperature rises noticeably. Physical energy is at its peak. Channel this force into productive action.',
  },
  Prithvi: {
    description:
      'Prithvi is the most benevolent of all the Tattwas — the earth beneath our feet, the mother that sustains all life. Governed by Jupiter, the great benefactor of astrology, Prithvi radiates abundance, justice, health, and joy. When Prithvi vibrates, the world feels secure, the body feels nourished, relationships feel solid, and decisions carry lasting weight. Unlike the fleeting fire of Tejas or the restless wind of Vayu, Prithvi endures. Marriages celebrated in Prithvi stand the test of time. This is the Tattwa of civilization itself.',
    favorableFor: [
      'All forms of nourishment and feasting',
      'Marriage ceremonies and unions (brings lasting happiness)',
      'Legal proceedings, contracts, and justice-seeking',
      'Medical treatments and healing',
      'Religious ceremonies and sacred rites',
      'Planting, farming, and all agricultural work',
      'Building homes and establishing foundations',
      'Making new friends and lasting alliances',
      'Financial planning and long-term investments',
      'Educational pursuits and examinations',
    ],
    unfavorableFor: [
      'Actions requiring speed and quick movement',
      'Very little is inauspicious under Prithvi',
      'Saturdays during Saturn/Mars hours may diminish Prithvi\'s benefits',
      'Excessive fasting (body seeks nourishment)',
    ],
    bodyParts: [
      'Bones and skeletal structure',
      'Muscles and connective tissue',
      'Nose and sense of smell',
      'Immune system',
      'Large intestine and elimination',
    ],
    bestDays: ['Thursday (Jupiter\'s day)'],
    emotionalState:
      'Contentment, gratitude, generosity, stability, abundance consciousness, joy, trust in life',
    breathingNote:
      'Prithvi activates equal flow through both nostrils, or favors the left (Ida/Lunar). The breath is slow, deep, and naturally rhythmic. The body is in its most receptive and healing state.',
  },
  Apas: {
    description:
      'Apas is the concentrating, magnetic principle — the force that draws things together as surely as water fills every vessel. Governed by Venus, the goddess of beauty, love, and wealth, Apas is the Tattwa of the affluent and the artistic. Where Tejas burns outward, Apas concentrates inward, magnetizing wealth, love, and creative inspiration. Artists feel their muse speak clearly during Apas. Merchants find customers drawn to them. The shadow of Apas is excess: the same force that attracts wealth can become greed.',
    favorableFor: [
      'Commerce, trade, and all business dealings',
      'Financial speculation and investment decisions',
      'Purchasing jewelry, gems, and luxury items',
      'Artistic creation: painting, music, dance, poetry',
      'Ocean and sea travel',
      'Acts of charity and generosity',
      'Romantic relationships and love declarations',
      'Conception and fertility work',
      'Healing through water (hydrotherapy, baths)',
    ],
    unfavorableFor: [
      'Consuming alcohol (amplifies addictive tendencies)',
      'Excessive indulgence in pleasures (leads to dissipation)',
      'Aggressive or competitive activities',
      'Mountain climbing and high-altitude activities',
      'Fasting (body craves nourishment and pleasure)',
    ],
    bodyParts: [
      'Kidneys and bladder',
      'Reproductive organs',
      'Tongue and sense of taste',
      'Lymphatic system',
      'Blood plasma and bodily fluids',
    ],
    bestDays: ['Friday (Venus\' day)', 'Days with strong Moon influence'],
    emotionalState:
      'Artistic inspiration, sensuality, magnetism, desire for beauty and pleasure, generosity, potential possessiveness',
    breathingNote:
      'Apas activates the left nostril (Ida/Lunar nadi). The body is in its most magnetic and receptive state. Emotions run deep and creativity flows naturally.',
  },
};

/**
 * Spanish extended text for all five Tattwas.
 * Used in TattwaReference expanded view when lang === 'es'.
 */
export const TATTWA_TEXT_ES: Record<string, TattwaExtendedText> = {
  Akash: {
    description:
      'Akash es el vacío primordial del que emerge toda creación y al que finalmente regresa. Como el primero y más sutil de los cinco Tattwas, representa el espacio infinito que impregna toda existencia. Este es el Tattwa de la disolución — del ego, de la forma, del deseo. Asociado con Saturno, el gran maestro del karma, Akash disuelve todos los límites e invita a la rendición. Durante este período, el ego afloja su dominio y el alma toca la eternidad. El practicante sabio descansa, medita y permite que el orden cósmico se revele. Incluso la comida pierde su sabor durante Akash — al cuerpo también se le pide ayunar del compromiso mundano.',
    favorableFor: [
      'Meditación profunda y oración silenciosa',
      'Samadhi y estados de trance',
      'Ayuno y purificación',
      'Introspección solitaria',
      'Karma yoga y rendición espiritual',
      'Escuchar música sagrada o mantras',
      'Trabajo astral y sueño lúcido',
      'Sanación a través de la no-acción',
    ],
    unfavorableFor: [
      'Iniciar cualquier proyecto o empresa nueva',
      'Negociaciones comerciales o comercio',
      'Matrimonios, asociaciones o nuevas alianzas',
      'Viajes de larga distancia',
      'Comer (la comida sabe amarga, la digestión es débil)',
      'Ejercicio físico o esfuerzo',
      'Tomar decisiones importantes',
      'Buscar placeres mundanos',
    ],
    bodyParts: ['Garganta', 'Oídos', 'Cuerdas vocales', 'Glándula tiroides', 'Vías respiratorias superiores'],
    bestDays: ['Sábado (día de Saturno)'],
    emotionalState:
      'Desapego, disolución de deseos, melancolía, introspección profunda, aceptación, rendición',
    breathingNote:
      'Durante Akash, el aliento no fluye predominantemente por ninguna fosa nasal — Sushumna (canal central) está activo. Este es el estado respiratorio más espiritual e indica un momento umbral.',
  },
  Vayu: {
    description:
      'Vayu es la primera manifestación tangible de la vida — el movimiento mismo dado forma. Es el Tattwa del viento, el impulso nervioso y el pensamiento eléctrico. Rápido como el rayo, inestable como el viento, Vayu gobierna todo lo que se mueve: el sistema nervioso, el habla, la locomoción y la agilidad mental. Regido por Mercurio, el mensajero de los dioses, las personas de Vayu se convierten en brillantes conversadores, pensadores rápidos y veloces actores. Sin embargo, esta misma rapidez hace que Vayu sea traicionero para los compromisos duraderos — las palabras pronunciadas durante Vayu pueden ser inteligentes pero carecen de profundidad.',
    favorableFor: [
      'Estudio intelectual y trabajo académico',
      'Escritura, periodismo y comunicación',
      'Actividades físicas dependientes de la velocidad',
      'Senderismo de montaña y caminatas en la naturaleza',
      'Oratoria y hablar en público',
      'Viajes cortos y viajes locales',
      'Aprender nuevas habilidades rápidamente',
      'Meditación sobre la respiración (pranayama)',
    ],
    unfavorableFor: [
      'Transacciones comerciales y compra/venta',
      'Iniciar nuevas amistades o asociaciones',
      'Ceremonias de matrimonio',
      'Contratos a largo plazo y acuerdos vinculantes',
      'Baños fríos (riesgo de resfriarse)',
      'Construir cimientos para estructuras permanentes',
    ],
    bodyParts: ['Pulmones', 'Piel y sentido del tacto', 'Sistema nervioso', 'Manos y brazos', 'Intestino grueso'],
    bestDays: ['Miércoles (día de Mercurio)', 'Lunes (día de la Luna)'],
    emotionalState:
      'Inquietud mental, emoción intelectual, ingenio rápido, posible ansiedad, deseo de movimiento y novedad',
    breathingNote:
      'Vayu a menudo coincide con la activación de la fosa nasal derecha (Pingala/nadi solar). La energía mental alcanza su punto máximo. Buen momento para el pensamiento analítico y matemático.',
  },
  Tejas: {
    description:
      'Tejas es el fuego que anima el cosmos — el principio de la luz, el calor y la transformación. Donde Akash disuelve y Vayu mueve, Tejas actúa. Es el Tattwa de la fuerza de voluntad, el coraje, la ambición y el ardiente deseo de lograr. Gobernado conjuntamente por el Sol (fuerza vital, autoridad) y Marte (guerra, hierro, acción), Tejas hace que uno se sienta invencible. La temperatura corporal sube, la digestión se vuelve poderosa, la voz se fortalece y la voluntad se agudiza. Las grandes hazañas requieren gran fuego — pero el fuego sin sabiduría quema la casa que calienta.',
    favorableFor: [
      'Trabajo militar, policial y gubernamental',
      'Entrenamiento físico y deportes competitivos',
      'Superar enfermedades (condiciones frías y húmedas)',
      'Inmersión en agua fría (fortalece la respuesta inmune)',
      'Tareas que requieren hierro, fuego o trabajo de forja',
      'Cirugía y procedimientos médicos',
      'Confrontar enemigos o superar obstáculos',
      'Liderazgo y decisiones ejecutivas',
    ],
    unfavorableFor: [
      'Negociaciones diplomáticas y establecimiento de paz',
      'Matrimonio e iniciación romántica',
      'Actividades creativas y artísticas (demasiado agresivo)',
      'Viajes por agua de larga distancia',
      'Hacer nuevas alianzas que requieran confianza',
      'Especulación financiera (riesgo excesivo)',
    ],
    bodyParts: [
      'Hígado y vesícula biliar',
      'Ojos y visión',
      'Estómago y fuego digestivo (Agni)',
      'Glándulas suprarrenales',
      'Sangre y sistema cardiovascular',
    ],
    bestDays: ['Domingo (día del Sol)', 'Martes (día de Marte)'],
    emotionalState:
      'Coraje, ambición, pasión, posible ira y agresión, deseo de conquista y victoria',
    breathingNote:
      'Tejas activa fuertemente la fosa nasal derecha (Pingala/nadi solar). La temperatura corporal sube notablemente. La energía física está en su punto máximo. Canaliza esta fuerza en acción productiva.',
  },
  Prithvi: {
    description:
      'Prithvi es el más benevolente de todos los Tattwas — la tierra bajo nuestros pies, la madre que sustenta toda la vida. Gobernado por Júpiter, el gran benefactor de la astrología, Prithvi irradia abundancia, justicia, salud y alegría. Cuando Prithvi vibra, el mundo se siente seguro, el cuerpo se siente nutrido, las relaciones se sienten sólidas y las decisiones tienen un peso duradero. A diferencia del fuego fugaz de Tejas o el viento inquieto de Vayu, Prithvi perdura. Los matrimonios celebrados en Prithvi soportan la prueba del tiempo. Este es el Tattwa de la civilización misma.',
    favorableFor: [
      'Todas las formas de nutrición y festín',
      'Ceremonias de matrimonio y uniones (trae felicidad duradera)',
      'Procedimientos legales, contratos y búsqueda de justicia',
      'Tratamientos médicos y sanación',
      'Ceremonias religiosas y ritos sagrados',
      'Plantar, cultivar y todo trabajo agrícola',
      'Construir hogares y establecer fundaciones',
      'Hacer nuevos amigos y alianzas duraderas',
      'Planificación financiera e inversiones a largo plazo',
      'Actividades educativas y exámenes',
    ],
    unfavorableFor: [
      'Acciones que requieren velocidad y movimiento rápido',
      'Muy poco es inauspicioso bajo Prithvi',
      'Los sábados durante las horas de Saturno/Marte pueden disminuir los beneficios de Prithvi',
      'Ayuno excesivo (el cuerpo busca nutrición)',
    ],
    bodyParts: [
      'Huesos y estructura esquelética',
      'Músculos y tejido conectivo',
      'Nariz y sentido del olfato',
      'Sistema inmunológico',
      'Intestino grueso y eliminación',
    ],
    bestDays: ['Jueves (día de Júpiter)'],
    emotionalState:
      'Satisfacción, gratitud, generosidad, estabilidad, conciencia de abundancia, alegría, confianza en la vida',
    breathingNote:
      'Prithvi activa el flujo equitativo por ambas fosas nasales, o favorece la izquierda (Ida/Lunar). La respiración es lenta, profunda y naturalmente rítmica. El cuerpo está en su estado más receptivo y sanador.',
  },
  Apas: {
    description:
      'Apas es el principio concentrador y magnético — la fuerza que une las cosas con la misma certeza con que el agua llena cada recipiente. Gobernado por Venus, la diosa de la belleza, el amor y la riqueza, Apas es el Tattwa de los prósperos y los artísticos. Donde Tejas arde hacia afuera, Apas se concentra hacia adentro, magnetizando la riqueza, el amor y la inspiración creativa. Los artistas sienten que su musa habla claramente durante Apas. Los comerciantes encuentran que los clientes se sienten atraídos hacia ellos. La sombra de Apas es el exceso: la misma fuerza que atrae la riqueza puede convertirse en codicia.',
    favorableFor: [
      'Comercio, trade y todos los negocios',
      'Especulación financiera y decisiones de inversión',
      'Compra de joyas, gemas y artículos de lujo',
      'Creación artística: pintura, música, danza, poesía',
      'Viajes por océano y mar',
      'Actos de caridad y generosidad',
      'Relaciones románticas y declaraciones de amor',
      'Trabajo de concepción y fertilidad',
      'Sanación a través del agua (hidroterapia, baños)',
    ],
    unfavorableFor: [
      'Consumir alcohol (amplifica las tendencias adictivas)',
      'Indulgencia excesiva en placeres (lleva a la disipación)',
      'Actividades agresivas o competitivas',
      'Escalada de montañas y actividades de gran altitud',
      'Ayuno (el cuerpo ansía nutrición y placer)',
    ],
    bodyParts: [
      'Riñones y vejiga',
      'Órganos reproductores',
      'Lengua y sentido del gusto',
      'Sistema linfático',
      'Plasma sanguíneo y fluidos corporales',
    ],
    bestDays: ['Viernes (día de Venus)', 'Días con fuerte influencia de la Luna'],
    emotionalState:
      'Inspiración artística, sensualidad, magnetismo, deseo de belleza y placer, generosidad, posible posesividad',
    breathingNote:
      'Apas activa la fosa nasal izquierda (Ida/nadi lunar). El cuerpo está en su estado más magnético y receptivo. Las emociones fluyen profundamente y la creatividad fluye naturalmente.',
  },
};

/**
 * Detect the user's preferred language from browser settings and localStorage.
 * localStorage takes precedence; otherwise falls back to navigator.languages.
 *
 * @returns 'es' if Spanish is preferred, 'en' otherwise
 */
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
