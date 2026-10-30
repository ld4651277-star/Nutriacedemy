import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function SidebarNav({ activeItem = 'dashboard' }) {
  const sidebarLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', id: 'dashboard' },
    { name: 'My Courses', path: '/learn', icon: 'school', id: 'courses' },
    { name: 'Mock Tests', path: '/exams', icon: 'quiz', id: 'exams' },
    { name: 'Saved Resources', path: '/library', icon: 'bookmark', id: 'library' },
    { name: 'Calculators', path: '/tools', icon: 'calculate', id: 'tools' },
  ];

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container p-md gap-lg border-r border-outline-variant z-40 overflow-y-auto custom-scrollbar">
      {/* Brand */}
      <div className="flex items-center gap-sm px-4 pt-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">spa</span>
          <span className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary">
            NutriAcademy
          </span>
        </Link>
      </div>

      {/* Student Welcome Profile */}
      <div className="flex items-center gap-sm px-4 py-2 bg-surface-container-lowest dark:bg-inverse-surface rounded-xl border border-outline-variant/30 shadow-sm">
        <img
          alt="Student Portrait"
          className="w-10 h-10 rounded-full object-cover border-2 border-primary shrink-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaUJ7CF3dTAx7c3WSx2F0kvAeJ2uLyDc1uV90IKTAjkr5FSV8a_I-a8_2maQWlMKbbTrOoPoZw2Wf4y0zOmKpIXv4KBID6BTSIaJDdPbJI39xveiDTlhfdypX3-gz5g3jbThYDUf21BTQ7LcyWcinqV4XWh9gFp1WNS8S880aws3l3084DSXDQuoINzz5i-M9AQnCjTn3WAuN513-hOeRhd9pzVD07YwI-D0xJgnXXWv39EN3NfN3k"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-label-md font-label-md font-bold text-on-surface truncate">
            Welcome back
          </span>
          <span className="text-label-sm font-label-sm text-on-surface-variant truncate">
            Future Nutritionist
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {sidebarLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold bg-surface-variant group transition-all translate-x-1 shadow-sm'
                : 'flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-all group'
            }
          >
            <span className="material-symbols-outlined text-inherit group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="text-label-md font-label-md">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-auto px-2 pb-4">
        <Link
          to="/learn"
          className="w-full bg-tertiary-container text-on-tertiary-container font-label-md text-label-md py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow font-bold flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Join Course
        </Link>
      </div>
    </aside>
  );
}
