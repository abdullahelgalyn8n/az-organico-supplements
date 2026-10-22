import React from 'react';
import { Product } from '../data/catalog';

interface ProductVisualProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

const COLOR_MAP: Record<
  Product['labelColor'],
  { primary: string; secondary: string; badgeBg: string; accent: string }
> = {
  purple: {
    primary: '#6B21A8',
    secondary: '#9333EA',
    badgeBg: '#FAF5FF',
    accent: '#4C1D95',
  },
  red: {
    primary: '#B91C1C',
    secondary: '#DC2626',
    badgeBg: '#FEF2F2',
    accent: '#7F1D1D',
  },
  green: {
    primary: '#15803D',
    secondary: '#16A34A',
    badgeBg: '#F0FDF4',
    accent: '#14532D',
  },
  teal: {
    primary: '#0F766E',
    secondary: '#136F63',
    badgeBg: '#F0FDFA',
    accent: '#134E4A',
  },
  orange: {
    primary: '#C2410C',
    secondary: '#EA580C',
    badgeBg: '#FFF7ED',
    accent: '#7C2D12',
  },
  blue: {
    primary: '#1D4ED8',
    secondary: '#2563EB',
    badgeBg: '#EFF6FF',
    accent: '#1E3A8A',
  },
  slate: {
    primary: '#334155',
    secondary: '#475569',
    badgeBg: '#F8FAFC',
    accent: '#0F172A',
  },
  amber: {
    primary: '#B45309',
    secondary: '#D97706',
    badgeBg: '#FFFBEB',
    accent: '#78350F',
  },
  emerald: {
    primary: '#047857',
    secondary: '#059669',
    badgeBg: '#ECFDF5',
    accent: '#064E3B',
  },
};

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  size = 'md',
}) => {
  const palette = COLOR_MAP[product.labelColor] || COLOR_MAP.teal;
  const dims =
    size === 'sm'
      ? 'w-14 h-16'
      : size === 'lg'
      ? 'w-64 h-80'
      : 'w-44 h-56';

  // Render tailored packaging depending on category
  if (product.category === 'oils') {
    return (
      <div className={`relative flex items-center justify-center ${dims} select-none`}>
        <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-md" role="img" aria-label={product.name}>
          <defs>
            <linearGradient id={`oil-glass-${product.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#143318" />
              <stop offset="35%" stopColor="#264E2C" />
              <stop offset="70%" stopColor="#19381E" />
              <stop offset="100%" stopColor="#0C1F10" />
            </linearGradient>
            <linearGradient id={`oil-cap-${product.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="100" cy="246" rx="54" ry="8" fill="rgba(15,23,42,0.14)" />
          {/* Bottle Cap */}
          <rect x="84" y="16" width="32" height="24" rx="4" fill={`url(#oil-cap-${product.id})`} />
          {/* Neck */}
          <path d="M86 40 L114 40 L118 75 L82 75 Z" fill={`url(#oil-glass-${product.id})`} />
          {/* Bottle Body */}
          <rect x="52" y="72" width="96" height="170" rx="22" fill={`url(#oil-glass-${product.id})`} />
          {/* Bottle Highlight */}
          <rect x="60" y="80" width="8" height="150" rx="4" fill="rgba(255,255,255,0.14)" />
          {/* Label */}
          <rect x="56" y="102" width="88" height="114" rx="8" fill="#FAF8F5" stroke="#D97706" strokeWidth="1.5" />
          {/* Organico Brand Header */}
          <text x="100" y="122" textAnchor="middle" fill="#136F63" fontSize="13" fontWeight="800" fontFamily="sans-serif">
            Organico
          </text>
          <rect x="64" y="129" width="72" height="18" rx="4" fill={palette.primary} />
          <text x="100" y="141" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700">
            {product.englishName.slice(0, 18)}
          </text>
          <text x="100" y="162" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="700">
            {product.name.split(' ').slice(0, 3).join(' ')}
          </text>
          <text x="100" y="177" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="600">
            معصور على البارد 100%
          </text>
          <rect x="75" y="190" width="50" height="16" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1" />
          <text x="100" y="201" textAnchor="middle" fill="#047857" fontSize="8.5" fontWeight="800">
            {product.dosage}
          </text>
        </svg>
      </div>
    );
  }

  if (product.category === 'honey') {
    return (
      <div className={`relative flex items-center justify-center ${dims} select-none`}>
        <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-md" role="img" aria-label={product.name}>
          <defs>
            <linearGradient id={`honey-jar-${product.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="45%" stopColor="#D97706" />
              <stop offset="85%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="244" rx="64" ry="9" fill="rgba(15,23,42,0.14)" />
          {/* Gold Lid */}
          <rect x="54" y="38" width="92" height="22" rx="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Honey Jar Body */}
          <rect x="44" y="58" width="112" height="180" rx="28" fill={`url(#honey-jar-${product.id})`} />
          {/* Gloss reflection */}
          <path d="M56 72 Q62 145 56 220" stroke="rgba(255,255,255,0.28)" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Center Luxury Label */}
          <rect x="52" y="92" width="96" height="116" rx="10" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
          <text x="100" y="114" textAnchor="middle" fill="#136F63" fontSize="14" fontWeight="800">
            Organico
          </text>
          <rect x="60" y="122" width="80" height="20" rx="4" fill={palette.primary} />
          <text x="100" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700">
            {product.englishName.slice(0, 18)}
          </text>
          <text x="100" y="156" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="800">
            {product.name.split(' ').slice(0, 3).join(' ')}
          </text>
          <text x="100" y="172" textAnchor="middle" fill="#78350F" fontSize="8" fontWeight="700">
            عسل نحل طبيعي خام 100%
          </text>
          <text x="100" y="194" textAnchor="middle" fill="#B45309" fontSize="9.5" fontWeight="800">
            {product.dosage}
          </text>
        </svg>
      </div>
    );
  }

  if (product.category === 'seeds') {
    return (
      <div className={`relative flex items-center justify-center ${dims} select-none`}>
        <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-md" role="img" aria-label={product.name}>
          <defs>
            <linearGradient id={`pouch-${product.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5F0E6" />
              <stop offset="60%" stopColor="#E6DCC8" />
              <stop offset="100%" stopColor="#D5C7AD" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="245" rx="66" ry="8" fill="rgba(15,23,42,0.14)" />
          {/* Stand-up Organic Pouch */}
          <path d="M44 34 L156 34 L164 236 Q100 244 36 236 Z" fill={`url(#pouch-${product.id})`} stroke="#C7B698" strokeWidth="1.5" />
          {/* Zip seal line */}
          <line x1="48" y1="48" x2="152" y2="48" stroke="#A69475" strokeWidth="2" strokeDasharray="4 2" />
          {/* Pouch Label */}
          <rect x="54" y="68" width="92" height="142" rx="10" fill="#FFFFFF" stroke={palette.primary} strokeWidth="1.5" />
          <text x="100" y="92" textAnchor="middle" fill="#136F63" fontSize="14" fontWeight="800">
            Organico
          </text>
          <rect x="62" y="102" width="76" height="20" rx="5" fill={palette.primary} />
          <text x="100" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700">
            {product.englishName.slice(0, 18)}
          </text>
          <text x="100" y="138" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="800">
            {product.name.split(' ').slice(0, 3).join(' ')}
          </text>
          <text x="100" y="154" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="600">
            محصول عضوي منقى 100%
          </text>
          {/* Seed preview window */}
          <ellipse cx="100" cy="184" rx="28" ry="14" fill="#334155" stroke="#CBD5E1" strokeWidth="2" />
          <text x="100" y="187" textAnchor="middle" fill="#F8FAFC" fontSize="8.5" fontWeight="800">
            {product.dosage}
          </text>
        </svg>
      </div>
    );
  }

  // Default: Organico Supplement / Vitamin White Cylindrical Bottle matching the exact reference photos
  return (
    <div className={`relative flex items-center justify-center ${dims} select-none`}>
      <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-md" role="img" aria-label={product.name}>
        <defs>
          <linearGradient id={`bottle-body-${product.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="22%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id={`label-grad-${product.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.primary} />
            <stop offset="100%" stopColor={palette.secondary} />
          </linearGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx="100" cy="246" rx="58" ry="8" fill="rgba(15,23,42,0.13)" />

        {/* Ribbed White Bottle Cap */}
        <rect x="62" y="16" width="76" height="30" rx="6" fill={`url(#bottle-body-${product.id})`} stroke="#CBD5E1" strokeWidth="1" />
        <line x1="72" y1="18" x2="72" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="82" y1="18" x2="82" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="92" y1="18" x2="92" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="102" y1="18" x2="102" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="112" y1="18" x2="112" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="122" y1="18" x2="122" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="130" y1="18" x2="130" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* Bottle Neck & Shoulders */}
        <path
          d="M68 46 L132 46 C146 58 156 68 156 84 L156 226 C156 237 146 244 132 244 L68 244 C54 244 44 237 44 226 L44 84 C44 68 54 58 68 46 Z"
          fill={`url(#bottle-body-${product.id})`}
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        {/* Main Wrap Label */}
        <rect x="45" y="78" width="110" height="148" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

        {/* Top Colored Brand Banner */}
        <path d="M45 78 L155 78 L155 130 Q100 142 45 130 Z" fill={`url(#label-grad-${product.id})`} />

        {/* Organico Logo Pill inside Label */}
        <rect x="64" y="84" width="72" height="20" rx="10" fill="#FFFFFF" />
        <text x="100" y="98" textAnchor="middle" fill="#15803D" fontSize="11.5" fontWeight="800" fontStyle="italic" fontFamily="Cairo, sans-serif">
          Organico
        </text>

        {/* English Product Name */}
        <text x="100" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="800" fontFamily="Cairo, sans-serif">
          {product.englishName}
        </text>

        {/* Arabic Title & Form */}
        <text x="100" y="153" textAnchor="middle" fill={palette.accent} fontSize="9.5" fontWeight="800" fontFamily="Cairo, sans-serif">
          {product.name.split(' ').slice(0, 3).join(' ')}
        </text>
        <text x="100" y="168" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700" fontFamily="Cairo, sans-serif">
          {product.countText}
        </text>

        {/* Dosage Highlight Box */}
        <rect x="62" y="177" width="76" height="18" rx="9" fill={palette.badgeBg} stroke={palette.primary} strokeWidth="1" />
        <text x="100" y="189" textAnchor="middle" fill={palette.primary} fontSize="8.5" fontWeight="800" fontFamily="Cairo, sans-serif">
          {product.dosage}
        </text>

        {/* Bottom Dietary Supplement Bar */}
        <rect x="45" y="206" width="110" height="20" fill="#1E293B" />
        <text x="70" y="219" textAnchor="middle" fill="#F8FAFC" fontSize="6" fontWeight="700" fontFamily="sans-serif">
          DIETARY
        </text>
        <circle cx="100" cy="215" r="9" fill={palette.secondary} stroke="#FFFFFF" strokeWidth="1.2" />
        <text x="100" y="218" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">
          60
        </text>
        <text x="131" y="219" textAnchor="middle" fill="#F8FAFC" fontSize="6" fontWeight="700" fontFamily="sans-serif">
          SUPPLEMENT
        </text>
      </svg>
    </div>
  );
};
