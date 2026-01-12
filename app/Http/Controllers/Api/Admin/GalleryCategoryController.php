<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\GalleryCategory;
use Illuminate\Support\Str;

class GalleryCategoryController extends Controller
{
    public function index()
    {
        return response()->json(GalleryCategory::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category = GalleryCategory::create($validated);

        return response()->json($category, 201);
    }

    public function show(GalleryCategory $galleryCategory)
    {
        return response()->json($galleryCategory);
    }

    public function update(Request $request, GalleryCategory $galleryCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        if ($request->name !== $galleryCategory->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $galleryCategory->update($validated);

        return response()->json($galleryCategory);
    }

    public function destroy(GalleryCategory $galleryCategory)
    {
        $galleryCategory->delete();
        return response()->json(null, 204);
    }
}
