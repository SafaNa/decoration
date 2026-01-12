import React from 'react';

export default function MobileHeader() {
    return (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-[60] border-b border-slate-100 dark:border-white/5" style={{ transform: 'translateZ(0)', willChange: 'auto' }}>
            {/* Top Row: Logo and Brand */}
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-primary/15 rounded-lg">
                        <img src="/images/favicon.png" alt="Logo" className="size-6 object-contain" />
                    </div>
                    <h2 className="text-base font-bold leading-tight text-slate-900 dark:text-white font-display">RuangKreasi</h2>
                </div>

                {/* Cart Icon */}
                <button className="size-9 bg-transparent active:bg-slate-100 dark:active:bg-white/10 rounded-lg flex items-center justify-center relative transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white text-[22px]">shopping_bag</span>
                    <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border border-white dark:border-black"></div>
                </button>
            </div>

            {/* Bottom Row: Search Bar */}
            <div className="px-4 pb-2">
                <div className="w-full h-9 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center px-3 gap-2 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 dark:focus-within:bg-white/10">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
                    <input
                        type="text"
                        placeholder="Cari hadiah..."
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder-slate-400 text-slate-900 dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
}
