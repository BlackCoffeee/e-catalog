/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'accent' | 'outline';
}) {
  const variants = {
    default: 'bg-muted text-foreground border-border',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-[#062D24] dark:text-emerald-300 dark:border-[#047857]',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-[#2E1E05] dark:text-amber-300 dark:border-[#78350F]',
    info: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-[#082F49] dark:text-sky-300 dark:border-[#0369A1]',
    accent: 'bg-accent/15 text-accent border-accent/30',
    outline: 'bg-transparent text-foreground border-border',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
