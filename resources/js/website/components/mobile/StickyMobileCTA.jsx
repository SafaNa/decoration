import React, { useState, useEffect } from 'react';
import websiteSettingService from '../../../services/website-setting.service';

export default function StickyMobileCTA() {
    const [scrolled, setScrolled] = useState(false);
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 300);
        };

        const fetchSettings = async () => {
            try {
                const settings = await websiteSettingService.getAll();
                if (settings && settings.phone) {
                    setPhone(settings.phone);
                }
            } catch (error) {
                // ignore
            }
        };

        window.addEventListener('scroll', handleScroll);
        fetchSettings();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!scrolled) return null;

    const whatsappUrl = phone
        ? `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Halo%20RuangKreasi,%20saya%20mau%20custom%20order.`
        : '/contact';

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 md:hidden flex justify-center pb-6">
            <a
                href={whatsappUrl}
                target={phone ? "_blank" : "_self"}
                rel="noreferrer"
                className="w-full max-w-xs bg-green-500 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 animate-bounce"
            >
                <span className="material-symbols-outlined">chat</span>
                Chat WhatsApp
            </a>
        </div>
    );
}
