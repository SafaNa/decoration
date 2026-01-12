import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function Header({ setIsSidebarOpen }) {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState({
        name: 'Admin',
        email: 'admin@dekorasi.com',
        role: 'Administrator'
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }

        const fetchUser = async () => {
            try {
                const userData = await authService.getUser();
                if (userData) {
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                }
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        };
        fetchUser();
    }, []);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/admin/login');
        } catch (error) {
            console.error("Logout failed", error);
            // Fallback redirect even if API fails
            navigate('/admin/login');
        }
    };
    return (
        <header className="h-20 px-6 py-3 flex items-center justify-between bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-10 sticky top-0 font-display">
            <div className="flex items-center gap-4 lg:hidden">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Dashboard</h2>
            </div>
            <div className="hidden lg:flex flex-col">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Ringkasan</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Selamat datang kembali, {user.name.split(' ')[0]}</p>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5 w-72 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 group shadow-none ring-0 outline-none border-none">
                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">search</span>
                    <input className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400 ml-2 shadow-none ring-0 p-0" placeholder="Ketik untuk mencari..." type="text" />
                </div>
                {/* Notifications */}
                <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                {/* Profile */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-2 lg:border-l border-slate-200 dark:border-slate-700 focus:outline-none"
                    >
                        <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center ring-2 ring-white dark:ring-slate-700 cursor-pointer hover:ring-primary transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjIhknnmDUYqv1HwmIgaof2t9_AkByEbHw2BJCfXmj-ZjI7UwF8NLW2LH4RsH4c-q7wAlywsuduviG-9YF6YEPQsIK-l4pPdLc4S0ZwjuhJQlhCpGJEumnHgziadbWrmfrEAELY1BIsAphsEun9UE852XaL1UThtYKNSzBNCNnMvEAtG3VPwnpNr2RlqIRAYwH_z-a5qgXtl06SM3MyMAe1N6HosCrr3wRJWQkWtmImjAL_JvgUR_JQB-yS88F-IT9DKDs0nRd6-I')" }}></div>
                        <div className="hidden md:flex flex-col items-start">
                            <span className="text-sm font-bold text-slate-800 dark:text-white leading-none text-left">{user.name}</span>
                            <span className="text-xs text-slate-500 mt-1">{user.role || 'Administrator'}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">expand_more</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A2633] rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 animation-fade-in-up">
                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 md:hidden">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                            <Link
                                to="/admin/change-password"
                                onClick={() => setIsProfileOpen(false)}
                                className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Ganti Kata Sandi
                            </Link>
                            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                                Keluar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
