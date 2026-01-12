<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->where('is_active', true);

        if ($request->has('category_slug')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category_slug);
            });
        }

        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        return response()->json($query->latest()->get());
    }

    public function show($slug)
    {
        return response()->json(
            Product::with('category')
                ->where('is_active', true)
                ->where(function ($query) use ($slug) {
                    $query->where('id', $slug)->orWhere('slug', $slug);
                })
                ->firstOrFail()
        );
    }
}
