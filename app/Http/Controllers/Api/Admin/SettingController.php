<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => 'required|array',
            'settings.email' => 'nullable|email',
            'settings.whatsapp' => 'nullable|string|max:20', // Basic length check for phone numbers
            'settings.phone' => 'nullable|string|max:20',
            'settings.instagram' => 'nullable|string|max:30|regex:/^[a-zA-Z0-9._]+$/', // Instagram username regex
            'settings.facebook' => 'nullable|string|max:255',
            'settings.twitter' => 'nullable|string|max:255',
            'settings.tiktok' => 'nullable|string|max:255',
            'settings.address' => 'nullable|string|max:500',
            'settings.seo_title' => 'nullable|string|max:60',
            'settings.seo_desc' => 'nullable|string|max:160',
        ], [
            'settings.email.email' => 'Format email tidak valid.',
            'settings.instagram.regex' => 'Format username Instagram tidak valid (huruf, angka, titik, underscore).',
        ]);

        foreach ($request->settings as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return response()->json(['message' => 'Settings updated successfully']);
    }
}
