<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = Banner::orderBy('order')->orderBy('created_at', 'desc')->get();
        return response()->json($banners);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:2048', // Max 2MB
            'url' => 'nullable|string|max:255',
            'type' => 'required|string|in:discovery,slideshow,promo',
            'order' => 'integer',
            'is_active' => 'boolean',
            'meta' => 'nullable|json'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('banners', 'public');
            $validated['image'] = Storage::url($path);
        }

        $banner = Banner::create($validated);

        return response()->json($banner, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        return response()->json($banner);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'url' => 'nullable|string|max:255',
            'type' => 'sometimes|required|string|in:discovery,slideshow,promo',
            'order' => 'integer',
            'is_active' => 'boolean',
            'meta' => 'nullable|json'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($banner->image) {
                $oldPath = str_replace('/storage/', '', $banner->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('banners', 'public');
            $validated['image'] = Storage::url($path);
        }

        $banner->update($validated);

        return response()->json($banner);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        if ($banner->image) {
            $oldPath = str_replace('/storage/', '', $banner->image);
            Storage::disk('public')->delete($oldPath);
        }

        $banner->delete();

        return response()->json(['message' => 'Banner deleted successfully']);
    }
}
