import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/product.service';
import categoryService from '../../services/category.service';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        id: null,
        loading: false
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await productService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
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
            await productService.delete(deleteModal.id);
            fetchProducts();
            setDeleteModal({ isOpen: false, id: null, loading: false });
        } catch (error) {
            console.error("Failed to delete product", error);
            setDeleteModal(prev => ({ ...prev, loading: false }));
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));

        // Filter by Category ID
        const matchesCategory = selectedCategory === '' || (product.category_id && String(product.category_id) === String(selectedCategory));

        return matchesSearchTerm && matchesCategory;
    });

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-4 max-w-7xl flex justify-center items-center h-64">
                <p className="text-slate-500 dark:text-slate-400">Memuat produk...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-4 max-w-7xl">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Daftar Produk</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Kelola semua produk katalog Anda di sini.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/admin/products/create" className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm shadow-primary/30">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Tambah Produk Baru
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-50 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Category Filter Dummy */}
                    <select
                        className="bg-slate-50 dark:bg-slate-800 border-none text-sm rounded-lg px-4 py-2 cursor-pointer focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-10">
                                    #
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Produk</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Harga</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#1a2632]">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 align-middle text-sm text-slate-500 dark:text-slate-400">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                                                    {product.image ? (
                                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                            <span className="material-symbols-outlined text-lg">image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{product.name}</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{product.sku || '-'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                {product.category?.name || 'Tanpa Kategori'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${product.is_active
                                                ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                                                : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                                }`}>
                                                {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/admin/products/edit/${product.id}`} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="Edit">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button onClick={() => confirmDelete(product.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Hapus">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                        Tidak ada produk ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination (Static for now) */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Menampilkan <span className="font-medium text-slate-900 dark:text-white">1</span> sampai <span className="font-medium text-slate-900 dark:text-white">{filteredProducts.length}</span> dari <span className="font-medium text-slate-900 dark:text-white">{filteredProducts.length}</span> hasil
                </p>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">Sebelumnya</button>
                    <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">Selanjutnya</button>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Hapus Produk"
                message="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
                isLoading={deleteModal.loading}
            />
        </div>
    );
};

export default Products;
