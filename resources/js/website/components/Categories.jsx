import React from 'react';
import { Link } from 'react-router-dom';

export default function Categories({ categories = [] }) {
    // Use placeholders since category model doesn't have image
    const placeholders = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCiwDQoo2CtB8jlNqbgFExff6E_PBydwJOZllFlEHF4Nn95H47laFTe0q0yH1gslF68lwNDPOQK4-2jIE0ZKgL5FzjR6m6XANGQSQvuONKas2DbvZn4ZkgJJbboCJrNwAIJT3Rv6eDqYlVASEzqwhJsfH9u0_tWwW8aJKAG3H2mJ8UDuBYZ9S9n7OxgD5SZ0xkqbl3Hwo8tiJA2izSzlWd_DpHcSXtBh1q0-w3TfzQ1Jvscm6CRtUoSoo1wR4Ch9lfQarsXx4X2wJA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDKaIBbNMx9nutl58T6THPT_20OFFdMEBjlm7myW8xmcITL3IBILho60YxJlQ7fs3pvtoeznKurjMasqcGGcP0TM-HOy_ZB1LSmZyLxdCBjYcUImNpy3B_B4Psto2tyc0b9M4f8z5Odl2YZugp-sNbRaODKr8xNbNrki5AXNg2yLM-tINpkuDXlR3N1O8NINvPoR94PEHPkcAH4WHpyiCO50GYgTi_x0YaSRVODxywVTfItgaguHYABjmXNbhf3eKVTgxcyKlzX4lk",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB8o87KDQSj0-_E9tNTvZrVtP2T1BgzTlKlTLElPL9GdoES3GDoZvyDvWTxKAklEQvRKJdX-UTvbMG37ZKnx18VL5hrE7dy8LXp85-jXSxoQb_Xb--YG9cKfMBAwFGaWsR6mXoNYsYV1x4jJfN4EBo3UeiwwKMGxTtw3FmnYd46QzBGOAB1nHzTcNLk1gWeA_ugFYDwyPPeM95vjX_4RergRZQEXxW4M0RhAMjEknNY2vkquBB3h_QityuiLjEM9xZBtDMl_fJqxNc",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7Jx8AA32QqBPG3mWZI5lRXb8gz9V933r-9s-0T47ed4E8k4VPBdCNK0B-pty24qPr8-xwZZwyIQ0jrNtOhoQxbVdfbTHh9_MI2ISd1B1XpX3OiiOy6IeoEKhJKzJGm_b8jtFfyVj-tc3Qs4-lWGbEmXiUEkpfrVW_A_FT4ZMkhgP8vwpyfiv6NmsFI1dciHX5I4soDw4Sb-wSRcnfnmoihlO1wnj3JEoD8v5bDqtYg_aXI0zMqnRGMOAHUohARo8Ot7AECvARzQQ"
    ];

    const displayCategories = categories.slice(0, 4);

    return (
        <section className="w-full py-20 bg-white dark:bg-white/5 border-y border-slate-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-display">Browse by Product</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">From trophies to keepsakes, find exactly what you need.</p>
                    </div>
                    <Link className="hidden md:flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all" to="/catalog">
                        View All Categories <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {displayCategories.map((cat, index) => (
                        <Link key={cat.id} className="group flex flex-col gap-4" to={`/catalog?category=${cat.name}`}>
                            <div className="w-full aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-slate-100 relative">
                                <div
                                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${placeholders[index % placeholders.length]}')` }}
                                ></div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors font-display">{cat.name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Explore Collection</p>
                            </div>
                        </Link>
                    ))}
                    {displayCategories.length === 0 && (
                        <div className="col-span-4 text-center text-slate-400 py-10">Loading categories...</div>
                    )}
                </div>
            </div>
        </section>
    );
}
