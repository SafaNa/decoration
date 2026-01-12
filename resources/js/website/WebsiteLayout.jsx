import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import MobileHeader from './components/mobile/MobileHeader';
import websiteSettingService from '../services/website-setting.service';
import StickyMobileCTA from './components/mobile/StickyMobileCTA';

export default function WebsiteLayout() {
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await websiteSettingService.getAll();
                if (settings && settings.theme) {
                    document.documentElement.setAttribute('data-theme', settings.theme);
                }
            } catch (error) {
                console.error("Failed to fetch website settings", error);
            }
        };

        fetchSettings();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            {/* Desktop Navbar (Hidden on Mobile) */}
            <div className="hidden md:block">
                <Navbar />
            </div>

            {/* Mobile Header (Visible on Mobile) */}
            <MobileHeader />

            <main className="flex-grow pt-24 md:pt-16 pb-20 md:pb-0">
                <Outlet />
            </main>

            <Footer />

            {/* Mobile Bottom Nav */}
            <MobileBottomNav />
            {/* Keep StickyCTA if you want it on top or specific pages, checking overlap */}
            {/* <StickyMobileCTA /> -- MobileBottomNav likely replaces this for Home, but StickyCTA might be useful for Product Detail. For now, let's comment it out to match "App Like" home screen exactly. */}
        </div>
    );
}
