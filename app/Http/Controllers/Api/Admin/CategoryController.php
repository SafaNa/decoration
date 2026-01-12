<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // Handle Base64 Image Upload
        if (!empty($validated['image']) && preg_match('/^data:image\/(\w+);base64,/', $validated['image'])) {
            $image = substr($validated['image'], strpos($validated['image'], ',') + 1);
            $type = explode(';', $validated['image'])[0];
            $type = explode('/', $type)[1];

            $imageName = 'category_' . time() . '_' . Str::random(10) . '.' . $type;
            \Storage::disk('public')->put('categories/' . $imageName, base64_decode($image));

            $validated['image'] = '/storage/categories/' . $imageName;
        }

        $category = Category::create($validated);

        return response()->json($category, 201);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        if ($request->name !== $category->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle Base64 Image Upload
        if (isset($validated['image']) && preg_match('/^data:image\/(\w+);base64,/', $validated['image'])) {
            // Delete old image if exists
            if ($category->image) {
                $oldPath = str_replace('/storage/', '', $category->image);
                if (\Storage::disk('public')->exists($oldPath)) {
                    \Storage::disk('public')->delete($oldPath);
                }
            }

            $image = substr($validated['image'], strpos($validated['image'], ',') + 1);
            $type = explode(';', $validated['image'])[0];
            $type = explode('/', $type)[1];

            $imageName = 'category_' . time() . '_' . Str::random(10) . '.' . $type;
            \Storage::disk('public')->put('categories/' . $imageName, base64_decode($image));

            $validated['image'] = '/storage/categories/' . $imageName;
        }

        $category->update($validated);

        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
