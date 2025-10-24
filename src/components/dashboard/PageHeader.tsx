/**
 * Page Header Component
 * Reusable header untuk semua dashboard pages
 */

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ icon: Icon, title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Icon className="w-8 h-8 text-teal-600" />
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 mt-2">
              {description}
            </p>
          )}
        </div>
        
        {action && (
          <div>{action}</div>
        )}
      </div>
    </div>
  );
}

