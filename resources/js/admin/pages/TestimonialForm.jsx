import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function TestimonialForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            fetchTestimonial();
        }
    }, [id]);

    const fetchTestimonial = async () => {
        try {
            const response = await api.get(`/admin/testimonials/${id}`);
            const data = response.data;
            setFormData({
                name: data.name,
                role: data.role || '',
                content: data.content,
                image: null // Don't set image file, just preview
            });
            if (data.image) {
                setImagePreview(data.image);
            }
        } catch (error) {
            console.error("Failed to fetch testimonial", error);
            setError("Gagal memuat data testimoni.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('role', formData.role);
            data.append('content', formData.content);
            if (formData.image) {
                data.append('image', formData.image);
            }
            if (isEditMode) {
                data.append('_method', 'PUT'); // Laravel method spoofing for FormData
                await api.post(`/admin/testimonials/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/admin/testimonials', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/admin/testimonials');
        } catch (error) {
            console.error("Failed to save testimonial", error);
            setError("Gagal menyimpan testimoni. Pastikan semua data terisi dengan benar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[800px] mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/testimonials" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-slate-500">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {isEditMode ? 'Edit Testimoni' : 'Tambah Testimoni'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {isEditMode ? 'Perbarui ulasan pelanggan.' : 'Tambahkan ulasan baru dari pelanggan.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
                        <span className="material-symbols-outlined">error</span>
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                <div className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nama Pelanggan</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Contoh: Sarah Amalia"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role / Status (Opsional)</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="Contoh: Mahasiswi UI"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Isi Ulasan</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            rows="4"
                            placeholder="Tulis ulasan pelanggan di sini..."
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foto Profil (Opsional)</label>
                        <div className="flex items-start gap-6">
                            <div className="shrink-0 size-24 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center relative group">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-slate-300">person</span>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white">edit</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                                    Upload foto profil pelanggan. Format: JPG, PNG. Ukuran maks: 2MB.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => document.querySelector('input[type="file"]').click()}
                                    className="text-sm font-medium text-primary hover:text-primary-dark"
                                >
                                    Pilih Foto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                    <Link
                        to="/admin/testimonials"
                        className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                        {isEditMode ? 'Simpan Perubahan' : 'Simpan Testimoni'}
                    </button>
                </div>
            </form>
        </div>
    );
}
