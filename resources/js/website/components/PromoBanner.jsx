import React from 'react';

export default function PromoBanner() {
    return (
        <section className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                        Limited Offer
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                        Gratis Ongkir Se-Indonesia
                    </h2>
                    <p className="text-white/90 text-lg mb-8">
                        Khusus pemesanan paket bundling wisuda bulan ini. Jangan sampai kehabisan slot pengiriman!
                    </p>
                    <button className="bg-white text-primary font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all">
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </section>
    );
}
