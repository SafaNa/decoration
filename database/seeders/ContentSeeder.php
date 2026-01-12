<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Banner;
use App\Models\Setting;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Hero Settings
        $heroSettings = [
            'hero_title_line1' => [
                'value' => 'Celebrate Their',
                'type' => 'text'
            ],
            'hero_title_line2' => [
                'value' => 'Milestone',
                'type' => 'text'
            ],
            'hero_badge' => [
                'value' => 'PREMIUM GRADUATION GIFTS',
                'type' => 'text'
            ],
            'hero_subtitle' => [
                'value' => 'Discover handcrafted treasures designed to honor their journey and inspire their future.',
                'type' => 'textarea'
            ],
            'hero_cta_primary' => [
                'value' => 'Explore Collection',
                'type' => 'text'
            ],
            'hero_cta_secondary' => [
                'value' => 'Custom Order',
                'type' => 'text'
            ],
        ];

        foreach ($heroSettings as $key => $data) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $data['value'], 'type' => $data['type']]
            );
        }

        // 2. Gift Discovery Banners
        $banners = [
            [
                'title' => 'For Him',
                'description' => 'Timeless gifts for the men who inspire you.',
                'image' => 'https://images.unsplash.com/photo-1549465220-1e8b5fec634d?auto=format&fit=crop&q=80&w=800',
                'url' => '/catalog?category=men',
                'type' => 'discovery',
                'order' => 1,
                'meta' => json_encode(['color' => 'bg-blue-900'])
            ],
            [
                'title' => 'For Her',
                'description' => 'Elegant treasures she\'ll cherish forever.',
                'image' => 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
                'url' => '/catalog?category=women',
                'type' => 'discovery',
                'order' => 2,
                'meta' => json_encode(['color' => 'bg-rose-900'])
            ],
            [
                'title' => 'Graduation',
                'description' => 'Celebrate their milestone with something special.',
                'image' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
                'url' => '/catalog?category=graduation',
                'type' => 'discovery',
                'order' => 3,
                'meta' => json_encode(['color' => 'bg-amber-900'])
            ],
            [
                'title' => 'Wedding',
                'description' => 'Beautiful beginnings deserve beautiful gifts.',
                'image' => 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
                'url' => '/catalog?category=wedding',
                'type' => 'discovery',
                'order' => 4,
                'meta' => json_encode(['color' => 'bg-purple-900'])
            ],
        ];

        foreach ($banners as $banner) {
            Banner::updateOrCreate(
                ['title' => $banner['title'], 'type' => $banner['type']],
                $banner
            );
        }
    }
}
