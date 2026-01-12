import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin');
        }
    }, [navigate]);

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.login(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Login gagal. Silakan periksa kredensial Anda.');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen font-body text-[#1b0e14] dark:text-[#f3e8ed] bg-[#f8f6f7] dark:bg-[#211119]">
            {/* Left Side: Visual Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnNyBzsxZDXpWSJ4_0BjvpoAdZt1ekPeLEPGCXE7xedoGQ_-SkTmMot00ObYaSqR3SGhIgwcmDFKM3QaCSBhgIcBo7RnO9haZk_yZFOrV5l1iY7nzl8zlzPfoZe_7JnPwYMXLP0NdGUg2EakQxzfEO0bxCsTRmaOtIWyFmiUI9lhCn39d0QEj9elLJhbLw86EXSVzh8u0Aw_Xqloa10vcCjCJ9QQG6QhSQec8diZnKsj4U0Z09ja78lJvLwf50GfTdLdwieIgJfqw')" }}
                >
                </div>
                {/* Dark/Elegant Overlay - Pink/Purple tinted */}
                <div className="absolute inset-0 bg-[#2d1b24]/60 backdrop-blur-[2px]"></div>
                {/* Hero Content */}
                <div className="relative z-10 flex flex-col justify-center px-20 text-white">
                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 rounded-full border border-white/30 bg-white/10 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-md">
                            Akses Institusi
                        </span>
                        <h1 className="font-serif text-6xl font-bold leading-tight mb-4">
                            Selamat Datang Kembali, <br /><span className="italic text-[#fbcfe8]">Admin</span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-md font-light leading-relaxed">
                            Kelola kenangan yang sempurna. Atur katalog hadiah wisuda Anda dan rayakan pencapaian siswa dengan elegan.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <div className="w-12 h-[1px] bg-white/50"></div>
                        <span className="tracking-[0.2em] uppercase">Layanan Prima</span>
                    </div>
                </div>
                {/* Subtle Branding at bottom */}
                <div className="absolute bottom-10 left-20 z-10 text-white/50 text-xs tracking-widest uppercase">
                    © {new Date().getFullYear()} Graduation Gift Co.
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-white dark:bg-[#2d1b24] h-full overflow-hidden">
                <div className="w-full max-w-[380px] flex flex-col justify-center h-full max-h-screen py-4">
                    {/* Logo Space */}
                    <div className="mb-4 flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-[#ed78b3] rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-lg">school</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-[#1b0e14] dark:text-[#f3e8ed]">GiftCatalog<span className="text-[#ed78b3]">.</span></span>
                    </div>

                    {/* HeadlineText */}
                    <div className="mb-4 shrink-0">
                        <h2 className="text-[#1b0e14] dark:text-[#f3e8ed] text-xl font-serif font-bold leading-tight mb-1">Masuk</h2>
                        <p className="text-[#964f73] text-xs">Silakan masukkan kredensial Anda.</p>
                    </div>

                    {/* Error Message - Fixed Height Container to prevent jump */}
                    <div className="min-h-[40px] mb-2">
                        {error && (
                            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs animate-pulse font-medium">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-3 shrink-0">
                        {/* TextField: Username/Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[#1b0e14] dark:text-[#f3e8ed] text-xs font-semibold leading-normal">Email</label>
                            <div className="relative group">
                                <input
                                    className="flex w-full rounded-lg text-[#1b0e14] dark:text-[#f3e8ed] focus:outline-0 focus:ring-2 focus:ring-[#ed78b3]/20 border border-pink-200 dark:border-[#4a2e3a] bg-slate-50 dark:bg-[#211119] focus:border-[#ed78b3] h-10 placeholder:text-[#964f73]/50 px-3 text-sm transition-all duration-200"
                                    placeholder="admin@dekorasi.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* TextField: Password */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <label className="text-[#1b0e14] dark:text-[#f3e8ed] text-xs font-semibold leading-normal">Kata Sandi</label>
                            </div>
                            <div className="flex w-full items-stretch rounded-lg group">
                                <input
                                    className="flex w-full min-w-0 flex-1 rounded-l-lg text-[#1b0e14] dark:text-[#f3e8ed] focus:outline-0 focus:ring-2 focus:ring-[#ed78b3]/20 border border-pink-200 dark:border-[#4a2e3a] bg-slate-50 dark:bg-[#211119] focus:border-[#ed78b3] h-10 placeholder:text-[#964f73]/50 px-3 text-sm transition-all duration-200 border-r-0"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <div
                                    className="flex border border-pink-200 dark:border-[#4a2e3a] bg-slate-50 dark:bg-[#211119] items-center justify-center pr-3 rounded-r-lg border-l-0 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-[#964f73] hover:text-[#ed78b3] transition-colors text-lg">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Checklists: Remember Me */}
                        <div className="py-0.5">
                            <label className="flex items-center gap-x-2 cursor-pointer group">
                                <input className="h-3.5 w-3.5 rounded border-pink-200 dark:border-[#4a2e3a] border-2 bg-transparent text-[#ed78b3] focus:ring-[#ed78b3]/30 focus:ring-offset-0 transition-all cursor-pointer accent-[#ed78b3]" type="checkbox" />
                                <span className="text-[#964f73] dark:text-[#d65d9a] text-xs font-medium group-hover:text-[#1b0e14] dark:group-hover:text-[#f3e8ed] transition-colors">Ingat saya</span>
                            </label>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 rounded-lg h-10 bg-gradient-to-br from-[#ed78b3] to-[#d65d9a] text-white text-sm font-bold tracking-wide shadow-md shadow-[#ed78b3]/20 hover:shadow-[#ed78b3]/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span>{loading ? '...' : 'Masuk'}</span>
                                {!loading && <span className="material-symbols-outlined text-lg">login</span>}
                            </button>
                        </div>
                    </form>

                    {/* Support Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#4a2e3a] flex flex-col gap-2 shrink-0">
                        <p className="text-center text-[#964f73] text-[10px]">
                            Hubungi Administrator jika bermasalah.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
