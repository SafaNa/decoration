import React, { useState, useEffect } from 'react';
import websiteGalleryService from '../../services/website-gallery.service';

export default function Portfolio() {
    const [filter, setFilter] = useState('all');
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const data = await websiteGalleryService.getAll();
                setGalleryItems(data);
            } catch (error) {
                console.error("Failed to fetch gallery", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // Extract unique categories from items
    const categories = ['all', ...new Set(galleryItems.map(item => item.category?.name).filter(Boolean))];

    const filteredItems = filter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category?.name === filter);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-primary font-bold">Loading Portfolio...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col font-body bg-background-light dark:bg-background-dark transition-colors duration-200">
            {/* Hero Section */}
            <section className="relative w-full py-24 px-4 md:px-10 flex flex-col items-center justify-center text-center mt-16 text-slate-900 dark:text-white">
                <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
                </div>
                <div className="relative z-10 max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Showcase {new Date().getFullYear()}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 font-display">
                        Captured Moments & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-600">Timeless Gifts</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                        Explore our curated gallery of bespoke graduation hampers, custom frames, and unforgettable event setups.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <div className="w-full px-4 md:px-10 mb-8 z-40">
                <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`shrink-0 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg capitalize ${filter === cat
                                ? 'bg-primary text-white shadow-primary/25 hover:-translate-y-0.5'
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid Gallery */}
            <main className="w-full px-4 md:px-10 pb-20">
                <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => item.image && setActiveImage(item.image)}
                            className="break-inside-avoid group relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 cursor-zoom-in"
                        >
                            <div className="w-full overflow-hidden">
                                {item.image ? (
                                    <img alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400">
                                        <span className="material-symbols-outlined text-4xl">image</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{item.category?.name || 'Gallery'}</p>
                                <h3 className="text-white text-lg font-bold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredItems.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No gallery items found.
                    </div>
                )}
            </main>

            {/* CTA Section */}
            <section className="bg-gray-900 text-white py-20 mt-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Create Something Beautiful?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Contact us today to discuss your custom arrangement or event decoration needs.</p>
                    <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
                        Get a Quote
                    </button>
                </div>
            </section>

            {/* Lightbox */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setActiveImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-primary transition-colors p-2"
                        onClick={() => setActiveImage(null)}
                    >
                        <span className="material-symbols-outlined text-4xl">close</span>
                    </button>
                    <img
                        src={activeImage}
                        alt="Full view"
                        className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
