<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
