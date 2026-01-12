<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Banner::where('is_active', true)->orderBy('order');

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $banners = $query->get();

        $banners->transform(function ($banner) {
            if ($banner->image) {
                // If the image path is already a full URL (e.g. from keys/external), leave it.
                if (filter_var($banner->image, FILTER_VALIDATE_URL)) {
                    return $banner;
                }

                // If it starts with /storage, just prepend the app URL
                if (str_starts_with($banner->image, '/storage')) {
                    $banner->image = url($banner->image);
                } else {
                    // Fallback for paths that might be 'banners/image.jpg' (raw path)
                    $banner->image = url('storage/' . $banner->image);
                }
            }
            return $banner;
        });

        return response()->json($banners);
    }
}
