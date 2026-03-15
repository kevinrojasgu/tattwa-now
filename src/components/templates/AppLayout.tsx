import React from 'react';
/**
 * @file AppLayout.tsx
 * @description Main page layout template. Provides the consistent header,
 * max-width container, and footer shell. Follows the Template layer of
 * Atomic Design — it defines structure without owning content.
 */

import type { ReactNode } from 'react';

/** Props for AppLayout */
interface AppLayoutProps {
  /** Header slot — receives the branded title + controls row */
  header: ReactNode;
  /** Main content slot — stacked card sections */
  children: ReactNode;
  /** Footer slot — attribution text */
  footer: ReactNode;
  /** Fixed background tint overlay based on scroll position */
  backgroundOverlay?: ReactNode;
}

/**
 * Root page layout with a max-width container and fixed background overlay slot.
 *
 * @param header - Header content
 * @param children - Page body content
 * @param footer - Footer content
 * @param backgroundOverlay - Optional fixed background tint div
 */
export function AppLayout({ header, children, footer, backgroundOverlay }: AppLayoutProps): React.JSX.Element {
  return (
    <>
      {backgroundOverlay}
      <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {header}
          {children}
          {footer}
        </div>
      </div>
    </>
  );
}
