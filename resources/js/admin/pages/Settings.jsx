import React, { useState, useEffect } from 'react';
import settingService from '../../services/setting.service';

export default function Settings() {
    const [settings, setSettings] = useState({
        theme: 'pastel',
        whatsapp: '',
        facebook: '',
        twitter: '',
        tiktok: '',
        instagram: '',
        seo_title: '',
        seo_desc: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await settingService.getAll();
            setSettings(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[`settings.${name}`]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`settings.${name}`];
                return newErrors;
            });
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        setErrors({});

        try {
            await settingService.updateBatch(settings);
            setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' });
        } catch (error) {
            console.error("Failed to save settings", error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                setMessage({ type: 'error', text: 'Terdapat kesalahan pada input. Mohon periksa kembali.' });
            } else {
                setMessage({ type: 'error', text: 'Gagal menyimpan pengaturan.' });
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Memuat pengaturan...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-4 flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col gap-2">
                <h1 className="text-text-main dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Konfigurasi Toko</h1>
                <p className="text-text-secondary dark:text-slate-400 text-base font-normal">Kelola tema visual dan pengaturan SEO toko Anda.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {/* Theme Selection Section */}
            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-text-main dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Tema Toko</h2>
                </div>
                {/* Theme Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Theme Card 1: Pink Pastel */}
                    <label className="group cursor-pointer relative flex flex-col rounded-xl overflow-hidden border-2 bg-white dark:bg-[#2a1d24] transition-all hover:shadow-md has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary border-transparent">
                        <input
                            className="peer sr-only"
                            name="theme"
                            type="radio"
                            value="pastel"
                            checked={settings.theme === 'pastel'}
                            onChange={handleChange}
                        />
                        <div className="aspect-video w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbDGS1tw8vfmpEIIEmJce82rebbHS5S0bSIrjMsjlm4JFEuf2RHPGo1fN_C0J0_vKa35pKtRlgXWw7OmIgiyQblo7ICRwrMpZIGE_boGuFnfD_FBLGKlKw2SYeVYu8g2o_TG9dnabMhIpJGCYPFwsx2zNYejL4d2-OS7XjNIerxDUNOZLaQJTJt1-lD65o4uJhrBA9zDr-pA5vn41JbZHLtjizO-USj9yIAFk9R4JL2Y6cyGCoBg5xfap0Xgjw6OJS0YbzMgyc0BQ')" }}>
                            <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity bg-primary text-white rounded-full p-1 shadow-sm">
                                <span className="material-symbols-outlined text-[20px] block">check</span>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-text-main dark:text-white">Pink Pastel</span>
                                {settings.theme === 'pastel' && <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Aktif</span>}
                            </div>
                            <p className="text-sm text-text-secondary dark:text-slate-400">Lembut dan merayakan, cocok untuk musim wisuda.</p>
                        </div>
                    </label>

                    {/* Theme Card 2: Elegant Dark */}
                    <label className="group cursor-pointer relative flex flex-col rounded-xl overflow-hidden border-2 bg-white dark:bg-[#2a1d24] transition-all hover:shadow-md has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary border-transparent">
                        <input
                            className="peer sr-only"
                            name="theme"
                            type="radio"
                            value="elegant"
                            checked={settings.theme === 'elegant'}
                            onChange={handleChange}
                        />
                        <div className="aspect-video w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjQvXQ8BKi744vE8Bky0zDRq-Gy6O5X8BrKj8FpktMKMbnzGFtE5B2GMTc5U1ZZE95lfBbB0cj8_oZN8mWY1F4x6UxGY2vDVDLusFXaK3PZg7xGE9gnGv4dxjxNZea7fyPL3k6VAWnjnN72yHLiZruyhuxKx0MhNcXw5yfi3riZYh4uanITJ_LqCUFiObTh6yXWBMw-IbN-E99TFz8hdOt6X1hLq_jeo0umyCd6RVkiuhWJJeenHdMmLfHVnkyo89h6yGscxD0Szs')" }}>
                            <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity bg-primary text-white rounded-full p-1 shadow-sm">
                                <span className="material-symbols-outlined text-[20px] block">check</span>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-text-main dark:text-white">Elegant Dark</span>
                                {settings.theme === 'elegant' && <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Aktif</span>}
                            </div>
                            <p className="text-sm text-text-secondary dark:text-slate-400">Estetika mode gelap yang premium dan canggih.</p>
                        </div>
                    </label>

                    {/* Theme Card 3: Minimalist White */}
                    <label className="group cursor-pointer relative flex flex-col rounded-xl overflow-hidden border-2 bg-white dark:bg-[#2a1d24] transition-all hover:shadow-md has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary border-transparent">
                        <input
                            className="peer sr-only"
                            name="theme"
                            type="radio"
                            value="minimalist"
                            checked={settings.theme === 'minimalist'}
                            onChange={handleChange}
                        />
                        <div className="aspect-video w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCv5zs59jTclMTMsq5vG4u94TsuDd6L55HHV4bli_OyO0bYAao8V3XFb1BjgF-jBrVGOkI2R9-zFGJWVLYcZBdxpEVA1CPaFDEbnQQl0ghckItsSd-vvlvZUEXNNNkifcHHCHDSJNg6Tz9Vh3ol8M-qXVbmAx25DOfjwzRtfwIYxARJYCqiw83IMbo_wzCFRc8lS-xUij8c5e4KuN8gpbikjK8WJQHfpHf07v8dhBBA2mC-n__hSwEuAtBk7lKeHozt-LIf5-Q3bWU')" }}>
                            <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity bg-primary text-white rounded-full p-1 shadow-sm">
                                <span className="material-symbols-outlined text-[20px] block">check</span>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-text-main dark:text-white">Minimalist White</span>
                                {settings.theme === 'minimalist' && <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Aktif</span>}
                            </div>
                            <p className="text-sm text-text-secondary dark:text-slate-400">Tata letak yang bersih, lapang, dan modern.</p>
                        </div>
                    </label>
                </div>
            </section>

            {/* Theme Selection Section */}
            <section className="flex flex-col gap-4">
                {/* ... existing theme implementation ... */}
            </section>

            <hr className="border-slate-200 dark:border-slate-700 my-2" />

            {/* Hero Section Settings */}
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-text-main dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Hero Homepage</h2>
                    <p className="text-text-secondary dark:text-slate-400 text-sm">Sesuaikan teks dan tombol pada bagian utama halaman depan.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hero Badge */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="hero_badge">Badge Teks</label>
                        <input
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            id="hero_badge"
                            name="hero_badge"
                            type="text"
                            placeholder="PREMIUM GRADUATION GIFTS"
                            value={settings.hero_badge || ''}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Spacer */}
                    <div className="hidden md:block"></div>

                    {/* Hero Title Line 1 */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="hero_title_line1">Judul Baris 1</label>
                        <input
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            id="hero_title_line1"
                            name="hero_title_line1"
                            type="text"
                            placeholder="Celebrate Their"
                            value={settings.hero_title_line1 || ''}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Hero Title Line 2 */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="hero_title_line2">Judul Baris 2 (Highlight)</label>
                        <input
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            id="hero_title_line2"
                            name="hero_title_line2"
                            type="text"
                            placeholder="Milestone"
                            value={settings.hero_title_line2 || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Hero Subtitle */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="hero_subtitle">Subjudul</label>
                        <textarea
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 h-24 focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            id="hero_subtitle"
                            name="hero_subtitle"
                            rows="2"
                            placeholder="Deskripsi singkat..."
                            value={settings.hero_subtitle || ''}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* CTA Primary */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="hero_cta_primary">Teks Tombol Utama</label>
                        <input
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            id="hero_cta_primary"
                            name="hero_cta_primary"
                            type="text"
                            placeholder="Shop Collection"
                            value={settings.hero_cta_primary || ''}
                            onChange={handleChange}
                        />
                    </div>
                    {/* CTA Secondary */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="hero_cta_secondary">Teks Tombol Sekunder</label>
                        <input
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            id="hero_cta_secondary"
                            name="hero_cta_secondary"
                            type="text"
                            placeholder="Custom Order"
                            value={settings.hero_cta_secondary || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </section>

            <hr className="border-slate-200 dark:border-slate-700 my-2" />

            {/* SEO & Contact Section */}
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-text-main dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Konfigurasi Umum</h2>
                    <p className="text-text-secondary dark:text-slate-400 text-sm">Perbarui detail kontak dan metadata mesin pencari.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* WhatsApp Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="whatsapp">Nomor WhatsApp</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-symbols-outlined text-text-secondary text-[20px]">call</span>
                            </div>
                            <input
                                className={`w-full rounded-lg border ${errors['settings.whatsapp'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                                id="whatsapp"
                                name="whatsapp"
                                placeholder="+62 812 3456 7890"
                                type="tel"
                                value={settings.whatsapp || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="text-xs text-text-secondary dark:text-slate-400">Digunakan untuk tombol dukungan pelanggan.</p>
                        {errors['settings.whatsapp'] && <p className="text-xs text-red-500 mt-1">{errors['settings.whatsapp'][0]}</p>}
                    </div>
                    {/* Phone Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="phone">Nomor Telepon (Footer)</label>
                        <div className="relative">
                            <input
                                className={`w-full rounded-lg border ${errors['settings.phone'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                                id="phone"
                                name="phone"
                                placeholder="+62 21 1234 5678"
                                type="tel"
                                value={settings.phone || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['settings.phone'] && <p className="text-xs text-red-500 mt-1">{errors['settings.phone'][0]}</p>}
                    </div>
                    {/* Email Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="email">Email Kontak</label>
                        <div className="relative">
                            <input
                                className={`w-full rounded-lg border ${errors['settings.email'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="hello@dekorasi.com"
                                value={settings.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['settings.email'] && <p className="text-xs text-red-500 mt-1">{errors['settings.email'][0]}</p>}
                    </div>
                    {/* Instagram Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="instagram">Username Instagram</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-text-secondary font-bold">@</span>
                            </div>
                            <input
                                className={`w-full rounded-lg border ${errors['settings.instagram'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 pl-8 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                                id="instagram"
                                name="instagram"
                                type="text"
                                placeholder="dekorasi.id"
                                value={settings.instagram || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['settings.instagram'] && <p className="text-xs text-red-500 mt-1">{errors['settings.instagram'][0]}</p>}
                    </div>

                    {/* Facebook Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="facebook">URL Facebook</label>
                        <div className="relative">
                            <input
                                className={`w-full rounded-lg border ${errors['settings.facebook'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                                id="facebook"
                                name="facebook"
                                type="url"
                                placeholder="https://facebook.com/..."
                                value={settings.facebook || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['settings.facebook'] && <p className="text-xs text-red-500 mt-1">{errors['settings.facebook'][0]}</p>}
                    </div>

                    {/* Twitter Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="twitter">URL Twitter/X</label>
                        <div className="relative">
                            <input
                                className={`w-full rounded-lg border ${errors['settings.twitter'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                                id="twitter"
                                name="twitter"
                                type="url"
                                placeholder="https://twitter.com/..."
                                value={settings.twitter || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['settings.twitter'] && <p className="text-xs text-red-500 mt-1">{errors['settings.twitter'][0]}</p>}
                    </div>

                    {/* TikTok Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="tiktok">URL TikTok</label>
                        <div className="relative">
                            <input
                                className={`w-full rounded-lg border ${errors['settings.tiktok'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                                id="tiktok"
                                name="tiktok"
                                type="url"
                                placeholder="https://tiktok.com/..."
                                value={settings.tiktok || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['settings.tiktok'] && <p className="text-xs text-red-500 mt-1">{errors['settings.tiktok'][0]}</p>}
                    </div>
                    {/* Address Input */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="address">Alamat Toko</label>
                        <textarea
                            className={`w-full rounded-lg border ${errors['settings.address'] ? 'border-red-500' : 'border-pink-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 h-24 focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all`}
                            id="address"
                            name="address"
                            rows="2"
                            placeholder="Jl. Raya Kampus No. 123, Depok, Jawa Barat"
                            value={settings.address || ''}
                            onChange={handleChange}
                        ></textarea>
                        {errors['settings.address'] && <p className="text-xs text-red-500 mt-1">{errors['settings.address'][0]}</p>}
                    </div>
                    {/* SEO Title Input */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="seo_title">Judul SEO</label>
                        <div className="relative">
                            <input
                                className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                                id="seo_title"
                                name="seo_title"
                                type="text"
                                placeholder={`contoh: Hadiah Wisuda ${new Date().getFullYear()}`}
                                value={settings.seo_title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* SEO Description */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white" htmlFor="seo_desc">Deskripsi Meta SEO</label>
                        <textarea
                            className="w-full rounded-lg border border-pink-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 h-32 focus:outline-none focus:ring-2 focus:ring-[#ed78b3]/20 focus:border-[#ed78b3] transition-all"
                            id="seo_desc"
                            name="seo_desc"
                            rows="3"
                            placeholder="Temukan hadiah yang sempurna..."
                            value={settings.seo_desc}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
            </section>

            {/* Action Bar */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined">save</span>
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
            <div className="h-10"></div> {/* Spacer for scrolling */}
        </div>
    );
}
