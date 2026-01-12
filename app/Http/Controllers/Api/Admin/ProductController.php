<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('sku', 'like', "%{$search}%"); // Assuming SKU is not in schema yet but beneficial, using name for now
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        // Handle Base64 Image Upload
        if (!empty($validated['image']) && preg_match('/^data:image\/(\w+);base64,/', $validated['image'])) {
            $image = substr($validated['image'], strpos($validated['image'], ',') + 1);
            $type = explode(';', $validated['image'])[0];
            $type = explode('/', $type)[1];

            $imageName = 'product_' . time() . '_' . Str::random(10) . '.' . $type;
            \Storage::disk('public')->put('products/' . $imageName, base64_decode($image));

            $validated['image'] = '/storage/products/' . $imageName;
        }

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load('category'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|integer|min:0',
            'stock' => 'sometimes|integer|min:0',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);
        }

        // Handle Base64 Image Upload
        if (isset($validated['image']) && preg_match('/^data:image\/(\w+);base64,/', $validated['image'])) {
            // Delete old image if exists
            if ($product->image) {
                $oldPath = str_replace('/storage/', '', $product->image);
                if (\Storage::disk('public')->exists($oldPath)) {
                    \Storage::disk('public')->delete($oldPath);
                }
            }

            $image = substr($validated['image'], strpos($validated['image'], ',') + 1);
            $type = explode(';', $validated['image'])[0];
            $type = explode('/', $type)[1];

            $imageName = 'product_' . time() . '_' . Str::random(10) . '.' . $type;
            \Storage::disk('public')->put('products/' . $imageName, base64_decode($image));

            $validated['image'] = '/storage/products/' . $imageName;
        }

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
