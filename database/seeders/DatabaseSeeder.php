<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@dekorasi.com',
            'password' => bcrypt('password'), // Default password
        ]);

        // Create Categories
        $categories = ['For Him', 'For Her', 'Tech Essentials', 'Keepsakes', 'Jewelry', 'Watches'];
        foreach ($categories as $cat) {
            \App\Models\Category::create([
                'name' => $cat,
                'slug' => \Illuminate\Support\Str::slug($cat),
                'description' => 'Best gifts ' . strtolower($cat),
            ]);
        }

        // Create Dummy Products
        $cats = \App\Models\Category::all();
        if ($cats->count() > 0) {
            for ($i = 1; $i <= 10; $i++) {
                \App\Models\Product::create([
                    'category_id' => $cats->random()->id,
                    'name' => 'Product ' . $i,
                    'slug' => 'product-' . $i,
                    'description' => 'Description for product ' . $i,
                    'price' => rand(100000, 5000000),
                    'stock' => rand(0, 50),
                    'is_active' => true,
                    'image' => null, // No image for now
                ]);
            }
        }
    }
}
