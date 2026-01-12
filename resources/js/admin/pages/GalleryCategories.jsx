import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import galleryCategoryService from '../../services/gallery-category.service';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const GalleryCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        id: null,
        loading: false
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await galleryCategoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch gallery categories", error);
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
            await galleryCategoryService.delete(deleteModal.id);
            fetchCategories();
            setDeleteModal({ isOpen: false, id: null, loading: false });
        } catch (error) {
            console.error("Failed to delete category", error);
            setDeleteModal(prev => ({ ...prev, loading: false }));
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Memuat kategori...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Kategori Galeri</h1>
                </div>
                <Link to="/admin/gallery-categories/create" className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Tambah Kategori
                </Link>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Kategori</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{category.name}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/gallery-categories/edit/${category.id}`} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </Link>
                                        <button onClick={() => confirmDelete(category.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="2" className="px-6 py-8 text-center text-slate-500">Tidak ada kategori galeri.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Hapus Kategori Galeri"
                message="Apakah Anda yakin ingin menghapus kategori ini? Foto dalam kategori ini mungkin akan terpengaruh."
                isLoading={deleteModal.loading}
            />
        </div>
    );
};

export default GalleryCategories;
