import React from 'react';
/**
 * @file Button.tsx
 * @description Reusable button atom with variant support. Follows the app's
 * dark glass aesthetic with hover transitions.
 */

import type { ButtonHTMLAttributes } from 'react';

/** Visual variant of the button */
type ButtonVariant = 'default' | 'ghost' | 'active' | 'now';

/** Props for the Button atom */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default:
    'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10 hover:border-white/20',
  ghost:
    'text-white/50 hover:text-white/80',
  active:
    'bg-white/15 text-white/90 border border-white/20',
  now:
    'now-button',
};

/**
 * Reusable button with dark glass aesthetic.
 *
 * @param variant - Visual style: 'default' | 'ghost' | 'active' | 'now'
 * @param className - Additional Tailwind classes
 * @param children - Button content
 */
export function Button({
  variant = 'default',
  className = '',
  children,
  ...rest
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
