import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

const defaultGiftTypes = [
    {
        id: 'grad',
        title: "Graduation",
        description: "Celebrate their milestone with something special.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
        color: "bg-amber-900",
        link: "/catalog?category=graduation"
    },
    {
        id: 'wedding',
        title: "Wedding",
        description: "Beautiful beginnings deserve beautiful gifts.",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
        color: "bg-purple-900",
        link: "/catalog?category=wedding"
    },
    {
        id: 'anniv',
        title: "Anniversary",
        description: "Cherish the moments that matter most.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
        color: "bg-rose-900",
        link: "/catalog?category=anniversary"
    },
    {
        id: 'bday',
        title: "Birthday",
        description: "Make their special day even brighter.",
        image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=800",
        color: "bg-blue-900",
        link: "/catalog?category=birthday"
    }
];

export default function GiftDiscovery({ banners = [] }) {
    const [hoveredId, setHoveredId] = useState(null);

    // Use banners if available, otherwise fallback (or combine if you prefer, but usually replace)
    const items = banners.length > 0 ? banners : defaultGiftTypes;

    return (
        <section className="py-20 bg-background-light dark:bg-background-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4"
                    >
                        Shop by Occasion
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
                    >
                        Explore our curated collections designed to make every moment unforgettable.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <Link to={item.link || item.url || '#'} key={item.id}>
                            <motion.div
                                onHoverStart={() => setHoveredId(item.id)}
                                onHoverEnd={() => setHoveredId(null)}
                                className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <ImageWithFallback
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Dynamic or static color, if dynamic banners don't have color, use generic dark overlay */}
                                    <div className={`absolute inset-0 ${item.color || 'bg-slate-900'} opacity-60 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-40`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <motion.div
                                        animate={{ y: hoveredId === item.id ? -10 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-2xl font-bold font-display mb-2">{item.title}</h3>
                                        <AnimatePresence>
                                            {hoveredId === item.id && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="text-white/90 text-sm overflow-hidden"
                                                >
                                                    {item.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>

                                        <div className="mt-4 flex items-center gap-2 text-sm font-medium tracking-wide border-b border-white/0 group-hover:border-white/100 self-start transition-all w-fit">
                                            <span>EXPLORE</span>
                                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
