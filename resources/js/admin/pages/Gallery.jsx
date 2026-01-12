import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import galleryService from '../../services/gallery.service';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        id: null,
        loading: false
    });

    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        try {
            const data = await galleryService.getAll();
            setGalleries(data);
        } catch (error) {
            console.error("Failed to fetch gallery items", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        setDeleteModal({ isOpen: true, id, loading: false });
    };

    const handleConfirmDelete = async () => {
        setDeleteModal(prev => ({ ...prev, loading: true }));
        try {
            await galleryService.delete(deleteModal.id);
            fetchGalleries();
            setDeleteModal({ isOpen: false, id: null, loading: false });
        } catch (error) {
            console.error("Failed to delete gallery item", error);
            setDeleteModal(prev => ({ ...prev, loading: false }));
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Memuat galeri...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Galeri Foto</h1>
                </div>
                <Link to="/admin/gallery/create" className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Tambah Foto
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleries.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden group">
                        <div className="relative aspect-square">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                                    <span className="material-symbols-outlined text-4xl">image</span>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex flex-col overflow-hidden mr-2">
                                <h3 className="font-semibold text-slate-900 dark:text-white truncate text-sm" title={item.title}>{item.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.category?.name || 'Tak Berkategori'}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <Link
                                    to={`/admin/gallery/edit/${item.id}`}
                                    className="p-1.5 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                    title="Edit Foto"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </Link>
                                <button
                                    onClick={() => confirmDelete(item.id)}
                                    className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                    title="Hapus Foto"
                                >
                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                galleries.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        Belum ada foto di galeri.
                    </div>
                )
            }

            < DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Hapus Foto"
                message="Apakah Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan."
                isLoading={deleteModal.loading}
            />
        </div>
    );
};

export default Gallery;
