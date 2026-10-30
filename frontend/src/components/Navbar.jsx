import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/library?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Learn', path: '/learn' },
    { name: 'Exams', path: '/exams' },
    { name: 'Library', path: '/library' },
    { name: 'Career', path: '/careers' },
    { name: 'Tools', path: '/tools' },
    { name: 'Diet Plan', path: '/diet-planner' },
    { name: 'Cases', path: '/case-studies' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-white/80 backdrop-blur-md shadow-sm bg-surface-container-lowest dark:bg-inverse-surface border-b border-outline-variant/20">
      {/* Brand */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary text-2xl group-hover:rotate-12 transition-transform">
            spa
          </span>
          <span className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary tracking-tight">
            NutriAcademy
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1 text-label-md font-label-md scale-95 duration-150'
                : 'text-on-surface-variant dark:text-surface-variant text-label-md font-label-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors pb-1'
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Right Actions: Search, CTA, Avatar */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[20px]">
            search
          </span>
          <input
            className="bg-transparent border-none focus:outline-none text-body-md font-body-md w-36 lg:w-44 text-on-surface placeholder:text-on-surface-variant"
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* CTA Button */}
        <Link
          to="/dashboard"
          className="bg-primary text-on-primary px-4 md:px-6 py-2 rounded-lg text-label-md font-label-md font-medium hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),0_4px_6px_-2px_rgba(0,0,0,0.02)] hover:bg-surface-tint transition-all active:scale-95 duration-150 whitespace-nowrap"
        >
          Get Started
        </Link>

        {/* Profile Avatar */}
        <Link
          to="/dashboard"
          title="Student Dashboard"
          className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant hover:ring-2 ring-primary transition-all shrink-0"
        >
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLWh0bwiihwmln6FIj03IEsfi3uKHhGMce1dqIqxSLCZ3UL8TeFcioOj0OW5Qag7zQF-SVOlrOsLBNftFenP_IPoqASfYdiB-vAp0SQbxatbuFwadu0ygFIoMyabuoHdL1nUNN4V9wST3_GedyaVoWa7IwZpwXyWgpt33h_qip6gtt-EwChnyd2BPfz2a2dAXH4beD_s7cbj2SU1oIQ_xVIP9HY67Z-VvIhBx39fKuHA5408_0Sdm6"
          />
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
          aria-label="Toggle Mobile Menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-inverse-surface border-b border-outline-variant shadow-xl p-4 flex flex-col gap-2 z-50 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant mb-2">
            <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[20px]">
              search
            </span>
            <input
              className="bg-transparent border-none focus:outline-none text-body-md font-body-md w-full text-on-surface placeholder:text-on-surface-variant"
              placeholder="Search platform..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary-container/20 text-primary font-bold text-label-md'
                  : 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-label-md font-medium'
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="border-t border-outline-variant/50 pt-2 mt-1 flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-label-md"
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              Dashboard Overview
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-label-md"
            >
              <span className="material-symbols-outlined text-sm">info</span>
              About & Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
