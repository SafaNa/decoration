<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Banner extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'url',
        'type',
        'order',
        'is_active',
        'meta'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'meta' => 'array',
    ];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                if (!$value)
                    return null;
                if (filter_var($value, FILTER_VALIDATE_URL))
                    return $value; // Already full URL
                if (str_starts_with($value, '/'))
                    return $value; // Already absolute path
                return \Illuminate\Support\Facades\Storage::url($value);
            }
        );
    }
}
