import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

export default function Hero({ settings = {}, heroImage }) {
    // Default fallback values if settings are not loaded yet
    const badgeText = settings.hero_badge || "PREMIUM GRADUATION GIFTS";
    const titleLine1 = settings.hero_title_line1 || "Celebrate Their";
    const titleLine2 = settings.hero_title_line2 || "Milestone";
    const subtitle = settings.hero_subtitle || "Discover handcrafted treasures designed to honor their journey and inspire their future.";
    const ctaPrimary = settings.hero_cta_primary || "Explore Collection";
    const ctaSecondary = settings.hero_cta_secondary || "Custom Order";

    return (
        <section className="relative min-h-[calc(100vh-6rem)] md:h-screen md:min-h-[600px] flex items-center overflow-hidden bg-background-light dark:bg-background-dark pt-0 md:pt-0">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-12 origin-top" />
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-4 md:px-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center relative z-10">
                {/* Text Content */}
                <div className="max-w-2xl order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 tracking-wide border border-primary/20">
                            {badgeText}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-display font-medium text-slate-900 dark:text-white leading-[1.1] mb-6">
                            {titleLine1} <br />
                            <span className="text-secondary italic">{titleLine2}</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/catalog" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
                                >
                                    {ctaPrimary}
                                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
                                </motion.button>
                            </Link>
                            <Link to="/contact" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-semibold rounded-full hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <span>{ctaSecondary}</span>
                                    <span className="material-symbols-outlined text-sm">edit_note</span>
                                </motion.button>
                            </Link>
                        </div>

                        {/* Value Propositions - Mobile horizontal scroll / Desktop grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-10 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
                        >
                            <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 w-max md:w-full">
                                <div className="flex flex-row md:flex-col items-center md:items-start gap-3 p-3 md:p-0 bg-white/50 dark:bg-white/5 md:bg-transparent rounded-xl md:rounded-none border md:border-none border-white/50 dark:border-white/5 shadow-sm md:shadow-none min-w-[200px] md:min-w-0">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-xl">handyman</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Custom Handmade</h4>
                                        <p className="text-xs text-slate-500">Personalized with love</p>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col items-center md:items-start gap-3 p-3 md:p-0 bg-white/50 dark:bg-white/5 md:bg-transparent rounded-xl md:rounded-none border md:border-none border-white/50 dark:border-white/5 shadow-sm md:shadow-none min-w-[200px] md:min-w-0">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-xl">rocket_launch</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Fast Shipping</h4>
                                        <p className="text-xs text-slate-500">Sameday delivery avail.</p>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col items-center md:items-start gap-3 p-3 md:p-0 bg-white/50 dark:bg-white/5 md:bg-transparent rounded-xl md:rounded-none border md:border-none border-white/50 dark:border-white/5 shadow-sm md:shadow-none min-w-[200px] md:min-w-0">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-xl">celebration</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Any Occasion</h4>
                                        <p className="text-xs text-slate-500">Graduation, Wedding...</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Hero Image / Visual */}
                <div className="relative w-full md:w-auto order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative z-10"
                    >
                        <div className="w-full h-[300px] md:h-[600px] rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl overflow-hidden">
                            <ImageWithFallback
                                src={heroImage || "https://images.unsplash.com/photo-1549465220-1e8b5fec634d?auto=format&fit=crop&q=80&w=800"}
                                alt="Premium Gift"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Card 1 - Hidden on mobile */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="hidden md:flex absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl items-center gap-4 max-w-xs"
                        >
                            <div className="size-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">Fast Delivery</p>
                                <p className="text-xs text-slate-500">Ready in 24 hours</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Decorative Shapes - Hidden on mobile */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="hidden md:block absolute -top-10 -right-10 w-40 h-40 border-2 border-dashed border-primary/30 rounded-full z-0"
                    />
                </div>
            </div>
        </section>
    );
}
