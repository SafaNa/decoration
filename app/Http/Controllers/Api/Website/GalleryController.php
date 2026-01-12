<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Gallery;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::with('category');
        return response()->json($query->latest()->get());
    }
}
