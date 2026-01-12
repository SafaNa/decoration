import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import categoryService from '../../services/category.service';
import { compressImage } from '../../utils/image';

const CategoryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            fetchCategory();
        }
    }, [id]);

    const fetchCategory = async () => {
        try {
            const data = await categoryService.get(id);
            setFormData({
                name: data.name,
                slug: data.slug,
                description: data.description || '',
                image: data.image || ''
            });
        } catch (error) {
            console.error("Failed to fetch category", error);
            navigate('/admin/categories');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await categoryService.update(id, formData);
            } else {
                await categoryService.create(formData);
            }
            navigate('/admin/categories');
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan kategori');
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <div className="p-8 text-center">Memuat data kategori...</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{isEditMode ? 'Edit Kategori' : 'Tambah Kategori'}</h1>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

                <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 max-w-2xl">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Nama Kategori</span>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            type="text"
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Deskripsi</span>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 h-32 focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                        ></textarea>
                    </label>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Gambar Kategori</span>
                        <input
                            type="file"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    try {
                                        const compressedImage = await compressImage(file);
                                        setFormData(prev => ({ ...prev, image: compressedImage }));
                                    } catch (error) {
                                        console.error("Image compression failed", error);
                                    }
                                }
                            }}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {formData.image && (
                            <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg mt-2" />
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Link to="/admin/categories" className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 transition-colors">
                            Batal
                        </Link>
                        <button disabled={loading} className="px-5 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-colors">
                            {loading ? 'Menyimpan...' : 'Simpan Kategori'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;
