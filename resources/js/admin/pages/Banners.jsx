import React, { useState, useEffect } from 'react';
import websiteBannerService from '../../services/website-banner.service';
import Swal from 'sweetalert2';

export default function Banners() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        type: 'discovery',
        order: 0,
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const data = await websiteBannerService.getAllAdmin();
            setBanners(data);
        } catch (error) {
            console.error("Failed to fetch banners", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openModal = (banner = null) => {
        if (banner) {
            setCurrentBanner(banner);
            setFormData({
                title: banner.title,
                description: banner.description || '',
                url: banner.url || '',
                type: banner.type,
                order: banner.order,
                image: null
            });
            setImagePreview(banner.image); // Use existing image URL for preview
        } else {
            setCurrentBanner(null);
            setFormData({
                title: '',
                description: '',
                url: '',
                type: 'discovery',
                order: 0,
                image: null
            });
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentBanner(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('url', formData.url);
            data.append('type', formData.type);
            data.append('order', formData.order);
            if (formData.image) {
                data.append('image', formData.image);
            }

            if (currentBanner) {
                await websiteBannerService.update(currentBanner.id, data);
                Swal.fire('Berhasil!', 'Banner berhasil diperbarui.', 'success');
            } else {
                await websiteBannerService.create(data);
                Swal.fire('Berhasil!', 'Banner berhasil dibuat.', 'success');
            }
            fetchBanners();
            closeModal();
        } catch (error) {
            console.error("Failed to save banner", error);
            Swal.fire('Error!', 'Gagal menyimpan banner.', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            try {
                await websiteBannerService.remove(id);
                Swal.fire('Terhapus!', 'Banner telah dihapus.', 'success');
                fetchBanners();
            } catch (error) {
                console.error("Failed to delete banner", error);
                Swal.fire('Error!', 'Gagal menghapus banner.', 'error');
            }
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Memuat daftar banner...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-4 flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-text-main dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Manajemen Banner</h1>
                    <p className="text-text-secondary dark:text-slate-400 text-base font-normal">Kelola gambar untuk carousel dan bagian discovery.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
                >
                    <span className="material-symbols-outlined">add</span>
                    Tambah Banner
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                    <div key={banner.id} className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#2a1d24] shadow-sm hover:shadow-md transition-all overflow-hidden border border-slate-100 dark:border-slate-800">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                            <img src={banner.image} alt={banner.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                {banner.type}
                            </span>
                        </div>
                        <div className="p-5 flex flex-col gap-2 flex-grow">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">{banner.title}</h3>
                            <p className="text-sm text-text-secondary dark:text-slate-400 line-clamp-2">{banner.description}</p>
                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">Order: {banner.order}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openModal(banner)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                        title="Edit"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                                        title="Hapus"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#2a1d24] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-text-main dark:text-white">
                                {currentBanner ? 'Edit Banner' : 'Tambah Banner Baru'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4">
                            {/* Image Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-main dark:text-white">Gambar Banner</label>
                                <div className="relative aspect-video w-full rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer group">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                                            <span className="text-sm">Klik untuk upload gambar</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-main dark:text-white">Judul</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Contoh: For Him"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-main dark:text-white">Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    placeholder="Deskripsi singkat banner..."
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Type */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-main dark:text-white">Tipe</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    >
                                        <option value="discovery">Discovery (Grid)</option>
                                        <option value="slideshow">Slideshow (Utama)</option>
                                        <option value="promo">Promo (Spesial)</option>
                                    </select>
                                </div>
                                {/* Order */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-main dark:text-white">Urutan</label>
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* URL */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-main dark:text-white">Link URL</label>
                                <input
                                    type="text"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="/catalog?category=men"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-3 rounded-xl bg-primary font-bold text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
