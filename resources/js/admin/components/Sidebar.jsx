import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function Sidebar({ isOpen, setIsOpen }) {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const getLinkClass = (path) => {
        const active = isActive(path);
        const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group";
        const activeClass = "bg-primary/10 text-primary dark:text-primary-dark font-semibold";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white font-medium";

        return `${baseClass} ${active ? activeClass : inactiveClass}`;
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/admin/login');
        } catch (error) {
            console.error("Logout failed", error);
            navigate('/admin/login');
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 
                    w-64 flex-col bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-700 h-full transition-transform duration-300 font-display
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Brand */}
                <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="p-1 bg-primary/15 rounded-lg">
                        <img src="/images/favicon.png" alt="Logo" className="size-8 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Panel Admin</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Manajemen Kreasi</p>
                    </div>
                </div>
                {/* Navigation */}
                <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                    <Link className={getLinkClass('/admin')} to="/admin">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm">Dashboard</span>
                    </Link>
                    <Link className={getLinkClass('/admin/categories')} to="/admin/categories">
                        <span className="material-symbols-outlined">category</span>
                        <span className="text-sm">Kategori Produk</span>
                    </Link>
                    <Link className={getLinkClass('/admin/products')} to="/admin/products">
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span className="text-sm">Produk</span>
                    </Link>
                    <Link className={getLinkClass('/admin/gallery-categories')} to="/admin/gallery-categories">
                        <span className="material-symbols-outlined">perm_media</span>
                        <span className="text-sm">Kategori Galeri</span>
                    </Link>
                    <Link className={getLinkClass('/admin/gallery')} to="/admin/gallery">
                        <span className="material-symbols-outlined">collections</span>
                        <span className="text-sm">Galeri</span>
                    </Link>
                    <Link className={getLinkClass('/admin/banners')} to="/admin/banners">
                        <span className="material-symbols-outlined">view_carousel</span>
                        <span className="text-sm">Banners</span>
                    </Link>
                    <Link className={getLinkClass('/admin/testimonials')} to="/admin/testimonials">
                        <span className="material-symbols-outlined">rate_review</span>
                        <span className="text-sm">Testimoni</span>
                    </Link>
                    <Link className={getLinkClass('/admin/settings')} to="/admin/settings">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm">Pengaturan</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
