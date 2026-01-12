import React, { useState, useEffect } from 'react';
import websiteTestimonialService from '../../services/website-testimonial.service';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await websiteTestimonialService.getAll();
                setTestimonials(data);
            } catch (error) {
                console.error("Failed to fetch testimonials", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    if (loading) return null; // Or a loading skeleton
    if (testimonials.length === 0) return null;

    return (
        <section className="py-20 bg-soft-pink dark:bg-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1b0e14] dark:text-white mb-4">Apa Kata Mereka?</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft border border-pink-100 dark:border-gray-700 relative flex flex-col h-full">
                            <span className="material-symbols-outlined absolute top-6 left-6 text-4xl text-primary/20">format_quote</span>
                            <p className="text-gray-600 dark:text-gray-300 italic mb-6 pt-6 relative z-10 flex-1">"{item.content}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div
                                    className="size-12 rounded-full bg-gray-200 overflow-hidden bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: item.image ? `url('${item.image}')` : 'none' }}
                                >
                                    {!item.image && <span className="flex w-full h-full items-center justify-center text-xs font-bold text-gray-400">{item.name.charAt(0)}</span>}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                                    {item.role && <p className="text-xs text-gray-500">{item.role}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
