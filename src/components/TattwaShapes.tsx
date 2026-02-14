import type { TattwaName } from '../lib/tattwaData';

interface ShapeProps {
  size?: number;
  className?: string;
}

function AkashShape({ size = 64, className = '' }: ShapeProps) {
  // Ear-like / Ovoid shape
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <ellipse
        cx="32"
        cy="32"
        rx="18"
        ry="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.9"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="10"
        ry="16"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}

function VayuShape({ size = 64, className = '' }: ShapeProps) {
  // Sphere
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.9"
      />
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="currentColor"
        opacity="0.1"
      />
      {/* Wind lines */}
      <path
        d="M16 28 Q24 24 32 28 Q40 32 48 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M16 36 Q24 32 32 36 Q40 40 48 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}

function TejasShape({ size = 64, className = '' }: ShapeProps) {
  // Triangle (pointing up)
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <polygon
        points="32,6 58,56 6,56"
        fill="currentColor"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Flame accent */}
      <path
        d="M32 20 Q36 30 32 38 Q28 30 32 20"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

function PrithviShape({ size = 64, className = '' }: ShapeProps) {
  // Rhombus / Diamond
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <polygon
        points="32,4 60,32 32,60 4,32"
        fill="currentColor"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ApasShape({ size = 64, className = '' }: ShapeProps) {
  // Crescent Moon
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <path
        d="M38 8 A24 24 0 1 0 38 56 A18 18 0 1 1 38 8Z"
        fill="currentColor"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

const SHAPE_MAP: Record<TattwaName, React.FC<ShapeProps>> = {
  Akash: AkashShape,
  Vayu: VayuShape,
  Tejas: TejasShape,
  Prithvi: PrithviShape,
  Apas: ApasShape,
};

interface TattwaShapeProps extends ShapeProps {
  tattwa: TattwaName;
}

export function TattwaShape({ tattwa, ...props }: TattwaShapeProps) {
  const ShapeComponent = SHAPE_MAP[tattwa];
  return <ShapeComponent {...props} />;
}
