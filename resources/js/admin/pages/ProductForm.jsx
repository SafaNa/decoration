import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import productService from '../../services/product.service';
import categoryService from '../../services/category.service';
import { compressImage } from '../../utils/image';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category_id: '',
        stock: 0,
        is_active: true,
        image: ''
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const fetchProduct = async () => {
        try {
            const data = await productService.get(id);
            setFormData({
                name: data.name,
                price: data.price,
                description: data.description || '',
                category_id: data.category_id,
                stock: data.stock,
                is_active: Boolean(data.is_active),
                image: data.image || ''
            });
        } catch (error) {
            console.error("Failed to fetch product", error);
            navigate('/admin/products');
        } finally {
            setInitialLoading(false);
        }
    };

    const formatNumber = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID').format(value);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'price' || name === 'stock') {
            // Remove non-numeric characters
            const numericsOnly = value.replace(/\D/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: numericsOnly
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const compressedImage = await compressImage(file);
                setFormData(prev => ({ ...prev, image: compressedImage }));
            } catch (error) {
                console.error("Image compression failed", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await productService.update(id, formData);
            } else {
                await productService.create(formData);
            }
            navigate('/admin/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan produk');
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <div className="p-8 text-center">Memuat data produk...</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-6">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap gap-2 items-center text-sm">
                    <Link className="text-slate-500 hover:text-primary dark:text-slate-400 transition-colors" to="/admin">Dashboard</Link>
                    <span className="text-slate-400 dark:text-slate-600">/</span>
                    <Link className="text-slate-500 hover:text-primary dark:text-slate-400 transition-colors" to="/admin/products">Produk</Link>
                    <span className="text-slate-400 dark:text-slate-600">/</span>
                    <span className="text-slate-900 dark:text-white font-medium">{isEditMode ? 'Edit Produk' : 'Tambah Baru'}</span>
                </nav>

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Buat atau perbarui item produk hadiah wisuda.</p>
                    </div>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">Informasi Dasar</h2>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Nama Produk</span>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                                    placeholder="contoh: Buket Bunga Mawar"
                                    type="text"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Harga (IDR)</span>
                                <input
                                    name="price"
                                    value={formatNumber(formData.price)}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                                    placeholder="0"
                                    type="text"
                                    required
                                />
                            </label>
                        </div>

                        <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Deskripsi Produk</h2>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 h-32 focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                                placeholder="Deskripsikan produk..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">Kategori & Stok</h2>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Kategori</span>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Stok</span>
                                <input
                                    name="stock"
                                    value={formatNumber(formData.stock)}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                                    type="text"
                                />
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                    id="is_active"
                                    className="w-4 h-4 text-primary rounded"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-slate-900 dark:text-slate-200">Produk Aktif</label>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Gambar Produk</h2>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg mt-2" />
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Link to="/admin/products" className="flex-1 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-bold text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                Batal
                            </Link>
                            <button disabled={loading} className="flex-1 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
                                {loading ? 'Menyimpan...' : 'Simpan Produk'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
