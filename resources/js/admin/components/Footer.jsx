import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto py-6 px-8 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500 text-center md:text-left">
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-primary">Dekorasi</span>. Hak cipta dilindungi.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                    <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
                    <a href="#" className="hover:text-primary transition-colors">Syarat Layanan</a>
                    <span>v1.0.0</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
