/**
 * Stats Grid Component
 * Grid untuk menampilkan stats cards dengan responsive layout
 */

import { ReactNode } from 'react';

interface StatsGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ children, columns = 4 }: StatsGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 mb-8`}>
      {children}
    </div>
  );
}

