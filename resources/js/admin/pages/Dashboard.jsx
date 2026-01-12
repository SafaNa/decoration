import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import api from '../../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total_products: 0,
        active_products: 0,
        low_stock_products: 0,
        total_categories: 0,
        total_gallery_images: 0,
        recent_activity: [],
        active_theme: '',
        visitor_stats: { labels: [], data: [] },
        activity_stats: { labels: [], products: [], galleries: [] }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const visitorChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' }
            }
        },
        maintainAspectRatio: false
    };

    const visitorChartData = {
        labels: stats.visitor_stats?.labels || [],
        datasets: [
            {
                label: 'Pengunjung',
                data: stats.visitor_stats?.data || [],
                borderColor: '#ed78b3',
                backgroundColor: 'rgba(237, 120, 179, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
            }
        ]
    };

    const activityChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true }
        },
        maintainAspectRatio: false
    };

    const activityChartData = {
        labels: stats.activity_stats?.labels || [],
        datasets: [
            {
                label: 'Produk',
                data: stats.activity_stats?.products || [],
                backgroundColor: '#3b82f6',
                borderRadius: 4,
            },
            {
                label: 'Galeri',
                data: stats.activity_stats?.galleries || [],
                backgroundColor: '#f97316',
                borderRadius: 4,
            }
        ]
    };

    if (loading) {
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    return (
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 lg:gap-8 pb-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">Total Produk</h3>
                        <span className="p-2 bg-pink-50 text-pink-500 rounded-lg">
                            <span className="material-symbols-outlined text-xl">inventory_2</span>
                        </span>
                    </div>
                    <div className="flex items-baseline">
                        <h2 className="text-3xl font-bold text-gray-800">{stats.total_products?.toLocaleString('id-ID')}</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">Produk Aktif</h3>
                        <span className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                            <span className="material-symbols-outlined text-xl">shopping_bag</span>
                        </span>
                    </div>
                    <div className="flex items-baseline">
                        <h2 className="text-3xl font-bold text-gray-800">{stats.active_products?.toLocaleString('id-ID')}</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">Stok Menipis</h3>
                        <span className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                            <span className="material-symbols-outlined text-xl">warning</span>
                        </span>
                    </div>
                    <div className="flex items-baseline">
                        <h2 className="text-3xl font-bold text-gray-800">{stats.low_stock_products?.toLocaleString('id-ID')}</h2>
                        {stats.low_stock_products > 0 && (
                            <span className="ml-2 text-sm text-red-500 font-medium">Perlu tindakan</span>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">Gambar Galeri</h3>
                        <span className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                            <span className="material-symbols-outlined text-xl">image</span>
                        </span>
                    </div>
                    <div className="flex items-baseline">
                        <h2 className="text-3xl font-bold text-gray-800">{stats.total_gallery_images?.toLocaleString('id-ID')}</h2>
                    </div>
                </div>
            </div>

            {/* Main Section: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Chart Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Visitor Chart */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-[350px]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Ringkasan Trafik</h3>
                                <p className="text-sm text-slate-500">Statistik pengunjung mingguan</p>
                            </div>
                            <select className="bg-slate-50 dark:bg-white/5 border-none text-xs font-medium text-slate-600 dark:text-slate-300 rounded-lg px-3 py-2 cursor-pointer focus:ring-1 focus:ring-primary">
                                <option>7 Hari Terakhir</option>
                            </select>
                        </div>
                        <div className="flex-1 w-full h-full min-h-0">
                            <Line options={visitorChartOptions} data={visitorChartData} />
                        </div>
                    </div>

                    {/* Activity Chart */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-[350px]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Aktivitas Konten</h3>
                                <p className="text-sm text-slate-500">Konten baru minggu ini</p>
                            </div>
                        </div>
                        <div className="flex-1 w-full h-full min-h-0">
                            <Bar options={activityChartOptions} data={activityChartData} />
                        </div>
                    </div>
                </div>

                {/* Right Column: Recent Activity & Theme */}
                <div className="flex flex-col gap-6">
                    {/* Theme Widget */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-black rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-yellow-400">star</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Tema Aktif</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1 uppercase">{stats.active_theme}</h3>
                            <p className="text-slate-400 text-sm mb-4">Sedang aktif</p>
                            <button
                                onClick={() => navigate('/admin/settings')}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-sm font-medium py-2 px-4 rounded-lg transition-colors border border-white/10"
                            >
                                Ganti Tema
                            </button>
                        </div>
                        {/* Abstract decorative circle */}
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl"></div>
                    </div>
                    {/* Recent Activity */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex-1 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 dark:text-white">Aktivitas Terbaru</h3>
                            <button
                                onClick={() => navigate('/admin/products')}
                                className="text-xs font-semibold text-primary hover:text-primary-dark"
                            >
                                Lihat Semua
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {stats.recent_activity?.length > 0 ? (
                                stats.recent_activity.map((item, index) => (
                                    <div key={index} className="flex gap-3 items-start">
                                        <div className={`
                                            p-2 rounded-lg shrink-0
                                            ${item.type === 'product'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'}
                                        `}>
                                            <span className="material-symbols-outlined text-[18px]">
                                                {item.type === 'product' ? 'add_circle' : 'image'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.title}</p>
                                            <p className="text-xs text-slate-500">{item.description}</p>
                                            <span className="text-[10px] text-slate-400 mt-1">{item.time}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-4">Tidak ada aktivitas terbaru</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
