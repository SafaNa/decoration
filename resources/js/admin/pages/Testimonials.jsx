import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await api.get('/admin/testimonials');
            setTestimonials(response.data);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (testimonial) => {
        setTestimonialToDelete(testimonial);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!testimonialToDelete) return;

        try {
            await api.delete(`/admin/testimonials/${testimonialToDelete.id}`);
            setTestimonials(testimonials.filter(t => t.id !== testimonialToDelete.id));
            setDeleteModalOpen(false);
            setTestimonialToDelete(null);
        } catch (error) {
            console.error("Failed to delete testimonial", error);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Memuat testimoni...</div>;

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Testimoni</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Kelola apa kata pelanggan tentang toko kita.</p>
                </div>
                <Link
                    to="/admin/testimonials/create"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span>Tambah Testimoni</span>
                </Link>
            </div>

            {testimonials.length === 0 ? (
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="size-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-slate-400">rate_review</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Belum ada testimoni</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">Mulai tambahkan ulasan pelanggan untuk membangun kepercayaan.</p>
                    <Link
                        to="/admin/testimonials/create"
                        className="text-primary hover:text-primary-dark font-medium"
                    >
                        Tambah Testimoni Baru &rarr;
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-10 rounded-full bg-slate-100 bg-cover bg-center shrink-0"
                                        style={{ backgroundImage: item.image ? `url('${item.image}')` : 'none' }}
                                    >
                                        {!item.image && <span className="flex w-full h-full items-center justify-center text-xs font-bold text-slate-400">{item.name.charAt(0)}</span>}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 dark:text-white line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-1">{item.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => navigate(`/admin/testimonials/${item.id}/edit`)}
                                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(item)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute -top-1 -left-1 text-slate-200 dark:text-slate-700 text-3xl select-none">format_quote</span>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10 pt-2 pl-4 italic">"{item.content}"</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-white/5 flex justify-between items-center text-xs text-slate-400">
                                <span>{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Testimoni"
                message={`Apakah Anda yakin ingin menghapus testimoni dari "${testimonialToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </div>
    );
}
