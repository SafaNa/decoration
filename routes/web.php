<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Route;

use App\Models\Product;

Route::get('/product/{id}', function ($id) {
    $product = Product::find($id);
    $themeSetting = Setting::where('key', 'theme')->first();
    $defaultTheme = $themeSetting ? $themeSetting->value : 'pastel';
    $theme = request()->query('theme', $defaultTheme);
    
    return view('welcome', [
        'theme' => $theme,
        'product' => $product
    ]);
});

Route::get('/{any?}', function () {
    $themeSetting = Setting::where('key', 'theme')->first();
    $defaultTheme = $themeSetting ? $themeSetting->value : 'pastel';
    $theme = request()->query('theme', $defaultTheme);
    return view('welcome', ['theme' => $theme]);
})->where('any', '.*');
