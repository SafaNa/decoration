import React, { useState, useEffect } from 'react';
import websiteSettingService from '../../services/website-setting.service';

export default function Footer() {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await websiteSettingService.getAll();
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="w-full py-12 px-4 md:px-10 border-t border-slate-200 dark:border-white/10 bg-background-light dark:bg-background-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-8">
                {/* Brand & Address */}
                <div className="flex flex-col items-center md:items-start gap-4 max-w-sm text-center md:text-left">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-slate-900 dark:text-white">
                            <span className="material-symbols-outlined text-primary">school</span>
                            <span className="font-bold text-lg font-display">RuangKreasi</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Create timeless memories with custom gifts crafted for perfection.
                            From graduation to weddings, we turn your special moments into lasting treasures.
                        </p>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400 mt-2">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="material-symbols-outlined text-xs text-primary">schedule</span>
                            <span>Mon - Sat: 08:00 - 17:00</span>
                        </div>
                        {settings.address && (
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                                <p>{settings.address}</p>
                            </div>
                        )}
                        {settings.phone && (
                            <a href={`https://wa.me/${settings.phone}`} target="_blank" className="flex items-center gap-2 justify-center md:justify-start hover:text-primary transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-xs text-primary">chat</span>
                                <span>WhatsApp Us</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h4 className="font-bold text-slate-900 dark:text-white">Informasi</h4>
                    <div className="flex flex-col items-center md:items-start gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors" href="#">Shipping Info</a>
                        <a className="hover:text-primary transition-colors" href="#">Returns</a>
                    </div>
                </div>

                {/* Socials */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h4 className="font-bold text-slate-900 dark:text-white">Ikuti Kami</h4>
                    <div className="flex gap-4">
                        {/* Facebook */}
                        {settings.facebook && (
                            <a
                                href={settings.facebook}
                                target="_blank"
                                rel="noreferrer"
                                className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white transition-colors text-slate-600 dark:text-slate-400"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                        )}

                        {/* Twitter/X */}
                        {settings.twitter && (
                            <a
                                href={settings.twitter}
                                target="_blank"
                                rel="noreferrer"
                                className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white transition-colors text-slate-600 dark:text-slate-400"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        )}

                        {/* TikTok */}
                        {settings.tiktok && (
                            <a
                                href={settings.tiktok}
                                target="_blank"
                                rel="noreferrer"
                                className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white transition-colors text-slate-600 dark:text-slate-400"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                </svg>
                            </a>
                        )}

                        {settings.instagram && (
                            <a
                                href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white transition-colors text-slate-600 dark:text-slate-400"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08v.001zm0-2c-2.709 0-3.04.01-4.09.058-1.08.048-1.815.218-2.5.485a6.906 6.906 0 00-2.5 1.625 6.906 6.906 0 00-1.625 2.5c-.267.685-.437 1.42-.485 2.5-.048 1.05-.058 1.38-.058 4.09v.09c0 2.709.01 3.04.058 4.09.048 1.08.218 1.815.485 2.5a6.906 6.906 0 001.625 2.5 6.906 6.906 0 002.5 1.625c.685.267 1.42.437 2.5.485 1.05.048 1.38.058 4.09.058h.09c2.709 0 3.04-.01 4.09-.058 1.08-.048 1.815-.218 2.5-.485a6.906 6.906 0 002.5-1.625 6.906 6.906 0 001.625-2.5c.267-.685.437-1.42.485-2.5.048-1.05.058-1.38.058-4.09v-.09c0-2.709-.01-3.04-.058-4.09-.048-1.08-.218-1.815-.485-2.5a6.906 6.906 0 00-1.625-2.5 6.906 6.906 0 00-2.5-1.625c-.685-.267-1.42-.437-2.5-.485-1.05-.048-1.38-.058-4.09-.058h-.09zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" /></svg>
                            </a>
                        )}
                        {/* Example empty social for balance if needed, or remove */}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <p>© {new Date().getFullYear()} RuangKreasi Inc. All rights reserved.</p>
                <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
                    <span className="font-bold border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded">BCA</span>
                    <span className="font-bold border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded">MANDIRI</span>
                    <span className="font-bold border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded">JNE</span>
                    <span className="font-bold border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded">J&T</span>
                </div>
            </div>
        </footer>
    );
}
