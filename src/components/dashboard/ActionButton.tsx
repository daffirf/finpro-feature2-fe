/**
 * Action Button Component
 * Reusable button dengan consistent styling
 */

import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function ActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ActionButtonProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg',
    secondary: 'bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50'
  };

  return (
    <button
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

