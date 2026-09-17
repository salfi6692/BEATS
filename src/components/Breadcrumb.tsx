/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigateHome: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigateHome }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-400 font-medium mb-3">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          {item.onClick && !item.active ? (
            <button
              onClick={item.onClick}
              className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-amber-400 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
