<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        return Testimonial::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('testimonials', 'public');
        }

        $testimonial = Testimonial::create([
            'name' => $request->name,
            'role' => $request->role,
            'content' => $request->input('content'),
            'image' => $imagePath ? '/storage/' . $imagePath : null,
        ]);

        return response()->json($testimonial, 201);
    }

    public function show($id)
    {
        return Testimonial::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($testimonial->image) {
                $oldPath = str_replace('/storage/', '', $testimonial->image);
                Storage::disk('public')->delete($oldPath);
            }
            $imagePath = $request->file('image')->store('testimonials', 'public');
            $testimonial->image = '/storage/' . $imagePath;
        }

        $testimonial->update([
            'name' => $request->name,
            'role' => $request->role,
            'content' => $request->input('content'),
            // image is already updated if present
        ]);

        return response()->json($testimonial);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        if ($testimonial->image) {
            $oldPath = str_replace('/storage/', '', $testimonial->image);
            Storage::disk('public')->delete($oldPath);
        }
        $testimonial->delete();
        return response()->json(['message' => 'Testimonial deleted successfully']);
    }
}
