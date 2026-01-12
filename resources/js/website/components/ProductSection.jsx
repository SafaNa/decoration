import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

export default function ProductSection({ title = "Trending This Season", subtitle = `Our most loved gifts, hand-picked for the Class of ${new Date().getFullYear()}.`, products = [] }) {
    // Take only first 4 products
    const displayProducts = products.slice(0, 4);

    return (
        <section className="w-full py-12 md:py-24 px-4 md:px-10">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
                    <span className="text-primary font-bold tracking-wide uppercase text-[10px] md:text-xs mb-2 block">Best Sellers</span>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 md:mb-4 font-display">{title}</h2>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">{subtitle}</p>
                </div>
                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {displayProducts.map((product, index) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <motion.div
                                    className="group flex flex-col gap-4"
                                    initial={{ opacity: 1, y: 0 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative w-full aspect-[4/5] bg-white dark:bg-white/5 rounded-[var(--radius-card)] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                        {/* Badges - Simulate Logic */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                                            {index === 0 && (
                                                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                    BEST SELLER
                                                </span>
                                            )}
                                            {index === 1 && (
                                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                    CUSTOM
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute inset-0">
                                            {product.image ? (
                                                <ImageWithFallback
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    fallbackText={product.name}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-300">
                                                    <span className="material-symbols-outlined text-4xl">image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Overlay & CTA - Desktop Hover / Mobile Fab like */}
                                        <div className="absolute bottom-3 right-3 z-20 md:hidden">
                                            <div className="size-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-900">
                                                <span className="material-symbols-outlined text-sm font-bold">add</span>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                                            <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-primary hover:text-white">
                                                <span>Customize</span>
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm md:text-lg font-semibold text-slate-900 dark:text-white font-display line-clamp-1 group-hover:text-primary transition-colors mb-1">{product.name}</h3>
                                        <p className="text-primary font-bold text-xs md:text-sm">
                                            Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                        </p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 line-clamp-2 hidden md:block">{product.description || 'No description available'}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-slate-400">Loading products...</div>
                )}
                <div className="flex justify-center mt-8 md:mt-16">
                    <Link to="/catalog">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-10 md:h-12 px-6 md:px-8 cursor-pointer items-center justify-center rounded-full border-2 border-slate-200 dark:border-white/10 hover:border-primary hover:text-primary bg-transparent text-slate-900 dark:text-white text-xs md:text-sm font-bold transition-all shadow-sm hover:shadow-lg"
                        >
                            View All Products
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
