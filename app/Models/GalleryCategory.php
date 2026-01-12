<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class GalleryCategory extends Model
{
    use HasUuids;
    protected $fillable = ['name', 'slug'];

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }
}
