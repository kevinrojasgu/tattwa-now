import React from 'react';
/**
 * @file TattwaShape.tsx
 * @description SVG geometric shape renderer molecule. Each Tattwa has a
 * traditional geometric symbol — ovoid, sphere, triangle, rhombus, crescent.
 */

import type { TattwaName } from '../../types';

/** Props for individual shape components */
interface ShapeProps {
  /** Pixel size (width and height) */
  size?: number;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Akash shape — ear-like ovoid representing infinite void.
 */
function AkashShape({ size = 64, className = '' }: ShapeProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <ellipse cx="32" cy="32" rx="18" ry="26" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
      <ellipse cx="32" cy="32" rx="10" ry="16" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

/**
 * Vayu shape — sphere representing air and movement.
 */
function VayuShape({ size = 64, className = '' }: ShapeProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1" />
      <path d="M16 28 Q24 24 32 28 Q40 32 48 28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M16 36 Q24 32 32 36 Q40 40 48 36" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

/**
 * Tejas shape — upward-pointing triangle representing fire.
 */
function TejasShape({ size = 64, className = '' }: ShapeProps): React.JSX.Element {
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
      <path d="M32 20 Q36 30 32 38 Q28 30 32 20" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/**
 * Prithvi shape — rhombus/diamond representing solid earth.
 */
function PrithviShape({ size = 64, className = '' }: ShapeProps): React.JSX.Element {
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

/**
 * Apas shape — crescent moon representing water.
 */
function ApasShape({ size = 64, className = '' }: ShapeProps): React.JSX.Element {
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

const SHAPE_MAP: Record<TattwaName, (props: ShapeProps) => React.JSX.Element> = {
  Akash: AkashShape,
  Vayu: VayuShape,
  Tejas: TejasShape,
  Prithvi: PrithviShape,
  Apas: ApasShape,
};

/** Props for the TattwaShape molecule */
interface TattwaShapeProps extends ShapeProps {
  /** Which Tattwa's shape to render */
  tattwa: TattwaName;
}

/**
 * Renders the traditional geometric symbol for a given Tattwa.
 *
 * @param tattwa - Which Tattwa's shape to render
 * @param size - Pixel size
 * @param className - Additional CSS classes
 */
export function TattwaShape({ tattwa, ...props }: TattwaShapeProps): React.JSX.Element {
  const ShapeComponent = SHAPE_MAP[tattwa];
  return <ShapeComponent {...props} />;
}
