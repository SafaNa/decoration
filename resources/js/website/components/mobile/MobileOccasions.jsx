import React from 'react';
import { Link } from 'react-router-dom';

const occasions = [
    { title: "Graduation", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200", link: "/catalog?category=graduation" },
    { title: "Wedding", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=200", link: "/catalog?category=wedding" },
    { title: "Anniv", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=200", link: "/catalog?category=anniversary" },
    { title: "Birthday", image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=200", link: "/catalog?category=birthday" },
    { title: "For Him", image: "https://images.unsplash.com/photo-1549465220-1e8b5fec634d?auto=format&fit=crop&q=80&w=200", link: "/catalog?category=men" },
    { title: "For Her", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=200", link: "/catalog?category=women" },
];

export default function MobileOccasions() {
    return (
        <div className="md:hidden mt-4 mb-8">
            <div className="px-4 mb-4 flex justify-between items-end">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display leading-none">Shop by Occasion</h2>
                <span className="text-xs font-semibold text-primary">Lihat Semua</span>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x">
                {occasions.map((item, index) => (
                    <Link key={index} to={item.link} className="flex flex-col items-center gap-2 shrink-0 group snap-start">
                        <div className="size-[4.5rem] p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-primary to-purple-600 group-hover:scale-105 transition-transform">
                            <div className="w-full h-full rounded-full border-[2px] border-white dark:border-slate-900 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center max-w-[4.5rem] leading-tight">{item.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
