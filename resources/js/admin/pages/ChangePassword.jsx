import React, { useState } from 'react';
import api from '../../services/api';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const toggleShow = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            await api.post('/admin/change-password', formData);
            setMessage({ type: 'success', text: 'Kata sandi berhasil diperbarui!' });
            setFormData({
                current_password: '',
                new_password: '',
                new_password_confirmation: ''
            });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Gagal memperbarui kata sandi' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center pb-8">
            <div className="max-w-[1000px] w-full">
                <header className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pengaturan Keamanan</h2>
                    <p className="text-slate-500 dark:text-slate-400">Kelola kredensial dan keamanan akun administrator Anda.</p>
                </header>

                {/* Change Password Card Container */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Side: Form */}
                        <div className="flex-1 p-8 md:border-r border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">lock_reset</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ganti Kata Sandi</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Perbarui kata sandi Anda secara berkala</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {message && (
                                    <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {message.text}
                                    </div>
                                )}

                                {/* Current Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Kata Sandi Saat Ini</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="current_password"
                                            value={formData.current_password}
                                            onChange={handleChange}
                                            type={showPassword.current ? "text" : "password"}
                                            className="w-full h-12 pl-4 pr-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Masukkan kata sandi lama"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => toggleShow('current')}
                                            className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword.current ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-slate-800 my-4" />

                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Kata Sandi Baru</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="new_password"
                                            value={formData.new_password}
                                            onChange={handleChange}
                                            type={showPassword.new ? "text" : "password"}
                                            className="w-full h-12 pl-4 pr-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Masukkan kata sandi baru"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => toggleShow('new')}
                                            className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword.new ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Konfirmasi Kata Sandi Baru</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="new_password_confirmation"
                                            value={formData.new_password_confirmation}
                                            onChange={handleChange}
                                            type={showPassword.confirm ? "text" : "password"}
                                            className="w-full h-12 pl-4 pr-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Ulangi kata sandi baru"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => toggleShow('confirm')}
                                            className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword.confirm ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-sm shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span>{loading ? 'Memperbarui...' : 'Perbarui Kata Sandi'}</span>
                                    </button>
                                    <a href="/admin" className="px-6 h-12 flex items-center justify-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
                                        Batal
                                    </a>
                                </div>
                            </form>
                        </div>

                        {/* Right Side: Requirements */}
                        <div className="w-full md:w-80 p-8 bg-slate-50 dark:bg-slate-950/50">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Persyaratan Kata Sandi</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Minimal 8 Karakter</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gunakan kombinasi yang lebih panjang untuk keamanan maksimal.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-xl">radio_button_unchecked</span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Huruf Besar & Kecil</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Harus mengandung setidaknya satu huruf kapital.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-xl">radio_button_unchecked</span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Angka atau Simbol</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gunakan angka (0-9) atau karakter spesial seperti @, #, $.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-10 p-4 bg-primary/5 rounded-lg border border-primary/10">
                                <div className="flex gap-2 items-center text-primary mb-2">
                                    <span className="material-symbols-outlined text-[20px]">info</span>
                                    <span className="text-xs font-bold uppercase tracking-tight">Tips Keamanan</span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Jangan gunakan informasi pribadi seperti tanggal lahir atau nama hewan peliharaan dalam kata sandi Anda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
