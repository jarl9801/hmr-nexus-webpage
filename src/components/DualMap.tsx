import { useTranslation } from 'react-i18next';
import { Plane, Clock, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { WorldMapSVG, germanyPath, colombiaPath } from '@/components/WorldMapSVG';
import { staggerContainer, cardEntrance } from '@/lib/motion';

/* ─── SVG Flag components (used only in info cards) ────────────────── */

function FlagDE({ size = 56 }: { size?: number }) {
  const r = size / 2;
  const id = 'clip-de';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <clipPath id={id}>
          <circle cx={r} cy={r} r={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect y={0} width={size} height={size / 3} fill="#000000" />
        <rect y={size / 3} width={size} height={size / 3} fill="#DD0000" />
        <rect y={(size / 3) * 2} width={size} height={size / 3} fill="#FFCE00" />
      </g>
    </svg>
  );
}

function FlagCO({ size = 56 }: { size?: number }) {
  const r = size / 2;
  const id = 'clip-co';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <clipPath id={id}>
          <circle cx={r} cy={r} r={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect y={0} width={size} height={size / 2} fill="#FCD116" />
        <rect y={size / 2} width={size} height={size / 4} fill="#003893" />
        <rect y={(size / 4) * 3} width={size} height={size / 4} fill="#CE1126" />
      </g>
    </svg>
  );
}

/* ─── Types ────────────────────────────────────────────────────────── */

interface Location {
  id: string;
  city: string;
  role: string;
  description: string;
  flag: React.ReactNode;
  flagEmoji: string;
  timezone: string;
  phone: string;
  email: string;
  color: string;
  glowColor: string;
  /** SVG viewBox coordinates for the label */
  labelPos: { x: number; y: number };
  countryPath: string;
  stats: { label: string; value: string }[];
}

/* ─── Component ────────────────────────────────────────────────────── */

export function DualMap() {
  const { i18n } = useTranslation();
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const locations: Location[] = [
    {
      id: 'germany',
      city: i18n.language === 'de' ? 'Deutschland' : 'Germany',
      role: i18n.language === 'es' ? 'Sede Central' : i18n.language === 'en' ? 'Headquarters' : 'Hauptsitz',
      description: i18n.language === 'es'
        ? 'Centro de operaciones para proyectos de fibra óptica en Alemania y Europa.'
        : i18n.language === 'en'
        ? 'Operations center for fiber optic projects in Germany and Europe.'
        : 'Operationszentrum für Glasfaserprojekte in Deutschland und Europa.',
      flag: <FlagDE size={48} />,
      flagEmoji: '🇩🇪',
      timezone: 'CET (UTC+1)',
      phone: '+49 176 31524448',
      email: 'info@hmr-nexus.com',
      color: '#00d4ff',
      glowColor: 'rgba(0,212,255,0.25)',
      labelPos: { x: 516, y: 78 },
      countryPath: germanyPath,
      stats: [
        { value: '15+', label: i18n.language === 'es' ? 'km Fibra' : i18n.language === 'en' ? 'km Fiber' : 'km Glasfaser' },
        { value: '100%', label: i18n.language === 'es' ? 'Calidad' : i18n.language === 'en' ? 'Quality' : 'Qualität' },
      ],
    },
    {
      id: 'colombia',
      city: i18n.language === 'es' ? 'Colombia' : i18n.language === 'en' ? 'Colombia' : 'Kolumbien',
      role: i18n.language === 'es' ? 'Centro de Desarrollo' : i18n.language === 'en' ? 'Development Hub' : 'Entwicklungszentrum',
      description: i18n.language === 'es'
        ? 'Equipo de desarrollo de software y operaciones LATAM.'
        : i18n.language === 'en'
        ? 'Software development team and LATAM operations.'
        : 'Software-Entwicklungsteam und LATAM-Operationen.',
      flag: <FlagCO size={48} />,
      flagEmoji: '🇨🇴',
      timezone: 'COT (UTC-5)',
      phone: '+57 ...',
      email: 'latam@hmr-nexus.com',
      color: '#c084fc',
      glowColor: 'rgba(192,132,252,0.25)',
      labelPos: { x: 287, y: 258 },
      countryPath: colombiaPath,
      stats: [
        { value: '150+', label: i18n.language === 'es' ? 'Conexiones' : i18n.language === 'en' ? 'Connections' : 'Anschlüsse' },
        { value: '24/7', label: i18n.language === 'es' ? 'Soporte' : i18n.language === 'en' ? 'Support' : 'Support' },
      ],
    },
  ];

  /* Path that visually connects the two countries */
  const connectionPath = 'M 287,236 Q 420,140 516,100';

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d8bff] uppercase tracking-widest mb-3">
            <Plane className="w-4 h-4" />
            {i18n.language === 'es' ? 'Presencia Global' : i18n.language === 'en' ? 'Global Presence' : 'Globale Präsenz'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {i18n.language === 'es' ? 'Dos Países, ' : i18n.language === 'en' ? 'Two Countries, ' : 'Zwei Länder, '}
            <span className="text-[#3d8bff]">
              {i18n.language === 'es' ? 'Una Visión' : i18n.language === 'en' ? 'One Vision' : 'Eine Vision'}
            </span>
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            {i18n.language === 'es'
              ? 'Combinamos la precisión técnica alemana con la innovación colombiana.'
              : i18n.language === 'en'
              ? 'We combine German technical precision with Colombian innovation.'
              : 'Wir kombinieren deutsche technische Präzision mit kolumbianischer Innovation.'}
          </p>
        </MotionSection>

        {/* ── Map Container ─────────────────────────────────────────── */}
        <MotionSection className="relative max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#060e1a]">
            {/* World Map SVG background */}
            <WorldMapSVG className="absolute inset-0 w-full h-full" />

            {/* Country highlights + connection line overlay */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Glow filters for each country */}
                <filter id="glow-de" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feFlood floodColor="#00d4ff" floodOpacity="0.6" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-co" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feFlood floodColor="#c084fc" floodOpacity="0.6" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>

              {/* Germany country highlight */}
              <motion.path
                d={germanyPath}
                fill="rgba(0,212,255,0.3)"
                stroke="#00d4ff"
                strokeWidth="1.5"
                filter="url(#glow-de)"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ transformOrigin: '516px 100px' }}
                onMouseEnter={() => setActiveLocation('germany')}
                onMouseLeave={() => setActiveLocation(null)}
                className="cursor-pointer"
              />

              {/* Germany pulse ring */}
              <motion.circle
                cx="516" cy="100" r="20"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <animate attributeName="r" values="15;30;15" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </motion.circle>

              {/* Colombia country highlight */}
              <motion.path
                d={colombiaPath}
                fill="rgba(192,132,252,0.3)"
                stroke="#c084fc"
                strokeWidth="1.5"
                filter="url(#glow-co)"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                style={{ transformOrigin: '287px 236px' }}
                onMouseEnter={() => setActiveLocation('colombia')}
                onMouseLeave={() => setActiveLocation(null)}
                className="cursor-pointer"
              />

              {/* Colombia pulse ring */}
              <motion.circle
                cx="287" cy="236" r="20"
                fill="none"
                stroke="#c084fc"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                <animate attributeName="r" values="15;30;15" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </motion.circle>

              {/* Connection line */}
              <motion.path
                d={connectionPath}
                stroke="url(#line-gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' as const, delay: 0.3 }}
              />

              {/* Traveling dot */}
              <motion.circle
                r="4"
                fill="#3d8bff"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                whileInView={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.2, ease: 'easeInOut' as const }}
              >
                <animateMotion
                  dur="3s"
                  begin="1.2s"
                  repeatCount="indefinite"
                  path={connectionPath}
                  fill="freeze"
                />
              </motion.circle>

              {/* Labels for each country */}
              {locations.map((loc) => (
                <g key={`label-${loc.id}`}>
                  {/* Background pill */}
                  <rect
                    x={loc.labelPos.x - 48}
                    y={loc.labelPos.y - 12}
                    width="96"
                    height="28"
                    rx="14"
                    fill="rgba(0,0,0,0.7)"
                    stroke={loc.color}
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />
                  <text
                    x={loc.labelPos.x}
                    y={loc.labelPos.y + 1}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="Outfit, sans-serif"
                  >
                    {loc.city}
                  </text>
                  <text
                    x={loc.labelPos.x}
                    y={loc.labelPos.y + 12}
                    textAnchor="middle"
                    fill={loc.color}
                    fontSize="7"
                    fontWeight="500"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {loc.role}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* ── Info Cards ──────────────────────────────────────────── */}
          <motion.div
            className="grid md:grid-cols-2 gap-4 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {locations.map((location) => (
              <motion.div
                key={location.id}
                variants={cardEntrance}
                className={`
                  bg-white/[0.03] border rounded-xl p-6 transition-colors duration-200
                  ${activeLocation === location.id
                    ? location.id === 'germany' ? 'border-[#00d4ff]/30' : 'border-[#c084fc]/30'
                    : 'border-white/[0.08]'
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {location.id === 'germany' ? <FlagDE size={40} /> : <FlagCO size={40} />}
                  </div>
                  <div>
                    <h4 className="font-bold">{location.city}</h4>
                    <p className="text-sm" style={{ color: location.color }}>
                      {location.role}
                    </p>
                  </div>
                </div>

                <p className="text-[#94a3b8] text-sm mb-4">{location.description}</p>

                <div className="flex gap-3 mb-4">
                  {location.stats.map((stat, idx) => (
                    <div key={idx} className="bg-white/[0.03] rounded-lg px-3 py-2 flex-1">
                      <div className="font-bold" style={{ color: location.color }}>
                        {stat.value}
                      </div>
                      <div className="text-[#64748b] text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-[#64748b]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{location.timezone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{location.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MotionSection>
      </div>
    </section>
  );
}
