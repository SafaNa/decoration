import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileBottomNav() {
    const { pathname } = useLocation();

    const isActive = (path) => pathname === path;

    const navItems = [
        { icon: 'home', label: 'Home', path: '/' },
        { icon: 'grid_view', label: 'Catalog', path: '/catalog' },
        { icon: 'favorite', label: 'Wishlist', path: '#' }, // Placeholder
        { icon: 'person', label: 'Profile', path: '/login' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 h-16 z-50 flex justify-around items-center px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]" style={{ transform: 'translateZ(0)', willChange: 'auto' }}>
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    to={item.path}
                    className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 ${isActive(item.path) ? 'text-primary' : 'text-slate-400'}`}
                >
                    <span className={`material-symbols-outlined text-[24px] ${isActive(item.path) ? 'filled' : ''}`}>{item.icon}</span>
                    <span className={`text-[10px] font-medium ${isActive(item.path) ? 'font-bold' : ''}`}>{item.label}</span>
                </Link>
            ))}
        </div>
    );
}
