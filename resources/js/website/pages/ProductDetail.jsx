import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import websiteProductService from '../../services/website-product.service';
import websiteSettingService from '../../services/website-setting.service';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    const [quantity, setQuantity] = useState(1);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await websiteSettingService.getAll();
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings", error);
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await websiteProductService.get(id);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product detail", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-primary font-bold">Loading Product...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center flex-col bg-background-light dark:bg-background-dark text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-6xl mb-4">sentiment_dissatisfied</span>
                <p className="text-lg">Produk tidak ditemukan.</p>
                <Link to="/catalog" className="text-primary hover:underline mt-4">Kembali ke Katalog</Link>
            </div>
        );
    }

    // Prepare images array (currently api supports single image, assuming mock data had multiple)
    // We will use the main image and maybe placeholder if it's the only one.
    const images = product.image ? [product.image] : [];
    // If backend doesn't support multiple images yet, we just array-ify the single one.

    const handleWhatsapp = () => {
        let phone = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '';
        // Enhance phone number formatting: replace leading '0' with '62' if needed
        if (phone.startsWith('0')) {
            phone = '62' + phone.slice(1);
        }
        // Fallback or ensure it's not empty
        if (!phone) phone = '6281234567890';

        const currentUrl = window.location.href;

        const message = `Halo, saya ingin memesan produk ini:

*Nama:* ${product.name}
*Harga:* Rp ${new Intl.NumberFormat('id-ID').format(product.price)}
*Link:* ${currentUrl}
*Foto:* ${product.image}

Mohon infonya apakah stok masih tersedia?`;

        // Encode properly
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex min-h-screen w-full flex-col font-body bg-background-light dark:bg-background-dark transition-colors duration-200">
            <main className="flex justify-center w-full py-12 px-4 sm:px-10 lg:px-32">
                <div className="max-w-[1280px] w-full flex flex-col gap-8">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <Link className="text-slate-500 hover:text-primary transition-colors" to="/">Home</Link>
                        <span className="material-symbols-outlined text-base text-slate-300">chevron_right</span>
                        <Link className="text-slate-500 hover:text-primary transition-colors" to="/catalog">Catalog</Link>
                        <span className="material-symbols-outlined text-base text-slate-300">chevron_right</span>
                        <span className="text-primary font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>

                    {/* Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
                        {/* Left Column: Images */}
                        <div className="lg:col-span-7 flex flex-col gap-4">
                            {/* Main Image */}
                            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-white/5 shadow-sm group">
                                <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                                    {product.category?.name || 'Item'}
                                </div>
                                {images.length > 0 ? (
                                    <div className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url("${images[selectedImage]}")` }}>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-300">
                                        <span className="material-symbols-outlined text-8xl">image</span>
                                    </div>
                                )}
                            </div>
                            {/* Thumbnails (Only show if multiple images, logic stub for future) */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {images.map((url, i) => (
                                        <button key={i} onClick={() => setSelectedImage(i)}
                                            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all bg-slate-100 ${selectedImage === i ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-100'}`}>
                                            <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url("${url}")` }}></div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Details */}
                        <div className="lg:col-span-5 flex flex-col h-full">
                            <div className="sticky top-24 flex flex-col gap-6">
                                {/* Header Info */}
                                <div className="space-y-2">
                                    <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white font-display">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[1, 2, 3, 4, 5].map(n => <span key={n} className="material-symbols-outlined text-[20px]">star</span>)}
                                        </div>
                                        <span>
                                            ({new Intl.NumberFormat('id-ID').format(
                                                Math.floor(Math.random() * 1000) + 20
                                            )} Reviews)
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className={`font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                                {/* Price */}
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-bold text-primary">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</span>
                                </div>
                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                    {product.description || "No description provided."}
                                </p>

                                {/* Info Box */}
                                <div className="bg-primary/5 dark:bg-white/5 rounded-xl p-5 border border-primary/10 dark:border-white/10">
                                    <h3 className="font-bold text-sm uppercase tracking-wide text-primary mb-3">Product Info</h3>
                                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">category</span>
                                            <span>Kategori: {product.category?.name || '-'}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">inventory_2</span>
                                            <span>Stok: {product.stock} items available</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Actions - Hidden on mobile because of sticky bar */}
                                <div className="hidden md:flex flex-col gap-4 pt-2">
                                    {/* Primary CTA */}
                                    <button
                                        onClick={handleWhatsapp}
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                                    >
                                        <span className="material-symbols-outlined text-[24px]">chat</span>
                                        <span>Pesan via WhatsApp</span>
                                    </button>
                                    <p className="text-xs text-center text-slate-400">
                                        Admin fast response 09:00 - 17:00 WIB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="h-12 border-b border-slate-200 dark:border-white/5"></div>
                </div>
            </main>

            {/* Sticky Action Bar (Mobile Only) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 md:hidden z-50 flex items-center gap-3">
                <div className="flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">{product.name}</p>
                    <p className="text-lg font-bold text-primary">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</p>
                </div>
                <button
                    onClick={handleWhatsapp}
                    className="flex-1 bg-primary text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>Order</span>
                </button>
            </div>
            {/* Add padding to bottom of main to prevent overlay */}
            <div className="h-24 md:hidden"></div>
        </div>
    );
}
