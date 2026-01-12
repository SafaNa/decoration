import React from 'react';

export default function Newsletter() {
    return (
        <section className="w-full py-24 px-4 md:px-10 relative overflow-hidden">
            {/* Abstract Background pattern */}
            <div className="absolute -top-[20%] -right-[10%] size-[500px] bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-[20%] -left-[10%] size-[400px] bg-purple-500/5 rounded-full blur-3xl"></div>

            <div className="max-w-3xl mx-auto w-full relative z-10 text-center flex flex-col gap-6">
                <span className="material-symbols-outlined text-5xl text-primary/30">mail</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">Don't Miss a Gift Idea</h2>
                <p className="text-lg text-slate-500 dark:text-slate-400">Subscribe to our newsletter for curated gift guides, early access to sales, and 10% off your first order.</p>
                <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto mt-4">
                    <input className="flex-1 h-12 px-4 rounded-[var(--radius-card)] border border-slate-200 dark:border-slate-700 bg-white dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="Enter your email" type="email" />
                    <button className="h-12 px-6 rounded-[var(--radius-card)] bg-primary hover:bg-primary/90 text-white font-bold transition-colors whitespace-nowrap" type="button">
                        Subscribe
                    </button>
                </form>
                <p className="text-xs text-slate-400 mt-2">We respect your privacy. Unsubscribe at any time.</p>
            </div>
        </section>
    );
}
