/**
 * Content Card Component
 * Reusable card dengan header untuk content sections
 */

import { ReactNode } from 'react';

interface ContentCardProps {
  title?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
}

export function ContentCard({ title, headerAction, children, noPadding = false }: ContentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {(title || headerAction) && (
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {headerAction}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
}

