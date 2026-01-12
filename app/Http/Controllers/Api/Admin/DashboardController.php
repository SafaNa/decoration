<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;

use App\Models\Category;
use App\Models\Product;
use App\Models\Gallery;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        // Recent Activity - 5 most recent items (Products or Galleries)
        $products = Product::latest()->take(5)->get()->map(function ($item) {
            return [
                'type' => 'product',
                'title' => $item->name,
                'description' => 'telah ditambahkan ke katalog.',
                'time' => $item->created_at->locale('id')->diffForHumans(),
                'original_created_at' => $item->created_at
            ];
        });

        $galleries = Gallery::latest()->take(5)->get()->map(function ($item) {
            return [
                'type' => 'gallery',
                'title' => $item->title,
                'description' => 'telah ditambahkan ke galeri.',
                'time' => $item->created_at->locale('id')->diffForHumans(),
                'original_created_at' => $item->created_at
            ];
        });

        $recent_activity = $products->concat($galleries)
            ->sortByDesc('original_created_at')
            ->take(5)
            ->values();

        // Active Theme
        $theme = \App\Models\Setting::where('key', 'theme')->value('value') ?? 'Graduation Blue';

        // Visitor Stats (Dummy Data for now)
        $visitor_stats = [
            'labels' => ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            'data' => [
                rand(50, 100),
                rand(50, 100),
                rand(50, 100),
                rand(50, 100),
                rand(100, 200),
                rand(80, 150),
                rand(60, 120)
            ],
            'trend' => rand(-10, 20)
        ];

        // Content Activity Stats (Last 7 Days)
        $dates = collect(range(0, 6))->map(function ($i) {
            return now()->subDays($i)->format('Y-m-d');
        })->reverse()->values();

        $activity_stats = [
            'labels' => $dates->map(fn($d) => \Carbon\Carbon::parse($d)->locale('id')->isoFormat('ddd'))->toArray(),
            'products' => [],
            'galleries' => []
        ];

        foreach ($dates as $date) {
            $activity_stats['products'][] = Product::whereDate('created_at', $date)->count();
            $activity_stats['galleries'][] = Gallery::whereDate('created_at', $date)->count();
        }

        return response()->json([
            'total_products' => Product::count(),
            'active_products' => Product::where('is_active', true)->count(),
            'low_stock_products' => Product::where('stock', '<', 5)->count(),
            'total_categories' => Category::count(),
            'total_gallery_images' => Gallery::count(),
            'recent_activity' => $recent_activity,
            'active_theme' => $theme,
            'visitor_stats' => $visitor_stats,
            'activity_stats' => $activity_stats
        ]);
    }
}
