<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Gallery;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::with('category');

        if ($request->has('gallery_category_id')) {
            $query->where('gallery_category_id', $request->gallery_category_id);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'gallery_category_id' => 'required|exists:gallery_categories,id',
            'title' => 'required|string|max:255',
            'image' => 'required|string', // URL or base64
            'description' => 'nullable|string',
        ]);

        // Handle Base64 Image Upload
        if (!empty($validated['image']) && preg_match('/^data:image\/(\w+);base64,/', $validated['image'])) {
            $image = substr($validated['image'], strpos($validated['image'], ',') + 1);
            $type = explode(';', $validated['image'])[0];
            $type = explode('/', $type)[1];

            $imageName = 'gallery_' . time() . '_' . Str::random(10) . '.' . $type;
            \Storage::disk('public')->put('galleries/' . $imageName, base64_decode($image));

            $validated['image'] = '/storage/galleries/' . $imageName;
        }

        $gallery = Gallery::create($validated);

        return response()->json($gallery, 201);
    }

    public function show(Gallery $gallery)
    {
        return response()->json($gallery->load('category'));
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'gallery_category_id' => 'sometimes|exists:gallery_categories,id',
            'title' => 'sometimes|string|max:255',
            'image' => 'sometimes|string',
            'description' => 'nullable|string',
        ]);

        // Handle Base64 Image Upload
        if (isset($validated['image']) && preg_match('/^data:image\/(\w+);base64,/', $validated['image'])) {
            // Delete old image if exists
            if ($gallery->image) {
                $oldPath = str_replace('/storage/', '', $gallery->image);
                if (\Storage::disk('public')->exists($oldPath)) {
                    \Storage::disk('public')->delete($oldPath);
                }
            }

            $image = substr($validated['image'], strpos($validated['image'], ',') + 1);
            $type = explode(';', $validated['image'])[0];
            $type = explode('/', $type)[1];

            $imageName = 'gallery_' . time() . '_' . Str::random(10) . '.' . $type;
            \Storage::disk('public')->put('galleries/' . $imageName, base64_decode($image));

            $validated['image'] = '/storage/galleries/' . $imageName;
        }

        $gallery->update($validated);

        return response()->json($gallery);
    }

    public function destroy(Gallery $gallery)
    {
        $gallery->delete();
        return response()->json(null, 204);
    }
}
