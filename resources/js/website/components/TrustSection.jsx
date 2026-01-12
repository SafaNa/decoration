import React from 'react';

export default function TrustSection() {
    return (
        <section className="py-8 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 text-center md:text-left">

                    {/* Stat 1 */}
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-yellow-500">
                            <span className="material-symbols-outlined">star</span>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">4.9 / 5.0</p>
                            <p className="text-sm text-slate-500">from 500+ happy customers</p>
                        </div>
                    </div>

                    {/* Divider for mobile/tablet */}
                    <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-white/10"></div>

                    {/* Stat 2 */}
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-primary">
                            <span className="material-symbols-outlined">package_2</span>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">1,000+ Products</p>
                            <p className="text-sm text-slate-500">Delivered safely across Indonesia</p>
                        </div>
                    </div>

                    {/* Divider for mobile/tablet */}
                    <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-white/10"></div>

                    {/* Stat 3 */}
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-green-500">
                            <span className="material-symbols-outlined">verified_user</span>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">Satisfaction</p>
                            <p className="text-sm text-slate-500">Free revision & quality check</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
