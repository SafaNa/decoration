import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import websiteProductService from '../../services/website-product.service';
import websiteCategoryService from '../../services/website-category.service';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState('Semua');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    websiteProductService.getAll(),
                    websiteCategoryService.getAll()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);

                // Set filter from URL param if present
                const catParam = searchParams.get('category');
                if (catParam) {
                    setFilterCategory(catParam);
                }
            } catch (error) {
                console.error("Failed to fetch catalog data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = filterCategory === 'Semua' || product.category?.name === filterCategory || product.category?.slug === filterCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCategoryClick = (catName) => {
        setFilterCategory(catName);
        if (catName === 'Semua') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: catName });
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-primary font-bold">Loading Catalog...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col font-body bg-background-light dark:bg-background-dark transition-colors duration-200">

            <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12">
                {/* Header & Description */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display">Koleksi Wisuda {new Date().getFullYear()}</h1>
                    <p className="text-slate-600 dark:text-slate-400">Temukan hadiah spesial untuk momen tak terlupakan.</p>
                </div>

                {/* Search Bar Mobile */}
                <div className="mb-6 md:hidden">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Filters */}
                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mb-8 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth items-center">
                    <button
                        onClick={() => handleCategoryClick('Semua')}
                        className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 ${filterCategory === 'Semua' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-primary/5 hover:text-primary'}`}
                    >
                        Semua
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.name)}
                            className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 ${filterCategory === cat.name ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-primary/5 hover:text-primary'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="group bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-transparent hover:border-primary/20 dark:hover:border-primary/20">
                                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 mb-4">
                                    {product.image ? (
                                        <img alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" src={product.image} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                                            <span className="material-symbols-outlined text-4xl">image</span>
                                        </div>
                                    )}
                                    {product.stock < 5 && product.stock > 0 && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">Low Stock</div>
                                    )}
                                </div>
                                <div className="px-1 flex flex-col flex-grow">
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{product.category?.name || 'Uncategorized'}</p>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 font-display">{product.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{product.description || 'No description available.'}</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</span>
                                        <Link to={`/product/${product.id}`} className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white font-medium text-sm transition-all duration-300 flex items-center gap-1">
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Tidak ada produk ditemukan</h3>
                        <p className="text-slate-500 dark:text-slate-400">Coba kata kunci lain atau ganti kategori.</p>
                    </div>
                )}

                {/* Pagination (Static for now) */}
                {filteredProducts.length > 12 && (
                    <div className="mt-12 flex justify-center">
                        <div className="inline-flex items-center gap-2">
                            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-primary/10 text-gray-500 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20">1</button>
                            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-primary/10 text-gray-500 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
            {/* Newsletter Section (Optional) */}
            <section className="py-16 bg-pink-50 dark:bg-slate-800/50 border-t border-pink-100 dark:border-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join Our Community</h2>
                    <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">Subscribe for exclusive updates, new product announcements, and special discounts.</p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
                        <button type="button" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
