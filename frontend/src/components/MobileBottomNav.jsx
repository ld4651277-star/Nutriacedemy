import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MobileBottomNav() {
  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Learn', path: '/learn', icon: 'menu_book' },
    { name: 'Exams', path: '/exams', icon: 'quiz' },
    { name: 'Tools', path: '/tools', icon: 'calculate' },
    { name: 'Profile', path: '/dashboard', icon: 'person' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 pb-safe bg-surface dark:bg-inverse-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl border-t border-outline-variant/30">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-3 py-1 scale-95 duration-200 transition-all font-semibold'
              : 'flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full px-3 py-1 transition-colors'
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-[20px] mb-0.5"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-label-sm">{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
