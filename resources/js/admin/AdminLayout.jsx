import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Force light mode for admin
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'pastel');

        // Check for token
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    return (
        <div
            className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-[#1b0e14] dark:text-[#f3e8ed] transition-colors duration-300"
            style={{
                '--font-display': '"Inter", sans-serif',
                '--font-body': '"Inter", sans-serif',
                '--radius-card': '0.75rem',
            }}
        >
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <Header setIsSidebarOpen={setIsSidebarOpen} />
                <div className="flex-1 overflow-y-auto pt-4 px-4 scroll-smooth flex flex-col">
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
