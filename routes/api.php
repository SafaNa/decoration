<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public / Website Routes
Route::prefix('website')->group(function () {
    Route::get('/settings', [App\Http\Controllers\Api\Website\SettingController::class, 'index']);
    Route::get('/categories', [App\Http\Controllers\Api\Website\CategoryController::class, 'index']);
    Route::get('/categories/{category}', [App\Http\Controllers\Api\Website\CategoryController::class, 'show']);
    Route::get('/products', [App\Http\Controllers\Api\Website\ProductController::class, 'index']);
    Route::get('/products/{product}', [App\Http\Controllers\Api\Website\ProductController::class, 'show']);
    Route::get('/galleries', [App\Http\Controllers\Api\Website\GalleryController::class, 'index']);
    Route::get('/galleries', [App\Http\Controllers\Api\Website\GalleryController::class, 'index']);
    Route::get('/testimonials', [App\Http\Controllers\Api\Website\TestimonialController::class, 'index']);
    Route::get('/banners', [App\Http\Controllers\Api\Website\BannerController::class, 'index']);
});

Route::post('/login', [App\Http\Controllers\Api\Admin\AuthController::class, 'login']);

// Admin / Content Routes (Protected)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/logout', [App\Http\Controllers\Api\Admin\AuthController::class, 'logout']);
    Route::get('/user', [App\Http\Controllers\Api\Admin\AuthController::class, 'user']);
    Route::post('/change-password', [App\Http\Controllers\Api\Admin\AuthController::class, 'changePassword']);

    // Dashboard Stats
    Route::get('/dashboard/stats', [App\Http\Controllers\Api\Admin\DashboardController::class, 'stats']);

    // Categories
    Route::apiResource('categories', App\Http\Controllers\Api\Admin\CategoryController::class);

    // Products
    Route::apiResource('products', App\Http\Controllers\Api\Admin\ProductController::class);

    // Gallery Categories
    Route::apiResource('gallery-categories', App\Http\Controllers\Api\Admin\GalleryCategoryController::class);

    // Galleries
    Route::apiResource('galleries', App\Http\Controllers\Api\Admin\GalleryController::class);

    // Settings
    Route::get('/settings', [App\Http\Controllers\Api\Admin\SettingController::class, 'index']);
    Route::post('/settings', [App\Http\Controllers\Api\Admin\SettingController::class, 'update']);

    // Testimonials
    Route::apiResource('testimonials', App\Http\Controllers\Api\Admin\TestimonialController::class);

    // Banners
    Route::apiResource('banners', App\Http\Controllers\Api\Admin\BannerController::class);
});