export default function Features() {
    return (
        <section className="w-full py-16 px-4 md:px-10">
            <div className="max-w-7xl mx-auto w-full">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--promo-from)] to-[var(--promo-to)] shadow-2xl transition-colors duration-500">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col items-center text-center py-20 px-6">
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-white/20 rounded-full backdrop-blur-sm border border-white/10">
                            Limited Offer
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight">
                            Gratis Ongkir Se-Indonesia
                        </h2>
                        <p className="max-w-2xl text-lg text-slate-300 mb-10 leading-relaxed">
                            Khusus pemesanan paket bundling wisuda bulan ini. Jangan sampai kehabisan slot pengiriman!
                        </p>
                        <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-transform hover:scale-105 shadow-xl shadow-white/10">
                            Pesan Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
